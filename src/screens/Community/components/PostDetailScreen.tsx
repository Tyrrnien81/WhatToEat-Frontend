import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Platform,
  Modal,
  Keyboard,
  KeyboardEvent,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import { Post, Reply } from '../types';
import { TAG_COLORS } from '../styles/TagColors';
import { styles } from '../styles/PostDetailScreen.styles';
import {
  createPostReply,
  createReplyReply,
  fetchCommunityPostDetail,
  likeCommunityPost,
  likeReply,
  unlikeCommunityPost,
  unlikeReply,
} from '../../../services/communityService';

const HeartIcon = ({ filled }: { filled: boolean }) => (
  <Svg width={13} height={13} viewBox="0 0 24 24" fill={filled ? '#FF3347' : 'none'}>
    <Path
      d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
      stroke={filled ? '#FF3347' : '#9A7070'}
      strokeWidth={1.8}
      strokeLinecap="round"
    />
  </Svg>
);

const SendIcon = ({ active }: { active: boolean }) => (
  <Svg width={13} height={13} viewBox="0 0 24 24" fill="none">
    <Path
      d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"
      stroke={active ? 'white' : '#9A7070'}
      strokeWidth={2}
      strokeLinecap="round"
    />
  </Svg>
);

const BackIcon = () => (
  <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
    <Path d="M19 12H5M12 5l-7 7 7 7" stroke="#1A0A0A" strokeWidth={2.5} strokeLinecap="round" />
  </Svg>
);

function useKeyboardOffset() {
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const show = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      (e: KeyboardEvent) => setOffset(e.endCoordinates.height),
    );
    const hide = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => setOffset(0),
    );
    return () => {
      show.remove();
      hide.remove();
    };
  }, []);
  return offset;
}

/** Nested reply row with server-backed likes */
const ReplyTree = ({
  reply,
  isLast,
  onReply,
  onTap,
}: {
  reply: Reply;
  isLast: boolean;
  onReply: (id: string, author: string) => void;
  onTap: (reply: Reply) => void;
}) => {
  const [liked, setLiked] = useState(reply.likedByMe);
  const [count, setCount] = useState(reply.likes);
  const nested = reply.replies ?? [];

  useEffect(() => {
    setLiked(reply.likedByMe);
    setCount(reply.likes);
  }, [reply.id, reply.likedByMe, reply.likes]);

  const toggleLike = async () => {
    try {
      if (liked) {
        const r = await unlikeReply(reply.id);
        setLiked(r.liked);
        setCount(r.likeCount);
      } else {
        const r = await likeReply(reply.id);
        setLiked(r.liked);
        setCount(r.likeCount);
      }
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      Alert.alert('Could not update like', msg);
    }
  };

  return (
    <View>
      <View style={styles.replyWrap}>
        <View style={styles.threadLineCol}>
          <View style={[styles.threadLine, isLast && nested.length === 0 && styles.threadLineLast]} />
          <View style={styles.threadDot} />
        </View>
        <View style={styles.replyContent}>
          <TouchableOpacity onPress={() => onTap(reply)} activeOpacity={0.85}>
            <View style={styles.replyHeader}>
              <View style={styles.replyAvatarWrap}>
                <Text style={styles.replyAvatar}>{reply.avatar}</Text>
              </View>
              <Text style={styles.replyAuthor}>{reply.author}</Text>
              <Text style={styles.replyTime}>{reply.createdAt}</Text>
            </View>
            <Text style={styles.replyText}>{reply.content}</Text>
          </TouchableOpacity>
          <View style={styles.replyActions}>
            <TouchableOpacity style={styles.likeRow} onPress={toggleLike} activeOpacity={0.7}>
              <HeartIcon filled={liked} />
              <Text style={[styles.likeCount, liked && styles.likeCountActive]}>{count}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onReply(reply.id, reply.author)} activeOpacity={0.7}>
              <Text style={styles.replyBtn}>Reply</Text>
            </TouchableOpacity>
          </View>
          {nested.length > 0 && (
            <View style={styles.nestedSection}>
              {nested.map((nr, i) => (
                <ReplyTree
                  key={nr.id}
                  reply={nr}
                  isLast={i === nested.length - 1}
                  onReply={onReply}
                  onTap={onTap}
                />
              ))}
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

/** Local-only thread (nested modal) — no API */
function LocalThreadScreen({
  title,
  headerEmoji,
  headerName,
  headerTime,
  content,
  initialLikes,
  initialLiked,
  initialReplies,
  onClose,
}: {
  title: string;
  headerEmoji: string;
  headerName: string;
  headerTime: string;
  content: string;
  initialLikes: number;
  initialLiked: boolean;
  initialReplies: Reply[];
  onClose: () => void;
}) {
  const insets = useSafeAreaInsets();
  const keyboardOffset = useKeyboardOffset();
  const [liked, setLiked] = useState(initialLiked);
  const [likeCount, setLikeCount] = useState(initialLikes);
  const [replies, setReplies] = useState<Reply[]>(initialReplies);
  const [inputText, setInputText] = useState('');
  const inputRef = useRef<TextInput>(null);

  const handleSend = () => {
    if (!inputText.trim()) return;
    const newReply: Reply = {
      id: Date.now().toString(),
      author: 'You',
      avatar: '😊',
      content: inputText.trim(),
      likes: 0,
      likedByMe: false,
      createdAt: 'just now',
      replies: [],
    };
    setReplies((prev) => [...prev, newReply]);
    setInputText('');
  };

  return (
    <View style={[styles.screen, { paddingTop: insets.top, paddingBottom: keyboardOffset }]}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={onClose} activeOpacity={0.7}>
          <BackIcon />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{title}</Text>
      </View>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <View style={styles.postSection}>
          <View style={styles.postHeader}>
            <View style={styles.avatarWrap}>
              <Text style={styles.avatar}>{headerEmoji}</Text>
            </View>
            <View style={styles.postAuthorInfo}>
              <Text style={styles.authorName}>{headerName}</Text>
              <Text style={styles.createdAt}>{headerTime}</Text>
            </View>
          </View>
          <Text style={styles.postContent}>{content}</Text>
          <View style={styles.statsRow}>
            <Text style={styles.statText}>{likeCount} likes</Text>
            <Text style={styles.statDot}>·</Text>
            <Text style={styles.statText}>{replies.length} replies</Text>
          </View>
          <View style={styles.postActions}>
            <TouchableOpacity
              style={styles.actionBtn}
              onPress={() => {
                setLiked((l) => !l);
                setLikeCount((c) => (liked ? c - 1 : c + 1));
              }}
              activeOpacity={0.7}
            >
              <HeartIcon filled={liked} />
              <Text style={[styles.actionText, liked && styles.actionTextLiked]}>Like</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <View style={[styles.inputBar, { paddingBottom: insets.bottom > 0 && keyboardOffset === 0 ? insets.bottom : 12 }]}>
        <View style={styles.mainInputWrap}>
          <View style={styles.mainInputAvatar}>
            <Text style={styles.replyAvatar}>😊</Text>
          </View>
          <TextInput
            ref={inputRef}
            style={styles.mainInput}
            placeholder="Add a reply..."
            placeholderTextColor="#9A7070"
            value={inputText}
            onChangeText={setInputText}
            returnKeyType="send"
            onSubmitEditing={handleSend}
            multiline
          />
          <TouchableOpacity
            style={[styles.sendBtn, inputText.trim().length > 0 && styles.sendBtnActive]}
            onPress={handleSend}
            activeOpacity={0.8}
          >
            <SendIcon active={inputText.trim().length > 0} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

function ApiThreadScreen({ post, onClose }: { post: Post; onClose: () => void }) {
  const insets = useSafeAreaInsets();
  const keyboardOffset = useKeyboardOffset();
  const [live, setLive] = useState<Post>(post);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [liked, setLiked] = useState(post.likedByMe);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [inputText, setInputText] = useState('');
  const [replyingToId, setReplyingToId] = useState<string | null>(null);
  const [replyingToName, setReplyingToName] = useState<string | null>(null);
  const [selectedReply, setSelectedReply] = useState<Reply | null>(null);
  const inputRef = useRef<TextInput>(null);

  const reload = useCallback(async () => {
    const next = await fetchCommunityPostDetail(post.id);
    setLive(next);
    setLiked(next.likedByMe);
    setLikeCount(next.likes);
  }, [post.id]);

  useEffect(() => {
    let c = false;
    (async () => {
      setLoading(true);
      try {
        const next = await fetchCommunityPostDetail(post.id);
        if (!c) {
          setLive(next);
          setLiked(next.likedByMe);
          setLikeCount(next.likes);
        }
      } catch (e: unknown) {
        if (!c) {
          const msg = e instanceof Error ? e.message : String(e);
          Alert.alert('Could not load post', msg);
          setLive(post);
          setLiked(post.likedByMe);
          setLikeCount(post.likes);
        }
      } finally {
        if (!c) setLoading(false);
      }
    })();
    return () => {
      c = true;
    };
  }, [post.id]);

  useEffect(() => {
    setLiked(live.likedByMe);
    setLikeCount(live.likes);
  }, [live.likedByMe, live.likes]);

  const tagColor = live.hallTag ? (TAG_COLORS as Record<string, { bg: string; text: string }>)[live.hallTag] : null;

  const focusReply = (replyId: string, author: string) => {
    setReplyingToId(replyId);
    setReplyingToName(author);
    setInputText('');
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const focusMain = () => {
    setReplyingToId(null);
    setReplyingToName(null);
    setInputText('');
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const togglePostLike = async () => {
    try {
      setRefreshing(true);
      if (liked) {
        const r = await unlikeCommunityPost(post.id);
        setLiked(r.liked);
        setLikeCount(r.likeCount);
      } else {
        const r = await likeCommunityPost(post.id);
        setLiked(r.liked);
        setLikeCount(r.likeCount);
      }
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      Alert.alert('Could not update like', msg);
    } finally {
      setRefreshing(false);
    }
  };

  const handleSend = async () => {
    const text = inputText.trim();
    if (!text) return;
    try {
      setRefreshing(true);
      if (replyingToId) {
        await createReplyReply(replyingToId, text);
      } else {
        await createPostReply(post.id, text);
      }
      setInputText('');
      setReplyingToId(null);
      setReplyingToName(null);
      await reload();
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      Alert.alert('Could not send reply', msg);
    } finally {
      setRefreshing(false);
    }
  };

  const replies = live.replies ?? [];

  if (loading) {
    return (
      <View style={[styles.screen, { paddingTop: insets.top, justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#FF3347" />
        <Text style={{ marginTop: 12, color: '#9A7070' }}>Loading post…</Text>
        <TouchableOpacity style={{ marginTop: 24 }} onPress={onClose}>
          <Text style={{ color: '#FF3347', fontWeight: '700' }}>Close</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <>
      <View style={[styles.screen, { paddingTop: insets.top, paddingBottom: keyboardOffset }]}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={onClose} activeOpacity={0.7}>
            <BackIcon />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Post</Text>
          {refreshing ? <ActivityIndicator size="small" color="#9A7070" style={{ marginLeft: 8 }} /> : null}
        </View>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.postSection}>
            <View style={styles.postHeader}>
              <View style={styles.avatarWrap}>
                <Text style={styles.avatar}>{live.avatar}</Text>
              </View>
              <View style={styles.postAuthorInfo}>
                <Text style={styles.authorName}>{live.author}</Text>
                <Text style={styles.createdAt}>{live.createdAt}</Text>
              </View>
              {tagColor && (
                <View style={[styles.hallTag, { backgroundColor: tagColor.bg }]}>
                  <Text style={[styles.hallTagText, { color: tagColor.text }]}>{live.hallTag}</Text>
                </View>
              )}
            </View>
            <Text style={styles.postContent}>{live.content}</Text>
            <View style={styles.statsRow}>
              <Text style={styles.statText}>{likeCount} likes</Text>
              <Text style={styles.statDot}>·</Text>
              <Text style={styles.statText}>{replies.length} replies</Text>
            </View>
            <View style={styles.postActions}>
              <TouchableOpacity style={styles.actionBtn} onPress={togglePostLike} activeOpacity={0.7}>
                <HeartIcon filled={liked} />
                <Text style={[styles.actionText, liked && styles.actionTextLiked]}>Like</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionBtn} onPress={focusMain} activeOpacity={0.7}>
                <Text style={styles.actionText}>Reply</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.repliesSection}>
            {replies.map((reply, i) => (
              <ReplyTree
                key={reply.id}
                reply={reply}
                isLast={i === replies.length - 1}
                onReply={focusReply}
                onTap={setSelectedReply}
              />
            ))}
          </View>
        </ScrollView>

        <View
          style={[styles.inputBar, { paddingBottom: insets.bottom > 0 && keyboardOffset === 0 ? insets.bottom : 12 }]}
        >
          {replyingToName && (
            <View style={styles.replyingToRow}>
              <Text style={styles.replyingToText}>Replying to @{replyingToName}</Text>
              <TouchableOpacity
                onPress={() => {
                  setReplyingToId(null);
                  setReplyingToName(null);
                  setInputText('');
                }}
              >
                <Text style={styles.replyingToCancel}>✕</Text>
              </TouchableOpacity>
            </View>
          )}
          <View style={styles.mainInputWrap}>
            <View style={styles.mainInputAvatar}>
              <Text style={styles.replyAvatar}>😊</Text>
            </View>
            <TextInput
              ref={inputRef}
              style={styles.mainInput}
              placeholder={replyingToName ? `Reply to @${replyingToName}...` : 'Add a reply...'}
              placeholderTextColor="#9A7070"
              value={inputText}
              onChangeText={setInputText}
              returnKeyType="send"
              onSubmitEditing={handleSend}
              multiline
            />
            <TouchableOpacity
              style={[styles.sendBtn, inputText.trim().length > 0 && styles.sendBtnActive]}
              onPress={handleSend}
              activeOpacity={0.8}
            >
              <SendIcon active={inputText.trim().length > 0} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {selectedReply && (
        <Modal visible animationType="slide" presentationStyle="pageSheet" onRequestClose={() => setSelectedReply(null)}>
          <LocalThreadScreen
            title="Reply"
            headerEmoji={selectedReply.avatar}
            headerName={selectedReply.author}
            headerTime={selectedReply.createdAt}
            content={selectedReply.content}
            initialLikes={selectedReply.likes}
            initialLiked={selectedReply.likedByMe}
            initialReplies={selectedReply.replies ?? []}
            onClose={() => setSelectedReply(null)}
          />
        </Modal>
      )}
    </>
  );
}

interface Props {
  post: Post;
  onClose: () => void;
}

export const PostDetailScreen = ({ post, onClose }: Props) => <ApiThreadScreen post={post} onClose={onClose} />;

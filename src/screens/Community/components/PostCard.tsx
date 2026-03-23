import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { Post, Reply } from '../types';
import { styles } from '../styles/PostCard.styles';
import { TAG_COLORS } from '../styles/TagColors';
import { PostDetailScreen } from './PostDetailScreen';

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

const CommentIcon = () => (
  <Svg width={13} height={13} viewBox="0 0 24 24" fill="none">
    <Path
      d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"
      stroke="#9A7070"
      strokeWidth={1.8}
      strokeLinecap="round"
    />
  </Svg>
);

// One level of reply shown on main feed
const ReplyPreviewRow = ({ reply, isLast }: { reply: Reply; isLast: boolean }) => {
  const [liked, setLiked] = useState(reply.likedByMe);
  const [count, setCount] = useState(reply.likes);
  return (
    <View style={styles.replyWrap}>
      <View style={styles.threadLineCol}>
        <View style={[styles.threadLine, isLast && styles.threadLineLast]} />
        <View style={styles.threadDot} />
      </View>
      <View style={styles.replyContent}>
        <View style={styles.replyHeader}>
          <View style={styles.replyAvatarWrap}>
            <Text style={styles.replyAvatar}>{reply.avatar}</Text>
          </View>
          <Text style={styles.replyAuthor}>{reply.author}</Text>
          <Text style={styles.replyTime}>{reply.createdAt}</Text>
        </View>
        <Text style={styles.replyText}>{reply.content}</Text>
        <TouchableOpacity
          style={styles.replyLike}
          onPress={() => { setLiked(l => !l); setCount(c => liked ? c - 1 : c + 1); }}
          activeOpacity={0.7}
        >
          <HeartIcon filled={liked} />
          <Text style={[styles.replyLikeCount, liked && styles.replyLikeCountActive]}>{count}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

interface Props {
  post: Post;
}

export const PostCard = ({ post }: Props) => {
  const [liked, setLiked] = useState(post.likedByMe);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [showDetail, setShowDetail] = useState(false);
  const tagColor = TAG_COLORS[post.hallTag] ?? { bg: '#F0E0E0', text: '#6A4A4A' };
  const previewReplies = (post.replies ?? []).slice(0, 2); // show max 2 on feed
  const hasReplies = previewReplies.length > 0;

  return (
    <>
      {/* Tap anywhere on card to open detail */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => setShowDetail(true)}
        activeOpacity={0.95}
      >
        <View style={styles.postRow}>
          <View style={styles.avatarCol}>
            <View style={styles.avatarWrap}>
              <Text style={styles.avatar}>{post.avatar}</Text>
            </View>
            {hasReplies && <View style={styles.postThreadLine} />}
          </View>

          <View style={styles.postBody}>
            <View style={styles.postHeader}>
              <Text style={styles.authorName}>{post.author}</Text>
              <Text style={styles.createdAt}>{post.createdAt}</Text>
              <View style={[styles.hallTag, { backgroundColor: tagColor.bg }]}>
                <Text style={[styles.hallTagText, { color: tagColor.text }]}>{post.hallTag}</Text>
              </View>
            </View>

            <Text style={styles.content}>{post.content}</Text>

            <View style={styles.actions}>
              <TouchableOpacity
                style={styles.actionBtn}
                onPress={e => {
                  e.stopPropagation?.();
                  setLiked(l => !l);
                  setLikeCount(c => liked ? c - 1 : c + 1);
                }}
                activeOpacity={0.7}
              >
                <HeartIcon filled={liked} />
                <Text style={[styles.actionText, liked && styles.actionTextLiked]}>{likeCount}</Text>
              </TouchableOpacity>

              <View style={styles.actionBtn}>
                <CommentIcon />
                <Text style={styles.actionText}>{post.replies?.length ?? 0} ▾</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Preview replies (1 level only) */}
        {hasReplies && (
          <View style={styles.repliesSection}>
            {previewReplies.map((reply, i) => (
              <ReplyPreviewRow
                key={reply.id}
                reply={reply}
                isLast={i === previewReplies.length - 1}
              />
            ))}
            {(post.replies?.length ?? 0) > 2 && (
              <Text style={styles.moreReplies}>
                View {(post.replies?.length ?? 0) - 2} more repl{(post.replies?.length ?? 0) - 2 === 1 ? 'y' : 'ies'} →
              </Text>
            )}
          </View>
        )}
      </TouchableOpacity>

      {/* Full detail modal */}
      <Modal
        visible={showDetail}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowDetail(false)}
      >
        <PostDetailScreen post={post} onClose={() => setShowDetail(false)} />
      </Modal>
    </>
  );
};
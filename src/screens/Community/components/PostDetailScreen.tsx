import React, { useState, useRef, useEffect } from 'react';
import {
    View, Text, ScrollView, TouchableOpacity,
    TextInput, Platform, Modal, Keyboard,
    KeyboardEvent, Animated,
    } from 'react-native';
    import { useSafeAreaInsets } from 'react-native-safe-area-context';
    import Svg, { Path } from 'react-native-svg';
    import { Post, Reply } from '../types';
    import { TAG_COLORS } from '../styles/TagColors';
    import { styles } from '../styles/PostDetailScreen.styles';

    // ─── Icons ────────────────────────────────────────────────────────────────────
    const HeartIcon = ({ filled }: { filled: boolean }) => (
    <Svg width={13} height={13} viewBox="0 0 24 24" fill={filled ? '#FF3347' : 'none'}>
        <Path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
        stroke={filled ? '#FF3347' : '#9A7070'} strokeWidth={1.8} strokeLinecap="round" />
    </Svg>
    );

    const SendIcon = ({ active }: { active: boolean }) => (
    <Svg width={13} height={13} viewBox="0 0 24 24" fill="none">
        <Path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"
        stroke={active ? 'white' : '#9A7070'} strokeWidth={2} strokeLinecap="round" />
    </Svg>
    );

    const BackIcon = () => (
    <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
        <Path d="M19 12H5M12 5l-7 7 7 7" stroke="#1A0A0A" strokeWidth={2.5} strokeLinecap="round" />
    </Svg>
    );

    // ─── Keyboard offset hook ─────────────────────────────────────────────────────
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
        return () => { show.remove(); hide.remove(); };
    }, []);

    return offset;
    }

    // ─── Recursive helper ─────────────────────────────────────────────────────────
    function addReplyToTree(replies: Reply[], targetId: string, newReply: Reply): Reply[] {
    return replies.map(r => {
        if (r.id === targetId) return { ...r, replies: [...(r.replies ?? []), newReply] };
        if (r.replies?.length) return { ...r, replies: addReplyToTree(r.replies, targetId, newReply) };
        return r;
    });
    }

    // ─── Recursive reply row ──────────────────────────────────────────────────────
    const ReplyTree = ({
    reply, depth = 0, isLast, onReply, onTap,
    }: {
    reply: Reply; depth?: number; isLast: boolean;
    onReply: (id: string, author: string) => void;
    onTap: (reply: Reply) => void;
    }) => {
    const [liked, setLiked] = useState(reply.likedByMe);
    const [count, setCount] = useState(reply.likes);
    const nested = reply.replies ?? [];

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
                <TouchableOpacity style={styles.likeRow}
                onPress={() => { setLiked(l => !l); setCount(c => liked ? c - 1 : c + 1); }}
                activeOpacity={0.7}>
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
                    <ReplyTree key={nr.id} reply={nr} depth={depth + 1}
                    isLast={i === nested.length - 1}
                    onReply={onReply} onTap={onTap} />
                ))}
                </View>
            )}
            </View>
        </View>
        </View>
    );
    };

    // ─── ThreadScreen ─────────────────────────────────────────────────────────────
    const ThreadScreen = ({
    title, headerEmoji, headerName, headerTime,
    hallTag, content, initialLikes, initialLiked,
    initialReplies, onClose,
    }: {
    title: string; headerEmoji: string; headerName: string;
    headerTime: string; hallTag?: string; content: string;
    initialLikes: number; initialLiked: boolean;
    initialReplies: Reply[]; onClose: () => void;
    }) => {
    const insets = useSafeAreaInsets();
    const keyboardOffset = useKeyboardOffset();
    const [liked, setLiked] = useState(initialLiked);
    const [likeCount, setLikeCount] = useState(initialLikes);
    const [replies, setReplies] = useState<Reply[]>(initialReplies);
    const [inputText, setInputText] = useState('');
    const [replyingToId, setReplyingToId] = useState<string | null>(null);
    const [replyingToName, setReplyingToName] = useState<string | null>(null);
    const [selectedReply, setSelectedReply] = useState<Reply | null>(null);
    const inputRef = useRef<TextInput>(null);
    const scrollRef = useRef<ScrollView>(null);

    const tagColor = hallTag ? (TAG_COLORS as any)[hallTag] : null;

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

    const handleSend = () => {
        if (!inputText.trim()) return;
        const newReply: Reply = {
        id: Date.now().toString(), author: 'You', avatar: '😊',
        content: inputText.trim(), likes: 0, likedByMe: false,
        createdAt: 'just now', replies: [],
        };
        if (replyingToId) {
        setReplies(prev => addReplyToTree(prev, replyingToId, newReply));
        } else {
        setReplies(prev => [...prev, newReply]);
        }
        setInputText('');
        setReplyingToId(null);
        setReplyingToName(null);
    };

    return (
        <>
        {/* Use paddingBottom on the outermost view instead of KeyboardAvoidingView */}
        <View style={[styles.screen, { paddingTop: insets.top, paddingBottom: keyboardOffset }]}>
            <View style={styles.header}>
            <TouchableOpacity style={styles.backBtn} onPress={onClose} activeOpacity={0.7}>
                <BackIcon />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>{title}</Text>
            </View>

            <ScrollView
            ref={scrollRef}
            style={styles.scroll}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            >
            <View style={styles.postSection}>
                <View style={styles.postHeader}>
                <View style={styles.avatarWrap}>
                    <Text style={styles.avatar}>{headerEmoji}</Text>
                </View>
                <View style={styles.postAuthorInfo}>
                    <Text style={styles.authorName}>{headerName}</Text>
                    <Text style={styles.createdAt}>{headerTime}</Text>
                </View>
                {tagColor && (
                    <View style={[styles.hallTag, { backgroundColor: tagColor.bg }]}>
                    <Text style={[styles.hallTagText, { color: tagColor.text }]}>{hallTag}</Text>
                    </View>
                )}
                </View>
                <Text style={styles.postContent}>{content}</Text>
                <View style={styles.statsRow}>
                <Text style={styles.statText}>{likeCount} likes</Text>
                <Text style={styles.statDot}>·</Text>
                <Text style={styles.statText}>{replies.length} replies</Text>
                </View>
                <View style={styles.postActions}>
                <TouchableOpacity style={styles.actionBtn}
                    onPress={() => { setLiked(l => !l); setLikeCount(c => liked ? c - 1 : c + 1); }}
                    activeOpacity={0.7}>
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
                <ReplyTree key={reply.id} reply={reply}
                    isLast={i === replies.length - 1}
                    onReply={focusReply} onTap={setSelectedReply} />
                ))}
            </View>
            </ScrollView>

            {/* Input always visible, pushed up by keyboardOffset */}
            <View style={[styles.inputBar, { paddingBottom: insets.bottom > 0 && keyboardOffset === 0 ? insets.bottom : 12 }]}>
            {replyingToName && (
                <View style={styles.replyingToRow}>
                <Text style={styles.replyingToText}>Replying to @{replyingToName}</Text>
                <TouchableOpacity onPress={() => { setReplyingToId(null); setReplyingToName(null); setInputText(''); }}>
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
                onPress={handleSend} activeOpacity={0.8}>
                <SendIcon active={inputText.trim().length > 0} />
                </TouchableOpacity>
            </View>
            </View>
        </View>

        {selectedReply && (
            <Modal visible animationType="slide" presentationStyle="pageSheet"
            onRequestClose={() => setSelectedReply(null)}>
            <ThreadScreen
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
    };

    // ─── Entry point ──────────────────────────────────────────────────────────────
    interface Props { post: Post; onClose: () => void; }

    export const PostDetailScreen = ({ post, onClose }: Props) => (
    <ThreadScreen
        title="Post"
        headerEmoji={post.avatar}
        headerName={post.author}
        headerTime={post.createdAt}
        hallTag={post.hallTag}
        content={post.content}
        initialLikes={post.likes}
        initialLiked={post.likedByMe}
        initialReplies={post.replies ?? []}
        onClose={onClose}
    />
);
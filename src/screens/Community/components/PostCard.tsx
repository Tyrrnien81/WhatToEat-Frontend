import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { Post, Reply } from '../types';
import { styles, TAG_COLORS } from '../styles/PostCard.styles';

// ─── Icons ────────────────────────────────────────────────────────────────────
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

    // ─── Reply row ────────────────────────────────────────────────────────────────
    const ReplyRow = ({ reply, isLast }: { reply: Reply; isLast: boolean }) => {
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
            <Text style={[styles.replyLikeCount, liked && styles.replyLikeCountActive]}>
                {count}
            </Text>
            </TouchableOpacity>
        </View>
        </View>
    );
    };

    // ─── Reply input ──────────────────────────────────────────────────────────────
    const ReplyInput = ({ onSubmit }: { onSubmit: (text: string) => void }) => {
    const [text, setText] = useState('');

    const handleSend = () => {
        if (text.trim().length === 0) return;
        onSubmit(text.trim());
        setText('');
    };

    return (
        <View style={styles.replyInputWrap}>
        <View style={styles.replyInputAvatarWrap}>
            <Text style={styles.replyInputAvatar}>😊</Text>
        </View>
        <TextInput
            style={styles.replyInput}
            placeholder="Write a reply..."
            placeholderTextColor="#9A7070"
            value={text}
            onChangeText={setText}
            returnKeyType="send"
            onSubmitEditing={handleSend}
            multiline={false}
        />
        <TouchableOpacity
            style={[styles.replyInputSend, text.trim().length > 0 && styles.replyInputSendActive]}
            onPress={handleSend}
            activeOpacity={0.8}
            disabled={text.trim().length === 0}
        >
            <Svg width={14} height={14} viewBox="0 0 24 24" fill="none">
            <Path
                d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"
                stroke={text.trim().length > 0 ? 'white' : '#9A7070'}
                strokeWidth={2}
                strokeLinecap="round"
            />
            </Svg>
        </TouchableOpacity>
        </View>
    );
    };

    // ─── Post card ────────────────────────────────────────────────────────────────
    interface Props {
    post: Post;
    }

    export const PostCard = ({ post }: Props) => {
    const [liked, setLiked] = useState(post.likedByMe);
    const [likeCount, setLikeCount] = useState(post.likes);
    const [replies, setReplies] = useState<Reply[]>(post.replies ?? []);
    const [showReplies, setShowReplies] = useState(true);
    const [showReplyInput, setShowReplyInput] = useState(false);
    const tagColor = TAG_COLORS[post.hallTag] ?? { bg: '#F0E0E0', text: '#6A4A4A' };
    const hasReplies = replies.length > 0;

    const handleAddReply = (text: string) => {
        const newReply: Reply = {
        id: Date.now().toString(),
        author: 'You',
        avatar: '😊',
        content: text,
        likes: 0,
        likedByMe: false,
        createdAt: 'just now',
        };
        setReplies(prev => [...prev, newReply]);
        setShowReplies(true);
        setShowReplyInput(false);
    };

    return (
        <View style={styles.card}>
        {/* ── Main post ── */}
        <View style={styles.postRow}>
            <View style={styles.avatarCol}>
            <View style={styles.avatarWrap}>
                <Text style={styles.avatar}>{post.avatar}</Text>
            </View>
            {(hasReplies && showReplies) || showReplyInput
                ? <View style={styles.postThreadLine} />
                : null}
            </View>

            <View style={styles.postBody}>
            <View style={styles.postHeader}>
                <Text style={styles.authorName}>{post.author}</Text>
                <Text style={styles.createdAt}>{post.createdAt}</Text>
                <View style={[styles.hallTag, { backgroundColor: tagColor.bg }]}>
                <Text style={[styles.hallTagText, { color: tagColor.text }]}>
                    {post.hallTag}
                </Text>
                </View>
            </View>

            <Text style={styles.content}>{post.content}</Text>

            <View style={styles.actions}>
                <TouchableOpacity
                style={styles.actionBtn}
                onPress={() => { setLiked(l => !l); setLikeCount(c => liked ? c - 1 : c + 1); }}
                activeOpacity={0.7}
                >
                <HeartIcon filled={liked} />
                <Text style={[styles.actionText, liked && styles.actionTextLiked]}>
                    {likeCount}
                </Text>
                </TouchableOpacity>

                <TouchableOpacity
                style={styles.actionBtn}
                onPress={() => {
                    if (hasReplies) setShowReplies(v => !v);
                    setShowReplyInput(v => !v);
                }}
                activeOpacity={0.7}
                >
                <CommentIcon />
                <Text style={styles.actionText}>
                    {replies.length} {showReplyInput ? '▴' : '▾'}
                </Text>
                </TouchableOpacity>
            </View>
            </View>
        </View>

        {/* ── Replies ── */}
        {hasReplies && showReplies && (
            <View style={styles.repliesSection}>
            {replies.map((reply, i) => (
                <ReplyRow
                key={reply.id}
                reply={reply}
                isLast={i === replies.length - 1 && !showReplyInput}
                />
            ))}
            </View>
        )}

        {/* ── Reply input ── */}
        {showReplyInput && (
            <View style={styles.repliesSection}>
            <View style={styles.replyWrap}>
                <View style={styles.threadLineCol}>
                <View style={[styles.threadLine, styles.threadLineLast]} />
                <View style={styles.threadDot} />
                </View>
                <View style={{ flex: 1 }}>
                <ReplyInput onSubmit={handleAddReply} />
                </View>
            </View>
            </View>
        )}
        </View>
    );
};
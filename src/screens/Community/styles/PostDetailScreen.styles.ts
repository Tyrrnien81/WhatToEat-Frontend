import { StyleSheet } from 'react-native';
import { C } from '../../DiningHall/theme';

export const styles = StyleSheet.create({
    screen: { flex: 1, backgroundColor: C.bg2 },

    // ─── Header ───────────────────────────────────────────────────────────────
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1.5,
        borderBottomColor: 'rgba(42,26,26,0.08)',
        gap: 12,
    },
    backBtn: {
        width: 34, height: 34, borderRadius: 10,
        borderWidth: 2, borderColor: C.border,
        backgroundColor: C.bg,
        alignItems: 'center', justifyContent: 'center',
    },
    headerTitle: { fontSize: 16, fontWeight: '800', color: C.ink },

    scroll: { flex: 1 },
    scrollContent: { paddingTop: 16 },

    // ─── Original post ────────────────────────────────────────────────────────
    postSection: {
        paddingHorizontal: 16,
        paddingBottom: 12,
        borderBottomWidth: 1.5,
        borderBottomColor: 'rgba(42,26,26,0.08)',
    },
    postHeader: {
        flexDirection: 'row', alignItems: 'center',
        gap: 10, marginBottom: 12,
    },
    avatarWrap: {
        width: 44, height: 44, borderRadius: 14,
        backgroundColor: C.bg, borderWidth: 2, borderColor: C.border,
        alignItems: 'center', justifyContent: 'center',
    },
    avatar: { fontSize: 22 },
    postAuthorInfo: { flex: 1 },
    authorName: { fontSize: 15, fontWeight: '800', color: C.ink },
    createdAt: { fontSize: 11, fontWeight: '500', color: C.inkMuted, marginTop: 1 },
    hallTag: {
        paddingVertical: 4, paddingHorizontal: 10,
        borderRadius: 10, borderWidth: 1.5, borderColor: C.border,
    },
    hallTagText: { fontSize: 11, fontWeight: '800' },
    postContent: {
        fontSize: 16, fontWeight: '400', color: C.ink,
        lineHeight: 24, marginBottom: 14,
    },
    statsRow: {
        flexDirection: 'row', alignItems: 'center', gap: 6,
        paddingVertical: 10,
        borderTopWidth: 1, borderBottomWidth: 1,
        borderColor: 'rgba(42,26,26,0.08)',
        marginBottom: 8,
    },
    statText: { fontSize: 13, fontWeight: '600', color: C.inkMuted },
    statDot: { fontSize: 13, color: C.inkMuted },
    postActions: { flexDirection: 'row', gap: 20, paddingTop: 4 },
    actionBtn: { flexDirection: 'row', alignItems: 'center', gap: 6 },
    actionText: { fontSize: 13, fontWeight: '600', color: C.inkMuted },
    actionTextLiked: { color: C.red },

    // ─── Reply rows ───────────────────────────────────────────────────────────
    repliesSection: { paddingHorizontal: 16, paddingTop: 8 },
    replyWrap: { flexDirection: 'row', marginBottom: 14 },
    threadLineCol: {
        width: 44, alignItems: 'center', marginRight: 10,
    },
    threadLine: {
        width: 2, flex: 1,
        backgroundColor: 'rgba(42,26,26,0.15)',
        borderRadius: 1, marginBottom: 4,
    },
    threadLineLast: { maxHeight: 14 },
    threadDot: {
        width: 6, height: 6, borderRadius: 3,
        backgroundColor: 'rgba(42,26,26,0.2)',
    },
    replyContent: { flex: 1 },
    replyHeader: {
        flexDirection: 'row', alignItems: 'center',
        gap: 6, marginBottom: 4,
    },
    replyAvatarWrap: {
        width: 28, height: 28, borderRadius: 9,
        backgroundColor: C.bg, borderWidth: 1.5, borderColor: C.border,
        alignItems: 'center', justifyContent: 'center',
    },
    replyAvatar: { fontSize: 13 },
    replyAuthor: { fontSize: 13, fontWeight: '700', color: C.ink },
    replyTime: { fontSize: 11, fontWeight: '500', color: C.inkMuted },
    replyText: {
        fontSize: 14, fontWeight: '400', color: C.ink,
        lineHeight: 20, marginBottom: 6,
    },
    replyActions: {
        flexDirection: 'row', alignItems: 'center',
        gap: 14, marginBottom: 8,
    },
    likeRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
    likeCount: { fontSize: 12, fontWeight: '600', color: C.inkMuted },
    likeCountActive: { color: C.red },
    replyBtn: { fontSize: 12, fontWeight: '700', color: C.inkMuted },

    // ─── Nested replies ───────────────────────────────────────────────────────
    nestedSection: { marginBottom: 4 },
    nestedReplyWrap: { flexDirection: 'row', marginBottom: 10 },
    nestedThreadCol: {
        width: 28, alignItems: 'center', marginRight: 8,
    },
    nestedThreadLine: {
        width: 2, flex: 1,
        backgroundColor: 'rgba(42,26,26,0.1)',
        borderRadius: 1, marginBottom: 4,
    },
    nestedReplyContent: { flex: 1 },

    // ─── Input bar ────────────────────────────────────────────────────────────
    inputBar: {
        borderTopWidth: 1.5,
        borderTopColor: 'rgba(42,26,26,0.08)',
        backgroundColor: C.bg2,
        paddingHorizontal: 16,
        paddingTop: 8,
    },
    replyingToRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: 6,
    },
    replyingToText: {
        fontSize: 11,
        fontWeight: '600',
        color: C.inkMuted,
    },
    replyingToCancel: {
        fontSize: 13,
        fontWeight: '700',
        color: C.inkMuted,
        paddingHorizontal: 4,
    },
    mainInputWrap: {
        flexDirection: 'row', alignItems: 'center', gap: 10,
    },
    mainInputAvatar: {
        width: 32, height: 32, borderRadius: 10,
        backgroundColor: C.bg, borderWidth: 1.5, borderColor: C.border,
        alignItems: 'center', justifyContent: 'center',
    },
    mainInput: {
        flex: 1, fontSize: 14, color: C.ink,
        backgroundColor: C.bg,
        borderWidth: 1.5, borderColor: 'rgba(42,26,26,0.2)',
        borderRadius: 12,
        paddingHorizontal: 12, paddingVertical: 8,
        maxHeight: 80,
    },
    sendBtn: {
        width: 32, height: 32, borderRadius: 10,
        backgroundColor: 'rgba(42,26,26,0.08)',
        borderWidth: 1.5, borderColor: 'rgba(42,26,26,0.15)',
        alignItems: 'center', justifyContent: 'center',
    },
    sendBtnActive: {
        backgroundColor: C.red,
        borderColor: C.border,
    },
});
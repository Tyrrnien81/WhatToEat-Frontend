import { StyleSheet } from 'react-native';
import { C } from '../../DiningHall/theme';
import { DiningHallTag } from '../types';
export { TAG_COLORS } from './TagColors';

export const styles = StyleSheet.create({
    card: {
        marginBottom: 4,
        paddingTop: 16,
        paddingHorizontal: 16,
        borderBottomWidth: 1.5,
        borderBottomColor: 'rgba(42,26,26,0.08)',
    },

    // ─── Main post ────────────────────────────────────────────────────────────
    postRow: {
        flexDirection: 'row',
        gap: 12,
    },
    avatarCol: {
        alignItems: 'center',
        width: 40,
    },
    avatarWrap: {
        width: 40,
        height: 40,
        borderRadius: 14,
        backgroundColor: C.bg,
        borderWidth: 2,
        borderColor: C.border,
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatar: { fontSize: 20 },
    postThreadLine: {
        width: 2,
        flex: 1,
        marginTop: 6,
        backgroundColor: 'rgba(42,26,26,0.15)',
        borderRadius: 1,
        minHeight: 20,
    },
    postBody: {
        flex: 1,
        paddingBottom: 12,
    },
    postHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginBottom: 4,
        flexWrap: 'wrap',
    },
    authorName: {
        fontSize: 14,
        fontWeight: '800',
        color: C.ink,
        letterSpacing: -0.2,
    },
    createdAt: {
        fontSize: 11,
        fontWeight: '500',
        color: C.inkMuted,
        flex: 1,
    },
    hallTag: {
        paddingVertical: 3,
        paddingHorizontal: 8,
        borderRadius: 8,
        borderWidth: 1.5,
        borderColor: C.border,
    },
    hallTagText: {
        fontSize: 10,
        fontWeight: '800',
        letterSpacing: 0.2,
    },
    content: {
        fontSize: 14,
        fontWeight: '400',
        color: C.ink,
        lineHeight: 21,
        marginBottom: 10,
    },
    actions: {
        flexDirection: 'row',
        gap: 18,
        paddingBottom: 4,
    },
    actionBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    actionText: {
        fontSize: 12,
        fontWeight: '600',
        color: C.inkMuted,
    },
    actionTextLiked: {
        color: C.red,
    },

    // ─── Replies ──────────────────────────────────────────────────────────────
    repliesSection: {
        marginLeft: 20,
    },
    replyWrap: {
        flexDirection: 'row',
        marginBottom: 12,
    },
    threadLineCol: {
        width: 40,
        alignItems: 'center',
        marginRight: 12,
    },
    threadLine: {
        width: 2,
        flex: 1,
        backgroundColor: 'rgba(42,26,26,0.15)',
        borderRadius: 1,
        marginBottom: 4,
    },
    threadLineLast: {
        maxHeight: 16,
    },
    threadDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: 'rgba(42,26,26,0.2)',
        marginBottom: 2,
    },
    replyContent: {
        flex: 1,
    },
    replyHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginBottom: 3,
    },
    replyAvatarWrap: {
        width: 26,
        height: 26,
        borderRadius: 8,
        backgroundColor: C.bg,
        borderWidth: 1.5,
        borderColor: C.border,
        alignItems: 'center',
        justifyContent: 'center',
    },
    replyAvatar: { fontSize: 12 },
    replyAuthor: {
        fontSize: 12,
        fontWeight: '700',
        color: C.ink,
    },
    replyTime: {
        fontSize: 10,
        fontWeight: '500',
        color: C.inkMuted,
    },
    replyText: {
        fontSize: 13,
        fontWeight: '400',
        color: C.ink,
        lineHeight: 19,
        marginBottom: 6,
    },
    replyLike: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        marginBottom: 4,
    },
    replyLikeCount: {
        fontSize: 11,
        fontWeight: '600',
        color: C.inkMuted,
    },
    replyLikeCountActive: {
        color: C.red,
    },

    // ─── Reply input ──────────────────────────────────────────────────────────
    replyInputWrap: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        paddingVertical: 6,
    },
    replyInputAvatarWrap: {
        width: 26,
        height: 26,
        borderRadius: 8,
        backgroundColor: C.bg,
        borderWidth: 1.5,
        borderColor: C.border,
        alignItems: 'center',
        justifyContent: 'center',
    },
    replyInputAvatar: { fontSize: 12 },
    replyInput: {
        flex: 1,
        fontSize: 13,
        fontWeight: '400',
        color: C.ink,
        backgroundColor: C.bg,
        borderWidth: 1.5,
        borderColor: 'rgba(42,26,26,0.2)',
        borderRadius: 10,
        paddingHorizontal: 12,
        paddingVertical: 6,
    },
    replyInputSend: {
        width: 30,
        height: 30,
        borderRadius: 10,
        backgroundColor: 'rgba(42,26,26,0.1)',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1.5,
        borderColor: 'rgba(42,26,26,0.15)',
    },
    replyInputSendActive: {
        backgroundColor: C.red,
        borderColor: C.border,
    },

    moreReplies: {
        fontSize: 12,
        fontWeight: '700',
        color: '#9A7070',
        marginLeft: 72,
        marginBottom: 12,
    },
});
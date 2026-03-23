import { StyleSheet, Platform } from 'react-native';
import { C } from '../../DiningHall/theme';

export const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: C.bg2,
    },
    header: {
        paddingHorizontal: 20,
        paddingTop: 16,
        paddingBottom: 12,
        borderBottomWidth: 1.5,
        borderBottomColor: 'rgba(42,26,26,0.08)',
    },
    title: {
        fontSize: 24,
        fontWeight: '900',
        color: C.ink,
        letterSpacing: -0.8,
    },
    subtitle: {
        fontSize: 12,
        fontWeight: '500',
        color: C.inkMuted,
        marginTop: 2,
    },
    tagSection: {
        borderBottomWidth: 1.5,
        borderBottomColor: 'rgba(42,26,26,0.08)',
        paddingVertical: 10,
    },
    scrollBody: { flex: 1 },
    scrollContent: {
        paddingBottom: 100,
    },

    // Empty state
    emptyState: {
        alignItems: 'center',
        paddingTop: 80,
        gap: 8,
    },
    emptyEmoji: {
        fontSize: 48,
        marginBottom: 4,
    },
    emptyTitle: {
        fontSize: 16,
        fontWeight: '900',
        color: C.ink,
    },
    emptySubtitle: {
        fontSize: 12,
        fontWeight: '500',
        color: C.inkMuted,
    },

    // FAB — bottom RIGHT
    fab: {
        position: 'absolute',
        right: 20,
        width: 52,
        height: 52,
        borderRadius: 16,
        backgroundColor: C.red,
        borderWidth: 2.5,
        borderColor: C.border,
        alignItems: 'center',
        justifyContent: 'center',
        ...Platform.select({
        ios: { shadowColor: C.border, shadowOffset: { width: 3, height: 3 }, shadowOpacity: 1, shadowRadius: 0 },
        android: { elevation: 4 },
        }),
    },
});
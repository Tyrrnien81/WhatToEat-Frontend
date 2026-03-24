import { StyleSheet, Platform } from 'react-native';
import { C } from '../../DiningHall/theme';

export const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: C.bg,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 24,
    },

    // Illustration
    illustrationWrap: {
        alignItems: 'center',
        marginBottom: 32,
    },
    illustrationEmoji: {
        fontSize: 56,
        marginBottom: 16,
    },
    bubbleRow: {
        gap: 8,
        alignItems: 'center',
    },
    bubble: {
        paddingVertical: 8,
        paddingHorizontal: 14,
        borderRadius: 16,
        borderWidth: 2,
        borderColor: C.border,
    },
    bubble1: { backgroundColor: '#FFE8D6', transform: [{ rotate: '-2deg' }] },
    bubble2: { backgroundColor: '#E8F4FF', transform: [{ rotate: '1.5deg' }] },
    bubble3: { backgroundColor: '#E8FFE8', transform: [{ rotate: '-1deg' }] },
    bubbleText: {
        fontSize: 12,
        fontWeight: '700',
        color: C.ink,
    },

    // Card
    card: {
        width: '100%',
        backgroundColor: C.bg2,
        borderWidth: 2.5,
        borderColor: C.border,
        borderRadius: 24,
        padding: 24,
        alignItems: 'center',
        ...Platform.select({
        ios: { shadowColor: C.border, shadowOffset: { width: 4, height: 4 }, shadowOpacity: 1, shadowRadius: 0 },
        android: { elevation: 4 },
        }),
    },
    title: {
        fontSize: 22,
        fontWeight: '900',
        color: C.ink,
        letterSpacing: -0.5,
        marginBottom: 10,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 13,
        fontWeight: '500',
        color: C.inkMuted,
        textAlign: 'center',
        lineHeight: 20,
        marginBottom: 24,
    },

    // Buttons
    btnPrimary: {
        width: '100%',
        backgroundColor: C.red,
        borderWidth: 2.5,
        borderColor: C.border,
        borderRadius: 16,
        paddingVertical: 14,
        alignItems: 'center',
        marginBottom: 10,
        ...Platform.select({
        ios: { shadowColor: C.border, shadowOffset: { width: 3, height: 3 }, shadowOpacity: 1, shadowRadius: 0 },
        android: { elevation: 3 },
        }),
    },
    btnPrimaryText: {
        fontSize: 15,
        fontWeight: '900',
        color: 'white',
    },
    btnSecondary: {
        width: '100%',
        backgroundColor: C.bg,
        borderWidth: 2,
        borderColor: C.border,
        borderRadius: 16,
        paddingVertical: 12,
        alignItems: 'center',
    },
    btnSecondaryText: {
        fontSize: 14,
        fontWeight: '700',
        color: C.ink,
    },

    hint: {
        marginTop: 20,
        fontSize: 11,
        fontWeight: '500',
        color: C.inkMuted,
    },
});
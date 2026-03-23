import { StyleSheet } from 'react-native';
import { C } from '../theme';

const PILL_WIDTH = 64;
const HEIGHT = 56;
const RADIUS = 14;

export const styles = StyleSheet.create({
    wrapper: {
        marginTop: 16,
        paddingHorizontal: 20,
    },
    container: {
        height: HEIGHT,
        borderRadius: RADIUS,
        borderWidth: 2.5,
        borderColor: C.border,
        overflow: 'hidden',
        backgroundColor: C.bg,
    },
    selectedBg: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        width: PILL_WIDTH,
        backgroundColor: C.red,
        zIndex: 0,
    },
    row: {
        flexDirection: 'row',
    },
    pill: {
        width: PILL_WIDTH,
        height: HEIGHT,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1,
        backgroundColor: 'transparent',
    },
    pillDivider: {
        borderLeftWidth: 1.5,
        borderLeftColor: 'rgba(42,26,26,0.15)',
    },
    fillerPill: {
        opacity: 0.3,
    },
    fillerIcon: {
        fontSize: 11,
    },
    fillerText: {
        fontSize: 8,
        fontWeight: '700',
        color: C.inkMuted,
        textAlign: 'center',
        lineHeight: 10,
    },
    day: {
        fontSize: 8,
        fontWeight: '700',
        letterSpacing: 0.5,
        color: C.inkMuted,
        textTransform: 'uppercase',
    },
    daySelected: {
        color: 'rgba(255,255,255,0.8)',
    },
    num: {
        fontSize: 18,
        fontWeight: '900',
        color: C.ink,
        lineHeight: 22,
    },
    numSelected: {
        color: 'white',
    },
});
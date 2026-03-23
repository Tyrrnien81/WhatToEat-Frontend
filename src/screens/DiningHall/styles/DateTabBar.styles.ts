import { StyleSheet } from 'react-native';
import { C } from '../theme';

export const styles = StyleSheet.create({
    dateTabs: {
        flexGrow: 0,
        marginTop: 16,
    },
    dateTabsContent: {
        paddingHorizontal: 18,
        gap: 8,
    },
    dateTab: {
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 14,
        borderRadius: 16,
        borderWidth: 2.5,
        borderColor: C.border,
        backgroundColor: C.bg,
        minWidth: 58,
    },
    dateTabSelected: {
        backgroundColor: C.red,
        borderColor: C.border,
    },
    dateTabDay: {
        fontSize: 10,
        fontWeight: '700',
        color: C.inkMuted,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    dateTabDaySelected: {
        color: 'rgba(255,255,255,0.8)',
    },
    dateTabNum: {
        fontSize: 20,
        fontWeight: '900',
        color: C.ink,
        lineHeight: 24,
    },
    dateTabNumSelected: {
        color: 'white',
    },
    dateTabMonth: {
        fontSize: 10,
        fontWeight: '600',
        color: C.inkMuted,
    },
    dateTabMonthSelected: {
        color: 'rgba(255,255,255,0.8)',
    },
});
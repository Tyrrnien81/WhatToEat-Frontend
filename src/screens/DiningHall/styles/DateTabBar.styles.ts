import { StyleSheet } from 'react-native';
import { C } from '../theme';

const PILL_WIDTH = 48;
const HEIGHT = 48;

export const styles = StyleSheet.create({
    wrapper: {
        paddingHorizontal: 20,
        paddingTop: 12,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
    },
    pill: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: PILL_WIDTH,
        height: HEIGHT,
        borderRadius: 14,
        borderWidth: 2,
        borderColor: C.border,
    },
    pillDefault: { backgroundColor: C.bg },
    pillActive:  { backgroundColor: C.red },
    pillPast:    { backgroundColor: '#3A2A2A' },
    pillFuture:  { backgroundColor: '#E0D8D0' },
    day: {
        fontSize: 8,
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: 0.3,
    },
    num: {
        fontSize: 13,
        fontWeight: '900',
        lineHeight: 16,
    },
});
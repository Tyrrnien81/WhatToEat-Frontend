import { StyleSheet } from 'react-native';
import { C } from '../../DiningHall/theme';

export const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 16,
        marginTop: 10,
        marginBottom: 10,
        paddingHorizontal: 14,
        paddingVertical: 9,
        backgroundColor: C.bg,
        borderWidth: 1.5,
        borderColor: 'rgba(42,26,26,0.15)',
        borderRadius: 12,
        gap: 8,
    },
    icon: {},
    input: {
        flex: 1,
        fontSize: 14,
        fontWeight: '400',
        color: C.ink,
        padding: 0,
    },
    clearBtn: {
        padding: 4,
    },
    clearText: {
        fontSize: 13,
        fontWeight: '700',
        color: '#9A7070',
    },
});
import { StyleSheet } from 'react-native';
import { COLORS } from '../../../constants/COLORS';

export const styles = StyleSheet.create({
  continueBtn: {
    height: 54,
    backgroundColor: COLORS.red,
    borderWidth: 2.5, borderColor: COLORS.border,
    borderRadius: 18,
    marginHorizontal: 22, marginBottom: 8,
    alignItems: 'center', justifyContent: 'center',
    shadowColor: COLORS.border,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1, shadowRadius: 0, elevation: 4,
  },
  continueBtnDisabled: { opacity: 0.4 },
  continueBtnText: {
    fontSize: 15, fontWeight: '900', color: 'white', letterSpacing: -0.3,
  },
});
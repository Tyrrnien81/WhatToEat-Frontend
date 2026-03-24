import { StyleSheet } from 'react-native';
import { COLORS } from '../../../constants/COLORS';

export const styles = StyleSheet.create({
  skipBtn: {
    marginTop: 14,
    paddingVertical: 8,
    paddingHorizontal: 14,
    backgroundColor: COLORS.bg2,
    borderWidth: 2,
    borderColor: COLORS.border,
    borderRadius: 12,
    shadowColor: COLORS.border,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 3,
  },
  skipBtnText: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.inkMuted,
  },
});
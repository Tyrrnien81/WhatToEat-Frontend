import { StyleSheet } from 'react-native';
import { COLORS } from '../../../constants/COLORS';

export const styles = StyleSheet.create({
  header: {
    paddingTop: 22,
    paddingBottom: 4,
    gap: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: COLORS.ink,
    letterSpacing: -1,
  },
  dividerLine: {
    height: 2,
    backgroundColor: COLORS.border,
    opacity: 0.1,
    borderRadius: 2,
  },
  subtitle: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.inkMuted,
    lineHeight: 18,
  },
});
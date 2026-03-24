import { StyleSheet } from 'react-native';
import { COLORS } from '../../../constants/COLORS';

export const styles = StyleSheet.create({
  hero: {
    alignItems: 'center',
    paddingTop: 28,
    paddingBottom: 24,
    gap: 8,
  },
  appIcon: {
    width: 72,
    height: 72,
    backgroundColor: COLORS.red,
    borderWidth: 3,
    borderColor: COLORS.border,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
    shadowColor: COLORS.border,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
  },
  appIconEmoji: {
    fontSize: 36,
  },
  appTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: COLORS.ink,
    letterSpacing: -1,
    lineHeight: 32,
  },
  appTitleAccent: {
    color: COLORS.red,
  },
  appTagline: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.inkMuted,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
});
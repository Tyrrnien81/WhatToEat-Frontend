import { StyleSheet } from 'react-native';
import { COLORS } from '../../../constants/COLORS';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.beige,
  },

  // Content
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },

  // Logo
  logoWrap: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoIcon: {
    width: 88, height: 88,
    backgroundColor: COLORS.red,
    borderWidth: 3, borderColor: COLORS.border,
    borderRadius: 26,
    alignItems: 'center', justifyContent: 'center',
    marginBottom: 20,
    shadowColor: COLORS.border,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1, shadowRadius: 0, elevation: 4,
  },
  logoEmoji: { fontSize: 44 },
  logoTitle: {
    fontSize: 34, fontWeight: '900',
    color: COLORS.ink, letterSpacing: -1.5,
    lineHeight: 36,
  },
  logoAccent: { color: COLORS.red },
  logoTagline: {
    fontSize: 11, fontWeight: '700',
    color: COLORS.inkMuted, letterSpacing: 1.5,
    textTransform: 'uppercase', marginTop: 8,
  },

  // Divider
  divider: {
    width: 40, height: 3,
    backgroundColor: COLORS.border,
    borderRadius: 2, opacity: 0.12,
    marginBottom: 40,
  },

  // Description
  description: {
    fontSize: 15, fontWeight: '500',
    color: COLORS.inkMuted, lineHeight: 26,
    textAlign: 'center',
  },
  descriptionBold: {
    fontWeight: '800', color: COLORS.ink,
  },

  // Bottom Section
  bottomSection: {
    paddingHorizontal: 28,
    paddingBottom: 36,
    gap: 14,
  },

  // Get Started Button
  getStartedBtn: {
    height: 56,
    backgroundColor: COLORS.red,
    borderWidth: 2.5, borderColor: COLORS.border,
    borderRadius: 18,
    alignItems: 'center', justifyContent: 'center',
    shadowColor: COLORS.border,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1, shadowRadius: 0, elevation: 4,
  },
  getStartedBtnText: {
    fontSize: 16, fontWeight: '900',
    color: 'white', letterSpacing: -0.3,
  },

  // Login Button
  loginBtn: {
    height: 52,
    backgroundColor: COLORS.bg2,
    borderWidth: 2.5, borderColor: COLORS.border,
    borderRadius: 18,
    alignItems: 'center', justifyContent: 'center',
    shadowColor: COLORS.border,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1, shadowRadius: 0, elevation: 2,
  },
  loginBtnText: {
    fontSize: 15, fontWeight: '800',
    color: COLORS.ink, letterSpacing: -0.3,
  },

  // Terms
  terms: {
    fontSize: 10, fontWeight: '500',
    color: COLORS.inkMuted, textAlign: 'center', lineHeight: 16,
  },
  termsLink: { fontWeight: '700', color: COLORS.inkMuted },
});
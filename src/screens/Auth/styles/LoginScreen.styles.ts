import { StyleSheet } from 'react-native';
import { COLORS } from '../../../constants/COLORS';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.beige,
  },
  kav: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingBottom: 40,
  },

  // Form Card
  formCard: {
    backgroundColor: COLORS.bg2,
    borderWidth: 2.5,
    borderColor: COLORS.border,
    borderRadius: 24,
    padding: 20,
    gap: 14,
    shadowColor: COLORS.border,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
  },
  formCardTitle: {
    fontSize: 17,
    fontWeight: '900',
    color: COLORS.ink,
    letterSpacing: -0.5,
    marginBottom: 2,
  },

  // Field
  fieldGroup: {
    gap: 5,
  },
  fieldLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.inkMuted,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  fieldWrap: {
    position: 'relative',
  },
  fieldInput: {
    paddingVertical: 11,
    paddingHorizontal: 14,
    backgroundColor: COLORS.beige,
    borderWidth: 2.5,
    borderColor: COLORS.border,
    borderRadius: 14,
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.ink,
  },
  fieldInputError: {
    borderColor: COLORS.red,
    backgroundColor: '#FFF5F5',
  },
  fieldError: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.red,
  },
  eyeToggle: {
    position: 'absolute',
    right: 12,
    top: '50%',
    transform: [{ translateY: -10 }],
  },
  eyeToggleText: {
    fontSize: 16,
  },

  // Forgot
  forgotRow: {
    alignSelf: 'flex-end',
    marginTop: -4,
  },
  forgotLink: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.red,
  },

  // Primary Button
  btnPrimary: {
    backgroundColor: COLORS.red,
    borderWidth: 2.5,
    borderColor: COLORS.border,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.border,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
    minHeight: 50,
  },
  btnSuccess: {
    backgroundColor: COLORS.green,
  },
  btnPrimaryText: {
    fontSize: 15,
    fontWeight: '900',
    color: 'white',
    letterSpacing: -0.3,
  },

  // Divider
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginVertical: 2,
  },
  dividerLine: {
    flex: 1,
    height: 1.5,
    backgroundColor: '#F0E0E0',
  },
  dividerText: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.inkMuted,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },

  // Social
  socialRow: {
    flexDirection: 'row',
    gap: 10,
  },
  btnSocial: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    backgroundColor: COLORS.beige,
    borderWidth: 2.5,
    borderColor: COLORS.border,
    borderRadius: 14,
    shadowColor: COLORS.border,
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 3,
  },
  socialIcon: {
    fontSize: 14,
    fontWeight: '900',
    color: COLORS.ink,
  },
  btnSocialText: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.ink,
    letterSpacing: -0.3,
  },

  // Guest
  btnGuest: {
    alignItems: 'center',
    paddingVertical: 4,
    marginTop: -4,
  },
  btnGuestText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.inkMuted,
  },

  // Sign Up
  signupRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 18,
  },
  signupText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.inkMuted,
  },
  signupLink: {
    fontSize: 13,
    fontWeight: '900',
    color: COLORS.red,
    letterSpacing: -0.3,
  },

  // Terms
  terms: {
    textAlign: 'center',
    fontSize: 10,
    fontWeight: '500',
    color: COLORS.inkMuted,
    lineHeight: 16,
    paddingTop: 12,
  },
  termsLink: {
    fontWeight: '700',
    color: COLORS.inkMuted,
  },
});
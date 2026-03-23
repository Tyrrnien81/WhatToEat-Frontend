import { StyleSheet } from 'react-native';
import { COLORS } from '../../../constants/COLORS';

export const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.beige },
  kav: { flex: 1 },
  scroll: { flexGrow: 1, paddingHorizontal: 22, paddingBottom: 24 },

  // Email Badge
  emailBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: COLORS.bg2, borderWidth: 2.5, borderColor: COLORS.border,
    borderRadius: 16, padding: 12, marginTop: 18,
    shadowColor: COLORS.border, shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1, shadowRadius: 0, elevation: 4,
  },
  emailBadgeIcon: {
    width: 38, height: 38, backgroundColor: COLORS.redLight,
    borderWidth: 2, borderColor: COLORS.border, borderRadius: 10,
    alignItems: 'center', justifyContent: 'center',
  },
  emailBadgeEmoji: { fontSize: 18 },
  emailBadgeText: { flex: 1 },
  emailBadgeLabel: {
    fontSize: 10, fontWeight: '800', color: COLORS.inkMuted,
    textTransform: 'uppercase', letterSpacing: 1, marginBottom: 2,
  },
  emailBadgeValue: { fontSize: 13, fontWeight: '700', color: COLORS.ink, letterSpacing: -0.3 },

  // Code Card
  codeCard: {
    backgroundColor: COLORS.bg2, borderWidth: 2.5, borderColor: COLORS.border,
    borderRadius: 22, padding: 20, marginTop: 16,
    shadowColor: COLORS.border, shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1, shadowRadius: 0, elevation: 4,
    gap: 14,
  },
  codeCardLabel: {
    fontSize: 11, fontWeight: '800', color: COLORS.inkMuted,
    textTransform: 'uppercase', letterSpacing: 1,
  },
  codeCardHint: { fontSize: 11, fontWeight: '500', color: COLORS.inkMuted, lineHeight: 17 },
  codeCardHintBold: { fontWeight: '800', color: COLORS.ink },

  // OTP Row
  otpRow: { flexDirection: 'row', gap: 8, justifyContent: 'center' },
  otpBox: {
    width: 44, height: 52,
    borderWidth: 2.5, borderColor: COLORS.border,
    borderRadius: 14, backgroundColor: COLORS.beige,
    fontSize: 22, fontWeight: '900', color: COLORS.ink,
    textAlign: 'center',
  },
  otpBoxFilled: { backgroundColor: COLORS.bg2 },
  otpBoxError: { borderColor: COLORS.red, backgroundColor: '#FFF8F8' },
  otpBoxSuccess: { borderColor: COLORS.green, backgroundColor: COLORS.greenLight },

  // Timer
  timerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  timerLabel: { fontSize: 11, fontWeight: '600', color: COLORS.inkMuted },
  timerBadge: {
    backgroundColor: COLORS.redLight, borderWidth: 2, borderColor: COLORS.border,
    borderRadius: 20, paddingVertical: 3, paddingHorizontal: 10,
  },
  timerBadgeUrgent: { backgroundColor: '#FFE0E3' },
  timerText: { fontSize: 12, fontWeight: '800', color: COLORS.red },
  timerTextUrgent: { color: COLORS.red },

  // Hint
  codeHint: { fontSize: 11, fontWeight: '600', color: COLORS.inkMuted, textAlign: 'center' },
  codeHintError: { color: COLORS.red, fontWeight: '700' },
  codeHintSuccess: { color: COLORS.green, fontWeight: '700' },

  // Verify Button
  verifyBtn: {
    marginTop: 20, height: 54,
    backgroundColor: COLORS.red, borderWidth: 2.5, borderColor: COLORS.border,
    borderRadius: 18, alignItems: 'center', justifyContent: 'center',
    shadowColor: COLORS.border, shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1, shadowRadius: 0, elevation: 4,
  },
  verifyBtnDisabled: { opacity: 0.45 },
  verifyBtnSuccess: { backgroundColor: COLORS.green },
  verifyBtnText: { fontSize: 15, fontWeight: '900', color: 'white', letterSpacing: -0.3 },

  // Action Row
  actionRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    marginTop: 18, paddingHorizontal: 2,
  },
  actionLink: { fontSize: 12, fontWeight: '700', color: COLORS.red },
  actionLinkDisabled: { opacity: 0.4 },
  actionLinkMuted: { fontSize: 12, fontWeight: '700', color: COLORS.inkMuted },
});
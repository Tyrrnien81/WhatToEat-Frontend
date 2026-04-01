import { StyleSheet } from 'react-native';
import { COLORS } from '../../../constants/COLORS';

export const styles = StyleSheet.create({

  safeArea: { flex: 1, backgroundColor: COLORS.beige },
  kav: { flex: 1 },
  scroll: { paddingHorizontal: 24, paddingTop: 20, paddingBottom: 40, alignItems: 'center' },

  // ── Logo Row ───────────────────────────────────────────────────────────────
  logoRow: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    alignSelf: 'flex-start', marginBottom: 36,
  },
  logoIcon: {
    width: 36, height: 36,
    backgroundColor: COLORS.redLight,
    borderWidth: 2.5, borderColor: COLORS.border,
    borderRadius: 12,
    alignItems: 'center', justifyContent: 'center',
    shadowColor: COLORS.border, shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1, shadowRadius: 0, elevation: 2,
  },
  logoEmoji: { fontSize: 18 },
  logoTitle: { fontSize: 18, fontWeight: '900', color: COLORS.ink, letterSpacing: -0.5 },
  logoAccent: { color: COLORS.red },

  // ── Email Icon Card ────────────────────────────────────────────────────────
  iconWrap: {
    width: 72, height: 72,
    backgroundColor: COLORS.bg2,
    borderWidth: 3, borderColor: COLORS.border,
    borderRadius: 22,
    alignItems: 'center', justifyContent: 'center',
    shadowColor: COLORS.border, shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1, shadowRadius: 0, elevation: 4,
    marginBottom: 20,
  },
  iconEmoji: { fontSize: 34 },

  // ── Heading ────────────────────────────────────────────────────────────────
  heading: {
    fontSize: 26, fontWeight: '900', color: COLORS.ink,
    letterSpacing: -0.6, textAlign: 'center', marginBottom: 8,
  },
  subtext: {
    fontSize: 13, fontWeight: '600', color: COLORS.inkMuted,
    textAlign: 'center', marginBottom: 8,
  },

  // ── Email Chip ─────────────────────────────────────────────────────────────
  emailChip: {
    backgroundColor: COLORS.bg2,
    borderWidth: 2, borderColor: COLORS.border,
    borderRadius: 999, paddingVertical: 4, paddingHorizontal: 14,
    marginBottom: 28,
    shadowColor: COLORS.border, shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1, shadowRadius: 0, elevation: 2,
  },
  emailChipText: { fontSize: 12, fontWeight: '800', color: COLORS.ink },

  // ── OTP Boxes ──────────────────────────────────────────────────────────────
  codeRow: {
    flexDirection: 'row', justifyContent: 'center',
    gap: 9, marginBottom: 10, width: '100%',
  },
  codeInput: {
    width: 46, height: 58,
    borderWidth: 2.5, borderColor: COLORS.border,
    borderRadius: 16,
    backgroundColor: COLORS.bg2,
    textAlign: 'center',
    fontSize: 24, fontWeight: '900', color: COLORS.ink,
    shadowColor: COLORS.border, shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 1, shadowRadius: 0, elevation: 3,
  },
  codeInputFilled: {
    borderColor: COLORS.ink,
  },
  codeInputError: {
    borderColor: COLORS.red,
    backgroundColor: COLORS.redLight,
    shadowColor: COLORS.red,
  },
  codeInputSuccess: {
    borderColor: '#16a34a',
    backgroundColor: '#dcfce7',
    shadowColor: '#16a34a',
  },

  // ── Hint ───────────────────────────────────────────────────────────────────
  hintText: {
    fontSize: 12, fontWeight: '700',
    textAlign: 'center', marginBottom: 8, color: COLORS.inkMuted,
  },
  hintError:   { color: COLORS.red },
  hintSuccess: { color: '#16a34a' },

  // ── Verify Button ──────────────────────────────────────────────────────────
  verifyBtn: {
    width: '100%',
    backgroundColor: COLORS.red,
    borderWidth: 2.5, borderColor: COLORS.border,
    borderRadius: 18, paddingVertical: 15,
    alignItems: 'center',
    shadowColor: COLORS.border, shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1, shadowRadius: 0, elevation: 4,
    marginBottom: 18,
  },
  verifyBtnDisabled: { opacity: 0.35 },
  verifyBtnSuccess:  { backgroundColor: '#16a34a', shadowColor: '#166534' },
  verifyBtnText: { fontSize: 15, fontWeight: '900', color: 'white', letterSpacing: 0.1 },

  // ── Divider ────────────────────────────────────────────────────────────────
  divider: {
    width: '100%', height: 1.5,
    backgroundColor: 'rgba(42,26,26,0.1)',
    borderRadius: 1, marginBottom: 16,
  },

  // ── Action Row ─────────────────────────────────────────────────────────────
  actionRow: {
    flexDirection: 'row', justifyContent: 'center',
    alignItems: 'center', marginBottom: 12, flexWrap: 'wrap',
  },
  actionText:         { fontSize: 13, fontWeight: '600', color: COLORS.inkMuted },
  actionLink:         { fontSize: 13, fontWeight: '800', color: COLORS.red },
  actionLinkDisabled: { color: COLORS.inkMuted },

  // ── Change Email ───────────────────────────────────────────────────────────
  changeEmailLink: {
    fontSize: 12, fontWeight: '700', color: COLORS.inkMuted,
    textDecorationLine: 'underline', textAlign: 'center',
  },
});
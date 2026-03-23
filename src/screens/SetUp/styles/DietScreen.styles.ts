import { StyleSheet } from 'react-native';
import { COLORS } from '../../../constants/COLORS';

export const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.beige },

  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: 22,
  },

  header: { paddingHorizontal: 22, marginTop: 20 },
  title: { fontSize: 26, fontWeight: '900', color: COLORS.ink, letterSpacing: -0.8, marginBottom: 4 },
  subtitle: { fontSize: 13, fontWeight: '500', color: COLORS.inkMuted },

  scrollBody: { flex: 1, paddingHorizontal: 22, marginTop: 14 },

  dietRow: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: COLORS.bg2, borderWidth: 2.5, borderColor: COLORS.border,
    borderRadius: 18, padding: 14, marginBottom: 10,
    shadowColor: COLORS.border, shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1, shadowRadius: 0, elevation: 4,
  },
  dietRowSelected: { backgroundColor: COLORS.peachSelected, borderColor: COLORS.peachBorder },

  // ── Real image replacing emoji ──
  dietImage: { width: 52, height: 52, borderRadius: 10 },

  dietInfo: { flex: 1 },
  dietName: { fontSize: 15, fontWeight: '900', color: COLORS.ink, letterSpacing: -0.3, marginBottom: 2 },
  dietDesc: { fontSize: 11, fontWeight: '500', color: COLORS.inkMuted, marginBottom: 5 },
  viewLink: { fontSize: 11, fontWeight: '800', color: COLORS.red },

  checkBadge: {
    width: 22, height: 22, borderRadius: 11,
    borderWidth: 2, borderColor: COLORS.border,
    backgroundColor: COLORS.beige,
    alignItems: 'center', justifyContent: 'center',
  },
  checkBadgeSel: { backgroundColor: COLORS.peachBorder, borderColor: COLORS.peachBorder },
  checkMark: { fontSize: 11, fontWeight: '900', color: 'white' },

  continueBtn: {
    height: 54, backgroundColor: COLORS.red,
    borderWidth: 2.5, borderColor: COLORS.border,
    borderRadius: 18, marginHorizontal: 22, marginBottom: 8,
    alignItems: 'center', justifyContent: 'center',
    shadowColor: COLORS.border, shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1, shadowRadius: 0, elevation: 4,
  },
  continueBtnGreen: { backgroundColor: COLORS.green },
  continueBtnText: { fontSize: 15, fontWeight: '900', color: 'white', letterSpacing: -0.3 },

  // ── Detail modal image replacing large emoji ──
  detailImage: {
    width: 120, height: 120,
    alignSelf: 'center',
    marginBottom: 16,
    borderRadius: 20,
  },

  detailCard: {
    backgroundColor: COLORS.bg2, borderWidth: 2.5, borderColor: COLORS.border,
    borderRadius: 24, padding: 20,
    shadowColor: COLORS.border, shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1, shadowRadius: 0, elevation: 4,
  },
  detailName: { fontSize: 22, fontWeight: '900', color: COLORS.ink, letterSpacing: -0.8, marginBottom: 4 },
  detailTagline: { fontSize: 12, fontWeight: '600', color: COLORS.inkMuted, marginBottom: 16 },
  macroBar: {
    height: 10, borderRadius: 8, borderWidth: 2, borderColor: COLORS.border,
    overflow: 'hidden', flexDirection: 'row', marginBottom: 8,
  },
  macroSeg: { height: '100%' },
  macroLabels: { flexDirection: 'row', gap: 10, flexWrap: 'wrap' },
  macroLabelItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  macroLabelDot: { width: 8, height: 8, borderRadius: 2 },
  macroLabelText: { fontSize: 9, fontWeight: '700', color: COLORS.inkMuted },
  detailDivider: { height: 1.5, backgroundColor: 'rgba(42,26,26,0.08)', marginVertical: 14 },
  detailDesc: { fontSize: 13, fontWeight: '500', color: COLORS.inkMuted, lineHeight: 22 },
});
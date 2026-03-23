import { StyleSheet } from 'react-native';
import { COLORS } from '../../../constants/COLORS';

export const TICK_W = 8;

export const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.beige },

  header: { paddingHorizontal: 22, marginTop: 22 },
  title: { fontSize: 26, fontWeight: '900', color: COLORS.ink, letterSpacing: -0.8, marginBottom: 8 },
  subtitle: { fontSize: 13, fontWeight: '500', color: COLORS.inkMuted, lineHeight: 20 },

  unitToggleWrap: { alignItems: 'center', marginTop: 20 },
  unitToggle: {
    flexDirection: 'row', backgroundColor: COLORS.bg2,
    borderWidth: 2, borderColor: COLORS.border, borderRadius: 14, padding: 3, gap: 2,
    shadowColor: COLORS.border, shadowOffset: { width: 4, height: 4 }, shadowOpacity: 1, shadowRadius: 0, elevation: 4,
  },
  unitBtn: { paddingVertical: 6, paddingHorizontal: 20, borderRadius: 10, borderWidth: 2, borderColor: 'transparent' },
  unitBtnActive: { backgroundColor: COLORS.red, borderColor: COLORS.border },
  unitBtnText: { fontSize: 12, fontWeight: '800', color: COLORS.inkMuted },
  unitBtnTextActive: { color: 'white' },

  valueCard: {
    backgroundColor: COLORS.bg2, borderWidth: 2.5, borderColor: COLORS.border,
    borderRadius: 22, marginHorizontal: 22, marginTop: 16, padding: 22,
    shadowColor: COLORS.border, shadowOffset: { width: 4, height: 4 }, shadowOpacity: 1, shadowRadius: 0, elevation: 4,
  },
  valueDisplay: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center', gap: 6 },
  valueNumber: { fontSize: 38, fontWeight: '900', color: COLORS.ink, letterSpacing: -1.5 },
  valueUnit: { fontSize: 15, fontWeight: '700', color: COLORS.inkMuted, marginBottom: 4 },

  rulerWrap: { height: 60, marginTop: 20, position: 'relative', overflow: 'hidden' },
  rulerIndicator: {
    position: 'absolute', left: '50%', top: 0,
    width: 2.5, height: 30, backgroundColor: COLORS.red,
    borderRadius: 2, zIndex: 2, marginLeft: -1.25,
  },
  tickWrap: { width: TICK_W, alignItems: 'center', justifyContent: 'flex-start', overflow: 'visible' },
  tick: { width: 1.5, backgroundColor: 'rgba(42,26,26,0.25)', borderRadius: 1 },
  tickMajor: { width: 2, backgroundColor: 'rgba(42,26,26,0.5)' },
  tickLabel: { width: 2.5, backgroundColor: COLORS.border },
  tickText: { fontSize: 9, fontWeight: '700', color: COLORS.inkMuted, marginTop: 4, minWidth: 24, textAlign: 'center' },

  hintCard: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    backgroundColor: COLORS.redLight, borderWidth: 2, borderColor: COLORS.border,
    borderRadius: 16, marginHorizontal: 22, marginTop: 14, padding: 12,
  },
  hintIcon: {
    width: 32, height: 32, backgroundColor: COLORS.red,
    borderWidth: 2, borderColor: COLORS.border, borderRadius: 10,
    alignItems: 'center', justifyContent: 'center',
  },
  hintIconEmoji: { fontSize: 16 },
  hintText: { flex: 1, fontSize: 11, fontWeight: '600', color: COLORS.inkMuted, lineHeight: 17 },
  hintTextBold: { fontWeight: '800', color: COLORS.ink },
});
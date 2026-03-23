import { StyleSheet } from 'react-native';
import { COLORS } from '../../../constants/COLORS';

export const ITEM_H = 44;

export const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.beige },

  // Header
  header: { paddingHorizontal: 22, marginTop: 22 },
  title: { fontSize: 26, fontWeight: '900', color: COLORS.ink, letterSpacing: -0.8, marginBottom: 8 },
  subtitle: { fontSize: 13, fontWeight: '500', color: COLORS.inkMuted, lineHeight: 20 },

  // Unit Toggle
  unitToggleWrap: { alignItems: 'center', marginTop: 20 },
  unitToggle: {
    flexDirection: 'row',
    backgroundColor: COLORS.bg2,
    borderWidth: 2, borderColor: COLORS.border,
    borderRadius: 14, padding: 3, gap: 2,
    shadowColor: COLORS.border, shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1, shadowRadius: 0, elevation: 4,
  },
  unitBtn: {
    paddingVertical: 6, paddingHorizontal: 20,
    borderRadius: 10, borderWidth: 2, borderColor: 'transparent',
  },
  unitBtnActive: { backgroundColor: COLORS.red, borderColor: COLORS.border },
  unitBtnText: { fontSize: 12, fontWeight: '800', color: COLORS.inkMuted },
  unitBtnTextActive: { color: 'white' },

  // Selected Display
  selectedDisplay: {
    flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center',
    gap: 6, marginHorizontal: 22, marginTop: 16,
    backgroundColor: COLORS.bg2,
    borderWidth: 2.5, borderColor: COLORS.border,
    borderRadius: 18, padding: 14,
    shadowColor: COLORS.border, shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1, shadowRadius: 0, elevation: 4,
  },
  selectedVal: { fontSize: 32, fontWeight: '900', color: COLORS.ink, letterSpacing: -1 },
  selectedUnit: { fontSize: 14, fontWeight: '700', color: COLORS.inkMuted, marginBottom: 4 },

  // Picker Card
  pickerCard: {
    backgroundColor: COLORS.bg2,
    borderWidth: 2.5, borderColor: COLORS.border,
    borderRadius: 24, marginHorizontal: 22, marginTop: 16,
    shadowColor: COLORS.border, shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1, shadowRadius: 0, elevation: 4,
    flex: 1, overflow: 'hidden', position: 'relative',
  },
  pickerHighlight: {
    position: 'absolute', left: 20, right: 20,
    height: ITEM_H + 4,
    borderWidth: 2.5, borderColor: COLORS.border,
    borderRadius: 14, backgroundColor: 'transparent', zIndex: 10,
  },
  pickerItem: {
    height: ITEM_H, alignItems: 'center', justifyContent: 'center',
  },
  pickerText: {
    fontSize: 13, fontWeight: '400', color: COLORS.inkMuted, opacity: 0.3,
  },
  pickerN1: { fontSize: 14, fontWeight: '500', opacity: 0.55 },
  pickerN2: { fontSize: 15, fontWeight: '600', opacity: 0.75 },
  pickerSel: {
    fontSize: 20, fontWeight: '900', color: COLORS.ink, opacity: 1, letterSpacing: -0.5,
  },
});
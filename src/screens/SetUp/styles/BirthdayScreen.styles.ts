import { StyleSheet } from 'react-native';
import { COLORS } from '../../../constants/COLORS';

export const ITEM_H = 36;

export const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.beige },

  // Header
  header: { paddingHorizontal: 22, marginTop: 18 },
  title: {
    fontSize: 26, fontWeight: '900', color: COLORS.ink,
    letterSpacing: -0.8, marginBottom: 6,
  },
  subtitle: { fontSize: 13, fontWeight: '500', color: COLORS.inkMuted },

  // Date Badge
  dateBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: COLORS.bg2,
    borderWidth: 2.5, borderColor: COLORS.border,
    borderRadius: 16, padding: 12,
    marginHorizontal: 22, marginTop: 16,
    shadowColor: COLORS.border,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1, shadowRadius: 0, elevation: 4,
  },
  dateBadgeIcon: {
    width: 38, height: 38,
    backgroundColor: COLORS.redLight,
    borderWidth: 2, borderColor: COLORS.border,
    borderRadius: 10, alignItems: 'center', justifyContent: 'center',
  },
  dateBadgeEmoji: { fontSize: 18 },
  dateBadgeLabel: {
    fontSize: 10, fontWeight: '800', color: COLORS.inkMuted,
    textTransform: 'uppercase', letterSpacing: 1, marginBottom: 2,
  },
  dateBadgeValue: { fontSize: 15, fontWeight: '900', color: COLORS.ink },

  // Picker Card
  pickerCard: {
    backgroundColor: COLORS.bg2,
    borderWidth: 2.5, borderColor: COLORS.border,
    borderRadius: 24, marginHorizontal: 22, marginTop: 16,
    shadowColor: COLORS.border,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1, shadowRadius: 0, elevation: 4,
    flex: 1, overflow: 'hidden',
  },
  pickerLabels: {
    flexDirection: 'row',
    paddingTop: 10, paddingHorizontal: 4,
  },
  pickerLabel: {
    fontSize: 9, fontWeight: '800',
    color: COLORS.inkMuted, textTransform: 'uppercase',
    letterSpacing: 1, textAlign: 'center',
  },
  pickerColumnsWrap: {
    flex: 1, flexDirection: 'row',
    position: 'relative',
  },
  pickerHighlight: {
    position: 'absolute',
    left: 12, right: 12,
    height: ITEM_H + 4,
    borderWidth: 2.5, borderColor: COLORS.border,
    borderRadius: 14,
    backgroundColor: 'transparent',
    zIndex: 10,
  },
  pickerItem: {
    height: ITEM_H,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Text distance styles
  pickerText: {
    fontSize: 12, fontWeight: '400',
    color: COLORS.inkMuted, opacity: 0.2,
  },
  pickerN1: { fontSize: 13, fontWeight: '500', opacity: 0.38 },
  pickerN2: { fontSize: 14, fontWeight: '500', opacity: 0.55 },
  pickerN3: { fontSize: 15, fontWeight: '600', opacity: 0.72 },
  pickerN4: { fontSize: 16, fontWeight: '600', opacity: 0.88 },
  pickerSel: {
    fontSize: 19, fontWeight: '800',
    color: COLORS.ink, opacity: 1,
    letterSpacing: -0.3,
  },
});
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
  subtitle: { fontSize: 13, fontWeight: '500', color: COLORS.inkMuted, lineHeight: 20 },

  scrollBody: { flex: 1, paddingHorizontal: 22, marginTop: 14 },

  // ── No Dislikes Banner ──────────────────────────────────────────────────────
  noDislikesBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: COLORS.bg2,
    borderWidth: 2.5,
    borderColor: COLORS.border,
    borderRadius: 20,
    padding: 14,
    marginBottom: 12,
    shadowColor: COLORS.border,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
  },
  noDislikesBtnSelected: {
    backgroundColor: COLORS.redLight,
    borderColor: COLORS.red,
    shadowColor: COLORS.red,
  },
  noDislikesEmoji: {
    fontSize: 24,
  },
  noDislikesTextWrap: {
    flex: 1,
    gap: 2,
  },
  noDislikesLabel: {
    fontSize: 14,
    fontWeight: '900',
    color: COLORS.ink,
    letterSpacing: -0.3,
  },
  noDislikesLabelSelected: {
    color: COLORS.red,
  },
  noDislikesDesc: {
    fontSize: 11,
    fontWeight: '500',
    color: COLORS.inkMuted,
  },
  noDislikesCheck: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  noDislikesCheckSelected: {
    backgroundColor: COLORS.red,
    borderColor: COLORS.red,
  },
  noDislikesCheckTick: {
    fontSize: 13,
    fontWeight: '800',
    color: '#fff',
  },

  // ── Category Cards ──────────────────────────────────────────────────────────
  categoryCard: {
    backgroundColor: COLORS.bg2,
    borderWidth: 2.5, borderColor: COLORS.border,
    borderRadius: 20, padding: 14, marginBottom: 12,
    shadowColor: COLORS.border, shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1, shadowRadius: 0, elevation: 4,
  },
  categoryHeader: {
    flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12,
  },
  categoryEmoji: { fontSize: 18 },
  categoryName: { fontSize: 14, fontWeight: '900', color: COLORS.ink, letterSpacing: -0.3, flex: 1 },
  countBadge: {
    backgroundColor: COLORS.red, borderWidth: 2, borderColor: COLORS.border,
    borderRadius: 20, paddingVertical: 2, paddingHorizontal: 10,
  },
  countBadgeText: { fontSize: 10, fontWeight: '800', color: 'white' },

  tagsWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 7 },
  tag: {
    paddingVertical: 6, paddingHorizontal: 12,
    borderWidth: 2, borderColor: COLORS.border,
    borderRadius: 20, backgroundColor: COLORS.beige,
  },
  tagSelected: { backgroundColor: COLORS.redLight, borderColor: COLORS.red },
  tagText: { fontSize: 11, fontWeight: '700', color: COLORS.ink },
  tagTextSelected: { color: COLORS.ink },
});
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
  gridContainer: { paddingBottom: 16, gap: 12 },
  gridRow: { flexDirection: 'row', gap: 12 },

  allergenCard: {
    flex: 1,
    height: 120,
    backgroundColor: COLORS.bg2,
    borderWidth: 2.5,
    borderColor: COLORS.border,
    borderRadius: 20,
    padding: 12,
    // Use column layout: name top-left, image bottom-right
    flexDirection: 'column',
    justifyContent: 'space-between',
    shadowColor: COLORS.border,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1, shadowRadius: 0, elevation: 4,
  },
  allergenCardSelected: {
    backgroundColor: COLORS.redLight,
    borderColor: COLORS.red,
  },

  // Top row inside card: name + check badge
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },

  checkBadge: {
    width: 20, height: 20, borderRadius: 10,
    borderWidth: 2, borderColor: COLORS.border,
    backgroundColor: COLORS.beige,
    alignItems: 'center', justifyContent: 'center',
    flexShrink: 0,
  },
  checkBadgeSel: { backgroundColor: COLORS.red, borderColor: COLORS.red },
  checkMark: { fontSize: 10, fontWeight: '900', color: 'white' },

  allergenName: {
    fontSize: 12, fontWeight: '800', color: COLORS.ink,
    letterSpacing: -0.3, lineHeight: 16,
    flex: 1, paddingRight: 6,
  },

  // Image sits at bottom-right
  allergenImage: {
    width: 52, height: 52,
    alignSelf: 'flex-end',
  },

  // Emoji fallback also bottom-right
  allergenEmoji: {
    fontSize: 36,
    alignSelf: 'flex-end',
    textAlign: 'right',
  },
});
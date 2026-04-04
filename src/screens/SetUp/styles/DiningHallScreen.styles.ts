import { StyleSheet } from 'react-native';
import { COLORS } from '../../../constants/COLORS';

export const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.beige },

  header: { paddingHorizontal: 22, marginTop: 20 },
  headerRow: {
    flexDirection: 'row', alignItems: 'flex-start',
    justifyContent: 'space-between', gap: 10,
  },
  title: { fontSize: 24, fontWeight: '900', color: COLORS.ink, letterSpacing: -0.8, flex: 1 },
  subtitle: { fontSize: 13, fontWeight: '500', color: COLORS.inkMuted, marginTop: 4 },

  counterBadge: {
    backgroundColor: COLORS.red,
    borderWidth: 2, borderColor: COLORS.border,
    borderRadius: 20, paddingVertical: 4, paddingHorizontal: 10, marginTop: 4,
  },
  counterBadgeFull: { backgroundColor: COLORS.green },
  counterBadgeText: { fontSize: 11, fontWeight: '800', color: 'white' },

  scrollBody: { flex: 1, paddingHorizontal: 22, marginTop: 14 },
  gridContainer: { paddingBottom: 16, gap: 12 },
  gridRow: { flexDirection: 'row', gap: 12 },

  hallCard: {
    flex: 1, height: 175,        
    backgroundColor: COLORS.bg2,
    borderWidth: 2.5, borderColor: COLORS.border,
    borderRadius: 20, padding: 14,
    alignItems: 'center', justifyContent: 'space-between',
    position: 'relative',
    shadowColor: COLORS.border, shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1, shadowRadius: 0, elevation: 4,
  },
  hallCardSelected: { backgroundColor: COLORS.redLight, borderColor: COLORS.red },
  hallCardMaxed: { opacity: 0.4 },

  badge: {
    position: 'absolute', top: 10, right: 10,
    width: 24, height: 24, borderRadius: 12,
    borderWidth: 2, borderColor: COLORS.border,
    backgroundColor: COLORS.beige,
    alignItems: 'center', justifyContent: 'center',
  },
  badgeSelected: { backgroundColor: COLORS.red, borderColor: COLORS.border },
  badgeText: { fontSize: 11, fontWeight: '900', color: 'white' },

  hallLogo: { width: 110, height: 110 },  
  hallName: {
    fontSize: 12, fontWeight: '800', color: COLORS.ink,
    textAlign: 'center', lineHeight: 16, letterSpacing: -0.3,
  },
});
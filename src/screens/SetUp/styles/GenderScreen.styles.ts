import { StyleSheet } from 'react-native';
import { COLORS } from '../../../constants/COLORS';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.beige,
  },

  // Header
  header: { paddingHorizontal: 22, marginTop: 22 },
  title: {
    fontSize: 26, fontWeight: '900', color: COLORS.ink,
    letterSpacing: -0.8, marginBottom: 8,
  },
  subtitle: {
    fontSize: 13, fontWeight: '500',
    color: COLORS.inkMuted, lineHeight: 20,
  },

  // Gender Grid
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    paddingHorizontal: 22,
    marginTop: 22,
  },
  genderBtn: {
    width: '47%',
    minHeight: 100,
    backgroundColor: COLORS.bg2,
    borderWidth: 2.5, borderColor: COLORS.border,
    borderRadius: 20,
    padding: 20,
    justifyContent: 'flex-end',
    position: 'relative',
    shadowColor: COLORS.border,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1, shadowRadius: 0, elevation: 4,
  },
  genderBtnSelected: {
    backgroundColor: COLORS.greenSelected,
    borderColor: COLORS.greenBorder,
  },

  // Check Badge
  checkBadge: {
    position: 'absolute',
    top: 12, right: 12,
    width: 22, height: 22,
    borderRadius: 11,
    borderWidth: 2, borderColor: COLORS.border,
    backgroundColor: COLORS.beige,
    alignItems: 'center', justifyContent: 'center',
  },
  checkBadgeSelected: {
    backgroundColor: COLORS.greenBorder,
    borderColor: COLORS.greenBorder,
  },
  checkMark: {
    fontSize: 11, fontWeight: '900', color: 'white',
  },

  // Label
  genderLabel: {
    fontSize: 15, fontWeight: '800',
    color: COLORS.ink, letterSpacing: -0.3,
  },
  genderLabelSelected: {
    color: COLORS.ink,
  },
});
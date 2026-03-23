import { StyleSheet } from 'react-native';
import { COLORS } from '../../../constants/COLORS';

export const styles = StyleSheet.create({

  container: { flex: 1, backgroundColor: '#000' },
  camera: { flex: 1 },

  // Permission Screen
  permissionContainer: {
    flex: 1, backgroundColor: COLORS.beige,
    alignItems: 'center', justifyContent: 'center', padding: 32,
  },
  permissionCard: {
    backgroundColor: COLORS.bg2,
    borderWidth: 2.5, borderColor: COLORS.border,
    borderRadius: 24, padding: 28,
    alignItems: 'center', gap: 12,
    shadowColor: COLORS.border, shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1, shadowRadius: 0, elevation: 4,
  },
  permissionEmoji: { fontSize: 48 },
  permissionTitle: { fontSize: 20, fontWeight: '900', color: COLORS.ink, letterSpacing: -0.5 },
  permissionDesc: { fontSize: 13, fontWeight: '500', color: COLORS.inkMuted, textAlign: 'center', lineHeight: 20 },
  permissionBtn: {
    height: 50, backgroundColor: COLORS.red,
    borderWidth: 2.5, borderColor: COLORS.border,
    borderRadius: 16, paddingHorizontal: 28,
    alignItems: 'center', justifyContent: 'center',
    shadowColor: COLORS.border, shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1, shadowRadius: 0, elevation: 4, marginTop: 4,
  },
  permissionBtnText: { fontSize: 15, fontWeight: '900', color: 'white', letterSpacing: -0.3 },

  // Scan Frame overlay
  scanFrame: {
    position: 'absolute',
    top: 60, left: 28, right: 28, height: 420,
    alignItems: 'center', justifyContent: 'flex-start', paddingTop: 14,
  },
  scanLabel: {
    color: 'white', fontSize: 16, fontWeight: '800', letterSpacing: -0.3,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 4,
  },

  // Corner brackets
  corner: { position: 'absolute', width: 22, height: 22, borderColor: 'white' },
  cornerTL: { top: 0, left: 0, borderTopWidth: 3, borderLeftWidth: 3 },
  cornerTR: { top: 0, right: 0, borderTopWidth: 3, borderRightWidth: 3 },
  cornerBL: { bottom: 0, left: 0, borderBottomWidth: 3, borderLeftWidth: 3 },
  cornerBR: { bottom: 0, right: 0, borderBottomWidth: 3, borderRightWidth: 3 },

  // Idle hint
  hintText: {
    position: 'absolute', bottom: 160, alignSelf: 'center',
    color: 'white', fontSize: 14, fontWeight: '700',
    textShadowColor: 'rgba(0,0,0,0.6)',
    textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 4,
  },

  // Analyzing
  analyzingWrap: {
    position: 'absolute', bottom: 175, alignSelf: 'center',
    flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 18, paddingVertical: 10, borderRadius: 22,
  },
  analyzingText: { color: 'white', fontSize: 14, fontWeight: '700' },

  // Result Card
  resultCard: {
    position: 'absolute', bottom: 115,
    left: 24, right: 24,
    backgroundColor: 'rgba(255,245,245,0.97)',
    borderRadius: 22, borderWidth: 2.5, borderColor: COLORS.border,
    padding: 18, alignItems: 'center', gap: 10,
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25, shadowRadius: 12, elevation: 10,
  },
  resultKcal: { fontSize: 22, fontWeight: '900', color: COLORS.ink, letterSpacing: -0.8 },
  macroRow: { flexDirection: 'row', width: '100%', gap: 8 },
  macroItem: {
    flex: 1, alignItems: 'center',
    backgroundColor: COLORS.redLight,
    borderRadius: 14, paddingVertical: 8,
  },
  macroValue: { fontSize: 16, fontWeight: '900', color: COLORS.ink, letterSpacing: -0.3 },
  macroLabel: { fontSize: 10, fontWeight: '700', color: COLORS.inkMuted, marginTop: 2 },
  resultNote: { fontSize: 10, fontWeight: '500', color: COLORS.inkMuted },

});
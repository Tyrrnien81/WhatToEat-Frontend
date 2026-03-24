import { StyleSheet } from 'react-native';
import { COLORS } from '../../../constants/COLORS';

export const styles = StyleSheet.create({

// Error Card
  errorCard: {
    position: 'absolute', bottom: 115,
    left: 24, right: 24,
    backgroundColor: 'rgba(255,245,245,0.97)',
    borderRadius: 22, borderWidth: 2.5, borderColor: COLORS.border,
    padding: 20, alignItems: 'center', gap: 8,
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25, shadowRadius: 12, elevation: 10,
  },
  errorIconWrap: {
    width: 48, height: 48, backgroundColor: COLORS.redLight,
    borderRadius: 14, borderWidth: 2, borderColor: COLORS.border,
    alignItems: 'center', justifyContent: 'center',
  },
  errorIconText: { fontSize: 22 },
  errorTitle: { fontSize: 17, fontWeight: '900', color: COLORS.ink, letterSpacing: -0.4 },
  errorDesc: { fontSize: 12, fontWeight: '500', color: COLORS.inkMuted, textAlign: 'center', lineHeight: 18 },
  retryBtn: {
    height: 42, backgroundColor: COLORS.red,
    borderWidth: 2, borderColor: COLORS.border,
    borderRadius: 14, paddingHorizontal: 28,
    alignItems: 'center', justifyContent: 'center',
    shadowColor: COLORS.border, shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 1, shadowRadius: 0, elevation: 3, marginTop: 4,
  },
  retryBtnText: { fontSize: 14, fontWeight: '900', color: 'white', letterSpacing: -0.3 },
});
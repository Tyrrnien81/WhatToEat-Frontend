import { StyleSheet } from 'react-native';
import { COLORS } from '../../../constants/COLORS';

export const styles = StyleSheet.create({

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
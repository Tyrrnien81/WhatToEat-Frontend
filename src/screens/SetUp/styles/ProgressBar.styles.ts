import { StyleSheet } from 'react-native';
import { COLORS } from '../../../constants/COLORS';

export const styles = StyleSheet.create({
  progressWrap: { paddingHorizontal: 22, marginTop: 14 },
  progressTrack: {
    height: 6, backgroundColor: 'rgba(42,26,26,0.1)',
    borderRadius: 6, overflow: 'hidden',
  },
  progressFill: { height: '100%', backgroundColor: COLORS.red, borderRadius: 6 },
  progressLabel: {
    fontSize: 10, fontWeight: '700',
    color: COLORS.inkMuted, textAlign: 'right', marginTop: 4,
  },
});
import { StyleSheet } from 'react-native';
import { COLORS } from '../../../constants/COLORS';

export const styles = StyleSheet.create({

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


});


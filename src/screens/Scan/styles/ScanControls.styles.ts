import { StyleSheet } from 'react-native';
import { COLORS } from '../../../constants/COLORS';

export const styles = StyleSheet.create({
    bottomControls: {
    position: 'absolute', bottom: 20,
    left: 0, right: 0,
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'center', gap: 36,
  },
  controlBtn: {
    width: 46, height: 46,
    backgroundColor: 'rgba(0,0,0,0.45)',
    borderRadius: 23, alignItems: 'center', justifyContent: 'center',
    borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.25)',
  },
  controlBtnText: { fontSize: 20 },
  shutterBtn: {
    width: 70, height: 70, borderRadius: 35,
    backgroundColor: 'rgba(255,255,255,0.92)',
    borderWidth: 3, borderColor: 'white',
    alignItems: 'center', justifyContent: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3, shadowRadius: 6, elevation: 6,
  },
  shutterBtnDisabled: { opacity: 0.4 },
  shutterInner: {
    width: 56, height: 56, borderRadius: 28,
    backgroundColor: 'white', borderWidth: 2,
    borderColor: 'rgba(0,0,0,0.08)',
  },
});
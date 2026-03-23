import { StyleSheet } from 'react-native';
import { COLORS } from '../../../constants/COLORS';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.beige,
  },
  kav: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
    paddingHorizontal: 22,
    paddingBottom: 24,
  },

  // Field Section
  fieldSection: {
    marginTop: 22,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.ink,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 8,
    paddingLeft: 2,
  },
  fieldCard: {
    backgroundColor: COLORS.bg2,
    borderWidth: 2.5,
    borderColor: COLORS.border,
    borderRadius: 20,
    padding: 14,
    shadowColor: COLORS.border,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
    gap: 12,
  },

  // Input
  inputWrap: {
    position: 'relative',
  },
  fieldInput: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    paddingRight: 46,
    backgroundColor: COLORS.beige,
    borderWidth: 2.5,
    borderColor: COLORS.border,
    borderRadius: 14,
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.ink,
  },
  fieldInputError: {
    borderColor: COLORS.red,
    backgroundColor: '#FFF8F8',
  },
  fieldInputValid: {
    borderColor: COLORS.green,
    backgroundColor: COLORS.greenLight,
  },
  eyeBtn: {
    position: 'absolute',
    right: 12,
    top: '50%',
    transform: [{ translateY: -10 }],
  },
  eyeIcon: { fontSize: 16 },
  eyeIconOff: { opacity: 0.4 },

  // Requirements Card
  reqCard: {
    backgroundColor: COLORS.beige,
    borderWidth: 1.5,
    borderColor: 'rgba(42,26,26,0.12)',
    borderRadius: 14,
    padding: 12,
    gap: 6,
  },
  reqCardTitle: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.inkMuted,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  reqItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  reqCheck: {
    width: 17, height: 17,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: COLORS.inkMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reqCheckMet: {
    backgroundColor: COLORS.green,
    borderColor: COLORS.green,
  },
  reqCheckTick: {
    fontSize: 9,
    fontWeight: '900',
    color: 'white',
    lineHeight: 11,
  },
  reqText: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.inkMuted,
  },
  reqTextMet: {
    color: COLORS.green,
  },

  // Hint
  hintText: {
    fontSize: 11,
    fontWeight: '500',
    color: COLORS.inkMuted,
    paddingLeft: 2,
  },
  hintError: {
    color: COLORS.red,
    fontWeight: '700',
  },
  hintSuccess: {
    color: COLORS.green,
    fontWeight: '700',
  },

  // Reset Button
  resetBtn: {
    marginTop: 24,
    height: 54,
    backgroundColor: COLORS.red,
    borderWidth: 2.5,
    borderColor: COLORS.border,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.border,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
  },
  resetBtnSuccess: {
    backgroundColor: COLORS.green,
  },
  resetBtnText: {
    fontSize: 15,
    fontWeight: '900',
    color: 'white',
    letterSpacing: -0.3,
  },
});
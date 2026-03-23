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
    paddingHorizontal: 24,
    paddingBottom: 40,
  },

  // Form Card
  formCard: {
    backgroundColor: COLORS.bg2,
    borderWidth: 2.5,
    borderColor: COLORS.border,
    borderRadius: 24,
    padding: 20,
    gap: 10,
    marginTop: 20,
    shadowColor: COLORS.border,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
  },

  // Field
  fieldLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.inkMuted,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  fieldInput: {
    paddingVertical: 11,
    paddingHorizontal: 14,
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
    backgroundColor: COLORS.redLight,
  },

  // Hint
  hintText: {
    fontSize: 11,
    fontWeight: '500',
    color: COLORS.inkMuted,
    marginTop: -4,
  },
  hintTextError: {
    color: COLORS.red,
    fontWeight: '600',
  },

  // Primary Button
  btnPrimary: {
    backgroundColor: COLORS.red,
    borderWidth: 2.5,
    borderColor: COLORS.border,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
    shadowColor: COLORS.border,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
    minHeight: 50,
  },
  btnSuccess: {
    backgroundColor: COLORS.green,
  },
  btnPrimaryText: {
    fontSize: 15,
    fontWeight: '900',
    color: 'white',
    letterSpacing: -0.3,
  },
});
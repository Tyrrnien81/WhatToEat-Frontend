import { StyleSheet } from 'react-native';
import { C } from '../../DiningHall/theme';

export const styles = StyleSheet.create({
  scroll: { flexGrow: 0 },
  row: {
    paddingHorizontal: 16,
    gap: 8,
    paddingVertical: 2,
  },
  tag: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: 'rgba(42,26,26,0.2)',
    backgroundColor: C.bg2,
  },
  tagSelected: {
    backgroundColor: C.ink,
    borderColor: C.ink,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '600',
    color: C.inkMuted,
  },
  tagTextSelected: {
    color: 'white',
    fontWeight: '700',
  },
});
import { StyleSheet, Platform } from 'react-native';
import { C } from '../../DiningHall/theme';
import { DiningHallTag } from '../types';

export const TAG_COLORS: Record<DiningHallTag, { bg: string; text: string }> = {
  'Gordon':     { bg: '#FFE8D6', text: '#B8562A' },
  "Rheta's":    { bg: '#E8F4FF', text: '#2A6CB8' },
  "Liz's":      { bg: '#E8FFE8', text: '#16803D' },
  'Four Lakes': { bg: '#E8F0FF', text: '#2A50B8' },
  "Carson's":   { bg: '#FFF0E8', text: '#B85A2A' },
  'Lowell':     { bg: '#F5E8FF', text: '#6B2AB8' },
};

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: C.bg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 2.5,
    borderBottomColor: C.border,
    backgroundColor: C.bg,
  },
  closeBtn: {
    width: 34,
    height: 34,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: C.border,
    backgroundColor: C.bg2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: C.ink,
    letterSpacing: -0.3,
  },
  postBtn: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: C.red,
    borderWidth: 2,
    borderColor: C.border,
    ...Platform.select({
      ios: { shadowColor: C.border, shadowOffset: { width: 2, height: 2 }, shadowOpacity: 1, shadowRadius: 0 },
      android: { elevation: 2 },
    }),
  },
  postBtnDisabled: {
    backgroundColor: '#F0E0E0',
    shadowOpacity: 0,
    elevation: 0,
  },
  postBtnText: {
    fontSize: 13,
    fontWeight: '800',
    color: 'white',
  },
  postBtnTextDisabled: {
    color: C.inkMuted,
  },
  body: {
    flex: 1,
    paddingTop: 20,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 10,
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: '800',
    color: C.ink,
    letterSpacing: -0.2,
  },
  required: {
    fontSize: 10,
    fontWeight: '600',
    color: C.red,
  },
  tagRow: {
    gap: 8,
    paddingVertical: 2,
  },
  tagChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: C.border,
    backgroundColor: C.bg2,
  },
  tagEmoji: { fontSize: 14 },
  tagChipText: {
    fontSize: 12,
    fontWeight: '700',
    color: C.ink,
  },
  textInput: {
    backgroundColor: C.bg2,
    borderWidth: 2,
    borderColor: C.border,
    borderRadius: 16,
    padding: 14,
    fontSize: 14,
    fontWeight: '500',
    color: C.ink,
    minHeight: 140,
    lineHeight: 22,
  },
  charCount: {
    fontSize: 10,
    fontWeight: '600',
    color: C.inkMuted,
    textAlign: 'right',
    marginTop: 6,
  },
});
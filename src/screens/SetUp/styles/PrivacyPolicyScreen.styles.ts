import { StyleSheet } from 'react-native';
import { COLORS } from '../../../constants/COLORS';

export const styles = StyleSheet.create({

  safeArea: { flex: 1, backgroundColor: COLORS.beige },

  // Screen Body — flex layout, no overflow:hidden so agreementNote is never clipped
  screenBody: {
    flex: 1,
    paddingHorizontal: 22,
    paddingTop: 12,
    paddingBottom: 8,
    gap: 12,
  },

  // Page Header
  pageHeader: { gap: 4 },
  pageTitle: { fontSize: 24, fontWeight: '900', color: COLORS.ink, letterSpacing: -0.8 },
  pageDivider: { height: 2, backgroundColor: COLORS.border, opacity: 0.1, borderRadius: 2, marginTop: 4 },
  pageSubtitle: { fontSize: 12, fontWeight: '500', color: COLORS.inkMuted, lineHeight: 18, marginTop: 3 },

  // Hero Card
  heroCard: {
    backgroundColor: COLORS.bg2,
    borderWidth: 2.5, borderColor: COLORS.border,
    borderRadius: 22, paddingVertical: 14, paddingHorizontal: 20,
    alignItems: 'center', gap: 8,
    shadowColor: COLORS.border, shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1, shadowRadius: 0, elevation: 4,
  },
  heroImg: { width: 90, height: 90 },
  heroTitle: { fontSize: 16, fontWeight: '900', color: COLORS.ink, letterSpacing: -0.4 },
  heroDesc: { fontSize: 11, fontWeight: '500', color: COLORS.inkMuted, textAlign: 'center', lineHeight: 17 },

  // Section Label
  sectionLabel: { fontSize: 10, fontWeight: '800', color: COLORS.inkMuted, letterSpacing: 1 },

  // Policy Group
  policyGroup: {
    backgroundColor: COLORS.bg2,
    borderWidth: 2.5, borderColor: COLORS.border,
    borderRadius: 18,
    shadowColor: COLORS.border, shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1, shadowRadius: 0, elevation: 4,
    overflow: 'hidden',
  },
  policyItem: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 13 },
  policyItemBorder: { borderTopWidth: 1.5, borderTopColor: 'rgba(42,26,26,0.08)' },
  policyIcon: {
    width: 36, height: 36, borderRadius: 10,
    borderWidth: 2, borderColor: COLORS.border,
    alignItems: 'center', justifyContent: 'center',
  },
  policyIconText: { fontSize: 16 },
  policyText: { flex: 1 },
  policyName: { fontSize: 13, fontWeight: '800', color: COLORS.ink, letterSpacing: -0.3, marginBottom: 1 },
  policyDesc: { fontSize: 10, fontWeight: '500', color: COLORS.inkMuted },
  policyArrow: { fontSize: 18, color: COLORS.inkMuted, fontWeight: '700' },

  // Agreement Note
  agreementNote: { textAlign: 'center', fontSize: 11, fontWeight: '500', color: COLORS.inkMuted, lineHeight: 17 },
  agreementBold: { fontWeight: '800', color: COLORS.ink },
  agreementLink: { fontWeight: '700', color: COLORS.red },

  // Bottom Actions
  bottomActions: { paddingHorizontal: 22, paddingBottom: 28, paddingTop: 10, gap: 8 },
  btnTextLink: { fontSize: 12, fontWeight: '700', color: COLORS.inkMuted, textAlign: 'center', paddingVertical: 4 },

  // Policy Detail Modal
  modalOverlay: {
    flex: 1, backgroundColor: 'rgba(26,10,10,0.5)',
    justifyContent: 'flex-end',
  },
  modalSheet: {
    backgroundColor: COLORS.beige,
    borderTopLeftRadius: 28, borderTopRightRadius: 28,
    borderWidth: 2.5, borderColor: COLORS.border,
    borderBottomWidth: 0,
    maxHeight: '70%',
  },
  modalHandle: {
    width: 36, height: 4, backgroundColor: 'rgba(42,26,26,0.2)',
    borderRadius: 2, alignSelf: 'center', marginTop: 12,
  },
  modalHeader: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    padding: 14, paddingBottom: 12,
    borderBottomWidth: 1.5, borderBottomColor: 'rgba(42,26,26,0.08)',
  },
  modalHeaderIcon: {
    width: 40, height: 40, borderRadius: 12,
    borderWidth: 2, borderColor: COLORS.border,
    alignItems: 'center', justifyContent: 'center',
  },
  modalHeaderIconText: { fontSize: 18 },
  modalTitle: { flex: 1, fontSize: 16, fontWeight: '900', color: COLORS.ink, letterSpacing: -0.4 },
  modalClose: {
    width: 30, height: 30, backgroundColor: COLORS.bg2,
    borderWidth: 2, borderColor: COLORS.border, borderRadius: 15,
    alignItems: 'center', justifyContent: 'center',
  },
  modalCloseText: { fontSize: 12, fontWeight: '800', color: COLORS.inkMuted },
  modalBody: { padding: 16 },
  modalIntro: { fontSize: 12, fontWeight: '500', color: COLORS.inkMuted, lineHeight: 20, marginBottom: 12 },
  modalSectionTitle: { fontSize: 10, fontWeight: '800', color: COLORS.inkMuted, letterSpacing: 1, marginBottom: 10 },
  modalBullet: {
    flexDirection: 'row', alignItems: 'flex-start', gap: 10,
    backgroundColor: COLORS.bg2, borderWidth: 2, borderColor: COLORS.border,
    borderRadius: 14, padding: 10, marginBottom: 8,
    shadowColor: COLORS.border, shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1, shadowRadius: 0, elevation: 2,
  },
  modalBulletDot: {
    width: 8, height: 8, backgroundColor: COLORS.red,
    borderRadius: 4, marginTop: 5, flexShrink: 0,
  },
  modalBulletTitle: { fontSize: 12, fontWeight: '700', color: COLORS.ink, lineHeight: 18 },
  modalBulletDesc: { fontSize: 11, fontWeight: '500', color: COLORS.inkMuted, marginTop: 2, lineHeight: 16 },

  // Full Policy Page
  fullPolicyHeader: { paddingHorizontal: 22, marginTop: 14, gap: 4 },
  fullPolicyTitle: { fontSize: 22, fontWeight: '900', color: COLORS.ink, letterSpacing: -0.8 },
  fullPolicyBody: { flex: 1, paddingHorizontal: 22, marginTop: 14 },

  fpSection: {
    backgroundColor: COLORS.bg2,
    borderWidth: 2.5, borderColor: COLORS.border,
    borderRadius: 18, padding: 14, marginBottom: 12,
    shadowColor: COLORS.border, shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1, shadowRadius: 0, elevation: 4,
    gap: 8,
  },
  fpSectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  fpSectionIcon: {
    width: 32, height: 32, borderRadius: 10,
    borderWidth: 2, borderColor: COLORS.border,
    alignItems: 'center', justifyContent: 'center',
  },
  fpSectionIconText: { fontSize: 14 },
  fpSectionTitle: { fontSize: 13, fontWeight: '900', color: COLORS.ink, letterSpacing: -0.3 },
  fpDivider: { height: 1.5, backgroundColor: 'rgba(42,26,26,0.08)', borderRadius: 1 },
  fpSectionText: { fontSize: 11, fontWeight: '500', color: COLORS.inkMuted, lineHeight: 19 },
  fpFooter: {
    textAlign: 'center', fontSize: 10, fontWeight: '500',
    color: COLORS.inkMuted, lineHeight: 16, paddingHorizontal: 10, marginTop: 4,
  },
});
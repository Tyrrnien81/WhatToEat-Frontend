import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Modal,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import BackButton from './components/BackButton';
import ProgressBar from './components/ProgressBar';
import ContinueButton from './components/ContinueButton';
import { COLORS } from '../../constants/COLORS';
import { styles } from './styles/PrivacyPolicyScreen.styles';

// ─── Types ────────────────────────────────────────────────────────────────────
type RootStackParamList = {
  Home: undefined;
  PrivacyPolicy: undefined;
};

type PrivacyPolicyScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'PrivacyPolicy'>;
};

// ─── Policy Section Data ──────────────────────────────────────────────────────
type PolicyKey = 'use' | 'collection' | 'protection';

type PolicyItem = {
  key: PolicyKey;
  icon: string;
  iconBg: string;
  name: string;
  desc: string;
};

const POLICY_ITEMS: PolicyItem[] = [
  {
    key: 'use',
    icon: '📋',
    iconBg: COLORS.redLight,
    name: 'Use of Information',
    desc: 'How we use your data to personalize your experience',
  },
  {
    key: 'collection',
    icon: '🗂️',
    iconBg: COLORS.beige,
    name: 'Information Collection',
    desc: 'What data we collect when you use the app',
  },
  {
    key: 'protection',
    icon: '🛡️',
    iconBg: '#DCFCE7',
    name: 'Data Protection',
    desc: 'How we keep your information safe and secure',
  },
];

type ModalContent = {
  icon: string;
  iconBg: string;
  title: string;
  intro: string;
  sectionTitle: string;
  bullets: { title: string; desc: string }[];
};

const MODAL_CONTENT: Record<PolicyKey, ModalContent> = {
  use: {
    icon: '📋', iconBg: COLORS.redLight,
    title: 'Use of Information',
    intro: 'We use the information we collect to provide, improve, and personalize your dining experience at WhatToEat.',
    sectionTitle: 'How we use your data',
    bullets: [
      { title: 'Personalized recommendations', desc: 'We use your dietary preferences and allergens to show relevant dining options.' },
      { title: 'App improvements', desc: 'Usage patterns help us make the app faster and more intuitive.' },
      { title: 'Notifications', desc: 'We may send you alerts about menu changes or dining hall hours.' },
      { title: 'We never sell your data', desc: 'Your information is never sold to advertisers or third parties.' },
    ],
  },
  collection: {
    icon: '🗂️', iconBg: COLORS.beige,
    title: 'Information Collection',
    intro: "We only collect what's necessary to give you a great experience. Here's exactly what we gather.",
    sectionTitle: 'What we collect',
    bullets: [
      { title: 'Account information', desc: 'Your name and email address when you sign up.' },
      { title: 'Dietary preferences', desc: 'Diet type, allergens, and food dislikes you set during onboarding.' },
      { title: 'Dining hall selections', desc: 'Your preferred campus dining halls for personalized menus.' },
      { title: 'App usage data', desc: 'Anonymized interaction data to improve features.' },
    ],
  },
  protection: {
    icon: '🛡️', iconBg: '#DCFCE7',
    title: 'Data Protection',
    intro: 'We take your security seriously and use industry-standard practices to keep your data safe.',
    sectionTitle: 'How we protect you',
    bullets: [
      { title: 'Encrypted storage', desc: 'All data is encrypted at rest and in transit using TLS/SSL.' },
      { title: 'Access controls', desc: 'Only authorized team members can access user data, on a need-to-know basis.' },
      { title: 'Regular audits', desc: 'We conduct regular security reviews to identify and fix vulnerabilities.' },
      { title: 'Delete your data anytime', desc: 'You can request full data deletion from your account settings.' },
    ],
  },
};

type FullPolicySectionData = {
  icon: string;
  iconBg: string;
  title: string;
  text: string;
};

const FULL_POLICY_SECTIONS: FullPolicySectionData[] = [
  {
    icon: '📋', iconBg: COLORS.redLight,
    title: 'Use of Information',
    text: 'We use the information we collect to provide, improve, and personalize your dining experience. This includes showing meal recommendations based on your dietary preferences, allergens, and dining hall selections.\n\nWe also use anonymized usage data to improve app performance and fix bugs. We will never sell your personal information to advertisers or any third parties.',
  },
  {
    icon: '🗂️', iconBg: COLORS.beige,
    title: 'Information Collection',
    text: "We collect only what's necessary to deliver a great experience:\n\nAccount data: Your name and email when you register.\nPreferences: Dietary type, allergens, food dislikes, and goal weight set during onboarding.\nDining selections: Your preferred campus dining halls.\nUsage data: Anonymized interactions to improve features and performance.",
  },
  {
    icon: '🛡️', iconBg: '#DCFCE7',
    title: 'Data Protection',
    text: 'We use industry-standard security to protect your data. All information is encrypted in transit (TLS/SSL) and at rest. Access to user data is restricted to authorized personnel only on a need-to-know basis.\n\nYou can request deletion of your data at any time from your account settings.',
  },
  {
    icon: '🔗', iconBg: '#EFF6FF',
    title: 'Third-Party Sharing',
    text: 'We do not sell your personal data. We may share limited data with trusted service providers who help us operate the app (e.g. cloud hosting), under strict confidentiality agreements.\n\nWe may disclose information if required by law or to protect the rights and safety of our users.',
  },
  {
    icon: '⚙️', iconBg: COLORS.beige,
    title: 'Your Rights',
    text: 'You have the right to access, correct, export, or delete your personal data at any time. You can manage your data preferences directly in the app settings or contact us at privacy@whattoeat.app.\n\nWe will respond to all data requests within 30 days.',
  },
];

// ─── Full Policy Modal (uses insets directly) ─────────────────────────────────
function FullPolicyModal({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) {
  const insets = useSafeAreaInsets();

  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={[styles.safeArea, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>

        <BackButton onPress={onClose} />

        <View style={styles.fullPolicyHeader}>
          <Text style={styles.fullPolicyTitle}>Full Privacy Policy</Text>
          <View style={styles.pageDivider} />
          <Text style={styles.pageSubtitle}>Last updated March 2026 · WhatToEat App</Text>
        </View>

        <ScrollView
          style={styles.fullPolicyBody}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 32 }}
        >
          {FULL_POLICY_SECTIONS.map((section, i) => (
            <View key={i} style={styles.fpSection}>
              <View style={styles.fpSectionHeader}>
                <View style={[styles.fpSectionIcon, { backgroundColor: section.iconBg }]}>
                  <Text style={styles.fpSectionIconText}>{section.icon}</Text>
                </View>
                <Text style={styles.fpSectionTitle}>{section.title}</Text>
              </View>
              <View style={styles.fpDivider} />
              <Text style={styles.fpSectionText}>{section.text}</Text>
            </View>
          ))}

          <Text style={styles.fpFooter}>
            By using WhatToEat, you agree to this Privacy Policy.{'\n'}
            Questions? Contact us at privacy@whattoeat.app
          </Text>
        </ScrollView>

      </View>
    </Modal>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function PrivacyPolicyScreen({ navigation }: PrivacyPolicyScreenProps) {
  const [modalKey, setModalKey] = useState<PolicyKey | null>(null);
  const [showFullPolicy, setShowFullPolicy] = useState(false);

  const activeModal = modalKey ? MODAL_CONTENT[modalKey] : null;

  return (
    <SafeAreaView style={styles.safeArea}>

      {/* ── Back Button ── */}
      <BackButton onPress={() => navigation.goBack()} />

      {/* ── Progress Bar ── */}
      <ProgressBar progress="100%" step="Step 10 of 10" />

      {/* ── Screen Body (static — no ScrollView) ── */}
      <View style={styles.screenBody}>

        {/* Page Header */}
        <View style={styles.pageHeader}>
          <Text style={styles.pageTitle}>Privacy Policy</Text>
          <View style={styles.pageDivider} />
          <Text style={styles.pageSubtitle}>We're transparent about how we collect and use your data.</Text>
        </View>

        {/* Hero Card */}
        <View style={styles.heroCard}>
          <Image
            source={require('../../../assets/Reference_Images/PrivacyPolicy.png')}
            style={styles.heroImg}
            resizeMode="contain"
          />
          <Text style={styles.heroTitle}>Your Privacy Matters</Text>
          <Text style={styles.heroDesc}>We explain what we collect and how we use it to make your dining experience better.</Text>
        </View>

        {/* Section Label */}
        <Text style={styles.sectionLabel}>POLICY SECTIONS</Text>

        {/* Policy Group Card */}
        <View style={styles.policyGroup}>
          {POLICY_ITEMS.map((item, index) => (
            <TouchableOpacity
              key={item.key}
              style={[styles.policyItem, index > 0 && styles.policyItemBorder]}
              onPress={() => setModalKey(item.key)}
              activeOpacity={0.8}
            >
              <View style={[styles.policyIcon, { backgroundColor: item.iconBg }]}>
                <Text style={styles.policyIconText}>{item.icon}</Text>
              </View>
              <View style={styles.policyText}>
                <Text style={styles.policyName}>{item.name}</Text>
                <Text style={styles.policyDesc}>{item.desc}</Text>
              </View>
              <Text style={styles.policyArrow}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Agreement Note */}
        <Text style={styles.agreementNote}>
          By tapping <Text style={styles.agreementBold}>I Agree</Text>, you accept our{' '}
          <Text style={styles.agreementLink}>Privacy Policy</Text> and{' '}
          <Text style={styles.agreementLink}>Terms of Service</Text>.
        </Text>

      </View>

      {/* ── Bottom Actions ── */}
      <View style={styles.bottomActions}>
        <ContinueButton
          label="I Agree ✓"
          onPress={() => navigation.navigate('Home')}
        />
        <TouchableOpacity onPress={() => setShowFullPolicy(true)} activeOpacity={0.7}>
          <Text style={styles.btnTextLink}>Read full policy →</Text>
        </TouchableOpacity>
      </View>

      {/* ── Policy Detail Bottom Sheet ── */}
      <Modal
        visible={modalKey !== null}
        transparent
        animationType="slide"
        onRequestClose={() => setModalKey(null)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setModalKey(null)}
        >
          <TouchableOpacity style={styles.modalSheet} activeOpacity={1} onPress={() => {}}>
            <View style={styles.modalHandle} />

            {activeModal && (
              <>
                <View style={styles.modalHeader}>
                  <View style={[styles.modalHeaderIcon, { backgroundColor: activeModal.iconBg }]}>
                    <Text style={styles.modalHeaderIconText}>{activeModal.icon}</Text>
                  </View>
                  <Text style={styles.modalTitle}>{activeModal.title}</Text>
                  <TouchableOpacity style={styles.modalClose} onPress={() => setModalKey(null)}>
                    <Text style={styles.modalCloseText}>✕</Text>
                  </TouchableOpacity>
                </View>

                <ScrollView style={styles.modalBody} showsVerticalScrollIndicator={false}>
                  <Text style={styles.modalIntro}>{activeModal.intro}</Text>
                  <Text style={styles.modalSectionTitle}>{activeModal.sectionTitle.toUpperCase()}</Text>
                  {activeModal.bullets.map((bullet, i) => (
                    <View key={i} style={styles.modalBullet}>
                      <View style={styles.modalBulletDot} />
                      <View style={{ flex: 1 }}>
                        <Text style={styles.modalBulletTitle}>{bullet.title}</Text>
                        <Text style={styles.modalBulletDesc}>{bullet.desc}</Text>
                      </View>
                    </View>
                  ))}
                </ScrollView>
              </>
            )}
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>

      {/* ── Full Policy Page ── */}
      <FullPolicyModal
        visible={showFullPolicy}
        onClose={() => setShowFullPolicy(false)}
      />

    </SafeAreaView>
  );
}
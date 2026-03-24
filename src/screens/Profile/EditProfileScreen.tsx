import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../App';
import Svg, { Path, Circle } from 'react-native-svg';

// ─── Constants ────────────────────────────────────────────────────────────────
const COLORS = {
  red: '#FF3347',
  redLight: '#FFE0E3',
  bg2: '#FFF5F5',
  ink: '#1A0A0A',
  inkMuted: '#9A7070',
  border: '#2A1A1A',
  beige: '#F5ECD7',
};

// ─── Icons ────────────────────────────────────────────────────────────────────
const IconBack = () => (
  <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
    <Path d="M19 12H5M12 5l-7 7 7 7" stroke={COLORS.ink} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const IconChevron = () => (
  <Svg width={10} height={10} viewBox="0 0 10 10">
    <Path d="M3.5 2l3 3-3 3" stroke={COLORS.inkMuted} strokeWidth={1.8} strokeLinecap="round" fill="none" />
  </Svg>
);

// ─── Input Row ────────────────────────────────────────────────────────────────
const InputRow = ({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = 'default',
  unit,
}: {
  label: string;
  value: string;
  onChangeText: (v: string) => void;
  placeholder?: string;
  keyboardType?: any;
  unit?: string;
}) => (
  <View style={styles.inputRow}>
    <Text style={styles.inputLabel}>{label}</Text>
    <View style={styles.inputWrap}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder ?? ''}
        placeholderTextColor={COLORS.inkMuted}
        keyboardType={keyboardType}
      />
      {unit ? <Text style={styles.inputUnit}>{unit}</Text> : null}
    </View>
  </View>
);

// ─── Nav Row (taps into existing SetUp screens) ───────────────────────────────
const NavRow = ({ label, value, onPress }: { label: string; value?: string; onPress: () => void }) => (
  <TouchableOpacity style={styles.navRow} onPress={onPress} activeOpacity={0.7}>
    <Text style={styles.navRowLabel}>{label}</Text>
    <View style={styles.navRowRight}>
      {value ? <Text style={styles.navRowValue}>{value}</Text> : null}
      <View style={styles.chevronWrap}>
        <IconChevron />
      </View>
    </View>
  </TouchableOpacity>
);

// ─── Section Block ────────────────────────────────────────────────────────────
const SectionBlock = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <View style={styles.sectionBlock}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <View style={styles.sectionCard}>{children}</View>
  </View>
);

const Divider = () => <View style={styles.divider} />;

// ─── Main Screen ──────────────────────────────────────────────────────────────
export default function EditProfileScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  // Local state for inline editable fields
  const [name, setName] = useState('Seunghoon Park');
  const [university, setUniversity] = useState('UW–Madison');
  const [height, setHeight] = useState('178');
  const [weight, setWeight] = useState('72');
  const [goalWeight, setGoalWeight] = useState('68');

  const handleSave = () => {
    // TODO: persist to backend / context
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.beige} />

      {/* ── Header ── */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()} activeOpacity={0.8}>
          <IconBack />
        </TouchableOpacity>
        <Text style={styles.screenTitle}>Edit Profile</Text>
        <TouchableOpacity style={styles.saveBtn} onPress={handleSave} activeOpacity={0.85}>
          <Text style={styles.saveBtnText}>Save</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* ── Avatar ── */}
        <View style={styles.avatarSection}>
          <View style={styles.avatarWrap}>
            <View style={styles.avatar}>
              <Text style={styles.avatarEmoji}>🧑‍🍳</Text>
            </View>
            <TouchableOpacity style={styles.avatarEditBtn} activeOpacity={0.8}>
              <Text style={styles.avatarEditText}>✏️</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.avatarHint}>Tap to change avatar</Text>
        </View>

        {/* ── Basic Info ── */}
        <SectionBlock title="Basic Info">
          <InputRow label="Name" value={name} onChangeText={setName} placeholder="Your name" />
          <Divider />
          <InputRow label="University" value={university} onChangeText={setUniversity} placeholder="Your university" />
        </SectionBlock>

        {/* ── Body Info ── */}
        <SectionBlock title="Body Info">
          <InputRow label="Height" value={height} onChangeText={setHeight} keyboardType="numeric" unit="cm" />
          <Divider />
          <InputRow label="Weight" value={weight} onChangeText={setWeight} keyboardType="numeric" unit="kg" />
          <Divider />
          <InputRow label="Goal Weight" value={goalWeight} onChangeText={setGoalWeight} keyboardType="numeric" unit="kg" />
          <Divider />
          <NavRow label="Birthday" value="Sep 15, 2001" onPress={() => navigation.navigate('Birthday')} />
          <Divider />
          <NavRow label="Gender" value="Male" onPress={() => navigation.navigate('Gender')} />
        </SectionBlock>

        {/* ── Diet & Restrictions ── */}
        <SectionBlock title="Diet & Restrictions">
          <NavRow label="Diet Type" value="High Protein" onPress={() => navigation.navigate('Diet')} />
          <Divider />
          <NavRow label="Allergens" value="2 items" onPress={() => navigation.navigate('Allergens')} />
          <Divider />
          <NavRow label="Dislikes" value="3 items" onPress={() => navigation.navigate('Dislikes')} />
        </SectionBlock>

        {/* ── Dining ── */}
        <SectionBlock title="Dining">
          <NavRow label="Home Dining Hall" value="Gordon Dining" onPress={() => navigation.navigate('DiningHall')} />
        </SectionBlock>

        {/* ── Danger Zone ── */}
        <SectionBlock title="Account">
          <NavRow label="Change Password" onPress={() => {}} />
          <Divider />
          <TouchableOpacity style={styles.deleteRow} activeOpacity={0.7}>
            <Text style={styles.deleteText}>Delete Account</Text>
          </TouchableOpacity>
        </SectionBlock>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.beige,
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 8,
  },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: 13,
    backgroundColor: COLORS.bg2,
    borderWidth: 2,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.border,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 2,
  },
  screenTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: COLORS.ink,
    letterSpacing: -0.4,
  },
  saveBtn: {
    backgroundColor: COLORS.red,
    borderWidth: 2,
    borderColor: COLORS.border,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 7,
    shadowColor: COLORS.border,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 2,
  },
  saveBtnText: {
    fontSize: 13,
    fontWeight: '900',
    color: 'white',
  },

  scroll: { flex: 1 },
  scrollContent: { paddingBottom: 40 },

  // Avatar
  avatarSection: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  avatarWrap: {
    position: 'relative',
    marginBottom: 8,
  },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 28,
    backgroundColor: COLORS.redLight,
    borderWidth: 3,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.border,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
  },
  avatarEmoji: { fontSize: 44 },
  avatarEditBtn: {
    position: 'absolute',
    bottom: -6,
    right: -6,
    width: 28,
    height: 28,
    borderRadius: 10,
    backgroundColor: COLORS.beige,
    borderWidth: 2,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarEditText: { fontSize: 13 },
  avatarHint: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.inkMuted,
  },

  // Section
  sectionBlock: {
    marginHorizontal: 20,
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.7,
    textTransform: 'uppercase',
    color: COLORS.inkMuted,
    marginBottom: 8,
  },
  sectionCard: {
    backgroundColor: COLORS.bg2,
    borderWidth: 2.5,
    borderColor: COLORS.border,
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 4,
    shadowColor: COLORS.border,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
  },

  // Input row
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.ink,
    flex: 1,
  },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  input: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.ink,
    textAlign: 'right',
    minWidth: 80,
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: COLORS.beige,
    borderWidth: 2,
    borderColor: COLORS.border,
    borderRadius: 10,
  },
  inputUnit: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.inkMuted,
  },

  // Nav row
  navRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 13,
  },
  navRowLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.ink,
  },
  navRowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  navRowValue: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.inkMuted,
  },
  chevronWrap: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: COLORS.redLight,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Divider
  divider: {
    height: 1.5,
    backgroundColor: '#F0E0E0',
  },

  // Delete
  deleteRow: {
    paddingVertical: 13,
    alignItems: 'center',
  },
  deleteText: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.red,
  },
});
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import ProgressBar from './components/ProgressBar';
import ContinueButton from './components/ContinueButton';
import BackButton from './components/BackButton';
import { styles } from './styles/GenderScreen.styles';

// ─── Types ────────────────────────────────────────────────────────────────────
type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  Onboarding: undefined;
  Home: undefined;
  Welcome: undefined;
  Birthday: undefined;
  Gender: undefined;
  Height: undefined;
};

type GenderScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Gender'>;
};

const GENDERS = [
  { id: 'male',   label: 'Male' },
  { id: 'female', label: 'Female' },
  { id: 'other',  label: 'Other' },
  { id: 'prefer', label: 'Prefer Not To Say' },
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function GenderScreen({ navigation }: GenderScreenProps) {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <SafeAreaView style={styles.safeArea}>

      {/* ── Back Button ── */}
      <BackButton onPress={() => navigation.goBack()} />

      {/* ── Progress Bar ── */}
      <ProgressBar progress="20%" step="Step 2 of 10" />

      {/* ── Header ── */}
      <View style={styles.header}>
        <Text style={styles.title}>What is your gender?</Text>
        <Text style={styles.subtitle}>
          We use this to better estimate your calorie needs
        </Text>
      </View>

      {/* ── Gender Grid ── */}
      <View style={styles.grid}>
        {GENDERS.map((g) => {
          const isSelected = selected === g.id;
          return (
            <TouchableOpacity
              key={g.id}
              style={[styles.genderBtn, isSelected && styles.genderBtnSelected]}
              onPress={() => setSelected(g.id)}
              activeOpacity={0.85}
            >
              <View style={[styles.checkBadge, isSelected && styles.checkBadgeSelected]}>
                {isSelected && <Text style={styles.checkMark}>✓</Text>}
              </View>
              <Text style={[styles.genderLabel, isSelected && styles.genderLabelSelected]}>
                {g.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* ── Spacer ── */}
      <View style={{ flex: 1 }} />

      {/* ── Continue Button ── */}
      <ContinueButton
        onPress={() => navigation.navigate('Height')}
        disabled={!selected}
      />

    </SafeAreaView>
  );
}
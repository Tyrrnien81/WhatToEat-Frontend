import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import { styles } from './styles/WelcomeScreen.styles';

// ─── Types ────────────────────────────────────────────────────────────────────
type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  Onboarding: undefined;
  Home: undefined;
  ForgotPassword: undefined;
  ResetPassword: undefined;
  VerifyEmail: { email: string };
  Birthday: undefined;
  Welcome: undefined;
};

type WelcomeScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Welcome'>;
};

// ─── Component ────────────────────────────────────────────────────────────────
export default function WelcomeScreen({ navigation }: WelcomeScreenProps) {
  return (
    <SafeAreaView style={styles.safeArea}>

      {/* ── Main Content ── */}
      <View style={styles.content}>

        {/* Logo */}
        <View style={styles.logoWrap}>
          <View style={styles.logoIcon}>
            <Text style={styles.logoEmoji}>🍽️</Text>
          </View>
          <Text style={styles.logoTitle}>
            What<Text style={styles.logoAccent}>To</Text>Eat
          </Text>
          <Text style={styles.logoTagline}>Your campus dining companion</Text>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Description */}
        <Text style={styles.description}>
          Discover{' '}
          <Text style={styles.descriptionBold}>what's being served</Text>
          {' '}at your campus dining halls — personalized just for you.
        </Text>

      </View>

      {/* ── Bottom Section ── */}
      <View style={styles.bottomSection}>

        {/* Get Started */}
        <TouchableOpacity
          style={styles.getStartedBtn}
          onPress={() => navigation.navigate('Birthday')}
          activeOpacity={0.85}
        >
          <Text style={styles.getStartedBtnText}>Get Started →</Text>
        </TouchableOpacity>

        {/* Terms */}
        <Text style={styles.terms}>
          By continuing you agree to our{' '}
          <Text style={styles.termsLink}>Terms of Service</Text>
          {' '}and{' '}
          <Text style={styles.termsLink}>Privacy Policy</Text>
        </Text>

      </View>

    </SafeAreaView>
  );
}
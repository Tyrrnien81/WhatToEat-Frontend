import { useFocusEffect } from '@react-navigation/native';
import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import BackButton from './components/BackButton';
import ReturnToLogin from './components/ReturnToLogin';
import AuthHeader from './components/AuthHeader';
import { COLORS } from '../../constants/COLORS';
import { styles } from './styles/ForgotPasswordScreen.styles';

// ─── Types ────────────────────────────────────────────────────────────────────
type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  Onboarding: undefined;
  Home: undefined;
  ForgotPassword: undefined;
  VerifyEmail: undefined;
};

type ForgotPasswordScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'ForgotPassword'>;
};

// ─── Component ────────────────────────────────────────────────────────────────
export default function ForgotPasswordScreen({ navigation }: ForgotPasswordScreenProps) {
  const [email, setEmail]       = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [loading, setLoading]   = useState(false);
  const [sent, setSent]         = useState(false);

  // ── Reset on focus ──────────────────────────────────────────────────────────
  useFocusEffect(
    useCallback(() => {
      setEmail('');
      setEmailErr('');
      setLoading(false);
      setSent(false);
    }, [])
  );

  // ── Validation ──────────────────────────────────────────────────────────────
  const handleSend = async () => {
    if (!email.trim()) {
      setEmailErr('Please enter your email address');
      return;
    }
    if (!email.includes('@')) {
      setEmailErr('Invalid format - Please enter valid email address');
      return;
    }
    setEmailErr('');
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSent(true);
      setTimeout(() => navigation.navigate('VerifyEmail'), 600);
    } catch (err) {
      setEmailErr('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.kav}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* ── Back Button ── */}
        <BackButton onPress={() => navigation.goBack()} />

        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* ── Header ── */}
          <AuthHeader
            title="Forgot Password"
            subtitle="Enter your registered email address and we'll send you a link to reset your password."
          />

          {/* ── Form Card ── */}
          <View style={styles.formCard}>
            <Text style={styles.fieldLabel}>Enter your email</Text>

            <TextInput
              style={[styles.fieldInput, !!emailErr && styles.fieldInputError]}
              placeholder="likelion@wisc.edu"
              placeholderTextColor={COLORS.inkMuted}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="done"
              value={email}
              onChangeText={v => { setEmail(v); setEmailErr(''); }}
              onSubmitEditing={handleSend}
              editable={!sent}
            />

            <Text style={[styles.hintText, !!emailErr && styles.hintTextError]}>
              {emailErr ? emailErr : 'Enter the email you used for sign up'}
            </Text>

            <TouchableOpacity
              style={[styles.btnPrimary, sent && styles.btnSuccess]}
              onPress={handleSend}
              disabled={loading || sent}
              activeOpacity={0.85}
            >
              {loading ? (
                <ActivityIndicator color="white" size="small" />
              ) : sent ? (
                <Text style={styles.btnPrimaryText}>✓  Code sent!</Text>
              ) : (
                <Text style={styles.btnPrimaryText}>Send code</Text>
              )}
            </TouchableOpacity>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>

      {/* ── Return to Login ── */}
      <ReturnToLogin onPress={() => navigation.navigate('Login')} />

    </SafeAreaView>
  );
}
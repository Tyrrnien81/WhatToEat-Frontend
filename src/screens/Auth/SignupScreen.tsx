import React, { useState, useRef, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import { useFocusEffect } from '@react-navigation/native';
import AuthHero from './components/AuthHero';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/COLORS';
import { styles } from './styles/SignUpScreen.styles';

// ─── Types ────────────────────────────────────────────────────────────────────
type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  Onboarding: undefined;
  Home: undefined;
  Welcome: undefined;
  SignupVerify: { email: string };  // ← fix: was undefined
};

type SignupScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Signup'>;
};

// ─── Component ────────────────────────────────────────────────────────────────
export default function SignupScreen({ navigation }: SignupScreenProps) {
  const [name, setName]         = useState('');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw]     = useState(false);
  const [nameErr, setNameErr]   = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [pwErr, setPwErr]       = useState('');
  const [loading, setLoading]   = useState(false);
  const [success, setSuccess]   = useState(false);

  const emailRef    = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

  // ── Reset success state when returning to this screen ──────────────────────
  useFocusEffect(
    useCallback(() => {
      setSuccess(false);
      setLoading(false);
    }, [])
  );

  // ── Validation ──────────────────────────────────────────────────────────────
  const validateEmail = (val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

  const handleNameBlur = () => {
    if (name.trim().length > 0 && name.trim().length < 2) {
      setNameErr('Name must be at least 2 characters');
    } else {
      setNameErr('');
    }
  };

  const handleEmailBlur = () => {
    if (email && !validateEmail(email)) {
      setEmailErr('Please enter a valid email address');
    } else {
      setEmailErr('');
    }
  };

  // ── Submit ──────────────────────────────────────────────────────────────────
  const handleSignup = async () => {
    let valid = true;

    if (name.trim().length < 2) {
      setNameErr('Please enter your full name');
      valid = false;
    } else {
      setNameErr('');
    }

    if (!validateEmail(email)) {
      setEmailErr('Please enter a valid email address');
      valid = false;
    } else {
      setEmailErr('');
    }

    if (password.length < 6) {
      setPwErr('Password must be at least 6 characters');
      valid = false;
    } else {
      setPwErr('');
    }

    if (!valid) return;

    setLoading(true);
    try {
      // TODO: replace with real API call
      // await createAccount({ name, email, password });
      await new Promise(resolve => setTimeout(resolve, 1600));
      setSuccess(true);
      setTimeout(() => navigation.navigate('SignupVerify', { email }), 600); // ← navigate keeps Signup in stack so goBack() works
    } catch (err) {
      setEmailErr('An account with this email already exists');
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
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >

          {/* ── Hero ── */}
          <AuthHero />

          {/* ── Form Card ── */}
          <View style={styles.formCard}>
            <View style={styles.formCardHeader}>
              <Text style={styles.formCardTitle}>Create Account</Text>
              <Text style={styles.formCardSubtitle}>
                Fill your information below or register with your social account
              </Text>
            </View>

            {/* Name */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Name</Text>
              <TextInput
                style={[styles.fieldInput, !!nameErr && styles.fieldInputError]}
                placeholder="Your full name"
                placeholderTextColor={COLORS.inkMuted}
                autoCapitalize="words"
                autoCorrect={false}
                returnKeyType="next"
                value={name}
                onChangeText={v => { setName(v); setNameErr(''); }}
                onBlur={handleNameBlur}
                onSubmitEditing={() => emailRef.current?.focus()}
              />
              {!!nameErr && <Text style={styles.fieldError}>{nameErr}</Text>}
            </View>

            {/* Email */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Email</Text>
              <TextInput
                ref={emailRef}
                style={[styles.fieldInput, !!emailErr && styles.fieldInputError]}
                placeholder="you@university.edu"
                placeholderTextColor={COLORS.inkMuted}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="next"
                value={email}
                onChangeText={v => { setEmail(v); setEmailErr(''); }}
                onBlur={handleEmailBlur}
                onSubmitEditing={() => passwordRef.current?.focus()}
              />
              {!!emailErr && <Text style={styles.fieldError}>{emailErr}</Text>}
            </View>

            {/* Password */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Password</Text>
              <View style={styles.fieldWrap}>
                <TextInput
                  ref={passwordRef}
                  style={[styles.fieldInput, !!pwErr && styles.fieldInputError, { paddingRight: 44 }]}
                  placeholder="Min. 6 characters"
                  placeholderTextColor={COLORS.inkMuted}
                  secureTextEntry={!showPw}
                  returnKeyType="done"
                  value={password}
                  onChangeText={v => { setPassword(v); setPwErr(''); }}
                  onSubmitEditing={handleSignup}
                />
                <Pressable style={styles.eyeToggle} onPress={() => setShowPw(p => !p)} hitSlop={8}>
                  <Ionicons
                    name={showPw ? 'eye-outline' : 'eye-off-outline'}
                    size={22}
                    color={COLORS.inkMuted}
                  />
                </Pressable>
              </View>
              {!!pwErr && <Text style={styles.fieldError}>{pwErr}</Text>}
            </View>

            {/* Sign Up Button */}
            <TouchableOpacity
              style={[styles.btnPrimary, success && styles.btnSuccess]}
              onPress={handleSignup}
              disabled={loading || success}
              activeOpacity={0.85}
            >
              {loading ? (
                <ActivityIndicator color="white" size="small" />
              ) : success ? (
                <Text style={styles.btnPrimaryText}>✓  Account Created!</Text>
              ) : (
                <Text style={styles.btnPrimaryText}>Sign Up</Text>
              )}
            </TouchableOpacity>

            {/* Divider */}
            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>or register with</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Google Button */}
            <TouchableOpacity style={styles.btnGoogle} activeOpacity={0.85}>
              <Text style={styles.googleLetter}>G</Text>
              <Text style={styles.btnGoogleText}>Sign in with Google</Text>
            </TouchableOpacity>
          </View>

          {/* ── Sign In Row ── */}
          <View style={styles.signinRow}>
            <Text style={styles.signinText}>Already have an account? </Text>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              activeOpacity={0.7}
            >
              <Text style={styles.signinLink}>Sign in →</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.terms}>
            By creating an account you agree to our{' '}
            <Text style={styles.termsLink}>Terms of Service</Text>
            {' '}and{' '}
            <Text style={styles.termsLink}>Privacy Policy</Text>
          </Text>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
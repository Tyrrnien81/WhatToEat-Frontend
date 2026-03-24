import React, { useState } from 'react';
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
import AuthHero from './components/AuthHero';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/COLORS';
import { styles } from './styles/LoginScreen.styles';
import { useAuth } from '../../context/AuthContext';

// ─── Types ────────────────────────────────────────────────────────────────────
type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  Onboarding: undefined;
  Home: undefined;
  ForgotPassword: undefined;
};

type LoginScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Login'>;
};

// ─── Component ────────────────────────────────────────────────────────────────
export default function LoginScreen({ navigation }: LoginScreenProps) {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw]     = useState(false);
  const [emailErr, setEmailErr] = useState('');
  const [pwErr, setPwErr]       = useState('');
  const [loading, setLoading]   = useState(false);
  const [success, setSuccess]   = useState(false);

  const { setIsGuest } = useAuth();

  // ── Validation ──────────────────────────────────────────────────────────────
  const validateEmail = (val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

  const handleEmailBlur = () => {
    if (email && !validateEmail(email)) {
      setEmailErr('Please enter a valid email address');
    } else {
      setEmailErr('');
    }
  };

  // ── Submit ──────────────────────────────────────────────────────────────────
  const handleLogin = async () => {
    let valid = true;

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
      await new Promise(resolve => setTimeout(resolve, 1600));
      setSuccess(true);
      setIsGuest(false);
      setTimeout(() => navigation.replace('Home'), 600);
    } catch (err) {
      setEmailErr('Invalid email or password');
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
            <Text style={styles.formCardTitle}>Welcome back 👋</Text>

            {/* Email */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Email</Text>
              <TextInput
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
              />
              {!!emailErr && <Text style={styles.fieldError}>{emailErr}</Text>}
            </View>

            {/* Password */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Password</Text>
              <View style={styles.fieldWrap}>
                <TextInput
                  style={[styles.fieldInput, !!pwErr && styles.fieldInputError, { paddingRight: 44 }]}
                  placeholder="••••••••"
                  placeholderTextColor={COLORS.inkMuted}
                  secureTextEntry={!showPw}
                  returnKeyType="done"
                  value={password}
                  onChangeText={v => { setPassword(v); setPwErr(''); }}
                  onSubmitEditing={handleLogin}
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

            {/* Forgot */}
            <TouchableOpacity
              style={styles.forgotRow}
              activeOpacity={0.7}
              onPress={() => navigation.navigate('ForgotPassword')}
            >
              <Text style={styles.forgotLink}>Forgot password?</Text>
            </TouchableOpacity>

            {/* Login Button */}
            <TouchableOpacity
              style={[styles.btnPrimary, success && styles.btnSuccess]}
              onPress={handleLogin}
              disabled={loading || success}
              activeOpacity={0.85}
            >
              {loading ? (
                <ActivityIndicator color="white" size="small" />
              ) : success ? (
                <Text style={styles.btnPrimaryText}>✓  Welcome back!</Text>
              ) : (
                <Text style={styles.btnPrimaryText}>Log In</Text>
              )}
            </TouchableOpacity>

            {/* Divider */}
            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>or continue with</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Social Buttons */}
            <View style={styles.socialRow}>
              <TouchableOpacity style={styles.btnSocial} activeOpacity={0.85}>
                <Text style={styles.socialIcon}>G</Text>
                <Text style={styles.btnSocialText}>Google</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnSocial} activeOpacity={0.85}>
                <Text style={styles.socialIcon}>⌥</Text>
                <Text style={styles.btnSocialText}>GitHub</Text>
              </TouchableOpacity>
            </View>

            {/* Guest */}
            <TouchableOpacity
              style={styles.btnGuest}
              onPress={() => {
                setIsGuest(true);
                navigation.replace('Home');
              }}
              activeOpacity={0.7}
            >
              <Text style={styles.btnGuestText}>Continue as guest →</Text>
            </TouchableOpacity>
          </View>

          {/* ── Sign Up Row ── */}
          <View style={styles.signupRow}>
            <Text style={styles.signupText}>New here? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Signup')} activeOpacity={0.7}>
              <Text style={styles.signupLink}>Create an account →</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.terms}>
            By signing in you agree to our{' '}
            <Text style={styles.termsLink}>Terms of Service</Text>
            {' '}and{' '}
            <Text style={styles.termsLink}>Privacy Policy</Text>
          </Text>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
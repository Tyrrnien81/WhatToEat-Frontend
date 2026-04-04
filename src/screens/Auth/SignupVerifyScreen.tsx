import React, { useState, useRef, useEffect } from 'react';
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
import { RouteProp } from '@react-navigation/native';
import { COLORS } from '../../constants/COLORS';
import { styles } from './styles/SignupVerifyScreen.styles';

// ─── Types ────────────────────────────────────────────────────────────────────
type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  SignupVerify: { email: string };
  Welcome: undefined;
  Birthday: undefined;
};

type SignupVerifyScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'SignupVerify'>;
  route: RouteProp<RootStackParamList, 'SignupVerify'>;
};

const CODE_LENGTH = 6;
const RESEND_COOLDOWN = 60;

// ─── Component ────────────────────────────────────────────────────────────────
export default function SignupVerifyScreen({ navigation, route }: SignupVerifyScreenProps) {
  const email = route.params?.email ?? '';

  const [code, setCode]           = useState<string[]>(Array(CODE_LENGTH).fill(''));
  const [status, setStatus]       = useState<'idle' | 'error' | 'success'>('idle');
  const [hintText, setHintText]   = useState('');
  const [loading, setLoading]     = useState(false);
  const [resendCooldown, setResendCooldown] = useState(RESEND_COOLDOWN);
  const [resendLabel, setResendLabel]       = useState('Resend code');

  const inputRefs = useRef<(TextInput | null)[]>([]);
  const allFilled = code.every(c => c.length === 1);

  // ── Resend Cooldown ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const t = setInterval(() => setResendCooldown(s => s - 1), 1000);
    return () => clearInterval(t);
  }, [resendCooldown]);

  // ── OTP Input ────────────────────────────────────────────────────────────────
  const handleCodeChange = (val: string, idx: number) => {
    // Handle paste
    if (val.length > 1) {
      const digits = val.replace(/\D/g, '').slice(0, CODE_LENGTH).split('');
      const updated = Array(CODE_LENGTH).fill('');
      digits.forEach((d, j) => { updated[j] = d; });
      setCode(updated);
      inputRefs.current[Math.min(digits.length, CODE_LENGTH - 1)]?.focus();
      return;
    }
    const digit = val.replace(/\D/g, '');
    const updated = [...code];
    updated[idx] = digit;
    setCode(updated);
    setStatus('idle');
    setHintText('');
    if (digit && idx < CODE_LENGTH - 1) inputRefs.current[idx + 1]?.focus();
  };

  const handleKeyPress = (e: any, idx: number) => {
    if (e.nativeEvent.key === 'Backspace' && !code[idx] && idx > 0) {
      const updated = [...code];
      updated[idx - 1] = '';
      setCode(updated);
      inputRefs.current[idx - 1]?.focus();
    }
  };

  // ── Verify ───────────────────────────────────────────────────────────────────
  const handleVerify = async () => {
    if (!allFilled || loading) return;
    setLoading(true);
    setHintText('');
    try {
      // TODO: replace with real API call
      // await verifySignupCode({ email, code: code.join('') });
      await new Promise(resolve => setTimeout(resolve, 1400));
      setStatus('success');
      setHintText('✓ Email verified successfully!');
      setTimeout(() => navigation.replace('Welcome'), 900);
    } catch {
      setStatus('error');
      setHintText('Invalid code — please try again');
      setTimeout(() => {
        setCode(Array(CODE_LENGTH).fill(''));
        setStatus('idle');
        setHintText('');
        inputRefs.current[0]?.focus();
      }, 1200);
    } finally {
      setLoading(false);
    }
  };

  // ── Resend ───────────────────────────────────────────────────────────────────
  const handleResend = () => {
    if (resendCooldown > 0) return;
    // TODO: replace with real API call
    // await resendSignupCode({ email });
    setResendLabel('Sent!');
    setResendCooldown(RESEND_COOLDOWN);
    setCode(Array(CODE_LENGTH).fill(''));
    setStatus('idle');
    setHintText('');
    inputRefs.current[0]?.focus();
    setTimeout(() => setResendLabel('Resend code'), 2000);
  };

  // ── Render ───────────────────────────────────────────────────────────────────
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

          {/* ── Logo Row ── */}
          <View style={styles.logoRow}>
            <View style={styles.logoIcon}>
              <Text style={styles.logoEmoji}>🍽️</Text>
            </View>
            <Text style={styles.logoTitle}>
              What<Text style={styles.logoAccent}>To</Text>Eat
            </Text>
          </View>

          {/* ── Email Icon Card ── */}
          <View style={styles.iconWrap}>
            <Text style={styles.iconEmoji}>✉️</Text>
          </View>

          {/* ── Heading ── */}
          <Text style={styles.heading}>Verify your email</Text>
          <Text style={styles.subtext}>We sent a 6-digit code to</Text>
          <View style={styles.emailChip}>
            <Text style={styles.emailChipText}>{email || 'your@university.edu'}</Text>
          </View>

          {/* ── OTP Boxes ── */}
          <View style={styles.codeRow}>
            {code.map((digit, idx) => (
              <TextInput
                key={idx}
                ref={el => { inputRefs.current[idx] = el; }}
                style={[
                  styles.codeInput,
                  digit && status === 'idle' && styles.codeInputFilled,
                  status === 'error'   && styles.codeInputError,
                  status === 'success' && styles.codeInputSuccess,
                ]}
                value={digit}
                onChangeText={val => handleCodeChange(val, idx)}
                onKeyPress={e => handleKeyPress(e, idx)}
                keyboardType="number-pad"
                maxLength={6}
                selectTextOnFocus
                autoFocus={idx === 0}
                editable={status !== 'success'}
              />
            ))}
          </View>

          {/* ── Hint ── */}
          {!!hintText && (
            <Text style={[
              styles.hintText,
              status === 'error'   && styles.hintError,
              status === 'success' && styles.hintSuccess,
            ]}>
              {hintText}
            </Text>
          )}

          {/* ── Verify Button ── */}
          <TouchableOpacity
            style={[
              styles.verifyBtn,
              !allFilled && styles.verifyBtnDisabled,
              status === 'success' && styles.verifyBtnSuccess,
            ]}
            onPress={handleVerify}
            disabled={!allFilled || loading || status === 'success'}
            activeOpacity={0.85}
          >
            {loading ? (
              <ActivityIndicator color="white" size="small" />
            ) : status === 'success' ? (
              <Text style={styles.verifyBtnText}>✓  Email Verified!</Text>
            ) : (
              <Text style={styles.verifyBtnText}>Verify Email</Text>
            )}
          </TouchableOpacity>

          {/* ── Divider ── */}
          <View style={styles.divider} />

          {/* ── Resend + Change email ── */}
          <View style={styles.actionRow}>
            <Text style={styles.actionText}>Didn't receive a code? </Text>
            <TouchableOpacity onPress={handleResend} disabled={resendCooldown > 0} activeOpacity={0.7}>
              <Text style={[styles.actionLink, resendCooldown > 0 && styles.actionLinkDisabled]}>
                {resendLabel}{resendCooldown > 0 ? ` (${resendCooldown}s)` : ''}
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.7}>
            <Text style={styles.changeEmailLink}>Wrong email address? Go back →</Text>
          </TouchableOpacity>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
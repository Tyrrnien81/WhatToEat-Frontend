import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import BackButton from './components/BackButton';
import ReturnToLogin from './components/ReturnToLogin';
import AuthHeader from './components/AuthHeader';
import { COLORS } from '../../constants/COLORS';
import { styles } from './styles/VerifyEmailScreen.styles';

// ─── Types ────────────────────────────────────────────────────────────────────
type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  Onboarding: undefined;
  Home: undefined;
  ForgotPassword: undefined;
  ResetPassword: undefined;
  VerifyEmail: undefined;
};

type VerifyEmailScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'VerifyEmail'>;
  route?: { params?: { email?: string } };
};

const CODE_LENGTH = 6;
const TIMER_SECONDS = 12 * 60 + 55;
const RESEND_COOLDOWN = 30;

// ─── Component ────────────────────────────────────────────────────────────────
export default function VerifyEmailScreen({ navigation, route }: VerifyEmailScreenProps) {
  const email = route?.params?.email ?? '*******@wisc.edu';

  const [code, setCode]                     = useState<string[]>(Array(CODE_LENGTH).fill(''));
  const [status, setStatus]                 = useState<'idle' | 'error' | 'success'>('idle');
  const [hintText, setHintText]             = useState('');
  const [loading, setLoading]               = useState(false);
  const [timeLeft, setTimeLeft]             = useState(TIMER_SECONDS);
  const [resendCooldown, setResendCooldown] = useState(RESEND_COOLDOWN);
  const [resendLabel, setResendLabel]       = useState('Resend code?');

  const inputRefs = useRef<(TextInput | null)[]>([]);
  const shakeAnim = useRef(new Animated.Value(0)).current;
  const allFilled = code.every(c => c.length === 1);

  // ── Countdown Timer ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (timeLeft <= 0) return;
    const t = setInterval(() => setTimeLeft(s => s - 1), 1000);
    return () => clearInterval(t);
  }, [timeLeft]);

  // ── Resend Cooldown ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const t = setInterval(() => setResendCooldown(s => s - 1), 1000);
    return () => clearInterval(t);
  }, [resendCooldown]);

  const fmtTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  };

  // ── Shake Animation ──────────────────────────────────────────────────────────
  const shake = () => {
    shakeAnim.setValue(0);
    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: -8, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue:  8, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -6, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue:  6, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue:  0, duration: 60, useNativeDriver: true }),
    ]).start();
  };

  // ── OTP Input ────────────────────────────────────────────────────────────────
  const handleCodeChange = (val: string, idx: number) => {
    const digit = val.replace(/\D/g, '').slice(-1);
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
    try {
      await new Promise(resolve => setTimeout(resolve, 1400));
      const entered = code.join('');
      if (entered === '123456') {
        setStatus('success');
        setHintText('✓ Email verified successfully!');
        setTimeout(() => navigation.navigate('ResetPassword'), 1200);
      } else {
        setStatus('error');
        setHintText('Invalid code — please try again');
        shake();
        setTimeout(() => {
          setCode(Array(CODE_LENGTH).fill(''));
          setStatus('idle');
          setHintText('');
          inputRefs.current[0]?.focus();
        }, 1200);
      }
    } finally {
      setLoading(false);
    }
  };

  // ── Resend ───────────────────────────────────────────────────────────────────
  const handleResend = () => {
    if (resendCooldown > 0) return;
    setResendLabel('Sent!');
    setResendCooldown(RESEND_COOLDOWN);
    setCode(Array(CODE_LENGTH).fill(''));
    setStatus('idle');
    setHintText('');
    setTimeout(() => setResendLabel('Resend code?'), 2000);
  };

  const boxStyle = (idx: number) => [
    styles.otpBox,
    code[idx] && status === 'idle' && styles.otpBoxFilled,
    status === 'error'             && styles.otpBoxError,
    status === 'success'           && styles.otpBoxSuccess,
  ];

  // ── Render ───────────────────────────────────────────────────────────────────
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
          <AuthHeader title="Verify Email Address" />

          {/* ── Email Badge ── */}
          <View style={styles.emailBadge}>
            <View style={styles.emailBadgeIcon}>
              <Text style={styles.emailBadgeEmoji}>✉️</Text>
            </View>
            <View style={styles.emailBadgeText}>
              <Text style={styles.emailBadgeLabel}>Verification sent to</Text>
              <Text style={styles.emailBadgeValue}>{email}</Text>
            </View>
          </View>

          {/* ── Code Card ── */}
          <View style={styles.codeCard}>
            <Text style={styles.codeCardLabel}>Enter verification code</Text>
            <Text style={styles.codeCardHint}>
              Please check your inbox and enter the 6-digit code. Expires in{' '}
              <Text style={styles.codeCardHintBold}>{fmtTime(timeLeft)}</Text>.
            </Text>

            {/* OTP Boxes */}
            <Animated.View style={[styles.otpRow, { transform: [{ translateX: shakeAnim }] }]}>
              {code.map((digit, idx) => (
                <TextInput
                  key={idx}
                  ref={el => { inputRefs.current[idx] = el; }}
                  style={boxStyle(idx)}
                  value={digit}
                  onChangeText={val => handleCodeChange(val, idx)}
                  onKeyPress={e => handleKeyPress(e, idx)}
                  keyboardType="numeric"
                  maxLength={1}
                  selectTextOnFocus
                  editable={status !== 'success'}
                />
              ))}
            </Animated.View>

            {/* Timer Badge */}
            <View style={styles.timerRow}>
              <Text style={styles.timerLabel}>Code expires in</Text>
              <View style={[styles.timerBadge, timeLeft <= 60 && styles.timerBadgeUrgent]}>
                <Text style={[styles.timerText, timeLeft <= 60 && styles.timerTextUrgent]}>
                  {fmtTime(timeLeft)}
                </Text>
              </View>
            </View>

            {/* Hint */}
            {!!hintText && (
              <Text style={[
                styles.codeHint,
                status === 'error'   && styles.codeHintError,
                status === 'success' && styles.codeHintSuccess,
              ]}>
                {hintText}
              </Text>
            )}
          </View>

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
              <Text style={styles.verifyBtnText}>✓  Verified!</Text>
            ) : (
              <Text style={styles.verifyBtnText}>Verify</Text>
            )}
          </TouchableOpacity>

          {/* ── Action Row ── */}
          <View style={styles.actionRow}>
            <TouchableOpacity onPress={handleResend} disabled={resendCooldown > 0} activeOpacity={0.7}>
              <Text style={[styles.actionLink, resendCooldown > 0 && styles.actionLinkDisabled]}>
                {resendLabel}{resendCooldown > 0 ? ` (${resendCooldown}s)` : ''}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.7}>
              <Text style={styles.actionLinkMuted}>Change email</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>

      {/* ── Return to Login ── */}
      <ReturnToLogin onPress={() => navigation.navigate('Login')} />

    </SafeAreaView>
  );
}
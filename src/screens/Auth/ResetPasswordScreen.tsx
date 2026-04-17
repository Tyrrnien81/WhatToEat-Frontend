import React, { useEffect, useState } from 'react';
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
import { Ionicons } from '@expo/vector-icons';
import BackButton from './components/BackButton';
import ReturnToLogin from './components/ReturnToLogin';
import AuthHeader from './components/AuthHeader';
import { COLORS } from '../../constants/COLORS';
import { styles } from './styles/ResetPasswordScreen.styles';
import { getSupabase, supabaseSetupMessage } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';

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

type ResetPasswordScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'ResetPassword'>;
};

// ─── Requirement Check Row ────────────────────────────────────────────────────
function ReqItem({ met, label }: { met: boolean; label: string }) {
  return (
    <View style={styles.reqItem}>
      <View style={[styles.reqCheck, met && styles.reqCheckMet]}>
        {met && <Text style={styles.reqCheckTick}>✓</Text>}
      </View>
      <Text style={[styles.reqText, met && styles.reqTextMet]}>{label}</Text>
    </View>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function ResetPasswordScreen({ navigation }: ResetPasswordScreenProps) {
  const [newPw, setNewPw]       = useState('');
  const [confPw, setConfPw]     = useState('');
  const [showNew, setShowNew]   = useState(false);
  const [showConf, setShowConf] = useState(false);
  const [confHint, setConfHint] = useState<'idle' | 'match' | 'mismatch'>('idle');
  const [newError, setNewError] = useState(false);
  const [loading, setLoading]   = useState(false);
  const [success, setSuccess]   = useState(false);
  const [hasSession, setHasSession] = useState<boolean | null>(null);
  const [resetErr, setResetErr] = useState('');
  const { supabaseReady } = useAuth();

  useEffect(() => {
    const sb = getSupabase();
    if (!sb) {
      setHasSession(false);
      return;
    }
    sb.auth
      .getSession()
      .then(({ data: { session } }) => setHasSession(!!session))
      .catch(() => setHasSession(false));
  }, []);

  // ── Requirements ────────────────────────────────────────────────────────────
  const req = {
    len:     newPw.length >= 8,
    case:    /[a-z]/.test(newPw) && /[A-Z]/.test(newPw),
    num:     /[0-9]/.test(newPw),
    special: /[!@#$%^&*?[\]{}|]/.test(newPw),
  };
  const allReqMet = Object.values(req).every(Boolean);

  // ── Handlers ────────────────────────────────────────────────────────────────
  const handleNewPwChange = (val: string) => {
    setNewPw(val);
    setNewError(false);
    if (confPw) setConfHint(val === confPw ? 'match' : 'mismatch');
  };

  const handleConfPwChange = (val: string) => {
    setConfPw(val);
    if (!val) { setConfHint('idle'); return; }
    setConfHint(newPw === val ? 'match' : 'mismatch');
  };

  const handleReset = async () => {
    if (!newPw || !allReqMet) { setNewError(true); return; }
    if (newPw !== confPw) { setConfHint('mismatch'); return; }

    const sb = getSupabase();
    if (!sb || !supabaseReady) {
      setResetErr(supabaseSetupMessage());
      return;
    }
    if (!hasSession) {
      setResetErr('Open the reset link from your email on this device first, then return here.');
      return;
    }

    setResetErr('');
    setLoading(true);
    try {
      const { error } = await sb.auth.updateUser({ password: newPw });
      if (error) {
        setResetErr(error.message || 'Could not update password');
        return;
      }
      setSuccess(true);
      setTimeout(() => navigation.navigate('Login'), 1200);
    } catch {
      setResetErr('Something went wrong. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const confHintText =
    confHint === 'match'    ? '✓ Passwords match' :
    confHint === 'mismatch' ? 'Passwords do not match' :
    'Re-enter your new password';

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
            title="Reset Password"
            subtitle={
              hasSession === false
                ? 'Open the link in your reset email first. If you already set a new password in the browser, sign in from Log in.'
                : 'Choose a strong new password for your account.'
            }
          />

          {hasSession === null && (
            <View style={{ alignItems: 'center', marginBottom: 16 }}>
              <ActivityIndicator color={COLORS.red} />
            </View>
          )}

          {!!resetErr && (
            <Text style={{ color: COLORS.red, fontWeight: '700', marginBottom: 12, textAlign: 'center' }}>
              {resetErr}
            </Text>
          )}

          {hasSession === false && (
            <Text
              style={{
                fontSize: 14,
                fontWeight: '600',
                color: COLORS.inkMuted,
                textAlign: 'center',
                marginBottom: 20,
                lineHeight: 20,
              }}
            >
              This screen updates the password only after Supabase establishes a session from your
              reset link (same device). Many flows complete in the browser instead — that is fine;
              use Log in with your new password afterward.
            </Text>
          )}

          {/* ── New Password Section ── */}
          {hasSession !== false && (
          <>
          <View style={styles.fieldSection}>
            <Text style={styles.sectionLabel}>New Password</Text>
            <View style={styles.fieldCard}>
              <View style={styles.inputWrap}>
                <TextInput
                  style={[
                    styles.fieldInput,
                    newError && styles.fieldInputError,
                    allReqMet && newPw.length > 0 && styles.fieldInputValid,
                  ]}
                  placeholder="••••••••••••••"
                  placeholderTextColor={COLORS.inkMuted}
                  secureTextEntry={!showNew}
                  value={newPw}
                  onChangeText={handleNewPwChange}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                <Pressable style={styles.eyeBtn} onPress={() => setShowNew(p => !p)} hitSlop={8}>
                  <Ionicons
                    name={showNew ? 'eye-outline' : 'eye-off-outline'}
                    size={22}
                    color={COLORS.inkMuted}
                  />
                </Pressable>
              </View>
              <View style={styles.reqCard}>
                <Text style={styles.reqCardTitle}>Requirements</Text>
                <ReqItem met={req.len}     label="At least 8 characters" />
                <ReqItem met={req.case}    label="Upper & lower case letters" />
                <ReqItem met={req.num}     label="At least one number" />
                <ReqItem met={req.special} label="One special character (! @ # ? ])" />
              </View>
            </View>
          </View>

          {/* ── Confirm Password Section ── */}
          <View style={styles.fieldSection}>
            <Text style={styles.sectionLabel}>Confirm Password</Text>
            <View style={styles.fieldCard}>
              <View style={styles.inputWrap}>
                <TextInput
                  style={[
                    styles.fieldInput,
                    confHint === 'mismatch' && styles.fieldInputError,
                    confHint === 'match'    && styles.fieldInputValid,
                  ]}
                  placeholder="••••••••••••••"
                  placeholderTextColor={COLORS.inkMuted}
                  secureTextEntry={!showConf}
                  value={confPw}
                  onChangeText={handleConfPwChange}
                  autoCapitalize="none"
                  autoCorrect={false}
                  onSubmitEditing={handleReset}
                />
                <Pressable style={styles.eyeBtn} onPress={() => setShowConf(p => !p)} hitSlop={8}>
                  <Ionicons
                    name={showConf ? 'eye-outline' : 'eye-off-outline'}
                    size={22}
                    color={COLORS.inkMuted}
                  />
                </Pressable>
              </View>
              <Text style={[
                styles.hintText,
                confHint === 'mismatch' && styles.hintError,
                confHint === 'match'    && styles.hintSuccess,
              ]}>
                {confHintText}
              </Text>
            </View>
          </View>
          </>
          )}

          {/* ── Reset Button ── */}
          {hasSession !== false && (
          <TouchableOpacity
            style={[styles.resetBtn, success && styles.resetBtnSuccess]}
            onPress={handleReset}
            disabled={loading || success || hasSession === null}
            activeOpacity={0.85}
          >
            {loading ? (
              <ActivityIndicator color="white" size="small" />
            ) : success ? (
              <Text style={styles.resetBtnText}>✓  Password reset!</Text>
            ) : (
              <Text style={styles.resetBtnText}>Reset password</Text>
            )}
          </TouchableOpacity>
          )}

        </ScrollView>
      </KeyboardAvoidingView>

      {/* ── Return to Login ── */}
      <ReturnToLogin onPress={() => navigation.navigate('Login')} />

    </SafeAreaView>
  );
}
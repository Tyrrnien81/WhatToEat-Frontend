import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
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
import { getSupabase, supabaseSetupMessage } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';

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

const RESEND_COOLDOWN = 60;

export default function SignupVerifyScreen({ navigation, route }: SignupVerifyScreenProps) {
  const email = route.params?.email ?? '';
  const { supabaseReady } = useAuth();

  const [resendCooldown, setResendCooldown] = useState(0);
  const [resendBusy, setResendBusy] = useState(false);
  const [resendHint, setResendHint] = useState('');
  const [resendErr, setResendErr] = useState('');

  useEffect(() => {
    if (resendCooldown <= 0) return;
    const t = setInterval(() => setResendCooldown((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [resendCooldown]);

  const handleResend = async () => {
    if (resendCooldown > 0 || resendBusy || !email) return;
    const sb = getSupabase();
    if (!sb || !supabaseReady) {
      setResendErr(supabaseSetupMessage());
      return;
    }
    setResendErr('');
    setResendBusy(true);
    try {
      const { error } = await sb.auth.resend({ type: 'signup', email: email.trim() });
      if (error) {
        setResendErr(error.message || 'Could not resend');
        return;
      }
      setResendHint('Confirmation email sent again.');
      setResendCooldown(RESEND_COOLDOWN);
    } finally {
      setResendBusy(false);
    }
  };

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
          <View style={styles.logoRow}>
            <View style={styles.logoIcon}>
              <Text style={styles.logoEmoji}>🍽️</Text>
            </View>
            <Text style={styles.logoTitle}>
              What<Text style={styles.logoAccent}>To</Text>Eat
            </Text>
          </View>

          <View style={styles.iconWrap}>
            <Text style={styles.iconEmoji}>✉️</Text>
          </View>

          <Text style={styles.heading}>Confirm your email</Text>
          <Text style={styles.subtext}>
            We sent a confirmation link to
          </Text>
          <View style={styles.emailChip}>
            <Text style={styles.emailChipText}>{email || 'your@university.edu'}</Text>
          </View>

          <Text
            style={[
              styles.subtext,
              { marginBottom: 24, paddingHorizontal: 8, lineHeight: 20 },
            ]}
          >
            Open the email and tap the link to verify. When you are done, sign in on this device with
            the same email and password.
          </Text>

          {!!resendHint && !resendErr && (
            <Text style={[styles.hintText, styles.hintSuccess]}>{resendHint}</Text>
          )}
          {!!resendErr && (
            <Text style={[styles.hintText, styles.hintError]}>{resendErr}</Text>
          )}

          <TouchableOpacity
            style={styles.verifyBtn}
            onPress={() => navigation.replace('Login')}
            activeOpacity={0.85}
          >
            <Text style={styles.verifyBtnText}>Back to sign in</Text>
          </TouchableOpacity>

          <View style={styles.divider} />

          <View style={styles.actionRow}>
            <Text style={styles.actionText}>Didn't get the email? </Text>
            <TouchableOpacity
              onPress={handleResend}
              disabled={resendCooldown > 0 || resendBusy}
              activeOpacity={0.7}
            >
              {resendBusy ? (
                <ActivityIndicator color={COLORS.red} size="small" />
              ) : (
                <Text
                  style={[
                    styles.actionLink,
                    resendCooldown > 0 && styles.actionLinkDisabled,
                  ]}
                >
                  Resend
                  {resendCooldown > 0 ? ` (${resendCooldown}s)` : ''}
                </Text>
              )}
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.7}>
            <Text style={styles.changeEmailLink}>Wrong email? Go back →</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

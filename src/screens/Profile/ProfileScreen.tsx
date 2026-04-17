import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Switch,
  ActivityIndicator,
} from 'react-native';
import Svg, { Path, Circle, Rect } from 'react-native-svg';
import { useNavigation, useFocusEffect, CommonActions } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../App';
import { fetchFoodLogSummary, fetchProfileMe, type ProfileMeResponse } from '../../services/profileService';
import {
  fetchPreferences,
  type PreferencesResponse,
} from '../../services/questionnaireService';
import { useAuth } from '../../context/AuthContext';

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
const IconEdit = () => (
  <Svg width={14} height={14} viewBox="0 0 24 24" fill="none">
    <Path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" stroke={COLORS.ink} strokeWidth={2.5} strokeLinecap="round" />
    <Path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke={COLORS.ink} strokeWidth={2.5} strokeLinecap="round" />
  </Svg>
);

const IconChevron = () => (
  <Svg width={10} height={10} viewBox="0 0 10 10">
    <Path d="M3.5 2l3 3-3 3" stroke={COLORS.inkMuted} strokeWidth={1.8} strokeLinecap="round" fill="none" />
  </Svg>
);

const HALL_NAMES: Record<string, string> = {
  gordon: 'Gordon Avenue Market',
  fourlakes: 'Four Lakes Market',
  liz: "Liz's Market",
  rheta: "Rheta's Market",
  carson: "Carson's Market",
  lowell: 'Lowell Market',
};

const ALLERGEN_LABELS: Record<string, string> = {
  soy: 'Soy',
  peanuts: 'Peanuts',
  treenuts: 'Tree nuts',
  halal: 'Halal',
  kosher: 'Kosher',
  dairy: 'Dairy',
  gluten: 'Gluten',
  shellfish: 'Shellfish',
  fish: 'Fish',
  egg: 'Egg',
  other: 'Other',
};

function dietLabel(dt: string | null | undefined): string {
  if (!dt) return '—';
  const m: Record<string, string> = {
    balanced: 'Balanced',
    high_protein: 'High Protein',
    highprotein: 'High Protein',
    vegan: 'Vegan',
    vegetarian: 'Vegetarian',
  };
  return m[dt] ?? dt;
}

function formatBirthday(iso: string | null | undefined): string {
  if (!iso) return '—';
  const d = new Date(iso + 'T12:00:00');
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
}

const IconLogout = () => (
  <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
    <Path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" stroke={COLORS.red} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

// ─── Stat Card ────────────────────────────────────────────────────────────────
const StatCard = ({ value, label, bg, accent }: { value: string; label: string; bg: string; accent: string }) => (
  <View style={[styles.statCard, { backgroundColor: bg, borderColor: COLORS.border }]}>
    <Text style={[styles.statValue, { color: accent }]}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

// ─── Section Row ──────────────────────────────────────────────────────────────
const SectionRow = ({
  label,
  value,
}: {
  label: string;
  value?: string;
}) => (
  <View style={styles.sectionRow}>
    <Text style={styles.sectionRowLabel}>{label}</Text>
    {value ? <Text style={styles.sectionRowValue}>{value}</Text> : null}
  </View>
);

// ─── Toggle Row ───────────────────────────────────────────────────────────────
const ToggleRow = ({ label, value, onToggle }: { label: string; value: boolean; onToggle: () => void }) => (
  <View style={styles.sectionRow}>
    <Text style={styles.sectionRowLabel}>{label}</Text>
    <Switch
      value={value}
      onValueChange={onToggle}
      trackColor={{ false: '#F0E0E0', true: COLORS.red }}
      thumbColor="white"
      ios_backgroundColor="#F0E0E0"
    />
  </View>
);

// ─── Section Block ────────────────────────────────────────────────────────────
const SectionBlock = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <View style={styles.sectionBlock}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <View style={styles.sectionCard}>{children}</View>
  </View>
);

// ─── Tag Pill ─────────────────────────────────────────────────────────────────
const TagPill = ({ label, color }: { label: string; color: string }) => (
  <View style={[styles.tagPill, { backgroundColor: color, borderColor: COLORS.border }]}>
    <Text style={styles.tagPillText}>{label}</Text>
  </View>
);

// ─── Main Screen ──────────────────────────────────────────────────────────────
export default function ProfileScreen() {
  const [notifications, setNotifications] = useState(true);
  const [weeklyReport, setWeeklyReport] = useState(false);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { signOut } = useAuth();
  const [loading, setLoading] = useState(true);
  const [me, setMe] = useState<ProfileMeResponse | null>(null);
  const [prefs, setPrefs] = useState<PreferencesResponse | null>(null);
  const [streak, setStreak] = useState<number>(0);

  useFocusEffect(
    useCallback(() => {
      let cancelled = false;
      (async () => {
        setLoading(true);
        try {
          const profile = await fetchProfileMe();
          if (!cancelled) setMe(profile);
        } catch {
          // Profile row may not exist yet (new user). Show empty-state UI silently.
          if (!cancelled) setMe(null);
        }
        try {
          const p = await fetchPreferences();
          if (!cancelled) setPrefs(p);
        } catch {
          if (!cancelled) setPrefs(null);
        }
        try {
          const sum = await fetchFoodLogSummary('week');
          if (!cancelled) setStreak(sum.currentStreak ?? 0);
        } catch {
          if (!cancelled) setStreak(0);
        }
        if (!cancelled) setLoading(false);
      })();
      return () => {
        cancelled = true;
      };
    }, []),
  );

  // Did the user finish the questionnaire? If no prefs row at all, treat as incomplete.
  const needsQuestionnaire = !prefs;

  const handleLogout = useCallback(async () => {
    try {
      await signOut();
    } finally {
      navigation.dispatch(
        CommonActions.reset({ index: 0, routes: [{ name: 'Login' }] }),
      );
    }
  }, [navigation, signOut]);

  const handleStartQuestionnaire = useCallback(() => {
    navigation.dispatch(
      CommonActions.navigate({ name: 'Welcome' }),
    );
  }, [navigation]);

  const displayName = me?.name ?? '—';
  const handle = me?.email ? `@${me.email.split('@')[0]}` : '@—';
  const kcalGoal = prefs?.target_calories ?? '—';
  const proteinGoal = prefs?.target_protein_g != null ? `${Math.round(prefs.target_protein_g)}g` : '—';
  const weightStr =
    prefs?.weight != null
      ? `${prefs.weight.toFixed(1)} kg`
      : me?.weight != null
        ? `${me.weight.toFixed(1)} kg`
        : '—';
  const goalStr =
    prefs?.goal_weight != null
      ? `${prefs.goal_weight.toFixed(1)} kg`
      : me?.goalWeight != null
        ? `${me.goalWeight.toFixed(1)} kg`
        : '—';
  const dt = prefs?.diet_type ?? me?.dietType;
  const dietPills: { label: string; color: string }[] = dt
    ? [{ label: dietLabel(dt), color: '#FFE0EE' }]
    : [];
  const allergenIds = prefs?.allergens?.filter((a) => a && a !== 'none') ?? [];
  const allergenPills = allergenIds.map((id) => ({
    label: ALLERGEN_LABELS[id] ?? id,
    color: COLORS.redLight,
  }));

  const homeHallId = prefs?.favorite_dining_halls?.[0];
  const homeHallName = homeHallId ? HALL_NAMES[homeHallId] ?? homeHallId : '—';
  const heightStr =
    prefs?.height != null
      ? `${Math.round(prefs.height)} cm`
      : me?.height != null
        ? `${Math.round(me.height)} cm`
        : '—';
  const genderStr =
    prefs?.gender != null
      ? prefs.gender.charAt(0).toUpperCase() + prefs.gender.slice(1)
      : me?.gender != null
        ? me.gender.charAt(0).toUpperCase() + me.gender.slice(1)
        : '—';

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.beige} />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Header ── */}
        <View style={styles.header}>
          <Text style={styles.screenTitle}>Profile</Text>
          <TouchableOpacity style={styles.editBtn} activeOpacity={0.8} onPress={() => navigation.navigate('EditProfile')}>
            <IconEdit />
            <Text style={styles.editBtnText}>Edit</Text>
          </TouchableOpacity>
        </View>

        {loading ? (
          <View style={{ paddingVertical: 24, alignItems: 'center' }}>
            <ActivityIndicator size="large" color={COLORS.red} />
          </View>
        ) : null}

        {/* ── Avatar + Name ── */}
        <View style={styles.avatarSection}>
          <View style={styles.avatarWrap}>
            <View style={styles.avatar}>
              <Text style={styles.avatarEmoji}>🧑‍🍳</Text>
            </View>
            <View style={styles.avatarBadge}>
              <Text style={styles.avatarBadgeText}>🔥</Text>
            </View>
          </View>
          <Text style={styles.userName}>{displayName}</Text>
          <Text style={styles.userHandle}>{handle} · UW–Madison</Text>
          <View style={styles.streakPill}>
            <Text style={styles.streakText}>{streak}-day streak 🔥</Text>
          </View>
        </View>

        {/* ── Stats Row ── */}
        <View style={styles.statsRow}>
          <StatCard
            value={typeof kcalGoal === 'number' ? String(Math.round(kcalGoal)) : String(kcalGoal)}
            label="kcal goal"
            bg="#FFE8EA"
            accent={COLORS.red}
          />
          <StatCard value={proteinGoal} label="protein" bg="#FFE0EE" accent="#FF6B9D" />
          <StatCard value={weightStr} label="current" bg="#D8F5F3" accent="#2EC4B6" />
          <StatCard value={goalStr} label="goal" bg="#FFF2DC" accent="#FF9F1C" />
        </View>

        {/* ── Questionnaire CTA (shown when prefs missing, or always as a shortcut) ── */}
        <TouchableOpacity
          style={[styles.questionnaireBtn, needsQuestionnaire && styles.questionnaireBtnHighlight]}
          activeOpacity={0.85}
          onPress={handleStartQuestionnaire}
        >
          <Text style={styles.questionnaireBtnEmoji}>📝</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.questionnaireBtnText}>
              {needsQuestionnaire ? 'Complete your setup' : 'Retake questionnaire'}
            </Text>
            <Text style={styles.questionnaireBtnSub}>
              {needsQuestionnaire
                ? 'Fill in preferences to personalize recommendations'
                : 'Update your diet, allergens, goals, and more'}
            </Text>
          </View>
          <View style={styles.chevronWrap}>
            <IconChevron />
          </View>
        </TouchableOpacity>

        {/* ── Diet & Allergens ── */}
        <SectionBlock title="Diet & Restrictions">
          <View style={styles.tagsRow}>
            {dietPills.length === 0 ? (
              <Text style={{ fontSize: 13, color: COLORS.inkMuted, paddingVertical: 8 }}>No diet type on file</Text>
            ) : (
              dietPills.map((p) => <TagPill key={p.label} label={p.label} color={p.color} />)
            )}
          </View>
          <View style={[styles.divider, { marginVertical: 10 }]} />
          <Text style={styles.allergenLabel}>Allergens</Text>
          <View style={styles.tagsRow}>
            {allergenPills.length === 0 ? (
              <Text style={{ fontSize: 12, color: COLORS.inkMuted }}>None listed</Text>
            ) : (
              allergenPills.map((p) => <TagPill key={p.label} label={p.label} color={p.color} />)
            )}
          </View>
        </SectionBlock>

        {/* ── Body Info ── */}
        <SectionBlock title="Body Info">
          <SectionRow label="Height" value={heightStr} />
          <View style={styles.divider} />
          <SectionRow label="Weight" value={weightStr} />
          <View style={styles.divider} />
          <SectionRow label="Goal Weight" value={goalStr} />
          <View style={styles.divider} />
          <SectionRow label="Birthday" value={formatBirthday(prefs?.birthday ?? me?.birthday)} />
          <View style={styles.divider} />
          <SectionRow label="Gender" value={genderStr} />
        </SectionBlock>

        {/* ── Dining Preferences ── */}
        <SectionBlock title="Dining Preferences">
          <SectionRow label="Home Dining Hall" value={homeHallName} />
          <View style={styles.divider} />
          <SectionRow
            label="Dislikes"
            value={prefs?.dislikes?.length ? `${prefs.dislikes.length} items` : '—'}
          />
        </SectionBlock>

        {/* ── Notifications ── */}
        <SectionBlock title="Notifications">
          <ToggleRow label="Meal reminders" value={notifications} onToggle={() => setNotifications(!notifications)} />
          <View style={styles.divider} />
          <ToggleRow label="Weekly report" value={weeklyReport} onToggle={() => setWeeklyReport(!weeklyReport)} />
        </SectionBlock>

        {/* ── Account ── */}
        <SectionBlock title="Account">
          <SectionRow label="Change Password" />
          <View style={styles.divider} />
          <SectionRow label="Privacy Policy" />
          <View style={styles.divider} />
          <SectionRow label="Terms of Service" />
        </SectionBlock>

        {/* ── Logout ── */}
        <TouchableOpacity style={styles.logoutBtn} activeOpacity={0.85} onPress={handleLogout}>
          <IconLogout />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

        <Text style={styles.version}>WhatToEat v1.0.0</Text>
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
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 4,
  },
  screenTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: COLORS.ink,
    letterSpacing: -0.5,
  },
  editBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: COLORS.bg2,
    borderWidth: 2,
    borderColor: COLORS.border,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    shadowColor: COLORS.border,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 2,
  },
  editBtnText: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.ink,
  },

  // Avatar
  avatarSection: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  avatarWrap: {
    position: 'relative',
    marginBottom: 12,
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
  avatarEmoji: {
    fontSize: 44,
  },
  avatarBadge: {
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
  avatarBadgeText: {
    fontSize: 14,
  },
  userName: {
    fontSize: 22,
    fontWeight: '900',
    color: COLORS.ink,
    letterSpacing: -0.4,
  },
  userHandle: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.inkMuted,
    marginTop: 2,
  },
  streakPill: {
    marginTop: 8,
    backgroundColor: COLORS.red,
    borderWidth: 2,
    borderColor: COLORS.border,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 5,
    shadowColor: COLORS.border,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 2,
  },
  streakText: {
    fontSize: 12,
    fontWeight: '800',
    color: 'white',
  },

  // Stats
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 8,
    marginBottom: 4,
  },
  statCard: {
    flex: 1,
    borderWidth: 2,
    borderRadius: 14,
    paddingVertical: 10,
    alignItems: 'center',
    shadowColor: COLORS.border,
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 3,
  },
  statValue: {
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: -0.3,
  },
  statLabel: {
    fontSize: 8,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
    color: COLORS.inkMuted,
    marginTop: 2,
  },

  // Section block
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

  // Section row
  sectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 13,
  },
  sectionRowLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.ink,
  },
  sectionRowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  sectionRowValue: {
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

  // Tags
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    paddingVertical: 10,
  },
  tagPill: {
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  tagPillText: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.ink,
  },
  allergenLabel: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
    color: COLORS.inkMuted,
    marginBottom: 2,
  },

  // Divider
  divider: {
    height: 1.5,
    backgroundColor: '#F0E0E0',
  },

  // Questionnaire CTA
  questionnaireBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginHorizontal: 20,
    marginTop: 16,
    paddingVertical: 14,
    paddingHorizontal: 14,
    backgroundColor: COLORS.bg2,
    borderWidth: 2.5,
    borderColor: COLORS.border,
    borderRadius: 18,
    shadowColor: COLORS.border,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
  },
  questionnaireBtnHighlight: {
    backgroundColor: '#FFE8EA',
  },
  questionnaireBtnEmoji: {
    fontSize: 22,
  },
  questionnaireBtnText: {
    fontSize: 14,
    fontWeight: '900',
    color: COLORS.ink,
    letterSpacing: -0.3,
  },
  questionnaireBtnSub: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.inkMuted,
    marginTop: 2,
  },

  // Logout
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginHorizontal: 20,
    marginTop: 20,
    paddingVertical: 14,
    backgroundColor: COLORS.redLight,
    borderWidth: 2.5,
    borderColor: COLORS.border,
    borderRadius: 16,
    shadowColor: COLORS.border,
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 3,
  },
  logoutText: {
    fontSize: 15,
    fontWeight: '900',
    color: COLORS.red,
  },

  // Version
  version: {
    textAlign: 'center',
    marginTop: 16,
    fontSize: 10,
    fontWeight: '600',
    color: COLORS.inkMuted,
  },
});
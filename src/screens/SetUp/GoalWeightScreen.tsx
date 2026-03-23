import React, { useState, useRef, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import ProgressBar from './components/ProgressBar';
import ContinueButton from './components/ContinueButton';
import BackButton from './components/BackButton';
import { COLORS } from '../../constants/COLORS';
import { styles, TICK_W } from './styles/GoalWeightScreen.styles';

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
  Weight: undefined;
  GoalWeight: undefined;
  Diet: undefined;
};

type GoalWeightScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'GoalWeight'>;
};

const KG_MIN = 30.0;
const KG_MAX = 200.0;
const KG_STEP = 0.1;
const KG_COUNT = Math.round((KG_MAX - KG_MIN) / KG_STEP) + 1;
const LB_MIN = 66;
const LB_MAX = 440;
const LB_COUNT = LB_MAX - LB_MIN + 1;

function getTickCount(unit: 'kg' | 'lb') { return unit === 'kg' ? KG_COUNT : LB_COUNT; }
function getValueFromIndex(unit: 'kg' | 'lb', idx: number): number {
  return unit === 'kg' ? Math.round((KG_MIN + idx * KG_STEP) * 10) / 10 : LB_MIN + idx;
}
function getIndexFromValue(unit: 'kg' | 'lb', val: number): number {
  return unit === 'kg' ? Math.round((val - KG_MIN) / KG_STEP) : Math.round(val - LB_MIN);
}
function isLabelTick(unit: 'kg' | 'lb', idx: number): boolean {
  return unit === 'kg' ? idx % 20 === 0 : (LB_MIN + idx) % 10 === 0;
}
function isMajorTick(unit: 'kg' | 'lb', idx: number): boolean {
  return unit === 'kg' ? idx % 5 === 0 : (LB_MIN + idx) % 5 === 0;
}
function getLabelText(unit: 'kg' | 'lb', idx: number): string {
  return unit === 'kg' ? `${Math.round(KG_MIN + idx * KG_STEP)}` : `${LB_MIN + idx}`;
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function GoalWeightScreen({ navigation }: GoalWeightScreenProps) {
  const [unit, setUnitState] = useState<'kg' | 'lb'>('kg');
  const [kgValue, setKgValue] = useState(77.0);
  const [lbValue, setLbValue] = useState(170);
  const scrollRef = useRef<ScrollView>(null);
  const [rulerWidth, setRulerWidth] = useState(0);

  const currentValue = unit === 'kg' ? kgValue : lbValue;
  const displayText = unit === 'kg' ? kgValue.toFixed(1) : lbValue.toFixed(0);

  const handleScrollEnd = useCallback((e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const x = e.nativeEvent.contentOffset.x;
    const idx = Math.round(x / TICK_W);
    const clamped = Math.max(0, Math.min(idx, getTickCount(unit) - 1));
    const val = getValueFromIndex(unit, clamped);
    if (unit === 'kg') setKgValue(val);
    else setLbValue(val);
  }, [unit]);

  const handleUnitChange = (u: 'kg' | 'lb') => {
    setUnitState(u);
    const val = u === 'kg' ? kgValue : lbValue;
    setTimeout(() => {
      scrollRef.current?.scrollTo({ x: getIndexFromValue(u, val) * TICK_W, animated: false });
    }, 50);
  };

  const PAD = rulerWidth / 2;
  const tickCount = getTickCount(unit);

  return (
    <SafeAreaView style={styles.safeArea}>

      {/* ── Back Button ── */}
      <BackButton onPress={() => navigation.goBack()} />

      {/* ── Progress Bar ── */}
      <ProgressBar progress="50%" step="Step 5 of 10" />

      {/* ── Header ── */}
      <View style={styles.header}>
        <Text style={styles.title}>What is your desired goal weight?</Text>
        <Text style={styles.subtitle}>Setting a goal weight helps us track your progress</Text>
      </View>

      {/* ── Unit Toggle ── */}
      <View style={styles.unitToggleWrap}>
        <View style={styles.unitToggle}>
          {(['kg', 'lb'] as const).map(u => (
            <TouchableOpacity
              key={u}
              style={[styles.unitBtn, unit === u && styles.unitBtnActive]}
              onPress={() => handleUnitChange(u)}
              activeOpacity={0.8}
            >
              <Text style={[styles.unitBtnText, unit === u && styles.unitBtnTextActive]}>{u}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* ── Value Card ── */}
      <View style={styles.valueCard}>
        <View style={styles.valueDisplay}>
          <Text style={styles.valueNumber}>{displayText}</Text>
          <Text style={styles.valueUnit}>{unit}</Text>
        </View>

        <View style={styles.rulerWrap} onLayout={e => setRulerWidth(e.nativeEvent.layout.width)}>
          <View style={styles.rulerIndicator} pointerEvents="none" />
          <ScrollView
            ref={scrollRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={TICK_W}
            decelerationRate="fast"
            onMomentumScrollEnd={handleScrollEnd}
            onScrollEndDrag={handleScrollEnd}
            scrollEventThrottle={16}
            contentContainerStyle={{ paddingHorizontal: PAD }}
            onLayout={() => {
              const idx = getIndexFromValue(unit, currentValue);
              setTimeout(() => { scrollRef.current?.scrollTo({ x: idx * TICK_W, animated: false }); }, 80);
            }}
          >
            {Array.from({ length: tickCount }, (_, i) => {
              const isLabel = isLabelTick(unit, i);
              const isMajor = isMajorTick(unit, i);
              return (
                <View key={i} style={styles.tickWrap}>
                  <View style={[
                    styles.tick,
                    isLabel && styles.tickLabel,
                    isMajor && !isLabel && styles.tickMajor,
                    { height: isLabel ? 24 : isMajor ? 16 : 10 },
                  ]} />
                  {isLabel && <Text style={styles.tickText}>{getLabelText(unit, i)}</Text>}
                </View>
              );
            })}
          </ScrollView>
        </View>
      </View>

      {/* ── Hint Card ── */}
      <View style={styles.hintCard}>
        <View style={styles.hintIcon}>
          <Text style={styles.hintIconEmoji}>🎯</Text>
        </View>
        <Text style={styles.hintText}>
          Set a <Text style={styles.hintTextBold}>realistic goal</Text> — a healthy rate is losing or gaining 0.5–1 kg per week.
        </Text>
      </View>

      <View style={{ flex: 1 }} />

      {/* ── Continue Button ── */}
      <ContinueButton onPress={() => navigation.navigate('Diet')} />

    </SafeAreaView>
  );
}
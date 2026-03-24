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
import { styles, TICK_W } from './styles/WeightScreen.styles';

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
};

type WeightScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Weight'>;
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
  if (unit === 'kg') return Math.round((KG_MIN + idx * KG_STEP) * 10) / 10;
  return LB_MIN + idx;
}
function getIndexFromValue(unit: 'kg' | 'lb', val: number): number {
  if (unit === 'kg') return Math.round((val - KG_MIN) / KG_STEP);
  return Math.round(val - LB_MIN);
}
function isLabelTick(unit: 'kg' | 'lb', idx: number): boolean {
  if (unit === 'kg') return idx % 20 === 0;
  return (LB_MIN + idx) % 10 === 0;
}
function isMajorTick(unit: 'kg' | 'lb', idx: number): boolean {
  if (unit === 'kg') return idx % 5 === 0;
  return (LB_MIN + idx) % 5 === 0;
}
function getLabelText(unit: 'kg' | 'lb', idx: number): string {
  if (unit === 'kg') return `${Math.round(KG_MIN + idx * KG_STEP)}`;
  return `${LB_MIN + idx}`;
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function WeightScreen({ navigation }: WeightScreenProps) {
  const [unit, setUnitState] = useState<'kg' | 'lb'>('kg');
  const [kgValue, setKgValue] = useState(71.2);
  const [lbValue, setLbValue] = useState(157);
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
      const idx = getIndexFromValue(u, val);
      scrollRef.current?.scrollTo({ x: idx * TICK_W, animated: false });
    }, 50);
  };

  const PAD = rulerWidth / 2;
  const tickCount = getTickCount(unit);

  return (
    <SafeAreaView style={styles.safeArea}>

      {/* ── Back Button ── */}
      <BackButton onPress={() => navigation.goBack()} />

      {/* ── Progress Bar ── */}
      <ProgressBar progress="40%" step="Step 4 of 10" />

      {/* ── Header ── */}
      <View style={styles.header}>
        <Text style={styles.title}>What is your weight?</Text>
        <Text style={styles.subtitle}>
          Knowing your current weight helps us calculate your personalised calorie goals
        </Text>
      </View>

      {/* ── Unit Toggle ── */}
      <View style={styles.unitToggleWrap}>
        <View style={styles.unitToggle}>
          <TouchableOpacity
            style={[styles.unitBtn, unit === 'kg' && styles.unitBtnActive]}
            onPress={() => handleUnitChange('kg')}
            activeOpacity={0.8}
          >
            <Text style={[styles.unitBtnText, unit === 'kg' && styles.unitBtnTextActive]}>kg</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.unitBtn, unit === 'lb' && styles.unitBtnActive]}
            onPress={() => handleUnitChange('lb')}
            activeOpacity={0.8}
          >
            <Text style={[styles.unitBtnText, unit === 'lb' && styles.unitBtnTextActive]}>lb</Text>
          </TouchableOpacity>
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
              setTimeout(() => {
                scrollRef.current?.scrollTo({ x: idx * TICK_W, animated: false });
              }, 80);
            }}
          >
            {Array.from({ length: tickCount }, (_, i) => {
              const isLabel = isLabelTick(unit, i);
              const isMajor = isMajorTick(unit, i);
              const tickH = isLabel ? 24 : isMajor ? 16 : 10;
              return (
                <View key={i} style={styles.tickWrap}>
                  <View style={[
                    styles.tick,
                    isLabel && styles.tickLabel,
                    isMajor && !isLabel && styles.tickMajor,
                    { height: tickH },
                  ]} />
                  {isLabel && <Text style={styles.tickText}>{getLabelText(unit, i)}</Text>}
                </View>
              );
            })}
          </ScrollView>
        </View>
      </View>

      {/* ── Spacer ── */}
      <View style={{ flex: 1 }} />

      {/* ── Continue Button ── */}
      <ContinueButton onPress={() => navigation.navigate('GoalWeight')} />

    </SafeAreaView>
  );
}
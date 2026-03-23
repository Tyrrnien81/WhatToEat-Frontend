import React, { useState, useRef, useCallback, useEffect } from 'react';
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
import { styles, ITEM_H } from './styles/HeightScreen.styles';

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
};

type HeightScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Height'>;
};

// ─── Generate values ──────────────────────────────────────────────────────────
const CM_VALUES = Array.from({ length: 101 }, (_, i) => `${i + 130}`);
const FT_VALUES: string[] = [];
for (let ft = 4; ft <= 7; ft++) {
  for (let inch = 0; inch < 12; inch++) {
    FT_VALUES.push(`${ft}' ${inch}"`);
    if (ft === 7 && inch === 0) break;
  }
}

// ─── Picker Column ────────────────────────────────────────────────────────────
type PickerColProps = {
  items: string[];
  selectedIdx: number;
  onSelect: (idx: number) => void;
};

function PickerCol({ items, selectedIdx, onSelect }: PickerColProps) {
  const scrollRef = useRef<ScrollView>(null);
  const [colHeight, setColHeight] = useState(0);
  const PAD = colHeight > 0 ? Math.round((colHeight - ITEM_H) / 2) : ITEM_H * 3;

  useEffect(() => {
    setTimeout(() => {
      scrollRef.current?.scrollTo({ y: selectedIdx * ITEM_H, animated: false });
    }, 80);
  }, [colHeight, items]);

  const handleScrollEnd = useCallback((e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const y = e.nativeEvent.contentOffset.y;
    const idx = Math.round(y / ITEM_H);
    const clamped = Math.max(0, Math.min(idx, items.length - 1));
    onSelect(clamped);
  }, [items.length, onSelect]);

  return (
    <View style={{ flex: 1 }} onLayout={e => setColHeight(e.nativeEvent.layout.height)}>
      <ScrollView
        ref={scrollRef}
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        snapToInterval={ITEM_H}
        decelerationRate="fast"
        onMomentumScrollEnd={handleScrollEnd}
        onScrollEndDrag={handleScrollEnd}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingVertical: PAD }}
      >
        {items.map((item, i) => {
          const dist = Math.abs(i - selectedIdx);
          return (
            <TouchableOpacity
              key={i}
              style={styles.pickerItem}
              onPress={() => {
                onSelect(i);
                scrollRef.current?.scrollTo({ y: i * ITEM_H, animated: true });
              }}
              activeOpacity={1}
            >
              <Text style={[
                styles.pickerText,
                dist === 0 && styles.pickerSel,
                dist === 1 && styles.pickerN2,
                dist === 2 && styles.pickerN1,
              ]}>
                {item}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function HeightScreen({ navigation }: HeightScreenProps) {
  const [unit, setUnit]           = useState<'cm' | 'ft'>('cm');
  const [selIdx, setSelIdx]       = useState(50);
  const [colHeight, setColHeight] = useState(0);

  const values = unit === 'cm' ? CM_VALUES : FT_VALUES;
  const displayVal = values[selIdx] ?? '180';
  const displayUnit = unit === 'cm' ? 'cm' : '';

  const handleUnitChange = (u: 'cm' | 'ft') => {
    setUnit(u);
    setSelIdx(u === 'cm' ? 50 : 10);
  };

  return (
    <SafeAreaView style={styles.safeArea}>

      {/* ── Back Button ── */}
      <BackButton onPress={() => navigation.goBack()} />

      {/* ── Progress Bar ── */}
      <ProgressBar progress="30%" step="Step 3 of 10" />

      {/* ── Header ── */}
      <View style={styles.header}>
        <Text style={styles.title}>How tall are you?</Text>
        <Text style={styles.subtitle}>
          This helps us estimate your body composition and provide accurate calorie calculations
        </Text>
      </View>

      {/* ── Unit Toggle ── */}
      <View style={styles.unitToggleWrap}>
        <View style={styles.unitToggle}>
          <TouchableOpacity
            style={[styles.unitBtn, unit === 'ft' && styles.unitBtnActive]}
            onPress={() => handleUnitChange('ft')}
            activeOpacity={0.8}
          >
            <Text style={[styles.unitBtnText, unit === 'ft' && styles.unitBtnTextActive]}>ft</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.unitBtn, unit === 'cm' && styles.unitBtnActive]}
            onPress={() => handleUnitChange('cm')}
            activeOpacity={0.8}
          >
            <Text style={[styles.unitBtnText, unit === 'cm' && styles.unitBtnTextActive]}>cm</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* ── Selected Display ── */}
      <View style={styles.selectedDisplay}>
        <Text style={styles.selectedVal}>{displayVal}</Text>
        <Text style={styles.selectedUnit}>{displayUnit}</Text>
      </View>

      {/* ── Picker Card ── */}
      <View style={styles.pickerCard}>
        {colHeight > 0 && (
          <View
            style={[styles.pickerHighlight, { top: (colHeight - ITEM_H - 4) / 2 }]}
            pointerEvents="none"
          />
        )}
        <View style={{ flex: 1 }} onLayout={e => setColHeight(e.nativeEvent.layout.height)}>
          <PickerCol key={unit} items={values} selectedIdx={selIdx} onSelect={setSelIdx} />
        </View>
      </View>

      {/* ── Continue Button ── */}
      <ContinueButton onPress={() => navigation.navigate('Weight')} />

    </SafeAreaView>
  );
}
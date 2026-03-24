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
import { styles, ITEM_H } from './styles/BirthdayScreen.styles';

// ─── Types ────────────────────────────────────────────────────────────────────
type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  Onboarding: undefined;
  Home: undefined;
  ForgotPassword: undefined;
  ResetPassword: undefined;
  VerifyEmail: undefined;
  Welcome: undefined;
  Birthday: undefined;
  Gender: undefined;
};

type BirthdayScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Birthday'>;
};

const MONTHS = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
];

function getDaysInMonth(month: number, year: number) {
  return new Date(year, month + 1, 0).getDate();
}

// ─── Picker Column ────────────────────────────────────────────────────────────
type PickerColProps = {
  items: string[];
  selectedIdx: number;
  onSelect: (idx: number) => void;
  flex: number;
  colHeight: number;
  paddingLeft?: number;
  paddingRight?: number;
};

function PickerCol({ items, selectedIdx, onSelect, flex, colHeight, paddingLeft = 0, paddingRight = 0 }: PickerColProps) {
  const scrollRef = useRef<ScrollView>(null);
  const PAD = colHeight > 0 ? Math.round((colHeight - ITEM_H) / 2) : ITEM_H * 3;

  useEffect(() => {
    setTimeout(() => {
      scrollRef.current?.scrollTo({ y: selectedIdx * ITEM_H, animated: false });
    }, 80);
  }, [colHeight]);

  const handleScrollEnd = useCallback((e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const y = e.nativeEvent.contentOffset.y;
    const idx = Math.round(y / ITEM_H);
    const clamped = Math.max(0, Math.min(idx, items.length - 1));
    onSelect(clamped);
  }, [items.length, onSelect]);

  return (
    <View style={{ flex, paddingLeft, paddingRight }}>
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
                dist === 1 && styles.pickerN4,
                dist === 2 && styles.pickerN3,
                dist === 3 && styles.pickerN2,
                dist >= 4 && dist <= 5 && styles.pickerN1,
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
export default function BirthdayScreen({ navigation }: BirthdayScreenProps) {
  const [selMonth, setSelMonth]   = useState(5);
  const [selDay, setSelDay]       = useState(4);
  const [selYear, setSelYear]     = useState(67);
  const [colHeight, setColHeight] = useState(0);

  const days  = Array.from({ length: getDaysInMonth(selMonth, 1940 + selYear) }, (_, i) => String(i + 1));
  const years = Array.from({ length: 80 }, (_, i) => String(1940 + i));
  const displayDate = `${MONTHS[selMonth]} ${selDay + 1}, ${1940 + selYear}`;

  const handleMonthChange = (idx: number) => {
    setSelMonth(idx);
    const maxDay = getDaysInMonth(idx, 1940 + selYear) - 1;
    if (selDay > maxDay) setSelDay(maxDay);
  };

  const handleYearChange = (idx: number) => {
    setSelYear(idx);
    const maxDay = getDaysInMonth(selMonth, 1940 + idx) - 1;
    if (selDay > maxDay) setSelDay(maxDay);
  };

  return (
    <SafeAreaView style={styles.safeArea}>

      {/* ── Back Button ── */}
      <BackButton onPress={() => navigation.goBack()} />

      {/* ── Progress Bar ── */}
      <ProgressBar progress="10%" step="Step 1 of 10" />

      {/* ── Header ── */}
      <View style={styles.header}>
        <Text style={styles.title}>When is your birthday?</Text>
        <Text style={styles.subtitle}>This helps us personalize your plan</Text>
      </View>

      {/* ── Date Badge ── */}
      <View style={styles.dateBadge}>
        <View style={styles.dateBadgeIcon}>
          <Text style={styles.dateBadgeEmoji}>🎂</Text>
        </View>
        <View>
          <Text style={styles.dateBadgeLabel}>Selected date</Text>
          <Text style={styles.dateBadgeValue}>{displayDate}</Text>
        </View>
      </View>

      {/* ── Picker Card ── */}
      <View style={styles.pickerCard}>
        <View style={styles.pickerLabels}>
          <Text style={[styles.pickerLabel, { flex: 1.8, paddingLeft: 10 }]}>Month</Text>
          <Text style={[styles.pickerLabel, { flex: 0.7, paddingRight: 8 }]}>Day</Text>
          <Text style={[styles.pickerLabel, { flex: 1.1, paddingRight: 16 }]}>Year</Text>
        </View>

        <View
          style={styles.pickerColumnsWrap}
          onLayout={e => setColHeight(e.nativeEvent.layout.height)}
        >
          {colHeight > 0 && (
            <View
              style={[styles.pickerHighlight, { top: (colHeight - ITEM_H - 4) / 2 }]}
              pointerEvents="none"
            />
          )}

          <PickerCol items={MONTHS} selectedIdx={selMonth} onSelect={handleMonthChange} flex={1.8} colHeight={colHeight} paddingLeft={10} />
          <PickerCol items={days} selectedIdx={selDay} onSelect={setSelDay} flex={0.7} colHeight={colHeight} paddingRight={8} />
          <PickerCol items={years} selectedIdx={selYear} onSelect={handleYearChange} flex={1.1} colHeight={colHeight} paddingRight={16} />
        </View>
      </View>

      {/* ── Continue Button ── */}
      <ContinueButton onPress={() => navigation.navigate('Gender')} />

    </SafeAreaView>
  );
}
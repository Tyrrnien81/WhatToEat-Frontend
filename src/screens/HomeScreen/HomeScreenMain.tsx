import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../App';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Animated,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { getRecommendedCombos } from '../../services/homescreenService';
import { Combo } from '../../types/homescreen';

const COLORS = {
  red: '#FF3347',
  redLight: '#FFE0E3',
  bg2: '#FFF5F5',
  ink: '#1A0A0A',
  inkMuted: '#9A7070',
  border: '#2A1A1A',
  beige: '#F5ECD7',
};

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const DateStrip = () => {
  const today = new Date();
  const dates = Array.from({ length: 5 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + (i - 1));
    return d;
  });
  return (
    <View style={styles.dateNav}>
      <View style={styles.dateStrip}>
        {dates.map((d, i) => {
          const isToday = i === 1;
          const isPast = i === 0;
          const isFuture = i > 1;
          let pillStyle = styles.datePillDefault;
          let dayColor = COLORS.inkMuted;
          let numColor = COLORS.ink;
          if (isToday) { pillStyle = styles.datePillActive; dayColor = 'rgba(255,255,255,0.8)'; numColor = 'white'; }
          else if (isPast) { pillStyle = styles.datePillMuted; dayColor = 'rgba(255,255,255,0.5)'; numColor = 'rgba(255,255,255,0.8)'; }
          else if (isFuture) { pillStyle = styles.datePillFuture; dayColor = '#9A8A80'; numColor = '#6A5A54'; }
          return (
            <TouchableOpacity key={i} style={[styles.datePill, pillStyle]}>
              <Text style={[styles.dateDay, { color: dayColor }]}>{DAYS[d.getDay()]}</Text>
              <Text style={[styles.dateNum, { color: numColor }]}>{d.getDate()}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const HallCard = ({ combo, navigation }: { combo: Combo; navigation: StackNavigationProp<RootStackParamList> }) => {
  const [expanded, setExpanded] = useState(false);
  const animation = useState(new Animated.Value(0))[0];

  const toggle = () => {
    Animated.timing(animation, { toValue: expanded ? 0 : 1, duration: 300, useNativeDriver: false }).start();
    setExpanded(!expanded);
  };

  const maxHeight = animation.interpolate({ inputRange: [0, 1], outputRange: [0, 500] });
  const opacity = animation.interpolate({ inputRange: [0, 0.4, 1], outputRange: [0, 0, 1] });
  const chevronRotation = animation.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '180deg'] });

  return (
    <TouchableOpacity style={styles.hallCard} onPress={toggle} activeOpacity={0.95}>
      <View style={[styles.hallCardImg, { backgroundColor: '#FFE8D6' }]}>
        <Text style={styles.hallEmoji}>🍽️</Text>
        <Animated.View style={[styles.expandBtn, { transform: [{ rotate: chevronRotation }] }]}>
          <Svg width={10} height={10} viewBox="0 0 10 10">
            <Path d="M2 3.5l3 3 3-3" stroke={COLORS.inkMuted} strokeWidth={1.8} strokeLinecap="round" fill="none" />
          </Svg>
        </Animated.View>
      </View>

      <View style={styles.hallCardBody}>
        <View style={styles.hallInfo}>
          <Text style={styles.hallName}>{combo.name}</Text>
          <Text style={styles.hallHours}>{combo.diningHall}</Text>
        </View>
        <Text style={styles.hallKcalRow}>{combo.totalCalories} kcal</Text>
      </View>

      <Animated.View style={{ maxHeight, opacity, overflow: 'hidden' }}>
        <View style={styles.comboDetailBorder}>
          <View style={styles.comboDetailInner}>
            <Text style={styles.comboName}>{combo.name}</Text>
            <View style={styles.comboItems}>
              {combo.items.map((item, i) => (
                <View key={i} style={[styles.comboItemRow, i === combo.items.length - 1 && { borderBottomWidth: 0 }]}>
                  <Text style={styles.comboItemName}>{item.name}</Text>
                  <Text style={styles.comboItemKcal}>{item.calories ?? 0} kcal</Text>
                </View>
              ))}
            </View>
            <View style={styles.macroPills}>
              {[
                { val: `${combo.totalCalories}`, label: 'kcal', bg: '#FFE8EA', borderColor: '#FF3347' },
                { val: `${combo.totalProtein}g`, label: 'protein', bg: '#FFE0EE', borderColor: '#FF6B9D' },
                { val: `${combo.totalCarbs}g`, label: 'carbs', bg: '#FFF2DC', borderColor: '#FF9F1C' },
                { val: `${combo.totalFat}g`, label: 'fats', bg: '#D8F5F3', borderColor: '#2EC4B6' },
              ].map((m, i) => (
                <View key={i} style={[styles.mpill, { backgroundColor: m.bg, borderColor: m.borderColor }]}>
                  <Text style={styles.mpillVal}>{m.val}</Text>
                  <Text style={styles.mpillLabel}>{m.label}</Text>
                </View>
              ))}
            </View>
            <TouchableOpacity style={styles.logBtn} onPress={() => navigation.navigate('Meal')} activeOpacity={0.85}>
              <Svg width={16} height={16} viewBox="0 0 24 24">
                <Path d="M12 5v14M5 12h14" stroke="white" strokeWidth={2.5} strokeLinecap="round" fill="none" />
              </Svg>
              <Text style={styles.logBtnText}>Log This Meal</Text>
              <View style={styles.logBtnKcalWrap}>
                <Text style={styles.logBtnKcal}>{combo.totalCalories} kcal</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

export default function HomeScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [combos, setCombos] = useState<Combo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRecommendedCombos()
      .then(data => { if (data?.combos) setCombos(data.combos); })
      .catch(err => console.error('Failed to fetch combos:', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.beige} />
      <View style={styles.container}>
        <DateStrip />
        <View style={styles.sectionLabel}>
          <Text style={styles.sectionLabelText}>Your Top Picks Today</Text>
          <Text style={styles.sectionLabelSub}>Based on your preferences</Text>
        </View>
        {loading ? (
          <ActivityIndicator size="large" color={COLORS.red} style={{ marginTop: 40 }} />
        ) : (
          <ScrollView style={styles.scrollBody} contentContainerStyle={{ paddingBottom: 16 }} showsVerticalScrollIndicator={false}>
            {combos.map((combo, i) => (
              <HallCard key={i} combo={combo} navigation={navigation} />
            ))}
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.beige },
  container: { flex: 1, backgroundColor: COLORS.beige },
  dateNav: { paddingHorizontal: 20, paddingTop: 12 },
  dateStrip: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 4 },
  datePill: { flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: 48, height: 48, borderRadius: 14, borderWidth: 2, borderColor: COLORS.border },
  datePillDefault: { backgroundColor: COLORS.beige },
  datePillActive: { backgroundColor: COLORS.red },
  datePillMuted: { backgroundColor: '#3A2A2A' },
  datePillFuture: { backgroundColor: '#E0D8D0' },
  dateDay: { fontSize: 8, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.3 },
  dateNum: { fontSize: 13, fontWeight: '900', lineHeight: 16 },
  sectionLabel: { paddingHorizontal: 22, paddingTop: 14, paddingBottom: 8, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  sectionLabelText: { fontSize: 11, fontWeight: '800', letterSpacing: 0.7, textTransform: 'uppercase', color: COLORS.inkMuted },
  sectionLabelSub: { fontSize: 10, fontWeight: '600', color: COLORS.inkMuted },
  scrollBody: { flex: 1, paddingHorizontal: 20 },
  hallCard: { backgroundColor: COLORS.bg2, borderWidth: 2.5, borderColor: COLORS.border, borderRadius: 22, marginBottom: 12, shadowColor: COLORS.border, shadowOffset: { width: 4, height: 4 }, shadowOpacity: 1, shadowRadius: 0, elevation: 4, overflow: 'hidden' },
  hallCardImg: { width: '100%', height: 110, alignItems: 'center', justifyContent: 'center', borderBottomWidth: 2.5, borderBottomColor: COLORS.border },
  hallEmoji: { fontSize: 56 },
  expandBtn: { position: 'absolute', top: 8, right: 8, width: 22, height: 22, borderRadius: 11, backgroundColor: COLORS.redLight, borderWidth: 2, borderColor: COLORS.border, alignItems: 'center', justifyContent: 'center' },
  hallCardBody: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 14, paddingVertical: 12 },
  hallInfo: { flex: 1, minWidth: 0 },
  hallName: { fontSize: 16, fontWeight: '900', color: COLORS.ink, letterSpacing: -0.3, marginBottom: 4 },
  hallHours: { fontSize: 10, fontWeight: '600', color: COLORS.inkMuted },
  hallKcalRow: { fontSize: 15, fontWeight: '900', color: COLORS.ink },
  comboDetailBorder: { borderTopWidth: 2.5, borderTopColor: COLORS.border },
  comboDetailInner: { padding: 13 },
  comboName: { fontSize: 17, fontWeight: '900', color: COLORS.ink, letterSpacing: -0.3, marginBottom: 10 },
  comboItems: { marginBottom: 12 },
  comboItemRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 4, borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,0.06)' },
  comboItemName: { fontSize: 11, fontWeight: '700', color: COLORS.ink },
  comboItemKcal: { fontSize: 11, fontWeight: '700', color: COLORS.inkMuted },
  macroPills: { flexDirection: 'row', gap: 6, marginBottom: 12 },
  mpill: { flex: 1, borderWidth: 2, borderRadius: 11, paddingVertical: 6, paddingHorizontal: 8, alignItems: 'center' },
  mpillVal: { fontSize: 13, fontWeight: '800', color: COLORS.ink, lineHeight: 16, marginBottom: 2 },
  mpillLabel: { fontSize: 8, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.4, color: COLORS.inkMuted },
  logBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: COLORS.red, borderWidth: 2.5, borderColor: COLORS.border, borderRadius: 16, paddingVertical: 13, shadowColor: COLORS.border, shadowOffset: { width: 3, height: 3 }, shadowOpacity: 1, shadowRadius: 0, elevation: 3 },
  logBtnText: { fontSize: 15, fontWeight: '900', color: 'white' },
  logBtnKcalWrap: { backgroundColor: 'rgba(255,255,255,0.22)', borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.4)', borderRadius: 10, paddingHorizontal: 9, paddingVertical: 3 },
  logBtnKcal: { fontSize: 11, fontWeight: '700', color: 'white' },
});
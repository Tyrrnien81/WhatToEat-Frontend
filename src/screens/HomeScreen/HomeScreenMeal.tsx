import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Svg, { Path } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../App';
import { getRecommendedCombos } from '../../services/homescreenService';
import { Combo } from '../../types/homescreen';

const COLORS = {
  red: '#FF3347',
  ink: '#1A0A0A',
  inkMuted: '#9A7070',
  border: '#2A1A1A',
  beige: '#F5ECD7',
};

export default function HomeScreenMeal() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [combos, setCombos] = React.useState<Combo[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    getRecommendedCombos('breakfast')
      .then(data => {
        if (data?.combos) setCombos(data.combos);
      })
      .catch(err => console.error('Failed to fetch combos:', err))
      .finally(() => setLoading(false));
  }, []);

  const combo = combos[0];

  const totalKcal = combo?.totalCalories ?? 0;
  const totalProtein = combo?.totalProtein ?? 0;
  const totalCarbs = combo?.totalCarbs ?? 0;
  const totalFat = combo?.totalFat ?? 0;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" backgroundColor={COLORS.beige} />
        <View style={styles.container}>

          {/* ── Total row ── */}
          <View style={styles.totalRow}>
            <View>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalKcal}>{totalKcal} kcal</Text>
            </View>
            <View style={styles.totalMacros}>
              {[
                { val: `${totalProtein}g`, label: 'Protein', color: '#FF9FBF' },
                { val: `${totalCarbs}g`,   label: 'Carbs',   color: '#FFD080' },
                { val: `${totalFat}g`,     label: 'Fats',    color: '#80E8E0' },
              ].map((m, i) => (
                <React.Fragment key={i}>
                  {i > 0 && <View style={styles.totalSep} />}
                  <View style={styles.totalMacro}>
                    <Text style={[styles.totalMacroVal, { color: m.color }]}>{m.val}</Text>
                    <Text style={styles.totalMacroLabel}>{m.label}</Text>
                  </View>
                </React.Fragment>
              ))}
            </View>
          </View>

          {/* ── Food list ── */}
          <ScrollView
            style={styles.scrollBody}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 16 }}
          >
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>What's on the plate</Text>
              <Text style={styles.sectionHint}>{combo?.diningHall ?? ''}</Text>
            </View>

            {loading ? (
              <ActivityIndicator size="large" color={COLORS.red} style={{ marginTop: 40 }} />
            ) : (
              <View style={styles.foodList}>
                {(combo?.items ?? []).map((item, i) => (
                  <View key={i} style={styles.foodRow}>
                    <Text style={styles.foodName}>{item.name}</Text>
                    <Text style={styles.foodKcal}>{item.calories ?? 0} kcal</Text>
                  </View>
                ))}
              </View>
            )}

            {/* ── Log button ── */}
            <View style={styles.logBtnWrap}>
              <TouchableOpacity
                style={styles.logBtn}
                onPress={() => navigation.navigate('Confirm', { combo } as any)}
                activeOpacity={0.85}
                disabled={!combo}
              >
                <Svg width={20} height={20} viewBox="0 0 24 24">
                  <Path d="M12 5v14M5 12h14" stroke="white" strokeWidth={2.5} strokeLinecap="round" fill="none" />
                </Svg>
                <Text style={styles.logBtnText}>Log This Meal</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>

        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  safeArea:  { flex: 1, backgroundColor: COLORS.beige },
  container: { flex: 1, backgroundColor: COLORS.beige },
  totalRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    marginHorizontal: 20, marginTop: 10,
    backgroundColor: COLORS.ink, borderWidth: 3, borderColor: COLORS.border,
    borderRadius: 20, paddingHorizontal: 16, paddingVertical: 12,
    shadowColor: COLORS.border, shadowOffset: { width: 4, height: 4 }, shadowOpacity: 1, shadowRadius: 0, elevation: 4,
  },
  totalLabel: { fontSize: 12, fontWeight: '800', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: 0.7 },
  totalKcal: { fontSize: 22, fontWeight: '900', color: 'white', letterSpacing: -0.6, lineHeight: 24 },
  totalMacros: { flexDirection: 'row', gap: 8, alignItems: 'center' },
  totalSep: { width: 1, height: 24, backgroundColor: 'rgba(255,255,255,0.15)' },
  totalMacro: { alignItems: 'center' },
  totalMacroVal: { fontSize: 14, fontWeight: '800', lineHeight: 16 },
  totalMacroLabel: { fontSize: 9, fontWeight: '700', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: 0.4, marginTop: 2 },
  scrollBody: { flex: 1 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 22, paddingTop: 10, paddingBottom: 8 },
  sectionTitle: { fontSize: 13, fontWeight: '900', color: COLORS.ink, textTransform: 'uppercase', letterSpacing: 0.6 },
  sectionHint: { fontSize: 10, fontWeight: '600', color: COLORS.inkMuted },
  foodList: { paddingHorizontal: 20, gap: 7 },
  foodRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: 'white', borderWidth: 2, borderColor: COLORS.border,
    borderRadius: 14, paddingHorizontal: 16, paddingVertical: 12,
  },
  foodName: { fontSize: 14, fontWeight: '700', color: COLORS.ink, flex: 1 },
  foodKcal: { fontSize: 13, fontWeight: '800', color: COLORS.red },
  logBtnWrap: { paddingHorizontal: 20, paddingTop: 16 },
  logBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10,
    backgroundColor: COLORS.red, borderWidth: 3, borderColor: COLORS.border,
    borderRadius: 20, paddingVertical: 16,
    shadowColor: COLORS.border, shadowOffset: { width: 6, height: 6 }, shadowOpacity: 1, shadowRadius: 0, elevation: 6,
  },
  logBtnText: { fontSize: 16, fontWeight: '900', color: 'white', letterSpacing: -0.1 },
});
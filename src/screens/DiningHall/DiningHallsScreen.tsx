import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { C } from './theme';
import { SortOption, StatusType } from './types';
import { DINING_HALLS, dateKey } from './data/diningHallsData';
// TODO: Replace with TanStack Query:
//   const { data: halls } = useQuery({ queryKey: ['diningHalls', selectedDate], queryFn: () => fetchDiningHalls(selectedDate) })
import { DiningHallCard } from './components/DiningHallCard';
import { SortDropdown } from './components/SortDropdown';
import { DateTabBar, DateTab } from './components/DateTabBar';
import { styles } from './styles/DiningHallsScreen.styles';

// ─── Date helpers ─────────────────────────────────────────────────────────────
const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTH_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function buildDateTabs(): DateTab[] {
  return Array.from({ length: 10 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return {
      key: dateKey(i),
      dayLabel: i === 0 ? 'Today' : DAY_LABELS[d.getDay()],
      dateNum: d.getDate(),
      month: MONTH_LABELS[d.getMonth()],
    };
  });
}

const DATE_TABS = buildDateTabs();

// Days 5–9 fall back to nearest available mock day (0–4)
function resolveDayKey(date: string, availableKeys: string[]): string {
  if (availableKeys.includes(date)) return date;
  // Fall back to same weekday offset mod 5
  const idx = DATE_TABS.findIndex(t => t.key === date);
  return availableKeys[idx % availableKeys.length] ?? availableKeys[0];
}

export default function DiningHallsScreen() {
  const insets = useSafeAreaInsets();
  const [sortBy, setSortBy] = useState<SortOption>('Relevance');
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(DATE_TABS[0].key);

  const sortedHalls = [...DINING_HALLS].sort((a, b) => {
    const keysA = Object.keys(a.days);
    const keysB = Object.keys(b.days);
    const keyA = resolveDayKey(selectedDate, keysA);
    const keyB = resolveDayKey(selectedDate, keysB);
    const dayA = a.days[keyA];
    const dayB = b.days[keyB];
    if (!dayA || !dayB) return 0;
    if (sortBy === 'Open Now') {
      const rank = (s: StatusType) => (s === 'open' ? 0 : s === 'soon' ? 1 : 2);
      return rank(dayA.status) - rank(dayB.status);
    }
    if (sortBy === 'Closest') {
      return Math.random() - 0.5;
    }
    return 0;
  });

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.screenHeader}>
        <Text style={styles.screenTitle}>Dining Halls</Text>
        <Text style={styles.screenSubtitle}>6 locations on campus · Updated just now</Text>
      </View>

      {/* Date picker */}
      <DateTabBar
        tabs={DATE_TABS}
        selectedDate={selectedDate}
        onSelect={setSelectedDate}
      />

      {/* Sort trigger */}
      <View style={styles.sortRow}>
        <TouchableOpacity
          style={styles.sortTrigger}
          onPress={() => setDropdownVisible(true)}
          activeOpacity={0.8}
        >
          <Text style={styles.sortLabel}>Sorted by:</Text>
          <Text style={styles.sortValue}>{sortBy}</Text>
          <Svg width={12} height={12} viewBox="0 0 12 12" fill="none">
            <Path d="M2 4l4 4 4-4" stroke={C.inkMuted} strokeWidth={2} strokeLinecap="round" />
          </Svg>
        </TouchableOpacity>
      </View>

      {/* Sort dropdown */}
      <SortDropdown
        visible={dropdownVisible}
        current={sortBy}
        onSelect={setSortBy}
        onClose={() => setDropdownVisible(false)}
      />

      {/* Hall list */}
      <ScrollView
        style={styles.scrollBody}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {sortedHalls.map(hall => {
          const availableKeys = Object.keys(hall.days);
          const resolvedKey = resolveDayKey(selectedDate, availableKeys);
          const day = hall.days[resolvedKey];
          if (!day) return null;
          return <DiningHallCard key={hall.id} hall={hall} day={day} />;
        })}
      </ScrollView>
    </View>
  );
}
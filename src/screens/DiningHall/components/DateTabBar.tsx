import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { styles } from '../styles/DateTabBar.styles';

// ─── Types ────────────────────────────────────────────────────────────────────
export interface DateTab {
  key: string;       // 'YYYY-MM-DD'
  dayLabel: string;  // 'Today', 'Mon', 'Tue', etc.
  dateNum: number;   // 22
  month: string;     // 'Mar'
}

interface Props {
    tabs: DateTab[];
    selectedDate: string;
    onSelect: (date: string) => void;
    }

    export const DateTabBar = ({ tabs, selectedDate, onSelect }: Props) => (
    <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.dateTabs}
        contentContainerStyle={styles.dateTabsContent}
    >
        {tabs.map(tab => {
        const isSelected = tab.key === selectedDate;
        return (
            <TouchableOpacity
            key={tab.key}
            style={[styles.dateTab, isSelected && styles.dateTabSelected]}
            onPress={() => onSelect(tab.key)}
            activeOpacity={0.8}
            >
            <Text style={[styles.dateTabDay, isSelected && styles.dateTabDaySelected]}>
                {tab.dayLabel}
            </Text>
            <Text style={[styles.dateTabNum, isSelected && styles.dateTabNumSelected]}>
                {tab.dateNum}
            </Text>
            <Text style={[styles.dateTabMonth, isSelected && styles.dateTabMonthSelected]}>
                {tab.month}
            </Text>
            </TouchableOpacity>
        );
        })}
    </ScrollView>
);
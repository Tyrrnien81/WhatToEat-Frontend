import React, { useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import { styles } from '../styles/DateTabBar.styles';

export interface DateTab {
    key: string;
    dayLabel: string;
    dateNum: number;
    month: string;
    }

    interface Props {
    tabs: DateTab[];
    selectedDate: string;
    onSelect: (date: string) => void;
    }

    export const DateTabBar = ({ tabs, selectedDate, onSelect }: Props) => {
    const visibleTabs = tabs.slice(0, 5);
    const selectedIdx = visibleTabs.findIndex(t => t.key === selectedDate);

    const handlePress = useCallback(
        (key: string) => onSelect(key),
        [onSelect],
    );

    return (
        <View style={styles.wrapper}>
        <View style={styles.row}>
            {visibleTabs.map((tab, i) => {
            const isSelected = tab.key === selectedDate;
            const isPast = i < selectedIdx;
            const isFuture = i > selectedIdx;

            const pillVariant: StyleProp<ViewStyle> =
                isSelected ? styles.pillActive :
                isPast     ? styles.pillPast :
                isFuture   ? styles.pillFuture :
                            styles.pillDefault;

            const dayColor =
                isSelected ? 'rgba(255,255,255,0.8)' :
                isPast     ? 'rgba(255,255,255,0.5)' :
                isFuture   ? '#9A8A80' :
                            '#9A7070';

            const numColor =
                isSelected ? 'white' :
                isPast     ? 'rgba(255,255,255,0.8)' :
                isFuture   ? '#6A5A54' :
                            '#1A0A0A';

            const label = isSelected ? 'TODAY' : tab.dayLabel.toUpperCase();

            return (
                <TouchableOpacity
                key={tab.key}
                style={[styles.pill, pillVariant]}
                onPress={() => handlePress(tab.key)}
                activeOpacity={0.85}
                >
                <Text style={[styles.day, { color: dayColor }]}>{label}</Text>
                <Text style={[styles.num, { color: numColor }]}>{tab.dateNum}</Text>
                </TouchableOpacity>
            );
            })}
        </View>
        </View>
    );
};
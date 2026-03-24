import React, { useRef, useCallback } from 'react';
import {
    View, Text, TouchableOpacity, ScrollView,
    NativeSyntheticEvent, NativeScrollEvent, Dimensions,
    } from 'react-native';
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

    const PILL_WIDTH = 64;
    // Horizontal padding on wrapper is 20 on each side
    const STRIP_WIDTH = Dimensions.get('window').width - 40;

    export const DateTabBar = ({ tabs, selectedDate, onSelect }: Props) => {
    const scrollRef = useRef<ScrollView>(null);

    // To scroll the last tab (index N-1) to x=0:
    // scrollX = (N-1) * PILL_WIDTH
    // Total content width must be >= scrollX + STRIP_WIDTH
    // trailing spacer = (N-1) * PILL_WIDTH + STRIP_WIDTH - (N pills + 1 filler) * PILL_WIDTH
    //                 = (N-1)*PW + SW - (N+1)*PW
    //                 = SW - 2*PW
    const trailingWidth = STRIP_WIDTH - 2 * PILL_WIDTH;

    const handleScrollEnd = useCallback(
        (e: NativeSyntheticEvent<NativeScrollEvent>) => {
        const x = e.nativeEvent.contentOffset.x;
        const index = Math.round(x / PILL_WIDTH);
        const clamped = Math.max(0, Math.min(index, tabs.length - 1));
        onSelect(tabs[clamped].key);
        scrollRef.current?.scrollTo({ x: clamped * PILL_WIDTH, animated: true });
        },
        [tabs, onSelect],
    );

    const handlePress = useCallback(
        (index: number) => {
        onSelect(tabs[index].key);
        scrollRef.current?.scrollTo({ x: index * PILL_WIDTH, animated: true });
        },
        [tabs, onSelect],
    );

    return (
        <View style={styles.wrapper}>
        <View style={styles.container}>
            <View style={styles.selectedBg} pointerEvents="none" />
            <ScrollView
            ref={scrollRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={PILL_WIDTH}
            decelerationRate="fast"
            onMomentumScrollEnd={handleScrollEnd}
            contentContainerStyle={styles.row}
            bounces={false}
            >
            {tabs.map((tab, i) => {
                const isSelected = tab.key === selectedDate;
                return (
                <TouchableOpacity
                    key={tab.key}
                    style={[styles.pill, i > 0 && styles.pillDivider]}
                    onPress={() => handlePress(i)}
                    activeOpacity={0.85}
                >
                    <Text style={[styles.day, isSelected && styles.daySelected]}>
                    {i === 0 ? 'TODAY' : tab.dayLabel.toUpperCase()}
                    </Text>
                    <Text style={[styles.num, isSelected && styles.numSelected]}>
                    {tab.dateNum}
                    </Text>
                </TouchableOpacity>
                );
            })}

            {/* "More soon" filler */}
            <View style={[styles.pill, styles.pillDivider, styles.fillerPill]}>
                <Text style={styles.fillerIcon}>📅</Text>
                <Text style={styles.fillerText}>{'More\nsoon'}</Text>
            </View>

            {/* Trailing spacer sized so last real date scrolls exactly to left slot */}
            <View style={{ width: trailingWidth }} />
            </ScrollView>
        </View>
        </View>
    );
};
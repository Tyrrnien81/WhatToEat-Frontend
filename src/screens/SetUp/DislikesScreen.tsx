import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import ProgressBar from './components/ProgressBar';
import ContinueButton from './components/ContinueButton';
import BackButton from './components/BackButton';
import SkipButton from './components/SkipButton';
import { styles } from './styles/DislikesScreen.styles';

type RootStackParamList = {
  Login: undefined; Signup: undefined; Onboarding: undefined; Home: undefined;
  Welcome: undefined; Birthday: undefined; Gender: undefined; Height: undefined;
  Weight: undefined; GoalWeight: undefined; Diet: undefined; Dislikes: undefined; Allergens: undefined;
};

type DislikesScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Dislikes'>;
};

type Category = {
  id: string;
  emoji: string;
  name: string;
  items: string[];
};

const CATEGORIES: Category[] = [
  { id: 'veg', emoji: '🥦', name: 'Vegetables', items: ['Broccoli', 'Mushroom', 'Eggplant', 'Garlic', 'Bell Peppers', 'Onions', 'Brussels sprouts'] },
  { id: 'pro', emoji: '🍖', name: 'Proteins', items: ['Chicken', 'Beef', 'Pork', 'Fish', 'Eggs', 'Tofu', 'Greek Yogurt', 'Beans / Legumes'] },
  { id: 'dai', emoji: '🥛', name: 'Dairy', items: ['Milk', 'Cheese', 'Yogurt', 'Butter', 'Cream'] },
  { id: 'her', emoji: '🌿', name: 'Herbs & Spices', items: ['Cilantro', 'Ginger', 'Spicy food / Chili', 'Basil', 'Parsley', 'Mint', 'Green Onions'] },
  { id: 'gra', emoji: '🌾', name: 'Grains & Carbs', items: ['White Rice', 'Bread', 'Pasta', 'Oats', 'Quinoa'] },
];

export default function DislikesScreen({ navigation }: DislikesScreenProps) {
  const [selected, setSelected]   = useState<Set<string>>(new Set());
  const [noDislikes, setNoDislikes] = useState(false);

  const toggleItem = (item: string) => {
    // Tapping a tag turns off "No dislikes"
    setNoDislikes(false);
    setSelected(prev => {
      const next = new Set(prev);
      next.has(item) ? next.delete(item) : next.add(item);
      return next;
    });
  };

  const toggleNoDislikes = () => {
    if (!noDislikes) {
      // Selecting "No dislikes" clears all tag selections
      setSelected(new Set());
      setNoDislikes(true);
    } else {
      setNoDislikes(false);
    }
  };

  const countForCategory = (cat: Category) =>
    cat.items.filter(item => selected.has(item)).length;

  // Continue is enabled when either "No dislikes" is chosen OR at least one tag is selected
  const canContinue = noDislikes || selected.size > 0;

  return (
    <SafeAreaView style={styles.safeArea}>

      <View style={styles.topRow}>
        <BackButton onPress={() => navigation.goBack()} />
        <SkipButton onPress={() => navigation.navigate('Allergens')} />
      </View>

      <ProgressBar progress="70%" step="Step 7 of 10" />

      <View style={styles.header}>
        <Text style={styles.title}>Dislikes</Text>
        <Text style={styles.subtitle}>Select any ingredients you'd like to avoid.</Text>
      </View>

      <ScrollView
        style={styles.scrollBody}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 16 }}
      >

        {/* ── No Dislikes Banner ── */}
        <TouchableOpacity
          style={[styles.noDislikesBtn, noDislikes && styles.noDislikesBtnSelected]}
          onPress={toggleNoDislikes}
          activeOpacity={0.8}
        >
          <Text style={styles.noDislikesEmoji}>👍</Text>
          <View style={styles.noDislikesTextWrap}>
            <Text style={[styles.noDislikesLabel, noDislikes && styles.noDislikesLabelSelected]}>
              No dislikes
            </Text>
            <Text style={styles.noDislikesDesc}>I eat everything — skip this step</Text>
          </View>
          <View style={[styles.noDislikesCheck, noDislikes && styles.noDislikesCheckSelected]}>
            {noDislikes && <Text style={styles.noDislikesCheckTick}>✓</Text>}
          </View>
        </TouchableOpacity>

        {/* ── Category Cards ── */}
        {CATEGORIES.map(cat => {
          const count = countForCategory(cat);
          return (
            <View key={cat.id} style={styles.categoryCard}>
              <View style={styles.categoryHeader}>
                <Text style={styles.categoryEmoji}>{cat.emoji}</Text>
                <Text style={styles.categoryName}>{cat.name}</Text>
                {count > 0 && (
                  <View style={styles.countBadge}>
                    <Text style={styles.countBadgeText}>{count} selected</Text>
                  </View>
                )}
              </View>
              <View style={styles.tagsWrap}>
                {cat.items.map(item => {
                  const isSel = selected.has(item);
                  return (
                    <TouchableOpacity
                      key={item}
                      style={[styles.tag, isSel && styles.tagSelected]}
                      onPress={() => toggleItem(item)}
                      activeOpacity={0.8}
                    >
                      <Text style={[styles.tagText, isSel && styles.tagTextSelected]}>{item}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          );
        })}

      </ScrollView>

      <ContinueButton
        onPress={() => navigation.navigate('Allergens')}
        disabled={!canContinue}
      />

    </SafeAreaView>
  );
}
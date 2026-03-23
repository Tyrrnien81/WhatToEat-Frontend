import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import ProgressBar from './components/ProgressBar';
import ContinueButton from './components/ContinueButton';
import BackButton from './components/BackButton';
import SkipButton from './components/SkipButton';
import { styles } from './styles/AllergensScreen.styles';

type RootStackParamList = {
  Login: undefined; Signup: undefined; Onboarding: undefined; Home: undefined;
  Welcome: undefined; Birthday: undefined; Gender: undefined; Height: undefined;
  Weight: undefined; GoalWeight: undefined; Diet: undefined; Dislikes: undefined;
  Allergens: undefined; DiningHall: undefined;
};

type AllergensScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Allergens'>;
};

const ALLERGENS = [
  { id: 'none',      label: 'Not a picky eater!', image: null, emoji: '😄' },
  { id: 'soy',       label: 'Soy',           image: require('../../../assets/Reference_Images/Allergens_Soy.png'),          emoji: null },
  { id: 'peanuts',   label: 'Peanuts',        image: require('../../../assets/Reference_Images/Allergens_Peanuts.png'),      emoji: null },
  { id: 'treenuts',  label: 'Tree nuts',      image: require('../../../assets/Reference_Images/Allergens_TreeNuts.png'),     emoji: null },
  { id: 'halal',     label: 'Halal',          image: require('../../../assets/Reference_Images/Allergens_Halal.png'),        emoji: null },
  { id: 'kosher',    label: 'Kosher',         image: require('../../../assets/Reference_Images/Allergens_Kosher.png'),       emoji: null },
  { id: 'dairy',     label: 'Dairy Free',     image: require('../../../assets/Reference_Images/Allergens_DairyFree.png'),    emoji: null },
  { id: 'gluten',    label: 'Gluten Free',    image: require('../../../assets/Reference_Images/Allergens_GlutenFree.png'),   emoji: null },
  { id: 'shellfish', label: 'Shellfish Free', image: require('../../../assets/Reference_Images/Allergens_ShellfishFree.png'), emoji: null },
  { id: 'fish',      label: 'Fish Free',      image: require('../../../assets/Reference_Images/Allergens_FishFree.png'),     emoji: null },
  { id: 'egg',       label: 'Egg Free',       image: require('../../../assets/Reference_Images/Allergens_EggFree.png'),      emoji: null },
  { id: 'other',     label: 'Other',          image: null, emoji: '···' },
];

export default function AllergensScreen({ navigation }: AllergensScreenProps) {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>

      <View style={styles.topRow}>
        <BackButton onPress={() => navigation.goBack()} />
        <SkipButton onPress={() => navigation.navigate('DiningHall')} />
      </View>

      <ProgressBar progress="80%" step="Step 8 of 10" />

      <View style={styles.header}>
        <Text style={styles.title}>Allergens</Text>
        <Text style={styles.subtitle}>Select foods that you avoid for faith or allergy reasons.</Text>
      </View>

      <ScrollView
        style={styles.scrollBody}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.gridContainer}
      >
        {Array.from({ length: Math.ceil(ALLERGENS.length / 2) }, (_, rowIdx) => (
          <View key={rowIdx} style={styles.gridRow}>
            {ALLERGENS.slice(rowIdx * 2, rowIdx * 2 + 2).map(item => {
              const isSel = selected.has(item.id);
              return (
                <TouchableOpacity
                  key={item.id}
                  style={[styles.allergenCard, isSel && styles.allergenCardSelected]}
                  onPress={() => toggle(item.id)}
                  activeOpacity={0.85}
                >
                  {/* ── Top row: name + check badge ── */}
                  <View style={styles.cardTopRow}>
                    <Text style={styles.allergenName}>{item.label}</Text>
                    <View style={[styles.checkBadge, isSel && styles.checkBadgeSel]}>
                      {isSel && <Text style={styles.checkMark}>✓</Text>}
                    </View>
                  </View>

                  {/* ── Bottom: image or emoji ── */}
                  {item.image ? (
                    <Image
                      source={item.image}
                      style={styles.allergenImage}
                      resizeMode="contain"
                    />
                  ) : (
                    <Text style={styles.allergenEmoji}>{item.emoji}</Text>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        ))}
      </ScrollView>

      {/* ── Disabled until at least one allergen is selected ── */}
      <ContinueButton
        onPress={() => navigation.navigate('DiningHall')}
        disabled={selected.size === 0}
      />

    </SafeAreaView>
  );
}
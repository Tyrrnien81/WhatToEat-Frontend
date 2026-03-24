import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import ProgressBar from './components/ProgressBar';
import ContinueButton from './components/ContinueButton';
import BackButton from './components/BackButton';
import SkipButton from './components/SkipButton';
import { COLORS } from '../../constants/COLORS';
import { styles } from './styles/DietScreen.styles';

// ─── Types ────────────────────────────────────────────────────────────────────
type RootStackParamList = {
  Login: undefined; Signup: undefined; Onboarding: undefined; Home: undefined;
  Welcome: undefined; Birthday: undefined; Gender: undefined; Height: undefined;
  Weight: undefined; GoalWeight: undefined; Diet: undefined; Dislikes: undefined;
};

type DietScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Diet'>;
};

type Diet = {
  id: string;
  image: any;
  name: string;
  tagline: string;
  shortDesc: string;
  desc: string;
  protein: number;
  carbs: number;
  fat: number;
  btnLabel: string;
};

const DIETS: Diet[] = [
  {
    id: 'balanced',
    image: require('../../../assets/Reference_Images/Diet_Balanced.png'),
    name: 'Balanced Diet', tagline: 'Well-rounded, everyday nutrition',
    shortDesc: 'Thoughtful, flexible portions',
    desc: 'A well-balanced diet for everyday health. Combines carbohydrates, protein, and fats in optimal proportions. Designed for sustainable and long-term nutrition.',
    protein: 25, carbs: 45, fat: 30, btnLabel: 'Select Balanced',
  },
  {
    id: 'highprotein',
    image: require('../../../assets/Reference_Images/Diet_HighProtein.png'),
    name: 'High Protein Diet', tagline: 'Muscle support, high satiety',
    shortDesc: 'Build muscle, stay full longer',
    desc: 'A protein-focused diet to support muscle and recovery. Helps increase satisfaction and maintain lean body mass. Ideal for strength, fitness, and active lifestyles.',
    protein: 40, carbs: 35, fat: 25, btnLabel: 'Select High Protein',
  },
  {
    id: 'vegan',
    image: require('../../../assets/Reference_Images/Diet_Vegan.png'),
    name: 'Vegan Diet', tagline: 'Plant-based, nutrient-rich',
    shortDesc: '100% plant-based, balanced nutrition',
    desc: 'A fully plant-based diet with no animal products. Focused on whole foods like vegetables, fruits, legumes, and grains. Supports balanced nutrition with high fiber and essential nutrients.',
    protein: 15, carbs: 55, fat: 30, btnLabel: 'Select Vegan',
  },
  {
    id: 'vegetarian',
    image: require('../../../assets/Reference_Images/Diet_Vegetarian.png'),
    name: 'Vegetarian Diet', tagline: 'Plant-forward, flexible nutrition',
    shortDesc: 'Plant-based, complex carbs',
    desc: 'A plant-forward diet that includes dairy and eggs. Provides balanced nutrition with a variety of plant and animal-based foods. A flexible option for healthy everyday eating.',
    protein: 20, carbs: 50, fat: 30, btnLabel: 'Select Vegetarian',
  },
];

// ─── Modal Inner Content (uses insets directly) ───────────────────────────────
function DietDetailModal({
  diet,
  selected,
  onClose,
  onConfirm,
}: {
  diet: Diet;
  selected: string | null;
  onClose: () => void;
  onConfirm: () => void;
}) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.safeArea,
        { paddingTop: insets.top, paddingBottom: insets.bottom },
      ]}
    >
      <BackButton onPress={onClose} />

      <ScrollView
        style={styles.scrollBody}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        {/* ── Real image in detail view ── */}
        <Image
          source={diet.image}
          style={styles.detailImage}
          resizeMode="contain"
        />

        <View style={styles.detailCard}>
          <Text style={styles.detailName}>{diet.name}</Text>
          <Text style={styles.detailTagline}>{diet.tagline}</Text>

          <View style={styles.macroBar}>
            <View style={[styles.macroSeg, { backgroundColor: COLORS.red,    flex: diet.protein }]} />
            <View style={[styles.macroSeg, { backgroundColor: COLORS.orange, flex: diet.carbs }]} />
            <View style={[styles.macroSeg, { backgroundColor: COLORS.teal,   flex: diet.fat }]} />
          </View>
          <View style={styles.macroLabels}>
            {[
              { color: COLORS.red,    label: `${diet.protein}% Protein` },
              { color: COLORS.orange, label: `${diet.carbs}% Carbs` },
              { color: COLORS.teal,   label: `${diet.fat}% Fat` },
            ].map(m => (
              <View key={m.label} style={styles.macroLabelItem}>
                <View style={[styles.macroLabelDot, { backgroundColor: m.color }]} />
                <Text style={styles.macroLabelText}>{m.label}</Text>
              </View>
            ))}
          </View>

          <View style={styles.detailDivider} />
          <Text style={styles.detailDesc}>{diet.desc}</Text>
        </View>
      </ScrollView>

      <TouchableOpacity
        style={[styles.continueBtn, selected === diet.id && styles.continueBtnGreen]}
        onPress={onConfirm}
        activeOpacity={0.85}
      >
        <Text style={styles.continueBtnText}>
          {selected === diet.id
            ? `✓ ${diet.name.replace(' Diet', '')} Selected`
            : diet.btnLabel}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function DietScreen({ navigation }: DietScreenProps) {
  const [selected, setSelected]     = useState<string | null>(null);
  const [detailDiet, setDetailDiet] = useState<Diet | null>(null);

  const handleConfirm = () => {
    if (detailDiet) {
      setSelected(detailDiet.id);
      setTimeout(() => setDetailDiet(null), 400);
    }
  };

  const handleCloseModal = () => setDetailDiet(null);

  return (
    <SafeAreaView style={styles.safeArea}>

      {/* ── Top Row: Back + Skip ── */}
      <View style={styles.topRow}>
        <BackButton onPress={() => navigation.goBack()} />
        <SkipButton onPress={() => navigation.navigate('Dislikes')} />
      </View>

      {/* ── Progress ── */}
      <ProgressBar progress="60%" step="Step 6 of 10" />

      {/* ── Header ── */}
      <View style={styles.header}>
        <Text style={styles.title}>Select your diet</Text>
        <Text style={styles.subtitle}>Which diet best fits your preference?</Text>
      </View>

      {/* ── List ── */}
      <ScrollView
        style={styles.scrollBody}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 16 }}
      >
        {DIETS.map(diet => {
          const isSel = selected === diet.id;
          return (
            <TouchableOpacity
              key={diet.id}
              style={[styles.dietRow, isSel && styles.dietRowSelected]}
              onPress={() => setSelected(diet.id)}
              activeOpacity={0.85}
            >
              <Image
                source={diet.image}
                style={styles.dietImage}
                resizeMode="contain"
              />
              <View style={styles.dietInfo}>
                <Text style={styles.dietName}>{diet.name.replace(' Diet', '')}</Text>
                <Text style={styles.dietDesc}>{diet.shortDesc}</Text>
                <TouchableOpacity onPress={() => setDetailDiet(diet)} activeOpacity={0.7}>
                  <Text style={styles.viewLink}>View diet →</Text>
                </TouchableOpacity>
              </View>
              <View style={[styles.checkBadge, isSel && styles.checkBadgeSel]}>
                {isSel && <Text style={styles.checkMark}>✓</Text>}
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* ── Continue — disabled until diet selected ── */}
      <ContinueButton
        onPress={() => navigation.navigate('Dislikes')}
        disabled={!selected}
      />

      {/* ── Detail Modal ── */}
      <Modal
        visible={!!detailDiet}
        animationType="slide"
        onRequestClose={handleCloseModal}
      >
        {detailDiet && (
          <DietDetailModal
            diet={detailDiet}
            selected={selected}
            onClose={handleCloseModal}
            onConfirm={handleConfirm}
          />
        )}
      </Modal>

    </SafeAreaView>
  );
}
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import ProgressBar from './components/ProgressBar';
import ContinueButton from './components/ContinueButton';
import BackButton from './components/BackButton';
import SkipButton from './components/SkipButton';
import { COLORS } from '../../constants/COLORS';
import { styles } from './styles/DietScreen.styles';

// ─── Types ────────────────────────────────────────────────────────────────────
type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  Onboarding: undefined;
  Home: undefined;
  Welcome: undefined;
  Birthday: undefined;
  Gender: undefined;
  Height: undefined;
  Weight: undefined;
  GoalWeight: undefined;
  Diet: undefined;
  Dislikes: undefined;
};

type DietScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Diet'>;
};

// ─── Diet Data ────────────────────────────────────────────────────────────────
type Diet = {
  id: string;
  emoji: string;
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
    id: 'balanced', emoji: '🥗',
    name: 'Balanced Diet', tagline: 'Well-rounded, everyday nutrition',
    shortDesc: 'Thoughtful, flexible portions',
    desc: 'A well-balanced diet for everyday health. Combines carbohydrates, protein, and fats in optimal proportions. Designed for sustainable and long-term nutrition.',
    protein: 25, carbs: 45, fat: 30, btnLabel: 'Select Balanced',
  },
  {
    id: 'highprotein', emoji: '🍗',
    name: 'High Protein Diet', tagline: 'Muscle support, high satiety',
    shortDesc: 'Build muscle, stay full longer',
    desc: 'A protein-focused diet to support muscle and recovery. Helps increase satisfaction and maintain lean body mass. Ideal for strength, fitness, and active lifestyles.',
    protein: 40, carbs: 35, fat: 25, btnLabel: 'Select High Protein',
  },
  {
    id: 'vegan', emoji: '🌱',
    name: 'Vegan Diet', tagline: 'Plant-based, nutrient-rich',
    shortDesc: '100% plant-based, balanced nutrition',
    desc: 'A fully plant-based diet with no animal products. Focused on whole foods like vegetables, fruits, legumes, and grains. Supports balanced nutrition with high fiber and essential nutrients.',
    protein: 15, carbs: 55, fat: 30, btnLabel: 'Select Vegan',
  },
  {
    id: 'vegetarian', emoji: '🥦',
    name: 'Vegetarian Diet', tagline: 'Plant-forward, flexible nutrition',
    shortDesc: 'Plant-based, complex carbs',
    desc: 'A plant-forward diet that includes dairy and eggs. Provides balanced nutrition with a variety of plant and animal-based foods. A flexible option for healthy everyday eating.',
    protein: 20, carbs: 50, fat: 30, btnLabel: 'Select Vegetarian',
  },
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function DietScreen({ navigation }: DietScreenProps) {
  const [selected, setSelected]     = useState<string | null>(null);
  const [detailDiet, setDetailDiet] = useState<Diet | null>(null);
  const [modalReady, setModalReady] = useState(false);

  const handleConfirm = () => {
    if (detailDiet) {
      setSelected(detailDiet.id);
      setTimeout(() => {
        setDetailDiet(null);
        setModalReady(false);
      }, 400);
    }
  };

  const handleCloseModal = () => {
    setDetailDiet(null);
    setModalReady(false);
  };

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
              <Text style={styles.dietEmoji}>{diet.emoji}</Text>
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

      {/* ── Continue ── */}
      <ContinueButton onPress={() => navigation.navigate('Dislikes')} />

      {/* ── Detail Modal ── */}
      <Modal
        visible={!!detailDiet}
        animationType="slide"
        onRequestClose={handleCloseModal}
        onShow={() => setTimeout(() => setModalReady(true), 100)}
      >
        {detailDiet && (
          <SafeAreaView style={styles.safeArea}>
            {modalReady ? (
              <>
                <BackButton onPress={handleCloseModal} />

                <ScrollView
                  style={styles.scrollBody}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{ paddingBottom: 24 }}
                >
                  <Text style={styles.detailEmoji}>{detailDiet.emoji}</Text>
                  <View style={styles.detailCard}>
                    <Text style={styles.detailName}>{detailDiet.name}</Text>
                    <Text style={styles.detailTagline}>{detailDiet.tagline}</Text>

                    <View style={styles.macroBar}>
                      <View style={[styles.macroSeg, { backgroundColor: COLORS.red,    flex: detailDiet.protein }]} />
                      <View style={[styles.macroSeg, { backgroundColor: COLORS.orange, flex: detailDiet.carbs }]} />
                      <View style={[styles.macroSeg, { backgroundColor: COLORS.teal,   flex: detailDiet.fat }]} />
                    </View>
                    <View style={styles.macroLabels}>
                      {[
                        { color: COLORS.red,    label: `${detailDiet.protein}% Protein` },
                        { color: COLORS.orange, label: `${detailDiet.carbs}% Carbs` },
                        { color: COLORS.teal,   label: `${detailDiet.fat}% Fat` },
                      ].map(m => (
                        <View key={m.label} style={styles.macroLabelItem}>
                          <View style={[styles.macroLabelDot, { backgroundColor: m.color }]} />
                          <Text style={styles.macroLabelText}>{m.label}</Text>
                        </View>
                      ))}
                    </View>

                    <View style={styles.detailDivider} />
                    <Text style={styles.detailDesc}>{detailDiet.desc}</Text>
                  </View>
                </ScrollView>

                <TouchableOpacity
                  style={[styles.continueBtn, selected === detailDiet.id && styles.continueBtnGreen]}
                  onPress={handleConfirm}
                  activeOpacity={0.85}
                >
                  <Text style={styles.continueBtnText}>
                    {selected === detailDiet.id
                      ? `✓ ${detailDiet.name.replace(' Diet', '')} Selected`
                      : detailDiet.btnLabel}
                  </Text>
                </TouchableOpacity>
              </>
            ) : (
              <View style={{ flex: 1, backgroundColor: COLORS.beige }} />
            )}
          </SafeAreaView>
        )}
      </Modal>

    </SafeAreaView>
  );
}
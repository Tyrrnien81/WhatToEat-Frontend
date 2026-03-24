import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../styles/ScanResultCard.styles';

type Props = {
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
  onDismiss: () => void;
};

// Shows the nutrition result card after a successful scan
export default function ScanResultCard({ kcal, protein, carbs, fat, onDismiss }: Props) {
  return (
    <TouchableOpacity style={styles.resultCard} onPress={onDismiss} activeOpacity={0.95}>
      <Text style={styles.resultKcal}>{kcal} kcal</Text>
      <View style={styles.macroRow}>
        <View style={styles.macroItem}>
          <Text style={styles.macroValue}>{protein}g</Text>
          <Text style={styles.macroLabel}>Protein</Text>
        </View>
        <View style={styles.macroItem}>
          <Text style={styles.macroValue}>{carbs}g</Text>
          <Text style={styles.macroLabel}>Carbs</Text>
        </View>
        <View style={styles.macroItem}>
          <Text style={styles.macroValue}>{fat}g</Text>
          <Text style={styles.macroLabel}>Fat</Text>
        </View>
      </View>
      <Text style={styles.resultNote}>Nutrition information is an estimate</Text>
    </TouchableOpacity>
  );
}
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../styles/ScanResultCard.styles';

type Props = {
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
  onDismiss: () => void;
  /** When set, shows a second control to POST /scan/log */
  onLogMeal?: () => void;
  logBusy?: boolean;
};

// Shows the nutrition result card after a successful scan
export default function ScanResultCard({
  kcal,
  protein,
  carbs,
  fat,
  onDismiss,
  onLogMeal,
  logBusy,
}: Props) {
  return (
    <View style={styles.resultCard}>
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
      {onLogMeal ? (
        <TouchableOpacity
          style={{ marginTop: 12, paddingVertical: 10, alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 12 }}
          onPress={onLogMeal}
          disabled={logBusy}
          activeOpacity={0.85}
        >
          <Text style={{ color: 'white', fontWeight: '800' }}>{logBusy ? 'Saving…' : 'Save to food log'}</Text>
        </TouchableOpacity>
      ) : null}
      <TouchableOpacity style={{ marginTop: 8, paddingVertical: 8 }} onPress={onDismiss} activeOpacity={0.85}>
        <Text style={{ color: 'white', textAlign: 'center', opacity: 0.85 }}>Dismiss</Text>
      </TouchableOpacity>
    </View>
  );
}
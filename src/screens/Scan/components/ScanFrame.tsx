import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../styles/ScanFrame.styles';

// Corner brackets + "Scan your meal" label overlay
export default function ScanFrame() {
  return (
    <View style={styles.scanFrame}>
      <View style={[styles.corner, styles.cornerTL]} />
      <View style={[styles.corner, styles.cornerTR]} />
      <View style={[styles.corner, styles.cornerBL]} />
      <View style={[styles.corner, styles.cornerBR]} />
      <Text style={styles.scanLabel}>Scan your meal</Text>
    </View>
  );
}
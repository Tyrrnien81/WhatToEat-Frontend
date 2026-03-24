import React from 'react';
import { View, Text, DimensionValue } from 'react-native';
import { styles } from '../styles/ProgressBar.styles';


type Props = {
  progress: DimensionValue;  // ← fix here
  step: string;
};

export default function ProgressBar({ progress, step }: Props) {
  return (
    <View style={styles.progressWrap}>
      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: progress }]} />
      </View>
      <Text style={styles.progressLabel}>{step}</Text>
    </View>
  );
}


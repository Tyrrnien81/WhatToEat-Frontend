import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../styles/ScanErrorCard.styles';

type Props = {
  onRetry: () => void;
};

// Shows the error card when scanning fails
export default function ScanErrorCard({ onRetry }: Props) {
  return (
    <View style={styles.errorCard}>
      <View style={styles.errorIconWrap}>
        <Text style={styles.errorIconText}>⚠️</Text>
      </View>
      <Text style={styles.errorTitle}>Scanning Failed</Text>
      <Text style={styles.errorDesc}>
        There was a problem analyzing your meal. Please try again.
      </Text>
      <TouchableOpacity style={styles.retryBtn} onPress={onRetry} activeOpacity={0.85}>
        <Text style={styles.retryBtnText}>Retry</Text>
      </TouchableOpacity>
    </View>
  );
}
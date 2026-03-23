import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { COLORS } from '../../../constants/COLORS';

type Props = {
  onPress: () => void;
};

export default function ReturnToLogin({ onPress }: Props) {
  return (
    <TouchableOpacity style={styles.returnRow} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.returnIconCircle}>
        <Text style={styles.returnIconText}>‹</Text>
      </View>
      <Text style={styles.returnText}>Return to login</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  returnRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
    borderTopWidth: 2,
    borderTopColor: 'rgba(42,26,26,0.1)',
  },
  returnIconCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  returnIconText: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.ink,
    lineHeight: 18,
  },
  returnText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.ink,
    letterSpacing: -0.3,
  },
});
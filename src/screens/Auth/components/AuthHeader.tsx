import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../../constants/COLORS';

type Props = {
  title: string;
  subtitle?: string;
};

export default function AuthHeader({ title, subtitle }: Props) {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.dividerLine} />
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 22,
    paddingBottom: 4,
    gap: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: COLORS.ink,
    letterSpacing: -1,
  },
  dividerLine: {
    height: 2,
    backgroundColor: COLORS.border,
    opacity: 0.1,
    borderRadius: 2,
  },
  subtitle: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.inkMuted,
    lineHeight: 18,
  },
});
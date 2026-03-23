import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../styles/AuthHeader.styles';

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
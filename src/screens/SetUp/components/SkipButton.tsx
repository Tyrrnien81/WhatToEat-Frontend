import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { styles } from '../styles/SkipButton.styles';


type Props = {
  onPress: () => void;
  label?: string;
};

export default function SkipButton({ onPress, label = 'Skip →' }: Props) {
  return (
    <TouchableOpacity style={styles.skipBtn} onPress={onPress} activeOpacity={0.7}>
      <Text style={styles.skipBtnText}>{label}</Text>
    </TouchableOpacity>
  );
}


import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { styles } from '../styles/ContinueButton.styles';


type Props = {
  label?: string;
  onPress: () => void;
  disabled?: boolean;
  marginTop?: number;
};

export default function ContinueButton({ label = 'Continue →', onPress, disabled = false, marginTop = 16,  }: Props) {
  return (
    <TouchableOpacity
      style={[styles.continueBtn, disabled && styles.continueBtnDisabled, { marginTop }]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.85}
    >
      <Text style={styles.continueBtnText}>{label}</Text>
    </TouchableOpacity>
  );
}

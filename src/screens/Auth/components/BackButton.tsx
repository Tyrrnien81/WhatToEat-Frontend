import React from 'react';
import { TouchableOpacity, Text} from 'react-native';
import { styles } from '../styles/BackButton.styles';


type Props = {
  onPress: () => void;
};

export default function BackButton({ onPress }: Props) {
  return (
    <TouchableOpacity style={styles.backBtn} onPress={onPress} activeOpacity={0.7}>
      <Text style={styles.backBtnText}>← Back</Text>
    </TouchableOpacity>
  );
}


import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { styles } from '../styles/ReturnToLogin.styles';


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


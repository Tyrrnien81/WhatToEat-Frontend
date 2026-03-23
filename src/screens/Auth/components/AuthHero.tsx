import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../styles/AuthHero.styles';


export default function AuthHero() {
  return (
    <View style={styles.hero}>
      <View style={styles.appIcon}>
        <Text style={styles.appIconEmoji}>🍽️</Text>
      </View>
      <Text style={styles.appTitle}>
        What<Text style={styles.appTitleAccent}>To</Text>Eat
      </Text>
      <Text style={styles.appTagline}>Your campus dining companion</Text>
    </View>
  );
}
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import ProgressBar from './components/ProgressBar';
import ContinueButton from './components/ContinueButton';
import BackButton from './components/BackButton';
import { styles } from './styles/DiningHallScreen.styles';

type RootStackParamList = {
  Login: undefined; Signup: undefined; Onboarding: undefined; Home: undefined;
  Welcome: undefined; Birthday: undefined; Gender: undefined; Height: undefined;
  Weight: undefined; GoalWeight: undefined; Diet: undefined; Dislikes: undefined;
  Allergens: undefined; DiningHall: undefined; PrivacyPolicy: undefined;
};

type DiningHallScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'DiningHall'>;
};

const MAX_SELECTIONS = 3;

const HALLS = [
  { id: 'gordon',   name: 'Gordon Avenue Market', logo: require('../../../assets/Reference_Images/DiningHall_GordonAvenueMarket.png') },
  { id: 'fourlakes',name: 'Four Lakes Market',    logo: require('../../../assets/Reference_Images/DiningHall_FourLakesMarket.png') },
  { id: 'liz',      name: "Liz's Market",         logo: require("../../../assets/Reference_Images/DiningHall_Liz'sMarket.png") },
  { id: 'rheta',    name: "Rheta's Market",        logo: require("../../../assets/Reference_Images/DiningHall_Rheta'sMarket.png") },
  { id: 'carson',   name: "Carson's Market",       logo: require("../../../assets/Reference_Images/DiningHall_Carson'sMarket.png") },
  { id: 'lowell',   name: 'Lowell Market',         logo: require('../../../assets/Reference_Images/DiningHall_LowellMarket.png') },
];

export default function DiningHallScreen({ navigation }: DiningHallScreenProps) {
  const [order, setOrder] = useState<string[]>([]);

  const toggle = (id: string) => {
    setOrder(prev => {
      const idx = prev.indexOf(id);
      if (idx !== -1) return prev.filter(h => h !== id);
      if (prev.length >= MAX_SELECTIONS) return prev;
      return [...prev, id];
    });
  };

  const getOrderNum = (id: string) => {
    const idx = order.indexOf(id);
    return idx !== -1 ? idx + 1 : null;
  };

  const isMaxed = order.length >= MAX_SELECTIONS;

  return (
    <SafeAreaView style={styles.safeArea}>

      <BackButton onPress={() => navigation.goBack()} />

      <ProgressBar progress="90%" step="Step 9 of 10" />

      <View style={styles.header}>
        <View style={styles.headerRow}>
          <Text style={styles.title}>Where is your favorite{'\n'}dining hall?</Text>
          {order.length > 0 && (
            <View style={[styles.counterBadge, order.length === MAX_SELECTIONS && styles.counterBadgeFull]}>
              <Text style={styles.counterBadgeText}>{order.length} / {MAX_SELECTIONS}</Text>
            </View>
          )}
        </View>
        <Text style={styles.subtitle}>Choose up to 3 dining halls in order.</Text>
      </View>

      <ScrollView
        style={styles.scrollBody}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.gridContainer}
      >
        {Array.from({ length: Math.ceil(HALLS.length / 2) }, (_, rowIdx) => (
          <View key={rowIdx} style={styles.gridRow}>
            {HALLS.slice(rowIdx * 2, rowIdx * 2 + 2).map(hall => {
              const num = getOrderNum(hall.id);
              const isSel = num !== null;
              const isDisabled = !isSel && isMaxed;
              return (
                <TouchableOpacity
                  key={hall.id}
                  style={[
                    styles.hallCard,
                    isSel && styles.hallCardSelected,
                    isDisabled && styles.hallCardMaxed,
                  ]}
                  onPress={() => toggle(hall.id)}
                  activeOpacity={isDisabled ? 1 : 0.85}
                  disabled={isDisabled}
                >
                  <View style={[styles.badge, isSel && styles.badgeSelected]}>
                    {isSel && <Text style={styles.badgeText}>{num}</Text>}
                  </View>
                  {/* ── Logo — larger size ── */}
                  <Image source={hall.logo} style={styles.hallLogo} resizeMode="contain" />
                  <Text style={styles.hallName}>{hall.name}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        ))}
      </ScrollView>

      <ContinueButton onPress={() => navigation.navigate('PrivacyPolicy')} />

    </SafeAreaView>
  );
}
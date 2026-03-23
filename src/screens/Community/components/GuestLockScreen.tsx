import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path, Circle } from 'react-native-svg';
import { styles } from '../styles/GuestLockScreen.styles';

type RootStackParamList = {
    Login: undefined;
    Signup: undefined;
    Home: undefined;
    };

    export const GuestLockScreen = () => {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    return (
        <View style={[styles.screen, { paddingTop: insets.top }]}>
        {/* Decorative top */}
        <View style={styles.illustrationWrap}>
            <Text style={styles.illustrationEmoji}>🔒</Text>
            <View style={styles.bubbleRow}>
            <View style={[styles.bubble, styles.bubble1]}>
                <Text style={styles.bubbleText}>🍜 Pad Thai at Rheta's!!</Text>
            </View>
            <View style={[styles.bubble, styles.bubble2]}>
                <Text style={styles.bubbleText}>🏛️ Gordon turkey breast 🔥</Text>
            </View>
            <View style={[styles.bubble, styles.bubble3]}>
                <Text style={styles.bubbleText}>🥗 Liz's salmon bowl 😍</Text>
            </View>
            </View>
        </View>

        {/* Message card */}
        <View style={styles.card}>
            <Text style={styles.title}>Join the conversation</Text>
            <Text style={styles.subtitle}>
            See what fellow Badgers are eating today, share your dining hall finds, and help each other eat better on campus.
            </Text>

            <TouchableOpacity
            style={styles.btnPrimary}
            onPress={() => navigation.navigate('Login')}
            activeOpacity={0.85}
            >
            <Text style={styles.btnPrimaryText}>Log in to continue</Text>
            </TouchableOpacity>

            <TouchableOpacity
            style={styles.btnSecondary}
            onPress={() => navigation.navigate('Signup')}
            activeOpacity={0.85}
            >
            <Text style={styles.btnSecondaryText}>Create an account →</Text>
            </TouchableOpacity>
        </View>

        <Text style={styles.hint}>You're currently browsing as a guest</Text>
        </View>
    );
};
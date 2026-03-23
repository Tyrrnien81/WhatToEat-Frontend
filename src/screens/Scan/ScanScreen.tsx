import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { CameraView, useCameraPermissions, CameraType } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { styles } from './styles/ScanScreen.styles';
import ScanFrame from './components/ScanFrame';
import ScanResultCard from './components/ScanResultCard';
import ScanErrorCard from './components/ScanErrorCard';
import ScanControls from './components/ScanControls';

// ─── Types ────────────────────────────────────────────────────────────────────
type ScanState = 'idle' | 'analyzing' | 'result' | 'error';

type NutritionResult = {
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
};

// ─── Component ────────────────────────────────────────────────────────────────
export default function ScanScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanState, setScanState]       = useState<ScanState>('idle');
  const [result, setResult]             = useState<NutritionResult | null>(null);
  const [facing, setFacing]             = useState<CameraType>('back'); // ← NEW

  // ── Flip front / back ────────────────────────────────────────────────────────
  const handleFlip = () => {
    setFacing(prev => (prev === 'back' ? 'front' : 'back'));
  };

  // ── Run scan ─────────────────────────────────────────────────────────────────
  const runScan = async () => {
    setScanState('analyzing');
    try {
      // TODO: Replace with real API call
      // const photo = await cameraRef.current.takePictureAsync();
      // const data  = await analyzeImage(photo.uri);
      await new Promise(resolve => setTimeout(resolve, 2500));

      setResult({ kcal: 750, protein: 40, carbs: 80, fat: 25 });
      setScanState('result');
    } catch {
      setScanState('error');
    }
  };

  // ── Upload from gallery ──────────────────────────────────────────────────────
  const handleUpload = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') return;

    const picked = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
    });

    if (!picked.canceled) runScan();
  };

  // ── Reset to idle ────────────────────────────────────────────────────────────
  const handleReset = () => {
    setScanState('idle');
    setResult(null);
  };

  // ── Permission loading ───────────────────────────────────────────────────────
  if (!permission) return <View style={styles.permissionContainer} />;

  // ── Permission denied ────────────────────────────────────────────────────────
  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <View style={styles.permissionCard}>
          <Text style={styles.permissionEmoji}>📷</Text>
          <Text style={styles.permissionTitle}>Camera Access Needed</Text>
          <Text style={styles.permissionDesc}>
            WhatToEat needs camera access to scan and analyze your meals.
          </Text>
          <TouchableOpacity
            style={styles.permissionBtn}
            onPress={requestPermission}
            activeOpacity={0.85}
          >
            <Text style={styles.permissionBtnText}>Grant Permission</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // ── Main Camera UI ───────────────────────────────────────────────────────────
  return (
    <View style={styles.container}>

      {/* ← facing prop now controls front/back */}
      <CameraView style={styles.camera} facing={facing}>

        {/* Corner brackets + label */}
        <ScanFrame />

        {/* Idle hint */}
        {scanState === 'idle' && (
          <Text style={styles.hintText}>Scan or upload a photo</Text>
        )}

        {/* Analyzing spinner */}
        {scanState === 'analyzing' && (
          <View style={styles.analyzingWrap}>
            <ActivityIndicator color="white" size="small" />
            <Text style={styles.analyzingText}>Analyzing...</Text>
          </View>
        )}

        {/* Result card */}
        {scanState === 'result' && result && (
          <ScanResultCard
            kcal={result.kcal}
            protein={result.protein}
            carbs={result.carbs}
            fat={result.fat}
            onDismiss={handleReset}
          />
        )}

        {/* Error card */}
        {scanState === 'error' && (
          <ScanErrorCard onRetry={handleReset} />
        )}

        {/* Controls — onFlip now toggles facing state */}
        <ScanControls
          isAnalyzing={scanState === 'analyzing'}
          onShutter={runScan}
          onUpload={handleUpload}
          onFlip={handleFlip}
        />

      </CameraView>
    </View>
  );
}
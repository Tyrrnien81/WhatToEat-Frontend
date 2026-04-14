import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { CameraView, useCameraPermissions, CameraType } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { styles } from './styles/ScanScreen.styles';
import ScanFrame from './components/ScanFrame';
import ScanResultCard from './components/ScanResultCard';
import ScanErrorCard from './components/ScanErrorCard';
import ScanControls from './components/ScanControls';
import { logScanResult, uploadFoodScan, type ScanItem } from '../../services/scanService';

type ScanState = 'idle' | 'analyzing' | 'result' | 'error';

type NutritionResult = {
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
};

export default function ScanScreen() {
  const cameraRef = useRef<CameraView | null>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [scanState, setScanState] = useState<ScanState>('idle');
  const [result, setResult] = useState<NutritionResult | null>(null);
  const [facing, setFacing] = useState<CameraType>('back');
  const [scanId, setScanId] = useState<string | null>(null);
  const [scanItems, setScanItems] = useState<ScanItem[]>([]);
  const [logBusy, setLogBusy] = useState(false);

  const handleFlip = () => {
    setFacing((prev) => (prev === 'back' ? 'front' : 'back'));
  };

  const analyzeUri = async (uri: string) => {
    setScanState('analyzing');
    try {
      const data = await uploadFoodScan(uri);
      setScanId(data.scanId);
      setScanItems(data.items ?? []);
      setResult({
        kcal: Math.round(data.summary.kcal),
        protein: Math.round(data.summary.protein),
        carbs: Math.round(data.summary.carbs),
        fat: Math.round(data.summary.fat),
      });
      setScanState('result');
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      Alert.alert('Scan failed', msg);
      setScanState('error');
    }
  };

  const runScan = async () => {
    try {
      const cam = cameraRef.current;
      if (cam && typeof (cam as CameraView).takePictureAsync === 'function') {
        const pic = await (cam as CameraView).takePictureAsync({ quality: 0.65, skipProcessing: false });
        if (pic?.uri) {
          await analyzeUri(pic.uri);
          return;
        }
      }
      Alert.alert('Camera', 'Could not capture a photo. Try upload from gallery.');
      setScanState('error');
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      Alert.alert('Camera error', msg);
      setScanState('error');
    }
  };

  const handleUpload = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') return;

    const picked = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
    });

    if (!picked.canceled && picked.assets[0]?.uri) {
      await analyzeUri(picked.assets[0].uri);
    }
  };

  const handleReset = () => {
    setScanState('idle');
    setResult(null);
    setScanId(null);
    setScanItems([]);
  };

  const handleLogMeal = async () => {
    if (!scanItems.length) {
      Alert.alert('Nothing to log', 'No scan items returned from the server.');
      return;
    }
    setLogBusy(true);
    try {
      await logScanResult({
        scanId: scanId ?? undefined,
        mealType: 'Snack',
        items: scanItems.map((i) => ({
          name: i.name,
          calories: i.calories,
          protein: i.protein,
          carbs: i.carbs,
          fat: i.fat,
        })),
      });
      Alert.alert('Saved', 'Meal added to your food log.');
      handleReset();
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      Alert.alert('Could not save log', msg);
    } finally {
      setLogBusy(false);
    }
  };

  if (!permission) return <View style={styles.permissionContainer} />;

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

  return (
    <View style={styles.container}>
      <CameraView ref={cameraRef} style={styles.camera} facing={facing}>
        <ScanFrame />

        {scanState === 'idle' && (
          <Text style={styles.hintText}>Scan or upload a photo</Text>
        )}

        {scanState === 'analyzing' && (
          <View style={styles.analyzingWrap}>
            <ActivityIndicator color="white" size="small" />
            <Text style={styles.analyzingText}>Analyzing...</Text>
          </View>
        )}

        {scanState === 'result' && result && (
          <ScanResultCard
            kcal={result.kcal}
            protein={result.protein}
            carbs={result.carbs}
            fat={result.fat}
            onDismiss={handleReset}
            onLogMeal={handleLogMeal}
            logBusy={logBusy}
          />
        )}

        {scanState === 'error' && <ScanErrorCard onRetry={handleReset} />}

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

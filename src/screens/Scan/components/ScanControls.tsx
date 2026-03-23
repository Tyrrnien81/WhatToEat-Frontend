import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../styles/ScanControls.styles';

type Props = {
  isAnalyzing: boolean;
  onShutter: () => void;
  onUpload: () => void;
  onFlip: () => void;   // ← renamed from onReset to onFlip
};

export default function ScanControls({ isAnalyzing, onShutter, onUpload, onFlip }: Props) {
  return (
    <View style={styles.bottomControls}>

      {/* Upload from gallery */}
      <TouchableOpacity style={styles.controlBtn} onPress={onUpload} activeOpacity={0.8}>
        <Text style={styles.controlBtnText}>🖼️</Text>
      </TouchableOpacity>

      {/* Shutter */}
      <TouchableOpacity
        style={[styles.shutterBtn, isAnalyzing && styles.shutterBtnDisabled]}
        onPress={onShutter}
        disabled={isAnalyzing}
        activeOpacity={0.85}
      >
        <View style={styles.shutterInner} />
      </TouchableOpacity>

      {/* Flip camera */}
      <TouchableOpacity style={styles.controlBtn} onPress={onFlip} activeOpacity={0.8}>
        <Text style={styles.controlBtnText}>🔄</Text>
      </TouchableOpacity>

    </View>
  );
}
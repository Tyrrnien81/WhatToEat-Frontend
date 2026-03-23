import React from 'react';
import { View, TextInput } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { styles } from '../styles/SearchBar.styles';

const C_BORDER = '#2A1A1A';
const C_MUTED = '#9A7070';

interface Props {
  value: string;
  onChange: (text: string) => void;
}

export const SearchBar = ({ value, onChange }: Props) => (
  <View style={styles.wrapper}>
    <Svg width={14} height={14} viewBox="0 0 24 24" fill="none" style={styles.icon}>
      <Path
        d="M21 21l-4.35-4.35M17 11A6 6 0 111 11a6 6 0 0116 0z"
        stroke={C_MUTED}
        strokeWidth={2.5}
        strokeLinecap="round"
      />
    </Svg>
    <TextInput
      style={styles.input}
      placeholder="Search posts..."
      placeholderTextColor={C_MUTED}
      value={value}
      onChangeText={onChange}
      returnKeyType="search"
    />
  </View>
);
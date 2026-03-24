import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  ScrollView, KeyboardAvoidingView, Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import { DiningHallTag } from '../types';
import { styles, TAG_COLORS } from '../styles/NewPostScreen.styles';

const ALL_TAGS: DiningHallTag[] = ['Gordon', "Rheta's", "Liz's", 'Four Lakes', "Carson's", 'Lowell'];

const TAG_EMOJI: Record<DiningHallTag, string> = {
  'Gordon': '🏛️',
  "Rheta's": '🍜',
  "Liz's": '🥗',
  'Four Lakes': '🏔️',
  "Carson's": '🌮',
  'Lowell': '🌿',
};

interface Props {
  onClose: () => void;
  onSubmit: (content: string, tag: DiningHallTag) => void;
}

export const NewPostScreen = ({ onClose, onSubmit }: Props) => {
  const insets = useSafeAreaInsets();
  const [content, setContent] = useState('');
  const [selectedTag, setSelectedTag] = useState<DiningHallTag | null>(null);
  const canPost = content.trim().length > 0 && selectedTag !== null;

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={[styles.screen, { paddingTop: insets.top }]}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.closeBtn} activeOpacity={0.7}>
            <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
              <Path d="M18 6L6 18M6 6l12 12" stroke="#1A0A0A" strokeWidth={2.5} strokeLinecap="round" />
            </Svg>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>New Post</Text>
          <TouchableOpacity
            style={[styles.postBtn, !canPost && styles.postBtnDisabled]}
            onPress={() => canPost && onSubmit(content, selectedTag!)}
            activeOpacity={0.85}
            disabled={!canPost}
          >
            <Text style={[styles.postBtnText, !canPost && styles.postBtnTextDisabled]}>
              Post
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.body} keyboardShouldPersistTaps="handled">
          {/* Tag selector — required */}
          <View style={styles.section}>
            <View style={styles.sectionLabelRow}>
              <Text style={styles.sectionLabel}>Dining Hall</Text>
              <Text style={styles.required}>* required</Text>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.tagRow}
            >
              {ALL_TAGS.map(tag => {
                const isSelected = selectedTag === tag;
                const color = TAG_COLORS[tag];
                return (
                  <TouchableOpacity
                    key={tag}
                    style={[
                      styles.tagChip,
                      isSelected && { backgroundColor: color.bg, borderColor: color.text },
                    ]}
                    onPress={() => setSelectedTag(tag)}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.tagEmoji}>{TAG_EMOJI[tag]}</Text>
                    <Text style={[styles.tagChipText, isSelected && { color: color.text, fontWeight: '800' }]}>
                      {tag}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>

          {/* Text input */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>What's on your mind?</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Share something about the food today... 🍽️"
              placeholderTextColor="#9A7070"
              multiline
              maxLength={280}
              value={content}
              onChangeText={setContent}
              textAlignVertical="top"
            />
            <Text style={styles.charCount}>{content.length}/280</Text>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};
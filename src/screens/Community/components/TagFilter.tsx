import React from 'react';
import { ScrollView, TouchableOpacity, Text } from 'react-native';
import { DiningHallTag } from '../types';
import { styles } from '../styles/TagFilter.styles';

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
  selected: DiningHallTag | null;
  onSelect: (tag: DiningHallTag | null) => void;
}

export const TagFilter = ({ selected, onSelect }: Props) => (
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    style={styles.scroll}
    contentContainerStyle={styles.row}
  >
    {/* All tab */}
    <TouchableOpacity
      style={[styles.tag, selected === null && styles.tagSelected]}
      onPress={() => onSelect(null)}
      activeOpacity={0.8}
    >
      <Text style={[styles.tagText, selected === null && styles.tagTextSelected]}>
        ✨ All
      </Text>
    </TouchableOpacity>

    {ALL_TAGS.map(tag => {
      const isSelected = selected === tag;
      return (
        <TouchableOpacity
          key={tag}
          style={[styles.tag, isSelected && styles.tagSelected]}
          onPress={() => onSelect(tag)}
          activeOpacity={0.8}
        >
          <Text style={[styles.tagText, isSelected && styles.tagTextSelected]}>
            {TAG_EMOJI[tag]} {tag}
          </Text>
        </TouchableOpacity>
      );
    })}
  </ScrollView>
);
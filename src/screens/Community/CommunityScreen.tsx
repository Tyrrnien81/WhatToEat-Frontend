import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import { useAuth } from '../../context/AuthContext';
import { DiningHallTag, Post } from './types';
import { MOCK_POSTS } from './data/MockPosts';
import { TagFilter } from './components/TagFilter';
import { SearchBar } from './components/SearchBar';
import { PostCard } from './components/PostCard';
import { NewPostScreen } from './components/NewPostScreen';
import { GuestLockScreen } from './components/GuestLockScreen';
import { styles } from './styles/CommunityScreen.styles';

export default function CommunityScreen() {
  const insets = useSafeAreaInsets();
  const { isGuest } = useAuth();

  // ── All hooks must be called before any conditional return ────────────────
  const [selectedTag, setSelectedTag] = useState<DiningHallTag | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [posts, setPosts] = useState<Post[]>(MOCK_POSTS);
  const [showNewPost, setShowNewPost] = useState(false);

  // Recursively search through replies at any depth
  const replyContainsKeyword = (replies: any[], keyword: string): boolean => {
    return replies.some(r =>
      r.content.toLowerCase().includes(keyword) ||
      r.author.toLowerCase().includes(keyword) ||
      (r.replies?.length && replyContainsKeyword(r.replies, keyword))
    );
  };

  const filteredPosts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return posts.filter(post => {
      const matchesTag = selectedTag === null || post.hallTag === selectedTag;
      const matchesSearch =
        q === '' ||
        post.content.toLowerCase().includes(q) ||
        post.author.toLowerCase().includes(q) ||
        replyContainsKeyword(post.replies ?? [], q);
      return matchesTag && matchesSearch;
    });
  }, [posts, selectedTag, searchQuery]);

  // ── Guest gate — AFTER all hooks ──────────────────────────────────────────
  if (isGuest) {
    return <GuestLockScreen />;
  }

  const handleNewPost = (content: string, tag: DiningHallTag) => {
    const newPost: Post = {
      id: Date.now().toString(),
      author: 'You',
      avatar: '😊',
      hallTag: tag,
      content,
      likes: 0,
      comments: 0,
      likedByMe: false,
      createdAt: 'Just now',
      replies: [],
    };
    setPosts(prev => [newPost, ...prev]);
    setShowNewPost(false);
  };

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.title}>Community</Text>
        <Text style={styles.subtitle}>{filteredPosts.length} posts · UW–Madison</Text>
      </View>

      <SearchBar value={searchQuery} onChange={setSearchQuery} />

      <View style={styles.tagSection}>
        <TagFilter selected={selectedTag} onSelect={setSelectedTag} />
      </View>

      <ScrollView
        style={styles.scrollBody}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {filteredPosts.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>🍽️</Text>
            <Text style={styles.emptyTitle}>No posts found</Text>
            <Text style={styles.emptySubtitle}>
              {searchQuery ? 'Try a different keyword' : 'Be the first to post!'}
            </Text>
          </View>
        ) : (
          filteredPosts.map(post => <PostCard key={post.id} post={post} />)
        )}
      </ScrollView>

      <TouchableOpacity
        style={[styles.fab, { bottom: insets.bottom + 16 }]}
        onPress={() => setShowNewPost(true)}
        activeOpacity={0.85}
      >
        <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
          <Path d="M12 5v14M5 12h14" stroke="white" strokeWidth={2.5} strokeLinecap="round" />
        </Svg>
      </TouchableOpacity>

      <Modal
        visible={showNewPost}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowNewPost(false)}
      >
        <NewPostScreen
          onClose={() => setShowNewPost(false)}
          onSubmit={handleNewPost}
        />
      </Modal>
    </View>
  );
}
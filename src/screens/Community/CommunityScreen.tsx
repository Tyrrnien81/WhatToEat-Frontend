import React, { useState, useMemo, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal, ActivityIndicator, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import Svg, { Path } from 'react-native-svg';
import { useAuth } from '../../context/AuthContext';
import { DiningHallTag, Post } from './types';
import { TagFilter } from './components/TagFilter';
import { SearchBar } from './components/SearchBar';
import { PostCard } from './components/PostCard';
import { NewPostScreen } from './components/NewPostScreen';
import { GuestLockScreen } from './components/GuestLockScreen';
import { styles } from './styles/CommunityScreen.styles';
import { createCommunityPost, displayHallToApi, listCommunityPosts } from '../../services/communityService';

export default function CommunityScreen() {
  const insets = useSafeAreaInsets();
  const { isGuest } = useAuth();

  const [selectedTag, setSelectedTag] = useState<DiningHallTag | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [posts, setPosts] = useState<Post[]>([]);
  const [showNewPost, setShowNewPost] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  const loadPosts = useCallback(async () => {
    setLoadError(null);
    try {
      const { posts: next } = await listCommunityPosts({ page: 1, limit: 50 });
      setPosts(next);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      setLoadError(msg);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      loadPosts();
    }, [loadPosts]),
  );

  const replyContainsKeyword = (replies: any[], keyword: string): boolean =>
    replies.some(
      (r) =>
        r.content.toLowerCase().includes(keyword) ||
        r.author.toLowerCase().includes(keyword) ||
        (r.replies?.length && replyContainsKeyword(r.replies, keyword)),
    );

  const filteredPosts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return posts.filter((post) => {
      const matchesTag = selectedTag === null || post.hallTag === selectedTag;
      const matchesSearch =
        q === '' ||
        post.content.toLowerCase().includes(q) ||
        post.author.toLowerCase().includes(q) ||
        replyContainsKeyword(post.replies ?? [], q);
      return matchesTag && matchesSearch;
    });
  }, [posts, selectedTag, searchQuery]);

  if (isGuest) {
    return <GuestLockScreen />;
  }

  const handleNewPost = async (content: string, tag: DiningHallTag) => {
    try {
      await createCommunityPost({
        content: content.trim(),
        hallTag: displayHallToApi(tag),
      });
      setShowNewPost(false);
      setRefreshing(true);
      await loadPosts();
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      Alert.alert('Could not post', msg);
    }
  };

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.title}>Community</Text>
        <Text style={styles.subtitle}>
          {loading ? 'Loading…' : `${filteredPosts.length} posts · UW–Madison`}
        </Text>
      </View>

      <SearchBar value={searchQuery} onChange={setSearchQuery} />

      <View style={styles.tagSection}>
        <TagFilter selected={selectedTag} onSelect={setSelectedTag} />
      </View>

      {loadError ? (
        <View style={{ paddingHorizontal: 20, paddingVertical: 8 }}>
          <Text style={{ color: '#B91C1C', fontSize: 13 }}>{loadError}</Text>
          <TouchableOpacity onPress={() => { setLoading(true); loadPosts(); }} style={{ marginTop: 8 }}>
            <Text style={{ fontWeight: '700', color: '#1A0A0A' }}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : null}

      <ScrollView
        style={styles.scrollBody}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {loading && !refreshing ? (
          <View style={[styles.emptyState, { paddingTop: 40 }]}>
            <ActivityIndicator size="large" color="#FF3347" />
          </View>
        ) : filteredPosts.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>🍽️</Text>
            <Text style={styles.emptyTitle}>No posts found</Text>
            <Text style={styles.emptySubtitle}>
              {searchQuery ? 'Try a different keyword' : 'Be the first to post!'}
            </Text>
          </View>
        ) : (
          filteredPosts.map((post) => <PostCard key={post.id} post={post} />)
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

import { BASE_URL, authHeaders, withAuthQuery } from './api';
import type { DiningHallTag, Post, Reply } from '../screens/Community/types';

const HALL_API_TO_DISPLAY: Record<string, DiningHallTag> = {
  gordon: 'Gordon',
  rheta: "Rheta's",
  liz: "Liz's",
  fourlakes: 'Four Lakes',
  carson: "Carson's",
  lowell: 'Lowell',
  'gordon-avenue-market': 'Gordon',
};

const HALL_DISPLAY_TO_API: Record<DiningHallTag, string> = {
  Gordon: 'gordon',
  "Rheta's": 'rheta',
  "Liz's": 'liz',
  'Four Lakes': 'fourlakes',
  "Carson's": 'carson',
  Lowell: 'lowell',
};

export function displayHallToApi(tag: DiningHallTag): string {
  return HALL_DISPLAY_TO_API[tag];
}

export function apiHallToDisplay(api: string | null | undefined): DiningHallTag {
  if (!api) return 'Gordon';
  const key = api.toLowerCase().replace(/\s+/g, '');
  const mapped =
    HALL_API_TO_DISPLAY[api] ||
    HALL_API_TO_DISPLAY[key] ||
    HALL_API_TO_DISPLAY[api.split('-')[0] || ''];
  return mapped ?? 'Gordon';
}

type ApiAuthor = { id: string; name: string };

type ApiReply = {
  id: string;
  author: ApiAuthor;
  content: string;
  likeCount: number;
  likedByMe: boolean;
  createdAt: string;
  replies: ApiReply[];
};

type ApiPost = {
  id: string;
  author: ApiAuthor;
  content: string;
  hallTag: string | null;
  imageUrl: string | null;
  likeCount: number;
  replyCount: number;
  createdAt: string;
  likedByMe: boolean;
};

function formatRelativeTime(iso: string): string {
  const t = new Date(iso).getTime();
  if (Number.isNaN(t)) return '';
  const diff = Date.now() - t;
  const m = Math.floor(diff / 60000);
  if (m < 1) return 'just now';
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return `${d}d ago`;
}

function mapReply(r: ApiReply): Reply {
  return {
    id: r.id,
    author: r.author.name,
    avatar: '🧑',
    content: r.content,
    likes: r.likeCount,
    likedByMe: r.likedByMe,
    createdAt: formatRelativeTime(r.createdAt),
    replies: (r.replies ?? []).map(mapReply),
  };
}

/** Feed list item: replies may be empty until post detail is loaded. */
export function mapApiPostToPost(p: ApiPost, replies: Reply[] = []): Post {
  return {
    id: p.id,
    author: p.author.name,
    avatar: '🧑‍🍳',
    hallTag: apiHallToDisplay(p.hallTag),
    content: p.content,
    likes: p.likeCount,
    comments: p.replyCount,
    likedByMe: p.likedByMe,
    createdAt: formatRelativeTime(p.createdAt),
    replies,
  };
}

export async function listCommunityPosts(params?: {
  page?: number;
  limit?: number;
  q?: string;
  hallTag?: string;
}): Promise<{ posts: Post[]; hasMore: boolean }> {
  const q = new URLSearchParams();
  if (params?.page) q.set('page', String(params.page));
  if (params?.limit) q.set('limit', String(params.limit));
  if (params?.q) q.set('q', params.q);
  if (params?.hallTag) q.set('hallTag', params.hallTag);
  const qs = q.toString();
  const path = `${BASE_URL}/community/posts${qs ? `?${qs}` : ''}`;
  const url = withAuthQuery(path);
  const res = await fetch(url, { headers: authHeaders(false) });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `List posts failed (${res.status})`);
  }
  const data = await res.json();
  const posts: ApiPost[] = data.posts ?? [];
  return {
    posts: posts.map((p) => mapApiPostToPost(p, [])),
    hasMore: Boolean(data.hasMore),
  };
}

export async function createCommunityPost(body: {
  content: string;
  hallTag: string;
  imageUrl?: string | null;
}): Promise<{ id: string }> {
  const url = withAuthQuery(`${BASE_URL}/community/posts`);
  const res = await fetch(url, {
    method: 'POST',
    headers: authHeaders(true),
    body: JSON.stringify({
      content: body.content,
      hallTag: body.hallTag,
      imageUrl: body.imageUrl ?? undefined,
    }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Create post failed (${res.status})`);
  }
  return res.json();
}

/** Full post + nested replies (same shape as feed items but with reply trees). */
export async function fetchCommunityPostDetail(postId: string): Promise<Post> {
  const url = withAuthQuery(`${BASE_URL}/community/posts/${postId}`);
  const res = await fetch(url, { headers: authHeaders(false) });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Get post failed (${res.status})`);
  }
  const data = await res.json();
  const p: ApiPost = data.post;
  const roots: ApiReply[] = data.replies ?? [];
  const replies = roots.map(mapReplyDeep);
  return mapApiPostToPost(p, replies);
}

function mapReplyDeep(r: ApiReply): Reply {
  return {
    id: r.id,
    author: r.author.name,
    avatar: '🧑',
    content: r.content,
    likes: r.likeCount,
    likedByMe: r.likedByMe,
    createdAt: formatRelativeTime(r.createdAt),
    replies: (r.replies ?? []).map(mapReplyDeep),
  };
}

export async function likeCommunityPost(postId: string): Promise<{ liked: boolean; likeCount: number }> {
  const url = withAuthQuery(`${BASE_URL}/community/posts/${postId}/likes`);
  const res = await fetch(url, { method: 'POST', headers: authHeaders(false) });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Like failed (${res.status})`);
  }
  return res.json();
}

export async function unlikeCommunityPost(postId: string): Promise<{ liked: boolean; likeCount: number }> {
  const url = withAuthQuery(`${BASE_URL}/community/posts/${postId}/likes`);
  const res = await fetch(url, { method: 'DELETE', headers: authHeaders(false) });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Unlike failed (${res.status})`);
  }
  return res.json();
}

export async function createPostReply(postId: string, content: string): Promise<{ id: string }> {
  const url = withAuthQuery(`${BASE_URL}/community/posts/${postId}/replies`);
  const res = await fetch(url, {
    method: 'POST',
    headers: authHeaders(true),
    body: JSON.stringify({ content }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Reply failed (${res.status})`);
  }
  return res.json();
}

export async function createReplyReply(parentReplyId: string, content: string): Promise<{ id: string }> {
  const url = withAuthQuery(`${BASE_URL}/community/replies/${parentReplyId}/replies`);
  const res = await fetch(url, {
    method: 'POST',
    headers: authHeaders(true),
    body: JSON.stringify({ content }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Reply failed (${res.status})`);
  }
  return res.json();
}

export async function likeReply(replyId: string): Promise<{ liked: boolean; likeCount: number }> {
  const url = withAuthQuery(`${BASE_URL}/community/replies/${replyId}/likes`);
  const res = await fetch(url, { method: 'POST', headers: authHeaders(false) });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Like reply failed (${res.status})`);
  }
  return res.json();
}

export async function unlikeReply(replyId: string): Promise<{ liked: boolean; likeCount: number }> {
  const url = withAuthQuery(`${BASE_URL}/community/replies/${replyId}/likes`);
  const res = await fetch(url, { method: 'DELETE', headers: authHeaders(false) });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Unlike reply failed (${res.status})`);
  }
  return res.json();
}

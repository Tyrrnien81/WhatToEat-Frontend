// ─── Community Types ──────────────────────────────────────────────────────────

export type DiningHallTag =
    | 'Gordon'
    | "Rheta's"
    | "Liz's"
    | 'Four Lakes'
    | "Carson's"
    | 'Lowell';

    export interface Reply {
    id: string;
    author: string;
    avatar: string;
    content: string;
    likes: number;
    likedByMe: boolean;
    createdAt: string;
    replies?: Reply[]; // nested replies
    }

    export interface Post {
    id: string;
    author: string;
    avatar: string;
    hallTag: DiningHallTag;
    content: string;
    likes: number;
    comments: number;
    likedByMe: boolean;
    createdAt: string;
    replies?: Reply[];
}
// Central API helper — all calls go through here
const BASE = (typeof window !== 'undefined' && (window.location.hostname.includes('rbvcanada.com') || window.location.hostname.includes('www.rbvcanada.com')))
  ? 'https://rbvcanada.com/backend/api'
  : (process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080/api');

function getToken(): string {
  if (typeof window === 'undefined') return '';
  return localStorage.getItem('rbv_token') ?? '';
}

async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getToken();
  const url = `${BASE}${path}`;
  try {
    const res = await fetch(url, {
      ...options,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(options.headers ?? {}),
      },
    });

    const json = await res.json();
    if (!json.success) throw new Error(json.error ?? 'Request failed');
    return json.data as T;
  } catch (err) {
    if (typeof window === 'undefined' && BASE !== 'https://rbvcanada.com/backend/api') {
      console.warn(`Local API request failed at build time: ${err instanceof Error ? err.message : err}. Retrying with production API...`);
      const prodUrl = `https://rbvcanada.com/backend/api${path}`;
      const res = await fetch(prodUrl, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...(options.headers ?? {}),
        },
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.error ?? 'Request failed');
      return json.data as T;
    }
    throw err;
  }
}

export const api = {
  // Auth
  login: (email: string, password: string) =>
    request<{ token: string; admin: Admin }>('/auth/login.php', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),
  me: () => request<Admin>('/auth/me.php'),

  // Stats
  stats: () => request<StatsData>('/stats/index.php'),

  // Categories
  getCategories: () => request<Category[]>('/categories/index.php'),
  getCategory:   (id: number) => request<Category>(`/categories/single.php?id=${id}`),
  getCategoryBySlug: (slug: string) => request<Category>(`/categories/single.php?slug=${encodeURIComponent(slug)}`),
  createCategory:(data: Partial<Category>) =>
    request<{ id: number; slug: string }>('/categories/index.php', { method: 'POST', body: JSON.stringify(data) }),
  updateCategory:(id: number, data: Partial<Category>) =>
    request<{ updated: boolean }>(`/categories/single.php?id=${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteCategory:(id: number) =>
    request<{ deleted: boolean }>(`/categories/single.php?id=${id}`, { method: 'DELETE' }),

  // Topics
  getTopics:   (categoryId?: number) =>
    request<Topic[]>(`/topics/index.php${categoryId ? `?category_id=${categoryId}` : ''}`),
  getTopic:    (id: number) => request<Topic>(`/topics/single.php?id=${id}`),
  getTopicBySlug: (slug: string) => request<Topic>(`/topics/single.php?slug=${encodeURIComponent(slug)}`),
  createTopic: (data: Partial<Topic>) =>
    request<{ id: number; slug: string }>('/topics/index.php', { method: 'POST', body: JSON.stringify(data) }),
  updateTopic: (id: number, data: Partial<Topic>) =>
    request<{ updated: boolean }>(`/topics/single.php?id=${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteTopic: (id: number) =>
    request<{ deleted: boolean }>(`/topics/single.php?id=${id}`, { method: 'DELETE' }),

  // Articles
  getArticles: (params?: { topic_id?: number; status?: string; page?: number }) => {
    const q = new URLSearchParams();
    if (params?.topic_id) q.set('topic_id', String(params.topic_id));
    if (params?.status)   q.set('status', params.status);
    if (params?.page)     q.set('page', String(params.page));
    return request<ArticleList>(`/articles/index.php?${q}`);
  },
  getArticle:    (id: number) => request<Article>(`/articles/single.php?id=${id}`),
  getArticleBySlug: (slug: string) => request<Article>(`/articles/single.php?slug=${encodeURIComponent(slug)}`),
  createArticle: (data: Partial<Article>) =>
    request<{ id: number; slug: string }>('/articles/index.php', { method: 'POST', body: JSON.stringify(data) }),
  updateArticle: (id: number, data: Partial<Article>) =>
    request<{ updated: boolean; slug: string }>(`/articles/single.php?id=${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteArticle: (id: number) =>
    request<{ deleted: boolean }>(`/articles/single.php?id=${id}`, { method: 'DELETE' }),

  // Media
  getMedia:    (page?: number) => request<MediaList>(`/media/index.php${page ? `?page=${page}` : ''}`),
  deleteMedia: (id: number) => request<{ deleted: boolean }>(`/media/index.php?id=${id}`, { method: 'DELETE' }),
  uploadMedia: async (file: File): Promise<MediaItem> => {
    const form = new FormData();
    form.append('file', file);
    const token = getToken();
    const res = await fetch(`${BASE}/media/upload.php`, {
      method: 'POST',
      credentials: 'include',
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: form,
    });
    const json = await res.json();
    if (!json.success) throw new Error(json.error ?? 'Upload failed');
    return json.data as MediaItem;
  },

  // Admins
  getAdmins:    () => request<AdminUser[]>('/admins/index.php'),
  createAdmin:  (data: Partial<AdminUser> & { password: string }) =>
    request<{ id: number }>('/admins/index.php', { method: 'POST', body: JSON.stringify(data) }),
  updateAdmin:  (id: number, data: Partial<AdminUser> & { password?: string }) =>
    request<{ updated: boolean }>(`/admins/single.php?id=${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteAdmin:  (id: number) =>
    request<{ deleted: boolean }>(`/admins/single.php?id=${id}`, { method: 'DELETE' }),

  // Activity
  getActivity: (page?: number) =>
    request<ActivityList>(`/activity/index.php${page ? `?page=${page}` : ''}`),
};

// ── Types ────────────────────────────────────────────────────
export interface Admin {
  id: number; name: string; email: string; role: string;
}
export interface AdminUser extends Admin {
  is_active: number; last_login: string; created_at: string;
}
export interface Category {
  id: number; name: string; slug: string; description: string;
  icon: string; sort_order: number; is_active: number;
  topic_count?: number; created_at: string;
}
export interface Topic {
  id: number; category_id: number; title: string; slug: string;
  description: string; sort_order: number; is_active: number;
  category_name?: string; article_count?: number; created_at: string;
}
export interface Section { heading: string; body: string; }
export interface Article {
  id: number; topic_id: number; title: string; slug: string;
  summary: string; content: string; featured_image: string;
  author: string; reviewed_date: string;
  status: 'draft' | 'published'; sort_order: number; views: number;
  topic_title?: string; category_name?: string;
  sections?: Section[]; created_at: string; updated_at: string;
}
export interface ArticleList {
  articles: Article[]; total: number; page: number;
  limit: number; total_pages: number;
}
export interface MediaItem {
  id: number; filename: string; url: string; original: string;
  mime_type: string; size_bytes: number; created_at: string;
  uploaded_by_name?: string;
}
export interface MediaList {
  media: MediaItem[]; total: number; page: number; total_pages: number;
}
export interface StatsData {
  stats: { categories: number; topics: number; articles: number;
           published: number; drafts: number; media: number; };
  recent_articles: Partial<Article>[];
  activity: { action: string; target: string; created_at: string; admin_name: string }[];
}
export interface ActivityList {
  logs: { id: number; action: string; target: string; created_at: string; admin_name: string }[];
  total: number; page: number; total_pages: number;
}

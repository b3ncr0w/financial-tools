export type SupportedLanguage = "en" | "pl";
export type Theme = "light" | "dark";

export interface Language {
  symbol: string;
  full: string;
}

export interface PageConfig {
  path: string;
  file: string;
}

export interface NavigationLink {
  text: string;
  url: string;
}

export interface ContentBlock {
  type: 'heading' | 'paragraph' | 'markdown';
  text: string;
}

export interface Article {
  id: string;
  title: string;
  description?: string;
  date: string;
  slug: string;
  content?: ContentBlock[];
  slugs?: Record<string, string>;
}

export interface HomePage {
  title?: string;
  description?: string;
  content?: ContentBlock[];
  articles?: Article[];
}

export interface Meta {
  title: string;
}

export interface CMS {
  navigation: NavigationLink[];
  home: HomePage;
  about: HomePage;
  meta: Meta;
  articles: Record<string, Article>;
}

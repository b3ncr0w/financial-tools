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

export interface ComponentProps {
  portfolio_modeling: {
    totalCapitalLabel?: string;
    addWalletLabel?: string;
    nameLabel?: string;
    percentageLabel?: string;
    totalPercentageLabel?: string;
    walletNamePlaceholder?: string;
    percentagePlaceholder?: string;
    totalCapitalPlaceholder?: string;
    defaultCapital?: number;
    defaultWallets?: Array<{
      name: string;
      percentage: number;
    }>;
  }
}

export interface ContentBlock {
  type: 'heading' | 'paragraph' | 'markdown' | 'component';
  text?: string;
  name?: string;
  props?: {
    totalCapitalLabel: string;
    addWalletLabel: string;
    nameLabel: string;
    percentageLabel: string;
    totalPercentageLabel: string;
    walletNamePlaceholder: string;
    percentagePlaceholder: string;
    totalCapitalPlaceholder: string;
    currentValueLabel: string;
    targetValueLabel: string;
    balanceLabel: string;
    buyLabel: string;
    sellLabel: string;
    defaultCapital?: number;
    defaultWallets?: Array<{
      name: string;
      percentage: number;
    }>;
    errorMessages: {
      exceedsTotal: string;
      belowTotal: string;
    };
  };
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

export interface Page {
  id: string;
  title: string;
  menuTitle?: string;  // Optional title for navigation
  order?: number;      // Optional order in navigation
  description?: string;
  slug: string;
  content?: ContentBlock[];
  slugs?: Record<string, string>;
  articles?: Article[];
  showArticles?: boolean;
}

export interface Meta {
  title: string;
}

export interface CMS {
  navigation: NavigationLink[];
  meta: Meta;
  articles: Record<string, Article>;
  pages: Record<string, Page>;
}

export interface CMSComponent {
  type: 'navigation';
  data?: NavigationLink[];
}

export interface Asset {
  id: string;
  name: string;
  percentage: number;
  currentValue: number;
}

export interface Wallet {
  id: string;
  name: string;
  percentage: number;
  currentValue: number;
  assets: Asset[];
}

export interface PortfolioModelingProps {
  // Główne etykiety
  totalCapitalLabel?: string;
  addWalletLabel?: string;
  buyLabel?: string;
  sellLabel?: string;
  addAssetLabel?: string;
  resetLabel?: string;
  autoCapitalLabel?: string;
  autoWalletLabel?: string;
  defaultAssetName?: string;
  defaultWalletName?: string;
  newPortfolioName?: string;
  autoFillButtonTitle?: string;

  // Komunikaty błędów
  walletErrorMessages?: {
    exceedsTotal: string;
    belowTotal: string;
  };
  assetErrorMessages?: {
    exceedsTotal: string;
    belowTotal: string;
  };

  // Wartości domyślne
  defaultCapital?: number;
  defaultWallets?: Array<{
    name: string;
    percentage: number;
    assets?: Array<{
      name: string;
      percentage: number;
      currentValue?: number;
    }>;
  }>;
  defaultAutoCapital?: boolean;
  defaultAutoWallet?: boolean;

  // Tooltips
  autoTooltip?: string;

  // Update defaultWallets to be an array of tab configurations
  defaultTabs?: Array<{
    name: string;
    wallets: Array<{
      name: string;
      percentage: number;
      assets?: Array<{
        name: string;
        percentage: number;
        currentValue?: number;
      }>;
    }>;
  }>;

  // Labels
  exportLabel?: string;
  importLabel?: string;

  toastDuration?: number;  // Optional duration in milliseconds
}

export interface TabData {
  wallets: Wallet[];
  totalCapital: number | null;
  autoCapital: boolean;
  autoWallet: boolean;
} 
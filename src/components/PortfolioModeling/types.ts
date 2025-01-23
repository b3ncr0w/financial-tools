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
  totalCapitalLabel?: string;
  addWalletLabel?: string;
  nameLabel?: string;
  percentageLabel?: string;
  totalPercentageLabel?: string;
  walletNamePlaceholder?: string;
  percentagePlaceholder?: string;
  totalCapitalPlaceholder?: string;
  currentValueLabel?: string;
  targetValueLabel?: string;
  balanceLabel?: string;
  buyLabel?: string;
  sellLabel?: string;
  useCurrentSumLabel?: string;
  addAssetLabel?: string;
  addAssetTooltip?: string;
  removeWalletTooltip?: string;
  removeAssetTooltip?: string;
  autoFillWalletTooltip?: string;
  autoFillAssetTooltip?: string;
  portfolioErrorMessages?: {
    exceedsTotal: string;
    belowTotal: string;
  };
  assetErrorMessages?: {
    exceedsTotal: string;
    belowTotal: string;
  };
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
  resetLabel?: string;
  autoCapitalLabel?: string;
  autoWalletLabel?: string;
  defaultAutoCapital?: boolean;
  defaultAutoWallet?: boolean;
} 
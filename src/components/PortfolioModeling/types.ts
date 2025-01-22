export interface Wallet {
  id: string;
  name: string;
  percentage: number;
  currentValue: number;
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
  defaultCapital?: number;
  defaultWallets?: Array<{
    name: string;
    percentage: number;
  }>;
  errorMessages?: {
    exceedsTotal: string;
    belowTotal: string;
  };
} 
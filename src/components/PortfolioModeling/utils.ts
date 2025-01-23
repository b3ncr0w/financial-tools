import { TabData, Wallet, Asset } from './types';

export const formatNumber = (value: number | null | undefined): string => {
  if (value === null || value === undefined) return '\u00A0-\u00A0';
  if (value === 0) return '0';
  
  // Check if number has decimal places
  return value % 1 === 0 ? value.toString() : value.toFixed(2);
};

export const prepareDataForExport = (tabData: TabData) => {
  const { wallets, totalCapital, autoCapital, autoWallet } = tabData;
  
  return {
    totalCapital,
    autoCapital,
    autoWallet,
    wallets: wallets.map((wallet: Wallet) => ({
      name: wallet.name,
      percentage: wallet.percentage,
      currentValue: wallet.currentValue,
      assets: wallet.assets.map((asset: Asset) => ({
        name: asset.name,
        percentage: asset.percentage,
        currentValue: asset.currentValue,
      })),
    })),
  };
}; 
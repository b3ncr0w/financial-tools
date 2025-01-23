import { useState, useEffect } from "react";
import {
  Container,
  BaseButton,
  TotalCapitalSection,
  TotalCapitalRow,
  Label,
  ActionsPanel,
  Toggle,
  LeftPanel,
  RightPanel
} from "./styled";
import { TotalCapital } from "./TotalCapital";
import { WalletItem } from "./WalletItem";
import { PortfolioSummary } from "./Summary";
import { Wallet, PortfolioModelingProps } from "./types";

export function PortfolioModeling(props: PortfolioModelingProps) {
  const {
    totalCapitalLabel = "Total Capital",
    addWalletLabel = "Add Wallet",
    nameLabel = "Name",
    percentageLabel = "Percentage",
    totalPercentageLabel = "Total Percentage",
    walletNamePlaceholder = "Enter wallet name",
    percentagePlaceholder = "Enter percentage",
    currentValueLabel = "Current Value",
    targetValueLabel = "Target Value",
    balanceLabel = "Balance",
    buyLabel = "Buy",
    sellLabel = "Sell",
    addAssetLabel = "+ Add asset",
    addAssetTooltip = "Add asset to wallet",
    removeWalletTooltip = "Remove wallet",
    removeAssetTooltip = "Remove asset",
    autoFillWalletTooltip = "Set to {value}%",
    autoFillAssetTooltip = "Set to {value}%",
    portfolioErrorMessages = {
      exceedsTotal: "Portfolio total exceeds 100% by {value}%",
      belowTotal: "Portfolio total is below 100% by {value}%"
    },
    assetErrorMessages = {
      exceedsTotal: "Assets total in wallet \"{wallet}\" exceeds 100% by {value}%",
      belowTotal: "Assets total in wallet \"{wallet}\" is below 100% by {value}%"
    },
    defaultCapital = 0,
    defaultWallets = [],
    autoCapitalLabel = "Auto Capital",
    autoWalletLabel = "Auto Wallet",
    defaultAutoCapital = false,
    defaultAutoWallet = false,
    resetLabel = "Resetuj",
  } = props;

  const [totalCapital, setTotalCapital] = useState<number>(defaultCapital);
  const [wallets, setWallets] = useState<Wallet[]>(
    (defaultWallets || []).map((wallet) => ({
      id: crypto.randomUUID(),
      name: wallet.name,
      percentage: wallet.percentage,
      currentValue: 0,
      assets: (wallet.assets || []).map(asset => ({
        id: crypto.randomUUID(),
        name: asset.name,
        percentage: asset.percentage,
        currentValue: asset.currentValue || 0,
      })),
    }))
  );
  const [autoCapital, setAutoCapital] = useState(defaultAutoCapital);
  const [autoWallet, setAutoWallet] = useState(defaultAutoWallet);

  useEffect(() => {
    if (autoCapital) {
      const sum = wallets.reduce((sum, wallet) => sum + wallet.currentValue, 0);
      if (sum > 0) {
        setTotalCapital(sum);
      }
    }
  }, [autoCapital, wallets]);

  useEffect(() => {
    if (autoWallet) {
      const updatedWallets = wallets.map(wallet => {
        const currentSum = wallet.assets.reduce((sum, asset) => sum + asset.currentValue, 0);
        if (wallet.currentValue !== currentSum) {
          return {
            ...wallet,
            currentValue: currentSum
          };
        }
        return wallet;
      });

      // Aktualizuj tylko jeśli są zmiany
      const hasChanges = updatedWallets.some(
        (wallet, i) => wallet.currentValue !== wallets[i].currentValue
      );
      
      if (hasChanges) {
        setWallets(updatedWallets);
      }
    }
  }, [autoWallet, wallets.map(w => w.assets.map(a => a.currentValue).join()).join()]);

  const addWallet = () => {
    setWallets([
      ...wallets,
      {
        id: crypto.randomUUID(),
        name: `Wallet ${wallets.length + 1}`,
        percentage: 0,
        currentValue: 0,
        assets: [],
      },
    ]);
  };

  const addAsset = (walletId: string) => {
    setWallets(
      wallets.map((wallet) =>
        wallet.id === walletId
          ? {
              ...wallet,
              assets: [
                ...wallet.assets,
                {
                  id: crypto.randomUUID(),
                  name: `Asset ${wallet.assets.length + 1}`,
                  percentage: 0,
                  currentValue: 0,
                },
              ],
            }
          : wallet
      )
    );
  };

  const updateWallet = (id: string, field: string, value: string | number) => {
    setWallets(
      wallets.map((wallet) =>
        wallet.id === id ? { ...wallet, [field]: value } : wallet
      )
    );
  };

  const updateAsset = (
    walletId: string,
    assetId: string,
    field: string,
    value: string | number
  ) => {
    setWallets(
      wallets.map((wallet) =>
        wallet.id === walletId
          ? {
              ...wallet,
              assets: wallet.assets.map((asset) =>
                asset.id === assetId ? { ...asset, [field]: value } : asset
              ),
            }
          : wallet
      )
    );
  };

  const removeWallet = (id: string) => {
    setWallets(wallets.filter((wallet) => wallet.id !== id));
  };

  const removeAsset = (walletId: string, assetId: string) => {
    setWallets(
      wallets.map((wallet) =>
        wallet.id === walletId
          ? {
              ...wallet,
              assets: wallet.assets.filter((asset) => asset.id !== assetId),
            }
          : wallet
      )
    );
  };

  const distributeRemaining = (walletId: string) => {
    const otherWallets = wallets.filter((w) => w.id !== walletId);
    const otherWalletsTotal = otherWallets.reduce(
      (sum, w) => sum + w.percentage,
      0
    );
    const remainingPercentage = 100 - otherWalletsTotal;

    setWallets(
      wallets.map((wallet) =>
        wallet.id === walletId
          ? { ...wallet, percentage: remainingPercentage }
          : wallet
      )
    );
  };

  const distributeAsset = (walletId: string, assetId: string) => {
    setWallets(
      wallets.map((wallet) => {
        if (wallet.id !== walletId) return wallet;

        const otherAssets = wallet.assets.filter((a) => a.id !== assetId);
        const otherAssetsTotal = otherAssets.reduce(
          (sum, a) => sum + a.percentage,
          0
        );
        const remainingPercentage = 100 - otherAssetsTotal;

        return {
          ...wallet,
          assets: wallet.assets.map((asset) =>
            asset.id === assetId
              ? { ...asset, percentage: remainingPercentage }
              : asset
          ),
        };
      })
    );
  };

  const getErrorMessage = () => {
    const diff = Math.abs(totalPercentage - 100).toFixed(1);
    return totalPercentage > 100
      ? `Suma procentów portfeli przekracza 100% o ${diff}%`
      : `Do 100% sumy portfeli brakuje ${diff}%`;
  };

  const totalPercentage = wallets.reduce(
    (sum, wallet) => sum + wallet.percentage,
    0
  );
  const isValid = totalPercentage === 100;

  const resetToDefault = () => {
    // Najpierw resetujemy wartości
    setWallets(
      (defaultWallets || []).map((wallet) => ({
        id: crypto.randomUUID(),
        name: wallet.name,
        percentage: wallet.percentage,
        currentValue: 0,
        assets: (wallet.assets || []).map(asset => ({
          id: crypto.randomUUID(),
          name: asset.name,
          percentage: asset.percentage,
          currentValue: asset.currentValue || 0,
        })),
      }))
    );
    setTotalCapital(defaultCapital);

    // Potem ustawiamy flagi
    setAutoCapital(defaultAutoCapital);
    setAutoWallet(defaultAutoWallet);
  };

  return (
    <Container>
      <LeftPanel>
        <ActionsPanel>
          <BaseButton onClick={resetToDefault}>
            {resetLabel}
          </BaseButton>
          <BaseButton onClick={addWallet}>
            {addWalletLabel}
          </BaseButton>
        </ActionsPanel>

        <TotalCapitalSection>
          <Label>{totalCapitalLabel}</Label>
          <TotalCapitalRow>
            <TotalCapital
              value={totalCapital}
              onChange={setTotalCapital}
              disabled={autoCapital}
            />
            <Toggle>
              <input
                type="checkbox"
                checked={autoCapital}
                onChange={(e) => setAutoCapital(e.target.checked)}
              />
              <span>{autoCapitalLabel}</span>
            </Toggle>
            <Toggle>
              <input
                type="checkbox"
                checked={autoWallet}
                onChange={(e) => setAutoWallet(e.target.checked)}
              />
              <span>{autoWalletLabel}</span>
            </Toggle>
          </TotalCapitalRow>
        </TotalCapitalSection>

        <PortfolioSummary
          totalPercentage={totalPercentage}
          isValid={isValid}
          label={totalPercentageLabel}
          errorMessage={getErrorMessage()}
        />
      </LeftPanel>

      <RightPanel>
          {wallets.map((wallet) => (
            <WalletItem
              key={wallet.id}
              wallet={wallet}
              isValid={isValid}
              totalPercentage={totalPercentage}
              targetValue={(totalCapital * wallet.percentage) / 100}
              labels={{
                name: nameLabel,
                percentage: percentageLabel,
                current: currentValueLabel,
                target: targetValueLabel,
                balance: balanceLabel,
                buy: buyLabel,
                sell: sellLabel,
                addAsset: addAssetLabel,
                addAssetTooltip,
                removeWalletTooltip,
                removeAssetTooltip,
                autoFillWalletTooltip,
                autoFillAssetTooltip,
              }}
              placeholders={{
                name: walletNamePlaceholder,
                percentage: percentagePlaceholder,
              }}
              errorMessages={{
                portfolio: portfolioErrorMessages,
                asset: assetErrorMessages,
              }}
              onUpdate={updateWallet}
              onRemove={removeWallet}
              onDistribute={distributeRemaining}
              onAddAsset={addAsset}
              onUpdateAsset={updateAsset}
              onRemoveAsset={removeAsset}
              onDistributeAsset={distributeAsset}
              autoWallet={autoWallet}
            />
          ))}
      </RightPanel>
    </Container>
  );
}

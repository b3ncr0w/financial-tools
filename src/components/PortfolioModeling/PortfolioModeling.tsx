import { useState } from "react";
import {
  Container,
  WalletList,
  BaseButton,
  TotalCapitalSection,
  TotalCapitalRow,
  Label
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
    totalCapitalPlaceholder = "Enter total capital",
    currentValueLabel = "Current Value",
    targetValueLabel = "Target Value",
    balanceLabel = "Balance",
    buyLabel = "Buy",
    sellLabel = "Sell",
    defaultCapital = 0,
    defaultWallets = [],
    errorMessages = {
      exceedsTotal: "Total exceeds 100% by {value}%",
      belowTotal: "Total is below 100% by {value}%",
    },
  } = props;

  const [totalCapital, setTotalCapital] = useState<number>(defaultCapital);
  const [wallets, setWallets] = useState<Wallet[]>(
    (defaultWallets || []).map((wallet) => ({
      id: crypto.randomUUID(),
      name: wallet.name,
      percentage: wallet.percentage,
      currentValue: 0,
      assets: [],
    }))
  );

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
      ? errorMessages.exceedsTotal.replace("{value}", diff)
      : errorMessages.belowTotal.replace("{value}", diff);
  };

  const totalPercentage = wallets.reduce(
    (sum, wallet) => sum + wallet.percentage,
    0
  );
  const isValid = totalPercentage === 100;

  const transferCurrentSum = () => {
    const currentSum = wallets.reduce(
      (sum, wallet) => sum + wallet.currentValue,
      0
    );
    setTotalCapital(currentSum);
  };

  return (
    <Container>
      <TotalCapitalSection>
        <Label>{totalCapitalLabel}</Label>
        <TotalCapitalRow>
          <TotalCapital
            value={totalCapital}
            onChange={setTotalCapital}
            placeholder={totalCapitalPlaceholder}
          />
          <BaseButton
            onClick={transferCurrentSum}
            title="Użyj sumy obecnych wartości jako kapitał całkowity"
          >
            Użyj sumy obecnych wartości portfeli
          </BaseButton>
        </TotalCapitalRow>
      </TotalCapitalSection>

      <WalletList>
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
            }}
            placeholders={{
              name: walletNamePlaceholder,
              percentage: percentagePlaceholder,
            }}
            onUpdate={updateWallet}
            onRemove={removeWallet}
            onDistribute={distributeRemaining}
            onAddAsset={addAsset}
            onUpdateAsset={updateAsset}
            onRemoveAsset={removeAsset}
            onDistributeAsset={distributeAsset}
          />
        ))}
      </WalletList>

      <BaseButton onClick={addWallet}>{addWalletLabel}</BaseButton>

      <PortfolioSummary
        totalPercentage={totalPercentage}
        isValid={isValid}
        label={totalPercentageLabel}
        errorMessage={getErrorMessage()}
      />
    </Container>
  );
}

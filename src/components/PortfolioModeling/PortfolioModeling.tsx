import { useState } from 'react';
import { Container, AddButton, WalletList, Header, HeaderLabel, TotalCapitalSection, TotalCapitalRow, TransferButton, Label } from './styled';
import { TotalCapital } from './TotalCapital';
import { WalletItem } from './WalletItem';
import { PortfolioSummary } from './Summary';
import { Wallet, PortfolioModelingProps } from './types';

export function PortfolioModeling(props: PortfolioModelingProps) {
  const {
    totalCapitalLabel = 'Total Capital',
    addWalletLabel = 'Add Wallet',
    nameLabel = 'Name',
    percentageLabel = 'Percentage',
    totalPercentageLabel = 'Total Percentage',
    walletNamePlaceholder = 'Enter wallet name',
    percentagePlaceholder = 'Enter percentage',
    totalCapitalPlaceholder = 'Enter total capital',
    currentValueLabel = 'Current Value',
    targetValueLabel = 'Target Value',
    balanceLabel = 'Balance',
    buyLabel = 'Buy',
    sellLabel = 'Sell',
    defaultCapital = 0,
    defaultWallets = [],
    errorMessages = {
      exceedsTotal: 'Total exceeds 100% by {value}%',
      belowTotal: 'Total is below 100% by {value}%'
    }
  } = props;

  const [totalCapital, setTotalCapital] = useState<number>(defaultCapital);
  const [wallets, setWallets] = useState<Wallet[]>(
    (defaultWallets || []).map(wallet => ({
      id: crypto.randomUUID(),
      name: wallet.name,
      percentage: wallet.percentage,
      currentValue: 0
    }))
  );

  const addWallet = () => {
    setWallets([
      ...wallets,
      { 
        id: crypto.randomUUID(),
        name: `Wallet ${wallets.length + 1}`,
        percentage: 0,
        currentValue: 0
      }
    ]);
  };

  const updateWallet = (id: string, field: string, value: string | number) => {
    setWallets(wallets.map(wallet => 
      wallet.id === id ? { ...wallet, [field]: value } : wallet
    ));
  };

  const removeWallet = (id: string) => {
    setWallets(wallets.filter(wallet => wallet.id !== id));
  };

  const distributeRemaining = (walletId: string) => {
    const otherWallets = wallets.filter(w => w.id !== walletId);
    const otherWalletsTotal = otherWallets.reduce((sum, w) => sum + w.percentage, 0);
    const remainingPercentage = 100 - otherWalletsTotal;

    setWallets(wallets.map(wallet => 
      wallet.id === walletId 
        ? { ...wallet, percentage: remainingPercentage }
        : wallet
    ));
  };

  const getErrorMessage = () => {
    const diff = Math.abs(totalPercentage - 100).toFixed(1);
    return totalPercentage > 100 
      ? errorMessages.exceedsTotal.replace('{value}', diff)
      : errorMessages.belowTotal.replace('{value}', diff);
  };

  const totalPercentage = wallets.reduce((sum, wallet) => sum + wallet.percentage, 0);
  const isValid = totalPercentage === 100;

  const transferCurrentSum = () => {
    const currentSum = wallets.reduce((sum, wallet) => sum + wallet.currentValue, 0);
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
          <TransferButton 
            onClick={transferCurrentSum}
            title="Użyj sumy obecnych wartości jako kapitał całkowity"
          >
            ↑ Użyj sumy
          </TransferButton>
        </TotalCapitalRow>
      </TotalCapitalSection>

      <Header>
        <HeaderLabel>{nameLabel}</HeaderLabel>
        <HeaderLabel>{percentageLabel}</HeaderLabel>
        <HeaderLabel>{currentValueLabel}</HeaderLabel>
        <HeaderLabel>{targetValueLabel}</HeaderLabel>
        <HeaderLabel />
      </Header>

      <WalletList>
        {wallets.map(wallet => (
          <WalletItem
            key={wallet.id}
            wallet={wallet}
            isValid={isValid}
            totalPercentage={totalPercentage}
            targetValue={totalCapital * wallet.percentage / 100}
            labels={{
              name: nameLabel,
              percentage: percentageLabel,
              current: currentValueLabel,
              target: targetValueLabel,
              balance: balanceLabel,
              buy: buyLabel,
              sell: sellLabel
            }}
            placeholders={{
              name: walletNamePlaceholder,
              percentage: percentagePlaceholder
            }}
            onUpdate={updateWallet}
            onRemove={removeWallet}
            onDistribute={distributeRemaining}
          />
        ))}
      </WalletList>

      <AddButton onClick={addWallet}>{addWalletLabel}</AddButton>

      <PortfolioSummary
        totalPercentage={totalPercentage}
        isValid={isValid}
        label={totalPercentageLabel}
        errorMessage={getErrorMessage()}
      />
    </Container>
  );
} 
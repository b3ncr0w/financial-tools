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
import { Tabs } from "./Tabs";

interface TabData {
  wallets: Wallet[];
  totalCapital: number;
  autoCapital: boolean;
  autoWallet: boolean;
}

export function PortfolioModeling(props: PortfolioModelingProps) {
  const {
    totalCapitalLabel = "Total Capital",
    addWalletLabel = "Add Wallet",
    buyLabel = "Buy",
    sellLabel = "Sell",
    addAssetLabel = "+ Add asset",
    walletErrorMessages = {
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
    defaultWalletName = "Wallet {number}",
    defaultAssetName = "Asset {number}",
  } = props;

  const [tabs, setTabs] = useState<Array<{ id: string; name: string }>>([
    { id: crypto.randomUUID(), name: 'Portfolio 1' }
  ]);
  const [activeTab, setActiveTab] = useState<string>(tabs[0].id);
  const [tabsData, setTabsData] = useState<Record<string, TabData>>({
    [tabs[0].id]: {
      wallets: defaultWallets.map(wallet => ({
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
      })),
      totalCapital: defaultCapital,
      autoCapital: defaultAutoCapital,
      autoWallet: defaultAutoWallet,
    }
  });

  const activeData = tabsData[activeTab];
  const { wallets, totalCapital, autoCapital, autoWallet } = activeData;

  const updateTabData = (data: Partial<TabData>) => {
    setTabsData({
      ...tabsData,
      [activeTab]: {
        ...tabsData[activeTab],
        ...data
      }
    });
  };

  const setWallets = (newWallets: Wallet[]) => {
    updateTabData({ wallets: newWallets });
  };

  const setTotalCapital = (value: number) => {
    updateTabData({ totalCapital: value });
  };

  const setAutoCapital = (value: boolean) => {
    updateTabData({ autoCapital: value });
  };

  const setAutoWallet = (value: boolean) => {
    updateTabData({ autoWallet: value });
  };

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
        // Jeśli nie ma assetów, użyj wartości docelowej
        if (wallet.assets.length === 0) {
          const targetValue = (totalCapital * wallet.percentage) / 100;
          if (wallet.currentValue !== targetValue) {
            return {
              ...wallet,
              currentValue: targetValue
            };
          }
          return wallet;
        }

        // Jeśli są assety, użyj ich sumy
        const assetsSum = wallet.assets.reduce((sum, asset) => sum + asset.currentValue, 0);
        if (wallet.currentValue !== assetsSum) {
          return {
            ...wallet,
            currentValue: assetsSum
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
  }, [autoWallet, totalCapital, wallets.map(w => [w.percentage, w.assets.map(a => a.currentValue).join()]).join()]);

  const addWallet = () => {
    setWallets([
      ...wallets,
      {
        id: crypto.randomUUID(),
        name: defaultWalletName.replace('{number}', String(wallets.length + 1)),
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
                  name: defaultAssetName.replace('{number}', String(wallet.assets.length + 1)),
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

  const getPortfolioError = () => {
    if (wallets.length === 0) return '';
    if (totalPercentage === 100) return '';
    
    const diff = Math.abs(totalPercentage - 100).toFixed(1);
    return totalPercentage > 100
      ? `Suma procentów portfeli przekracza 100% o ${diff}%`
      : `Do 100% sumy portfeli brakuje ${diff}%`;
  };

  const getAssetsError = () => {
    for (const wallet of wallets) {
      const assetsTotal = wallet.assets.reduce((sum, a) => sum + a.percentage, 0);
      if (assetsTotal !== 100 && wallet.assets.length > 0) {
        const diff = Math.abs(assetsTotal - 100).toFixed(1);
        return assetsTotal > 100
          ? `Suma procentów assetów w portfelu "${wallet.name}" przekracza 100% o ${diff}%`
          : `Do 100% sumy assetów w portfelu "${wallet.name}" brakuje ${diff}%`;
      }
    }
    return '';
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

  const addTab = () => {
    const newTab = {
      id: crypto.randomUUID(),
      name: `Portfolio ${tabs.length + 1}`
    };
    setTabs([...tabs, newTab]);
    setTabsData({
      ...tabsData,
      [newTab.id]: {
        wallets: [],
        totalCapital: defaultCapital,
        autoCapital: defaultAutoCapital,
        autoWallet: defaultAutoWallet,
      }
    });
    setActiveTab(newTab.id);
  };

  const removeTab = (id: string) => {
    if (tabs.length === 1) return;
    
    const newTabs = tabs.filter(tab => tab.id !== id);
    const newTabsData = { ...tabsData };
    delete newTabsData[id];
    
    setTabs(newTabs);
    setTabsData(newTabsData);
    
    if (activeTab === id) {
      setActiveTab(newTabs[0].id);
    }
  };

  const renameTab = (id: string, name: string) => {
    setTabs(tabs.map(tab => 
      tab.id === id ? { ...tab, name } : tab
    ));
  };

  return (
    <Container>
      <Tabs
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onAddTab={addTab}
        onRemoveTab={removeTab}
        onRenameTab={renameTab}
      />
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
          errorMessage={[getPortfolioError(), getAssetsError()].filter(Boolean)}
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
                buy: buyLabel,
                sell: sellLabel,
                addAsset: addAssetLabel,
              }}
              placeholders={{
                name: defaultWalletName.replace('{number}', String(wallets.indexOf(wallet) + 1)),
                percentage: defaultAssetName.replace('{number}', String(wallet.assets.length + 1)),
              }}
              errorMessages={{
                wallet: walletErrorMessages,
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

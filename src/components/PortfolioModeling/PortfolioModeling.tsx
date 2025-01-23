import { useState, useEffect, useCallback } from "react";
import {
  Container,
  BaseButton,
  TotalCapitalSection,
  TotalCapitalRow,
  Label,
  ActionsPanel,
  Toggle,
  TopPanel,
  BottomPanel,
} from "./styled";
import { TotalCapital } from "./TotalCapital";
import { WalletItem } from "./WalletItem";
import { Wallet, PortfolioModelingProps, TabData } from "./types";
import { Tabs } from "./Tabs";
import { InfoTooltip } from "./InfoTooltip";
import { prepareDataForExport } from "./utils";
import { Toast } from '../Toast/Toast';

const STORAGE_KEY = 'portfolio-modeling-state';

interface StoredState {
  tabs: Array<{ id: string; name: string }>;
  tabsData: Record<string, TabData>;
  activeTab: string;
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
      belowTotal: "Portfolio total is below 100% by {value}%",
    },
    assetErrorMessages = {
      exceedsTotal:
        'Assets total in wallet "{wallet}" exceeds 100% by {value}%',
      belowTotal: 'Assets total in wallet "{wallet}" is below 100% by {value}%',
    },
    defaultCapital = 0,
    defaultWallets = [],
    autoCapitalLabel = "Auto Capital",
    autoWalletLabel = "Auto Wallet",
    autoTooltip = "### Tryby automatyczne\n\n**Automatyczny kapitał**\n- Sumuje wartości wszystkich portfeli jako kapitał całkowity\n- Aktualizuje się automatycznie przy zmianie wartości portfeli\n\n**Automatyczny portfel**\n- Sumuje wartości walorów w portfelu jako wartość portfela\n- Aktualizuje się automatycznie przy zmianie wartości walorów",
    defaultAutoCapital = false,
    defaultAutoWallet = false,
    defaultWalletName = "Wallet {number}",
    defaultAssetName = "Walor {number}",
    newPortfolioName = "Portfolio {number}",
    autoFillButtonTitle = "Set to {value}%",
    defaultTabs = [
      {
        name: "Portfolio 1",
        wallets: defaultWallets || [],
      },
    ],
    exportLabel = "Eksportuj",
    importLabel = "Importuj",
  } = props;

  const [tabs, setTabs] = useState<Array<{ id: string; name: string }>>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const { tabs } = JSON.parse(stored) as StoredState;
        return tabs;
      }
    } catch (error) {
      console.error('Error loading tabs from localStorage:', error);
    }
    
    return defaultTabs.map((tab, index) => ({
      id: crypto.randomUUID(),
      name: tab.name || newPortfolioName.replace("{number}", String(index + 1)),
    }));
  });

  const [activeTab, setActiveTab] = useState<string>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const { activeTab } = JSON.parse(stored) as StoredState;
        return activeTab;
      }
    } catch (error) {
      console.error('Error loading activeTab from localStorage:', error);
    }
    
    return tabs[0].id;
  });

  const [tabsData, setTabsData] = useState<Record<string, TabData>>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const { tabsData } = JSON.parse(stored) as StoredState;
        return tabsData;
      }
    } catch (error) {
      console.error('Error loading tabsData from localStorage:', error);
    }

    const initialData: Record<string, TabData> = {};
    defaultTabs.forEach((tab, index) => {
      const tabId = tabs[index].id;
      initialData[tabId] = {
        wallets: tab.wallets.map((wallet) => ({
          id: crypto.randomUUID(),
          name: wallet.name,
          percentage: wallet.percentage,
          currentValue: 0,
          assets: (wallet.assets || []).map((asset) => ({
            id: crypto.randomUUID(),
            name: asset.name,
            percentage: asset.percentage,
            currentValue: asset.currentValue || 0,
          })),
        })),
        totalCapital: defaultCapital || null,
        autoCapital: defaultAutoCapital,
        autoWallet: defaultAutoWallet,
      };
    });
    return initialData;
  });

  const activeData = tabsData[activeTab];
  const { wallets, totalCapital, autoCapital, autoWallet } = activeData;

  const [toastMessages, setToastMessages] = useState<string[]>([]);

  const updateTabData = (data: Partial<TabData>) => {
    setTabsData({
      ...tabsData,
      [activeTab]: {
        ...tabsData[activeTab],
        ...data,
      },
    });
  };

  const setWallets = (newWallets: Wallet[]) => {
    updateTabData({ wallets: newWallets });
  };

  const setTotalCapital = (value: number | null) => {
    if (!autoCapital) {
      updateTabData({ totalCapital: value === 0 ? null : value });
    }
  };

  useEffect(() => {
    if (autoCapital) {
      const sum = wallets.reduce((sum, wallet) => sum + wallet.currentValue, 0);
      if (sum !== totalCapital) {
        updateTabData({ totalCapital: sum });
      }
    }
  }, [autoCapital, wallets.map((w) => w.currentValue).join()]);

  const setAutoCapital = (value: boolean) => {
    if (value) {
      const sum = wallets.reduce((sum, wallet) => sum + wallet.currentValue, 0);
      setTabsData({
        ...tabsData,
        [activeTab]: {
          ...tabsData[activeTab],
          autoCapital: value,
          totalCapital: sum > 0 ? sum : totalCapital,
        },
      });
    } else {
      setTabsData({
        ...tabsData,
        [activeTab]: {
          ...tabsData[activeTab],
          autoCapital: value,
        },
      });
    }
  };

  const setAutoWallet = (value: boolean) => {
    updateTabData({ autoWallet: value });
  };

  useEffect(() => {
    if (autoWallet) {
      const updatedWallets = wallets.map((wallet) => {
        // Update only wallets with assets
        if (wallet.assets.length > 0) {
          const assetsSum = wallet.assets.reduce(
            (sum, asset) => sum + asset.currentValue,
            0
          );
          if (wallet.currentValue !== assetsSum) {
            return {
              ...wallet,
              currentValue: assetsSum,
            };
          }
        }
        return wallet;
      });

      const hasChanges = updatedWallets.some(
        (wallet, i) => wallet.currentValue !== wallets[i].currentValue
      );

      if (hasChanges) {
        setWallets(updatedWallets);
      }
    }
  }, [
    autoWallet,
    JSON.stringify(
      wallets.map((w) => ({
        percentage: w.percentage,
        assetValues: w.assets.map((a) => a.currentValue),
      }))
    ),
  ]);

  const addWallet = () => {
    setWallets([
      ...wallets,
      {
        id: crypto.randomUUID(),
        name: defaultWalletName.replace("{number}", String(wallets.length + 1)),
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
                  name: defaultAssetName.replace(
                    "{number}",
                    String(wallet.assets.length + 1)
                  ),
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
    if (wallets.length === 0 || !totalCapital) return "";
    if (totalPercentage === 100) return "";

    const diff = Math.abs(totalPercentage - 100).toFixed(1);
    return totalPercentage > 100
      ? walletErrorMessages.exceedsTotal.replace("{value}", diff)
      : walletErrorMessages.belowTotal.replace("{value}", diff);
  };

  const getAssetsError = () => {
    const errors: string[] = [];

    for (const wallet of wallets) {
      const assetsTotal = wallet.assets.reduce(
        (sum, a) => sum + a.percentage,
        0
      );
      if (assetsTotal !== 100 && wallet.assets.length > 0) {
        const diff = Math.abs(assetsTotal - 100).toFixed(1);
        const error =
          assetsTotal > 100
            ? assetErrorMessages.exceedsTotal
                .replace("{wallet}", wallet.name)
                .replace("{value}", diff)
            : assetErrorMessages.belowTotal
                .replace("{wallet}", wallet.name)
                .replace("{value}", diff);
        errors.push(error);
      }
    }

    return errors;
  };

  const totalPercentage = wallets.reduce(
    (sum, wallet) => sum + wallet.percentage,
    0
  );
  const isValid = totalPercentage === 100;

  const addTab = () => {
    const newTab = {
      id: crypto.randomUUID(),
      name: newPortfolioName.replace("{number}", String(tabs.length + 1)),
    };
    setTabs([...tabs, newTab]);
    setTabsData({
      ...tabsData,
      [newTab.id]: {
        wallets: [],
        totalCapital: defaultCapital || null,
        autoCapital: defaultAutoCapital,
        autoWallet: defaultAutoWallet,
      },
    });
    setActiveTab(newTab.id);
  };

  const removeTab = (id: string) => {
    if (tabs.length === 1) return;

    const newTabs = tabs.filter((tab) => tab.id !== id);
    const newTabsData = { ...tabsData };
    delete newTabsData[id];

    setTabs(newTabs);
    setTabsData(newTabsData);

    if (activeTab === id) {
      setActiveTab(newTabs[0].id);
    }
  };

  const renameTab = (id: string, name: string) => {
    setTabs(tabs.map((tab) => (tab.id === id ? { ...tab, name } : tab)));
  };

  const handleExport = () => {
    const data = prepareDataForExport(tabsData[activeTab]);
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${
      tabs.find((t) => t.id === activeTab)?.name || "portfolio"
    }.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      try {
        if (!e.target?.result) return;
        const data = JSON.parse(e.target.result as string);
        const newTab = {
          id: crypto.randomUUID(),
          name: file.name.replace('.json', '')
        };

        setTabs([...tabs, newTab]);
        setTabsData({
          ...tabsData,
          [newTab.id]: {
            wallets: data.wallets.map((wallet: any) => ({
              id: crypto.randomUUID(),
              name: wallet.name,
              percentage: wallet.percentage,
              currentValue: wallet.currentValue || 0,
              assets: (wallet.assets || []).map((asset: any) => ({
                id: crypto.randomUUID(),
                name: asset.name,
                percentage: asset.percentage,
                currentValue: asset.currentValue || 0,
              })),
            })),
            totalCapital: data.totalCapital || null,
            autoCapital: data.autoCapital || false,
            autoWallet: data.autoWallet || false,
          }
        });
        setActiveTab(newTab.id);
      } catch (error) {
        setToastMessages(messages => [...messages, 'Error importing file']);
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  };

  useEffect(() => {
    const portfolioError = getPortfolioError();
    const assetsErrors = getAssetsError();
    
    const errors = [portfolioError, ...assetsErrors].filter(Boolean);
    
    // Only update if errors have changed
    setToastMessages(prevMessages => {
      const newMessages = errors.filter(error => !prevMessages.includes(error));
      const existingMessages = prevMessages.filter(msg => errors.includes(msg));
      return [...existingMessages, ...newMessages];
    });
  }, [wallets, totalCapital]);

  const dismissToast = useCallback((index: number) => {
    setToastMessages(messages => messages.filter((_, i) => i !== index));
  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    try {
      const state: StoredState = {
        tabs,
        tabsData,
        activeTab,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      console.error('Error saving state to localStorage:', error);
    }
  }, [tabs, tabsData, activeTab]);

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
      <TopPanel>
        <ActionsPanel>
          <BaseButton onClick={handleExport}>
            {exportLabel}
          </BaseButton>
          <BaseButton as="label">
            {importLabel}
            <input
              type="file"
              accept=".json"
              onChange={handleImport}
              style={{ display: "none" }}
            />
          </BaseButton>
          <BaseButton onClick={addWallet}>
            {addWalletLabel}
          </BaseButton>
        </ActionsPanel>

        <TotalCapitalSection>
          <Label>{totalCapitalLabel}</Label>
          <TotalCapitalRow>
            <TotalCapital
              value={totalCapital || undefined}
              onChange={setTotalCapital}
              disabled={autoCapital}
            />
            <div
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                gap: "16px"
              }}
            >
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
              <InfoTooltip text={autoTooltip} />
            </div>
          </TotalCapitalRow>
        </TotalCapitalSection>
      </TopPanel>

      <BottomPanel>
        {wallets.map((wallet) => (
          <WalletItem
            key={wallet.id}
            wallet={wallet}
            isValid={isValid}
            totalPercentage={totalPercentage}
            targetValue={((totalCapital || 0) * wallet.percentage) / 100}
            labels={{
              buy: buyLabel,
              sell: sellLabel,
              addAsset: addAssetLabel,
            }}
            placeholders={{
              name: defaultWalletName.replace(
                "{number}",
                String(wallets.indexOf(wallet) + 1)
              ),
              percentage: defaultAssetName.replace(
                "{number}",
                String(wallet.assets.length + 1)
              ),
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
            autoFillButtonTitle={autoFillButtonTitle}
          />
        ))}
      </BottomPanel>
      <Toast messages={toastMessages} onDismiss={dismissToast} />
    </Container>
  );
}

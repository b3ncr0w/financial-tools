import { 
  ItemContainer,
  CompactInput,
  AutoFillButton,
  ActionButton,
  ValueDisplay,
  Value,
  Balance,
  WalletAssets,
  AddAssetButton,
  WalletPanel,
  InputChangeEvent,
  NameColumn,
  PercentageColumn,
  ValueColumn,
  TargetColumn,
  ActionColumn,
  Summary,
  SummaryItem
} from './styled';
import { AssetItem } from './AssetItem';
import { Wallet } from './types';

interface WalletItemProps {
  wallet: Wallet;
  isValid: boolean;
  totalPercentage: number;
  targetValue: number;
  labels: {
    name: string;
    percentage: string;
    current: string;
    target: string;
    balance: string;
    buy: string;
    sell: string;
    addAsset: string;
    addAssetTooltip: string;
    removeWalletTooltip: string;
    removeAssetTooltip: string;
    autoFillWalletTooltip: string;
    autoFillAssetTooltip: string;
  };
  placeholders: {
    name: string;
    percentage: string;
  };
  errorMessages: {
    portfolio: {
      exceedsTotal: string;
      belowTotal: string;
    };
    asset: {
      exceedsTotal: string;
      belowTotal: string;
    };
  };
  onUpdate: (id: string, field: string, value: string | number) => void;
  onRemove: (id: string) => void;
  onDistribute: (id: string) => void;
  onAddAsset: (walletId: string) => void;
  onUpdateAsset: (walletId: string, assetId: string, field: string, value: string | number) => void;
  onRemoveAsset: (walletId: string, assetId: string) => void;
  onDistributeAsset: (walletId: string, assetId: string) => void;
  autoWallet: boolean;
}

export function WalletItem({
  wallet,
  isValid,
  totalPercentage,
  targetValue,
  labels,
  placeholders,
  onUpdate,
  onRemove,
  onDistribute,
  onAddAsset,
  onUpdateAsset,
  onRemoveAsset,
  onDistributeAsset,
  autoWallet
}: WalletItemProps) {
  const balance = targetValue - wallet.currentValue;
  const walletTargetValue = targetValue;

  const getAssetErrorMessage = () => {
    const assetsTotal = wallet.assets.reduce((sum, a) => sum + a.percentage, 0);
    const diff = Math.abs(assetsTotal - 100).toFixed(1);
    
    if (assetsTotal === 100) return null;
    
    return (
      <Summary>
        <SummaryItem>
          <span className="invalid">
            {assetsTotal > 100
              ? `Suma procentów assetów w portfelu "${wallet.name}" przekracza 100% o ${diff}%`
              : `Do 100% sumy assetów w portfelu "${wallet.name}" brakuje ${diff}%`
            }
          </span>
        </SummaryItem>
      </Summary>
    );
  };

  return (
    <WalletPanel>
      <ItemContainer>
        <NameColumn>
          <CompactInput
            type="text"
            value={wallet.name}
            onChange={(e: InputChangeEvent) => onUpdate(wallet.id, 'name', e.target.value)}
            placeholder={placeholders.name}
          />
        </NameColumn>
        <PercentageColumn>
          <CompactInput
            type="number"
            value={wallet.percentage || ''}
            onChange={(e: InputChangeEvent) => onUpdate(wallet.id, 'percentage', Number(e.target.value))}
            placeholder="0"
            min="0"
            max="100"
            step="5"
          />
        </PercentageColumn>
        {!isValid && (
          <AutoFillButton 
            onClick={() => onDistribute(wallet.id)}
            title={`Ustaw na ${(100 - (totalPercentage - wallet.percentage)).toFixed(1)}%`}
          >
            {totalPercentage > 100 
              ? `-${(totalPercentage - 100).toFixed(1)}` 
              : `+${(100 - totalPercentage).toFixed(1)}`
            }
          </AutoFillButton>
        )}
        <ValueColumn>
          <CompactInput
            type="number"
            value={wallet.currentValue || ''}
            onChange={(e: InputChangeEvent) => onUpdate(wallet.id, 'currentValue', Number(e.target.value))}
            placeholder="0"
            step="100"
            disabled={autoWallet}
          />
        </ValueColumn>
        <TargetColumn>
          <ValueDisplay>
            <Value>{isValid ? targetValue.toFixed(2) : '\u00A0-\u00A0'}</Value>
            <Balance $positive={balance > 0}>
              {isValid && balance !== 0 
                ? `${balance > 0 ? labels.buy : labels.sell}: ${Math.abs(balance).toFixed(2)}` 
                : '\u00A0-\u00A0'
              }
            </Balance>
          </ValueDisplay>
        </TargetColumn>
        <ActionColumn>
          <ActionButton onClick={() => onRemove(wallet.id)}>×</ActionButton>
        </ActionColumn>
      </ItemContainer>

      {wallet.assets.length > 0 && (
        <>
          <WalletAssets>
            {wallet.assets.map(asset => (
              <AssetItem
                key={asset.id}
                asset={asset}
                walletId={wallet.id}
                totalPercentage={wallet.assets.reduce((sum, a) => sum + a.percentage, 0)}
                targetValue={walletTargetValue * asset.percentage / 100}
                labels={labels}
                placeholders={placeholders}
                onUpdate={onUpdateAsset}
                onRemove={onRemoveAsset}
                onDistribute={onDistributeAsset}
              />
            ))}
          </WalletAssets>
          {getAssetErrorMessage()}
        </>
      )}

      <AddAssetButton 
        onClick={() => onAddAsset(wallet.id)}
        title="Dodaj asset do portfela"
      >
        + Dodaj asset
      </AddAssetButton>
    </WalletPanel>
  );
} 
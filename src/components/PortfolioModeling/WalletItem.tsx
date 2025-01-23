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
  InputChangeEvent
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
  };
  placeholders: {
    name: string;
    percentage: string;
  };
  onUpdate: (id: string, field: string, value: string | number) => void;
  onRemove: (id: string) => void;
  onDistribute: (id: string) => void;
  onAddAsset: (walletId: string) => void;
  onUpdateAsset: (walletId: string, assetId: string, field: string, value: string | number) => void;
  onRemoveAsset: (walletId: string, assetId: string) => void;
  onDistributeAsset: (walletId: string, assetId: string) => void;
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
  onDistributeAsset
}: WalletItemProps) {
  const balance = targetValue - wallet.currentValue;
  const walletTargetValue = targetValue;

  return (
    <WalletPanel>
      <ItemContainer>
        <CompactInput
          type="text"
          value={wallet.name}
          onChange={(e: InputChangeEvent) => onUpdate(wallet.id, 'name', e.target.value)}
          placeholder={placeholders.name}
        />

        <CompactInput
          type="number"
          value={wallet.percentage || ''}
          onChange={(e: InputChangeEvent) => onUpdate(wallet.id, 'percentage', Number(e.target.value))}
          placeholder="0"
          min="0"
          max="100"
          step="5"
        />
        {!isValid && (
          <AutoFillButton 
            onClick={() => onDistribute(wallet.id)}
            title={`${(100 - (totalPercentage - wallet.percentage)).toFixed(1)}%`}
          >
            →
          </AutoFillButton>
        )}

        <CompactInput
          type="number"
          value={wallet.currentValue || ''}
          onChange={(e: InputChangeEvent) => onUpdate(wallet.id, 'currentValue', Number(e.target.value))}
          placeholder="0"
          step="100"
        />

        <ValueDisplay>
          <Value>{isValid ? targetValue.toFixed(2) : '-'}</Value>
          <Balance $positive={balance > 0}>
            {isValid ? `${balance > 0 ? labels.buy : labels.sell}: ${Math.abs(balance).toFixed(2)}` : '-'}
          </Balance>
        </ValueDisplay>

        <ActionButton onClick={() => onRemove(wallet.id)}>×</ActionButton>
      </ItemContainer>

      {wallet.assets.length > 0 && (
        <WalletAssets>
          {wallet.assets.map(asset => (
            <AssetItem
              key={asset.id}
              asset={asset}
              walletId={wallet.id}
              isValid={isValid}
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
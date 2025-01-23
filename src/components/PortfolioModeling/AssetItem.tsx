import { 
  ItemContainer,
  CompactInput,
  ActionButton,
  ValueDisplay,
  Value,
  Balance
} from './styled';
import { Asset } from './types';
import { InputChangeEvent } from './styled/common';

interface AssetItemProps {
  asset: Asset;
  walletId: string;
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
  };
  onUpdate: (walletId: string, assetId: string, field: string, value: string | number) => void;
  onRemove: (walletId: string, assetId: string) => void;
  onDistribute: (walletId: string, assetId: string) => void;
}

export function AssetItem({
  asset,
  walletId,
  isValid,
  targetValue,
  labels,
  placeholders,
  onUpdate,
  onRemove,
}: AssetItemProps) {
  const balance = targetValue - asset.currentValue;

  return (
    <ItemContainer>
      <CompactInput
        type="text"
        value={asset.name}
        onChange={(e: InputChangeEvent) => onUpdate(walletId, asset.id, 'name', e.target.value)}
        placeholder={placeholders.name}
      />

      <CompactInput
        type="number"
        value={asset.percentage || ''}
        onChange={(e: InputChangeEvent) => onUpdate(walletId, asset.id, 'percentage', Number(e.target.value))}
        placeholder="0"
        min="0"
        max="100"
        step="5"
      />

      <CompactInput
        type="number"
        value={asset.currentValue || ''}
        onChange={(e: InputChangeEvent) => onUpdate(walletId, asset.id, 'currentValue', Number(e.target.value))}
        placeholder="0"
        step="100"
      />

      <ValueDisplay>
        <Value>{isValid ? targetValue.toFixed(2) : '-'}</Value>
        <Balance $positive={balance > 0}>
          {isValid ? `${balance > 0 ? labels.buy : labels.sell}: ${Math.abs(balance).toFixed(2)}` : '-'}
        </Balance>
      </ValueDisplay>

      <ActionButton onClick={() => onRemove(walletId, asset.id)}>×</ActionButton>
    </ItemContainer>
  );
} 
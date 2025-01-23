import { 
  ItemContainer,
  CompactInput,
  ActionButton,
  AutoFillButton,
  ValueDisplay,
  Value,
  Balance,
  InputChangeEvent,
  NameColumn,
  PercentageColumn,
  ValueColumn,
  TargetColumn,
  ActionColumn
} from './styled';
import { Asset } from './types';
import { formatNumber } from './utils';

interface AssetItemProps {
  asset: Asset;
  walletId: string;
  totalPercentage: number;
  targetValue: number;
  labels: {
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
  totalPercentage,
  targetValue,
  labels,
  placeholders,
  onUpdate,
  onRemove,
  onDistribute,
}: AssetItemProps) {
  const balance = targetValue - asset.currentValue;
  const assetsValid = totalPercentage === 100;

  return (
    <ItemContainer>
      <NameColumn>
        <CompactInput
          type="text"
          value={asset.name}
          onChange={(e: InputChangeEvent) => onUpdate(walletId, asset.id, 'name', e.target.value)}
          placeholder={placeholders.name}
        />
      </NameColumn>

      <PercentageColumn>
        <CompactInput
          type="number"
          value={asset.percentage || ''}
          onChange={(e: InputChangeEvent) => onUpdate(walletId, asset.id, 'percentage', Number(e.target.value))}
          placeholder="0"
          min="0"
          max="100"
          step="5"
        />
        {!assetsValid && (
          <AutoFillButton 
            onClick={() => onDistribute(walletId, asset.id)}
          >
            {totalPercentage > 100 
              ? `-${(totalPercentage - 100)}` 
              : `+${(100 - totalPercentage)}` + '%'
            }
          </AutoFillButton>
        )}
      </PercentageColumn>

      <ValueColumn>
        <CompactInput
          type="number"
          value={asset.currentValue || ''}
          onChange={(e: InputChangeEvent) => onUpdate(walletId, asset.id, 'currentValue', Number(e.target.value))}
          placeholder="0"
          step="100"
        />
      </ValueColumn>

      <TargetColumn>
        <ValueDisplay>
          <Value>{assetsValid ? formatNumber(targetValue) : '\u00A0-\u00A0'}</Value>
          {assetsValid && balance !== 0 && asset.currentValue > 0 && (
            <Balance $positive={balance >= 0} $isAsset>
              {balance === 0 ? '' : `${balance > 0 ? labels.buy : labels.sell}: ${formatNumber(Math.abs(balance))}`}
            </Balance>
          )}
        </ValueDisplay>
      </TargetColumn>

      <ActionColumn>
        <ActionButton onClick={() => onRemove(walletId, asset.id)}>×</ActionButton>
      </ActionColumn>
    </ItemContainer>
  );
} 
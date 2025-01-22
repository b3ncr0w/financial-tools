import { 
  WalletItemContainer, 
  CompactInput,
  PercentageInputGroup,
  AutoFillButton,
  ActionButton,
  InputChangeEvent,
  ValueDisplay,
  Value,
  Balance
} from './styled';
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
  onDistribute
}: WalletItemProps) {
  const balance = targetValue - wallet.currentValue;

  return (
    <WalletItemContainer>
      <CompactInput
        type="text"
        value={wallet.name}
        onChange={(e: InputChangeEvent) => onUpdate(wallet.id, 'name', e.target.value)}
        placeholder={placeholders.name}
      />

      <PercentageInputGroup>
        <CompactInput
          type="number"
          value={wallet.percentage || ''}
          onChange={(e: InputChangeEvent) => onUpdate(wallet.id, 'percentage', Number(e.target.value))}
          placeholder={placeholders.percentage}
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
      </PercentageInputGroup>

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

      <ActionButton onClick={() => onRemove(wallet.id)} title="Usuń">×</ActionButton>
    </WalletItemContainer>
  );
} 
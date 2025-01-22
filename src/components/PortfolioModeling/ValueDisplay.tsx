import { ValueDisplay as StyledValueDisplay, ValueLabel, Value, Balance } from './styled';

interface ValueDisplayProps {
  targetValue: number;
  balance: number;
  isValid: boolean;
  labels: {
    target: string;
    buy: string;
    sell: string;
  };
}

export function ValueDisplay({ targetValue, balance, isValid, labels }: ValueDisplayProps) {
  return (
    <StyledValueDisplay>
      <ValueLabel>{labels.target}:</ValueLabel>
      <Value>{isValid ? targetValue.toFixed(2) : '-'}</Value>
      <Balance $positive={balance > 0}>
        {isValid ? `${balance > 0 ? labels.buy : labels.sell}: ${Math.abs(balance).toFixed(2)}` : '-'}
      </Balance>
    </StyledValueDisplay>
  );
} 
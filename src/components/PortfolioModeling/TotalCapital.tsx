import { CompactInput, InputChangeEvent } from './styled';

interface TotalCapitalProps {
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
}

export function TotalCapital({ value, onChange, disabled }: TotalCapitalProps) {
  return (
    <CompactInput
      type="number"
      value={value}
      onChange={(e: InputChangeEvent) => onChange(Number(e.target.value))}
      disabled={disabled}
    />
  );
} 
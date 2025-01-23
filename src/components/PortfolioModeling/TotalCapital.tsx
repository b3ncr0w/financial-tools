import { CompactInput, InputChangeEvent } from './styled';

interface TotalCapitalProps {
  value: number | undefined;
  onChange: (value: number | null) => void;
  disabled?: boolean;
}

export function TotalCapital({ value, onChange, disabled }: TotalCapitalProps) {
  return (
    <CompactInput
      type="number"
      value={value ?? ''}
      onChange={(e: InputChangeEvent) => {
        const newValue = e.target.value === '' ? null : Number(e.target.value);
        onChange(newValue);
      }}
      placeholder="0"
      disabled={disabled}
    />
  );
} 
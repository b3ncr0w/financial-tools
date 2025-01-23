import { CompactInput } from './styled';
import { InputChangeEvent } from './styled/common';

interface TotalCapitalProps {
  value: number;
  onChange: (value: number) => void;
  placeholder: string;
}

export function TotalCapital({ value, onChange, placeholder }: TotalCapitalProps) {
  return (
    <CompactInput
      type="number"
      value={value || ''}
      onChange={(e: InputChangeEvent) => onChange(Number(e.target.value))}
      placeholder={placeholder}
    />
  );
} 
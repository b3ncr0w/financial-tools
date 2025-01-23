import { Summary, SummaryItem } from './styled';

interface SummaryProps {
  totalPercentage: number;
  isValid: boolean;
  label: string;
  errorMessage: string;
}

export function PortfolioSummary({
  isValid,
  errorMessage,
}: SummaryProps) {
  if (isValid) return null;

  return (
    <Summary>
      <SummaryItem>
        <span className="invalid">{errorMessage}</span>
      </SummaryItem>
    </Summary>
  );
} 
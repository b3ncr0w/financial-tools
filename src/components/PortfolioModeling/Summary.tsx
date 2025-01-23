import { Summary, SummaryItem, ErrorMessage } from './styled';

interface SummaryProps {
  totalPercentage: number;
  isValid: boolean;
  label: string;
  errorMessage: string;
}

export function PortfolioSummary({ totalPercentage, isValid, label, errorMessage }: SummaryProps) {
  return (
    <Summary>
      <SummaryItem>
        {label}: <span className={isValid ? 'valid' : 'invalid'}>
          {totalPercentage}%
        </span>
      </SummaryItem>
      {!isValid && (
        <ErrorMessage>{errorMessage}</ErrorMessage>
      )}
    </Summary>
  );
} 
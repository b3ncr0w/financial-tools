import { Summary, SummaryItem } from './styled';

interface SummaryProps {
  errorMessage: string[];
}

export function PortfolioSummary({ errorMessage }: SummaryProps) {
  return (
    <>
      {errorMessage.map((error, index) => (
        error && (
          <Summary key={index}>
            <SummaryItem>
              <span className="invalid">{error}</span>
            </SummaryItem>
          </Summary>
        )
      ))}
    </>
  );
} 
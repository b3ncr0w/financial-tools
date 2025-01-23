import styled from 'styled-components';
import { ChangeEvent } from 'react';

export type InputChangeEvent = ChangeEvent<HTMLInputElement>;

export const SPACING = {
  gap: '16px',
  padding: '16px',
  itemPadding: '8px 16px',
} as const;

export const COLUMN_WIDTHS = {
  name: '150px',
  percentage: '50px',
  value: '100px',
  target: '150px',
  action: '40px'
} as const;

export const Summary = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-md) var(--spacing-lg);
  background: var(--color-surface);
  border-radius: 12px;
  border: 1px solid var(--color-border);
`;

export const SummaryItem = styled.div`
  font-size: 0.95em;
  font-weight: 500;
  
  .valid {
    color: var(--color-success);
    font-weight: 600;
  }
  
  .invalid {
    color: var(--color-error);
    font-weight: 600;
  }
`;

export const ErrorMessage = styled.div`
  color: var(--color-error);
  font-size: 0.9em;
`;

export const TotalCapitalSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
`;

export const TotalCapitalRow = styled.div`
  display: flex;
  gap: var(--spacing-xs);
  align-items: center;
`;

export const TransferButton = styled.button`
  padding: 8px 10px;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  background: var(--color-surface);
  color: var(--color-text-secondary);
  font-size: 0.9em;
  cursor: pointer;
  transition: all 0.15s;
  display: flex;
  align-items: center;
  gap: 6px;
  
  &:hover {
    border-color: var(--color-primary);
    color: var(--color-primary);
  }
`;

export const Label = styled.label`
  font-size: 0.85em;
  color: var(--color-text-secondary);
  font-weight: 500;
`; 
import styled from 'styled-components';
import { ChangeEvent } from 'react';

export type InputChangeEvent = ChangeEvent<HTMLInputElement>;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  max-width: 800px;
  margin: 0 auto;
`;

export const Header = styled.div`
  display: flex;
  padding: 0 var(--spacing-md);
  margin-bottom: -4px;
  gap: var(--spacing-md);
  align-items: flex-end;
  min-height: 24px;
`;

export const HeaderLabel = styled.div`
  font-size: 0.75em;
  text-transform: uppercase;
  color: var(--color-text-secondary);
  letter-spacing: 0.5px;
  font-weight: 500;
  padding: 0 10px;
  line-height: 1.4;

  &:nth-child(1) { flex: 2; padding-left: 0; }
  &:nth-child(2) { width: 90px; text-align: right; }
  &:nth-child(3) { width: 140px; text-align: right; }
  &:nth-child(4) { width: 140px; text-align: right; }
  &:nth-child(5) { width: 40px; padding-right: 0; }
`;

export const WalletList = styled.div`
  display: flex;
  flex-direction: column;
  background: var(--color-surface);
  border-radius: 12px;
  border: 1px solid var(--color-border);
  overflow: hidden;
`;

export const WalletItemContainer = styled.div`
  display: flex;
  padding: var(--spacing-sm) var(--spacing-md);
  align-items: center;
  gap: var(--spacing-md);

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-border);
  }

  & > *:nth-child(1) { flex: 2; }
  & > *:nth-child(2) { width: 90px; }
  & > *:nth-child(3) { width: 120px; }
  & > *:nth-child(4) { width: 140px; }
  & > *:nth-child(5) { width: 40px; }
`;

export const PercentageInputGroup = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
  justify-content: flex-end;

  input {
    width: 60px;
  }
`;

export const CompactInput = styled.input`
  padding: 8px 10px;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  background: var(--color-surface);
  color: var(--color-text);
  font-size: 0.95em;
  width: 100%;
  transition: all 0.15s;
  
  &:hover {
    border-color: var(--color-primary);
  }
  
  &:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: 0 0 0 1px var(--color-primary);
  }

  &[type="number"] {
    text-align: right;
    font-feature-settings: "tnum";
    font-variant-numeric: tabular-nums;
    padding-right: 8px;
  }

  &::placeholder {
    color: var(--color-text-secondary);
  }
`;

export const ValueDisplay = styled.div`
  text-align: right;
  font-feature-settings: "tnum";
  font-variant-numeric: tabular-nums;
  padding: 8px 10px;
  background: var(--color-surface);
  border-radius: 6px;
  border: 1px solid var(--color-border);
  min-width: 0;
`;

export const Value = styled.div`
  font-weight: 500;
  font-size: 0.95em;
`;

export const Balance = styled.div<{ $positive: boolean }>`
  color: ${props => props.$positive ? 'var(--color-success)' : 'var(--color-error)'};
  font-size: 0.85em;
  margin-top: 2px;
`;

export const ActionButton = styled.button`
  width: 32px;
  height: 32px;
  border: none;
  background: var(--color-surface);
  color: var(--color-text-secondary);
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2em;
  padding: 0;
  transition: all 0.2s;

  &:hover {
    background: var(--color-error);
    color: white;
  }
`;

export const AddButton = styled.button`
  padding: 12px;
  border: 2px dashed var(--color-border);
  background: var(--color-surface);
  color: var(--color-text-secondary);
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.95em;
  font-weight: 500;
  transition: all 0.2s;
  
  &:hover {
    border-color: var(--color-primary);
    color: var(--color-primary);
  }
`;

export const AutoFillButton = styled(ActionButton)`
  width: 28px;
  height: 28px;
  background: var(--color-primary);
  color: white;
  font-size: 1em;
  
  &:hover {
    opacity: 0.9;
    transform: scale(1.05);
  }
`;

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
import styled from 'styled-components';
import { ChangeEvent } from 'react';

export type InputChangeEvent = ChangeEvent<HTMLInputElement>;

const SPACING = {
  gap: '24px',
  padding: '16px',
  itemPadding: '8px 16px',
} as const;

const COLUMN_WIDTHS = {
  name: '150px',
  percentage: '80px',
  value: '100px',
  target: '200px',
  action: '40px'
} as const;

export const CompactInput = styled.input`
  height: 42px;
  padding: 0 8px;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  background: var(--color-surface);
  color: var(--color-text);
  font-size: 0.95em;
  width: 100%;
  text-align: center;
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
    -moz-appearance: textfield;
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
`;

export const ValueDisplay = styled.div`
  height: 32px;
  padding: 0 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  box-sizing: border-box;
`;

const Column = styled.div`
  display: flex;
  box-sizing: border-box;
  width: 100%;
  padding: 0 4px;
`;

export const NameColumn = styled(Column)`
  width: ${COLUMN_WIDTHS.name};

  ${CompactInput} {
    width: 100%;
  }
`;

export const PercentageColumn = styled(Column)`
  width: ${COLUMN_WIDTHS.percentage};
  position: relative;

  ${CompactInput} {
    box-sizing: border-box;
    width: 100%;
    padding-right: 20px;
    text-align: center;
  }

  &::after {
    content: '%';
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--color-text-secondary);
    font-size: 0.9em;
    pointer-events: none;
    line-height: 1;
  }
`;

export const ValueColumn = styled(Column)`
  width: ${COLUMN_WIDTHS.value};

  ${CompactInput} {
    width: 100%;
  }
`;

export const TargetColumn = styled(Column)`
  width: ${COLUMN_WIDTHS.target};

  ${ValueDisplay} {
    width: 100%;
  }
`;

export const ActionColumn = styled(Column)`
  width: ${COLUMN_WIDTHS.action};
  display: flex;
  justify-content: center;
  padding: 0;
`;

export const Container = styled.div`
  width: fit-content;
  margin: 0 auto;
  padding: ${SPACING.padding};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${SPACING.gap};
`;

export const ItemContainer = styled.div`
  display: flex;
  padding: ${SPACING.itemPadding};
  align-items: center;
  height: 48px;
  position: relative;
`;

export const WalletList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${SPACING.gap};
`;

export const WalletPanel = styled.div`
  width: fit-content;
  display: flex;
  flex-direction: column;
  background: var(--color-surface);
  border-radius: 12px;
  border: 1px solid var(--color-border);
  padding: 0;
`;

export const Value = styled.div`
  font-weight: 500;
  font-size: 0.95em;
  width: 100%;
  text-align: center;
`;

export const Balance = styled.div<{ $positive: boolean }>`
  color: ${props => props.$positive ? 'var(--color-success)' : 'var(--color-error)'};
  font-size: 0.8em;
  margin-top: 2px;
  width: 100%;
  text-align: center;
`;

export const ActionButton = styled.button`
  width: 28px;
  height: 28px;
  border: none;
  background: transparent;
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

export const BaseButton = styled.button`
  padding: 12px;
  border: 1px dashed var(--color-border);
  border-radius: 22px;
  background: var(--color-surface);
  color: var(--color-text-secondary);
  font-size: 0.9em;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
  
  &:hover {
    border-color: var(--color-primary);
    color: var(--color-primary);
  }
`;

export const AutoFillButton = styled(ActionButton)`
  position: absolute;
  left: calc(${COLUMN_WIDTHS.name} + ${COLUMN_WIDTHS.percentage} - 50px);
  top: -18px;
  height: 24px;
  width: 50px;
  background: var(--color-primary);
  color: white;
  font-size: 0.85em;
  border-radius: 12px;
  z-index: 1;
  
  &:hover {
    opacity: 0.9;
    transform: scale(1.05);
    background: var(--color-primary);
  }
`;

export const WalletAssets = styled.div`
  background: var(--color-background);
  border-top: 1px solid var(--color-border);

  ${ItemContainer} {
    background: var(--color-background);
    padding: ${SPACING.itemPadding};
    
    &:not(:last-child) {
      border-bottom: 1px solid var(--color-border);
    }
  }
`;

export const AddAssetButton = styled(BaseButton)`
  border-radius: 12px;
`;

export const TotalCapitalSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: fit-content;
`;

export const TotalCapitalRow = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;

  input {
    box-sizing: border-box;
    width: 100%;
  }
`;

export const Label = styled.label`
  font-size: 0.85em;
  color: var(--color-text-secondary);
  font-weight: 500;
  margin-left: 8px;
`;

export const Summary = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: var(--spacing-md) var(--spacing-lg);
  background: var(--color-surface);
  border-radius: 12px;
  border: 1px solid var(--color-border);
`;

export const SummaryItem = styled.div`
  font-size: 0.95em;
  font-weight: 500;
  text-align: center;
  
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
  text-align: center;
`;
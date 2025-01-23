import styled from 'styled-components';

const SPACING = {
  gap: '16px',
  padding: '16px',
  itemPadding: '8px 16px',
} as const;

const COLUMN_WIDTHS = {
  name: '150px',
  percentage: '50px',
  value: '100px',
  target: '150px',
  action: '40px'
} as const;

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
  gap: ${SPACING.gap};
  align-items: center;
  height: 48px;

  & > *:nth-child(1) { min-width: ${COLUMN_WIDTHS.name}; max-width: ${COLUMN_WIDTHS.name}; }
  & > *:nth-child(2) { min-width: ${COLUMN_WIDTHS.percentage}; max-width: ${COLUMN_WIDTHS.percentage}; }
  & > *:nth-child(3) { min-width: ${COLUMN_WIDTHS.value}; max-width: ${COLUMN_WIDTHS.value}; }
  & > *:nth-child(4) { min-width: ${COLUMN_WIDTHS.target}; max-width: ${COLUMN_WIDTHS.target}; }
  & > *:nth-child(5) { min-width: ${COLUMN_WIDTHS.action}; max-width: ${COLUMN_WIDTHS.action}; }
`;

export const HeaderRow = styled(ItemContainer)`
  display: flex;
  padding: 0 ${SPACING.padding};
  gap: ${SPACING.gap};
  align-items: center;
  margin-left: 12px;
  transform: translateY(12px);
  
  & > * {
    font-size: 0.75em;
    text-transform: uppercase;
    color: var(--color-text-secondary);
    font-weight: 500;
    text-align: center;
    padding: 0 8.5px;
  }

  & > *:nth-child(1) { min-width: ${COLUMN_WIDTHS.name}; max-width: ${COLUMN_WIDTHS.name}; }
  & > *:nth-child(2) { min-width: ${COLUMN_WIDTHS.percentage}; max-width: ${COLUMN_WIDTHS.percentage}; }
  & > *:nth-child(3) { min-width: ${COLUMN_WIDTHS.value}; max-width: ${COLUMN_WIDTHS.value}; }
  & > *:nth-child(4) { min-width: ${COLUMN_WIDTHS.target}; max-width: ${COLUMN_WIDTHS.target}; }
  & > *:nth-child(5) { min-width: ${COLUMN_WIDTHS.action}; max-width: ${COLUMN_WIDTHS.action}; }
`;

export const WalletList = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
`;

export const WalletPanel = styled.div`
  width: fit-content;
  display: flex;
  flex-direction: column;
  background: var(--color-surface);
  border-radius: 12px;
  border: 1px solid var(--color-border);
  overflow: hidden;
  padding: 0;
`;

export const CompactInput = styled.input`
  height: 32px;
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
  width: 100%;
  text-align: center;
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
    background: var(--color-background);
    color: var(--color-text);
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

export const WalletAssets = styled.div`
  margin: 0;
  padding: 0;
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

export const AddAssetButton = styled(AddButton)`
  margin: 0;
  padding: ${SPACING.itemPadding};
  font-size: 0.9em;
  width: 100%;
  height: 48px;
  border-radius: 0;
  border: none;
  border-top: 1px solid var(--color-border);
  
  &:hover {
    background: var(--color-background);
    border-color: var(--color-border);
  }
`;
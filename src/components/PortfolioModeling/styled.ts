import styled from 'styled-components';
import { ChangeEvent } from 'react';

export type InputChangeEvent = ChangeEvent<HTMLInputElement>;

const SPACING = {
  gap: '24px',
  padding: '16px',
  itemPadding: '8px',
} as const;

const COLUMN_WIDTHS = {
  name: '120px',
  percentage: '70px',
  value: '90px',
  target: '150px',
  action: '30px'
} as const;

const BREAKPOINTS = {
  mobile: '900px',
} as const;

export const Z_INDEX = {
  base: 1,
  autoFill: 10,
  tooltip: 10000,
  overlay: 9999,
  tooltipContainer: 9998
} as const;

export const CompactInput = styled.input`
  height: 42px;
  padding: 0 8px;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  background: transparent;
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

  &:disabled {
    border-style: dashed;
    color: var(--color-primary);
    
    &:hover {
      border-color: var(--color-border);
    }
    
    &::placeholder {
      color: var(--color-primary);
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
    padding-right: 25px;
    text-align: center;
  }

  &::after {
    content: '%';
    position: absolute;
    right: 14px;
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
  box-sizing: border-box;
  display: flex;
  width: 100%;
  max-width: 100vw;
  margin: 0 auto;
  flex-wrap: wrap;
  justify-content: center;
  position: relative;
  z-index: ${Z_INDEX.base};
`;

export const TopPanel = styled.div`
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${SPACING.gap};
  width: 100%;
  max-width: 1000px;
  padding: ${SPACING.padding};
  align-items: start;

  @media (max-width: ${BREAKPOINTS.mobile}) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

export const ActionsPanel = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  width: 100%;
  max-width: 480px;
  justify-self: start;

  > button:nth-child(3) {
    grid-column: 1 / -1;
    margin-top: 8px;
  }

  @media (max-width: ${BREAKPOINTS.mobile}) {
    justify-self: center;
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
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  
  &:hover {
    border-color: var(--color-primary);
    color: var(--color-primary);
  }
`;

export const BottomPanel = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, 480px);
  justify-content: center;
  justify-items: start;
  gap: ${SPACING.gap};
  padding: ${SPACING.padding};
  position: relative;
  z-index: ${Z_INDEX.base};

  @media (max-width: ${BREAKPOINTS.mobile}) {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: ${SPACING.gap};
  }
`;

export const WalletPanel = styled.div`
  display: flex;
  flex-direction: column;
  background: var(--color-surface);
  border-radius: 12px;
  border: 1px solid var(--color-border);
  padding: 0;
  width: 480px;
  min-width: 480px;
  height: fit-content;
  position: relative;
  z-index: ${Z_INDEX.base};

  @media (max-width: ${BREAKPOINTS.mobile}) {
    width: 100%;
    min-width: 0;
    max-width: 480px;
  }
`;

export const Value = styled.div`
  font-weight: 500;
  font-size: 0.95em;
  width: 100%;
  text-align: center;
`;

export const Balance = styled.div<{ $positive: boolean; $isAsset?: boolean }>`
  color: ${props => props.$positive || !props.children ? 'var(--color-success)' : 'var(--color-error)'};
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

export const ItemContainer = styled.div`
  display: flex;
  padding: ${SPACING.itemPadding};
  align-items: center;
  height: 48px;
  position: relative;
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

export const AutoFillButton = styled(BaseButton)`
  width: fit-content;
  position: absolute;
  right: 80px;
  top: 12px;
  background: var(--color-primary);
  z-index: ${Z_INDEX.autoFill};
  border: none;

  &:hover {
    color: var(--color-text-primary);
    transform: scale(1.05);
  }

  ${WalletAssets} & {
    top: 2px;
    right: -198px;
    background: var(--color-secondary);
  }
`;

export const AddAssetButton = styled(BaseButton)`
  border-radius: 12px;
`;

export const TotalCapitalSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  max-width: 480px;
  justify-self: end;

  @media (max-width: ${BREAKPOINTS.mobile}) {
    justify-self: center;
  }
`;

export const TotalCapitalRow = styled.div`
  width: 100%;
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

export const Toggle = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  user-select: none;
  font-size: 0.8em;
  color: var(--color-text-secondary);
  opacity: 0.9;
  transition: opacity 0.2s;
  position: relative;

  &:hover {
    opacity: 1;
  }

  input {
    appearance: none;
    width: 40px;
    min-width: 40px;
    height: 25px;
    background: var(--color-border);
    border-radius: 15px;
    position: relative;
    cursor: pointer;
    transition: all 0.2s;

    &:checked {
      background: var(--color-primary);
    }

    &::before {
      content: '';
      position: absolute;
      width: 21px;
      height: 21px;
      border-radius: 50%;
      background: white;
      top: 2px;
      left: 2px;
      transition: transform 0.2s;
    }

    &:checked::before {
      transform: translateX(14px);
    }
  }

  input:checked + span {
    font-style: italic;
    color: var(--color-primary);
  }
`;

export const ToggleLabelWrapper = styled.div`
  display: flex;
  align-items: center;
`;
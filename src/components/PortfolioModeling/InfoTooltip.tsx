import styled from 'styled-components';
import { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Z_INDEX } from './styled';
import { createPortal } from 'react-dom';

const TooltipContainer = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
  margin-left: 16px;
  z-index: ${Z_INDEX.tooltipContainer};
`;

const InfoIcon = styled.button`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 1.5px solid var(--color-text-secondary);
  background: none;
  color: var(--color-text-secondary);
  font-size: 16px;
  font-weight: 500;
  line-height: 1;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: serif;
  font-style: italic;
  
  &:hover {
    border-color: var(--color-primary);
    color: var(--color-primary);
    transform: scale(1.05);
    transition: all 0.2s;
  }
`;

const TooltipContent = styled.div<{ $visible: boolean }>`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 16px;
  font-size: 0.9em;
  color: var(--color-text);
  min-width: 300px;
  max-width: 500px;
  opacity: ${props => props.$visible ? 1 : 0};
  visibility: ${props => props.$visible ? 'visible' : 'hidden'};
  transition: opacity 0.2s;
  z-index: ${Z_INDEX.tooltip};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  &::after, &::before {
    display: none;
  }

  p {
    margin: 0 0 8px 0;
    &:last-child {
      margin-bottom: 0;
    }
  }

  ul, ol {
    margin: 8px 0;
    padding-left: 20px;
  }
`;

const Overlay = styled.div<{ $visible: boolean }>`
  display: ${props => props.$visible ? 'block' : 'none'};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: ${Z_INDEX.overlay};
`;

interface InfoTooltipProps {
  text: string;
}

export function InfoTooltip({ text }: InfoTooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
        setIsVisible(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <TooltipContainer ref={tooltipRef}>
      <InfoIcon onClick={() => setIsVisible(!isVisible)}>i</InfoIcon>
      {isVisible && createPortal(
        <>
          <Overlay $visible={true} onClick={() => setIsVisible(false)} />
          <TooltipContent $visible={true}>
            <ReactMarkdown>{text}</ReactMarkdown>
          </TooltipContent>
        </>,
        document.body
      )}
    </TooltipContainer>
  );
} 
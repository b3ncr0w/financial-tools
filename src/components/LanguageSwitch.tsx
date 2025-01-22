import styled from "styled-components";
import { useApp } from "../context/AppContext";
import { config } from "../cms/config";
import { SupportedLanguage } from "../cms/types";

export function LanguageSwitch() {
  const { language, setLanguage } = useApp();

  return (
    <Container>
      {Object.entries(config.languages).map(([lang, info]) => (
        <LanguageButton
          key={lang}
          $isActive={lang === language}
          onClick={() => setLanguage(lang as SupportedLanguage)}
          title={info.full}
        >
          {info.symbol}
        </LanguageButton>
      ))}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  gap: var(--spacing-sm);
`;

const LanguageButton = styled.button<{ $isActive: boolean }>`
  background: none;
  border: none;
  color: var(--color-text);
  cursor: pointer;
  padding: var(--spacing-xs);
  opacity: ${props => props.$isActive ? 1 : 0.5};
  font-weight: ${props => props.$isActive ? 'bold' : 'normal'};

  &:hover {
    opacity: 0.8;
  }
`; 
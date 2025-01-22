import styled from "styled-components";
import { useApp } from "../context/AppContext";
import { Sun, Moon } from "./Icons";

export function ThemeSwitch() {
  const { isDarkMode, toggleTheme } = useApp();

  return (
    <Button onClick={toggleTheme} title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}>
      {isDarkMode ? <Sun /> : <Moon />}
    </Button>
  );
}

const Button = styled.button`
  background: none;
  border: none;
  color: var(--color-text);
  cursor: pointer;
  padding: var(--spacing-xs);
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    opacity: 0.8;
  }

  svg {
    width: 20px;
    height: 20px;
  }
`; 
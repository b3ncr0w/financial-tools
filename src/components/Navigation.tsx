import styled from "styled-components";
import { NavigationLink } from "../cms/types";
import { Link as RouterLink } from "react-router-dom";

export function Navigation({ data = [] }: { data?: NavigationLink[] }) {
  if (!data) return null;

  return (
    <Nav>
      <List>
        {data.map(({ text, url }, index) => (
          <li key={index}>
            <Link to={url}>{text}</Link>
          </li>
        ))}
      </List>
    </Nav>
  );
}

const Nav = styled.nav`
  background: var(--color-surface);
  padding: var(--spacing-md);
`;

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  gap: var(--spacing-md);
`;

const Link = styled(RouterLink)`
  color: var(--color-text);
  text-decoration: none;
  &:hover {
    color: var(--color-primary);
  }
`;

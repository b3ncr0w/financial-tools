import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { NavigationLink } from '../cms/types';

interface NavigationProps {
  data: NavigationLink[];
}

export function Navigation({ data }: NavigationProps) {
  const { pathname } = useLocation();

  return (
    <Nav>
      {data.map((item) => (
        <NavLink 
          key={item.url} 
          to={item.url}
          $active={pathname === item.url}
        >
          {item.text}
        </NavLink>
      ))}
    </Nav>
  );
}

const Nav = styled.nav`
  display: flex;
  gap: var(--spacing-md);
`;

const NavLink = styled(Link)<{ $active: boolean }>`
  color: var(--color-text);
  text-decoration: none;
  font-weight: ${props => props.$active ? '600' : '400'};
  opacity: ${props => props.$active ? '1' : '0.8'};
  
  &:hover {
    opacity: 1;
  }
`;

import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const HeaderWrapper = styled.nav`
  background-color: #e3f2fd;
  padding: 16px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const HeaderTitle = styled(Link)`
  margin: 0;
  color: #1565c0;
  font-size: 2rem;
  font-weight: bold;
  text-align: left;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export const NavLinks = styled.div`
  display: flex;
  gap: 20px;
`;

export const NavLink = styled(Link)`
  color: #1565c0;
  font-size: 1.2rem;
  text-decoration: none;
  padding: 8px 16px;
  border-radius: 4px;
  transition: background-color 0.3s;

  &:hover {
    background-color: rgba(21, 101, 192, 0.1);
    text-decoration: underline;
  }

  &.active {
    background-color: rgba(21, 101, 192, 0.2);
    font-weight: bold;
  }
`;
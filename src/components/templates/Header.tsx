import React from 'react';
import styled from "styled-components";
import { Link } from "react-router-dom";
import "../../styles/globals.css";

const HeaderWrapper = styled.nav`
  background-color: #e3f2fd;
  padding: 16px 24px;
`;

const HeaderTitle = styled(Link)`
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

const Header = () => (
  <HeaderWrapper>
    <HeaderTitle to="/">Gestão de Fazendeiros</HeaderTitle>
  </HeaderWrapper>
);

export default Header;
import React from 'react';
import { Link } from "react-router-dom";
import "../../styles/globals.css";
import {
  HeaderWrapper,
  HeaderTitle,
  NavLinks,
  NavLink
} from "../../styles/HeaderStyles";

const Header = () => (
  <HeaderWrapper>
    <HeaderTitle to="/">Gestão de Fazendeiros</HeaderTitle>
    <NavLinks>
      <NavLink to="/">Fazendeiros</NavLink>
      <NavLink to="/dashboard">Dashboard</NavLink>
    </NavLinks>
  </HeaderWrapper>
);

export default Header;

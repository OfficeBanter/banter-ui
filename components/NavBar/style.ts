import Link from "next/link";
import styled from "styled-components";
import { whenDesktop } from "../../components/Layout/layoutQueries";

export const Nav = styled.nav`
  background: rgba(241, 225, 228, 0.4) !important;
  grid-area: nav;
`;

export const NavList = styled.ol`
  display: flex;
  height: 72px;
  justify-content: space-between;
  align-items: center;
  ${whenDesktop`
    height: 88px;
  `}
`;

export const NavItem = styled.li`
  height: inherit;
  display: flex;
  align-items: center;
`;

export const NavLink = styled.a``;

export const Logo = styled.img`
  font-family: "Open Sans", sans-serif;
  font-weight: 700;
  font-size: 16px;
  position: relative;
  height: 48px;
  padding-left: 20px;
  ${whenDesktop`
    height: 60px;
  `}
`;

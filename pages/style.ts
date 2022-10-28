import Link from "next/link";
import styled from "styled-components";
import { whenDesktop } from "../components/Layout/layoutQueries";

export const Container = styled.div``;

export const Nav = styled.nav`
  background: rgba(241, 225, 228, 0.4) !important;
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

export const Main = styled.main``;

export const Message = styled.p`
  font-size: 16px;
  text-align: center;
`;

export const SlackLogoLink = styled(Link)`
  display: flex;
  align-items: center;
`;

// the slack logo is 172 x 40 so the ratio to height is 172 / 40 = 4.3

export const SlackSignin = styled.img`
  height: 32px;
  width: 138px;
  padding: 0 20px;
  ${whenDesktop`
    height: 40px;
    width: 172px;
  `}
`;

export const AddToSlackLink = styled.a``;

export const AddToSlackButton = styled.img``;

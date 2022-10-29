import React, { useEffect, useState } from "react";
import Head from "next/head";
import * as S from "./style";
import authService from "../../services/auth.service";

export default function NavBar({}) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    setUser(authService.getUser());
  }, []);

  if (!user) return null;

  return (
    <S.Nav>
      <S.NavList>
        <S.NavItem>
          <S.NavLink href="/dashboard">
            <S.Logo src="/Banter_Logo.svg" />
          </S.NavLink>
        </S.NavItem>
        <S.NavItem>
          <S.NavLink href={`${process.env.NEXT_PUBLIC_APP_URL}/support/`}>
            Help
          </S.NavLink>
        </S.NavItem>
        <S.NavItem>
          <S.NavLink href="/billing">Billing</S.NavLink>
        </S.NavItem>
        <S.NavItem>
          {user.name} ({user.workspace})
        </S.NavItem>
      </S.NavList>
    </S.Nav>
  );
}

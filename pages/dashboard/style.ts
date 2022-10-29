import Link from "next/link";
import styled from "styled-components";
import { whenDesktop } from "../../components/Layout/layoutQueries";

export const Container = styled.div`
  display: grid;

  grid-template-areas:
    "nav nav"
    "sidebar main";
  grid-template-rows: 72px 1fr;
  grid-template-columns: 240px 1fr;
`;

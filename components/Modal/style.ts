import Link from "next/link";
import styled from "styled-components";
import { whenDesktop } from "../Layout/layoutQueries";

const Overlay = styled.div`
  z-index: auto;
  display: ${({ show }) => (show ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background: rgba(0, 0, 0, 0.5);
  mouse-events: none;
`;

const Container = styled.div`
  position: fixed;
  background: antiquewhite;
  width: 33%;
  height: auto;
  border-radius: 10px;
  padding: 0.75rem;
  color: rgba(0, 0, 139, 0.7);
`;

import Link from "next/link";
import styled from "styled-components";
import { whenDesktop } from "../../components/Layout/layoutQueries";

// animated button styled component
export const Button = styled.button`
  background: #f1e1e4;
  border-radius: 4px;
  border: none;
  color: #000;
  cursor: pointer;
  font-family: "Open Sans", sans-serif;
  font-size: 16px;
  font-weight: 700;
  height: 48px;
  padding: 0 20px;
  transition: all 0.3s;

  &:active {
    margin-top: 2px;
  }
  &:hover {
    background: #e6d2d6;
  }

  &: disabled {
    background: #e6d2d6;
    cursor: not-allowed;
    color: grey;
    font-color: grey;
  }

  ${whenDesktop`
    height: 60px;
    font-size: 18px;  
  `}
`;

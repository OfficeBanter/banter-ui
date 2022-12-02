import Link from "next/link";
import styled from "@emotion/styled";
import Box from "@mui/material/Box";

export const Container = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  background: white;
  border: 2px solid #000;
  boxshadow: 24;
  p: 4;
`;

import styled, { css } from "styled-components";

export const whenDesktop = (...args) =>
  css`
    @supports (display: grid) {
      @media (min-width: 768px) {
        ${
          // @ts-ignore
          css(...args)
        }
      }
    }
  `;

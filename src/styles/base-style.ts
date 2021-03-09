import { css } from '@emotion/core';

export default css`
  flex: 1;

  width: 100%;
  max-width: 1400px;
  padding: 10vh 2vw 5vw 2vw;
  margin: 0 auto;

  > h1 {
    padding-left: 1rem;
    padding-bottom: 3rem;
    font-size: 4rem;
  }

  @media screen and (max-width: 1100px) {
  }
  @media screen and (max-width: 768px) {
  }
  @media screen and (max-width: 640px) {
    padding: 0;
    overflow: hidden;
  }
  @media screen and (max-height: 430px) {
  }
`;

import React from 'react';
import { css } from '@emotion/core';
import tw from 'twin.macro';

interface FooterProps {
  open: boolean;
  drawerWidth: number;
}

const Footer = (props: FooterProps): JSX.Element => {
  const { open, drawerWidth } = props;
  return (
    <div
      css={[tw`flex w-full h-20 justify-center items-center transition transition-locate ease-out`,
        open ? css`margin-left: ${drawerWidth}px; width: calc(100% - ${drawerWidth}px)` : tw`ml-0`]}
    >
      <footer>Footer</footer>
    </div>
  );
};

export default Footer;

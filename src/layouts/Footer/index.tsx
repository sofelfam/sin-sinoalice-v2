import React from 'react';
import { css } from '@emotion/core';
import tw from 'twin.macro';

interface FooterProps {
  open: boolean;
  drawerWidth: number;
}

const FooterWrapper: React.FCX = (props) => {
  return <div tw='flex w-full h-20 justify-center items-center transition transition-locate ease-out' {...props}>{props.children}</div>
}

const Footer = (props: FooterProps): JSX.Element => {
  const { open, drawerWidth } = props;

  return (
    <FooterWrapper
      css={open ? css`margin-left: ${drawerWidth}px; width: calc(100% - ${drawerWidth}px)` : tw`ml-0`}
    >
      <footer>Footer</footer>
    </FooterWrapper>
  );
};

export default Footer;

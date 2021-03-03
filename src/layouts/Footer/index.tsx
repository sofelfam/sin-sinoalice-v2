import React from 'react';
import { css } from '@emotion/core';
import tw from 'twin.macro';

interface FooterProps {
  className?: string,
  open: boolean,
  drawerWidth: number,
}

const Footer = (props: FooterProps) => {

return(
  <div css={[tw`flex w-full h-20 justify-center items-center
            transition transition-locate ease-out`,
            props.open ? css`margin-left: ${props.drawerWidth}px; width: calc(100% - ${props.drawerWidth}px)` : tw`ml-0`]}
  >
    <footer>Footer</footer>
  </div>
)};

export default Footer;
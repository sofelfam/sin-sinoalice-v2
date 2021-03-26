import React, { useEffect } from 'react';
import { AnyImage, SEO } from 'src/components';
import { css } from '@emotion/core';
import { baseStyle } from 'src/styles';
import { SwitchTitle } from 'src/store';
import Tooltip from 'src/components/tool-tip';
import 'twin.macro';

const Component = ({ path }: { path: string }): JSX.Element => {
  const { setTitle } = SwitchTitle.useContainer();
  useEffect(() => {
    setTitle('SIN - SINoALICE');
  }, []);

  return (
    <>
      <SEO pathname={path} />
      <main css={css`${baseStyle}`}>
        <h1>this is Component page!</h1>
        <Tooltip element='test'>
          <div tw='bg-gray-400 w-32 h-32' />
        </Tooltip>
        <AnyImage filename='banner.png' />
      </main>
    </>
  );
};

export default Component;

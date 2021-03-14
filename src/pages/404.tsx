import React, { useEffect } from 'react';
import { SEO } from 'src/components';
import { css } from '@emotion/core';
import { baseStyle } from 'src/styles';
import { SwitchTitle } from 'src/store';

const Component = ({ path }: { path: string }): JSX.Element => {
  const { setTitle } = SwitchTitle.useContainer();
  useEffect(() => {
    setTitle('Not Found');
  }, []);

  return (
    <>
      <SEO title='Not Found' pathname={path} />
      <main css={css`${baseStyle}`}>
        <h1>Page Not Found...</h1>
      </main>
    </>
  )
};

export default Component;

import React, { useEffect } from 'react';
import { NetlifyForm, SEO } from 'src/components';
import { css } from '@emotion/core';
import { baseStyle } from 'src/styles';
import { SwitchTitle } from 'src/store';

const Component = ({ path }: { path: string }): JSX.Element => {
  const { setTitle } = SwitchTitle.useContainer();
  useEffect(() => {
    setTitle('Contact');
  }, []);

  return (
    <>
      <SEO title='Contact' pathname={path} />
      <main css={css`${baseStyle}`}>
        <NetlifyForm />
      </main>
    </>
  )
};

export default Component;

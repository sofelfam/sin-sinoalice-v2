import React, { useEffect } from 'react';
import { SEO } from 'src/components';
import { css } from '@emotion/core';
import { baseStyle } from 'src/styles';
import { SwitchTitle } from 'src/store';
import TimerTable from './timer-table';

const Component = ({ path }: { path: string }): JSX.Element => {
  const { setTitle } = SwitchTitle.useContainer();
  useEffect(() => {
    setTitle('コロシアムタイマー');
  }, []);
  
  return(
    <>
      <SEO title='コロシアムタイマー' pathname={path} />
      <main css={css`${baseStyle}`}>
        <TimerTable />
      </main>
    </>
  );
};

export default Component;

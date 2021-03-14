import React from 'react';
import { SEO } from 'src/components';
import { css } from '@emotion/core';
import { baseStyle } from 'src/styles';
import TimerTable from './timer-table';

const Timer = ({ path }: { path: string }): JSX.Element => {
  
  return(
    <>
      <SEO title='コロシアムタイマー' pathname={path} />
      <main css={css`${baseStyle}`}>
        <h1>コロシアムタイマー</h1>
        <TimerTable />
      </main>
    </>
  );
};

export default Timer;

import React from 'react';
import { SEO } from 'src/components';
import { css } from '@emotion/core';
import { baseStyle } from 'src/styles';
import ComboTable from './combo-table';

const ComboCalc = ({ path }: { path: string }): JSX.Element => {
  
  return(
    <>
      <SEO title='コンボ計算機' pathname={path} />
      <main css={css`${baseStyle}`}>
        <h1>コンボ計算機</h1>
        <ComboTable />
      </main>
    </>
  );
};

export default ComboCalc;
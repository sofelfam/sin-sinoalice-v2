import React, { useEffect } from 'react';
import { SEO } from 'src/components';
import { css } from '@emotion/core';
import { baseStyle } from 'src/styles';
import { SwitchTitle } from 'src/store';
import ComboTable from './combo-table';

const Component = ({ path }: { path: string }): JSX.Element => {
  const { setTitle } = SwitchTitle.useContainer();
  useEffect(() => {
    setTitle('コンボ計算機');
  }, []);
  
  return(
    <>
      <SEO title='コンボ計算機' pathname={path} />
      <main css={css`${baseStyle}`}>
        <ComboTable />
      </main>
    </>
  );
};

export default Component;
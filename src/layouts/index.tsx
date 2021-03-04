import React, { useEffect, useState } from 'react';
import tw, { GlobalStyles } from 'twin.macro'
import { css } from '@emotion/core';

import Footer from './Footer';
import Header from './Header';

const drawerWidth = 240;

export const Layout: React.FC = ({ children }) => {
  const [open, setOpen] = useState(false);
  //const mobile = useMediaQuery(theme.breakpoints.down('xs'));

  useEffect(() => {
    setOpen(localStorage.getItem('drawer') === 'open' ? true : false);
  }, []);

  const handleDrawerOpen = () => {
    localStorage.setItem('drawer', 'open');
    setOpen(true);
  };

  const handleDrawerClose = () => {
    localStorage.setItem('drawer', 'close');
    setOpen(false);
  };

  const handleDrawerChange = () => {
    open ? handleDrawerClose() : handleDrawerOpen();
  }


return(
  <>
  <div>
    <GlobalStyles />
      <div tw="dark:bg-gray-800 dark:text-gray-200">
        <div tw="flex">
          <Header
            drawerWidth={drawerWidth}
            open={open}
            handleDrawerChange={handleDrawerChange}
          />
          
          <div css={[tw`pt-28 flex-grow lg:px-6
                        transition transition-spacing ease-out`,
                    open ? css`margin-left: ${drawerWidth}px; width: calc(100% - ${drawerWidth}px)` : tw`ml-0`]}
          >
            {children}
          </div>
            
        </div>
        <Footer
          open={open}
          drawerWidth={drawerWidth}
        />
      </div>
    </div>
  </>
)};

export default Layout;

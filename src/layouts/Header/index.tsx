import React from 'react';
import { Link } from 'gatsby';
import { css } from '@emotion/core';
import tw from 'twin.macro';
import DrawerList from './drawer-list';
import { SwitchTitle } from 'src/store';

interface HeaderProps {
  drawerWidth: number;
  open: boolean;
  handleDrawerChange: () => void;
}

const Header = (props: HeaderProps): JSX.Element => {
  const { drawerWidth, open, handleDrawerChange } = props;
  const { title } = SwitchTitle.useContainer();
  return (
    <>
      <div>
        <div
          css={[tw`flex fixed top-0 right-0 z-40 w-full shadow-drop
          transition transition-width ease-out`,
          open ? css`margin-left: ${drawerWidth}px; width: calc(100% - ${drawerWidth}px)` : tw`ml-0`]}
        >
          <div
            css={[tw`flex min-h-22 bg-indigo-800 justify-start items-center px-6`,
            props.open ? tw`w-full` : tw`w-screen`]}
          >
            <button tw='p-4 mr-4 rounded-full cursor-pointer hover:bg-focus focus:outline-none focus-visible:ring-2 transition'
              aria-label='open drawer'
              onClick={() => handleDrawerChange()}
            >
              <svg tw='h-8 w-8 text-white' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16M4 18h16' />
              </svg>
            </button>

            <div tw='flex-grow text-white'>
              {title}
            </div>
          </div>
        </div>

        <div tw='flex'>
          <DrawerList
            drawerWidth={drawerWidth}
            open={open}
            handleDrawerChange={handleDrawerChange}
          />
        </div>
      </div>
    </>
  );
};

export default Header;

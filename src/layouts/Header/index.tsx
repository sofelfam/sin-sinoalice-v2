import React  from 'react';
import { Link } from 'gatsby';
import { css } from '@emotion/core';
import tw from 'twin.macro';
import DrawerList from './drawer-list';

interface HeaderProps {
  drawerWidth: number,
  open: boolean,
  handleDrawerChange: () => void,
}

const Header = (props: HeaderProps) => {


  return (
    <>
      <div>
        <div css={[tw`flex fixed top-0 right-0 z-40 w-full shadow-drop
                    transition transition-width ease-out`,
                   props.open ? css`margin-left: ${props.drawerWidth}px; width: calc(100% - ${props.drawerWidth}px)` : tw`ml-0`]}
        >
          <div css={[tw`flex min-h-22 bg-indigo-800 justify-start items-center px-6`,
                    props.open ? tw`w-full` : tw`w-screen`]}
          >
            <div tw="p-4 mr-4 rounded-full cursor-pointer hover:bg-hover transition"
              aria-label="open drawer"
              onClick={() => props.handleDrawerChange()}
            >
              <svg tw="h-8 w-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </div>

            <div tw="flex-grow">
              <Link to='/' tw="text-white no-underline">
                SIN - SINoALICE
              </Link>
            </div>
          </div>
        </div>

        <div tw='flex'>
          <DrawerList
            drawerWidth={props.drawerWidth}
            open={props.open}
            handleDrawerChange={props.handleDrawerChange}
          />
        </div>
      </div>
    </>
  );
}

export default Header;

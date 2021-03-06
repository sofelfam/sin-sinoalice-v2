import React from 'react';
import { Link } from 'gatsby';
import { css } from '@emotion/core';
import { SwordIcon, ChartIcon } from 'src/components/icons';
import { Divider, IconList, NestedLists } from 'src/components';
import tw from 'twin.macro';
import { ToggleDarkMode } from 'src/components/toggleDarkMode';

const classes = {
  listHeader: tw`
    sticky z-10 -top-px px-4 leading-20 font-bold bg-white dark:bg-gray-800 font-sans
  `,
};

interface drawerProps {
  drawerWidth: number;
  open: boolean;
  handleDrawerChange: () => void;
}

const Header = (props: drawerProps): JSX.Element => {
  const { drawerWidth, open, handleDrawerChange } = props;
  return(
    <nav css={[tw`fixed top-0 left-0 right-auto flex flex-col flex-auto h-full outline-none z-50 overflow-y-auto border border-solid border-gray-400 dark:border-gray-50 transition ease-out`,
      css`width: ${drawerWidth}px`,
      open ? tw`transform-none` : css`transform: translateX(-${drawerWidth}px); visibility: hidden;`]}
    >
      <div tw='flex py-0 px-3 min-h-22 items-center justify-between'>
        <div tw='ml-2'>
          <div tw='text-gray-700'>
            <Link to='/' tw='no-underline'>SIN - SINoALICE</Link>
          </div>
          <div tw='text-lg text-gray-500'>v0.0.1</div>
        </div>
        <button
          tw='p-4 rounded-full cursor-pointer hover:bg-hover dark:hover:bg-darkhover focus-visible:ring transition transition-background'
          onClick={() => handleDrawerChange()}
        >
          <svg tw='w-8 h-8' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' />
          </svg>
        </button>
      </div>
      <Divider />
      <div css={classes.listHeader}>Calculators</div>
      <NestedLists
        topIcon={<SwordIcon />}
        topText={`ダメージ計算`}
        lists={[
          {icon: <SwordIcon />, text: `コロシアム`, link: '/'},
          {icon: <SwordIcon />, text: `モノガタリ`, link: '/'}
        ]}
      />
      <NestedLists
        topIcon={<SwordIcon />}
        topText={`バフデバフ計算`}
        lists={[{icon: <SwordIcon />, text: `コロシアム`, link: '/'},
                {icon: <SwordIcon />, text: `モノガタリ`, link: '/'}]}
      />
      <NestedLists
        topIcon={<SwordIcon />}
        topText={`回復計算`}
        lists={[{icon: <SwordIcon />, text: `コロシアム`, link: '/'},
                {icon: <SwordIcon />, text: `モノガタリ`, link: '/'}]}
      />
      <IconList
        icon={<ChartIcon />}
        text={`コンボ計算`}
        link={'/calc/combo'}
      />
      <IconList
        icon={<ChartIcon />}
        text={`獲得イノチ量計算`}
        link={'/'}
      />
      <IconList
        icon={<ChartIcon />}
        text={`ナイトメア時間計算`}
        link={'/calc/nightmare'}
      />
      <IconList
        icon={<ChartIcon />}
        text={`シップ計算`}
        link={'/calc/ship'}
      />
      <Divider />
      <div css={classes.listHeader}>Simulators</div>
      <IconList
        icon={<ChartIcon />}
        text={`前衛装備`}
        link={'/'}
      />
      <IconList
        icon={<ChartIcon />}
        text={`後衛装備`}
        link={'/'}
      />
      <IconList
        icon={<ChartIcon />}
        text={`キャラクターズ強化`}
        link={'/'}
      />
      <IconList
        icon={<ChartIcon />}
        text={`ナイトメアテーブル`}
        link={'/'}
      />
      <Divider />
      <div css={classes.listHeader}>Generators</div>
      <IconList
        icon={<ChartIcon />}
        text={`装備画像`}
        link={'/'}
      />
      <IconList
        icon={<ChartIcon />}
        text={`コロシアム画像`}
        link={'/'}
      />
      <Divider />
      <IconList
        icon={<ChartIcon />}
        text={`更新履歴`}
        link={'/'}
      />
      <IconList
        icon={<ChartIcon />}
        text={`Contact`}
        link={'/'}
      />
      <IconList
        icon={<ChartIcon />}
        text={`Credits`}
        link={'/'}
      />
      <Divider />
      <div tw='flex p-3 justify-between'>
        <button
          tw='p-4 rounded-full cursor-pointer hover:bg-hover dark:hover:bg-darkhover focus-visible:ring transition transition-background'
          onClick={() => handleDrawerChange()}
        >
          <svg tw='w-8 h-8' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' />
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' />
          </svg>
        </button>
        <ToggleDarkMode />
      </div>
    </nav>
  );
};

export default Header;

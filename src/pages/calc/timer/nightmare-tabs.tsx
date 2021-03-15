import React, { useEffect } from 'react';
import tw from 'twin.macro';
import { AnyImage } from 'src/components';
import { useDataNightmare } from 'src/hooks';
import { nightmareProps } from 'src/hooks/use-data-nightmare';
import { css } from '@emotion/core';

const classes = {
  tabButton: tw`
    block w-full h-20 flex-shrink-0 cursor-pointer opacity-70 transition ease focus:outline-none focus-visible:ring
  `
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
  
const TabPanel = (props: TabPanelProps) => {
const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      tw='flex-grow overflow-hidden'
      {...other}
    >
      {value === index && (
        <div tw='flex flex-col h-full overflow-y-scroll'>
          {children}
        </div>
      )}
    </div>
  );
}

interface TimerButtonIconProps {
  id: string,
  handleNightmareButton: (e: React.MouseEvent<HTMLElement>) => void,
}

const TimerButtonIcon= (props: TimerButtonIconProps) => {
  const { id, handleNightmareButton, ...rest } = props;
  const nightmareData = useDataNightmare();
  const imageId = ('0000' + id).slice(-4);

  const result = nightmareData.filter((item: nightmareProps) => {
    return item.icon.indexOf(id) !== -1;
  });

  return (
    <>
      {result.map((data: nightmareProps) => {
        return (
          <button
            key={id}
            onClick={(e) => handleNightmareButton(e)}
            data-id={id}
            data-ready={data.ready}
            data-activate={data.activate}
            tw='w-16 h-16 focus:outline-none focus-visible:ring'
            {...rest}
          >
            <AnyImage filename={`cards/CardS${imageId}.png`} />
          </button>
        )
      })}
    </>
  )
};

interface nightmareTabsProps {
  handleNightmareButton: (e: React.MouseEvent<HTMLElement>) => void;
}

const NightmareTabs = (props: nightmareTabsProps) => {
  const { handleNightmareButton } = props;
  const [value, setValue] = React.useState(0);

  useEffect(() => {
    const item = localStorage.getItem(`nightmareTabs`);
    const val = parseFloat(item ? item : '0');
    setValue(val);
  }, []);

  const handleChange = (_event: React.ChangeEvent<{}>, newValue: number) => {
    localStorage.setItem(`nightmareTabs`, `${newValue}`);
    setValue(newValue);
  };

  return (
    <div tw='flex flex-row h-80 border border-gray-400 rounded'>
      <div tw='relative flex-shrink-0 flex flex-col overflow-y-scroll border-r-2 border-gray-400 sm:w-60 w-32 mr-px'>
        <button css={[classes.tabButton, value === 0 ? tw`opacity-100` : css``]} onClick={(e) => handleChange(e, 0)}>スキル強化</button>
        <button css={[classes.tabButton]} onClick={(e) => handleChange(e, 1)}>スキル弱化</button>
        <button css={[classes.tabButton]} onClick={(e) => handleChange(e, 2)}>その他</button>
        <button css={[classes.tabButton]} onClick={(e) => handleChange(e, 3)}>SP関連</button>
        <button css={[classes.tabButton]} onClick={(e) => handleChange(e, 4)}>バフ</button>
        <button css={[classes.tabButton]} onClick={(e) => handleChange(e, 5)}>デバフ</button>
        <button css={[classes.tabButton]} onClick={(e) => handleChange(e, 6)}>カスタム</button>
        <span css={[tw`absolute right-0 h-20 w-1 bg-rose-500 transition transition-locate ease duration-300`, css`top: calc(5rem * ${value})`]}></span>
      </div>
        {/* スキル強化 */}
      <TabPanel value={value} index={0}>
        <div tw='flex flex-wrap'>
          <TimerButtonIcon handleNightmareButton={handleNightmareButton} id='458' />
          <TimerButtonIcon handleNightmareButton={handleNightmareButton} id='2437' />
          <TimerButtonIcon handleNightmareButton={handleNightmareButton} id='480' />
          <TimerButtonIcon handleNightmareButton={handleNightmareButton} id='4411' />
          <TimerButtonIcon handleNightmareButton={handleNightmareButton} id='517' />
          <TimerButtonIcon handleNightmareButton={handleNightmareButton} id='3742' />
          <TimerButtonIcon handleNightmareButton={handleNightmareButton} id='1663' />
          <TimerButtonIcon handleNightmareButton={handleNightmareButton} id='1048' />
        </div>
        <div tw='flex flex-wrap'>
          <TimerButtonIcon handleNightmareButton={handleNightmareButton} id='7742' />
          <TimerButtonIcon handleNightmareButton={handleNightmareButton} id='7724' />
          <TimerButtonIcon handleNightmareButton={handleNightmareButton} id='1882' />
          <TimerButtonIcon handleNightmareButton={handleNightmareButton} id='4613' />
          <TimerButtonIcon handleNightmareButton={handleNightmareButton} id='1593' />
          <TimerButtonIcon handleNightmareButton={handleNightmareButton} id='1431' />
          <TimerButtonIcon handleNightmareButton={handleNightmareButton} id='2613' />
          <TimerButtonIcon handleNightmareButton={handleNightmareButton} id='4854' />
          <TimerButtonIcon handleNightmareButton={handleNightmareButton} id='5018' />
          <TimerButtonIcon handleNightmareButton={handleNightmareButton} id='5244' />
        </div>
        <div tw='flex flex-wrap'>
          <TimerButtonIcon handleNightmareButton={handleNightmareButton} id='5048' />
          <TimerButtonIcon handleNightmareButton={handleNightmareButton} id='6129' />
          <TimerButtonIcon handleNightmareButton={handleNightmareButton} id='4615' />
        </div>
        <div tw='flex flex-wrap'>
          <TimerButtonIcon handleNightmareButton={handleNightmareButton} id='6678' />
          <TimerButtonIcon handleNightmareButton={handleNightmareButton} id='6979' />
        </div>
        <div tw='flex flex-wrap'>
          <TimerButtonIcon handleNightmareButton={handleNightmareButton} id='4050' />
          <TimerButtonIcon handleNightmareButton={handleNightmareButton} id='3836' />
          <TimerButtonIcon handleNightmareButton={handleNightmareButton} id='1010' />
          <TimerButtonIcon handleNightmareButton={handleNightmareButton} id='1371' />
        </div>
      </TabPanel>
        {/* スキル弱化 */}
      <TabPanel value={value} index={1}>
        <div tw='flex flex-wrap'>
          <TimerButtonIcon handleNightmareButton={handleNightmareButton} id='556' />
          <TimerButtonIcon handleNightmareButton={handleNightmareButton} id='640' />
          <TimerButtonIcon handleNightmareButton={handleNightmareButton} id='1052' />
          <TimerButtonIcon handleNightmareButton={handleNightmareButton} id='5709' />
        </div>
        <div tw='flex flex-wrap'>
          <TimerButtonIcon handleNightmareButton={handleNightmareButton} id='1441' />
          <TimerButtonIcon handleNightmareButton={handleNightmareButton} id='1591' />
          <TimerButtonIcon handleNightmareButton={handleNightmareButton} id='5609' />
          <TimerButtonIcon handleNightmareButton={handleNightmareButton} id='1417' />
          <TimerButtonIcon handleNightmareButton={handleNightmareButton} id='1126' />
          <TimerButtonIcon handleNightmareButton={handleNightmareButton} id='1316' />
        </div>
      </TabPanel>
        {/* その他 */}
      <TabPanel value={value} index={2}>
        <div tw='flex flex-wrap'>
          <TimerButtonIcon handleNightmareButton={handleNightmareButton} id='3140' />
          <TimerButtonIcon handleNightmareButton={handleNightmareButton} id='6065' />
          <TimerButtonIcon handleNightmareButton={handleNightmareButton} id='4856' />
          <TimerButtonIcon handleNightmareButton={handleNightmareButton} id='7190' />
        </div>
        <div tw='flex flex-wrap'>
          <TimerButtonIcon handleNightmareButton={handleNightmareButton} id='6416' />
          <TimerButtonIcon handleNightmareButton={handleNightmareButton} id='4413' />
          <TimerButtonIcon handleNightmareButton={handleNightmareButton} id='2523' />
          <TimerButtonIcon handleNightmareButton={handleNightmareButton} id='2672' />
        </div>
        <div tw='flex flex-wrap'>
          <TimerButtonIcon handleNightmareButton={handleNightmareButton} id='5975' />
          <TimerButtonIcon handleNightmareButton={handleNightmareButton} id='7549' />
        </div>
        <div tw='flex flex-wrap'>
          <TimerButtonIcon handleNightmareButton={handleNightmareButton} id='7615' />
        </div>
      </TabPanel>
        {/* SP関連 */}
      <TabPanel value={value} index={3}>
        <div tw='flex flex-wrap'>
          <TimerButtonIcon handleNightmareButton={handleNightmareButton} id='6903' />
          <TimerButtonIcon handleNightmareButton={handleNightmareButton} id='3394' />
          <TimerButtonIcon handleNightmareButton={handleNightmareButton} id='4619' />
        </div>
        <div tw='flex flex-wrap'>
          <TimerButtonIcon handleNightmareButton={handleNightmareButton} id='558' />
          <TimerButtonIcon handleNightmareButton={handleNightmareButton} id='1172' />
        </div>
      </TabPanel>
        {/* バフ */}
      <TabPanel value={value} index={4}>
        <div tw='flex flex-wrap'>
          <TimerButtonIcon handleNightmareButton={handleNightmareButton} id='2119' />
          <TimerButtonIcon handleNightmareButton={handleNightmareButton} id='2373' />
          <TimerButtonIcon handleNightmareButton={handleNightmareButton} id='7188' />
        </div>
        <div tw='flex flex-wrap'>
          <TimerButtonIcon handleNightmareButton={handleNightmareButton} id='6342' />
          <TimerButtonIcon handleNightmareButton={handleNightmareButton} id='980' />
          <TimerButtonIcon handleNightmareButton={handleNightmareButton} id='1647' />
          <TimerButtonIcon handleNightmareButton={handleNightmareButton} id='1108' />
          <TimerButtonIcon handleNightmareButton={handleNightmareButton} id='1930' />
        </div>
        <div tw='flex flex-wrap'>
          <TimerButtonIcon handleNightmareButton={handleNightmareButton} id='1625' />
          <TimerButtonIcon handleNightmareButton={handleNightmareButton} id='2784' />
          <TimerButtonIcon handleNightmareButton={handleNightmareButton} id='1812' />
          <TimerButtonIcon handleNightmareButton={handleNightmareButton} id='2858' />
          <TimerButtonIcon handleNightmareButton={handleNightmareButton} id='2335' />
        </div>
      </TabPanel>
        {/* デバフ */}
      <TabPanel value={value} index={5}>
        <div tw='flex flex-wrap'>
          <TimerButtonIcon handleNightmareButton={handleNightmareButton} id='2199' />
          <TimerButtonIcon handleNightmareButton={handleNightmareButton} id='3946' />
          <TimerButtonIcon handleNightmareButton={handleNightmareButton} id='4591' />
          <TimerButtonIcon handleNightmareButton={handleNightmareButton} id='1892' />
        </div>
        <div tw='flex flex-wrap'>
          <TimerButtonIcon handleNightmareButton={handleNightmareButton} id='1573' />
          <TimerButtonIcon handleNightmareButton={handleNightmareButton} id='1138' />
          <TimerButtonIcon handleNightmareButton={handleNightmareButton} id='1451' />
          <TimerButtonIcon handleNightmareButton={handleNightmareButton} id='1563' />
          <TimerButtonIcon handleNightmareButton={handleNightmareButton} id='1497' />
        </div>
      </TabPanel>
        {/* カスタム */}
      <TabPanel value={value} index={6}>
        <div tw='flex flex-wrap'>          
          <TimerButtonIcon handleNightmareButton={handleNightmareButton} id='458' />
          <TimerButtonIcon handleNightmareButton={handleNightmareButton} id='2437' />
          <TimerButtonIcon handleNightmareButton={handleNightmareButton} id='480' />
          <span tw='w-1'></span>
          <TimerButtonIcon handleNightmareButton={handleNightmareButton} id='5048' />
          <TimerButtonIcon handleNightmareButton={handleNightmareButton} id='6129' />
          <TimerButtonIcon handleNightmareButton={handleNightmareButton} id='4615' />
        </div>
        <div tw='flex flex-wrap'>
          <TimerButtonIcon handleNightmareButton={handleNightmareButton} id='7742' />
          <TimerButtonIcon handleNightmareButton={handleNightmareButton} id='7724' />
          <TimerButtonIcon handleNightmareButton={handleNightmareButton} id='1593' />
          <span tw='w-1'></span>
          <TimerButtonIcon handleNightmareButton={handleNightmareButton} id='6678' />
          <TimerButtonIcon handleNightmareButton={handleNightmareButton} id='6979' />
          <span tw='w-1'></span>
          <TimerButtonIcon handleNightmareButton={handleNightmareButton} id='4854' />
          <TimerButtonIcon handleNightmareButton={handleNightmareButton} id='5018' />
          <TimerButtonIcon handleNightmareButton={handleNightmareButton} id='5244' />
        </div>
        <div tw='flex flex-wrap'>
          <TimerButtonIcon handleNightmareButton={handleNightmareButton} id='3742' />
          <TimerButtonIcon handleNightmareButton={handleNightmareButton} id='5709' />
          <span tw='w-1'></span>
          <TimerButtonIcon handleNightmareButton={handleNightmareButton} id='4050' />
          <TimerButtonIcon handleNightmareButton={handleNightmareButton} id='3836' />
          <span tw='w-1'></span>
          <TimerButtonIcon handleNightmareButton={handleNightmareButton} id='1010' />
        </div>
        <div tw='flex flex-wrap'>
          <TimerButtonIcon handleNightmareButton={handleNightmareButton} id='6416' />
          <TimerButtonIcon handleNightmareButton={handleNightmareButton} id='2523' />
          <span tw='w-1'></span>
          <TimerButtonIcon handleNightmareButton={handleNightmareButton} id='2672' />
          <span tw='w-1'></span>
          <TimerButtonIcon handleNightmareButton={handleNightmareButton} id='5975' />
          <span tw='w-1'></span>
          <TimerButtonIcon handleNightmareButton={handleNightmareButton} id='7549' />
        </div>
        <div tw='flex flex-wrap'>
          <TimerButtonIcon handleNightmareButton={handleNightmareButton} id='3140' />
          <TimerButtonIcon handleNightmareButton={handleNightmareButton} id='6065' />
          <TimerButtonIcon handleNightmareButton={handleNightmareButton} id='7190' />
          <span tw='w-1'></span>
          <TimerButtonIcon handleNightmareButton={handleNightmareButton} id='6903' />
          <TimerButtonIcon handleNightmareButton={handleNightmareButton} id='7615' />
        </div>
      </TabPanel>
    </div>
  );
}

export default NightmareTabs;

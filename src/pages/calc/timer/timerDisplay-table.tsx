import { css } from "@emotion/core";
import React, { useEffect, useState } from "react";
import { AnyImage } from "src/components";
import tw from 'twin.macro';

const classes = {
  timerDisplayTable: tw`
    flex flex-col sm:w-1/3 w-full p-2
  `,
  timerTextLabel4: tw`
    w-36 m-1 text-center font-bold border-b border-gray-400 transition ease-out
  `,
  timerTextLabel2: tw`
    w-16 m-1 text-center font-bold border-b border-gray-400 transition ease-out
  `,
  timerDataLabel: tw`
    w-40 m-1 text-center font-mono font-bold border-b border-gray-400 transition ease-out
  `,
  zoomTimerTextLabel4WithIcon: css`
    transform: scale(0.4) translateY(-3.6rem) translateX(6.7rem);
  `,
  zoomTimerTextLabel2WithIcon: css`
    transform: scale(0.4) translateY(-3.6rem) translateX(-2rem);
  `,
  zoomTimerDataLabelWithIcon: css`
    transform: scale(1.3) translateX(-2rem);
  `,
  zoomTimerTextLabel4: css`
    transform: scale(0.4) translateY(-3.6rem);
  `,
  zoomTimerDataLabel: css`
    transform: scale(1.3) translateX(-4rem);
  `
};

const TimerDataLabel: React.FC = (props) => {
  return <div css={classes.timerDataLabel} {...props}>{props.children}</div>;
}

const TimerTextLabel2: React.FC = (props) => {
  return <div css={classes.timerTextLabel2} {...props}>{props.children}</div>;
}

const TimerTextLabel4: React.FC = (props) => {
  return <div css={classes.timerTextLabel4} {...props}>{props.children}</div>;
}

interface timerTableProps {
  zoom: boolean;
  coloCountText: string;
  coloMareId: string;
  coloMareStartTime: string;
  coloMareEndTime: string;
};

const TimerTable = React.memo((props: timerTableProps) => {
  const { zoom, coloCountText, coloMareId, coloMareStartTime, coloMareEndTime } = props;
  const imageId = ('' + coloMareId).length < 5 ? ('0000' + coloMareId).slice(-4) : coloMareId;

  return(
    <div css={classes.timerDisplayTable}>
      <h6 tw='sm:block hidden dark:text-white'>コロシアム残り時間</h6>
      <div tw='flex-grow flex items-center sm:items-start w-max mx-auto text-3xl'>
        <div tw='w-36 mr-4 text-center block sm:hidden'>
          <span>コロシアム<br />残り時間</span>
        </div>
        <div tw='flex flex-col'>
          <div tw='flex flex-row'>
            <TimerTextLabel4 css={zoom && classes.zoomTimerTextLabel4WithIcon}>全体時間</TimerTextLabel4>            
            <TimerDataLabel css={zoom && classes.zoomTimerDataLabelWithIcon}>{coloCountText}</TimerDataLabel>
          </div>
          <div tw='flex'>
            <div tw='w-20 h-20 my-1'>
              <div data-id={coloMareId} />
              <AnyImage filename={`cards/CardS${imageId}.png`} />
            </div>
            <div>
              <div tw='flex' >
                <TimerTextLabel2 css={zoom && classes.zoomTimerTextLabel2WithIcon}>発動</TimerTextLabel2>
                <TimerDataLabel css={zoom && classes.zoomTimerDataLabelWithIcon}>{coloMareStartTime}</TimerDataLabel>
              </div>
              <div tw='flex'>
                <TimerTextLabel2 css={zoom && classes.zoomTimerTextLabel2WithIcon}>終了</TimerTextLabel2>
                <TimerDataLabel css={zoom && classes.zoomTimerDataLabelWithIcon}>{coloMareEndTime}</TimerDataLabel>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

interface mareTimerTableProps {
  zoom: boolean;
  readyCountText: string;
  mareCountText: string;
};

const MareTimerTable = React.memo((props: mareTimerTableProps) => {
  const { zoom, readyCountText, mareCountText } = props;

  return(
    <div css={classes.timerDisplayTable}>
      <h6 tw='sm:block hidden dark:text-white'>メアタイマー</h6>
      <div tw='flex-grow flex items-center sm:items-start w-max mx-auto text-3xl'>
        <div tw='w-36 mr-4 text-center block sm:hidden'>
          <span>メア<br />タイマー</span>
        </div>
        <div tw='flex flex-col'>
          <div tw='flex'>
            <TimerTextLabel4 css={zoom && classes.zoomTimerTextLabel4}>発動時間</TimerTextLabel4>
            <TimerDataLabel css={zoom && classes.zoomTimerDataLabel}>{readyCountText}</TimerDataLabel>
          </div>
          <div tw='flex'>
            <TimerTextLabel4 css={zoom && classes.zoomTimerTextLabel4}>終了時間</TimerTextLabel4>
            <TimerDataLabel css={zoom && classes.zoomTimerDataLabel}>{mareCountText}</TimerDataLabel>
          </div>
        </div>
      </div>
    </div>
  );
});

interface shinmaTimerTableProps {
  zoom: boolean;
  shinmaCountText: string;
  shinmaEndTime: string;
};

const ShinmaTimerTable = React.memo((props: shinmaTimerTableProps) => {
  const { zoom, shinmaCountText, shinmaEndTime } = props;

  return(
    <div css={classes.timerDisplayTable}>
      <h6 tw='hidden sm:block dark:text-white'>神魔タイマー</h6>
      <div tw='flex-grow flex items-center sm:items-start w-max mx-auto text-3xl'>
        <div tw='w-36 mr-4 text-center block sm:hidden'>
          <span>神魔<br />タイマー</span>
        </div>
        <div tw='flex flex-col'>
          <div tw='flex'>
            <TimerTextLabel4 css={zoom && classes.zoomTimerTextLabel4}>残り時間</TimerTextLabel4>
            <TimerDataLabel css={zoom && classes.zoomTimerDataLabel}>{shinmaCountText}</TimerDataLabel>
          </div>
          <div tw='flex'>
            <TimerTextLabel4 css={zoom && classes.zoomTimerTextLabel4}>終了時刻</TimerTextLabel4>
            <TimerDataLabel css={zoom && classes.zoomTimerDataLabel}>{shinmaEndTime}</TimerDataLabel>
          </div>
        </div>
      </div>
    </div>
  );
});

interface timerDisplayTableProps {
  coloCountText: string;
  coloMareStartTime: string;
  coloMareEndTime: string;
  coloMareId: string;
  readyCountText: string;
  mareCountText: string;
  shinmaCountText: string;
  shinmaEndTime: string;
}

const TimerDisplayTable = (props: timerDisplayTableProps) => {
  const { coloCountText, coloMareStartTime, coloMareEndTime, coloMareId, readyCountText, mareCountText, shinmaCountText, shinmaEndTime } = props;
  const [zoom, setZoom] = useState<boolean>(false);

  useEffect(() => {
    setZoom(localStorage.getItem(`timerZoom`) === `in`);
  }, []);

  const handleZoomButton = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      localStorage.setItem(`timerZoom`, `in`);
      setZoom(true);
    } else {
      localStorage.setItem(`timerZoom`, `out`);
      setZoom(false);
    }
  };

  return (
    <div tw='flex flex-wrap relative'>
      <div tw='absolute top-0 right-4'>
        <input
          type='checkbox'
          id='zoomButton'
          tw='absolute appearance-none'
          onChange={(e) => handleZoomButton(e)}
        />
        <label
          htmlFor='zoomButton'
          tw='inline-block w-12 h-10 cursor-pointer rounded transition ease px-2 py-1 bg-transb-16 hover:bg-transb-24 dark:(bg-transw-24 hover:bg-transw-16)'
        >
          {zoom
            ?
            <svg tw='w-8 h-8' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
            </svg>
            :
            <svg tw='w-8 h-8' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
            </svg>
          }
        </label>
      </div>
      <TimerTable
        zoom={zoom}
        coloCountText={coloCountText}
        coloMareStartTime={coloMareStartTime}
        coloMareEndTime={coloMareEndTime}
        coloMareId={coloMareId}
      />
      <MareTimerTable
        zoom={zoom}
        readyCountText={readyCountText}
        mareCountText={mareCountText}
      />
      <ShinmaTimerTable
        zoom={zoom}
        shinmaCountText={shinmaCountText}
        shinmaEndTime={shinmaEndTime}
      />
    </div>
  );
};

export default TimerDisplayTable;

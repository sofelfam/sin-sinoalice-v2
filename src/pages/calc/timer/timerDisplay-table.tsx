import React from "react";
import tw from 'twin.macro';

const classes = {
  timerDisplayTable: tw`
    flex flex-col sm:w-1/3 w-full p-2
  `,
  timerTextLabel4: tw`
    w-36 m-1 text-center font-bold border-b border-gray-400
  `,
  timerTextLabel2: tw`
    w-16 m-1 text-center font-bold border-b border-gray-400
  `,
  timerDataLabel: tw`
    w-40 m-1 text-center font-mono font-bold border-b border-gray-400
  `,
};

interface timerTableProps {
  coloCountText: string;
  coloMareId: string;
  coloMareStartTime: string;
  coloMareEndTime: string;
};

const TimerTable = (props: timerTableProps) => {
  const { coloCountText, coloMareId, coloMareStartTime, coloMareEndTime } = props;

  return(
    <div css={[classes.timerDisplayTable]}>
      <h6 tw='sm:block hidden'>コロシアム残り時間</h6>
      <div tw='flex-grow flex items-center sm:items-start w-max mx-auto text-3xl'>
        <div tw='w-32 mr-4 text-center block sm:hidden'>
          <span>コロシアム<br />残り時間</span>
        </div>
        <div tw='flex flex-col'>
          <div tw='flex flex-row'>
            <div css={[classes.timerTextLabel4]}>全体時間</div>
            <div css={[classes.timerDataLabel]}>{coloCountText}</div>
          </div>
          <div tw='flex'>
            <div tw='w-20 h-20 my-1'>
              <div data-id={coloMareId} />
            </div>
            <div>
              <div tw='flex' >
                <div css={[classes.timerTextLabel2]}>発動</div>
                <div css={[classes.timerDataLabel]}>{coloMareStartTime}</div>
              </div>
              <div tw='flex'>
                <div css={[classes.timerTextLabel2]}>終了</div>
                <div css={[classes.timerDataLabel]}>{coloMareEndTime}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface mareTimerTableProps {
  readyCountText: string;
  mareCountText: string;
};

const MareTimerTable = (props: mareTimerTableProps) => {
  const { readyCountText, mareCountText } = props;

  return(
    <div css={[classes.timerDisplayTable]}>
      <h6 tw='sm:block hidden'>メアタイマー</h6>
      <div tw='flex-grow flex items-center sm:items-start w-max mx-auto text-3xl'>
        <div tw='w-32 mr-4 text-center block sm:hidden'>
          <span>メア<br />タイマー</span>
        </div>
        <div tw='flex flex-col'>
          <div tw='flex'>
            <div css={[classes.timerTextLabel4]}>発動時間</div>
            <div css={[classes.timerDataLabel]}>{readyCountText}</div>
          </div>
          <div tw='flex'>
            <div css={[classes.timerTextLabel4]}>終了時間</div>
            <div css={[classes.timerDataLabel]}>{mareCountText}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface shinmaTimerTableProps {
  shinmaCountText: string;
  shinmaEndTime: string;
};

const ShinmaTimerTable = (props: shinmaTimerTableProps) => {
  const { shinmaCountText, shinmaEndTime } = props;

  return(
    <div css={[classes.timerDisplayTable]}>
      <h6 tw='hidden sm:block'>神魔タイマー</h6>
      <div tw='flex-grow flex items-center sm:items-start w-max mx-auto text-3xl'>
        <div tw='w-32 mr-4 text-center block sm:hidden'>
          <span>神魔<br />タイマー</span>
        </div>
        <div tw='flex flex-col'>
          <div tw='flex'>
            <div css={[classes.timerTextLabel4]}>残り時間</div>
            <div css={[classes.timerDataLabel]}>{shinmaCountText}</div>
          </div>
          <div tw='flex'>
            <div css={[classes.timerTextLabel4]}>終了時刻</div>
            <div css={[classes.timerDataLabel]}>{shinmaEndTime}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

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

  return (
    <div tw='flex flex-wrap'>
      <TimerTable
        coloCountText={coloCountText}
        coloMareStartTime={coloMareStartTime}
        coloMareEndTime={coloMareEndTime}
        coloMareId={coloMareId}
      />
      <MareTimerTable
        readyCountText={readyCountText}
        mareCountText={mareCountText}
      />
      <ShinmaTimerTable
        shinmaCountText={shinmaCountText}
        shinmaEndTime={shinmaEndTime}
      />
    </div>
  );
};

export default TimerDisplayTable;

import React, { useCallback, useEffect, useRef, useState } from 'react';
import 'twin.macro';
import TimerDisplayTable from './timerDisplay-table';
import TimerHistoryTable from './timerHistory-table';
import TimerSettingTable from './timerSetting-table';
import soundStart from '../../../../assets/sounds/cursor2.mp3'
import soundEnd from '../../../../assets/sounds/warning1.mp3'
import { useSet } from 'src/hooks';
import { MediaMobile } from 'src/store';
import { useTimerNow, useTimerClock } from 'src/hooks';
import { dateUtil } from 'src/util';

export interface historyProps {
  id: string;
  nowText: string;
  readyText: string;
  endText: string;
}

const ColoTimerTable = () => {  
  //コロシアム残り時間
  const [coloCount, coloCountFunc] = useTimerClock();
  //発動残り時間
  const [, readyCountFunc] = useTimerNow(false);
  // //効果残り時間
  const [, mareCountFunc] = useTimerNow(false);
  // //神魔残り時間
  const [, shinmaCountFunc] = useTimerNow(false);

  //発動・効果タイミング
  const [coloMareTime, setColoMareTime] = useState<Date[]>([dateUtil.nowZeroDate(), dateUtil.nowZeroDate()]);
  //神魔終了タイミング
  const [shinmaEndTime, setShinmaEndTime] = useState(dateUtil.nowZeroDate());
  
  /**
   * [0] メア準備時間（設置型による変更加味）
   * [1] メア効果時間
   * [2] pureメア準備時間（逆刻で使用）
   */
  const mareTimeRef = useRef<number[] | null>(null);
  //タイマー測定開始時間保持
  const readyRef = useRef<Date | null>(null);
  //残り時間を保持
  const leftTimeRef = useRef<Date | null>(null);

  // ここについて次回
  
  //タイマーが起動しているかの判定
  const [startActivate, setStartActivate] = useState(false);
  //メアID
  const [mareId, setMareId] = useState('0465');
  //トリガーボタン情報
  const [triggers, updateTriggers] = useSet<string>();
  //ボタンDisabled
  const [startButtonDisabled, setStartButtonDisabled] = useState(false);
  const [optButtonDisabled, setOptButtonDisabled] = useState(true);

  //メア履歴
  const [history, setHistory] = useState<historyProps[]>([]);

  const [audio, setAudio] = useState<HTMLAudioElement[]>();
  useEffect(() => {
    setAudio([new Audio(soundStart),
              new Audio(soundEnd)]);
  }, []);

  let firstNightmareFlag: boolean = true;
  let firstShinmaFlag: boolean = true;

  const tick_tock = (i: number) => {
    if(audio && audio[i]) audio[i].play();
  }
  
  // readyカウントダウン
  // trigger: 設置型を無視するか否か
  const ready_countdown = (trigger?: boolean): void => {
    if (!(mareTimeRef.current !== null && readyRef.current !== null)) return;
    const tempMareTime = trigger ? mareTimeRef.current[2] : mareTimeRef.current[0];
    var endDate = dateUtil.getEndDate(readyRef.current, tempMareTime);
    var count = dateUtil.getCountdownDate(endDate);

    if (count.getDate() != new Date().getDate()) {
      tick_tock(1);
      firstNightmareFlag = true;
      readyCountFunc.clear();
      readyCountFunc.init();
    } else {
      readyCountFunc.setCountdown(count);
      if (firstNightmareFlag && count.getMinutes() * 60 + count.getSeconds() == 10) {      
        tick_tock(0);
        firstNightmareFlag = false;
      }
    }
  };
  
  //メアカウントダウン
  const mare_countdown = (): void => {
    if (!(mareTimeRef.current !== null && readyRef.current !== null)) return;
    var endDate = dateUtil.getEndDate(readyRef.current, mareTimeRef.current[0] + mareTimeRef.current[1]);
    var count = dateUtil.getCountdownDate(endDate);

    if (count.getDate() != new Date().getDate()) {
      tick_tock(1);
      firstNightmareFlag = true;
      setStartButtonDisabled(false);
      setOptButtonDisabled(true);
      updateTriggers.clear();

      mareCountFunc.clear();
      mareCountFunc.init();

      readyRef.current = new Date();
      mareTimeRef.current = [0, 0];
      setStartActivate(false);
    } else {
      mareCountFunc.setCountdown(count);
      if (firstNightmareFlag && count.getMinutes() * 60 + count.getSeconds() == 10) {
        tick_tock(0);
        firstNightmareFlag = false;
      }
    }
  };

  //神魔カウントダウン
  const shinma_countdown = (time: Date) => {
    var endDate = dateUtil.getEndDate(time, 90);
    var count = dateUtil.getCountdownDate(endDate);

    if (count.getDate() != new Date().getDate()) {
      tick_tock(1);
      firstShinmaFlag = true;

      shinmaCountFunc.clear();
      shinmaCountFunc.init();
    } else {
      shinmaCountFunc.setCountdown(count);
      if (firstShinmaFlag && count.getMinutes() * 60 + count.getSeconds() == 10) {
        tick_tock(0);
        firstShinmaFlag = false;
      }
    }
  }

  const handleShinmaButton = (() => {
    const initShinma = new Date();
    tick_tock(0);
    setShinmaEndTime(dateUtil.getEndDate(coloCount, -90));
    
    shinmaCountFunc.clear();
    shinmaCountFunc.run({func: shinma_countdown, param: initShinma});
  });

  const handleStartButton = () => {
    setStartActivate(true);
    readyRef.current = new Date();
    leftTimeRef.current = coloCount;
    tick_tock(0);

    readyCountFunc.clear();
    mareCountFunc.clear();

    setStartButtonDisabled(true);
  };

  const handleRestartButton = useCallback(() => {
    readyRef.current = new Date();
    if (mareTimeRef.current !== null) setColoMareTime([dateUtil.getEndDate(coloCount, -1 - mareTimeRef.current[2]), dateUtil.getEndDate(coloCount, -1 - mareTimeRef.current[2] - mareTimeRef.current[1])]);
    
    readyCountFunc.clear();
    mareCountFunc.clear();
    readyCountFunc.run({func: ready_countdown, param: true});
    mareCountFunc.run({func: mare_countdown});
  }, [readyRef.current, leftTimeRef.current, mareTimeRef.current]);

  const handleShorteningButton = useCallback(() => {
    if (!(readyRef.current !== null && leftTimeRef.current !== null)) return;
    readyRef.current = dateUtil.getEndDate(readyRef.current, -60);
    leftTimeRef.current = dateUtil.getEndDate(leftTimeRef.current, 60);
    setColoMareTime([dateUtil.getEndDate(coloMareTime[0], 60), dateUtil.getEndDate(coloMareTime[1], 60)]);
  }, [readyRef.current, leftTimeRef.current, coloMareTime]);
  
  const handleMinusButton = useCallback(() => {
    if (!(readyRef.current !== null && leftTimeRef.current !== null)) return;
    readyRef.current = dateUtil.getEndDate(readyRef.current, -1);
    leftTimeRef.current = dateUtil.getEndDate(leftTimeRef.current, 1);
    setColoMareTime([dateUtil.getEndDate(coloMareTime[0], 1), dateUtil.getEndDate(coloMareTime[1], 1)]);
  }, [readyRef.current, leftTimeRef.current, coloMareTime]);

  const handleClearButton = useCallback(() => {
    readyCountFunc.init();
    mareCountFunc.init();
    readyRef.current = new Date();
    mareTimeRef.current = [0, 0];
    setStartActivate(false);
    setColoMareTime([dateUtil.nowZeroDate(), dateUtil.nowZeroDate()])
    setMareId('0465');
 
    readyCountFunc.clear();
    mareCountFunc.clear();
    
    setStartButtonDisabled(false);
    setOptButtonDisabled(true);
    updateTriggers.clear();
  }, []);

  const handleNightmareButton = (e: React.MouseEvent<HTMLElement>) => {
    if (startActivate === false) {
      readyRef.current = new Date;
      leftTimeRef.current = coloCount;
      tick_tock(0);
    }
    setStartActivate(true);
    if (!leftTimeRef.current) leftTimeRef.current = coloCount;

    const mareButtonReady = !(e.currentTarget.dataset.ready) ? 0 : +(e.currentTarget.dataset.ready);
    const mareReady = triggers.has('90s') ? 90 : 
                      triggers.has('5s') ? 5 :
                      mareButtonReady;
    const mareActivate = !(e.currentTarget.dataset.activate) ? 0 : +(e.currentTarget.dataset.activate);
    mareTimeRef.current = [mareReady, mareActivate, mareButtonReady];

    const mareStartDate = dateUtil.getEndDate(leftTimeRef.current, -1 - mareTimeRef.current[0]);
    const mareEndDate = dateUtil.getEndDate(leftTimeRef.current, -1 - mareTimeRef.current[0] - mareTimeRef.current[1]);
    setColoMareTime([mareStartDate, mareEndDate]);
    const tempId = !(e.currentTarget.dataset.id) ? '0465' : e.currentTarget.dataset.id;
    setMareId(tempId);
    
    readyCountFunc.clear();
    mareCountFunc.clear();
    readyCountFunc.run({func: ready_countdown, param: false});
    mareCountFunc.run({func: mare_countdown});
    
    setStartButtonDisabled(true);
    setOptButtonDisabled(false);

    const countText_now = dateUtil.getTimeText(dateUtil.getEndDate(leftTimeRef.current, -1));
    const countText_ready = dateUtil.getTimeText(dateUtil.getEndDate(leftTimeRef.current, mareTimeRef.current[0] * -1 - 1));
    const countText_end = dateUtil.getTimeText(dateUtil.getEndDate(leftTimeRef.current, (mareTimeRef.current[0] + mareTimeRef.current[1]) * -1 - 1));

    setHistory(history => [...history, {id: tempId, nowText: countText_now, readyText: countText_ready, endText: countText_end}]);
  };

  return(
    <div tw='flex lg:w-4/5 lg:mx-auto w-full mx-0'>
      <div tw='flex-grow flex flex-col'>
        <TimerDisplayTable
          coloCountText={coloCountFunc.toString()}
          coloMareStartTime={dateUtil.getTimeText(coloMareTime[0]).slice(0,8)}
          coloMareEndTime={dateUtil.getTimeText(coloMareTime[1]).slice(0,8)}
          coloMareId={mareId}
          readyCountText={readyCountFunc.toString()}
          mareCountText={mareCountFunc.toString()}
          shinmaCountText={shinmaCountFunc.toString()}
          shinmaEndTime={dateUtil.getTimeText(shinmaEndTime).slice(0,8)}
        />
        {<TimerSettingTable
          triggers={triggers}
          updateTriggers={updateTriggers}
          optButtonDisabled={optButtonDisabled}
          startButtonDisabled={startButtonDisabled}
          handleShinmaButton={handleShinmaButton}
          handleStartButton={handleStartButton}
          handleRestartButton={handleRestartButton}
          handleShorteningButton={handleShorteningButton}
          handleMinusButton={handleMinusButton}
          handleClearButton={handleClearButton}
          handleNightmareButton={handleNightmareButton}
        />}
      </div>
      <HistoryTable
        history={history}
        setHistory={setHistory}
      />
    </div>
  )
};

const HistoryTable: React.FCX<{
  history: historyProps[];
  setHistory: React.Dispatch<React.SetStateAction<historyProps[]>>;
}> = ({ history, setHistory }) => {
  const { isMobile } = MediaMobile.useContainer();
  if (isMobile) {
    return null;
  } else {
    return (
      <div tw='md:w-max md:ml-6 md:block w-0 ml-0 hidden'>
        <TimerHistoryTable
          history={history}
          setHistory={setHistory}
        />
      </div>
    );
  }
};

export default ColoTimerTable;

import React, { useCallback, useEffect, useRef, useState } from 'react';
import 'twin.macro';
import TimerDisplayTable from './timerDisplay-table';
import TimerHistoryTable from './timerHistory-table';
import TimerSettingTable from './timerSetting-table';
import soundStart from '../../../../assets/sounds/cursor2.mp3'
import soundEnd from '../../../../assets/sounds/warning1.mp3'
import { useSet } from 'src/hooks';

export interface historyProps {
  id: string;
  nowText: string;
  readyText: string;
  endText: string;
}

const ColoTimerTable = () => {
  const nowZeroDate = (): Date => {
    const now = new Date();
    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);
    //now.setMilliseconds(0);
    return now;
  }

  //コロシアム残り時間
  const [coloCount, setColoCount] = useState(new Date);
  const coloCountDownRef = useRef<NodeJS.Timeout | null>(null);
  //発動残り時間
  const [readyCount, setReadyCount] = useState(nowZeroDate());
  const readyCountDownRef = useRef<NodeJS.Timeout | null>(null);
  //効果残り時間
  const [mareCount, setMareCount] = useState(nowZeroDate());
  const mareCountDownRef = useRef<NodeJS.Timeout | null>(null);
  //タイマーが起動しているかの判定
  const [startActivate, setStartActivate] = useState(false);
  //発動・効果タイミング
  const [coloMareTime, setColoMareTime] = useState<Date[]>([nowZeroDate(), nowZeroDate()]);
  //メアID
  const [mareId, setMareId] = useState('0465');
  //神魔残り時間
  const [shinmaCount, setShinmaCount] = useState(nowZeroDate());
  const shinmaCountDownRef = useRef<NodeJS.Timeout | null>(null);
  //神魔終了タイミング
  const [shinmaEndTime, setShinmaEndTime] = useState(nowZeroDate());
  
  /* [0] メア準備時間（設置型による変更加味）
  ** [1] メア効果時間
  ** [2] pureメア準備時間（逆刻で使用）
  */
  const mareTimeRef = useRef<number[] | null>(null);
  //タイマー測定開始時間保持
  const readyRef = useRef<Date | null>(null);
  //残り時間を保持
  const leftTimeRef = useRef<Date | null>(null);

  //トリガーボタン情報
  const [triggers, updateTriggers] = useSet<string>();
 
  //ボタンDisabled
  const [startButtonDisabled, setStartButtonDisabled] = useState(false);
  const [optButtonDisabled, setOptButtonDisabled] = useState(true);

  //メア履歴
  const [history, setHistory] = useState<historyProps[]>([]);

  useEffect(() => {
    const startTime = getCloseColoTime();    
    coloCountDownRef.current = setTimeout(setColoCount.bind(null, colo_countdown(startTime)), 50);
    return () => {
      if (coloCountDownRef.current !== null) clearTimeout(coloCountDownRef.current);
      coloCountDownRef.current = null;
    };
  }, [coloCount]);

  const [audio, setAudio] = useState<HTMLAudioElement[]>();
  useEffect(() => {
    setAudio([new Audio(soundStart),
              new Audio(soundEnd)]);
  }, []);

  let firstNightmareFlag: boolean = true;
  let firstShinmaFlag: boolean = true;

  const getCloseColoTime = (): Date => {
    var now = new Date();
    var time = Number(now.getHours() + '' + ('0' + now.getMinutes()).slice(-2));

    if (coloCountDownRef.current !== null) clearTimeout(coloCountDownRef.current);
    var startTime;
    if (time <= 800) {
      startTime = '8:00';
    } else if (time <= 1250) {
      startTime = '12:30';
    } else if (time <= 1820) {
      startTime = '18:00';
    } else if (time <= 1920) {
      startTime = '19:00';
    } else if (time <= 2020) {
      startTime = '20:00';
    } else if (time <= 2120) {
      startTime = '21:00';
    } else if (time <= 2220) {
      startTime = '22:00';
    } else if (time <= 2320) {
      startTime = '23:00';
    } else {
      startTime = '24:00';
    }
    return getTimeDate(startTime + ':00:00');
  }

  const getTimeText = (date: Date): string => {
    let hh, mm, ss, dd;
    hh = ('0' + date.getHours()).slice(-2);
    mm = ('0' + date.getMinutes()).slice(-2);
    ss = ('0' + date.getSeconds()).slice(-2);
    //dd =  (date.getMilliseconds() + '0').slice(0, 2);
    dd = 0;
    return hh + ':' + mm + ':' + ss + ':' + dd;
  }

  const getTimeDate = (dateValue: string): Date => {
    const dateArray = dateValue.split(':');
    const date = new Date();
    date.setHours(Number(dateArray[0]));
    date.setMinutes(Number(dateArray[1]));
    date.setSeconds(Number(dateArray[2]));
    //date.setMilliseconds(Number(dateArray[3]));
    return date;
  }

  //endDateまでの時間
  const getCountdownDate = (endDate: Date): Date => {
    const now = nowZeroDate();
    now.setTime(now.getTime() + endDate.getTime() - new Date().getTime());
    return now;
  }

  const getEndDate = (endtime: number, date: Date): Date => {
    const now = new Date(date);
    if (!endtime) return now;
    now.setSeconds(date.getSeconds() + endtime);
    return now;
  }

  const tick_tock = (i: number) => {
    if(audio && audio[i]) audio[i].play();
  }

  //コロシアム残り時間
  const colo_countdown = (date: Date): Date => {
    const endDate = getEndDate(1200, date);
    const count = getCountdownDate(endDate);
    
    if (count.getDate() !== new Date().getDate() && coloCountDownRef.current !== null) {
      clearTimeout(coloCountDownRef.current);
      coloCountDownRef.current = null;
      return nowZeroDate();
    }
    
    return count;
  }
  
  // readyカウントダウン
  // trigger: 設置型を無視するか否か
  const ready_countdown = (trigger?: boolean): void => {
    if (!(mareTimeRef.current !== null && readyRef.current !== null)) return;
    const tempMareTime = trigger ? mareTimeRef.current[2] : mareTimeRef.current[0];
    var endDate = getEndDate(tempMareTime, readyRef.current);
    var count = getCountdownDate(endDate);

    if (count.getDate() != new Date().getDate()) {
      tick_tock(1);
      firstNightmareFlag = true;
      if (readyCountDownRef.current !== null) clearInterval(readyCountDownRef.current);
      readyCountDownRef.current = null;
      setReadyCount(() => nowZeroDate());
    } else {
      setReadyCount(count);
      if (firstNightmareFlag && count.getMinutes() * 60 + count.getSeconds() == 10) {      
        tick_tock(0);
        firstNightmareFlag = false;
      }
    }
  };
  
  //メアカウントダウン
  const mare_countdown = (): void => {
    if (!(mareTimeRef.current !== null && readyRef.current !== null)) return;
    var endDate = getEndDate(mareTimeRef.current[0] + mareTimeRef.current[1], readyRef.current);
    var count = getCountdownDate(endDate);

    if (count.getDate() != new Date().getDate()) {
      tick_tock(1);
      firstNightmareFlag = true;
      setStartButtonDisabled(false);
      setOptButtonDisabled(true);
      updateTriggers.clear();

      if (mareCountDownRef.current !== null) clearInterval(mareCountDownRef.current);
      mareCountDownRef.current = null;
      setMareCount(() => nowZeroDate());
      readyRef.current = new Date();
      mareTimeRef.current = [0, 0];
      setStartActivate(false);
    } else {
      setMareCount(count);
      if (firstNightmareFlag && count.getMinutes() * 60 + count.getSeconds() == 10) {
        tick_tock(0);
        firstNightmareFlag = false;
      }
    }
  };

  //神魔カウントダウン
  const shinma_countdown = (time: Date) => {
    var endDate = getEndDate(90, time);
    var count = getCountdownDate(endDate);

    if (count.getDate() != new Date().getDate()) {
      tick_tock(1);
      firstShinmaFlag = true;

      if (shinmaCountDownRef.current !== null) clearInterval(shinmaCountDownRef.current);
      shinmaCountDownRef.current = null;
      setShinmaCount(() => nowZeroDate());
    } else {
      setShinmaCount(count);
      if (firstShinmaFlag && count.getMinutes() * 60 + count.getSeconds() == 10) {
        tick_tock(0);
        firstShinmaFlag = false;
      }
    }
  }

  const handleShinmaButton = (() => {
    const initShinma = new Date();
    tick_tock(0);
    setShinmaEndTime(getEndDate(-90, coloCount));
    
    if (shinmaCountDownRef.current !== null) clearInterval(shinmaCountDownRef.current);
    shinmaCountDownRef.current = setInterval(shinma_countdown.bind(undefined, initShinma), 50);
  });

  const handleStartButton = () => {
    setStartActivate(true);
    readyRef.current = new Date();
    leftTimeRef.current = coloCount;
    tick_tock(0);

    if (readyCountDownRef.current !== null) clearInterval(readyCountDownRef.current);
    readyCountDownRef.current = null;
    if (mareCountDownRef.current !== null) clearInterval(mareCountDownRef.current);
    mareCountDownRef.current = null;

    setStartButtonDisabled(true);
  };

  const handleRestartButton = useCallback(() => {
    readyRef.current = new Date();
    if (mareTimeRef.current !== null) setColoMareTime([getEndDate(-1 - mareTimeRef.current[2], coloCount), getEndDate(-1 - mareTimeRef.current[2] - mareTimeRef.current[1], coloCount)]);
    
    if (readyCountDownRef.current !== null) clearInterval(readyCountDownRef.current);
    readyCountDownRef.current = null;
    if (mareCountDownRef.current !== null) clearInterval(mareCountDownRef.current);
    mareCountDownRef.current = null;
    readyCountDownRef.current = setInterval(ready_countdown.bind(undefined, true), 50);
    mareCountDownRef.current = setInterval(mare_countdown, 50);
  }, [readyRef.current, leftTimeRef.current, mareTimeRef.current]);

  const handleShorteningButton = useCallback(() => {
    if (!(readyRef.current !== null && leftTimeRef.current !== null)) return;
    readyRef.current = getEndDate(-60, readyRef.current);
    leftTimeRef.current = getEndDate(60, leftTimeRef.current);
    setColoMareTime([getEndDate(60, coloMareTime[0]), getEndDate(60, coloMareTime[1])]);
  }, [readyRef.current, leftTimeRef.current, coloMareTime]);
  
  const handleMinusButton = useCallback(() => {
    if (!(readyRef.current !== null && leftTimeRef.current !== null)) return;
    readyRef.current = getEndDate(-1, readyRef.current);
    leftTimeRef.current = getEndDate(1, leftTimeRef.current);
    setColoMareTime([getEndDate(1, coloMareTime[0]), getEndDate(1, coloMareTime[1])]);
  }, [readyRef.current, leftTimeRef.current, coloMareTime]);

  const handleClearButton = useCallback(() => {
    const initTime = nowZeroDate();
    setReadyCount(initTime);
    setMareCount(initTime);
    readyRef.current = new Date();
    mareTimeRef.current = [0, 0];
    setStartActivate(false);
    setColoMareTime([initTime, initTime])
    setMareId('0465');
 
    if (readyCountDownRef.current !== null) clearInterval(readyCountDownRef.current);
    readyCountDownRef.current = null;
    if (mareCountDownRef.current !== null) clearInterval(mareCountDownRef.current);
    mareCountDownRef.current = null;
    
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

    const mareStartDate = getEndDate(-1 - mareTimeRef.current[0], leftTimeRef.current);
    const mareEndDate = getEndDate(-1 - mareTimeRef.current[0] - mareTimeRef.current[1], leftTimeRef.current);
    setColoMareTime([mareStartDate, mareEndDate]);
    const tempId = !(e.currentTarget.dataset.id) ? '0465' : e.currentTarget.dataset.id;
    setMareId(tempId);
    
    if (readyCountDownRef.current !== null) clearInterval(readyCountDownRef.current);
    readyCountDownRef.current = null;
    if (mareCountDownRef.current !== null) clearInterval(mareCountDownRef.current);
    mareCountDownRef.current = null;
    readyCountDownRef.current = setInterval(ready_countdown.bind(undefined, false), 50);
    mareCountDownRef.current = setInterval(mare_countdown, 50);
    
    setStartButtonDisabled(true);
    setOptButtonDisabled(false);

    const countText_now = getTimeText(getEndDate(-1, leftTimeRef.current));
    const countText_ready = getTimeText(getEndDate(mareTimeRef.current[0] * -1 - 1, leftTimeRef.current));
    const countText_end = getTimeText(getEndDate((mareTimeRef.current[0] + mareTimeRef.current[1]) * -1 - 1, leftTimeRef.current));

    setHistory(history => [...history, {id: tempId, nowText: countText_now, readyText: countText_ready, endText: countText_end}]);
  };

  return(
    <div tw='flex lg:w-4/5 lg:mx-auto w-full mx-0'>
      <div tw='flex-grow flex flex-col'>
        <TimerDisplayTable
          coloCountText={getTimeText(coloCount).slice(0,8)}
          coloMareStartTime={getTimeText(coloMareTime[0]).slice(0,8)}
          coloMareEndTime={getTimeText(coloMareTime[1]).slice(0,8)}
          coloMareId={mareId}
          readyCountText={getTimeText(readyCount).slice(0,8)}
          mareCountText={getTimeText(mareCount).slice(0,8)}
          shinmaCountText={getTimeText(shinmaCount).slice(0,8)}
          shinmaEndTime={getTimeText(shinmaEndTime).slice(0,8)}
        />
        <TimerSettingTable
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
        />
      </div>
      <div tw='md:w-max md:ml-6 md:block w-0 ml-0 hidden'>
        <TimerHistoryTable
          history={history}
          setHistory={setHistory}
        />
      </div>
    </div>
  )
};

export default ColoTimerTable;

import React, { useCallback, useEffect, useRef, useState } from 'react';
import 'twin.macro';
import TimerDisplayTable from './timerDisplay-table';
import TimerHistoryTable from './timerHistory-table';
import TimerSettingTable from './timerSetting-table';

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
  const [coloMareTime, setColoMareTime] = useState([nowZeroDate(), nowZeroDate()]);
  //メアID
  const [mareId, setMareId] = useState("0465");
  //神魔残り時間
  const [shinmaCount, setShinmaCount] = useState(nowZeroDate());
  const shinmaCountDownRef = useRef<NodeJS.Timeout | null>(null);
  //神魔終了タイミング
  const [shinmaEndTime, setShinmaEndTime] = useState(nowZeroDate())
  
  //メア時間保持
  const mareTimeRef = useRef<number[] | null>(null);
  //タイマー測定開始時間保持
  const readyRef = useRef<Date | null>(null);
  //残り時間を保持
  const leftTimeRef = useRef<Date | null>(null);

  //トリガーボタン情報
  const [triggers, setTriggers] = useState<string[]>([]);
  const handleTriggers = (_event: React.MouseEvent<HTMLElement>, newTriggers: string[]) => {
    setTriggers(newTriggers);
  };

  //ボタンDisabled
  const [startButtonDisabled, setStartButtonDisabled] = useState(false);
  const [optButtonDisabled, setOptButtonDisabled] = useState(true);

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
    setAudio([new Audio("../../static/sounds/cursor2.mp3"),
              new Audio("../../static/sounds/warning1.mp3")])
  }, []);

  const getCloseColoTime = (): Date => {
    var now = new Date();
    var time = Number(now.getHours() + "" + ("0" + now.getMinutes()).slice(-2));

    if (coloCountDownRef.current !== null) clearTimeout(coloCountDownRef.current);
    var startTime;
    if (time <= 800) {
      startTime = "8:00";
    } else if (time <= 1250) {
      startTime = "12:30";
    } else if (time <= 1820) {
      startTime = "18:00";
    } else if (time <= 1920) {
      startTime = "19:00";
    } else if (time <= 2020) {
      startTime = "20:00";
    } else if (time <= 2120) {
      startTime = "21:00";
    } else if (time <= 2220) {
      startTime = "22:00";
    } else if (time <= 2320) {
      startTime = "23:00";
    } else {
      startTime = "24:00";
    }
    return getTimeDate(startTime + ":00:00");
  }

  const getTimeText = (date: Date): string => {
    let hh, mm, ss, dd;
    hh = ("0" + date.getHours()).slice(-2);
    mm = ("0" + date.getMinutes()).slice(-2);
    ss = ("0" + date.getSeconds()).slice(-2);
    //dd =  (date.getMilliseconds() + "0").slice(0, 2);
    dd = 0;
    return hh + ":" + mm + ":" + ss + ":" + dd;
  }

  const getTimeDate = (dateValue: string): Date => {
    const dateArray = dateValue.split(":");

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

  //readyカウントダウン
  const ready_countdown = ():void => {
    var endDate = getEndDate(mareTimeRef.current[0], readyRef.current);
    var count = getCountdownDate(endDate);

    if (count.getDate() != new Date().getDate()) {
      tick_tock(1);
      if (readyCountDownRef.current !== null) clearInterval(readyCountDownRef.current);
      readyCountDownRef.current = null;
      setReadyCount(() => nowZeroDate());
    } else {
      setReadyCount(count);
      if (count.getMinutes() * 60 + count.getSeconds() == 10) {      
        tick_tock(0);
      }
    }
  };
  
  //メアカウントダウン
  const mare_countdown = () => {
    var endDate = getEndDate(mareTimeRef.current[0] + mareTimeRef.current[1], readyRef.current);
    var count = getCountdownDate(endDate);

    if (count.getDate() != new Date().getDate()) {
      tick_tock(1);
      setStartButtonDisabled(false);
      setOptButtonDisabled(true);
      setTriggers([]);

      if (mareCountDownRef.current !== null) clearInterval(mareCountDownRef.current);
      mareCountDownRef.current = null;
      setMareCount(() => nowZeroDate());
      readyRef.current = new Date();
      mareTimeRef.current = [0, 0];
      setStartActivate(false);
    } else {
      setMareCount(count);
      if (count.getMinutes() * 60 + count.getSeconds() == 10) {
        tick_tock(0);
      }
    }
  };

  //神魔カウントダウン
  const shinma_countdown = (time: Date) => {
    var endDate = getEndDate(90, time);
    var count = getCountdownDate(endDate);

    if (count.getDate() != new Date().getDate()) {
      //tick_tock(1);

      if (shinmaCountDownRef.current !== null) clearInterval(shinmaCountDownRef.current);
      shinmaCountDownRef.current = null;
      setShinmaCount(() => nowZeroDate());
    } else {
      setShinmaCount(count);
      if (count.getMinutes() * 60 + count.getSeconds() == 10) {
        //tick_tock(0);
      }
    }
  }

  const handleShinmaButton = useCallback(() => {
    const initShinma = new Date();
    //tick_tock(0);
    setShinmaEndTime(getEndDate(-90, coloCount));
    
    if (shinmaCountDownRef.current !== null) clearInterval(shinmaCountDownRef.current);
    shinmaCountDownRef.current = setInterval(shinma_countdown.bind(undefined, initShinma), 50);
  }, [coloCount]);

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
  }

  const handleRestartButton = () => {
    //キマイラ、ウインゴ設置後起動メアに対して正常に動作しない（mareTimeRef.current[0]がそれになっている）
    //設置型起動の場合、mareTime[2]に元の時間を保持、この部分のみで[2]チェック
    

    readyRef.current = new Date();
    setColoMareTime([getEndDate(-1-mareTimeRef.current[0], coloCount), getEndDate(-1-mareTimeRef.current[0]-mareTimeRef.current[1], coloCount)]);
    
    if (readyCountDownRef.current !== null) clearInterval(readyCountDownRef.current);
    readyCountDownRef.current = null;
    if (mareCountDownRef.current !== null) clearInterval(mareCountDownRef.current);
    mareCountDownRef.current = null;
    readyCountDownRef.current = setInterval(ready_countdown, 50);
    mareCountDownRef.current = setInterval(mare_countdown, 50);
  }

  const handleShorteningButton = () => {
    readyRef.current = getEndDate(-60, readyRef.current);
    leftTimeRef.current = getEndDate(60, leftTimeRef.current);
    setColoMareTime([getEndDate(60, coloMareTime[0]), getEndDate(60, coloMareTime[1])]);
  }
  
  const handleMinusButton = () => {
    readyRef.current = getEndDate(-1, readyRef.current);
    leftTimeRef.current = getEndDate(1, leftTimeRef.current);
    setColoMareTime([getEndDate(1, coloMareTime[0]), getEndDate(1, coloMareTime[1])]);
  }

  const handleClearButton = useCallback(() => {
    const initTime = nowZeroDate();
    setReadyCount(initTime);
    setMareCount(initTime);
    readyRef.current = new Date();
    mareTimeRef.current = [0, 0];
    setStartActivate(false);
    setColoMareTime([initTime, initTime])
 
    if (readyCountDownRef.current !== null) clearInterval(readyCountDownRef.current);
    readyCountDownRef.current = null;
    if (mareCountDownRef.current !== null) clearInterval(mareCountDownRef.current);
    mareCountDownRef.current = null;
    
    setStartButtonDisabled(false);
    setOptButtonDisabled(true);
    setTriggers([]);
  }, []);

  const handleNightmareButton = (e: React.MouseEvent<HTMLElement>) => {
    if (startActivate === false) {
      readyRef.current = new Date;
      leftTimeRef.current = coloCount;
      tick_tock(0);
    }
    setStartActivate(true);

    const mareReady = triggers.indexOf('90s') !== -1 ? 90 :
                      triggers.indexOf('short') !== -1 ? 5 :
                      e.currentTarget.dataset.ready === undefined ? 0 : +e.currentTarget.dataset.ready;
    const mareActivate = e.currentTarget.dataset.activate === undefined ? 0 : +e.currentTarget.dataset.activate;
    mareTimeRef.current = [mareReady, mareActivate];

    const mareStartDate = getEndDate(-1-mareTimeRef.current[0], leftTimeRef.current);
    const mareEndDate = getEndDate(-1-mareTimeRef.current[0]-mareTimeRef.current[1], leftTimeRef.current);
    setColoMareTime([mareStartDate, mareEndDate]);
    setMareId(e.currentTarget.dataset.id === undefined ? "0465" : e.currentTarget.dataset.id);
    
    if (readyCountDownRef.current !== null) clearInterval(readyCountDownRef.current);
    readyCountDownRef.current = null;
    if (mareCountDownRef.current !== null) clearInterval(mareCountDownRef.current);
    mareCountDownRef.current = null;
    readyCountDownRef.current = setInterval(ready_countdown, 50);
    mareCountDownRef.current = setInterval(mare_countdown, 50);
    
    setStartButtonDisabled(true);
    setOptButtonDisabled(false);

    /*  発動・効果タイミング
    var countText_now = getTimeText(getEndDate(-1, last_time_act));
    var countText_ready = getTimeText(getEndDate(ready * -1 - 1, last_time_act));
    var countText_end = getTimeText(getEndDate((ready + activate) * -1 - 1, last_time_act));

    $("#next_icon").attr("src", "https://sinoalice.game-db.tw/images/card/CardS" + $(this).data("id") + ".png");
    $("#next_ready").html(countText_ready);
    $("#next_end").html(countText_end);
    */
  }

  return(
    <div tw='flex'>
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
          handleTriggers={handleTriggers}
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
      <div tw='md:w-1/3 md:block w-0 hidden'>
        <TimerHistoryTable />
      </div>
    </div>
  )
};

export default ColoTimerTable;

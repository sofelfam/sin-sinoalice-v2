import { MutableRefObject, useEffect, useRef, useState } from "react";
import { dateUtil } from 'src/util';

interface Run {
    func: () => void
}

interface RunWithArg {
    func: (arg1: Date) => void,
    param: any
}

const isRunWithArg = (arg: any): arg is RunWithArg => {
    return arg.param !== undefined;
}

export interface TimerFunctions {
    setCountdown: (countdown: Date) => void;
    init: () => void;
    run: (arg: Run | RunWithArg) => void;
    adjust: (sec: number) => void;
    clear: () => void;
    toString: () => string;
}

export interface ClockFunctions {
    countdown: (countdown: Date) => void;
    toString: () => string;
}

/**
 * 現在時刻または00:00:00の日付でuseTimerを呼び出す
 * @export
 * @param {boolean} isNow trueなら現在時間、falseなら今日の日付の0時0分0秒の日付型を渡す
 * @return {*}  {([Date, MutableRefObject<NodeJS.Timeout | null>, TimerFunctions<T>])} useTimerの呼び出し
 */
export function useTimerNow(isNow: boolean): [Date, TimerFunctions] {
    var date = (isNow) ? new Date() : dateUtil.nowZeroDate();
    return useTimer(date);
}

/**
 * 汎用カウントダウンタイマー
 * @export
 * @param {Date} date
 * @return {*}  {([Date, MutableRefObject<NodeJS.Timeout | null>, TimerFunctions<T>])}
 */
export default function useTimer(date: Date): [Date, TimerFunctions] {
    const [countdown, setCountdown] = useState(date);
    const countRef = useRef<NodeJS.Timeout | null>(null);
    const timeRef = useRef<Date | null>(null);

    const init = () => {
        setCountdown(() => dateUtil.nowZeroDate());
    }

    const run = (arg: RunWithArg | Run) => {
        if (isRunWithArg(arg)) {
            countRef.current = setInterval(arg.func.bind(undefined, arg.param), 50);
        } else {
            countRef.current = setInterval(arg.func, 50);
        }
    }

    const adjust = (sec: number) => {
        if (timeRef.current == null) return;
        timeRef.current = dateUtil.getEndDate(timeRef.current, sec);
    }

    const clear = () => {
        if (countRef.current !== null) clearInterval(countRef.current);
        countRef.current = null;
    }

    const toString = (): string => {
        return dateUtil.getTimeText(countdown).slice(0,8);
    }

    return [
        countdown,
        { setCountdown: setCountdown, init, run, adjust, clear, toString }
    ];
}

/**
 * コロシアム残り時間のカウントダウンタイマー
 * @export
 * @return {*}  {([Date, MutableRefObject<NodeJS.Timeout | null>, ClockFunctions<T>])}
 */
export function useTimerClock(): [Date, ClockFunctions] {
    const [countdown, setCountdown] = useState(new Date);
    const countRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const startTime = getCloseColoTime(countRef);
        countRef.current = setTimeout(setCountdown.bind(null, colo_countdown(startTime)), 50);
        return () => {
            if (countRef.current !== null) clearTimeout(countRef.current);
            countRef.current = null;
        };
    }, [countdown]);

    const toString = (): string => {
        return dateUtil.getTimeText(countdown).slice(0,8);
    }

    /**
     * コロシアム開始時間を返す。
     * @param {(MutableRefObject<NodeJS.Timeout | null>)} countRef 
     * @return {*}  {Date}
     */
    const getCloseColoTime = (countRef: MutableRefObject<NodeJS.Timeout | null>): Date => {
        var now = new Date();
        var time = Number(now.getHours() + '' + ('0' + now.getMinutes()).slice(-2));

        if (countRef.current !== null) clearTimeout(countRef.current);
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
        return dateUtil.getTimeDate(startTime + ':00:00');
    }

    /**
     * コロシアム残り時間のカウントダウンを行う。
     * @param {Date} date 開始時刻の日付
     * @return {*}  {Date} 
     */
    const colo_countdown = (date: Date): Date => {
        const endDate = dateUtil.getEndDate(date, 1200);
        const count = dateUtil.getCountdownDate(endDate);

        if (count.getDate() !== new Date().getDate() && countRef.current !== null) {
            clearTimeout(countRef.current);
            countRef.current = null;
            return dateUtil.nowZeroDate();
        }
        return count;
    }

    return [
        countdown,
        { countdown: setCountdown, toString }
    ];
}
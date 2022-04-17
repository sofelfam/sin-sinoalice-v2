/** 
 * 日付に関するユーティリティ
*/
export namespace dateUtil {
    /**
     * 今日の日付の0時0分0秒の日付型を生成する。
     * @export
     * @return {*}  {Date} 今日の日付の0時0分0秒の日付
     */
    export function nowZeroDate(): Date {
        const now = new Date();
        now.setHours(0);
        now.setMinutes(0);
        now.setSeconds(0);
        //now.setMilliseconds(0);
        return now;
    }

    /**
     * 日付型を文字列"hh:mm:ss:0"に変換する。
     * @export
     * @param {Date} date 日付型
     * @return {*}  {string} "hh:mm:ss:0"
     */
    export function getTimeText(date: Date): string {
        let hh, mm, ss, dd;
        hh = ('0' + date.getHours()).slice(-2);
        mm = ('0' + date.getMinutes()).slice(-2);
        ss = ('0' + date.getSeconds()).slice(-2);
        //dd =  (date.getMilliseconds() + '0').slice(0, 2);
        dd = 0;
        return hh + ':' + mm + ':' + ss + ':' + dd;
    }

    /**
     * 文字列"hh:mm:ss:0"を日付型に変換する。
     * @export
     * @param {string} dateValue "hh:mm:ss:0"
     * @return {*}  {Date} 日付型
     */
    export function getTimeDate(dateValue: string): Date {
        const dateArray = dateValue.split(':');
        const date = new Date();
        date.setHours(Number(dateArray[0]));
        date.setMinutes(Number(dateArray[1]));
        date.setSeconds(Number(dateArray[2]));
        //date.setMilliseconds(Number(dateArray[3]));
        return date;
    }

    /**
     * 引数で受け取った日付型の時刻までの時間を返す。
     * @export
     * @param {Date} endDate　日付型
     * @return {*}  {Date} 日付型
     */
    export function getCountdownDate (endDate: Date): Date {
        const now = nowZeroDate();
        now.setTime(now.getTime() + endDate.getTime() - new Date().getTime());
        return now;
    }

    /**
     * で受け取った日付型の時刻に秒数を加算した時間を返す。
     * @param {Date} date 日付型
     * @param {number} [endtime] 加算する秒数
     * @return {*}  {Date} 加算後の時間
     */
    export function getEndDate (date: Date, endtime?: number): Date {
        const now = new Date(date);
        if (!endtime) return now;
        now.setSeconds(date.getSeconds() + endtime);
        return now;
      }
}
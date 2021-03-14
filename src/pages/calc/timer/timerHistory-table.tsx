import React from "react";
import { AnyImage } from "src/components";
import { Trash } from "src/components/icons";
import tw from 'twin.macro';

const classes = {
  headerCell: tw`
    lg:w-20 w-16 whitespace-nowrap border-b-2 border-blue-200
  `,
  cell: tw`
    lg:text-2xl text-lg whitespace-nowrap font-bold font-mono
  `
}

interface timerHistoryProps {
  history: string[][];
  setHistory: React.Dispatch<React.SetStateAction<string[][]>>;
}

const TimerHistoryTable = (props: timerHistoryProps) => {
  const { history, setHistory } = props;

  const handleDeleteAllButton = () => {
    setHistory([]);
  }
  
  const handleDeleteButton = (row: string[]) => {
    setHistory(history.filter(x => x !== row));
  }

  return (
    <>
      <div tw='relative'>
        <h2 tw='h-12'>発動履歴</h2>
        <div tw='absolute top-0 right-0'>
          <button
            tw='h-10 bg-rose-600 text-white text-lg leading-loose rounded-md px-3 py-1 mx-2 transition ease select-none hover:bg-rose-800 focus:outline-none focus-visible:ring'
            onClick={() => handleDeleteAllButton()}
          >
            一括削除
          </button>
        </div>
      </div>
      <div>
        <table tw='text-xl text-center'>
          <thead>
            <tr>
              <th css={[classes.headerCell]}>発動メア</th>
              <th css={[classes.headerCell]}>準備</th>
              <th css={[classes.headerCell]}>発動</th>
              <th css={[classes.headerCell]}>終了</th>
              <th css={[classes.headerCell]}>削除</th>
            </tr>
          </thead>
          <tbody>
            {history.map((row: string[], index: number) => (
              <tr key={`history-${index}`}>
                <td tw='w-20 h-20'>
                  <AnyImage filename={`images/cards/CardS${('0000' + row[0]).slice(-4)}.png`} />
                </td>
                <td css={[classes.cell]}>{row[1].slice(3,8)}</td>
                <td css={[classes.cell]}>{row[2].slice(3,8)}</td>
                <td css={[classes.cell]}>{row[3].slice(3,8)}</td>
                <td>
                  <button
                    tw='h-12 w-12 bg-rose-600 text-white rounded-md px-2 py-1 sm:px-2 sm:py-1 sm:m-2 transition ease select-none hover:bg-rose-800 focus:outline-none focus-visible:ring'
                    onClick={() => handleDeleteButton(row)}
                  >
                    <Trash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TimerHistoryTable;

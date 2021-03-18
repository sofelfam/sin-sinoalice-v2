import React, { useCallback, useState } from "react";
import { Divider } from "src/components";
import { AddIcon, DuplicateIcon, Trash } from "src/components/icons";
import 'twin.macro';

interface listProps {
  [key: string]: boolean | number;
  valid: boolean;
  loop: number;
  combo0: number;
  combo5: number;
  combo10: number;
}

interface comboListProps {
  combolists: listProps[];
  addlist: (init?: number[]) => void;
  deletelist: (list: listProps) => void;
  handleTextFieldChanges: (event: React.ChangeEvent<HTMLInputElement>, list: listProps) => void;
  handleSpinnerButton: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, list: listProps, step: number) => void;
  handleSwitchChanges: (list: listProps) => void;
}

interface comboInputProps {
  inputType: string;
  label: string;
  list: listProps;
  index: number;
  handleTextFieldChanges: (event: React.ChangeEvent<HTMLInputElement>, list: listProps) => void;
  handleSpinnerButton: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, list: listProps, step: number) => void;
}

const ComboInput = (props: comboInputProps): JSX.Element => {
  const { inputType, label, list, index, handleTextFieldChanges, handleSpinnerButton } = props;

  return (
    <div tw='flex flex-col'>
      <label htmlFor={`${inputType}-${index}`} tw='text-lg'>{label}</label>
      <div tw='flex flex-row h-10 w-full rounded-lg relative bg-transparent'>
        <button
          id={`${inputType}-${index}-decrement`}
          tabIndex={-1}
          data-action='decrement'
          tw='bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-6 rounded-l cursor-pointer focus:outline-none'
          onClick={(event) => handleSpinnerButton(event, list, -1)}
        >
          <span tw='m-auto text-2xl font-thin align-text-top'>−</span>
        </button>
        <input
          type='number'
          id={`${inputType}-${index}`}
          tw='outline-none focus:outline-none text-center w-10 bg-gray-300 font-semibold hover:text-black focus:text-black flex items-center text-gray-700 outline-none'
          value={Number(list[inputType])}
          onChange={(event) => handleTextFieldChanges(event, list)}
        />
        <button
          id={`${inputType}-${index}-increment`}
          tabIndex={-1}
          data-action='increment'
          tw='bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-6 rounded-r cursor-pointer focus:outline-none'
          onClick={(event) => handleSpinnerButton(event, list, 1)}
        >
          <span tw='m-auto text-2xl font-thin align-top'>+</span>
        </button>
      </div>
    </div>
  );
};

const ComboList = React.memo((props: comboListProps) => {
  const { combolists, addlist, deletelist, handleTextFieldChanges, handleSpinnerButton, handleSwitchChanges } = props;
  
  return(
    <>
      <Divider />
      {combolists.map((list: listProps, index: number) => (
        <div key={`combolist-${index}`}>
          <div tw='flex flex-wrap relative w-full p-3.5 sm:space-x-4'>
            <div tw='flex flex-row items-center space-x-4'>
              <div>
                {index+1}
              </div>
              <div tw='flex flex-col w-32'>
                <span>コンボ小計:</span>
                <span tw='font-bold'>{(list.combo5 * 6 + list.combo10 * 11 + list.combo0 * 1) * list.loop}</span>
              </div>
              <div tw='flex flex-col w-32'>
                <span>ターン数:</span>
                <span tw='font-bold'>{((list.combo5*1 + list.combo10*1 + list.combo0*1) * list.loop + (list.loop - 1)*1)} ({4 * ((list.combo5*1 + list.combo10*1 + list.combo0*1) * list.loop) + (list.loop - 1)*6}s)</span>
              </div>
              <div tw='flex flex-col w-32'>
                <span>本数:</span>
                <span tw='font-bold'>{list.combo5*1 + list.combo10*1 + list.combo0*1}</span>
              </div>
            </div>
            <div tw='flex flex-row w-full sm:w-max justify-between'>
              <div tw='flex flex-row space-x-2'>
                <ComboInput
                  inputType={'loop'}
                  label='周回数'
                  list={list}
                  index={index}
                  handleTextFieldChanges={handleTextFieldChanges}
                  handleSpinnerButton={handleSpinnerButton}
                />
                <ComboInput
                  inputType={'combo5'}
                  label='コンボ+5'
                  list={list}
                  index={index}
                  handleTextFieldChanges={handleTextFieldChanges}
                  handleSpinnerButton={handleSpinnerButton}
                />
                <ComboInput
                  inputType={'combo10'}
                  label='コンボ+10'
                  list={list}
                  index={index}
                  handleTextFieldChanges={handleTextFieldChanges}
                  handleSpinnerButton={handleSpinnerButton}
                />
                <ComboInput
                  inputType={'combo0'}
                  label='その他'
                  list={list}
                  index={index}
                  handleTextFieldChanges={handleTextFieldChanges}
                  handleSpinnerButton={handleSpinnerButton}
                />
              </div>
              <div tw='flex items-center ml-2 md:ml-8 lg:ml-16'>
                <button
                  type="button"
                  aria-label='Duplicate'
                  id={`addButton-${index}`}
                  tw="flex items-center bg-lightblue-500 text-white rounded-md p-1 sm:px-4 sm:py-2 m-1 sm:m-2 transition ease select-none hover:bg-lightblue-700 focus:outline-none focus:ring"
                  onClick={() => addlist([list.combo5, list.combo10, list.combo0, list.loop])}
                >
                  <DuplicateIcon />
                  <span tw='sm:ml-2 sm:block hidden'>複製</span>
                </button>
                <button
                  type="button"
                  aria-label='Delete'
                  id={`deleteButton-${index}`}
                  tw="flex items-center bg-rose-600 text-white rounded-md p-1 sm:px-4 sm:py-2 ml-1 sm:m-2 transition ease select-none hover:bg-rose-800 focus:outline-none focus:ring"
                  onClick={() => deletelist(list)}
                >
                  <Trash />
                  <span tw='sm:ml-2 sm:block hidden'>削除</span>
                </button>
              </div>
              <div tw='absolute top-6 right-4 inline-block w-14 align-middle select-none transition duration-200 ease-in'>
                <input
                  type='checkbox'
                  id={`validSwitch-${index}`}
                  checked={list.valid}
                  tw='absolute block -top-1 left-0 w-8 h-8 border-4 rounded-full appearance-none cursor-pointer focus:outline-none focus-visible:ring shadow-2xl
                    border-gray-500 dark:border-white bg-gray-500 dark:bg-white hover:ring-8 ring-black ring-opacity-5 dark:ring-white dark:ring-opacity-10
                    checked:left-6 checked:border-green-500 dark:checked:border-green-300 checked:bg-green-500 dark:checked:bg-green-300 checked:ring-emerald-400 checked:ring-opacity-10
                    transition transition-locate'
                  onChange={() => handleSwitchChanges(list)}
                />
                <label
                  htmlFor={`validSwitch-${index}`}
                  tw='block h-6 align-middle overflow-hidden text-gray-300 bg-gray-300 rounded-full cursor-pointer dark:text-gray-400 dark:bg-gray-400 dark:border-gray-400 border-gray-300 border-2'
                >
                  valid
                </label>
              </div>
            </div>
          </div>
          <Divider />
        </div>
      ))}
    </>
  );
});

const INITIAL_list = {
  valid: true,
  loop: 1,
  combo0: 2,
  combo5: 16,
  combo10: 2,
};


const ComboBonusComponent = React.memo((props: {comboBonus: () => number}) => {
  return (
    <div tw='flex flex-col'>
      <span>コンボ倍率:</span>
      <span tw='font-bold'>{props.comboBonus()}</span>
    </div>
  );
});

const ComboTable = () => {
  const [combolists, setCombolists] = useState([INITIAL_list]);
  
  const handleTextFieldChanges = (e: any, list: listProps) => {
    const rawId = e.target.id;
    const id = rawId.slice(0, rawId.indexOf('-'));
    
    setCombolists(combolists.filter((x: listProps) => {
      const n = Number(e.target.value);
      if (x === list && Number.isInteger(x[id])) {
        const v = n < 0 ? 0 : n;
        x[id] = v > 20 ? 20 : v;
      }
      return x;
    }));
  }

  const handleSpinnerButton = (e: any, list: listProps, val: number) => {
    const rawId:string = e.currentTarget.id;
    const id = rawId.slice(0, rawId.indexOf('-'));
    
    setCombolists(combolists.filter((x: listProps) => {
      if (x === list && typeof x[id] === 'number') {
        const v = Number(x[id]) + val < 0 ? 0 : Number(x[id]) + val;
        x[id] = v > 20 ? 20 : v;
      }
      return x;
    }));
  }
  
  const addlist = useCallback((init?: number[]) => {
    setCombolists([...combolists, {
      valid: true,
      loop: init ? init[3] : 1,
      combo5: init ? init[0] : 16,
      combo10: init ? init[1] : 2,
      combo0: init ? init[2] : 2,
    }]);
  }, [combolists]);

  const deletelist = (list: listProps) => {
    setCombolists(combolists.filter(x => x !== list));
  }

  const handleSwitchChanges = (list: listProps) => {
    setCombolists(combolists.filter(x => {
      if (x === list) x.valid = !x.valid;
      return x;
    }));
  }


  const ComboSum = combolists.reduce((pre, x) => pre + (x.combo5 * 6 + x.combo10 * 11 + x.combo0 * 1) * x.loop, 0);
  
  const comboBonus = useCallback(() => {
    const combo = ComboSum;

    let bonus = 100000;
    const a = combo - 200;
    if (a < 0) return (bonus += combo * 70) / 100000;
    const b = a - 300;
    if (b < 0) return (bonus += 200 * 70 + a * 50) / 100000;
    const c = b > 500 ? 500 : b;
    return (bonus += 200 * 70 + 300 * 50 + c * 35) / 100000;
  }, [combolists]);

  return(
    <>
      <div>
        <div tw='flex items-center p-4 space-x-4'>
          <div tw='flex flex-col'>
            <span>コンボ総数:</span>
            <span tw='font-bold'>{ComboSum}</span>
          </div>
          <div tw='flex flex-col'>
            <span>コンボ人数:</span>
            <span tw='font-bold'>{combolists.length}</span>
          </div>
          <ComboBonusComponent comboBonus={comboBonus} />
          <button
            type="button"
            tw="flex items-center bg-lightblue-500 text-white rounded-md px-4 py-2 m-2 transition ease select-none hover:bg-lightblue-700 focus:outline-none focus:ring"
            //startIcon={<AddCircleIcon />}
            onClick={() => addlist()}
          >
            <AddIcon />
            <span tw='ml-2'>追加</span>
          </button>
        </div>
        <ComboList
          combolists={combolists}
          handleSwitchChanges={handleSwitchChanges}
          handleTextFieldChanges={handleTextFieldChanges}
          handleSpinnerButton={handleSpinnerButton}
          deletelist={deletelist}
          addlist={addlist}
        />
      </div>
    </>
  )
};

export default ComboTable;

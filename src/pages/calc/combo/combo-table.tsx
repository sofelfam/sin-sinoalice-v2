import { css } from '@emotion/core';
import React, { Dispatch, useCallback, useMemo, useReducer } from 'react';
import { Divider } from 'src/components';
import { AddIcon, DuplicateIcon, Trash } from 'src/components/icons';
import 'twin.macro';

interface listProps {
  [key: string]: boolean | number;
  valid: boolean;
  loop: number;
  combo0: number;
  combo5: number;
  combo10: number;
}

interface State {
  combolists: listProps[];
};

type Action = 
  | {
      type: ActionType.ACTION_INPUT_TEXT;
      inputType: string;
      index: number;
      valueInput: number;
    }
  | {
      type: ActionType.ACTION_CHANGE_SPINNER;
      inputType: string;
      index: number;
      valueSpinner: number
    }
  | {
      type: ActionType.ACTION_TOGGLE_LIST;
      index: number;
    }
  | {
      type: ActionType.ACTION_ADD_LIST;
      newList: [number, number, number, number, boolean];
    }
  | {
      type: ActionType.ACTION_REMOVE_LIST;
      index: number;
    }


enum ActionType {
  ACTION_INPUT_TEXT = 'input',
  ACTION_CHANGE_SPINNER = 'spinner',
  ACTION_TOGGLE_LIST = 'toggle',
  ACTION_ADD_LIST = 'addlist',
  ACTION_REMOVE_LIST = 'removelist',
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case ActionType.ACTION_INPUT_TEXT: {
      const value = (action.valueInput < 0 ? 0 : (action.valueInput > 20 ? 20 : action.valueInput));
      const newcombolists = [...state.combolists];
      newcombolists[action.index][action.inputType] = value;
      return {
        ...state,
        combolists: newcombolists
      };
    }
    case ActionType.ACTION_CHANGE_SPINNER: {
      const newcombolists = [...state.combolists];
      const prevValue = Number(newcombolists[action.index][action.inputType]);
      newcombolists[action.index][action.inputType] = prevValue + action.valueSpinner < 0 ? 0 : (prevValue + action.valueSpinner > 20 ? 20 : prevValue + action.valueSpinner);
      return {
        ...state,
        combolists: newcombolists
      };
    }
    case ActionType.ACTION_TOGGLE_LIST: {
      const newcombolists = [...state.combolists];
      newcombolists[action.index].valid = !state.combolists[action.index].valid;
      return {
        ...state,
        combolists: newcombolists
      };
    }
    case ActionType.ACTION_ADD_LIST: {
      const newList = state.combolists;
      const newcombolists = [...newList, {
        loop: action.newList[0],
        combo10: action.newList[1],
        combo5: action.newList[2],
        combo0: action.newList[3],
        valid: action.newList[4],
      }];
      return {
        ...state,
        combolists: newcombolists
      };
    }
    case ActionType.ACTION_REMOVE_LIST: {
      state.combolists.splice(action.index, 1);
      return {
        ...state,
        combolists: state.combolists
      };
    }
  }
};

const ComboInput: React.FCX<{
  inputType: string;
  label: string;
  index: number;
  value: number;
  dispatch: Dispatch<Action>;
}> = React.memo(({ inputType, label, value, index, dispatch }): JSX.Element => {

  const handleTextFieldChanges = useCallback((index: number, id: string, val: number) => {
    dispatch({ type: ActionType.ACTION_INPUT_TEXT, index: index, inputType: id, valueInput: val});
  }, [value]);

  const handleSpinnerButton = useCallback((index: number, id: string, val: number) => {
    dispatch({ type: ActionType.ACTION_CHANGE_SPINNER, index: index, inputType: id, valueSpinner: val});
  }, [value]);
  
  return (
    <div tw='flex flex-col'>
      <label htmlFor={`${inputType}-${index}`} tw='text-lg'>{label}</label>
      <div tw='flex flex-row h-10 w-full rounded-lg relative bg-transparent'>
        <button
          id={`${inputType}-${index}-decrement`}
          tabIndex={-1}
          data-action='decrement'
          tw='bg-gray-300 text-gray-600 hover:(text-gray-700 bg-gray-400) h-full w-6 rounded-l cursor-pointer transition ease focus:outline-none'
          onClick={() => handleSpinnerButton(index, inputType, -1)}
        >
          <span tw='m-auto text-2xl font-thin align-text-top'>−</span>
        </button>
        <input
          type='number'
          id={`${inputType}-${index}`}
          tw='outline-none focus:outline-none text-center w-10 bg-gray-300 font-semibold hover:text-black focus:text-black flex items-center text-gray-700 outline-none'
          value={value}
          onChange={(e) => handleTextFieldChanges(index, inputType, Number(e.target.value))}
        />
        <button
          id={`${inputType}-${index}-increment`}
          tabIndex={-1}
          data-action='increment'
          tw='bg-gray-300 text-gray-600 hover:(text-gray-700 bg-gray-400) h-full w-6 rounded-r cursor-pointer transition ease focus:outline-none'
          onClick={() => handleSpinnerButton(index, inputType, 1)}
        >
          <span tw='m-auto text-2xl font-thin align-top'>+</span>
        </button>
      </div>
    </div>
  );
});

const ToggleValid: React.FCX<{
  valid: boolean;
  index: number;
  dispatch: Dispatch<Action>;
}> = React.memo(({ valid, index, dispatch }) => (
  <div tw='absolute top-6 right-4 inline-block w-14 align-middle select-none transition duration-200 ease-in'>
    <input
      type='checkbox'
      id={`validSwitch-${index}`}
      checked={valid}
      tw='absolute block -top-1 left-0 w-8 h-8 border-4 rounded-full appearance-none cursor-pointer focus:outline-none focus-visible:ring shadow-2xl
        border-gray-500 dark:border-white bg-gray-500 dark:bg-white hover:ring-8 ring-black ring-opacity-5 dark:ring-white dark:ring-opacity-10
        checked:left-6 checked:border-green-500 dark:checked:border-green-300 checked:bg-green-500 dark:checked:bg-green-300 checked:ring-emerald-400 checked:ring-opacity-10
        transition transition-locate'
      onChange={() => dispatch({ type: ActionType.ACTION_TOGGLE_LIST, index: index})}
    />
    <label
      htmlFor={`validSwitch-${index}`}
      tw='block h-6 align-middle overflow-hidden text-gray-300 bg-gray-300 rounded-full cursor-pointer dark:text-gray-400 dark:bg-gray-400 dark:border-gray-400 border-gray-300 border-2'
    >
      valid
    </label>
  </div>
));

const ActionButtons: React.FCX<{
  combolist: listProps;
  index: number;
  dispatch: Dispatch<Action>;
}> = React.memo(({ combolist, index, dispatch }) => (
  <div tw='flex items-center ml-2 md:ml-8 lg:ml-16'>
    <button
      type='button'
      aria-label='Duplicate'
      id={`addButton-${index}`}
      tw='flex items-center bg-lightblue-500 text-white rounded-md p-1 sm:px-4 sm:py-2 m-1 sm:m-2 transition ease select-none hover:bg-lightblue-700 focus:outline-none'
      onClick={() => dispatch({ type: ActionType.ACTION_ADD_LIST, newList: [combolist.loop, combolist.combo10, combolist.combo5, combolist.combo0, combolist.valid] })}
    >
      <DuplicateIcon />
      <span tw='sm:ml-2 sm:block hidden'>複製</span>
    </button>
    <button
      type='button'
      aria-label='Delete'
      id={`deleteButton-${index}`}
      tw='flex items-center bg-rose-600 text-white rounded-md p-1 sm:px-4 sm:py-2 ml-1 sm:m-2 transition ease select-none hover:bg-rose-800 focus:outline-none'
      onClick={() => dispatch({ type: ActionType.ACTION_REMOVE_LIST, index: index})}
    >
      <Trash />
      <span tw='sm:ml-2 sm:block hidden'>削除</span>
    </button>
  </div>
));

const CombolistWrapper: React.FC = (props) => {
  return <div tw='transition transition-filter ease duration-75' {...props}>{props.children}</div>
}

const ComboList: React.FCX<{
  combolist: listProps;
  index: number;
  dispatch: Dispatch<Action>;
}> = (({ combolist, index, dispatch }) => {
  const comboSubtotal = useMemo(() => {
    return (combolist.combo5 * 6 + combolist.combo10 * 11 + combolist.combo0 * 1) * combolist.loop;
  }, [combolist.combo5, combolist.combo10, combolist.combo0, combolist.loop]);
  const turnsTotal = useMemo(() => {
    return (combolist.combo5*1 + combolist.combo10*1 + combolist.combo0*1) * combolist.loop + (combolist.loop - 1)*1;
  }, [combolist.combo5, combolist.combo10, combolist.combo0, combolist.loop]);
  const spentTime = useMemo(() => {
    return 4 * ((combolist.combo5*1 + combolist.combo10*1 + combolist.combo0*1) * combolist.loop) + (combolist.loop - 1)*6
  }, [combolist.combo5, combolist.combo10, combolist.combo0, combolist.loop])
  const weaponsTotal = useMemo(() => {
    return combolist.combo5*1 + combolist.combo10*1 + combolist.combo0*1;
  }, [combolist.combo5, combolist.combo10, combolist.combo0]);
 
  return(
    <>
      <CombolistWrapper
        css={!combolist.valid && css`filter: brightness(66%);backdrop-filter: brightness(66%);`}
      >
        <div tw='flex flex-wrap relative w-full p-3.5 sm:space-x-4'>
          <div tw='flex flex-row items-center space-x-4'>
            <div>
              {index+1}
            </div>
            <div tw='flex flex-col w-32'>
              <span>コンボ小計:</span>
              <span tw='font-bold'>{comboSubtotal}</span>
            </div>
            <div tw='flex flex-col w-32'>
              <span>ターン数:</span>
              <span tw='font-bold'>{turnsTotal} ({spentTime}s)</span>
            </div>
            <div tw='flex flex-col w-32'>
              <span>本数:</span>
              <span tw='font-bold'>{weaponsTotal}</span>
            </div>
          </div>
          <div tw='flex flex-row w-full sm:w-max justify-between'>
            <div tw='flex flex-row space-x-2'>
              <ComboInput
                inputType={'loop'}
                label='周回数'
                index={index}
                value={combolist.loop}
                dispatch={dispatch}
              />
              <ComboInput
                inputType={'combo5'}
                label='コンボ+5'
                index={index}
                value={combolist.combo5}
                dispatch={dispatch}
              />
              <ComboInput
                inputType={'combo10'}
                label='コンボ+10'
                index={index}
                value={combolist.combo10}
                dispatch={dispatch}
              />
              <ComboInput
                inputType={'combo0'}
                label='その他'
                index={index}
                value={combolist.combo0}
                dispatch={dispatch}
              />
            </div>
            <ActionButtons combolist={combolist} index={index} dispatch={dispatch} />
            <ToggleValid valid={combolist.valid} index={index} dispatch={dispatch} />
          </div>
        </div>
      </CombolistWrapper>
    </>
  );
});

const INITIAL_list: listProps = {
  loop: 1,
  combo10: 4,
  combo5: 14,
  combo0: 2,
  valid: true,
};

const INITIAL_STATE: State = {
  combolists: [INITIAL_list]
}

const ComboTable = () => {
  const [{ combolists }, dispatch] = useReducer(reducer, INITIAL_STATE);

  const comboSum = combolists.reduce((pre, x) => pre + (x.valid ? 1 : 0) * (x.combo5 * 6 + x.combo10 * 11 + x.combo0 * 1) * x.loop, 0);
  const comboCount = combolists.filter((x) => x.valid === true).length;
  const comboBonus = () => {
    const combo = comboSum;

    let bonus = 100000;
    const a = combo - 200;
    if (a < 0) return (bonus += combo * 70) / 100000;
    const b = a - 300;
    if (b < 0) return (bonus += 200 * 70 + a * 50) / 100000;
    const c = b > 500 ? 500 : b;
    return (bonus += 200 * 70 + 300 * 50 + c * 35) / 100000;
  };

  return(
    <>
      <div>
        <div tw='flex items-center p-4 space-x-4'>
          <div tw='flex flex-col'>
            <span>コンボ総数:</span>
            <span tw='font-bold'>{comboSum}</span>
          </div>
          <div tw='flex flex-col'>
            <span>コンボ人数:</span>
            <span tw='font-bold'>{comboCount}</span>
          </div>
          <div tw='flex flex-col'>
            <span>コンボ倍率:</span>
            <span tw='font-bold'>{comboBonus()}</span>
          </div>
          <button
            type='button'
            tw='flex items-center bg-lightblue-500 text-white rounded-md px-4 py-2 m-2 transition ease select-none hover:bg-lightblue-700 focus:outline-none'
            onClick={() => dispatch({ type: ActionType.ACTION_ADD_LIST, newList: [1, 4, 14, 2, true] })}
          >
            <AddIcon />
            <span tw='ml-2'>追加</span>
          </button>
        </div>
        <Divider />
        {combolists.map((combolist: listProps, i: number) => {
          return (
            <div key={`combolist-${i}`}>
              <ComboList index={i} combolist={combolist} dispatch={dispatch} />
              <Divider />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ComboTable;

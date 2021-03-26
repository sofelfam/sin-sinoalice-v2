import React, { Dispatch, useCallback, useReducer } from 'react';
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
      index: number;
      inputType: string;
      value: number;
//      event: React.ChangeEvent<HTMLInputElement>;
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
  ACTION_TOGGLE_LIST = 'toggle',
  ACTION_ADD_LIST = 'addlist',
  ACTION_REMOVE_LIST = 'removelist',
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case ActionType.ACTION_INPUT_TEXT: {
    //   const rawId = action.event.target.id;
    //   const id = rawId.slice(0, rawId.indexOf('-'));
    //   const newcombolists = [...state.combolists];
    //   newcombolists[action.index][id] = Number(action.event.target.value);
      const newcombolists = [...state.combolists];
      newcombolists[action.index][action.inputType] = action.value;
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
  combolist: listProps;
  dispatch: Dispatch<Action>;
}> = (({ inputType, label, combolist, index, dispatch }): JSX.Element => {
  console.log('??')

  const handleTextFieldChanges = useCallback((e: any, index: number) => {
    const rawId = e.target.id;
    const id = rawId.slice(0, rawId.indexOf('-'));
    const n = Number(e.target.value);
    const value = (n < 0 ? 0 : (n > 20 ? 20 : n));
    dispatch({ type: ActionType.ACTION_INPUT_TEXT, index: index, inputType: id, value: value});
  }, [combolist]);
  
  return (
    <div tw='flex flex-col'>
      <label htmlFor={`${inputType}-${index}`} tw='text-lg'>{label}</label>
      <div tw='flex flex-row h-10 w-full rounded-lg relative bg-transparent'>
        <button
          id={`${inputType}-${index}-decrement`}
          tabIndex={-1}
          data-action='decrement'
          tw='bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-6 rounded-l cursor-pointer focus:outline-none'
          //onClick={(event) => handleSpinnerButton(event, combolist, -1)}
        >
          <span tw='m-auto text-2xl font-thin align-text-top'>−</span>
        </button>
        <input
          type='number'
          id={`${inputType}-${index}`}
          tw='outline-none focus:outline-none text-center w-10 bg-gray-300 font-semibold hover:text-black focus:text-black flex items-center text-gray-700 outline-none'
          value={Number(combolist[inputType])}
          onChange={(e) => handleTextFieldChanges(e, index)}
//          onChange={(e) => dispatch({ type: ActionType.ACTION_INPUT_TEXT, index: index, event: e})}
        />
        <button
          id={`${inputType}-${index}-increment`}
          tabIndex={-1}
          data-action='increment'
          tw='bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-6 rounded-r cursor-pointer focus:outline-none'
          //onClick={(event) => handleSpinnerButton(event, combolist, 1)}
        >
          <span tw='m-auto text-2xl font-thin align-top'>+</span>
        </button>
      </div>
    </div>
  );
});

const ComboList: React.FCX<{
  combolist: listProps;
  index: number;
  dispatch: Dispatch<Action>;
}> = React.memo(({ combolist, index, dispatch }) => {
  console.log('!')
 
  return(
    <>
      <div key={`combolist-${index}`}>
        <div tw='flex flex-wrap relative w-full p-3.5 sm:space-x-4'>
          <div tw='flex flex-row items-center space-x-4'>
            <div>
              {index+1}
            </div>
            <div tw='flex flex-col w-32'>
              <span>コンボ小計:</span>
              <span tw='font-bold'>{(combolist.combo5 * 6 + combolist.combo10 * 11 + combolist.combo0 * 1) * combolist.loop}</span>
            </div>
            <div tw='flex flex-col w-32'>
              <span>ターン数:</span>
              <span tw='font-bold'>{((combolist.combo5*1 + combolist.combo10*1 + combolist.combo0*1) * combolist.loop + (combolist.loop - 1)*1)} ({4 * ((combolist.combo5*1 + combolist.combo10*1 + combolist.combo0*1) * combolist.loop) + (combolist.loop - 1)*6}s)</span>
            </div>
            <div tw='flex flex-col w-32'>
              <span>本数:</span>
              <span tw='font-bold'>{combolist.combo5*1 + combolist.combo10*1 + combolist.combo0*1}</span>
            </div>
          </div>
          <div tw='flex flex-row w-full sm:w-max justify-between'>
            <div tw='flex flex-row space-x-2'>
              <ComboInput
                inputType={'loop'}
                label='周回数'
                index={index}
                combolist={combolist}
                dispatch={dispatch}
              />
              <ComboInput
                inputType={'combo5'}
                label='コンボ+5'
                index={index}
                combolist={combolist}
                dispatch={dispatch}
              />
              <ComboInput
                inputType={'combo10'}
                label='コンボ+10'
                index={index}
                combolist={combolist}
                dispatch={dispatch}
              />
              <ComboInput
                inputType={'combo0'}
                label='その他'
                index={index}
                combolist={combolist}
                dispatch={dispatch}
              />
            </div>
            <div tw='flex items-center ml-2 md:ml-8 lg:ml-16'>
              <button
                type='button'
                aria-label='Duplicate'
                id={`addButton-${index}`}
                tw='flex items-center bg-lightblue-500 text-white rounded-md p-1 sm:px-4 sm:py-2 m-1 sm:m-2 transition ease select-none hover:bg-lightblue-700 focus:outline-none focus:ring'
                onClick={() => dispatch({ type: ActionType.ACTION_ADD_LIST, newList: [combolist.loop, combolist.combo10, combolist.combo5, combolist.combo0, true] })}
              >
                <DuplicateIcon />
                <span tw='sm:ml-2 sm:block hidden'>複製</span>
              </button>
              <button
                type='button'
                aria-label='Delete'
                id={`deleteButton-${index}`}
                tw='flex items-center bg-rose-600 text-white rounded-md p-1 sm:px-4 sm:py-2 ml-1 sm:m-2 transition ease select-none hover:bg-rose-800 focus:outline-none focus:ring'
                onClick={() => dispatch({ type: ActionType.ACTION_REMOVE_LIST, index: index})}
              >
                <Trash />
                <span tw='sm:ml-2 sm:block hidden'>削除</span>
              </button>
            </div>
            <div tw='absolute top-6 right-4 inline-block w-14 align-middle select-none transition duration-200 ease-in'>
              <input
                type='checkbox'
                id={`validSwitch-${index}`}
                checked={combolist.valid}
                tw='absolute block -top-1 left-0 w-8 h-8 border-4 rounded-full appearance-none cursor-pointer focus:outline-none focus-visible:ring shadow-2xl
                  border-gray-500 dark:border-white bg-gray-500 dark:bg-white hover:ring-8 ring-black ring-opacity-5 dark:ring-white dark:ring-opacity-10
                  checked:left-6 checked:border-green-500 dark:checked:border-green-300 checked:bg-green-500 dark:checked:bg-green-300 checked:ring-emerald-400 checked:ring-opacity-10
                  transition transition-locate'
                onClick={() => dispatch({ type: ActionType.ACTION_TOGGLE_LIST, index})}
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
      </div>
    </>
  );
},
(p, n) => {
  console.log('prev: '+p.combolist.valid)
  console.log('next: '+n.combolist.valid)
  return p.combolist.valid === n.combolist.valid
});


// valid: boolean;
// loop: number;
// combo0: number;
// combo5: number;
// combo10: number;

const INITIAL_list: listProps = {
  loop: 1,
  combo10: 2,
  combo5: 14,
  combo0: 4,
  valid: true,
};

const INITIAL_STATE: State = {
  combolists: [INITIAL_list]
}

const ComboBonusComponent = React.memo((props: {comboBonus: () => number}) => {
  return (
    <div tw='flex flex-col'>
      <span>コンボ倍率:</span>
      <span tw='font-bold'>{props.comboBonus()}</span>
    </div>
  );
});

const ComboTable = () => {
  const [{ combolists }, dispatch] = useReducer(reducer, INITIAL_STATE);
  
  // const handleTextFieldChanges = (e: any, list: listProps) => {
  //   const rawId = e.target.id;
  //   const id = rawId.slice(0, rawId.indexOf('-'));
    
  //   setCombolists(combolists.filter((x: listProps) => {
  //     const n = Number(e.target.value);
  //     if (x === list && Number.isInteger(x[id])) {
  //       const v = n < 0 ? 0 : n;
  //       x[id] = v > 20 ? 20 : v;
  //     }
  //     return x;
  //   }));
  // }

  // const handleSpinnerButton = (e: any, list: listProps, val: number) => {
  //   const rawId:string = e.currentTarget.id;
  //   const id = rawId.slice(0, rawId.indexOf('-'));
    
  //   setCombolists(combolists.filter((x: listProps) => {
  //     if (x === list && typeof x[id] === 'number') {
  //       const v = Number(x[id]) + val < 0 ? 0 : Number(x[id]) + val;
  //       x[id] = v > 20 ? 20 : v;
  //     }
  //     return x;
  //   }));
  // }

  // const ComboSum = combolists.reduce((pre, x) => pre + (x.combo5 * 6 + x.combo10 * 11 + x.combo0 * 1) * x.loop, 0);
  
  // const comboBonus = useCallback(() => {
  //   const combo = ComboSum;

  //   let bonus = 100000;
  //   const a = combo - 200;
  //   if (a < 0) return (bonus += combo * 70) / 100000;
  //   const b = a - 300;
  //   if (b < 0) return (bonus += 200 * 70 + a * 50) / 100000;
  //   const c = b > 500 ? 500 : b;
  //   return (bonus += 200 * 70 + 300 * 50 + c * 35) / 100000;
  // }, [combolists]);

  return(
    <>
      <div>
        <div tw='flex items-center p-4 space-x-4'>
          <div tw='flex flex-col'>
            <span>コンボ総数:</span>
            {/* <span tw='font-bold'>{ComboSum}</span> */}
          </div>
          <div tw='flex flex-col'>
            <span>コンボ人数:</span>
            {/* <span tw='font-bold'>{combolists.length}</span> */}
          </div>
          {/* <ComboBonusComponent comboBonus={comboBonus} /> */}
          <button
            type='button'
            tw='flex items-center bg-lightblue-500 text-white rounded-md px-4 py-2 m-2 transition ease select-none hover:bg-lightblue-700 focus:outline-none focus:ring'
            onClick={() => dispatch({ type: ActionType.ACTION_ADD_LIST, newList: [1, 4, 14, 2, true] })}
          >
            <AddIcon />
            <span tw='ml-2'>追加</span>
          </button>
        </div>
        {combolists.map((combolist: listProps, i: number) => {
          return (
            <ComboList key={i} index={i} combolist={combolist} dispatch={dispatch} />
          );
        })}
      </div>
    </>
  );
};

export default ComboTable;

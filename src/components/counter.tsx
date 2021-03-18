import React from 'react';
import 'twin.macro';

interface CounterProps {
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
  handleChange: (v: Number) => React.Dispatch<React.SetStateAction<number>>;
  max?: Number;
  min?: Number;
  step?: Number;
}

const Component = (props: CounterProps) => {
  const { value, setValue, handleChange, max, min, step } = props;

  return (
    <div tw='h-10 w-32'>
      <div tw='flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1'>
        <button
          data-action='decrement'
          tw='bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer focus:outline-none'
          onClick={() => handleChange(step ? -step : -1)}
        >
          <span tw='m-auto text-2xl font-thin'>−</span>
        </button>
        <input
          type='number'
          tw='outline-none focus:outline-none text-center w-full bg-gray-300 font-semibold hover:text-black focus:text-black flex items-center text-gray-700 outline-none'
          name='custom-input-number'
          value={value}
          max={max ? 999999 : max}
          min={min ? -999999 : min}
          onChange={(e) => setValue(Number(e.target.value))}
        />
        <button
          data-action='increment'
          tw='bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer focus:outline-none'
          onClick={() => handleChange(step ? step : 1)}
        >
          <span tw='m-auto text-2xl font-thin'>+</span>
        </button>
      </div>
    </div>
  );
};

export default Component;

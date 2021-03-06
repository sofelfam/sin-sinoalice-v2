import React, { useEffect, useState } from 'react';
import 'twin.macro';

export const ToggleDarkMode = (): JSX.Element => {
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    if (
      localStorage.theme === `dark` ||
      (!(`theme` in localStorage) && window.matchMedia(`(prefers-color-scheme: dark)`).matches)
    ) {
      setDarkMode(true)
      document.querySelector(`html`)?.classList.add(`dark`);
    } else {
      setDarkMode(false)
      document.querySelector(`html`)?.classList.remove(`dark`);
    }
  }, [darkMode]);

  const handleChangeDarkMode = () => {
    if (darkMode) {
      localStorage.theme = `light`;
      setDarkMode(false);
    } else {
      localStorage.theme = `dark`;
      setDarkMode(true);
    }
  };

  return (
    <div tw='flex items-center'>
      <div tw='mr-2 text-xs'>
        <svg
          tw='w-8 h-8'
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z'
          />
        </svg>
      </div>
      <div tw='relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in'>
        <input
          type='checkbox'
          name='toggle'
          id='toggle'
          checked={darkMode}
          tw='absolute block left-0 w-8 h-8 dark:bg-white border-4 dark:border-gray-400 rounded-full appearance-none cursor-pointer focus:outline-none bg-gray-800 border-gray-300
            checked:left-4 checked:border-gray-400
            transition transition-locate'
          onChange={handleChangeDarkMode}
        />
        <label
          htmlFor='toggle'
          tw='block h-8 align-middle overflow-hidden text-gray-300 bg-gray-300 rounded-full cursor-pointer dark:text-gray-400 dark:bg-gray-400 dark:border-gray-400 border-gray-300 border-2'
        >
          toggle
        </label>
      </div>
      <div tw='text-xs'>
        <svg
          tw='w-8 h-8'
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z'
          />
        </svg>
      </div>
    </div>
  );
};

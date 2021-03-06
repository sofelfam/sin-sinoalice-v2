module.exports = {
  purge: ['./src/**/*.{js,ts,jsx,tsx}',
          './src/**/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    backgroundColor: theme => ({
      ...theme('colors'),
      primary: 'rgba(0, 0, 0, 0.87)',
      secondary: 'rgba(0, 0, 0, 0.54)',
      disabled: 'rgba(0, 0, 0, 0.38)',
      focus: 'rgba(0, 0, 0, 0.12)',
      selected: 'rgba(0, 0, 0, 0.08)',
      hover: 'rgba(0, 0, 0, 0.04)',
      darkhover: 'rgba(255, 255, 255, 0.08)',
    }),
    extend: {
      minHeight: {
        '0': '0',
        '1': '.25rem',
        '2': '.5rem',
        '3': '.75rem',
        '4': '1rem',
        '8': '2rem',
        '12': '3rem',
        '16': '4rem',
        '20': '5rem',
        '22': '5.5rem',
        '24': '6rem',
        '26': '6.5rem',
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
        'full': '100%',
        'screen': '100vh',
      },
      transitionProperty: {
        'background': 'background-color,fill,stroke',
        'text': 'color,fill, stroke',
        'border': 'border-color,fill, stroke',
        'height': 'height,min-height,max-height',
        'width': 'width,min-width,max-width',
        'spacing': 'margin, padding',
        'locate': 'top,bottom,right,left,height,width,margin,padding'
      },
      boxShadow: {
        drop: '0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)',
      },
      colors: {
      },
      lineHeight: {
        '12': '3rem',
        '16': '4rem',
        '20': '5rem',
      },
      spacing: {
      },
    },
  },
  variants: {
    extend: {
      textDecoration: ['focus-visible'],
      transitionProperty: ['hover', 'focus'],
    },
  },
  plugins: [],
};

const colors = require('twin.macro/node_modules/tailwindcss/colors')

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
      active: 'rgba(0, 0, 0, 0.24)',
      focus: 'rgba(0, 0, 0, 0.12)',
      selected: 'rgba(0, 0, 0, 0.08)',
      hover: 'rgba(0, 0, 0, 0.04)',
      darkhover: 'rgba(255, 255, 255, 0.08)',
      'transb-4': 'rgba(0, 0, 0, 0.04)',
      'transb-8': 'rgba(0, 0, 0, 0.08)',
      'transb-12': 'rgba(0, 0, 0, 0.12)',
      'transb-16': 'rgba(0, 0, 0, 0.16)',
      'transb-20': 'rgba(0, 0, 0, 0.20)',
      'transb-24': 'rgba(0, 0, 0, 0.24)',
      'transb-28': 'rgba(0, 0, 0, 0.28)',
      'transb-32': 'rgba(0, 0, 0, 0.32)',
      'transb-36': 'rgba(0, 0, 0, 0.36)',
      'transb-40': 'rgba(0, 0, 0, 0.40)',
      'transb-44': 'rgba(0, 0, 0, 0.44)',
      'transb-48': 'rgba(0, 0, 0, 0.48)',
      'transb-52': 'rgba(0, 0, 0, 0.52)',
      'transb-56': 'rgba(0, 0, 0, 0.56)',
      'transb-60': 'rgba(0, 0, 0, 0.60)',
      'transb-68': 'rgba(0, 0, 0, 0.68)',
      'transb-76': 'rgba(0, 0, 0, 0.76)',
      'transb-84': 'rgba(0, 0, 0, 0.84)',
      'transb-92': 'rgba(0, 0, 0, 0.92)',
      'transw-4': 'rgba(255, 255, 255, 0.04)',
      'transw-8': 'rgba(255, 255, 255, 0.08)',
      'transw-12': 'rgba(255, 255, 255, 0.12)',
      'transw-16': 'rgba(255, 255, 255, 0.16)',
      'transw-20': 'rgba(255, 255, 255, 0.20)',
      'transw-24': 'rgba(255, 255, 255, 0.24)',
      'transw-28': 'rgba(255, 255, 255, 0.28)',
      'transw-32': 'rgba(255, 255, 255, 0.32)',
      'transw-36': 'rgba(255, 255, 255, 0.36)',
      'transw-40': 'rgba(255, 255, 255, 0.40)',
      'transw-44': 'rgba(255, 255, 255, 0.44)',
      'transw-48': 'rgba(255, 255, 255, 0.48)',
      'transw-52': 'rgba(255, 255, 255, 0.52)',
      'transw-56': 'rgba(255, 255, 255, 0.56)',
      'transw-60': 'rgba(255, 255, 255, 0.60)',
      'transw-68': 'rgba(255, 255, 255, 0.68)',
      'transw-76': 'rgba(255, 255, 255, 0.76)',
      'transw-84': 'rgba(255, 255, 255, 0.84)',
      'transw-92': 'rgba(255, 255, 255, 0.92)'
    }),
    borderColor: theme => ({
      ...theme('colors'),
      'transb-4': 'rgba(0, 0, 0, 0.04)',
      'transb-8': 'rgba(0, 0, 0, 0.08)',
      'transb-12': 'rgba(0, 0, 0, 0.12)',
      'transb-16': 'rgba(0, 0, 0, 0.16)',
      'transb-20': 'rgba(0, 0, 0, 0.20)',
      'transb-24': 'rgba(0, 0, 0, 0.24)',
      'transb-28': 'rgba(0, 0, 0, 0.28)',
      'transb-32': 'rgba(0, 0, 0, 0.32)',
      'transb-36': 'rgba(0, 0, 0, 0.36)',
      'transb-40': 'rgba(0, 0, 0, 0.40)',
      'transb-44': 'rgba(0, 0, 0, 0.44)',
      'transb-48': 'rgba(0, 0, 0, 0.48)',
      'transb-52': 'rgba(0, 0, 0, 0.52)',
      'transb-56': 'rgba(0, 0, 0, 0.56)',
      'transb-60': 'rgba(0, 0, 0, 0.60)',
      'transb-68': 'rgba(0, 0, 0, 0.68)',
      'transb-76': 'rgba(0, 0, 0, 0.76)',
      'transb-84': 'rgba(0, 0, 0, 0.84)',
      'transb-92': 'rgba(0, 0, 0, 0.92)',
      'transw-4': 'rgba(255, 255, 255, 0.04)',
      'transw-8': 'rgba(255, 255, 255, 0.08)',
      'transw-12': 'rgba(255, 255, 255, 0.12)',
      'transw-16': 'rgba(255, 255, 255, 0.16)',
      'transw-20': 'rgba(255, 255, 255, 0.20)',
      'transw-24': 'rgba(255, 255, 255, 0.24)',
      'transw-28': 'rgba(255, 255, 255, 0.28)',
      'transw-32': 'rgba(255, 255, 255, 0.32)',
      'transw-36': 'rgba(255, 255, 255, 0.36)',
      'transw-40': 'rgba(255, 255, 255, 0.40)',
      'transw-44': 'rgba(255, 255, 255, 0.44)',
      'transw-48': 'rgba(255, 255, 255, 0.48)',
      'transw-52': 'rgba(255, 255, 255, 0.52)',
      'transw-56': 'rgba(255, 255, 255, 0.56)',
      'transw-60': 'rgba(255, 255, 255, 0.60)',
      'transw-68': 'rgba(255, 255, 255, 0.68)',
      'transw-76': 'rgba(255, 255, 255, 0.76)',
      'transw-84': 'rgba(255, 255, 255, 0.84)',
      'transw-92': 'rgba(255, 255, 255, 0.92)'
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
        'screen': '100vh'
      },
      height: {
        '22': '5.5rem'
      },
      transitionProperty: {
        'background': 'background-color,fill,stroke',
        'text': 'color,fill, stroke',
        'border': 'border-color,fill, stroke',
        'height': 'height,min-height,max-height',
        'width': 'width,min-width,max-width',
        'spacing': 'margin, padding',
        'locate': 'top,bottom,right,left,height,width,margin,padding',
        'filter': 'filter,backdrop-filter'
      },
      boxShadow: {
        drop: '0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)',
      },
      outline: {
        default: '1px solid currentColor',
      },
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        emerald: colors.emerald,
        lightblue: colors.lightBlue,
        rose: colors.rose,
      },
      lineHeight: {
        '12': '3rem',
        '16': '4rem',
        '20': '5rem',
      },
      spacing: {
      },
      zIndex: {
        '-1': '-1',
      }
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

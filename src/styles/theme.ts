import { DefaultTheme } from 'styled-components';

export const theme: DefaultTheme = {
  media: {
    large_tablet: 'only screen and (max-width: 1280px)',
    tablet: 'only screen and (max-width:1024px)',
    mobile: 'only screen and (max-width: 767px)',
    small_mobile: 'only screen and (max-width: 320px)',
  },
  mediaSize: {
    large_tablet: 1280,
    tablet: 1024,
    mobile: 767,
    small_mobile: 320,
  },

  color: {
    symbol: '#FFA900',
    background: '#000000',
    black: {
      bold: '#141414',
      light: '#8A8A8A',
      pale: '#C4C4C4',
    },
    gray: {
      light: '#d3d3d3',
      lighter: '#f0f0f0',
      dark: '#a9a9a9',
    },
    white: {
      bold: '#FBFBFB',
      light: '#fff',
      pale: 'rgb(255,255,255,0.6)',
    },
    yellow: {
      bold: '#FFA900',
      light: '#FFF0D1',
      pale: '#fffcf5',
    },
    red: '#ff3d33',
    green: '#42b348',
  },

  font: {
    thin: 'pretendard-thin',
    light: 'pretendard-light',
    regular: 'pretendard-regular',
    medium: 'pretendard-medium',
    semiBold: 'pretendard-semiBold',
    bold: 'pretendard-bold',
  },
};

import { DefaultTheme } from 'styled-components';

export const theme: DefaultTheme = {
  media:{
    mobile: 'only screen and (max-width: 768px)',
    tablet: 'only screen and (max-width: 1024px)',
  },
  mediaSize:{
    mobile: 768,
    tablet: 1024,
  },

  color: {
    symbol: '#FFA900',
    background: '#000000',
    black: {
      bold: '#141414',
      light: '#8A8A8A',
      pale: '#C4C4C4',
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

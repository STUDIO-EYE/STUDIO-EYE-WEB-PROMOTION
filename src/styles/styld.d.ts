import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    media:{
      mobile: string;
      tablet: string;
    };
    mediaSize:{
      mobile: number;
      tablet: number;
    };
    color: {
      symbol: string;
      background: string;
      black: {
        bold: string;
        light: string;
        pale: string;
      };
      white: {
        bold: string;
        light: string;
        pale: string;
      };
      yellow: {
        bold: string;
        light: string;
        pale: string;
      };
      red: string;
      green: string;
    };
    font: {
      thin: string;
      light: string;
      regular: string;
      medium: string;
      semiBold: string;
      bold: string;
    };
  }
}

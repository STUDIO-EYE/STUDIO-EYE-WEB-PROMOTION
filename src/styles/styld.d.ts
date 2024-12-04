import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    media: {
      large_tablet: string;
      tablet: string;
      mobile: string;
      small_mobile: string;
    };
    mediaSize: {
      large_tablet: number;
      tablet: number;
      mobile: number;
      small_mobile: number;
    };
    color: {
      symbol: string;
      background: string;
      black: {
        bold: string;
        light: string;
        pale: string;
      };
      gray: {
        light: string;
        lighter: string;
        dark: string;
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

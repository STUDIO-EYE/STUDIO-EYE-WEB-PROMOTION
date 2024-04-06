import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    color: {
      black: {
        bold: string;
        light: string;
        pale: string;
      };
      white: {
        bold: string;
        light: string;
      };
      yellow: {
        bold: string;
        light: string;
      };
    };
  }
}

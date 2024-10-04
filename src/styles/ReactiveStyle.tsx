import { createGlobalStyle } from 'styled-components';
import { theme } from './theme';

//전역 스타일 정의
const ReactiveStyle = createGlobalStyle`
  html {
    font-size: 100%;
    transition: all 1s ease-in-out;
    
    @media ${theme.media.tablet} {
      font-size: 80%;
    }

    @media ${theme.media.mobile} {
      font-size: 70%;
    }
  }

  body {
    margin: 0;
    padding: 0;
  }
`;

export default ReactiveStyle;
import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import router from './Router';
import { theme } from './styles/theme';
import './App.css';
import reset from 'styled-reset';
import { RecoilRoot } from 'recoil';
import ReactiveStyle from './styles/ReactiveStyle';

const client = new QueryClient();
const element = document.getElementById('root');
const GlobalStyle = createGlobalStyle`
  ${reset}
`;
const root = createRoot(element as Element);
root.render(
  // <React.StrictMode>
  <QueryClientProvider client={client}>
    <RecoilRoot>
      <ReactiveStyle/>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </RecoilRoot>
  </QueryClientProvider>,
  // </React.StrictMode>
);

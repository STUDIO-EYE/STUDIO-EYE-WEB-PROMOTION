import React from 'react';
import { useRouteError, isRouteErrorResponse } from 'react-router-dom';
import styled from 'styled-components';

const ErrorPage = () => {
  const error = useRouteError();

  let errorMessage = '알 수 없는 에러가 발생했습니다. 다시 시도해주세요.';

  if (isRouteErrorResponse(error)) {
    errorMessage = error.status === 404 ? '페이지를 찾을 수 없습니다.' : error.data || error.statusText;
  }

  return (
    <ErrorContainer>
      <ErrorTitle>에러 발생</ErrorTitle>
      <ErrorMessage>{errorMessage}</ErrorMessage>
    </ErrorContainer>
  );
};

export default ErrorPage;

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #000;
  color: #fff;
`;

const ErrorTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const ErrorMessage = styled.p`
  font-size: 1.5rem;
`;

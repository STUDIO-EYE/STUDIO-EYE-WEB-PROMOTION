import React from 'react';
import styled, { keyframes } from 'styled-components';

const FixedLoading = () => {
  return (
    <Container>
      <RotatingCircle />
    </Container>
  );
};

export default FixedLoading;

const Container = styled.div`
  position: fixed; /* 화면 전체를 차지하도록 설정 */
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999; /* 최상위로 설정 */
`;

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const RotatingCircle = styled.div`
  width: 50px;
  height: 50px;
  border: 6px solid #6e6e6e;
  border-top: 6px solid #ffa42e; /* Change this color for customization */
  border-radius: 50%;
  animation: ${rotate} 1s linear infinite;
`;

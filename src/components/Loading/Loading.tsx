import React from 'react';
import styled, { keyframes } from 'styled-components';

const Loading = () => {
  return (
  <Container>
    <RotatingCircle />
  </Container>
)};

export default Loading;

const Container = styled.div`
  width: 100%;
  height: 100svh;
  background-color: black;
  transition: all 300ms ease-in-out;
  align-items: center;
  justify-content: center;
  display: flex;
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
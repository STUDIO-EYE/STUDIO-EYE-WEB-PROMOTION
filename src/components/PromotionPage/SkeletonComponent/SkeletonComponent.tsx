import React from 'react';
import styled, { keyframes } from 'styled-components';

interface SkeletonProps {
  width?: string;
  height?: string;
  borderRadius?: string;
  margin?: string;
}

const SkeletonComponent: React.FC<SkeletonProps> = ({
  width = '250px',
  height = '350px',
  borderRadius = '10px',
  margin = '10px',
}) => {
  return <SkeletonWrapper data-cy='PP_skeleton' width={width} height={height} borderRadius={borderRadius} margin={margin} />;
};

export default SkeletonComponent;

const shimmer = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

const SkeletonWrapper = styled.div<SkeletonProps>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  margin: ${(props) => props.margin};
  background: #f6f7f8;
  background-image: linear-gradient(
    to right,
    #f6f7f8 0%,
    #edeef1 20%,
    #f6f7f8 40%,
    #f6f7f8 100%
  );
  background-repeat: no-repeat;
  background-size: 200px 100%;
  border-radius: ${(props) => props.borderRadius};
  animation: ${shimmer} 1.5s infinite linear;
  opacity: 0.3;
`;

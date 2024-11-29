import styled from 'styled-components';

export const ContentBox = styled.div`
  position: relative;
  border-radius: 0.5rem;
  backdrop-filter: blur(4px);
  background-color: rgba(255, 255, 255, 0.122) ${(props) => props.theme.color.white.bold};
  box-shadow: 1px 1px 4px 0.1px ${(props) => props.theme.color.black.pale};
  /* border: 0.5px solid ${(props) => props.theme.color.black.light}; */
  width: 85vw;
  height: auto;
  overflow-y: scroll;
  overflow-x: hidden;
`;

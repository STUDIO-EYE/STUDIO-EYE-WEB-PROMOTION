import styled from 'styled-components';

export const ContentBox = styled.div`
  padding: 25px;
  position: relative;
  box-shadow: 2px 2px 5px 0.3px ${(props) => props.theme.color.black.pale};
  margin-bottom: 30px;
  margin-right: 30px;
  border-radius: 4px;
  background-color: ${(props) => props.theme.color.white.bold};
  width: 38vw;
  height: 800px;
`;

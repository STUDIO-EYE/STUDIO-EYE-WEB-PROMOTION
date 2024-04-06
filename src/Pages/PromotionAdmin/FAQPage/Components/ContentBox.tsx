import styled from "styled-components";

export const ContentBox = styled.div`
  position: fixed;
  left: 25rem;
  top: 10rem;
  border-radius: 1rem;
  background-color: ${(props) => props.theme.color.white.bold};
  width: 45%;
  height: 80%;
  box-shadow: 1px 1px 4px 0.1px #c6c6c6;
`;

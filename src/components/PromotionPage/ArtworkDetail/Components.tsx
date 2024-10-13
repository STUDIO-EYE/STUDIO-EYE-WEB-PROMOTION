import { theme } from '@/styles/theme';
import styled from 'styled-components';

export const NavWrapper = styled.div`
  cursor: pointer;
  padding: 0px 170px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 200px;
  border-bottom: 1px solid ${(props) => props.theme.color.black.bold};
  background-color: ${(props) => props.theme.color.white.bold};

  white-space: nowrap;
  text-overflow: ellipsis;
  overflow : hidden;

  @media ${theme.media.mobile} {
    width: 90vw;
    height: auto;
    padding: 1.5rem;
  }
`;

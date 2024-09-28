import Menu from '@/components/PromotionAdmin/DataEdit/Menu/Menu';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

function MenuPage() {
    return (
        <Wrapper>
            <ContentBlock>
                <TitleWrapper>
                    
                </TitleWrapper>
            </ContentBlock>
        </Wrapper>
    );
}

export default MenuPage;

export const Wrapper = styled.div`
  display: flex;
  input,
  textarea {
    outline: none;
  }

  input:focus,
  textarea:focus {
    transition: 0.2s;
    border-bottom: 3px solid ${(props) => props.theme.color.symbol};
  }
`;
export const ContentBlock = styled.div<{ width?: number; height?: number }>`
  padding: 25px;
  background-color: ${(props) => props.theme.color.white.pale};
  position: relative;
  box-shadow: 2px 2px 5px 0.3px ${(props) => props.theme.color.black.pale};
  margin-bottom: 30px;
  margin-right: 30px;

  border-radius: 4px;
  width: ${(props) => (props.width ? props.width + 'px;' : '40vw;')};
  height: ${(props) => (props.height ? props.height + 'px;' : 'fit-content;')};
`;
const Content = styled.div`
  padding: 12px;
  font-size: 14px;
  font-family: ${(props) => props.theme.font.regular};
  width: 70%;
  min-height: 15px;
  box-shadow: 1px 1px 4px 0.1px #c6c6c6;
  white-space: pre-wrap;
  word-wrap: break-word;
  word-break: break-word;

  & p,
  span {
    font-size: 14px;
    font-family: ${(props) => props.theme.font.regular};
    line-height: 20px;
  }
`;
const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const InputWrapper = styled.div`
  display: flex;
  background-color: ${(props) => props.theme.color.white.light};
  flex-direction: column;
  font-family: ${(props) => props.theme.font.regular};
  p {
    font-size: 18px;
    padding-top: 7px;
    padding-bottom: 3px;
  }
  input {
    outline: none;
    font-family: ${(props) => props.theme.font.regular};
    font-size: 14px;
    padding-left: 10px;
    width: 30%;
    height: 30px;
    border: none;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  }

  input:focus,
  textarea:focus {
    transition: 0.2s;
    border-bottom: 3px solid ${(props) => props.theme.color.symbol};
  }
`;

export const InputImgWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

export const InputTitle = styled.div`
  display: flex;
  padding-top: 20px;
  align-items: center;
  height: 40px;
  svg {
    cursor: pointer;
    margin-right: 10px;
  }
`;
export const Box = styled.div`
  width: 100%;
`;

export const ImgBox = styled.div`
  display: flex;
  height: 200px;
  width: 80%;
  justify-content: center;
  align-items: center;
  background-color: #1a1a1a;
  border-radius: 5px;
  margin-top: 15px;
`;
export const LogoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  input {
    display: none;
  }

  img {
    max-width: 300px;
    max-height: 150px;
    margin-bottom: 10px;
  }
`;

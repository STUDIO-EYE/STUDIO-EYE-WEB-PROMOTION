import { theme } from '@/styles/theme';
import styled from 'styled-components';

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

export const Form = styled.form`
  display: flex;
`;

export const LeftContentWrapper = styled.div``;
export const RightContentWrapper = styled.div``;

export const ContentBlock = styled.div<{ width?: number; height?: number; isFocused?: boolean }>`
  padding: 25px;
  position: relative;
  box-shadow: 2px 2px 5px 0.3px ${(props) => props.theme.color.black.pale};
  margin-bottom: 30px;
  margin-right: 30px;

  border-radius: 4px;
  width: ${(props) => (props.width ? props.width + 'px;' : '750px;')};
  height: ${(props) => (props.height ? props.height + 'px;' : 'fit-content;')};
  background-color: ${(props) => (props.isFocused ? theme.color.yellow.pale : theme.color.white.pale)};
`;

export const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 20px;
`;

export const InputWrapper = styled.div`
  display: flex;
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

export const RowWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const SloganWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  input {
    display: none;
  }

  img {
    max-width: 450px;
    max-height: 150px;
    margin-bottom: 10px;
  }
`;

export const SloganBox = styled.div`
  display: flex;
  height: 200px;
  width: 100%;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.color.background};
  border-radius: 5px;
  margin-top: 15px;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.3);
`;

export const Box = styled.div`
  width: 48%;
`;

export const ImgBox = styled.div`
  display: flex;
  height: 200px;
  width: 100%;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.color.background};
  border-radius: 5px;
  margin-top: 15px;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.3);
`;

export const Button = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  width: 180px;
  border: none;
  height: 40px;
  background-color: ${(props) => props.theme.color.white.bold};
  font-family: ${(props) => props.theme.font.medium};
  color: #494845;
  box-shadow: 1px 1px 4px 0.1px #c6c6c6;

  &:hover {
    background-color: ${(props) => props.theme.color.yellow.light};
    transition: 0.2s;
  }

  svg {
    padding-right: 10px;
  }
`;

export const LogoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  input {
    display: none;
  }

  img {
    max-width: 300px;
    max-height: 150px;
    margin-bottom: 10px;
  }
`;

export const SaveButton = styled.button`
  cursor: pointer;
  position: fixed;
  right: 40px;
  top: 195px;
  background-color: ${(props) => props.theme.color.yellow.bold};
  color: ${(props) => props.theme.color.white.bold};

  width: 140px;
  height: 40px;
  font-size: 15px;
  font-family: ${(props) => props.theme.font.semiBold};

  border: none;
  box-shadow: 1px 1px 4px 0.1px #c6c6c6;

  &:hover {
    scale: 1.1;
    transition: 0.2s;
  }
`;

export const DetailItem = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-around;
  padding: 5px 0px;

  svg {
    cursor: pointer;
  }

  .detail_content {
    font-family: ${(props) => props.theme.font.regular};
    max-height: 130px;
    min-height: 30px;
    min-width: 360px;
    max-width: 360px;
    border: none;
    box-shadow: 1px 1px 4px 0.1px #c6c6c6;
    padding-right: 70px;
  }

  .detail_title {
    width: 240px;
    margin-right: 5px;
    font-family: ${(props) => props.theme.font.regular};
  }
`;

export const DetailTitleInputWrapper = styled.div`
  display: flex;
  position: relative;
  span {
    position: absolute;
    font-size: 12px;
    right: 10px;
    top: 10px;
    color: ${(props) => props.theme.color.black.light};
    font-family: ${(props) => props.theme.font.light};
  }
`;

export const BasicInputWrapper = styled.div`
  width: 100%;
  display: flex;
  position: relative;
  input {
    width: 100%;
    padding-right: 100px;
  }
  span {
    position: absolute;
    font-size: 12px;
    right: 10px;
    top: 10px;
    color: ${(props) => props.theme.color.black.light};
    font-family: ${(props) => props.theme.font.light};
  }
`;

export const DetailContentWrapper = styled.div`
  display: flex;
  position: relative;

  span {
    position: absolute;
    font-size: 12px;
    right: 10px;
    top: 10px;
    color: ${(props) => props.theme.color.black.light};
    font-family: ${(props) => props.theme.font.light};
  }
`;

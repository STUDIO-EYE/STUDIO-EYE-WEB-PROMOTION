import { getCEOData } from '@/apis/PromotionAdmin/dataEdit';
import { ICEOData } from '@/types/PromotionAdmin/dataEdit';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/PromotionAdmin/DataEdit/StyleComponents/Button';
import styled from 'styled-components';
import CEOWritePage from './CEOWritePage';
import { DATAEDIT_TITLES_COMPONENTS } from '../../../../components/PromotionAdmin/DataEdit/Company/StyleComponents';
import SkeletonComponent from '@/components/PromotionPage/SkeletonComponent/SkeletonComponent';

function CEOPage() {
  const { data, isLoading } = useQuery<ICEOData>(['ceo', 'id'], getCEOData);
  const navigator = useNavigate();

  if (isLoading) return <SkeletonComponent width={'100vw'} height={'100vh'}/>;
  if (data === null) return <CEOWritePage />;

  return (
    <Wrapper>
      <ContentBlock>
        <TitleWrapper>
          {DATAEDIT_TITLES_COMPONENTS.CEO}
          <Button description='수정하기' onClick={() => navigator('edit')} width={100} />
        </TitleWrapper>
        <InputWrapper>
          <InputTitle>
            <p>Name</p>
          </InputTitle>
          <Content>{data?.name}</Content>
          <InputTitle>
            <p>Introduction</p>
          </InputTitle>
          <Content dangerouslySetInnerHTML={{ __html: data?.introduction || '<p>데이터 없음</p>' }}></Content>
          <InputImgWrapper>
            <Box>
              <InputTitle>{DATAEDIT_TITLES_COMPONENTS.CEOIMG}</InputTitle>
              <LogoWrapper>
                <ImgBox>
                  <img src={data?.imageUrl} alt='' />
                </ImgBox>
              </LogoWrapper>
            </Box>
          </InputImgWrapper>
        </InputWrapper>
      </ContentBlock>
    </Wrapper>
  );
}

export default CEOPage;

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

import { getCompanyDetailData } from '@/apis/PromotionAdmin/dataEdit';
import { ICompanyData } from '@/types/PromotionAdmin/dataEdit';
import React from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { DATAEDIT_TITLES_COMPONENTS } from '../StyleComponents';
import Button from '../../StyleComponents/Button';
import { ContentBlock } from '../CompanyFormStyleComponents';
import { MSG } from '@/constants/messages';

interface IDetailProps {
  setEditDetail: (editMode: boolean) => void;
}

const Detail = ({ setEditDetail }: IDetailProps) => {
  const { data, isLoading, error } = useQuery<ICompanyData, Error>(['company', 'id'], getCompanyDetailData);
  const detailInformation = data?.detailInformation || [{ key: 'what we do', value: 'hello' }];

  const combinedArray = detailInformation.map((item) => ({
    key: item.key,
    value: item.value,
  }));

  if (isLoading) return <>is Loading..</>;
  if (error) return <>{error.message}</>;

  return (
    <Wrapper>
      {data && (
        <ContentBlock>
          <TitleWrapper>
            {DATAEDIT_TITLES_COMPONENTS.Detail}
            <Button
              description={MSG.BUTTON_MSG.MODIFY}
              onClick={() => {
                setEditDetail(true);
              }}
              fontSize={14}
              width={100}
            />
          </TitleWrapper>
          <InputWrapper>
            <div>
              {combinedArray.map((data) => (
                <DetailItem key={data.key}>
                  <div className='detail_title'>{data.key}</div>
                  <div className='detail_content'>{String(data.value)}</div>
                </DetailItem>
              ))}
            </div>
          </InputWrapper>
        </ContentBlock>
      )}
    </Wrapper>
  );
};

export default Detail;

const Wrapper = styled.div`
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

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const InputWrapper = styled.div`
  margin-top: 30px;
  display: flex;

  flex-direction: column;
  font-family: ${(props) => props.theme.font.regular};
  p {
    font-size: 18px;
    padding-top: 7px;
    padding-bottom: 3px;
  }
  input {
    font-family: ${(props) => props.theme.font.regular};
    font-size: 14px;
    padding-left: 10px;
    height: 30px;
    border: none;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  }
`;

const DetailItem = styled.div`
  display: flex;
  width: 100%;
  align-items: flex-start;
  justify-content: space-around;
  padding: 5px 0px;
  font-size: 15px;
  background-color: white;

  .detail_content {
    display: flex;
    align-items: center;
    padding: 5px;
    font-family: ${(props) => props.theme.font.light};
    min-height: 30px;
    width: 400px;
    border: none;
    box-shadow: 1px 1px 4px 0.1px #c6c6c6;
    line-height: 18px;
    white-space: pre-wrap;
  }

  .detail_title {
    padding: 5px;
    display: flex;
    align-items: center;
    width: 240px;
    height: 30px;
    margin-right: 5px;
    font-family: ${(props) => props.theme.font.light};
    box-shadow: 1px 1px 4px 0.1px #c6c6c6;
  }
`;

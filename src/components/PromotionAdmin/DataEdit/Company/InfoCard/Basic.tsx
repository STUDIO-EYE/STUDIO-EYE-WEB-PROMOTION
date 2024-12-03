import { getCompanyData } from '@/apis/PromotionAdmin/dataEdit';
import { ICompanyData } from '@/types/PromotionAdmin/dataEdit';
import React from 'react';
import { useQuery } from 'react-query';

import { Wrapper, ContentBlock, InputWrapper, InputTitle } from '../CompanyFormStyleComponents';

import styled from 'styled-components';
import { DATAEDIT_TITLES_COMPONENTS } from '../StyleComponents';
import Button from '../../StyleComponents/Button';
import { MSG } from '@/constants/messages';
import SkeletonComponent from '@/components/PromotionPage/SkeletonComponent/SkeletonComponent';

interface IBasicProps {
  setEditBasic: (editMode: boolean) => void;
}

const Basic = ({ setEditBasic }: IBasicProps) => {
  const { data, isLoading, error } = useQuery<ICompanyData, Error>(['company', 'id'], getCompanyData);

  if (isLoading) return <SkeletonComponent width={'100vw'} height={'100vh'}/>;
  if (error) return <>{error.message}</>;
  return (
    <Wrapper>
      {data && (
        <>
          <ContentBlock>
            <TitleWrapper>
              {DATAEDIT_TITLES_COMPONENTS.Basic}
              <Button description={MSG.BUTTON_MSG.MODIFY} onClick={() => setEditBasic(true)} width={100} />
            </TitleWrapper>

            <InputWrapper>
              <InputTitle>
                <p>Address</p>
              </InputTitle>
              <Content>{data.address}</Content>

              <InputTitle>
                <p>English Address</p>
              </InputTitle>
              <Content>{data.addressEnglish}</Content>

              <InputTitle>
                <p>Phone Number</p>
              </InputTitle>

              <Content>{data.phone}</Content>

              <InputTitle>
                <p>Fax Number</p>
              </InputTitle>

              <Content>{data.fax}</Content>
            </InputWrapper>
          </ContentBlock>
        </>
      )}
    </Wrapper>
  );
};

export default Basic;

const Content = styled.div`
  display: flex;
  align-items: center;
  padding: 12px;
  font-size: 14px;
  font-family: ${(props) => props.theme.font.regular};
  min-height: 15px;
  box-shadow: 1px 1px 4px 0.1px #c6c6c6;

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

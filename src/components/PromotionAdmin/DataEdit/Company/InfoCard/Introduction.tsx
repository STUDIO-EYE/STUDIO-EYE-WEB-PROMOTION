import React from 'react';
import { useQuery } from 'react-query';
import { getCompanyData } from '@/apis/PromotionAdmin/dataEdit';
import { ICompanyData } from '@/types/PromotionAdmin/dataEdit';

import { Wrapper, ContentBlock, InputWrapper, InputTitle } from '../CompanyFormStyleComponents';
import styled from 'styled-components';
import { DATAEDIT_TITLES_COMPONENTS } from '../StyleComponents';
import InnerHTML from '../../StyleComponents/InnerHTML';
import Button from '../../StyleComponents/Button';
import { MSG } from '@/constants/messages';
import { aboutPageAttributes, dataEditCompanyPageAttributes } from '@/constants/dataCyAttributes';

interface IIntrodutionProps {
  setEditIntroduction: (editMode: boolean) => void;
}

const Introduction = ({ setEditIntroduction }: IIntrodutionProps) => {
  const { data, isLoading, error } = useQuery<ICompanyData, Error>(['company', 'id'], getCompanyData);

  if (isLoading) return <>is Loading...</>;
  if (error) return <>{error.message}</>;
  return (
    <Wrapper>
      {data && (
        <ContentBlock>
          <TitleWrapper>
            {DATAEDIT_TITLES_COMPONENTS.Introduction}ㅁㄴㅇㄻㄴㅇㄻㄴㅇ
            <Button
              data-cy={dataEditCompanyPageAttributes.MODIFY_INTRO_BUTTON}
              description={MSG.BUTTON_MSG.MODIFY}
              onClick={() => setEditIntroduction(true)}
              width={100}
            />
          </TitleWrapper>
          <InputWrapper>
            <InputTitle>Main Overview</InputTitle>
            <Content>
              <InnerHTML description={data.mainOverview} />
            </Content>
            <InputTitle>Commitment</InputTitle>
            <Content>
              <InnerHTML description={data.commitment} />
            </Content>
            <InputTitle>Intro씨빨ducㄴㅇㄻㄴㅇㄹ??tion</InputTitle>
            <Content data-cy={aboutPageAttributes.VIEW_INTRO}>
              <InnerHTML description={data.introduction} />
            </Content>
          </InputWrapper>
        </ContentBlock>
      )}
    </Wrapper>
  );
};

export default Introduction;

const Content = styled.div`
  display: flex;
  align-items: center;
  padding: 12px;
  font-size: 14px;
  font-family: ${(props) => props.theme.font.regular};
  height: max-content;
  box-shadow: 1px 1px 4px 0.1px #c6c6c6;
  max-height: 350px;
  overflow-y: scroll;
  background-color: ${(props) => props.theme.color.background};

  & p,
  span {
    color: white;
    font-size: 14px;
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

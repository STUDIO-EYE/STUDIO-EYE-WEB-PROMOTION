import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { getCompanyData } from '@/apis/PromotionAdmin/dataEdit';
import { ICompanyData } from '@/types/PromotionAdmin/dataEdit';
import { Wrapper, ContentBlock, InputWrapper, InputTitle } from '../CompanyFormStyleComponents';
import axios from 'axios';
import { PROMOTION_BASIC_PATH } from '@/constants/basicPathConstants';
import { DATAEDIT_NOTICE_COMPONENTS, DATAEDIT_TITLES_COMPONENTS, INPUT_MAX_LENGTH } from '../StyleComponents';
import Button from '../../StyleComponents/Button';
import styled from 'styled-components';
import { MSG } from '@/constants/messages';
import TextColorEditor from '@/components/TextEditor/TextColorEditor';
import { useSetRecoilState } from 'recoil';
import { dataUpdateState } from '@/recoil/atoms';
import { aboutPageAttributes, dataEditCompanyPageAttributes } from '@/constants/dataCyAttributes';

interface IIntrodutionProps {
  setEditIntroduction: (editMode: boolean) => void;
}

const Introduction = ({ setEditIntroduction }: IIntrodutionProps) => {
  const { data, isLoading, error } = useQuery<ICompanyData, Error>(['company', 'id'], getCompanyData);
  const [putData, setPutData] = useState({
    mainOverview: data?.mainOverview || '',
    commitment: data?.commitment || '',
    introduction: data?.introduction || '',
  });
  const setIsEditing = useSetRecoilState(dataUpdateState);

  useEffect(() => {
    if (data) {
      setPutData({
        mainOverview: data.mainOverview,
        commitment: data.commitment,
        introduction: data.introduction,
      });
    }
  }, [data]);

  const [mainOverviewState, setMainOverviewState] = useState(data?.mainOverview || '');
  const [commitmentState, setCommitmentState] = useState(data?.commitment || '');
  const [introductionState, setIntroductionState] = useState(data?.introduction || '');

  const updateMainOverview = (state: string) => {
    setMainOverviewState(state);
    setIsEditing(true);
  };
  const updateCommitment = (state: string) => {
    setCommitmentState(state);
    setIsEditing(true);
  };
  const updateIntroduction = (state: string) => {
    setIntroductionState(state);
    setIsEditing(true);
  };

  const checkIsEmpty = (text: string, attribute: string) => {
    if (!text.trim()) {
      alert(`${attribute}을(를) 작성해주세요.`);
      return true;
    }
    return false;
  };

  const handleSaveClick = async () => {
    const updateData = {
      mainOverview: mainOverviewState,
      commitment: commitmentState,
      introduction: introductionState,
    };

    const isEmpty =
      checkIsEmpty(mainOverviewState, 'Main Overview') ||
      checkIsEmpty(commitmentState, 'Commitment') ||
      checkIsEmpty(introductionState, 'Introduction');

    if (!isEmpty && window.confirm(MSG.CONFIRM_MSG.SAVE)) {
      axios
        .put(`${PROMOTION_BASIC_PATH}/api/company/introduction`, updateData)
        .then((response) => {
          console.log('Company Introduction updated:', response);
          alert(MSG.ALERT_MSG.SAVE);
          setEditIntroduction(false);
        })
        .catch((error) => {
          console.error('Error updating company:', error);
        });
    }
  };

  if (isLoading) return <>is Loading...</>;
  if (error) return <>{error.message}</>;
  return (
    <Wrapper>
      <ContentBlock isFocused={true}>
        <TitleWrapper>
          {DATAEDIT_TITLES_COMPONENTS.Introduction}
          <Button
            data-cy={dataEditCompanyPageAttributes.SAVE_INTRO_BUTTON}
            description={MSG.BUTTON_MSG.SAVE}
            onClick={handleSaveClick}
            width={100}
          />
        </TitleWrapper>
        {DATAEDIT_NOTICE_COMPONENTS.TEXT.INTRODUCTION}

        <InputWrapper>
          <InputTitle>Main Overview</InputTitle>
          <TextColorEditor
            editorState={mainOverviewState}
            onEditorStateChange={updateMainOverview}
            attribute='Main Overview'
            charLimit={INPUT_MAX_LENGTH.INFOMATION_MAIN_OVERVIEW}
          />
          <InputTitle>Commitment</InputTitle>
          <TextColorEditor
            editorState={commitmentState}
            onEditorStateChange={updateCommitment}
            attribute='Commitment'
            charLimit={INPUT_MAX_LENGTH.INFOMATION_COMMITMENT}
          />
          <InputTitle>Introduction</InputTitle>
          <TextColorEditor
            data-cy={aboutPageAttributes.UPDATE_INTRO}
            editorState={introductionState}
            onEditorStateChange={updateIntroduction}
            attribute='Introduction'
            charLimit={INPUT_MAX_LENGTH.INFOMATION_INTRODUCTION}
          />
        </InputWrapper>
      </ContentBlock>
    </Wrapper>
  );
};

export default Introduction;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const MainOverviewContainer = styled.div`
`;

const CommitmentContainer = styled.div`
`;
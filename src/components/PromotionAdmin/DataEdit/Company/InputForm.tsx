import { postCompanyInformation } from '@/apis/PromotionAdmin/dataEdit';
import React, { useState } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { theme } from '@/styles/theme';
import { PA_ROUTES, PA_ROUTES_CHILD } from '@/constants/routerConstants';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as DeleteIcon } from '@/assets/images/PA/minusIcon.svg';
import { ReactComponent as AddedIcon } from '@/assets/images/PA/plusIcon.svg';
import {
  Wrapper,
  ContentBlock,
  InputWrapper,
  InputImgWrapper,
  InputTitle,
  ImgBox,
  LogoWrapper,
  DetailItem,
  DetailTitleInputWrapper,
  Form,
  Box,
  RowWrapper,
  SloganWrapper,
  SloganBox,
  LeftContentWrapper,
  RightContentWrapper,
  DetailContentWrapper,
  BasicInputWrapper,
} from './CompanyFormStyleComponents';
import Button from '../StyleComponents/Button';
import FileButton from '../StyleComponents/FileButton';
import styled from 'styled-components';
import { DATAEDIT_NOTICE_COMPONENTS, DATAEDIT_TITLES_COMPONENTS, INPUT_MAX_LENGTH } from './StyleComponents';
import { MSG } from '@/constants/messages';
import { useRecoilState } from 'recoil';
import { dataUpdateState } from '@/recoil/atoms';
import TextColorEditor from '@/components/TextEditor/TextColorEditor';
import { aboutPageAttributes, dataEditCompanyPageAttributes } from '@/constants/dataCyAttributes';

interface IFormData {
  mainOverview?: string;
  commitment?: string;
  address?: string;
  addressEnglish?: string;
  fax?: string;
  introduction?: string;
  phone?: string;
  detailInformation: IDetailInformation[];
}

interface IDetailInformation {
  key: string;
  value: string;
}

interface IBasicFormData {
  address: string;
  addressEnglish: string;
  phone: string;
  fax: string;
}

const InputForm = () => {
  const [isEditing, setIsEditing] = useRecoilState(dataUpdateState);
  const navigator = useNavigate();
  const [putData, setPutData] = useState({
    request: {
      address: '',
      addressEnglish: '',
      phone: '',
      fax: '',
      mainOverview: '',
      commitment: '',
      introduction: '',
      detailInformation: '',
    },
    lightLogoImage: '',
    darkLogoImage: '',
    sloganImage: '',
  });

  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<IFormData>();

  // 글자수 확인
  const watchBasicFields = watch(['address', 'addressEnglish', 'phone', 'fax']);
  const basicInputIndex = {
    address: 0,
    addressEnglish: 1,
    phone: 2,
    fax: 3,
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    maxLength: number,
    field: keyof IBasicFormData,
  ) => {
    const inputLength = event.target.value.length;

    if (inputLength <= maxLength) {
      setValue(field, event.target.value, { shouldValidate: true });
    } else {
      const trimmedValue = event.target.value.slice(0, maxLength);
      setValue(field, trimmedValue, { shouldValidate: true });
    }
    setIsEditing(true);
  };

  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange(event, INPUT_MAX_LENGTH.BASIC_ADDRESS, 'address');
  };

  const handleEnglishAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange(event, INPUT_MAX_LENGTH.BASIC_ENGLISH_ADDRESS, 'addressEnglish');
  };

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange(event, INPUT_MAX_LENGTH.BASIC_PHONE, 'phone');
  };

  const handleFaxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange(event, INPUT_MAX_LENGTH.BASIC_FAX, 'fax');
  };

  // 글자수 확인
  const watchDetailFields = watch('detailInformation');

  // detail 요소 추가 삭제
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'detailInformation',
  });

  // detail 요소 삭제
  const safeRemove = (index: number) => {
    if (fields.length > 1 && window.confirm(MSG.CONFIRM_MSG.DELETE)) {
      remove(index);
    } else {
      alert(MSG.INVALID_MSG.DETAIL);
    }
  };

  const [mainOverviewState, setMainOverviewState] = useState('');
  const [commitmentState, setCommitmentState] = useState('');
  const [introductionState, setIntroductionState] = useState('');

  // const [blocks, setBlocks] = useState<IEditorData[]>([]);

  const updateMainOverview = (state: string) => {
    setMainOverviewState(state);
  };
  const updateCommitment = (state: string) => {
    setCommitmentState(state);
  };
  const updateIntroduction = (state: string) => {
    setIntroductionState(state);
  };

  const onValid = (data: IFormData) => {
    if (data.detailInformation.length < 1) {
      alert(MSG.INVALID_MSG.DETAIL);
      return;
    }

    if (putData.darkLogoImage == '') {
      alert(MSG.INVALID_MSG.LOGO);
      return;
    } else if (putData.lightLogoImage == '') {
      alert(MSG.INVALID_MSG.LOGO);
      return;
    } else if (putData.sloganImage == '') {
      alert(MSG.INVALID_MSG.SLOGAN);
      return;
    }

    handleSaveClick(data);
  };

  const checkIsEmpty = (text: string, attribute: string) => {
    if (!text.trim()) {
      alert(`${attribute}을(를) 작성해주세요.`);
      return true;
    }
    return false;
  };

  const handleSaveClick = async (data: IFormData) => {
    const formData = new FormData();

    const transformedDetailInformation = data.detailInformation.map((item) => ({
      key: item.key.toString(),
      value: item.value.toString(),
    }));

    const requestData = {
      address: data.address,
      addressEnglish: data.addressEnglish,
      phone: data.phone,
      fax: data.fax,
      mainOverview: mainOverviewState,
      commitment: commitmentState,
      introduction: introductionState,
      detailInformation: transformedDetailInformation,
    };

    console.log('requestData: ', requestData);

    const json = JSON.stringify({
      ...requestData,
      detailInformation: transformedDetailInformation,
    });
    const blob = new Blob([json], { type: 'application/json' });
    formData.append('request', blob);

    const isEmpty =
      checkIsEmpty(mainOverviewState, 'Main Overview') ||
      checkIsEmpty(commitmentState, 'Commitment') ||
      checkIsEmpty(introductionState, 'Introduction');

    const lightLogoFile = await urlToFile(putData.lightLogoImage, 'LightLogo.png');
    formData.append('lightLogoImage', lightLogoFile);
    const darkLogoFile = await urlToFile(putData.darkLogoImage, 'DarkLogo.png');
    formData.append('darkLogoImage', darkLogoFile);
    const sloganFile = await urlToFile(putData.sloganImage, 'Slogan.png');
    formData.append('sloganImage', sloganFile);

    if (!isEmpty && window.confirm(MSG.CONFIRM_MSG.POST)) {
      try {
        const response = await postCompanyInformation(formData);
        console.log('Company Information post:', response);
        alert(MSG.ALERT_MSG.POST);
        setIsEditing(false);
        navigator(`${PA_ROUTES.DATA_EDIT}/${PA_ROUTES_CHILD.DATA_EDIT_COMPANY}`);
      } catch (error) {
        console.error('Error posting company information:', error);
        alert('저장 중 문제가 발생했습니다. 다시 시도해 주세요.');
      }
    }
  };

  const handleImageChange = (file: File, key: string) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setPutData((prevData) => ({
        ...prevData,
        [key]: reader.result as string,
      }));
      setIsEditing(true);
    };
    reader.readAsDataURL(file);
  };

  const handleLightLogoImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleImageChange(e.target.files[0], 'lightLogoImage');
    }
  };

  const handleDarkLogoImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleImageChange(e.target.files[0], 'darkLogoImage');
    }
  };

  const handleSloganImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleImageChange(e.target.files[0], 'sloganImage');
    }
  };

  async function urlToFile(url: string, fileName: string): Promise<File> {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      // console.log(blob);
      return new File([blob], fileName);
    } catch (error) {
      console.error('Error URL to file:', error);
      throw error;
    }
  }

  return (
    <>
      <Wrapper>
        <Form onSubmit={handleSubmit(onValid)}>
          <LeftContentWrapper>
            {/* Basic */}
            <ContentBlock>
              {DATAEDIT_TITLES_COMPONENTS.Basic}

              <InputWrapper>
                <InputTitle>
                  <p>Address</p>
                </InputTitle>
                <BasicInputWrapper>
                  <input
                    {...register('address', {
                      required: MSG.PLACEHOLDER_MSG.ADDRESS,
                      maxLength: INPUT_MAX_LENGTH.BASIC_ADDRESS,
                    })}
                    onChange={handleAddressChange}
                    placeholder={MSG.PLACEHOLDER_MSG.ADDRESS}
                  />
                  <span>
                    {watchBasicFields[basicInputIndex.address]?.length} / {INPUT_MAX_LENGTH.BASIC_ADDRESS}자
                  </span>
                </BasicInputWrapper>
                {errors.address && <ErrorMessage>{errors.address.message}</ErrorMessage>}

                <InputTitle>
                  <p>English Address</p>
                </InputTitle>
                <BasicInputWrapper>
                  <input
                    {...register('addressEnglish', {
                      required: MSG.PLACEHOLDER_MSG.ENGLISH_ADDRESS,
                      maxLength: INPUT_MAX_LENGTH.BASIC_ENGLISH_ADDRESS,
                      pattern: {
                        value: /^[A-Za-z0-9\s,.'-]{3,}$/,
                        message: MSG.INVALID_MSG.ENGLISH_ADDRESS,
                      },
                    })}
                    onChange={handleEnglishAddressChange}
                    placeholder={MSG.PLACEHOLDER_MSG.ENGLISH_ADDRESS}
                  />
                  <span>
                    {watchBasicFields[basicInputIndex.addressEnglish]?.length} /{' '}
                    {INPUT_MAX_LENGTH.BASIC_ENGLISH_ADDRESS}자
                  </span>
                </BasicInputWrapper>
                {errors.addressEnglish && <ErrorMessage>{errors.addressEnglish.message}</ErrorMessage>}

                <InputTitle>
                  <p>Phone Number</p>
                </InputTitle>

                <BasicInputWrapper>
                  <input
                    {...register('phone', {
                      required: MSG.PLACEHOLDER_MSG.PHONE,
                      maxLength: INPUT_MAX_LENGTH.BASIC_PHONE,
                      pattern: {
                        value: /^\+?\d{2,3}-\d{3,4}-\d{4}$/,
                        message: MSG.INVALID_MSG.PHONE,
                      },
                    })}
                    onChange={handlePhoneChange}
                    placeholder={MSG.PLACEHOLDER_MSG.PHONE}
                  />
                  <span>
                    {watchBasicFields[basicInputIndex.phone]?.length} / {INPUT_MAX_LENGTH.BASIC_PHONE}자
                  </span>
                </BasicInputWrapper>
                {errors.phone && <ErrorMessage>{errors.phone.message}</ErrorMessage>}

                <InputTitle>
                  <p>Fax Number</p>
                </InputTitle>
                <BasicInputWrapper>
                  <input
                    {...register('fax', {
                      required: MSG.PLACEHOLDER_MSG.FAX,
                      maxLength: INPUT_MAX_LENGTH.BASIC_FAX,
                      pattern: {
                        value: /^\+?\d{2,3}-\d{3,4}-\d{4}$/,
                        message: MSG.INVALID_MSG.FAX,
                      },
                    })}
                    onChange={handleFaxChange}
                    placeholder={MSG.PLACEHOLDER_MSG.FAX}
                  />
                  <span>
                    {watchBasicFields[basicInputIndex.fax]?.length} / {INPUT_MAX_LENGTH.BASIC_FAX}자
                  </span>
                </BasicInputWrapper>
                {errors.fax && <ErrorMessage>{errors.fax.message}</ErrorMessage>}
              </InputWrapper>
            </ContentBlock>

            {/* Logo & Slogan */}
            <ContentBlock>
              <InputImgWrapper>
                <RowWrapper>
                  <Box>
                    {DATAEDIT_TITLES_COMPONENTS.Logo}
                    {DATAEDIT_NOTICE_COMPONENTS.IMAGE.LOGO}
                    {DATAEDIT_NOTICE_COMPONENTS.COLOR.LOGO}

                    <LogoWrapper>
                      <FileButton
                        id='lightLogo'
                        description={MSG.BUTTON_MSG.UPLOAD.LOGO}
                        onChange={handleLightLogoImageChange}
                      />

                      <ImgBox>
                        <img src={putData.lightLogoImage} alt='' />
                      </ImgBox>
                    </LogoWrapper>
                  </Box>
                  <Box>
                    {DATAEDIT_TITLES_COMPONENTS.Logo}
                    {DATAEDIT_NOTICE_COMPONENTS.IMAGE.LOGO}
                    {DATAEDIT_NOTICE_COMPONENTS.COLOR.LOGO}

                    <LogoWrapper>
                      <FileButton
                        id='darkLogo'
                        description={MSG.BUTTON_MSG.UPLOAD.LOGO}
                        onChange={handleDarkLogoImageChange}
                      />

                      <ImgBox style={{ backgroundColor: theme.color.white.light }}>
                        <img src={putData.darkLogoImage} alt='' />
                      </ImgBox>
                    </LogoWrapper>
                  </Box>
                </RowWrapper>
                <Box style={{ marginTop: '20px', width: '100%' }}>
                  {DATAEDIT_TITLES_COMPONENTS.Slogan}
                  {DATAEDIT_NOTICE_COMPONENTS.IMAGE.SLOGAN}
                  {DATAEDIT_NOTICE_COMPONENTS.COLOR.SLOGAN}
                  <SloganWrapper>
                    <FileButton
                      id='sloganFile'
                      description={MSG.BUTTON_MSG.UPLOAD.SLOGAN}
                      onChange={handleSloganImageChange}
                    />

                    <SloganBox>
                      <img src={putData.sloganImage} alt='' />
                    </SloganBox>
                  </SloganWrapper>
                </Box>
              </InputImgWrapper>
            </ContentBlock>
          </LeftContentWrapper>

          <RightContentWrapper>
            {/* Introduntion */}
            <ContentBlock>
              {DATAEDIT_TITLES_COMPONENTS.Introduction}
              {DATAEDIT_NOTICE_COMPONENTS.TEXT.INTRODUCTION}
              <InputWrapper>
                <InputTitle>Main Overview</InputTitle>
                <MainOverviewContainer id='create_intro_mainoverview'>
                  <TextColorEditor
                    editorState={mainOverviewState}
                    onEditorStateChange={updateMainOverview}
                    attribute='Main Overview'
                    charLimit={INPUT_MAX_LENGTH.INFOMATION_MAIN_OVERVIEW}
                  />
                </MainOverviewContainer>
                <InputTitle>Commitment</InputTitle>
                <CommitmentContainer id='create_intro_commitment'>
                  <TextColorEditor
                    editorState={commitmentState}
                    onEditorStateChange={updateCommitment}
                    attribute='Commitment'
                    charLimit={INPUT_MAX_LENGTH.INFOMATION_COMMITMENT}
                  />
                </CommitmentContainer>
                <InputTitle>Introduction</InputTitle>
                <TextColorEditor
                  data-cy={aboutPageAttributes.CREATE_INTRO}
                  editorState={introductionState}
                  onEditorStateChange={updateIntroduction}
                  attribute='Introduction'
                  charLimit={INPUT_MAX_LENGTH.INFOMATION_INTRODUCTION}
                />
              </InputWrapper>
            </ContentBlock>

            {/* Detail */}
            <ContentBlock>
              <TitleWrapper space_between={true}>
                {DATAEDIT_TITLES_COMPONENTS.Detail}
                <Button
                  description={MSG.BUTTON_MSG.ADD.DETAIL}
                  svgComponent={<AddedIcon width={14} height={14} />}
                  onClick={() => {
                    append({ key: '', value: '' });
                    setIsEditing(true);
                  }}
                  as={'div'}
                />
              </TitleWrapper>

              <InputWrapper>
                <div>
                  {fields.map((field, index) => (
                    <DetailItem key={field.id}>
                      <DeleteIcon width={15} height={15} onClick={() => safeRemove(index)} />
                      <Controller
                        name={`detailInformation.${index}.key`}
                        control={control}
                        defaultValue={field.key}
                        render={({ field }) => (
                          <DetailTitleInputWrapper>
                            <input
                              {...register(`detailInformation.${index}.key`, {
                                required: MSG.PLACEHOLDER_MSG.DETAIL.TITLE,
                                maxLength: INPUT_MAX_LENGTH.DETAIL_TITLE,
                              })}
                              className='detail_title'
                              {...field}
                              placeholder={MSG.PLACEHOLDER_MSG.DETAIL.TITLE}
                              onChange={(e) => {
                                if (e.target.value.length <= INPUT_MAX_LENGTH.DETAIL_TITLE) {
                                  field.onChange(e);
                                }
                              }}
                            />
                            <span>
                              {watchDetailFields[index].key.length} / {INPUT_MAX_LENGTH.DETAIL_TITLE}자
                            </span>
                          </DetailTitleInputWrapper>
                        )}
                      />
                      <Controller
                        name={`detailInformation.${index}.value`}
                        control={control}
                        defaultValue={field.value}
                        render={({ field }) => (
                          <DetailContentWrapper>
                            <textarea
                              {...register(`detailInformation.${index}.value`, {
                                required: MSG.PLACEHOLDER_MSG.DETAIL.CONTENT,
                                maxLength: INPUT_MAX_LENGTH.DETAIL_CONTENT,
                              })}
                              className='detail_content'
                              {...field}
                              placeholder={MSG.PLACEHOLDER_MSG.DETAIL.CONTENT}
                              onChange={(e) => {
                                if (e.target.value.length <= INPUT_MAX_LENGTH.DETAIL_CONTENT) {
                                  field.onChange(e);
                                }
                              }}
                            />
                            <span>
                              {watchDetailFields[index].value.length} / {INPUT_MAX_LENGTH.DETAIL_CONTENT}자
                            </span>
                          </DetailContentWrapper>
                        )}
                      />
                    </DetailItem>
                  ))}
                </div>
              </InputWrapper>
            </ContentBlock>
            <div style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: '29px' }}>
              <Button
                id='create_intro'
                data-cy={dataEditCompanyPageAttributes.SUBMIT_BUTTON}
                description={MSG.BUTTON_MSG.POST}
                fontSize={14}
                width={100}
              />
            </div>
          </RightContentWrapper>
        </Form>
      </Wrapper>
    </>
  );
};

export default InputForm;

const TitleWrapper = styled.div<{ space_between?: boolean }>`
  display: flex;
  justify-content: ${(props) => (props.space_between ? 'space-between' : 'none')};

  div {
    display: flex;
  }
`;

const ErrorMessage = styled.div`
  font-family: ${(props) => props.theme.font.light};
  margin-top: 10px;
  margin-left: 10px;
  font-size: 13px;
`;

const MainOverviewContainer = styled.div``;

const CommitmentContainer = styled.div``;

import { PROMOTION_BASIC_PATH } from '@/constants/basicPathConstants';
import axios from 'axios';
import React, { useState } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { IEditorData } from '@/types/PromotionAdmin/faq';
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

interface IFormData {
  mainOverview?: string;
  commitment?: string;
  address?: string;
  addressEnglish?: string;
  fax?: string;
  introduction?: string;
  phone?: string;
  detailInformation: { key: string; value: string }[];
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
    logoImageUrl: '',
    sloganImageUrl: '',
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

  const [blocks, setBlocks] = useState<IEditorData[]>([]);

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

    if (putData.logoImageUrl == '') {
      alert(MSG.INVALID_MSG.LOGO);
      return;
    } else if (putData.sloganImageUrl == '') {
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

    const transformedDetailInformation = data.detailInformation.reduce(
      (acc, item) => {
        acc[item.key] = item.value;
        return acc;
      },
      {} as Record<string, string>,
    );

    formData.append(
      'request',
      new Blob(
        [
          JSON.stringify({
            address: data.address,
            addressEnglish: data.addressEnglish,
            phone: data.phone,
            fax: data.fax,
            mainOverview: mainOverviewState,
            commitment: commitmentState,
            introduction: introductionState,
            detailInformation: transformedDetailInformation,
          }),
        ],
        { type: 'application/json' },
      ),
    );

    const isEmpty =
      checkIsEmpty(mainOverviewState, 'Main Overview') ||
      checkIsEmpty(commitmentState, 'Commitment') ||
      checkIsEmpty(introductionState, 'Introduction');

    // 이미지 추가
    const logoFile = await urlToFile(putData.logoImageUrl, 'Logo.png');
    formData.append('logoImageUrl', logoFile);
    const sloganFile = await urlToFile(putData.sloganImageUrl, 'Slogan.png');
    formData.append('sloganImageUrl', sloganFile);

    if (!isEmpty && window.confirm(MSG.CONFIRM_MSG.POST)) {
      axios
        .post(`${PROMOTION_BASIC_PATH}/api/company/information`, formData)
        .then((response) => {
          console.log('Company Information post:', response);
          alert(MSG.ALERT_MSG.POST);
          setIsEditing(false);
          navigator(`${PA_ROUTES.DATA_EDIT}/${PA_ROUTES_CHILD.DATA_EDIT_COMPANY}`);
        })
        .catch((error) => console.error('Error post partner:', error));
    }
  };

  const handleLogoImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const logoImageUrl = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setPutData((prevData) => ({
          ...prevData,
          logoImageUrl: reader.result as string,
        }));
      };
      reader.readAsDataURL(logoImageUrl);
    }
    setIsEditing(true);
  };

  const handleSloganImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const sloganImageUrl = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setPutData((prevData) => ({
          ...prevData,
          sloganImageUrl: reader.result as string,
        }));
      };
      reader.readAsDataURL(sloganImageUrl);
    }
    setIsEditing(true);
  };

  async function urlToFile(url: string, fileName: string): Promise<File> {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      console.log(blob);
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
                <Box>
                  {DATAEDIT_TITLES_COMPONENTS.Logo}
                  {DATAEDIT_NOTICE_COMPONENTS.IMAGE.LOGO}
                  {DATAEDIT_NOTICE_COMPONENTS.COLOR.LOGO}

                  <LogoWrapper>
                    <FileButton
                      id='logoFile'
                      description={MSG.BUTTON_MSG.UPLOAD.LOGO}
                      onChange={handleLogoImageChange}
                    />
                    <ImgBox>
                      <img src={putData.logoImageUrl} alt='' />
                    </ImgBox>
                  </LogoWrapper>
                </Box>
                <Box>
                  {DATAEDIT_TITLES_COMPONENTS.Slogan}
                  {DATAEDIT_NOTICE_COMPONENTS.IMAGE.SLOGAN}
                  {DATAEDIT_NOTICE_COMPONENTS.COLOR.SLOGAN}

                  <LogoWrapper>
                    <FileButton
                      id='sloganFile'
                      description={MSG.BUTTON_MSG.UPLOAD.SLOGAN}
                      onChange={handleSloganImageChange}
                    />
                    <ImgBox>
                      <img src={putData.sloganImageUrl} alt='' />
                    </ImgBox>
                  </LogoWrapper>
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
              <Button description={MSG.BUTTON_MSG.POST} fontSize={14} width={100} />
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

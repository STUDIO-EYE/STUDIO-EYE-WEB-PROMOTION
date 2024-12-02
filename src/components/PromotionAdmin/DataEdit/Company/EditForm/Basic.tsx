import { getCompanyData } from '@/apis/PromotionAdmin/dataEdit';
import { PROMOTION_BASIC_PATH } from '@/constants/basicPathConstants';
import { ICompanyData } from '@/types/PromotionAdmin/dataEdit';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';

import {
  Wrapper,
  ContentBlock,
  InputWrapper,
  InputTitle,
  Form,
  BasicInputWrapper,
} from '../CompanyFormStyleComponents';
import { DATAEDIT_TITLES_COMPONENTS, INPUT_MAX_LENGTH } from '../StyleComponents';
import Button from '../../StyleComponents/Button';
import styled from 'styled-components';
import { MSG } from '@/constants/messages';
import { useSetRecoilState } from 'recoil';
import { dataUpdateState } from '@/recoil/atoms';
import SkeletonComponent from '@/components/PromotionPage/SkeletonComponent/SkeletonComponent';

interface IBasicFormData {
  address: string;
  addressEnglish: string;
  phone: string;
  fax: string;
}

interface IBasicProps {
  setEditBasic: (editMode: boolean) => void;
}

const Basic = ({ setEditBasic }: IBasicProps) => {
  const { data, isLoading, error } = useQuery<ICompanyData, Error>(['company', 'id'], getCompanyData);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<IBasicFormData>();

  const setIsEditing = useSetRecoilState(dataUpdateState);

  // 글자수 확인
  const watchFields = watch(['address', 'addressEnglish', 'phone', 'fax']);
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
  };

  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange(event, INPUT_MAX_LENGTH.BASIC_ADDRESS, 'address');
    setIsEditing(true);
  };

  const handleEnglishAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange(event, INPUT_MAX_LENGTH.BASIC_ENGLISH_ADDRESS, 'addressEnglish');
    setIsEditing(true);
  };

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange(event, INPUT_MAX_LENGTH.BASIC_PHONE, 'phone');
    setIsEditing(true);
  };

  const handleFaxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange(event, INPUT_MAX_LENGTH.BASIC_FAX, 'fax');
    setIsEditing(true);
  };

  useEffect(() => {
    if (data) {
      reset({
        address: data.address,
        addressEnglish: data.addressEnglish,
        phone: data.phone,
        fax: data.fax,
      });
    }
  }, [data, reset]);

  const onValid = (data: IBasicFormData) => {
    if (window.confirm(MSG.CONFIRM_MSG.SAVE)) {
      axios
        .put(`${PROMOTION_BASIC_PATH}/api/company/basic`, data)
        .then((response) => {
          window.alert(MSG.ALERT_MSG.SAVE);
          setEditBasic(false);
        })
        .catch((error) => console.error('Error updating company basic:', error));
    }
  };

  if (isLoading) return <SkeletonComponent width={'100vw'} height={'100vh'}/>;
  if (error) return <>{error.message}</>;
  return (
    <Wrapper>
      {data && (
        <>
          <Form onSubmit={handleSubmit(onValid)}>
            <ContentBlock isFocused={true}>
              <TitleWrapper>
                {DATAEDIT_TITLES_COMPONENTS.Basic}
                <Button description={MSG.BUTTON_MSG.SAVE} width={100} />
              </TitleWrapper>

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
                    {watchFields[basicInputIndex.address]?.length} / {INPUT_MAX_LENGTH.BASIC_ADDRESS}자
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
                    {watchFields[basicInputIndex.addressEnglish]?.length} / {INPUT_MAX_LENGTH.BASIC_ENGLISH_ADDRESS}자
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
                    {watchFields[basicInputIndex.phone]?.length} / {INPUT_MAX_LENGTH.BASIC_PHONE}자
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
                    {watchFields[basicInputIndex.fax]?.length} / {INPUT_MAX_LENGTH.BASIC_FAX}자
                  </span>
                </BasicInputWrapper>
                {errors.fax && <ErrorMessage>{errors.fax.message}</ErrorMessage>}
              </InputWrapper>
            </ContentBlock>
          </Form>
        </>
      )}
    </Wrapper>
  );
};

export default Basic;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ErrorMessage = styled.div`
  font-family: ${(props) => props.theme.font.light};
  margin-top: 10px;
  margin-left: 10px;
  font-size: 13px;
`;

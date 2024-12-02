import { getCompanyDetailData } from '@/apis/PromotionAdmin/dataEdit';
import { PROMOTION_BASIC_PATH } from '@/constants/basicPathConstants';
import axios from 'axios';
import React, { useEffect } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import {
  Wrapper,
  ContentBlock,
  TitleWrapper,
  InputWrapper,
  DetailItem,
  DetailTitleInputWrapper,
  Form,
  DetailContentWrapper,
} from '../CompanyFormStyleComponents';
import { ReactComponent as DeleteIcon } from '@/assets/images/PA/minusIcon.svg';
import { ReactComponent as AddedIcon } from '@/assets/images/PA/plusIcon.svg';
import Button from '../../StyleComponents/Button';
import { DATAEDIT_TITLES_COMPONENTS, INPUT_MAX_LENGTH } from '../StyleComponents';
import { MSG } from '@/constants/messages';
import { useSetRecoilState } from 'recoil';
import { dataUpdateState } from '@/recoil/atoms';
import { useNavigate } from 'react-router-dom';
import { aboutPageAttributes } from '@/constants/dataCyAttributes';
import SkeletonComponent from '@/components/PromotionPage/SkeletonComponent/SkeletonComponent';

interface IDetailFormData {
  [x: string]: any;
  detailInformation: { key: string; value: string }[];
}

interface IDetailProps {
  setEditDetail: (editMode: boolean) => void;
}

const Detail = ({ setEditDetail }: IDetailProps) => {
  const { data, isLoading, error } = useQuery<IDetailFormData, Error>(['company'], getCompanyDetailData);
  const { register, handleSubmit, watch, reset, control } = useForm<IDetailFormData>();
  const setIsEditing = useSetRecoilState(dataUpdateState); // 수정 여부 확인
  const navigator = useNavigate();

  // detail 요소 추가 삭제
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'detailInformation',
  });

  useEffect(() => {
    if (data) {
      const detailInformationArray = data.map((item: { key: string; value: { toString: () => string } }) => ({
        key: item.key,
        value: item.value.toString(),
      }));
      reset({ detailInformation: detailInformationArray });
    }
  }, [data, reset]);

  // 글자수 확인
  const watchFields = watch('detailInformation');

  // detail 요소 삭제
  const safeRemove = (index: number) => {
    if (fields.length > 1 && window.confirm(MSG.CONFIRM_MSG.DELETE)) {
      remove(index);
    } else {
      alert(MSG.INVALID_MSG.DETAIL);
    }
  };

  const onValid = (data: IDetailFormData) => {
    const requestBody = {
      detailInformation: data?.detailInformation,
    };

    if (window.confirm(MSG.CONFIRM_MSG.SAVE)) {
      axios
        .put(`${PROMOTION_BASIC_PATH}/api/company/detail`, requestBody)
        .then(() => {
          alert(MSG.ALERT_MSG.SAVE);
          setEditDetail(false);
          window.location.reload();
        })
        .catch((error) => console.error('Error updating company detail:', error));
    }
  };

  if (isLoading) return <SkeletonComponent width={'100vw'} height={'100vh'}/>;
  if (error) return <>{error.message}</>;

  return (
    <Wrapper data-cy='detail-wrapper'>
      <Form onSubmit={handleSubmit(onValid)}>
        <ContentBlock isFocused={true}>
          <TitleWrapper>
            {DATAEDIT_TITLES_COMPONENTS.Detail}
            <div style={{ display: 'flex', width: '290px', justifyContent: 'space-between' }}>
              <Button
                description='Add New Detail'
                svgComponent={<AddedIcon width={14} height={14} />}
                onClick={() => {
                  setIsEditing(true);
                  append({ key: '', value: '' });
                }}
              />
              <Button description={MSG.BUTTON_MSG.SAVE} fontSize={14} width={100} />
            </div>
          </TitleWrapper>

          <InputWrapper>
            <div>
              {fields.map((field, index) => (
                <DetailItem key={field.id}>
                  <DeleteIcon
                    data-cy={aboutPageAttributes.DELETE_DETAIL}
                    width={15}
                    height={15}
                    onClick={() => safeRemove(index)}
                  />
                  <Controller
                    name={`detailInformation.${index}.key`}
                    control={control}
                    defaultValue={field.key}
                    render={({ field }) => (
                      <DetailTitleInputWrapper>
                        <input
                          data-cy={aboutPageAttributes.DETAIL_KEY_INPUT}
                          {...register(`detailInformation.${index}.key`, {
                            required: MSG.PLACEHOLDER_MSG.DETAIL.TITLE,
                            maxLength: INPUT_MAX_LENGTH.DETAIL_TITLE,
                          })}
                          className='detail_title'
                          {...field}
                          placeholder={MSG.PLACEHOLDER_MSG.DETAIL.TITLE}
                          onChange={(e) => {
                            setIsEditing(true);
                            if (e.target.value.length <= INPUT_MAX_LENGTH.DETAIL_TITLE) {
                              field.onChange(e);
                            }
                          }}
                        />
                        <span>
                          {watchFields[index].key.length} / {INPUT_MAX_LENGTH.DETAIL_TITLE}자
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
                          data-cy={aboutPageAttributes.DETAIL_VALUE_INPUT}
                          {...register(`detailInformation.${index}.value`, {
                            required: MSG.PLACEHOLDER_MSG.DETAIL.CONTENT,
                            maxLength: INPUT_MAX_LENGTH.DETAIL_CONTENT,
                          })}
                          className='detail_content'
                          {...field}
                          placeholder={MSG.PLACEHOLDER_MSG.DETAIL.CONTENT}
                          onChange={(e) => {
                            setIsEditing(true);
                            if (e.target.value.length <= INPUT_MAX_LENGTH.DETAIL_CONTENT) {
                              field.onChange(e);
                            }
                          }}
                        />
                        <span>
                          {watchFields[index].value.length} / {INPUT_MAX_LENGTH.DETAIL_CONTENT}자
                        </span>
                      </DetailContentWrapper>
                    )}
                  />
                </DetailItem>
              ))}
            </div>
          </InputWrapper>
        </ContentBlock>
      </Form>
    </Wrapper>
  );
};

export default Detail;

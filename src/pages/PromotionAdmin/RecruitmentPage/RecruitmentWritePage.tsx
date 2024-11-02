import React from 'react';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { postRecruitment } from '@/apis/PromotionAdmin/recruitment';
import { ContentBox } from '@/components/PromotionAdmin/Recruitment/Components';
import { PA_ROUTES } from '@/constants/routerConstants';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { dataUpdateState } from '@/recoil/atoms';
import { MSG } from '@/constants/messages';

function RecruitmentWritePage() {
  const setIsEditing = useSetRecoilState(dataUpdateState);
  const isEditing = useRecoilValue(dataUpdateState);
  const navigator = useNavigate();
  const [putData, setPutData] = useState({
    title: '',
    startDate: '',
    deadline: '',
    link: '',
  });
  const titleLength = putData.title.length;
  const maxTitleLength = 50;

  type RecruitmentFormData = {
    title: string;
    startDate: string;
    deadline: string;
    link: string;
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<RecruitmentFormData>({
    defaultValues: {
      title: '',
      startDate: '',
      deadline: '',
      link: '',
    },
  });

  useEffect(() => {
    if (isEditing) {
      const handleBeforeUnload = (event: any) => {
        const message = MSG.CONFIRM_MSG.EXIT;
        event.returnValue = message;
        return message;
      };
      window.addEventListener('beforeunload', handleBeforeUnload);
      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
      };
    }
  }, [isEditing]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsEditing(true);
    const { name, value } = e.target;
    if (/^\s|[~!@#$%^&*(),.?":{}|<>]/.test(value.charAt(0))) {
      return;
    }
    if (name === 'title' && value.length > 50) {
      return;
    }
    setPutData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setValue(name as keyof RecruitmentFormData, value);
  };

  const onValid = async (data: RecruitmentFormData) => {
    const formData = {
      title: data.title,
      startDate: data.startDate,
      deadline: data.deadline,
      link: data.link,
    };

    if (
      !(data.title === '' || data.link === '' || data.startDate === '' || data.deadline === '') &&
      window.confirm('등록하시겠습니까?')
    ) {
      try {
        const response = await postRecruitment(formData);
        alert('채용공고가 등록되었습니다.');
        console.log(response);
        setIsEditing(false);
        navigator(`${PA_ROUTES.RECRUITMENT}/manage`, { replace: true });
      } catch (error) {
        console.log(error);
        alert('채용공고 등록 중 오류가 발생했습니다.');
      }
    }
  };

  return (
    <form noValidate onSubmit={handleSubmit(onValid)}>
      <ContentBox>
        <TitleWrapper>
          <Title>채용 공고 등록</Title>
        </TitleWrapper>
        <InputWrapper>
          <InputTitle style={{ justifyContent: 'space-between' }}>
            <p>제목</p>
            <div
              style={{
                fontSize: 12,
                paddingTop: 10,
              }}
            >
              {titleLength}/{maxTitleLength}
            </div>
          </InputTitle>
          <input
            {...register('title', {
              required: '제목 입력해주세요. (50 내로 작성해 주세요.)',
            })}
            name='title'
            value={putData.title || ''}
            onChange={handleChange}
            maxLength={50}
            placeholder='제목을 입력해주세요. (50자 내로 작성해 주세요.)'
          />
          {errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage>}
          <InputTitle>
            <p>채용 공고 링크</p>
            <div
              style={{
                fontSize: 12,
                paddingTop: 10,
              }}
            ></div>
          </InputTitle>
          <input
            {...register('link', {
              required: '채용 공고 링크를 입력해주세요.',
              validate: {
                startsWithHttp: (value) =>
                  value.startsWith('http://') ||
                  value.startsWith('https://') ||
                  '링크는 http:// 또는 https://로 시작해야 합니다.',
              },
            })}
            name='link'
            value={putData.link || ''}
            onChange={handleChange}
            maxLength={250}
            placeholder='채용 공고 링크를 입력해주세요.'
          />
          {errors.link && <ErrorMessage>{errors.link.message}</ErrorMessage>}
          <RowWrapper style={{ justifyContent: 'space-between', width: '95%' }}>
            <div style={{ width: '45%' }}>
              <InputTitle>
                <p>접수 시작일</p>
                <div
                  style={{
                    fontSize: 12,
                    paddingTop: 10,
                  }}
                ></div>
              </InputTitle>
              <input
                style={{ width: '100%', cursor: 'pointer', userSelect: 'none' }}
                type='date'
                placeholder='Date'
                {...register('startDate', {
                  required: '접수 시작일을 입력해주세요.',
                })}
                name='startDate'
                onKeyDown={(e) => e.preventDefault()}
                onMouseDown={(e) => e.preventDefault()}
                onClick={(e) => {
                  e.currentTarget.showPicker();
                }}
                onChange={handleChange}
                value={putData.startDate}
              />
              <ErrorMessage>{errors.startDate ? errors.startDate.message : ''}</ErrorMessage>
            </div>

            <div style={{ width: '45%' }}>
              <InputTitle>
                <p>접수 마감일</p>
                <div
                  style={{
                    fontSize: 12,
                    paddingTop: 10,
                  }}
                ></div>
              </InputTitle>
              <input
                style={{ width: '100%', cursor: 'pointer' }}
                type='date'
                {...register('deadline', {
                  required: '접수 마감일을 입력해주세요.',
                  validate: {
                    isValidEndDate: (value) => {
                      const startInputValue = (document.querySelector('input[name="startDate"]') as HTMLInputElement)
                        ?.value;
                      const startInput = startInputValue ? new Date(startInputValue) : null;
                      const endDate = new Date(value);

                      return (startInput && endDate >= startInput) || '마감일은 시작일 이후여야 합니다.';
                    },
                  },
                })}
                name='deadline'
                onKeyDown={(e) => e.preventDefault()}
                onMouseDown={(e) => e.preventDefault()}
                onClick={(e) => {
                  e.currentTarget.showPicker();
                }}
                onChange={handleChange}
                value={putData.deadline}
              />
              <ErrorMessage>{errors.deadline ? errors.deadline.message : ' '}</ErrorMessage>
            </div>
          </RowWrapper>
        </InputWrapper>
        <RowWrapper>
          <PostButton>등록하기</PostButton>
        </RowWrapper>
      </ContentBox>
    </form>
  );
}

export default RecruitmentWritePage;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10px;
  margin-bottom: 10px;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  align-content: center;

  svg {
    cursor: pointer;
    margin-right: 10px;
  }
  font-family: ${(props) => props.theme.font.bold};
  font-size: 25px;
`;

const InputWrapper = styled.div`
  display: flex;
  background-color: ${(props) => props.theme.color.white.bold};
  flex-direction: column;
  font-family: ${(props) => props.theme.font.semiBold};
  p {
    font-size: 18px;
    padding-top: 7px;
    padding-bottom: 3px;
    margin-bottom: 10px;
  }
  input {
    outline: none;
    font-family: ${(props) => props.theme.font.regular};
    font-size: 14px;
    padding: 10px;
    width: 95%;
    height: 30px;
    border: none;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  }
  input:focus {
    transition: 0.2s;
    border-bottom: 3px solid ${(props) => props.theme.color.symbol};
  }
`;

const InputTitle = styled.div`
  display: flex;
  padding-top: 20px;
  align-items: center;
  height: 40px;
  width: 95%;
  svg {
    cursor: pointer;
    margin-right: 10px;
  }
`;

const RowWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
  width: 100%;
  margin-top: 20px;
`;

const PostButton = styled.button`
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 6vw;
  height: 40px;
  margin-right: 20px;
  font-size: 15px;
  font-family: ${(props) => props.theme.font.medium};
  box-shadow: 1px 1px 4px 0.1px #c6c6c6;
  background-color: ${(props) => props.theme.color.white.bold};
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background-color: ${(props) => props.theme.color.yellow.light};
  }
`;

const ErrorMessage = styled.div`
  font-family: ${(props) => props.theme.font.light};
  margin-top: 10px;
  margin-left: 10px;
  font-size: 13px;
  height: 16px;
`;

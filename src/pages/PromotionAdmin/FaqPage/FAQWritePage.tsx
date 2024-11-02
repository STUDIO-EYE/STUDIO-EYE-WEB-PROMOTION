import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { theme } from '@/styles/theme';
import { ContentBox } from '@/components/PromotionAdmin/FAQ/Components';
import { postFAQ } from '@/apis/PromotionAdmin/faq';
import { IFAQ } from '../../../types/PromotionAdmin/faq';
import { PA_ROUTES } from '@/constants/routerConstants';
import { PROMOTION_BASIC_PATH } from '@/constants/basicPathConstants';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { dataUpdateState } from '@/recoil/atoms';
import { MSG } from '@/constants/messages';

function FAQWritePage() {
  const setIsEditing = useSetRecoilState(dataUpdateState);
  const isEditing = useRecoilValue(dataUpdateState);
  const navigator = useNavigate();
  const [putData, setPutData] = useState({
    question: '',
    answer: '',
  });
  const questionLength = putData.question.length;
  const answerLength = putData.answer.length;
  const maxQuestionLength = 200;
  const maxAnswerLength = 1500;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<IFAQ>({
    defaultValues: {
      question: '',
      answer: '',
      visibility: true,
    },
  });

  const visibility = watch('visibility');

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    setIsEditing(true);
    const { name, value } = e.target;
    if (/^\s|[~!@#$%^&*(),.?":{}|<>]/.test(value.charAt(0))) {
      return;
    }

    setPutData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleChangeVisibility = (value: boolean) => {
    setValue('visibility', value);
  };

  const onValid = async (data: IFAQ) => {
    const formData = {
      question: data.question,
      answer: data.answer,
      visibility: data.visibility,
    };

    if (!(data.question === '' || data.answer === '') && window.confirm('등록하시겠습니까?')) {
      try {
        const response = await postFAQ(formData);
        alert('FAQ가 등록되었습니다.');
        console.log(response);
        setIsEditing(false);
        navigator(`${PA_ROUTES.FAQ}`);
      } catch (error) {
        console.log(error);
        alert('FAQ 등록 중 오류가 발생했습니다.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onValid)} data-testid="faq-write-form">
      <ContentBox>
        <TitleWrapper>
          <Title data-testid="faq-write-title">FAQ 게시글 등록</Title>
        </TitleWrapper>
        <InputWrapper>
          <InputTitle style={{ justifyContent: 'space-between' }}>
            <p data-testid="faq-question-label">Question</p>
            <div
              style={{
                fontSize: 12,
                paddingTop: 10,
              }}
            >
              {questionLength}/{maxQuestionLength}
            </div>
          </InputTitle>
          <input
            {...register('question', {
              required: 'Question을 입력해주세요. (200자 내로 작성해 주세요.)',
            })}
            name='question'
            value={putData.question}
            onChange={handleChange}
            maxLength={200}
            placeholder='Question을 입력해주세요. (200자 내로 작성해 주세요.)'
            data-testid="faq-question-input"
          />
          {errors.question && <ErrorMessage data-testid="faq-question-error">{errors.question.message}</ErrorMessage>}
          <InputTitle style={{ justifyContent: 'space-between' }}>
            <p data-testid="faq-answer-label">Answer</p>
            <div
              style={{
                fontSize: 12,
                paddingTop: 10,
              }}
            >
              {answerLength}/{maxAnswerLength}
            </div>
          </InputTitle>
          <textarea
            {...register('answer', {
              required: 'Answer를 입력해주세요. (1500자 내로 작성해 주세요.)',
            })}
            name='answer'
            value={putData.answer}
            onChange={handleChange}
            maxLength={1500}
            placeholder='Answer를 입력해주세요. (1500자 내로 작성해 주세요.)'
            data-testid="faq-answer-input"
          />
          {errors.answer && <ErrorMessage data-testid="faq-answer-error">{errors.answer.message}</ErrorMessage>}
        </InputWrapper>
        <RowWrapper>
          {putData && (
            <VisibilityWrapper>
              <CheckBox onClick={() => handleChangeVisibility(true)} className='public' selected={visibility} data-testid="faq-visibility-public">
                공개
              </CheckBox>
              <CheckBox onClick={() => handleChangeVisibility(false)} className='private' selected={!visibility} data-testid="faq-visibility-private">
                비공개
              </CheckBox>
            </VisibilityWrapper>
          )}
          <ButtonWrapper>
            <ModifyButton data-testid="faq-submit-button">등록하기</ModifyButton>
          </ButtonWrapper>
        </RowWrapper>
      </ContentBox>
    </form>
  );
}

export default FAQWritePage;

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
  background-color: ${(props) => props.theme.color.white.light};
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
  textarea {
    outline: none;
    font-family: ${(props) => props.theme.font.regular};
    font-size: 14px;
    padding: 10px;
    width: 95%;
    min-height: 450px;
    border: none;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    resize: none;
  }
  textarea:focus {
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
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
`;

const VisibilityWrapper = styled.div`
  display: flex;
  margin-top: 20px;
`;

const CheckBox = styled.div<{ selected: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  width: 6vw;
  height: 40px;
  font-size: 15px;
  font-family: ${(props) => props.theme.font.medium};
  box-shadow: 1px 1px 4px 0.1px #c6c6c6;
  background-color: ${(props) => (props.selected ? theme.color.yellow.light : 'none')};
  cursor: pointer;
`;

const ButtonWrapper = styled.div`
  display: flex;
  margin-top: 20px;
`;

const ModifyButton = styled.button`
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
`;

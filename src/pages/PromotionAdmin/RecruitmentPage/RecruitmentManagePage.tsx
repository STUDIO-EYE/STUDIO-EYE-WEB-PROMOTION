import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import { IRecruitmentList, IRecruitment } from '@/types/PromotionAdmin/recruitment';
import {
  getAllRecruitmentData,
  getRecruitmentData,
  updateRecruitmentData,
  deleteRecruitmentData,
} from '../../../apis/PromotionAdmin/recruitment';
import { useState, useEffect } from 'react';
import { theme } from '@/styles/theme';
import { useForm } from 'react-hook-form';
import { PA_ROUTES } from '@/constants/routerConstants';
import Pagination from '@/components/Pagination/Pagination';
import { ContentBox } from '@/components/PromotionAdmin/FAQ/Components';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { dataUpdateState } from '@/recoil/atoms';
import { ReactComponent as AddedIcon } from '@/assets/images/PA/plusIcon.svg';
import { ReactComponent as DeleteIcon } from '@/assets/images/PA/minusIcon.svg';
import { DATAEDIT_TITLES_COMPONENTS } from '../../../components/PromotionAdmin/DataEdit/Company/StyleComponents';
import { MSG } from '@/constants/messages';

function RecruitmentManagePage() {
  const setIsEditing = useSetRecoilState(dataUpdateState);
  const isEditing = useRecoilValue(dataUpdateState);
  const navigator = useNavigate();
  const { data, isLoading, refetch, error } = useQuery<IRecruitmentList, Error>(
    ['recruitment', 'list'], // 'faq', 'id' 대신 적절한 queryKey를 사용
    getAllRecruitmentData,
  );
  const [slicedFAQ, setSlicedFAQ] = useState<IFAQ[]>([]);
  const [currentFAQ, setCurrentFAQ] = useState<IFAQ | null>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [FAQsPerPage] = useState(10);
  const [isSelected, setIsSelected] = useState(false);
  const [questionLength, setQuestionLength] = useState<number>(0);
  const [answerLength, setAnswerLength] = useState<number>(0);
  const maxQuestionLength = 200;
  const maxAnswerLength = 1500;

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    if (data) {
      const indexOfLast = currentPage * FAQsPerPage;
      const indexOfFirst = indexOfLast - FAQsPerPage;
      const sliced = data.slice(indexOfFirst, indexOfLast);
      setSlicedFAQ(sliced);

      if (sliced.length === 0 && currentPage > 1) {
        setCurrentPage((prevPage) => prevPage - 1);
        navigator(`?page=${currentPage - 1}`);
      }

      if (currentPage >= 1 && sliced.length > 0) {
        setCurrentFAQ(sliced[0]);
        setIsSelected(true);
        setQuestionLength(sliced[0].question.length);
        setAnswerLength(sliced[0].answer.length);
      }
    }
  }, [data, currentPage, FAQsPerPage, navigator]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IFAQ>({
    defaultValues: {
      question: currentFAQ?.question,
      answer: currentFAQ?.answer,
    },
  });

  useEffect(() => {
    if (currentFAQ) {
      setValue('question', currentFAQ.question);
      setValue('answer', currentFAQ.answer);
      setQuestionLength(currentFAQ.question.length);
      setAnswerLength(currentFAQ.answer.length);
    }
  }, [currentFAQ, setValue]);

  const handleDelete = (id: number) => {
    if (window.confirm('삭제하시겠습니까?')) {
      axios
        .delete(`${PROMOTION_BASIC_PATH}/api/faq/${id}`)
        .then((response) => {
          alert('FAQ가 삭제되었습니다.');
          console.log(response);
          refetch();
        })
        .catch((error) => {
          console.log(error);
          alert('FAQ 삭제 중 오류가 발생했습니다.');
        });
    }
  };

  const onValid = (data: IFAQ) => {
    const formData = {
      id: currentFAQ?.id,
      question: currentFAQ?.question,
      answer: currentFAQ?.answer,
      visibility: currentFAQ?.visibility,
    };
    if (!(data.question === '' || data.answer === '') && window.confirm('수정하시겠습니까?')) {
      axios
        .put(`${PROMOTION_BASIC_PATH}/api/faq`, formData)
        .then((response) => {
          alert('FAQ가 수정되었습니다.');
          console.log(response);
          setIsEditing(false);
        })
        .catch((error) => {
          console.log(error);
          alert('FAQ 수정 중 오류가 발생했습니다.');
        });
    }
  };

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setIsEditing(true);
    const { name, value } = e.target;
    if (/^\s/.test(value.charAt(0))) {
      return;
    }
    if (name === 'question') {
      setQuestionLength(value.length);
    }
    if (name === 'answer') {
      setAnswerLength(value.length);
    }
    setCurrentFAQ((prevFAQ) => (prevFAQ ? { ...prevFAQ, [name]: value } : null));
  };

  const handleSelectFAQ = (faq: IFAQ) => {
    if (isEditing && !(currentFAQ?.id === faq.id)) {
      handleConfirmNavigation(faq);
    } else if (isEditing && currentFAQ?.id === faq.id) {
      return;
    } else {
      setCurrentFAQ(faq);
      setIsSelected(true);
      setQuestionLength(faq.question.length);
      setAnswerLength(faq.answer.length);
    }
  };

  const handleConfirmNavigation = (faq: IFAQ) => {
    if (window.confirm('현재 페이지를 나가면 변경 사항이 저장되지 않습니다.\n나가시겠습니까?')) {
      setIsEditing(false);
      setCurrentFAQ(faq);
      setIsSelected(true);
      setQuestionLength(faq.question.length);
      setAnswerLength(faq.answer.length);
    } else {
      setIsEditing(true);
    }
  };

  const handleAddNewFAQ = () => {
    if (isEditing) {
      if (window.confirm('현재 페이지를 나가면 변경 사항이 저장되지 않습니다.\n나가시겠습니까?')) {
        setIsEditing(false);
        navigator(`${PA_ROUTES.RECRUITMENT}/write`);
      }
    } else {
      navigator(`${PA_ROUTES.RECRUITMENT}/write`);
    }
  };

  if (isLoading) return <>is Loading..</>;
  if (error) return <>{error.message}</>;
  return (
    <Wrapper>
      <LeftContentWrapper>
        <ContentBox>
          <TitleWrapper>
            <Title>
              {DATAEDIT_TITLES_COMPONENTS.FAQ}
              FAQ 게시글 관리
              <Info>등록된 게시글 {data?.length}건 </Info>
            </Title>
            <Button onClick={handleAddNewFAQ}>
              <div style={{ paddingRight: 10 }}>
                <AddedIcon />
              </div>
              Add New FAQ
            </Button>
          </TitleWrapper>
          <ListWrapper>
            {slicedFAQ?.map((faq) => (
              <FAQList key={faq.id}>
                <DeleteIcon width={15} height={15} onClick={() => handleDelete(faq.id)} />
                <FAQItem
                  key={faq.id}
                  isSelected={currentFAQ?.id === faq.id && isSelected}
                  onClick={() => {
                    handleSelectFAQ(faq);
                  }}
                >
                  <FAQQuestion>{faq.question}</FAQQuestion>
                  {faq.visibility ? <PublicIcon /> : <PrivateIcon />}
                </FAQItem>
              </FAQList>
            ))}
          </ListWrapper>
          {data && (
            <PaginationWrapper>
              <Pagination postsPerPage={FAQsPerPage} totalPosts={data.length} paginate={paginate} />
            </PaginationWrapper>
          )}
        </ContentBox>
      </LeftContentWrapper>

      <RightContentWrapper>
        <form onSubmit={handleSubmit(onValid)}>
          <ContentBox>
            <TitleWrapper>
              <Title>FAQ 게시글 수정</Title>
            </TitleWrapper>
            <InputWrapper>
              <InputTitle style={{ justifyContent: 'space-between' }}>
                <p>Question</p>
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
                value={currentFAQ?.question || ''}
                onChange={handleChange}
                maxLength={200}
                placeholder='Question을 입력해주세요. (200자 내로 작성해 주세요.)'
              />
              {errors.question && <ErrorMessage>{errors.question.message}</ErrorMessage>}
              <InputTitle style={{ justifyContent: 'space-between' }}>
                <p>Answer</p>
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
                value={currentFAQ?.answer || ''}
                onChange={handleChange}
                maxLength={1500}
                placeholder='Answer를 입력해주세요. (1500자 내로 작성해 주세요.)'
              />
              {errors.answer && <ErrorMessage>{errors.answer.message}</ErrorMessage>}
            </InputWrapper>
            <RowWrapper>
              {currentFAQ && (
                <VisibilityWrapper>
                  <CheckBox
                    onClick={() => {
                      setCurrentFAQ((prevFAQ) => (prevFAQ ? { ...prevFAQ, visibility: true } : null));
                    }}
                    className='public'
                    selected={currentFAQ?.visibility}
                  >
                    공개
                  </CheckBox>
                  <CheckBox
                    onClick={() => {
                      setCurrentFAQ((prevFAQ) => (prevFAQ ? { ...prevFAQ, visibility: false } : null));
                    }}
                    className='private'
                    selected={!currentFAQ?.visibility}
                  >
                    비공개
                  </CheckBox>
                </VisibilityWrapper>
              )}
              <ButtonWrapper>
                <ModifyButton>수정하기</ModifyButton>
              </ButtonWrapper>
            </RowWrapper>
          </ContentBox>
        </form>
      </RightContentWrapper>
    </Wrapper>
  );
}
export default RecruitmentManagePage;

const Wrapper = styled.div`
  display: flex;
`;

const LeftContentWrapper = styled.div``;
const RightContentWrapper = styled.div``;

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

const Info = styled.div`
  display: flex;
  align-items: end;
  padding-left: 14px;
  font-size: 14px;
  font-family: ${(props) => props.theme.font.medium};
  color: gray;
`;

const Button = styled.button`
  display: flex;
  cursor: pointer;
  border: none;
  background-color: ${(props) => props.theme.color.white.bold};
  box-shadow: 1px 1px 4px 0.5px #c6c6c6;
  padding: 10px;
  /* margin-bottom: 10px; */
  border-radius: 0.2rem;
  transition: 0.2s;
  font-family: ${(props) => props.theme.font.medium};
  font-size: 15px;

  &:hover {
    background-color: ${(props) => props.theme.color.yellow.light}; /* 버튼 호버 시 색상 조정 */
  }
`;

const ListWrapper = styled.div`
  margin-top: 20px;
`;

const FAQList = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 5px 0px;
  margin-bottom: 10px;

  svg {
    cursor: pointer;
  }
`;

const FAQItem = styled.div<{ isSelected: boolean }>`
  display: flex;
  position: relative;
  border: none;
  box-shadow: 1px 1px 4px 0.1px ${(props) => props.theme.color.black.pale};
  border-radius: 4px;
  background-color: ${(props) => (props.isSelected ? props.theme.color.yellow.light : props.theme.color.white.bold)};
  width: 90%;
  padding: 15px 10px;
  justify-content: space-between;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.color.yellow.light};
  }
`;

const FAQQuestion = styled.div`
  font-family: ${(props) => props.theme.font.semiBold};
  font-size: 16px;
  flex: 1;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
const PaginationWrapper = styled.div`
  margin-top: 30px;
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

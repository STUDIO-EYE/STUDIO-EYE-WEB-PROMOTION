import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import { IContent, IRecruitmentList, IRecruitment } from '@/types/PromotionAdmin/recruitment';
import {
  getAllRecruitmentData,
  getRecruitmentData,
  updateRecruitmentData,
  deleteRecruitmentData,
} from '../../../apis/PromotionAdmin/recruitment';
import { useState, useEffect } from 'react';
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
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [RecruitmentsPerPage] = useState(10);
  const { data, isLoading, error, refetch } = useQuery<IRecruitmentList, Error>(
    ['recruitmentList', currentPage],
    () => getAllRecruitmentData(currentPage, RecruitmentsPerPage),
    { keepPreviousData: true },
  );
  const [slicedRecruitment, setSlicedRecruitment] = useState<IContent[]>([]);
  const [currentRecruitment, setCurrentRecruitment] = useState<IRecruitment | null>();
  const [isSelected, setIsSelected] = useState(false);
  const [titleLength, setTitleLength] = useState<number>(0);
  const [contentLength, setContentLength] = useState<number>(0);
  const maxTitleLength = 200;
  const maxContentLength = 1500;

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // useEffect(() => {
  //   if (data) {
  //     const indexOfLast = currentPage * RecruitmentsPerPage;
  //     const indexOfFirst = indexOfLast - RecruitmentsPerPage;
  //     const sliced = data.content.slice(indexOfFirst, indexOfLast);
  //     setSlicedRecruitment(sliced);

  //     if (sliced.length === 0 && currentPage > 1) {
  //       setCurrentPage((prevPage) => prevPage - 1);
  //       navigator(`?page=${currentPage - 1}`);
  //     }

  //     if (currentPage >= 1 && sliced.length > 0) {
  //       setCurrentRecruitment(sliced[0]);
  //       setIsSelected(true);
  //       setTitleLength(sliced[0].title.length);
  //     }
  //   }
  // }, [data, currentPage, RecruitmentsPerPage, navigator]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IRecruitment>({
    defaultValues: {
      title: currentRecruitment?.title,
      content: currentRecruitment?.content,
    },
  });

  useEffect(() => {
    if (currentRecruitment) {
      setValue('title', currentRecruitment.title);
      setValue('content', currentRecruitment.content);
      setTitleLength(currentRecruitment.title.length);
      setContentLength(currentRecruitment.content.length);
    }
  }, [currentRecruitment, setValue]);

  const handleDelete = async (id: number) => {
    if (window.confirm('삭제하시겠습니까?')) {
      try {
        const response = await deleteRecruitmentData(id); // deleteRecruitmentData 함수 호출
        alert('FAQ가 삭제되었습니다.');
        console.log(response);
        refetch(); // 데이터 새로고침
      } catch (error) {
        console.log(error);
        alert('FAQ 삭제 중 오류가 발생했습니다.');
      }
    }
  };

  // const onValid = async (data: IRecruitment) => {
  //   const formData = {
  //     id: currentRecruitment?.id,
  //     title: currentRecruitment?.title,
  //     content: currentRecruitment?.content,
  //   };

  //   if (!(data.title === '' || data.content === '') && window.confirm('수정하시겠습니까?')) {
  //     try {
  //       const response = await updateRecruitmentData(formData); // updateRecruitmentData 함수 호출
  //       alert('FAQ가 수정되었습니다.');
  //       console.log(response);
  //       setIsEditing(false);
  //     } catch (error) {
  //       console.log(error);
  //       alert('FAQ 수정 중 오류가 발생했습니다.');
  //     }
  //   }
  // };

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
    if (name === 'title') {
      setTitleLength(value.length);
    }
    if (name === 'answer') {
      setContentLength(value.length);
    }
    setCurrentRecruitment((prevFAQ) => (prevFAQ ? { ...prevFAQ, [name]: value } : null));
  };

  const fetchRecruitmentData = async (id: number) => {
    try {
      const data = await getRecruitmentData(id);
      setCurrentRecruitment(data); // 선택된 공고 데이터 저장
    } catch (error) {
      console.log('Error fetching recruitment data:', error);
    }
  };

  // const handleConfirmNavigation = (recruitment: IRecruitment) => {
  //   if (window.confirm('현재 페이지를 나가면 변경 사항이 저장되지 않습니다.\n나가시겠습니까?')) {
  //     setIsEditing(false);
  //     setCurrentRecruitment(recruitment);
  //     setIsSelected(true);
  //     setTitleLength(recruitment.title.length);
  //     setContentLength(recruitment.content.length);
  //   } else {
  //     setIsEditing(true);
  //   }
  // };

  const handleAddNewRecruitment = () => {
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
              채용공고 관리
              <Info>등록된 게시글 {data?.totalElements}건 </Info>
            </Title>
            <Button onClick={handleAddNewRecruitment}>
              <div style={{ paddingRight: 10 }}>
                <AddedIcon />
              </div>
              Add New Recruitment
            </Button>
          </TitleWrapper>
          <ListWrapper>
            {slicedRecruitment?.map((recruitment) => (
              <FAQList key={recruitment.id}>
                <DeleteIcon width={15} height={15} onClick={() => handleDelete(recruitment.id)} />
                <FAQItem
                  key={recruitment.id}
                  isSelected={currentRecruitment?.id === recruitment.id && isSelected}
                  onClick={() => {
                    fetchRecruitmentData(recruitment.id);
                  }}
                >
                  <FAQQuestion>{recruitment.title}</FAQQuestion>
                </FAQItem>
              </FAQList>
            ))}
          </ListWrapper>
          {data && (
            <PaginationWrapper>
              <Pagination postsPerPage={RecruitmentsPerPage} totalPosts={data.totalPages} paginate={paginate} />
            </PaginationWrapper>
          )}
        </ContentBox>
      </LeftContentWrapper>

      {/* <RightContentWrapper>
        <form onSubmit={handleSubmit(onValid)}>
          <ContentBox>
            <TitleWrapper>
              <Title>FAQ 게시글 수정</Title>
            </TitleWrapper>
            <InputWrapper>
              <InputTitle style={{ justifyContent: 'space-between' }}>
                <p>Title</p>
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
                  required: 'Title을 입력해주세요. (200자 내로 작성해 주세요.)',
                })}
                name='title'
                value={currentRecruitment?.title || ''}
                onChange={handleChange}
                maxLength={200}
                placeholder='Title 입력해주세요. (200자 내로 작성해 주세요.)'
              />
              {errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage>}
              <InputTitle style={{ justifyContent: 'space-between' }}>
                <p>Answer</p>
                <div
                  style={{
                    fontSize: 12,
                    paddingTop: 10,
                  }}
                >
                  {contentLength}/{maxContentLength}
                </div>
              </InputTitle>
              <textarea
                {...register('content', {
                  required: 'Content 입력해주세요. (1500자 내로 작성해 주세요.)',
                })}
                name='content'
                value={currentRecruitment?.content || ''}
                onChange={handleChange}
                maxLength={1500}
                placeholder='Content 입력해주세요. (1500자 내로 작성해 주세요.)'
              />
              {errors.content && <ErrorMessage>{errors.content.message}</ErrorMessage>}
            </InputWrapper>
            <RowWrapper>
              <ModifyButton>수정하기</ModifyButton>
            </RowWrapper>
          </ContentBox>
        </form>
      </RightContentWrapper> */}
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

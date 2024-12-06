import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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
import { useForm } from 'react-hook-form';
import { PA_ROUTES } from '@/constants/routerConstants';
import Pagination from '@/components/Pagination/Pagination';
import { ContentBox } from '@/components/PromotionAdmin/Recruitment/Components';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { dataUpdateState } from '@/recoil/atoms';
import { ReactComponent as AddedIcon } from '@/assets/images/PA/plusIcon.svg';
import { ReactComponent as DeleteIcon } from '@/assets/images/PA/minusIcon.svg';
import { MSG } from '@/constants/messages';

function RecruitmentManagePage() {
  const setIsEditing = useSetRecoilState(dataUpdateState);
  const isEditing = useRecoilValue(dataUpdateState);
  const navigator = useNavigate();
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(1);
  const RecruitmentsPerPage = 10;

  const { data, isLoading, error, refetch, isFetching, isRefetching } = useQuery<IRecruitmentList, Error>(
    ['recruitmentList', currentPage],
    () => getAllRecruitmentData(currentPage, RecruitmentsPerPage),
    { keepPreviousData: true },
  );

  const [currentRecruitment, setCurrentRecruitment] = useState<IRecruitment | null>();
  const [isSelected, setIsSelected] = useState(false);
  const [titleLength, setTitleLength] = useState<number>(0);
  const maxTitleLength = 50;

  useEffect(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    if (!isFetching && !isRefetching && data && data.content.length === 0) {
      navigator(`${PA_ROUTES.RECRUITMENT}/manage`);
    }
  }, [data, navigator, isFetching, isRefetching]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const page = parseInt(queryParams.get('page') || '1', 10);
    setCurrentPage(page);
  }, [location]);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    navigator(`?page=${pageNumber}`);
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IRecruitment>({
    defaultValues: {
      title: currentRecruitment?.title,
      startDate: currentRecruitment?.startDate,
      deadline: currentRecruitment?.deadline,
      link: currentRecruitment?.link,
    },
  });

  useEffect(() => {
    if (currentRecruitment) {
      setValue('title', currentRecruitment.title);
      setValue('link', currentRecruitment.link);
      setValue('startDate', currentRecruitment.startDate);
      setValue('deadline', currentRecruitment.deadline);
      setTitleLength(currentRecruitment.title.length);
    }
  }, [currentRecruitment, setValue]);

  const handleDelete = async (id: number, totalPosts: number) => {
    if (window.confirm('삭제하시겠습니까?')) {
      try {
        const response = await deleteRecruitmentData(id);
        alert('채용공고가 삭제되었습니다.');
        await refetch();

        const updatedTotalPosts = totalPosts - 1;
        const currentPostsInPage = updatedTotalPosts - (currentPage - 1) * 10;
        if (currentPostsInPage === 0) {
          paginate(currentPage - 1);
        }

        setCurrentRecruitment(null);
      } catch (error) {
        alert('채용공고 삭제 중 오류가 발생했습니다.');
      }
    }
  };

  const fetchRecruitmentData = async (id: number) => {
    if (isEditing) {
      const confirmMove = window.confirm('수정중인 내용이 저장되지 않습니다.\n이동하시겠습니까?');
      setIsEditing(false);
      if (!confirmMove) {
        setIsEditing(true);
        return;
      }
    }
    const recruitment = await getRecruitmentData(id);
    const formattedRecruitment = {
      ...recruitment,
      startDate: recruitment.startDate.split('T')[0],
      deadline: recruitment.deadline.split('T')[0],
    };
    setCurrentRecruitment(formattedRecruitment);
    setTitleLength(recruitment.title.length);
    setIsSelected(true);
  };

  const onValid = async (data: IRecruitment) => {
    if (!currentRecruitment) {
      alert('수정할 공고가 선택되지 않았습니다.');
      return;
    }

    const formData = {
      id: currentRecruitment.id,
      title: data.title,
      link: data.link,
      startDate: data.startDate,
      deadline: data.deadline,
    };

    if (
      !(data.title === '' || data.link === '' || data.startDate === '' || data.deadline === '') &&
      window.confirm('수정하시겠습니까?')
    ) {
      try {
        const response = await updateRecruitmentData(formData);
        alert('채용공고가 수정되었습니다.');
        setIsEditing(false);
        refetch();
      } catch (error) {
        alert('채용공고 수정 중 오류가 발생했습니다.');
      }
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsEditing(true);
    const { name, value } = e.target;
    if (/^\s/.test(value.charAt(0))) {
      return;
    }
    if (name === 'title' && value.length > 50) {
      return;
    }
    if (name === 'title') {
      setTitleLength(value.length);
    }
    setCurrentRecruitment((prevRecruitment) => (prevRecruitment ? { ...prevRecruitment, [name]: value } : null));
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
        navigator(`${PA_ROUTES.RECRUITMENT}/manage`);
      }
    } else {
      navigator(`${PA_ROUTES.RECRUITMENT}/write`);
    }
  };

  if (isLoading) return <>Loading...</>;
  if (error) return <>{error.message}</>;

  return (
    <Wrapper>
      <LeftContentWrapper>
        <ContentBox>
          <TitleWrapper>
            <Title>
              채용 공고 관리
              <Info>등록된 공고 {data?.totalElements}건 </Info>
            </Title>
            <Button onClick={handleAddNewRecruitment}>
              <div style={{ paddingRight: 10 }}>
                <AddedIcon />
              </div>
              새로운 공고
            </Button>
          </TitleWrapper>
          <ListWrapper>
  {data?.content && data.content.length > 0 ? (
    data.content.map((recruitment) => (
      <RecruimentList key={recruitment.id} data-cy="recruitment-list-item">
        <DeleteIcon
          data-cy="delete-button"
          width={15}
          height={15}
          onClick={() => handleDelete(recruitment.id, data.totalElements)}
        />
        <RecruimentItem
          isSelected={currentRecruitment?.id === recruitment.id && isSelected}
          onClick={() => {
            fetchRecruitmentData(recruitment.id);
          }}
        >
          <RecruimentTitle data-cy="posted-recruitment-title">
            {recruitment.title}
          </RecruimentTitle>
        </RecruimentItem>
        <RecruimentStatus
          isDeadline={recruitment.status === "CLOSE"}
          isPreparing={recruitment.status === "PREPARING"}
        >
          {recruitment.status === "CLOSE"
            ? "마감"
            : recruitment.status === "OPEN"
            ? "진행"
            : "예정"}
        </RecruimentStatus>
      </RecruimentList>
    ))
  ) : (
    <NoDataMessage>😊 채용공고 데이터가 존재하지 않습니다.</NoDataMessage>
  )}
</ListWrapper>


          {data && (
            <PaginationWrapper>
              <Pagination postsPerPage={RecruitmentsPerPage} totalPosts={data.totalElements} paginate={paginate} />
            </PaginationWrapper>
          )}
        </ContentBox>
      </LeftContentWrapper>

      <RightContentWrapper>
        {currentRecruitment ? (
          <form noValidate onSubmit={handleSubmit(onValid)}>
            <ContentBox>
              <TitleWrapper>
                <Title>채용 공고 수정</Title>
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
                    required: '제목 입력해주세요. (50자 내로 작성해 주세요.)',
                  })}
                  name='title'
                  data-cy='recruitment-title'
                  value={currentRecruitment?.title || ''}
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
                  data-cy='recruitment-link'
                  value={currentRecruitment?.link || ''}
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
                      data-cy='recruitment-startDate'
                      onKeyDown={(e) => {
                        if (typeof Cypress === 'undefined') e.preventDefault();
                      }}
                      onMouseDown={(e) => {
                        if (typeof Cypress === 'undefined') e.preventDefault();
                      }}
                      onClick={(e) => {
                        if (typeof Cypress === 'undefined') e.currentTarget.showPicker();
                      }}
                      onChange={handleChange}
                      value={currentRecruitment?.startDate}
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
                            const startInputValue = (
                              document.querySelector('input[name="startDate"]') as HTMLInputElement
                            )?.value;
                            const startInput = startInputValue ? new Date(startInputValue) : null;
                            const endDate = new Date(value);

                            return (startInput && endDate >= startInput) || '마감일은 시작일 이후여야 합니다.';
                          },
                        },
                      })}
                      name='deadline'
                      data-cy='recruitment-deadline'
                      onKeyDown={(e) => {
                        if (typeof Cypress === 'undefined') e.preventDefault();
                      }}
                      onMouseDown={(e) => {
                        if (typeof Cypress === 'undefined') e.preventDefault();
                      }}
                      onClick={(e) => {
                        if (typeof Cypress === 'undefined') e.currentTarget.showPicker();
                      }}
                      onChange={handleChange}
                      value={currentRecruitment.deadline}
                    />
                    <ErrorMessage>{errors.deadline ? errors.deadline.message : ' '}</ErrorMessage>
                  </div>
                </RowWrapper>
              </InputWrapper>
              <RowWrapper>
                <ModifyButton data-cy='recruitment-update-button'>수정하기</ModifyButton>
              </RowWrapper>
            </ContentBox>
          </form>
        ) : (
          <div></div>
        )}
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
  background-color: ${(props) => props.theme.color.white.bold};
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

const RecruimentList = styled.div`
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

const RecruimentItem = styled.div<{ isSelected: boolean }>`
  display: flex;
  position: relative;
  border: none;
  box-shadow: 1px 1px 4px 0.1px ${(props) => props.theme.color.black.pale};
  border-radius: 4px;
  background-color: ${(props) => (props.isSelected ? props.theme.color.yellow.light : props.theme.color.white.bold)};
  width: 80%;
  padding: 15px 10px;
  margin-right: 15px;
  margin-left: 15px;
  justify-content: space-between;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.color.yellow.light};
  }
`;

const RecruimentTitle = styled.div`
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

const RecruimentStatus = styled.div<{ isDeadline: boolean; isPreparing: boolean }>`
  display: flex;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  position: relative;
  border: none;
  box-shadow: 1px 1px 4px 0.1px ${(props) => props.theme.color.black.pale};
  border-radius: 10%;
  padding: 15px 10px;
  background-color: ${(props) => {
    if (props.isDeadline) {
      return props.theme.color.white.light;
    } else if (props.isPreparing) {
      return props.theme.color.yellow.light;
    } else {
      return props.theme.color.yellow.bold;
    }
  }};

  color: ${(props) => {
    if (props.isDeadline) {
      return props.theme.color.black.light;
    } else if (props.isPreparing) {
      return props.theme.color.black.bold;
    } else {
      return props.theme.color.white.bold;
    }
  }};
  font-family: ${(props) => props.theme.font.semiBold};
  justify-content: center;
  cursor: default;
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
  height: 16px;
`;

const NoDataMessage = styled.div`
  padding: 20px;
  font-size: 1rem;
  color: ${({ theme }) => theme.color.gray};
`;


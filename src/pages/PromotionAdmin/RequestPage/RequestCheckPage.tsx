import React, { useEffect, useState } from 'react';
import { useMatch, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getRequestsData } from '@/apis/PromotionAdmin/request';
import { PA_ROUTES } from '@/constants/routerConstants';
import { useQuery } from 'react-query';
import styled, { keyframes } from 'styled-components';
import { IRequestData } from '../../../types/PromotionAdmin/request';
import draftToHtml from 'draftjs-to-html';
import { ContentState, EditorState, convertToRaw } from 'draft-js';
import Tooltip from '@/components/PromotionAdmin/DataEdit/StyleComponents/Tooltip';
import { ReactComponent as InfoIcon } from '@/assets/images/PA/infoIcon.svg';
import Pagination from '@/components/Pagination/Pagination';
import UserInfo from '@/components/PromotionAdmin/Request/UserInfo';
import EmailListComponent from '@/components/PromotionAdmin/Request/EmailListComponent';
import { PROMOTION_BASIC_PATH } from '@/constants/basicPathConstants';

const MAX_TEXT_LENGTH = 255;

const RequestDetailPage = () => {
  // pagination 구현에 사용되는 변수
  const { data, isLoading } = useQuery<IRequestData>(['request', 'id'], getRequestsData);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [postsPerPage, setPostsPerPage] = useState<number>(10);
  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  const [requestData, setData] = useState<IRequestData | null>(null);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const fetchData = async () => {
    try {
      const newData = await getRequestsData();
      setData(newData); // 데이터 상태 업데이트
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, postsPerPage]);

  //

  const navigator = useNavigate();
  const requestDetailMatch = useMatch(`${PA_ROUTES.REQUEST}/:requestId`);

  const clickedRequest =
    requestDetailMatch?.params.requestId &&
    data &&
    data.find((request: { id: number }) => String(request.id) === requestDetailMatch.params.requestId);

  const [editorState, setEditorState] = useState(() => {
    return EditorState.createEmpty();
  });
  const [replyState, setReplyState] = useState('WAITING');
  const [textValue, setTextValue] = useState('');
  const [textLength, setTextLength] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newTextValue = e.target.value;
    setTextValue(newTextValue);
    setTextLength(newTextValue.length);

    const contentState = ContentState.createFromText(newTextValue);
    const newEditorState = EditorState.createWithContent(contentState);
    setEditorState(newEditorState);
  };

  const createDefaultContent = (state: string) => {
    switch (state) {
      case 'DISCUSSING':
        return '논의 중입니다.';
      case 'APPROVED':
        return '승인되었습니다.';
      case 'REJECTED':
        return '거절되었습니다.';
      default:
        return '';
    }
  };

  useEffect(() => {
    const content = createDefaultContent(replyState);
    const contentState = ContentState.createFromText(content);
    const newEditorState = EditorState.createWithContent(contentState);
    setEditorState(newEditorState);
  }, [replyState]);

  const replyRequest = (state: string) => {
    if (state === 'WAITING') {
      alert('답변한 메일을 대기 중으로 둘 수 없습니다.');
      return;
    }

    if (!clickedRequest) {
      return;
    }

    const answerText = draftToHtml(convertToRaw(editorState.getCurrentContent())).replace(/<[^>]*>/g, '');

    if (!answerText.trim()) {
      alert('내용을 입력하세요.');
      return;
    }

    const formData = {
      answer: answerText,
      state: state,
    };

    if (window.confirm('답변 메일을 보내시겠습니까?')) {
      setLoading(true);
      axios
        .put(`${PROMOTION_BASIC_PATH}/api/requests/${clickedRequest.id}/comment`, formData)
        .then((response) => {
          setLoading(false);

          if (response.status === 200) {
            alert('메일 발송이 완료되었습니다.');
            setReplyState(replyState);
            setTextValue('');
            setEditorState(EditorState.createEmpty());
            const updatedEmailItems = emailItems.map((email: any) => ({
              ...email,
              state: state.toUpperCase(),
            }));
            emailItems(updatedEmailItems);
            navigator(`${PA_ROUTES.REQUEST}/:requestId`);
            setTextValue('');
          }
        })
        .catch((error) => {
          setLoading(false);
          console.log(error);
        });
    } else {
      return;
    }
  };

  const emailItems =
    clickedRequest && clickedRequest.answers
      ? clickedRequest.answers.map((answer: { id: number; createdAt: string; text: string; state: string }) => {
        const createdAtDate = new Date(answer.createdAt);
        const formattedDate = `${createdAtDate.getFullYear()}-${String(createdAtDate.getMonth() + 1).padStart(
          2,
          '0',
        )}-${String(createdAtDate.getDate()).padStart(2, '0')} ${String(createdAtDate.getHours()).padStart(
          2,
          '0',
        )}:${String(createdAtDate.getMinutes()).padStart(2, '0')}`;

        return {
          id: answer.id,
          subject: answer.text,
          date: formattedDate,
          content: answer.text,
          state: answer.state,
        };
      })
      : [];

  const emailItemsSliced = emailItems.slice(indexOfFirst, indexOfLast);

  return (
    <PageWrapper>
      {requestDetailMatch && clickedRequest && (
        <>
          <LeftContainer>
            <Box>
              <Wrapper>
                <TitleWrapper>
                  <Title>
                    {clickedRequest.clientName} 님의 {clickedRequest.category} 문의
                  </Title>
                </TitleWrapper>
                <UserInfoWrapper>
                  <UserInfo clickedRequest={clickedRequest} />
                </UserInfoWrapper>
                <Answer className='article' dangerouslySetInnerHTML={{ __html: clickedRequest.description }} />
              </Wrapper>
            </Box>

            <Box>
              <Wrapper>
                {loading && (
                  <Overlay visible={loading}>
                    <Spinner />
                  </Overlay>
                )}
                <Tooltip
                  description='대기: 아직 답장을 하지 않은 상태 / 논의: 내부적으로 승인과 거절 논의 중인 상태 / 승인: 문의를 승인한 상태 / 거절: 문의를 거절한 상태'
                  svgComponent={<InfoIcon width={18} height={18} />}
                />
                <DropDown onChange={(e) => {
                  const newState = e.target.value;
                  setReplyState(newState);
                  const content = createDefaultContent(newState);
                  setTextValue(content);
                }}>
                  <option value='WAITING' selected disabled hidden>
                    대기
                  </option>
                  <option value='DISCUSSING'>논의</option>
                  <option value='APPROVED'>승인</option>
                  <option value='REJECTED'>거절</option>
                </DropDown>
                <StyledTextArea
                  placeholder={createDefaultContent(replyState)}
                  value={textValue}
                  onChange={handleTextChange}
                  maxLength={MAX_TEXT_LENGTH}
                  style={{ whiteSpace: 'pre-wrap' }}
                />
                <TextCounter>
                  {textLength}/{MAX_TEXT_LENGTH}자
                </TextCounter>
              </Wrapper>
              <ButtonWrapper>
                <Button
                  onClick={() => {
                    clickedRequest && replyRequest(replyState);
                  }}
                >
                  답변 보내기
                </Button>
              </ButtonWrapper>
            </Box>
          </LeftContainer>
          <RightContainer>
            <Box>
              {/* <div>총 {emailItems.length}개</div> */}
              <EmailListComponent emailItems={emailItemsSliced} />
              <ButtonWrapper>
                <Pagination postsPerPage={postsPerPage} totalPosts={emailItems.length} paginate={paginate} />
              </ButtonWrapper>
            </Box>
          </RightContainer>
        </>
      )}
    </PageWrapper>
  );
};

export default RequestDetailPage;

const PageWrapper = styled.div`
  display: flex;
  margin-left: 100px;
  width: 80vw;
  font-family: 'pretendard';
`;

const LeftContainer = styled.div`
  height: 80vh;
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const RightContainer = styled.div`
  height: auto;
  width: 50%;
  display: flex;
  flex-direction: column;
  margin-left: 50px;
`;

const Box = styled.div`
  flex: 1;
  margin-bottom: 20px;
  padding: 20px;
  border: 1px solid #eaeaea;
  border-radius: 8px;
`;

const Wrapper = styled.div`
  position: relative;
`;

const UserInfoWrapper = styled.div`
  padding: 0rem 0 0rem 1rem;
  align-items: center;
  font-size: 0.9rem;
  width: 90%;
  overflow: hidden;
  word-break: break-word;
`;

const DropDown = styled.select`
  cursor: pointer;
  border: none;
  background-color: ${(props) => props.theme.color.white.bold};
  box-shadow: 1px 1px 4px 0.1px #c6c6c6;
  padding: 0.4rem 1.4rem;
  margin: 1rem 0;

  border-radius: 0.2rem;
  font-size: 0.9rem;
  font-weight: 600;
  display: flex;
  align-items: center;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0 1rem;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  height: 4rem;
  width: 100%;
  font-size: 1.5rem;
  font-weight: 600;
`;

const Answer = styled.div`
  border-top: 2px solid #eaeaea;
  margin-top: 20px;
  padding: 20px;
  max-height: 70px;
  overflow-y: auto;
  img {
    max-width: 100%;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem 0;
`;

const Button = styled.div`
  cursor: pointer;
  border: none;
  background-color: ${(props) => props.theme.color.white.bold};
  box-shadow: 1px 1px 4px 0.1px #c6c6c6;
  padding: 0.5rem 1.4rem;
  border-radius: 0.2rem;
  font-size: 0.9rem;
  font-weight: 900;
  display: flex;
  align-items: center;
`;

const StyledTextArea = styled.textarea`
  width: 95%;
  height: 18rem;
  padding: 10px;
  font-size: 1rem;
  font-weight: 400;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: none;
  overflow-wrap: break-word;
  display: block;

`;

const TextCounter = styled.span`
  margin-top: 0.9rem;
  font-size: 0.9rem;
`;

const spin = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
`;

const Spinner = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-left-color: white;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    animation: ${spin} 1s linear infinite;
`;

export const Overlay = styled.div<{ visible: boolean }>`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: ${props => (props.visible ? 'flex' : 'none')};
    justify-content: center;
    align-items: center;
    z-index: 9999;
`;
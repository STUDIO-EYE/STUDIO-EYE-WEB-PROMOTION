import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import BackgroundYellowCircle from '@/components/PromotionPage/BackgroundYellowCircle/BackgroundYellowCircle';
import { theme } from '@/styles/theme';
import { getFaqData } from '@/apis/PromotionPage/faq';
import { AxiosError } from 'axios';
import ErrorComponent from '@/components/Error/ErrorComponent';

interface FaqData {
  id: number;
  question: string;
  answer: string;
  visibility: boolean;
}

interface FaqDetailButtonProps {
  isExpanded: boolean; // isExpanded 속성을 추가
}

const FaqPage = () => {
  const [data, setData] = useState<FaqData[]>([]); // FAQ 데이터
  const [faqQuestion, setFaqQuestion] = useState(''); // 검색어
  const [searchResult, setSearchResult] = useState('none'); // 검색 결과 상태 초기화
  const [searchData, setSearchData] = useState<FaqData[]>([]); // 검색된 FAQ 데이터
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set()); // 펼쳐진 FAQ 항목
  const [errorMessage, setErrorMessage] = useState(''); // 에러 메시지 상태 추가
  const [error, setError] = useState<AxiosError|null>(null);

 useEffect(() => {
    const fetchData = async () => {
      try {
        const faqData: FaqData[] = await getFaqData();
        let filteredData: FaqData[] = [];
        if (faqData) {
          filteredData = faqData.filter((item: FaqData) => item.visibility === true);
          setData(filteredData);
          initiate(filteredData); // 데이터를 가져온 후 initiate 함수 호출
        }
      } catch (error) {
        console.error(error);
        setError(error as AxiosError)
        setErrorMessage('전송이 실패했습니다.'); // 실패 시 에러 메시지 설정
        setSearchResult('none'); // 검색 결과가 없을 때 상태 설정
      }
    };
    fetchData();
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    if (error!==null) {
      setIsModalOpen(true);
    }
  }, [error]);
  const closeModal = () => {
    setIsModalOpen(false);
    window.location.reload();
  };

  const initiate = (data: FaqData[]) => {
    if (data.length === 0) {
      setSearchData([]);
      setSearchResult('none');
      return;
    }
    const initData = data.map((item: FaqData, index: number) => ({
      ...item,
      index,
    }));
    setSearchData(initData);
    setSearchResult('success');
  };

  const handleTextAreaDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFaqQuestion(e.target.value);
    searchQuestion(e.target.value, data);
  };

  const searchQuestion = (searchTerm: string, data: FaqData[]) => {
    const searchTermLower = searchTerm.toLowerCase();
    const searchResults = data.filter((item: FaqData) =>
      item.question.toLowerCase().includes(searchTermLower)
    );
    setSearchData(searchResults.length > 0 ? searchResults : []);
    setSearchResult(searchResults.length > 0 ? 'success' : 'fail');
  };

  const toggleItem = (index: number) => {
    setExpandedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  return (
    <BackgroundYellowCircle>
      <Container>
        {isModalOpen &&<ErrorComponent error={error} onClose={closeModal}/>}
        <Header>
          <Title>
            <LineWrapper>
              <AnimatedSpan delay={0.1}>F</AnimatedSpan>requently
              <AnimatedSpan delay={0.3}> A</AnimatedSpan>sked
            </LineWrapper>
            <LineWrapper>
              <AnimatedSpan delay={0.5}> Q</AnimatedSpan>uestions
            </LineWrapper>
          </Title>
          <SubContent>이곳에 자주 묻는 질문들에 대한 답변을 모아 놓았습니다.</SubContent>
        </Header>
        <Content>
          <InputWrapper>
            <SearchFaqQuestion
              data-cy="faq-search-input"
              placeholder="컨텐츠 문의, 회사 위치 등의 검색어를 입력해 주세요."
              autoComplete="off"
              value={faqQuestion}
              onChange={handleTextAreaDataChange}
            />
          </InputWrapper>
                  {errorMessage && (
            <JobBoxWrapper>
              <NoResults data-cy="error-message">{errorMessage}</NoResults>
            </JobBoxWrapper>
          )}
          
          {searchResult === 'fail' ? (
            <JobBoxWrapper>
              <NoResults data-cy="no-results-message">검색 결과가 없습니다.</NoResults>
            </JobBoxWrapper>
          ) : searchResult === 'none' ? (
            <JobBoxWrapper>
              <NoResults data-cy="no-results-message">데이터가 없습니다.</NoResults>
            </JobBoxWrapper>
          ) : (
            searchData.map((item, i) => (
              <FaqDetailButton
                key={item.id}
                isExpanded={expandedItems.has(i)}
                onClick={() => toggleItem(i)}
                data-cy={`faq-item-${item.id}`}
              >
                <FaqBrief>
                  <FaqBriefQuestion>
                    {item.question.length >= 100
                      ? item.question.substring(0, 70) + '...'
                      : item.question}
                  </FaqBriefQuestion>
                </FaqBrief>
                <FaqDetailBox isExpanded={expandedItems.has(i)}>
                  {expandedItems.has(i) && (
                    <FaqDetailAnswer data-cy={`faq-answer-${item.id}`}>{item.answer}</FaqDetailAnswer>
                  )}
                </FaqDetailBox>
              </FaqDetailButton>
            ))
          )}
        </Content>
      </Container>
    </BackgroundYellowCircle>
  );
};


const Container = styled.div`
  font-family: 'Pretendard';
  min-height: 100vh;
  overflow-y: auto;
  overflow-x: hidden; /* X축 오버플로우 방지 */
  max-height: fit-content;
  scroll-snap-type: y mandatory;
  background-color: black;
  color: white;
  padding: 2rem 1rem;
  padding-bottom: 12rem; /* 하단 여백 추가 */

  @media (max-width: 1366px) and (min-width: 768px) {
    font-size: 80%;
    padding-bottom: 5rem; 
  }

  @media (max-width: 1024px) and (min-width: 540px) {
    font-size: 70%;
    padding-bottom: 5rem;
  }

  @media (max-width: 540px) and (min-width: 375px) {
    font-family: 'Pretendard-bold';
    font-size: 130%;
    padding-bottom: 4rem; 
  }

  @media (max-width: 374px) {
    font-size: 110%;
    padding-bottom: 3rem;
  }
`;

const Header = styled.div`
  position: relative;
  text-align: center;
  margin-top: 5.5rem;

  @media (max-width: 1366px) and (min-width: 768px) {
    margin-top: 3rem;
  }

  @media (max-width: 540px) and (min-width: 375px) {
    margin-top: 2rem;
  }
`;

const Title = styled.h1`
  font-size: 4rem;
  font-weight: 600;
  color: white;
  text-align: center;
  line-height: 1.5;
  margin-top: 2rem; 

  @media (max-width: 1366px) and (min-width: 768px) {
    font-size: 3rem;
  }

  @media (max-width: 767px) and (min-width: 540px) {
    font-size: 2rem;
  }

  @media (max-width: 540px) and (min-width: 375px) {
    font-family: 'Pretendard-bold';
    font-size: 2rem;
    margin-top: 3rem !important; 
  }

  @media (max-width: 374px) {
    font-size: 2rem;
    margin-top: 2rem !important; 
  }
`;



const LineWrapper = styled.div`
  display: inline;

  @media (max-width: 540px) and (min-width: 375px) {
    display: block;
  }
`;

const AnimatedSpan = styled.span<{ delay?: number }>`
  color: #ffa900;
  animation: ${keyframes`
    0% {
      transform: translateY(-100%);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  `} 1.2s ease-out;
  animation-delay: ${(props) => props.delay || 0}s;
`;

const SubContent = styled.p`
  font-family: ${theme.font.medium}; 
  font-size: 1.2rem;
  margin-top: 2rem;
  color: white;
  word-break: keep-all;

  @media (max-width: 1366px) and (min-width: 768px) {
    font-size: 1.1rem;
  }

  @media (max-width: 540px) and (min-width: 375px) {
    font-size: 1rem;
  }
`;

const Content = styled.div`
  padding-top: 5rem;
  padding-bottom: 5rem; 
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 1;

  @media (max-width: 1366px) and (min-width: 768px) {
    padding-top: 4rem;
    padding-bottom: 4rem; 
  }

  @media (max-width: 540px) and (min-width: 375px) {
    padding-top: 3rem;
    padding-bottom: 3rem; 
  }
`;
const JobBoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80%;
  padding: 1.8rem 1rem;
  border-top: 1px solid white;
  border-bottom: 1px solid white;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  opacity: 0.5;
`;


const NoResults = styled.p`
  color: ${theme.color.gray};
  font-family: 'Pretendard-Bold';
  font-size: 1.5rem;
  

  @media ${theme.media.large_tablet} {
    font-size: 1.4rem;
  }
  @media ${theme.media.tablet} {
    font-size: 1.2rem;
  }
  @media ${theme.media.mobile} {
    font-size: 1.1rem;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
  width: 100%; 

  @media (max-width: 1366px) and (min-width: 768px) {
    width: 100%;
  }

  @media (max-width: 540px) and (min-width: 375px) {
    width: 100%;
  }
`;

const SearchFaqQuestion = styled.input`
  width: 80%; 
  padding: 1.8rem 1rem;
  border: 1px solid white;
  background-color: transparent;
  color: white;
  text-align: center;
  font-size: 1.5rem; 

  &::placeholder {
    text-align: center;
    font-size: 1.2rem; 
  }

  @media (max-width: 1366px) and (min-width: 768px) {
    width: 70%; 
    padding: 1.8rem 1rem;
    font-size: 1.6rem; 
    &::placeholder {
      font-size: 1.1rem;
    }
  }

  @media (max-width: 540px) and (min-width: 375px) {
    width: 90%; 
    padding: 1.6rem 0.9rem;
    font-size: 1.4rem; 
    &::placeholder {
      font-size: 0.9rem;
    }
  }

  @media (max-width: 374px) {
    width: 100%;
    padding: 1.4rem 0.8rem;
    font-size: 0.8rem; 
    &::placeholder {
      font-size: 1rem;
    }
  }
`;



const FaqDetailButton = styled(motion.button)<FaqDetailButtonProps>`
  background-color: transparent;
  border: none;
  border-top: 1px solid white;
  border-bottom: 1px solid white;
  color: white;
  padding: 1rem 1rem;
  margin-bottom: 1rem;
  width: 80%;
  cursor: pointer;
  text-align: left; 
  height: auto; 

  opacity: ${({ isExpanded }) => (isExpanded ? 1 : 0.5)};
  transform: ${({ isExpanded }) => (isExpanded ? 'scale(1)' : 'scale(0.9)')};
  transition: opacity 0.4s ease, transform 0.4s ease;

  display: flex; 
  flex-direction: column; 
  align-items: flex-start; 
  justify-content: flex-start; 

  &:hover {
    background-color: rgba(255, 255, 255, 0.1); 
  }

  @media (max-width: 1366px) and (min-width: 768px) {
    width: 95%;
    padding: 1.8rem 1rem;
  }

  @media (max-width: 540px) and (min-width: 375px) {
    width: 100%;
    padding: 1.5rem 0.8rem;
  }
`;

const FaqBrief = styled.div`
font-size: 1.2rem;
font-weight: bold;
color: yellow; 
`;

const FaqBriefQuestion = styled.p`
  margin: 0;
  color: #ffa900; 
  cursor: pointer; 
  
  font-size: 1.6rem;

  @media (max-width: 1366px) and (min-width: 768px) {
    font-size: 1.4rem; 
  }

  @media (max-width: 540px) and (min-width: 375px) {
    font-size: 1.2rem; 
  }

  @media (max-width: 374px) {
    font-size: 1.1rem; 
  }
`;

const FaqDetailBox = styled.div<{ isExpanded: boolean }>`
  margin-top: 1rem;
  padding-left: 1rem;
  font-size: 1rem;
  font-weight: 100; 
  color: white; 
  font-family: 'Pretendard'; 
  display: ${({ isExpanded }) => (isExpanded ? 'block' : 'none')}; 
`;


const FaqDetailAnswer = styled.p`
  margin: 0;
  font-weight: 100 !important; 
  white-space: pre-line; 
  font-size: 1.1rem; 
  line-height: 1.5;
  font-family: 'pretendard-light';

  @media (max-width: 1366px) and (min-width: 768px) {
    font-size: 1rem;
  }
  @media (max-width: 540px) and (min-width: 375px) {
    font-size: 0.8rem;
  }

  @media (max-width: 374px) {
    font-size: 0.8rem;
  }
`;

export default FaqPage;

import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import axios from 'axios';
import { PROMOTION_BASIC_PATH } from '@/constants/basicPathConstants';
import { motion } from 'framer-motion';
import BackgroundYellowCircle from '@/components/PromotionPage/BackgroundYellowCircle/BackgroundYellowCircle';
import { theme } from '@/styles/theme'; // Import your theme for media queries
import { getFaqData } from '@/apis/PromotionPage/faq';

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
  const [data, setData] = useState<FaqData[]>([]);
  const [faqQuestion, setFaqQuestion] = useState('');
  const [searchResult, setSearchResult] = useState('');
  const [searchData, setSearchData] = useState<FaqData[]>([]);
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());

  useEffect(() => {
    const fetchData = async () => {
        try {
            const faqData = await getFaqData();
            const filteredData = faqData.filter((item: any) => item.visibility === true);
            const objects = filteredData.map((item: any) => ({
                id: item.id,
                question: item.question,
                answer: item.answer,
                visibility: item.visibility,
            }));
            setData(objects);
            initiate(objects);
        } catch (error) {
            console.error(error);
        }
    };
    fetchData();
}, []);

  const initiate = (data: any) => {
    if (data.length === 0) {
      setSearchData([]);
      setSearchResult('none');
      return;
    }
    const initData = data.map((item: any, index: number) => ({
      index,
      question: item.question,
      answer: item.answer,
      visibility: item.visibility,
    }));
    setSearchData(initData);
    setSearchResult('success');
  };

  const handleTextAreaDataChange = (e: any) => {
    setFaqQuestion(e.target.value);
    searchQuestion(e.target.value, data);
  };

  const searchQuestion = (searchTerm: string, data: any) => {
    const searchTermLower = searchTerm.toLowerCase();
    const searchResults = data.filter((item: any) =>
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
              placeholder='컨텐츠 문의, 회사 위치 등의 검색어를 입력해 주세요.'
              autoComplete='off'
              value={faqQuestion}
              onChange={handleTextAreaDataChange}
            />
          </InputWrapper>
          {searchResult === 'fail' ? (
            <NoResults>검색 결과가 없습니다.</NoResults>
          ) : (
            searchData.map((item, i) => (
        <FaqDetailButton
          key={item.id}
          isExpanded={expandedItems.has(i)}
          onClick={() => toggleItem(i)}
        >
          <FaqBrief>
            <FaqBriefQuestion>
              {item.question.length >= 100 ? item.question.substring(0, 70) + '...' : item.question}
            </FaqBriefQuestion>
          </FaqBrief>
          <FaqDetailBox isExpanded={expandedItems.has(i)}>
            {expandedItems.has(i) && <FaqDetailAnswer>{item.answer}</FaqDetailAnswer>}
          </FaqDetailBox>
        </FaqDetailButton>

            ))
          )}
        </Content>
      </Container>
    </BackgroundYellowCircle>
  );
};

// Styled-components with responsive media queries
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

  /* iPad Pro ~ 작은 iPad */
  @media (max-width: 1366px) and (min-width: 768px) {
    font-size: 80%;
  }

  /* 작은 iPad ~ 큰 휴대폰 */
  @media (max-width: 1024px) and (min-width: 540px) {
    font-size: 70%;
  }

  /* 큰 휴대폰 ~ 작은 휴대폰 */
  @media (max-width: 540px) and (min-width: 375px) {
    font-size: 130%;
  }

  /* 작은 휴대폰 이하 */
  @media (max-width: 374px) {
    font-size: 110%;
  }
`;

const Header = styled.div`
  position: relative;
  text-align: center;
  margin-top: 4rem;

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
  line-height: 1.5; /* 줄 간격을 늘림 */

  @media (max-width: 1366px) and (min-width: 768px) {
    font-size: 3rem;
  }

  @media (max-width: 767px) and (min-width: 540px) {
    font-size: 2rem;
  }

  @media (max-width: 540px) and (min-width: 375px) {
    font-size: 2rem;
  }
  @media (max-width: 374px) {
    font-size: 2rem;
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
  font-family: 'Pretendard-medium'; // 원하는 폰트 추가
  font-size: 1.2rem;
  margin-top: 2rem;
  color: white;
  word-break: keep-all; /* 단어가 잘리지 않도록 설정 */

  @media (max-width: 1366px) and (min-width: 768px) {
    font-size: 1.1rem;
  }

  @media (max-width: 540px) and (min-width: 375px) {
    font-size: 1rem;
  }
`;

const Content = styled.div`
  padding-top: 5rem;
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 1;

  @media (max-width: 1366px) and (min-width: 768px) {
    padding-top: 4rem;
  }

  @media (max-width: 540px) and (min-width: 375px) {
    padding-top: 3rem;
  }
`;

const NoResults = styled.p`
  color: white;
  font-family: 'Pretendard'; /* 폰트 적용 */
  font-size: 1.2rem; /* 원하는 폰트 크기로 수정 */

  @media (max-width: 1366px) and (min-width: 768px) {
    font-size: 1.1rem;
  }

  @media (max-width: 540px) and (min-width: 375px) {
    font-size: 1rem;
  }
`;


const InputWrapper = styled.div`
  display: flex;
  justify-content: center; /* 중앙 정렬 */
  margin-bottom: 2rem;
  width: 100%; /* 부모 요소의 너비를 100%로 설정 */

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

  &::placeholder {
    text-align: center;
    font-size: 1.2rem;
  }

  @media (max-width: 1366px) and (min-width: 768px) {
    width: 70%; /* 중간 화면에서는 70%로 설정 */
    padding: 1.3rem 0.9rem;
    font-size: 1.2rem;
  }

  @media (max-width: 540px) and (min-width: 375px) {
    width: 90%; /* 작은 화면에서는 90% */
    padding: 1.2rem 0.8rem;
    font-size: 1rem;
  }

  @media (max-width: 374px) {
    width: 100%;
    padding: 1rem 0.7rem;
    font-size: 0.9rem;
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
  text-align: left; /* 텍스트를 왼쪽 정렬 */
  height: auto; /* 높이를 자동으로 조정 */

  opacity: ${({ isExpanded }) => (isExpanded ? 1 : 0.5)};
  transform: ${({ isExpanded }) => (isExpanded ? 'scale(1)' : 'scale(0.9)')};
  transition: opacity 0.4s ease, transform 0.4s ease;

  display: flex; /* Flexbox를 사용 */
  flex-direction: column; /* 세로 방향으로 정렬 */
  align-items: flex-start; /* 왼쪽 정렬 */
  justify-content: flex-start; /* 왼쪽 정렬 */

  &:hover {
    background-color: rgba(255, 255, 255, 0.1); /* 호버 시 약간의 배경색 추가 */
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
color: yellow; /* 타이틀을 노란색으로 */
`;

const FaqBriefQuestion = styled.p`
  margin: 0;
  font-size: 1.4rem;
  color: #ffa900; // 제목을 노란색으로 설정
  cursor: pointer; // 클릭 가능함을 나타내기 위해 커서 모양 변경
`;

const FaqDetailBox = styled.div<{ isExpanded: boolean }>`
  margin-top: 1rem;
  padding-left: 1rem; /* 들여쓰기 적용 */
  font-size: 1rem;
  color: white; /* 세부 내용은 하얀 글씨 */
  display: ${({ isExpanded }) => (isExpanded ? 'block' : 'none')}; /* isExpanded가 true일 때만 보여주기 */
`;




const FaqDetailAnswer = styled.p`
 margin: 0;
 

  @media (max-width: 1366px) and (min-width: 768px) {
    font-size: 1.1rem;
  }

  @media (max-width: 540px) and (min-width: 375px) {
    font-size: 1rem;
  }
`;

export default FaqPage;

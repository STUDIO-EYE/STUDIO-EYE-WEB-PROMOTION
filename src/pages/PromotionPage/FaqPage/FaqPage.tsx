import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import axios from 'axios';
import { PROMOTION_BASIC_PATH } from '@/constants/basicPathConstants';
import { motion } from 'framer-motion';
import BackgroundYellowCircle from '@/components/PromotionPage/BackgroundYellowCircle/BackgroundYellowCircle';
import { theme } from '@/styles/theme'; // Import your theme for media queries

interface FaqData {
  id: number;
  question: string;
  answer: string;
  visibility: boolean;
}

const FaqPage = () => {
  const [data, setData] = useState<FaqData[]>([]);
  const [faqQuestion, setFaqQuestion] = useState('');
  const [searchResult, setSearchResult] = useState('');
  const [searchData, setSearchData] = useState<FaqData[]>([]);
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());
  const [searchToggleStates, setSearchToggleStates] = useState(Array(searchData.length).fill(false));

  useEffect(() => {
    axios
      .get(`${PROMOTION_BASIC_PATH}/api/faq`)
      .then((response) => {
        const filteredData = response.data.data.filter((item: any) => item.visibility === true);
        const objects = filteredData.map((item: any) => ({
          id: item.id,
          question: item.question,
          answer: item.answer,
          visibility: item.visibility,
        }));
        setData(objects);
        initiate(objects);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const initiate = (data: any) => {
    const initData: any = [];
    if (data.length === 0) {
      setSearchData([]);
      setSearchResult('none');
      return;
    }
    for (let i = 0; i < data.length; i++) {
      initData.push({
        index: i,
        question: data[i].question,
        answer: data[i].answer,
        visibility: data[i].visibility,
      });
    }
    setSearchData(initData);
    setSearchResult('success');
  };

  const handleTextAreaDataChange = (e: any) => {
    refreshToggleItem();
    setFaqQuestion(e.target.value);
    searchQuestion(e.target.value, data);
  };

  const searchQuestion = (searchTerm: string, data: any) => {
    const searchTermLower = searchTerm.toLowerCase();
    const searchResults: any = [];
    if (data.length === 0) {
      setSearchData([]);
      setSearchResult('none');
      return;
    }
    for (let i = 0; i < data.length; i++) {
      const questionLower = data[i].question.toLowerCase();
      if (questionLower.includes(searchTermLower)) {
        searchResults.push({
          index: i,
          question: data[i].question,
          answer: data[i].answer,
          visibility: data[i].visibility,
        });
      }
    }
    setSearchData(searchResults.length > 0 ? searchResults : []);
    setSearchResult(searchResults.length > 0 ? 'success' : 'fail');
  };

  const searchToggleItem = (index: number) => {
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

  const refreshToggleItem = () => {
    const newSearchToggleStates = searchToggleStates.map(() => false);
    setSearchToggleStates(newSearchToggleStates);
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
              name='searchingfaqquestion'
              value={faqQuestion}
              onChange={handleTextAreaDataChange}
            />
          </InputWrapper>
          {searchResult === 'fail' ? (
            <NoResults>검색 결과가 없습니다.</NoResults>
          ) : (
            searchData.map((item, i) => (
              <FaqDetailButton
                key={i}
                initial={{ height: 30, opacity: 0.5, scale: 0.9 }}
                animate={
                  expandedItems.has(i)
                    ? { height: 'auto', opacity: 1, scale: 1 }
                    : { height: 30, opacity: 0.5, scale: 0.9 }
                }
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                onClick={() => searchToggleItem(i)}
              >
                <FaqBrief>
                  <FaqBriefQuestion>
                    {item.question.length >= 100 ? item.question.substring(0, 70) + '...' : item.question}
                  </FaqBriefQuestion>
                </FaqBrief>
                {expandedItems.has(i) && (
                  <FaqDetailBox>
                    <FaqDetailAnswer>{item.answer}</FaqDetailAnswer>
                  </FaqDetailBox>
                )}
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
  font-size: 1.2rem;
  margin-top: 2rem;
  color: white;

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

const InputWrapper = styled.div`
  margin-bottom: 1rem;
  width: 80%;

  @media (max-width: 1366px) and (min-width: 768px) {
    width: 90%;
  }

  @media (max-width: 540px) and (min-width: 375px) {
    width: 100%;
  }
`;

const SearchFaqQuestion = styled.input`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid white;
  background-color: black;
  color: white;

  @media (max-width: 1366px) and (min-width: 768px) {
    padding: 0.7rem;
  }

  @media (max-width: 540px) and (min-width: 375px) {
    padding: 0.6rem;
  }
`;

const NoResults = styled.p`
  color: white;
`;

const FaqDetailButton = styled(motion.button)`
  background-color: black;
  color: white;
  border: none;
  padding: 1rem;
  margin-bottom: 1rem;
  width: 80%;
  cursor: pointer;
  text-align: left;

  @media (max-width: 1366px) and (min-width: 768px) {
    width: 90%;
    padding: 0.9rem;
  }

  @media (max-width: 540px) and (min-width: 375px) {
    width: 100%;
    padding: 0.8rem;
  }
`;

const FaqBrief = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FaqBriefQuestion = styled.p`
  margin: 0;
  font-size: 1rem;

  @media (max-width: 1366px) and (min-width: 768px) {
    font-size: 0.9rem;
  }

  @media (max-width: 540px) and (min-width: 375px) {
    font-size: 0.8rem;
  }
`;

const FaqDetailBox = styled.div`
  margin-top: 1rem;
`;

const FaqDetailAnswer = styled.p`
  font-size: 0.9rem;
  margin: 0;

  @media (max-width: 1366px) and (min-width: 768px) {
    font-size: 0.85rem;
  }

  @media (max-width: 540px) and (min-width: 375px) {
    font-size: 0.8rem;
  }
`;

export default FaqPage;

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

// Styled-components with media queries
const Container = styled.div`
  font-family: 'Pretendard';
  min-height: 100vh;
  overflow-y: auto;
  max-height: fit-content;
  scroll-snap-type: y mandatory;
  background-color: black;
  color: white;
  padding: 2rem 1rem;

  @media ${theme.media.tablet} {
    padding: 3rem 2rem;
  }

  @media ${theme.media.mobile} {
    padding: 2rem 1rem;
  }
`;


const Header = styled.div`
  position: relative;
  text-align: center;
  margin-top: 4rem;

  @media ${theme.media.tablet} {
    margin-top: 3rem;
  }

  @media ${theme.media.mobile} {
    margin-top: 2rem;
  }
`;

const Title = styled.h1`
  font-size: 4rem;
  font-weight: 600;
  color: white;
  text-align: center;

  @media ${theme.media.tablet} {
    font-size: 3rem;
  }

  @media ${theme.media.mobile} {
    font-size: 2rem;
  }
`;

const LineWrapper = styled.div`
  display: inline;

  @media ${theme.media.mobile} {
    display: block; /* This will create the line break on mobile */
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

  @media ${theme.media.tablet} {
    font-size: 1.1rem;
  }

  @media ${theme.media.mobile} {
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

  @media ${theme.media.tablet} {
    padding-top: 4rem;
  }

  @media ${theme.media.mobile} {
    padding-top: 3rem;
  }
`;

const InputWrapper = styled.div`
  padding: 10px 30px;
  border: 2px solid gray;
  background-color: transparent;
  width: 80%;
  text-align: center;
  margin-bottom: 2rem;

  @media ${theme.media.mobile} {
    width: 80%;
  }
`;

const SearchFaqQuestion = styled.input`
  all: unset;
  height: 30px;
  width: 100%;
  font-size: 18px;
  color: white;
  text-align: center;

  @media ${theme.media.mobile} {
    font-size: 16px;
  }
`;

const FaqDetailButton = styled(motion.div)`
  border-top: 2px solid gray;
  border-bottom: 2px solid gray;
  margin-bottom: 1rem;
  padding: 30px;
  width: 80%;
  overflow: hidden;
  cursor: pointer;

  @media ${theme.media.mobile} {
    width: 100%;
    padding: 20px;
  }
`;

const FaqBrief = styled.div`
  display: flex;
  justify-content: left;
`;

const FaqBriefQuestion = styled.h2`
  font-weight: 800;
  font-size: 2rem;
  color: #ffa900;
  transition: all 0.3s ease;

  &:hover {
    color: white;
  }

  @media ${theme.media.tablet} {
    font-size: 1.8rem;
  }

  @media ${theme.media.mobile} {
    font-size: 1.6rem;
  }
`;

const FaqDetailBox = styled.div`
  padding: 40px 40px 0 40px;

  @media ${theme.media.mobile} {
    padding: 20px 20px 0 20px;
  }
`;

const FaqDetailAnswer = styled.p`
  font-size: 1.4rem;
  line-height: 30px;
  font-weight: 400;
  text-align: justify;
  color: white;
  white-space: pre-line;
  word-wrap: break-word;
  word-break: break-word;

  @media ${theme.media.tablet} {
    font-size: 1.2rem;
  }

  @media ${theme.media.mobile} {
    font-size: 1rem;
  }

  a {
    color: #ffa900;
  }
`;

const NoResults = styled.div`
  font-size: 1rem;
  color: gray;
  text-align: center;
  margin-top: 2rem;
`;

export default FaqPage;

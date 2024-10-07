import React from 'react';
import styled from 'styled-components';
import { GoArrowRight } from "react-icons/go";

interface INewsCardProps {
    id: number;
    title: string;
    source: string;
    url: string;
    pubDate: string;
    onClick?: () => void;
  }

interface NewsSectionProps {
  currentNewsData: INewsCardProps[];
  onNewsClick: (url: string) => void;
}

const NewsSection: React.FC<NewsSectionProps> = ({ currentNewsData, onNewsClick }) => {
  return (
    <Container>
      <NewsSectionIntro>스튜디오아이 관련 뉴스 보기</NewsSectionIntro>
      {currentNewsData.map((news) => (
        <NewsCard key={news.id} onClick={() => onNewsClick(news.url)}>
          <TextWrapper>
            <Title>{news.title}</Title>
            <Source>{news.source} | {new Date(news.pubDate).toLocaleDateString()}</Source>
          </TextWrapper>
          <ArrowIcon> <GoArrowRight /> </ArrowIcon>
        </NewsCard>
      ))}
    </Container>
  );
};

export default NewsSection;

const Container = styled.div`
  height: 100vh;
  scroll-snap-align: start;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: black;
`;

const NewsSectionIntro = styled.h3`
  font-size: 21px;
  font-weight: 700;
  color: white;
  margin-bottom: 20px;
  max-width: 1200px;
  width: 100%;
`;

const TextWrapper = styled.div`
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Title = styled.h3`
  font-size: 24px;
  font-weight: 600;
  color: white;
  transition: color 0.3s ease-in-out;
`;

const Source = styled.p`
  font-size: 19px;
  margin: 8px 0 0 0;
  display: none;
`;

const ArrowIcon = styled.div`
  font-size: 100px;
  color: #ffa900;
  display: none;
  margin: 8px 0 0 auto;
  align-self: center;
`;

const NewsCard = styled.div`
  width: 100%;
  max-width: 1200px;
  padding: 20px 0;
  margin-bottom: 10px;
  background-color: black;
  border-top: 1px solid white;
  border-bottom: 1px solid white;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  transition: all 0.3s ease-in-out;
  overflow: hidden;
  height: 60px;

  &:hover {
    height: 90px;

    ${Title} {
      color: #ffa900;
    }

    ${Source}, ${ArrowIcon} {
      display: block;
    }
  }
`;

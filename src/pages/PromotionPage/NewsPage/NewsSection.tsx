import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { GoArrowRight } from "react-icons/go";
import { theme } from '@/styles/theme';

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

  // 클릭 여부를 저장할 상태
  const [isClicked, setIsClicked] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {// 모바일 여부를 판단 (width나 userAgent 등을 사용)
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= theme.mediaSize.tablet); // 예: width 768px 이하일 경우 모바일로 간주
    };
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {// containerRef 내부가 아닌 곳을 클릭했을 때 isClicked를 null로 설정
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsClicked(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleNewsClick = (newsUrl: string, newsId: number) => {
    if (isMobile) {
      if (isClicked === newsId) {// 클릭된 상태면 링크로 이동
        onNewsClick(newsUrl);
      } else {// 클릭되지 않은 상태면 해당 뉴스카드를 열음
        setIsClicked(newsId);
      }
    } else {// 데스크탑에서는 바로 링크로 이동
      onNewsClick(newsUrl);
    }
  };

  return (
    <Container ref={containerRef}>
      <NewsSectionIntro>스튜디오아이 관련 뉴스 보기</NewsSectionIntro>
      {
        currentNewsData.map((news) => (
          <NewsCard
            key={news.id}
            className={isClicked === news.id ? 'clicked' : ''}
            onClick={() => handleNewsClick(news.url, news.id)}
            onMouseEnter={() => !isMobile && setIsClicked(news.id)}
            data-cy={`news-item-${news.id}`}
          >
            <TextWrapper>
              <Title>{news.title}</Title>
              <Source>
                {news.source} | {new Date(news.pubDate).toLocaleDateString()}
              </Source>
            </TextWrapper>
            <ArrowIcon data-cy={`news-delete-button-${news.id}`}>
              <GoArrowRight />
            </ArrowIcon>
          </NewsCard>
        ))
      }
    </Container>
  );
}
export default NewsSection;


const Container = styled.div`
  min-height: 100vh;
  scroll-snap-align: start;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: black;

  @media ${theme.media.mobile}{
    width: 100%;
    height: 70vh;
    justify-content: flex-start;
  }
`;

const NewsSectionIntro = styled.h3`
  font-size: 21px;
  font-weight: 700;
  color: white;
  margin-bottom: 20px;
  max-width: 1200px;
  width: 100%;

  @media ${theme.media.mobile} {
    font-size: 1rem;
    margin-left: 1rem;
  }
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
  word-break: keep-all;
  
  @media ${theme.media.mobile}{
    font-family: 'pretendard-bold';
    font-size: 1.3rem;
    line-height: 1.2;
  }
`;

const Source = styled.p`
  font-size: 19px;
  margin: 8px 0 0 0;
  display: none;

  @media ${theme.media.mobile}{
    flex-direction: column;
    font-family: 'pretendard-light';
    font-size: 1.2rem;
  }
`;

const ArrowIcon = styled.div`
  font-size: 100px;
  color: #ffa900;
  display: none;
  margin: 8px 0 0 auto;
  align-self: center;

  @media ${theme.media.mobile}{
    font-size: 4rem;
  }
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

  @media ${theme.media.mobile}{
    height: 2.5rem;
    z-index: 1;
    background-color: transparent;

    &.clicked{
      ${Source}, ${ArrowIcon} {
        display: block;
      }
    }
  }
`;

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
      <Grid>
        <NewsSectionIntro>스튜디오아이 관련 뉴스 보기</NewsSectionIntro>
        <BorderLine>
          {currentNewsData.length === 0 ? (
            <NoDataMessage>현재 올라온 뉴스가 없습니다.</NoDataMessage>
          ) : (
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
          )}
        </BorderLine>
      </Grid>
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
  font-size: clamp(0.8rem, 3vw, 1.6rem);
  color: white;
  margin-bottom: 1rem;
  width: 100%;
  font-family: ${theme.font.medium};

  @media ${theme.media.large_tablet} {
    margin-bottom: 0.5rem;
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

const Grid = styled.div`
  width: 100%;
  max-width: 75rem;
  padding: 1rem;
  box-sizing: border-box;
  overflow-x: hidden;
`;

const BorderLine = styled.div`
  border-top: 1.5px solid white;
  border-bottom: 1.5px solid white;
`;

const NoDataMessage = styled.div`
  color: ${(props) => props.theme.color.black.light};
  font-size: clamp(1.5rem, 3vw, 2.2rem); 
  text-align: center;
  margin: 3rem 0;
  line-height: 1.8;
  padding: 1.5rem 2rem;
  word-break: keep-all;

  @media ${(props) => props.theme.media.large_tablet} {
    font-size: clamp(1.1rem, 2.5vw, 1.5rem); 
    margin: 2.5rem 0;
    padding: 1.2rem 1.8rem;
  }

  @media ${(props) => props.theme.media.tablet} {
    font-size: clamp(1rem, 2vw, 1.4rem); 
    margin: 2rem 0;
    padding: 1rem 1.5rem;
  }

  @media ${(props) => props.theme.media.mobile} {
    font-size: clamp(0.9rem, 2vw, 1.3rem); 
    margin: 1.5rem 0;
    padding: 0.8rem 1.2rem;
  }
`;

const NewsCard = styled.div`
  width: 100%;
  max-width: 1200px;
  padding: 20px 0;
  margin-bottom: 10px;
  background-color: black;
  border-top: 1.5px solid #ccc;

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



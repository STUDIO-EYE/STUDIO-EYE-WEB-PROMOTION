import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { getAllNewsData } from '@/apis/PromotionPage/news';
import BackgroundYellowCircle from '@/components/BackgroundYellowCircle/BackgroundYellowCircle';
import { GoArrowRight } from "react-icons/go";

interface INewsCardProps {
  id: number;
  title: string;
  source: string;
  url: string;
  pubDate: string;
  onClick?: () => void;
}

const NewsBoardPage: React.FC = () => {
  const [newsData, setNewsData] = useState<INewsCardProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getAllNewsData();

        const formattedData: INewsCardProps[] = data.data.map((news: any) => ({
          id: news.id,
          title: news.title,
          source: news.source,
          pubDate: news.pubDate,
          url: news.url,
        }));
        setNewsData(formattedData);
      } catch (error) {
        console.error('news' + error);
        setError('데이터를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Container>
      <IntroSection>
        <IntroTitleWrapper>
          <IntroLine>
            <IntroNewsWhite>REA</IntroNewsWhite>
            <IntroNewsMovingContainer>
              <IntroNewsMovingDAnimated delay="0s">D</IntroNewsMovingDAnimated>
              <IntroNewsMovingDAnimated delay="0.2s">D</IntroNewsMovingDAnimated>
              <IntroNewsMovingDAnimated delay="0.4s">D</IntroNewsMovingDAnimated>
            </IntroNewsMovingContainer>
            <IntroNewsWhite>THE NEWS</IntroNewsWhite>
          </IntroLine>

          <IntroLine>
            <IntroNewsYellow>AB</IntroNewsYellow>
            <IntroNewsMovingContainer>
              <IntroNewsMovingOAnimated delay="0s">O</IntroNewsMovingOAnimated>
              <IntroNewsMovingOAnimated delay="0.2s">O</IntroNewsMovingOAnimated>
              <IntroNewsMovingOAnimated delay="0.4s">O</IntroNewsMovingOAnimated>
            </IntroNewsMovingContainer>
            <IntroNewsYellowNoMargin>UT STUDIOEYE!</IntroNewsYellowNoMargin>
          </IntroLine>
        </IntroTitleWrapper>

        <BackgroundYellowCircle> </BackgroundYellowCircle>

      </IntroSection>

      <NewsSection>
        <NewsSectionIntro>스튜디오아이 관련 뉴스 보기</NewsSectionIntro>
        {newsData.map((news) => (
          <NewsCard key={news.id} onClick={() => { window.open(news.url) }}>
            <TextWrapper>
              <Title>{news.title}</Title>
              <Source>{news.source}  {new Date(news.pubDate).toLocaleDateString()}</Source>
            </TextWrapper>
            <ArrowIcon> <GoArrowRight /> </ArrowIcon>
          </NewsCard>
        ))}
      </NewsSection>
    </Container>
  );
};

const IntroSection = styled.div`
  height: 100vh;
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const IntroTitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  line-height: 1.1;
  margin-bottom: 50px;
`;

const IntroLine = styled.div`
  display: flex;
  justify-content: center;
`;

const IntroNewsWhite = styled.span`
  font-family: Pretendard;
  font-weight: 700;
  font-size: 96px;
  color: white;
`;

const IntroNewsYellow = styled.span`
  margin-left: 30px;
  font-family: Pretendard;
  font-weight: 700;
  font-size: 96px;
  color: #ffa900;
`;

const IntroNewsYellowNoMargin = styled.span`
  font-family: Pretendard;
  font-weight: 700;
  font-size: 96px;
  color: #ffa900;
`;

const IntroNewsMovingContainer = styled.span`
  position: relative;
  display: inline-block;
  margin-right: 70px;
`;

interface IntroNewsMovingProps {
  delay: string;
}

const IntroNewsMovingDAnimated = styled.span<IntroNewsMovingProps>`
  font-family: Pretendard;
  font-weight: 50;
  font-size: 96px;
  color: #ffa900;
  position: absolute;
  margin-left: -5px;
  animation: move-diagonal 0.7s ease-in-out infinite alternate;
  animation-delay: ${(props) => props.delay}; 
  
  @keyframes move-diagonal {
    0% {
      transform: translate(-5px, -5px);
    }
    100% {
      transform: translate(5px, 5px);
    }
  }
`;

const IntroNewsMovingOAnimated = styled.span<IntroNewsMovingProps>`
  font-family: Pretendard;
  font-weight: 50;
  font-size: 96px;
  color: #ffffff;
  position: absolute;
  animation: move-horizontal 0.7s ease-in-out infinite alternate;
  animation-delay: ${(props) => props.delay}; 
  
  @keyframes move-horizontal {
    0% {
      transform: translateX(-5px);
    }
    100% {
      transform: translateX(5px);
    }
  }
`;


const IntroSubtitle = styled.div`
  font-family: 'Pretendard';
  font-weight: 700;
  font-size: 36px;
  margin-bottom: 20px;
  color: white;
`;

const Container = styled.div`
  font-family: 'Pretendard';
  min-height: 100vh;
  background-color: black;
  color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const NewsSection = styled.div`
  height: 100vh;
  scroll-snap-align: start;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: black;
`;
const NewsSectionIntro = styled.h3`
  font-size: 19px;
  color: white;
  margin-bottom: 20px;
  max-width: 1200px;
  width: 100%;
`;
const TextWrapper = styled.div`
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

const PubDate = styled.p`
  font-size: 19px;
  color: white;
  margin: 0;
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

    ${Source}, ${PubDate}, ${ArrowIcon} {
      display: block;
    }
  }
`;

export default NewsBoardPage;

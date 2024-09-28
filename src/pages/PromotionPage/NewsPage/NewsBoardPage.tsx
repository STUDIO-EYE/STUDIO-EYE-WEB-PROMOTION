import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { getAllNewsData } from '@/apis/PromotionPage/news';

interface INewsCardProps {
  id: number;
  title: string;
  source: string;
  mainImg?: string;
  content: string;
  pubDate: string;
  createdAt: Date;
  updatedAt: Date;
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
          mainImg: news.newsFiles.length > 0 ? news.newsFiles[0].filePath : undefined, // 이미지 경로 설정
          content: news.content,
          pubDate: news.pubDate,
          createdAt: news.createdAt,
          updatedAt: news.updatedAt
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

  const handleCardClick = (news: INewsCardProps) => {
    navigate(`/news/${news.id}`, { state: { news } });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Container>
      <Content>
        <Title>최근 소식 어쩌구</Title>
        <CardContainer>
          {newsData.map((news) => (
            <NewsCard key={news.id} onClick={() => handleCardClick(news)} {...news} />
          ))}
        </CardContainer>
      </Content>
    </Container>
  );
};

const NewsCard: React.FC<INewsCardProps> = ({ title, source, mainImg, content, pubDate, onClick }) => {
  return (
    <Card onClick={onClick}>
      <TextContent>
        <TitleWrapper>{title}</TitleWrapper>
        <Client>{source}</Client>
        <ContentPreview>{content.slice(0, 100)}...</ContentPreview>
      </TextContent>
      {mainImg ? (
        <ImageWrapper>
          <img src={mainImg} alt={title} />
        </ImageWrapper>
      ) : (
        <TextImage>{content.slice(0, 40)}...</TextImage>
      )}
    </Card>
  );
};

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

const Content = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding-top: 5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
  font-weight: 700;
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Card = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f1f1f1;
    cursor: pointer;
  }
`;

const TextContent = styled.div`
  flex: 1;
  padding-right: 20px;
`;

const TitleWrapper = styled.h2`
  font-size: 1.5rem;
  font-family: 'Pretendard-bold';
  color: black;
  margin-bottom: 10px;
`;

const Client = styled.p`
  font-size: 14px;
  font-family: 'Pretendard';
  font-weight: 600;
  color: #777;
  margin-bottom: 10px;
`;

const ContentPreview = styled.p`
  font-size: 16px;
  font-family: 'Pretendard';
  font-weight: 500;
  color: #555;
`;

// 이미지가 있을 때
const ImageWrapper = styled.div`
  width: 150px;
  height: 150px;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
  }
`;

// 메인이미지가 없을 때 텍스트로 대체
const TextImage = styled.div`
  width: 150px;
  height: 150px;
  flex-shrink: 0;
  background-color: #e0e0e0;
  color: #555;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: left;
  border-radius: 8px;
  font-size: 14px;
  font-family: 'Pretendard';
  font-weight: 500;
  line-height: 1.2;
`;

export default NewsBoardPage;

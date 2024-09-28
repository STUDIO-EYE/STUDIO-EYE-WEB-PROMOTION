import { getNewsData } from '@/apis/PromotionPage/news';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

interface INewsCardProps {
  id: number;
  title: string;
  source: string;
  mainImg?: string;
  content: string;
  pubDate: string;
  createdAt: Date;
  updatedAt: Date;
}

const NewsDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [newsItem, setNewsItem] = useState<INewsCardProps | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const response = await getNewsData(Number(id));
          console.log('News data:', response); // 데구확
          setNewsItem({
            id: response.data.id,
            title: response.data.title,
            source: response.data.source,
            mainImg: response.data.newsFiles.length > 0 ? response.data.newsFiles[0].filePath : undefined,
            content: response.data.content,
            pubDate: response.data.pubDate,
            createdAt: response.data.createdAt,
            updatedAt: response.data.updatedAt,
          });
        }
      } catch (error) {
        console.error(error);
        setError('데이터를 로드할 수 없습니다.');
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [id]);  

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!newsItem) return <div>데이터를 로드할 수 없습니다.</div>;  

  return (
    <PageContainer>
      <Header>
        <Overlay>
          <Title>{newsItem.title}</Title>
          <Source>작성자 {newsItem.source} | 발행일 {newsItem.pubDate}</Source>
        </Overlay>
      </Header>
      <Content>
        {newsItem.mainImg && (
          <ImageWrapper>
            <img src={newsItem.mainImg} alt={newsItem.title} />
          </ImageWrapper>
        )}
        <Description>{newsItem.content}</Description>
      </Content>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  font-family: 'Pretendard';
  min-height: 100vh;
  padding-bottom: 10vh;
  margin-bottom: -19.5vh;
  background-color: white;
  color: black;
`;

const Header = styled.div`
  position: relative;
  width: 100%;
  height: 60vh;
  background-image: url('/path-to-your-image.png');
  background-size: cover;
  background-position: center;
`;

const ImageWrapper = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 20px auto;
  display: flex;
  justify-content: center;
  img {
    max-width: 100%;
    height: auto;
    border-radius: 10px;
  }
`;


const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Source = styled.p`
  font-size: 1.2rem;
`;

const Content = styled.div`
  max-width: 800px;
  width: 100%;
  margin: 40px auto;
  background: #fff;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Description = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: black;
`;

export default NewsDetailPage;

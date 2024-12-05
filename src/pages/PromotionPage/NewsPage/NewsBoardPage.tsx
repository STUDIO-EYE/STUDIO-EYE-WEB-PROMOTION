import { getAllNewsData } from "@/apis/PromotionPage/news";
import { useState } from "react";
import styled from "styled-components";
import IntroSection from "./IntroSection";
import NewsSection from "./NewsSection";
import NewsPagination from "@/components/Pagination/NewsPagination";
import { theme } from "@/styles/theme";
import { useQuery } from "react-query";

interface INewsCardProps {
  id: number;
  title: string;
  source: string;
  url: string;
  pubDate: string;
}

const NewsBoardPage: React.FC = () => {

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [postsPerPage] = useState<number>(6);

  const { data: newsData, isLoading, error } = useQuery<INewsCardProps[], Error>(
    'newsData',
    async () => {
      const response = await getAllNewsData();
      if (!response || !response.data) {
        throw new Error('데이터가 없습니다.');
      }
      return response.data.map((news: any) => ({
        id: news.id,
        title: news.title,
        source: news.source,
        pubDate: news.pubDate,
        url: news.url,
      }));
    }
  );

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentNewsData = newsData?.slice(indexOfFirstPost, indexOfLastPost) || [];

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Container>
      <IntroSection />
      {isLoading ? (
        <><LoadingModal>
          <LoadingIcon />
        </LoadingModal><EmptyState>로딩 중...</EmptyState></>
      ) : error ? (
        <EmptyState>{error.message}</EmptyState>
      ) : (
        <>
          <NewsSection
            currentNewsData={currentNewsData}
            onNewsClick={(url) => window.open(url)}
          />
          <NewsPagination
            postsPerPage={postsPerPage}
            totalPosts={newsData?.length || 0}
            paginate={paginate}
            data-cy="news-pagination"
          />
        </>
      )}
    </Container>
  );
};

export default NewsBoardPage;

const EmptyState = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  font-family: 'pretendard-bold';
  font-size: 2rem;
  color: gray;
  text-align: center;
  padding: 0.75rem;
  word-break: keep-all;
`;

const Container = styled.div`
  overflow-x: hidden;

  font-family: 'Pretendard';
  min-height: 100vh;
  background-color: black;
  color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  
  @media ${theme.media.mobile}{
    width:95%;
    padding: 0;
    margin: auto;
  }
`;

const LoadingModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.036);
  backdrop-filter: blur(3px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const LoadingIcon = styled.div`
  border: 8px solid rgba(255, 255, 255, 0.3);
  border-top: 8px solid ${theme.color.white.bold};
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
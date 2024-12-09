import { getAllNewsData } from "@/apis/PromotionPage/news";
import { useEffect, useState } from "react";
import styled from "styled-components";
import IntroSection from "./IntroSection";
import NewsSection from "./NewsSection";
import NewsPagination from "@/components/Pagination/NewsPagination";
import { theme } from "@/styles/theme";
import { AxiosError } from "axios";
import ErrorComponent from "@/components/Error/ErrorComponent";
import { useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import ScrollToTop from "@/hooks/useScrollToTop";

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
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const page = queryParams.get('page');

    if (!page) {
      navigate('?page=1', { replace: true });
    } else {
      setCurrentPage(parseInt(page, 10));
    }
  }, [location, navigate]);

  const { data: newsData } = useQuery<INewsCardProps[], Error>(
    'newsData',
    async () => {
      const response = await getAllNewsData();
      if (!response || !response.data) {
        throw error;
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

  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    if (error!==null) {
      setIsModalOpen(true);
    }
  }, [error]);
  const closeModal = () => {
    setIsModalOpen(false);
    window.location.reload();
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentNewsData = newsData?.slice(indexOfFirstPost, indexOfLastPost) || [];

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Container>
      <IntroSection />
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
    </Container>
  );
};

export default NewsBoardPage;

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
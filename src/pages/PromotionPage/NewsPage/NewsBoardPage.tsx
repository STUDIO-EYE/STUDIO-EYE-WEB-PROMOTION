import { getAllNewsData } from "@/apis/PromotionPage/news";
import { Suspense, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import IntroSection from "./IntroSection";
import NewsSection from "./NewsSection";
import NewsPagination from "@/components/Pagination/NewsPagination";
import { theme } from "@/styles/theme";
import NullException from '@/components/PromotionPage/Artwork/NullException';
import { AxiosError } from "axios";
import ErrorComponent from "@/components/Error/ErrorComponent";

interface INewsCardProps {
  id: number;
  title: string;
  source: string;
  url: string;
  pubDate: string;
}

const NewsBoardPage: React.FC = () => {
  const [newsData, setNewsData] = useState<INewsCardProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<AxiosError|null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [postsPerPage] = useState<number>(6);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getAllNewsData();
        if(data.data!==null){
          const formattedData: INewsCardProps[] = data.data.map((news: any) => ({
            id: news.id,
            title: news.title,
            source: news.source,
            pubDate: news.pubDate,
            url: news.url,
          }));
          setNewsData(formattedData);
        }
      } catch (error) {
        setError(error as AxiosError);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
  const currentNewsData = newsData.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const autoScrollRef = useRef<HTMLDivElement | null>(null);
  const handleScroll = () => {
    if (autoScrollRef.current) {
      const elementPosition = autoScrollRef.current.getBoundingClientRect().top; //요소 위치
      const offsetPosition = window.scrollY + elementPosition; //현재 스크롤 위치
      const headerOffset = 100; //헤더 높이

      // 스크롤 이동 (헤더 높이만큼 더 위로 스크롤)
      window.scrollTo({
        top: offsetPosition - headerOffset,
        behavior: 'smooth', // 부드러운 스크롤
      });
    }
  }

  return (
    <Container>
      <IntroSection />
      {error ? (
        isModalOpen &&<ErrorComponent error={error} onClose={closeModal}/>
      ) : newsData.length === 0 ? (
        <EmptyState>데이터가 없습니다.</EmptyState>
      ) : (
        <Suspense fallback={<EmptyState>로딩 중...</EmptyState>}>
          <NewsSection
            currentNewsData={currentNewsData}
            onNewsClick={(url) => window.open(url)}
          />
          <NewsPagination
            postsPerPage={postsPerPage}
            totalPosts={newsData.length}
            paginate={paginate}
            data-cy="news-pagination"
          />
        </Suspense>
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

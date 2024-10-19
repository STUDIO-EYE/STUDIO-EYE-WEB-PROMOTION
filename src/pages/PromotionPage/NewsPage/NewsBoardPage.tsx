import { getAllNewsData } from "@/apis/PromotionPage/news";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import IntroSection from "./IntroSection";
import NewsSection from "./NewsSection";
import NewsPagination from "@/components/Pagination/NewsPagination";
import { theme } from "@/styles/theme";

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
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [postsPerPage] = useState<number>(6);

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

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentNewsData = newsData.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // No scroll behavior, just set the current page
  };

  const autoScrollRef = useRef<HTMLDivElement | null>(null);
  const handleScroll=()=>{
    if(autoScrollRef.current) {
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Container>
      <IntroSection />
      <div ref={autoScrollRef}>
      <NewsSection
        currentNewsData={currentNewsData}
        onNewsClick={(url) => window.open(url)} 
      />
      </div>
      <div onClick={handleScroll}>
      <NewsPagination
        postsPerPage={postsPerPage}
        totalPosts={newsData.length}
        paginate={paginate}
      />
      </div>
    </Container>
  );
};

export default NewsBoardPage;

const Container = styled.div`
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

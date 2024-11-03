import React, { useMemo, useState } from 'react';
import NewsItem from './NewsItem';
import { INEWS } from '@/types/PromotionAdmin/news';
import { useQuery } from 'react-query';
import { getNews } from '@/apis/PromotionAdmin/news';
import Pagination from '@/components/Pagination/Pagination';
import { useNavigate } from 'react-router-dom';

const NewsList = ({handler}:{handler:(id:number)=>void}) => {
  const { data, isLoading, error, refetch } = useQuery<INEWS[], Error>('newsList', getNews);
  // const newsData: INEWS[]=data?data:[];

  const navigate = useNavigate();
  const postsPerPage = 7;
  const [currentPage, setCurrentPage] = useState(0);
  const indexOfLastPost = (currentPage + 1) * postsPerPage;
  const indexOfFirstPost = currentPage * postsPerPage;
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber - 1); // 페이지 인덱스를 0부터 시작하게 조정
    navigate(`?page=${pageNumber}`); // URL 쿼리 매개변수 업데이트
  };
  const currentArtworks = data?data.slice(indexOfFirstPost, indexOfLastPost):[];

  const handleClick=(id:number)=>{
    handler(id)
  };

  return (
    <div style={{flexDirection:'column'}}>
      {isLoading?<h1>Loading...</h1>:
        data?
        <>
          {currentArtworks.map((i)=>(
            <div
            key={i.id}
            style={{marginBottom:"5px"}}
            onClick={()=>handleClick(i.id)}
            data-cy={`news-item-${i.id}`} >
            <NewsItem data={i}/>
            </div>
          ))}
          <Pagination postsPerPage={postsPerPage} totalPosts={data.length} paginate={paginate} />
        </>
        :<>😊 뉴스 데이터가 존재하지 않습니다.</>}
    </div>
  );
};

export default NewsList;
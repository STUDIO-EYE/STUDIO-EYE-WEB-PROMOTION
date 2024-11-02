import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from '@/styles/theme';

interface IPaginationProps {
  postsPerPage: number;
  totalPosts: number;
  paginate: (pageNumber: number) => void;
}

const Pagination = ({ postsPerPage, totalPosts, paginate }: IPaginationProps) => {
  const [index, setIndex] = useState<null | number>(0);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageRange, setCurrentPageRange] = useState(0);
  const location = useLocation();

  const pageNumbers = [];
  for (let i = 0; i < Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  const totalPageRanges = Math.ceil(pageNumbers.length / 10);
  const displayedPages = pageNumbers.slice(currentPageRange * 10, (currentPageRange + 1) * 10);

  const handlePrevRange = () => {
    if (currentPageRange > 0) {
      setCurrentPageRange(currentPageRange - 1);
    }
  };

  const handleNextRange = () => {
    if (currentPageRange < totalPageRanges - 1) {
      setCurrentPageRange(currentPageRange + 1);
    }
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const page = parseInt(queryParams.get('page') || '1', 10);
    setCurrentPage(page);
    setIndex(page - 1);
    const pageRange = Math.ceil(page / 10) - 1;
    setCurrentPageRange(pageRange);
  }, [location]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage, currentPageRange]);

  return (
    <Wrapper id='pagination'>
      {currentPageRange > 0 && (
        <>
          <PageLi onClick={() => setCurrentPageRange(0)} selected={false}>
            {'<<'}
          </PageLi>
          <PageLi onClick={handlePrevRange} selected={false}>
            {'<'}
          </PageLi>
        </>
      )}
      {displayedPages.map((number) => (
        <PageLi
          key={number}
          className='page-item'
          onClick={() => {
            paginate(number + 1); // 페이지 인덱스를 1부터 시작하게 조정
            setIndex(number);
            navigate(`?page=${number + 1}`);
          }}
          selected={number === index ? true : false}
        >
          {number + 1}
        </PageLi>
      ))}
      {currentPageRange < totalPageRanges - 1 && (
        <>
          <PageLi onClick={handleNextRange} selected={false}>
            {'>'}
          </PageLi>
          <PageLi onClick={() => setCurrentPageRange(totalPageRanges - 1)} selected={false}>
            {'>>'}
          </PageLi>
        </>
      )}
    </Wrapper>
  );
};

export default Pagination;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;

const PageLi = styled.div<{ selected: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  padding: 10px 15px;
  margin-right: 3px;
  box-sizing: border-box;
  font-family: ${(props) => props.theme.font.regular};
  transition: all 300ms ease-in-out;
  font-family: 'pretendard-semibold';
  border-radius: 5px;
  &:hover {
    transition: all 300ms ease-in-out;
    cursor: pointer;
    color: ${(props) => props.theme.color.white.light};
    background-color: ${(props) => props.theme.color.yellow.bold};
  }
  background-color: ${({ selected }) => (selected ? theme.color.yellow.light : 'none')};
`;

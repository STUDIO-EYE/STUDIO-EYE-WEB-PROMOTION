import { getAllArtworks } from '@/apis/PromotionAdmin/artwork';
import { PA_ROUTES } from '@/constants/routerConstants';
import { ArtworkData, projectType } from '@/types/PromotionAdmin/artwork';
import React, { useState, useEffect, useMemo } from 'react';
import { useQuery } from 'react-query';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ArtworkBox from './ArtworkBox';
import CategoryDropDown from '../CategoryDropDown';
import { useRecoilState } from 'recoil';
import { backdropState } from '@/recoil/atoms';
import BackDrop from '@/components/Backdrop/Backdrop';
import ArtworkCreating from '../ArtworkCreating/ArtworkCreating';
import Pagination from '@/components/Pagination/Pagination';

const Artwork = () => {
  const { data, isLoading, error, refetch } = useQuery<ArtworkData[], Error>('artworks', getAllArtworks);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [producingIsOpend, setProducingIsOpened] = useRecoilState(backdropState);
  const [currentPage, setCurrentPage] = useState(0);
  const postsPerPage = 7;
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedProjectType, setSelectedProjectType] = useState<projectType | 'all'>('all');

  const filteredAndSortedArtworks = useMemo(() => {
    if (!data) return [];

    return data
      .filter((artwork) => {
        const isMatchingSearch = artwork.name.toLowerCase().includes(searchQuery.toLowerCase());
        const isMatchingCategory = selectedCategory === '' || artwork.category.includes(selectedCategory);
        const isMatchingProjectType = selectedProjectType === 'all' || artwork.projectType === selectedProjectType;
        return isMatchingSearch && isMatchingCategory && isMatchingProjectType;
      })
      .sort((a, b) => b.id - a.id);
  }, [data, searchQuery, selectedCategory, selectedProjectType]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const page = parseInt(queryParams.get('page') || '1', 10) - 1; // 페이지 인덱스를 0부터 시작하게 조정
    setCurrentPage(page);
  }, [location.search]);

  useEffect(() => {
    setCurrentPage(0);
    navigate(PA_ROUTES.ARTWORK);
  }, [selectedCategory, selectedProjectType]);

  if (isLoading) return <LoadingWrapper>Loading...</LoadingWrapper>;
  if (error) return <div>Error: {error.message}</div>;

  const indexOfLastPost = (currentPage + 1) * postsPerPage;
  const indexOfFirstPost = currentPage * postsPerPage;
  const currentArtworks = filteredAndSortedArtworks.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber - 1); // 페이지 인덱스를 0부터 시작하게 조정
    navigate(`?page=${pageNumber}`); // URL 쿼리 매개변수 업데이트
  };

  return (
    <>
      {producingIsOpend && <BackDrop children={<ArtworkCreating />} isOpen={producingIsOpend} />}
      <Container>
        <ArtworkBoxWrapper>
          <UtilWrapper>
            <SearchWrapper>
              <input
                placeholder='아트워크 이름으로 검색하기'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </SearchWrapper>
            <CategoryWrapper>
              <CategoryDropDown setSelectedCategory={setSelectedCategory} />
            </CategoryWrapper>
          </UtilWrapper>
          <SecondWrapper>
            <TypeContainer projectType={selectedProjectType}>
              <div onClick={() => setSelectedProjectType('all')}>전체</div>
              <div onClick={() => setSelectedProjectType('top')}>대표</div>
              <div onClick={() => setSelectedProjectType('main')}>메인</div>
            </TypeContainer>
            <ArtworkProducingWrapper onClick={() => setProducingIsOpened(!producingIsOpend)}>
              아트워크 생성하기
            </ArtworkProducingWrapper>
          </SecondWrapper>

          {filteredAndSortedArtworks.length === 0 ? (
            <NoDataWrapper>😊 아트워크 데이터가 존재하지 않습니다.</NoDataWrapper>
          ) : (
            <div data-cy='PA_artwork_list' style={{ height: '1400px' }}>
              {currentArtworks.map((artwork) => (
                <LinkStyle to={`${PA_ROUTES.ARTWORK}/${artwork.id}?page=${currentPage + 1}`} key={artwork.id}>
                  <ArtworkBox
                    mainImg={artwork.mainImg}
                    client={artwork.client}
                    name={artwork.name}
                    isPosted={artwork.isPosted}
                    id={artwork.id}
                    department={artwork.department}
                    category={artwork.category}
                    date={artwork.date}
                    link={artwork.link}
                    overView={artwork.overView}
                    projectType={artwork.projectType}
                    projectImages={artwork.projectImages}
                    sequence={artwork.sequence}
                    mainSequence={artwork.mainSequence}
                  />
                </LinkStyle>
              ))}
            </div>
          )}
          <Pagination postsPerPage={postsPerPage} totalPosts={filteredAndSortedArtworks.length} paginate={paginate} />
        </ArtworkBoxWrapper>
        <Outlet />
      </Container>
    </>
  );
};

export default Artwork;

const Container = styled.div`
  display: flex;
  width: 100%;
`;

const LinkStyle = styled(Link)`
  text-decoration: none;
  margin-bottom: 20px;
`;

const ArtworkBoxWrapper = styled.div`
  width: 35rem;

  height: fit-content;
  min-height: 100px;
  margin-right: 50px;
  display: flex;
  flex-direction: column;
`;

const NoDataWrapper = styled.div`
  font-family: 'pretendard-medium';
  font-size: 17px;
`;

const LoadingWrapper = styled.div`
  font-family: 'pretendard-regular';
  font-size: 17px;
`;

const SearchWrapper = styled.div`
  input {
    width: 13rem;
    padding: 0.7rem;
    font-family: 'pretendard-medium';
    outline-style: none;
    border-radius: 5px;
    font-size: 0.8rem;
    border: none;
    color: black;
    background-color: #dadada9f;

    &:hover {
      cursor: pointer;
      background-color: #ffffff73;
      transition: all 300ms ease-in-out;
    }
    &:focus {
      background-color: white;
      transition: all 300ms ease-in-out;
    }
    ::placeholder {
      color: #7a7a7a;
    }
  }
`;

const CategoryWrapper = styled.div`
  height: fit-content;
  width: 14rem;
`;

const SecondWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  justify-content: space-between;
`;

const UtilWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;

  justify-content: space-between;
  margin-bottom: 20px;
`;

const ArtworkProducingWrapper = styled.div`
  font-size: 0.8rem;
  cursor: pointer;
  width: fit-content;
  font-family: 'pretendard-semibold';
  padding: 10px 20px;
  background-color: #6c757d;
  color: white;
  border-radius: 5px;

  &:hover {
    cursor: pointer;
    transition: all 300ms ease-in-out;
    background-color: #5a6268;
  }
`;

const TypeContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'projectType',
})<{ projectType: projectType | 'all' }>`
  display: flex;
  font-size: 0.8rem;
  align-items: center;
  cursor: pointer;
  font-family: 'pretendard-semibold';
  background-color: #a3a3a360;
  height: 2rem;
  border-radius: 10px;
  position: relative;
  width: 12rem;

  &::before {
    content: '';
    position: absolute;
    width: 4rem;
    height: 100%;
    background-color: #fcfcfce2;
    border-radius: 10px;
    transition: transform 0.3s ease-in-out;
    transform: ${(props) => {
      switch (props.projectType) {
        case 'all':
          return 'translateX(0)';
        case 'top':
          return 'translateX(4rem)';
        case 'main':
          return 'translateX(8rem)';
        default:
          return 'translateX(0)';
      }
    }};
  }

  div {
    z-index: 1;
    flex: 1;
    text-align: center;
    padding: 5px 0;
    font-weight: normal;
    color: grey;

    &:nth-child(1) {
      color: ${(props) => (props.projectType === 'all' ? 'black' : 'grey')};
      font-weight: ${(props) => (props.projectType === 'all' ? 'bold' : 'normal')};
    }

    &:nth-child(2) {
      color: ${(props) => (props.projectType === 'top' ? 'black' : 'grey')};
      font-weight: ${(props) => (props.projectType === 'top' ? 'bold' : 'normal')};
    }

    &:nth-child(3) {
      color: ${(props) => (props.projectType === 'main' ? 'black' : 'grey')};
      font-weight: ${(props) => (props.projectType === 'main' ? 'bold' : 'normal')};
    }
  }
`;

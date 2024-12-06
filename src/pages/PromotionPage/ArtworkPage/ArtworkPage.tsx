import { useLocation } from 'react-router-dom';
import { IArtworksData } from '@/types/PromotionPage/artwork';
import { useQuery } from 'react-query';
import { getArtworkData } from '@/apis/PromotionPage/artwork';
import styled from 'styled-components';
import { Suspense, useEffect, useMemo, useState } from 'react';
import { artwork_categories } from '@/components/PromotionPage/Artwork/Navigation';
import { theme } from '@/styles/theme';
import React from 'react';
import { AxiosError } from 'axios';
import ErrorComponent from '@/components/Error/ErrorComponent';
const NullException=React.lazy(()=>import('@/components/PromotionPage/Artwork/NullException'))
const SkeletonComponent=React.lazy(()=>import('@/components/PromotionPage/SkeletonComponent/SkeletonComponent'))
const ArtworkCard=React.lazy(()=>import('@/components/PromotionPage/Artwork/ArtworkCard'))

interface ErrorResponse {
  error: string;
  path: string;
  status: number;
  timestamp: string;
}

function ArtworkPage() {
  const location = useLocation();
  const categoryId = new URLSearchParams(location.search).get('category');
  const { data, isLoading, error } = useQuery<IArtworksData, AxiosError>(['artwork', 'id'], getArtworkData);
  const category = artwork_categories.find((category) => category.key + '' === categoryId);

  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    if (error) {
      setIsModalOpen(true);
    }
  }, [error]);
  const closeModal = () => {
    setIsModalOpen(false);
    window.location.reload();
  };

  //useMemo를 사용해 별도로 메모리화, 리렌더링 방지 => 동일한 데이터 연산을 반복하지 않을 수 있음
  const postedData = useMemo(() => 
    data?.data?.filter((artwork) => artwork.isPosted) ?? [], 
    [data]
  );
  const filteredData = useMemo(() => 
  category 
    ? postedData.filter((artwork) => 
        artwork.category.toLowerCase() === category.label.toLowerCase()
      )
    : postedData, 
    [category, postedData]
  );

  function ScrollToTop() {
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
    return null;
  }

  if(isLoading) return <div style={{minHeight: '52.6vh'}}>Loading...</div>

  return (
    <>
      <ScrollToTop />
      <Wrapper>
        {data && categoryId === null ? (
          <ArtworkWrapper data-cy='PP_artwork_list'>
            {postedData?.length === 0 || data === null ? (
              <Suspense fallback={<div>Loading...</div>}>
              <div>
              {isModalOpen &&<ErrorComponent error={error} onClose={closeModal}/>}
              <NullException/>
              </div>
              </Suspense>
            ) : (
              <>
                {postedData?.map((artwork) => (
                  <Suspense fallback={
                    <SkeletonComponent
                      key={artwork.id}
                      width="350px"
                      height="350px"
                      borderRadius="8px"
                      margin="0px"
                    />
                  }>
                    <ArtworkCard
                      key={artwork.id} // key 추가
                      id={artwork.id}
                      name={artwork.name}
                      client={artwork.client}
                      mainImg={artwork.mainImg}
                      category={category ? category.label : 'all'}
                    />
                  </Suspense>
                ))}
              </>
            )}
          </ArtworkWrapper>
        ) : (
          <ArtworkWrapper>
            {filteredData?.length === 0 || data === null ? (
              <div>
              {isModalOpen &&<ErrorComponent error={error} onClose={closeModal}/>}
              <NullException/>
              </div>
            ) : (
              <>
                <ScrollToTop />
                {filteredData?.map((artwork) => (
                  <ArtworkCard
                    key={artwork.id} // key 추가
                    id={artwork.id}
                    name={artwork.name}
                    client={artwork.client}
                    mainImg={artwork.mainImg}
                    category={category ? category.label : 'all'}
                  />
                ))}
              </>
            )}
          </ArtworkWrapper>
        )}
      </Wrapper>
    </>
  )
}

export default ArtworkPage;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  min-height: 100vh;
  background-color: ${(props) => props.theme.color.background};
  overflow-x: hidden;

  @media ${theme.media.large_tablet} {
    min-height: auto;
  }
  @media ${theme.media.mobile}{
    width: 100%;
    min-height: 52.6vh;
    align-items: left;
  }
`;

const ArtworkWrapper = styled.div`
  margin-left: 3rem;
  display: flex;
  flex-wrap: wrap;
  grid-gap: 50px;

  @media ${theme.media.large_tablet} {
    overflow: hidden;
  }

  @media ${theme.media.mobile}{
    display: block; // 임시
    grid-gap: 0;
    margin: 0;
    justify-content: center;
    align-items: center;
  }
`;

const Msg = styled.div`
  color: ${(props) => props.theme.color.white.bold};
  font-size: 20px;


  @media ${theme.media.mobile} {
    width: 85vw;
    display: flex;
    justify-content: center;
    font-size: 1.3rem;
  }
`;
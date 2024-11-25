import { useLocation } from 'react-router-dom';
import { IArtworksData } from '@/types/PromotionPage/artwork';
import { useQuery } from 'react-query';
import { getArtworkData } from '@/apis/PromotionPage/artwork';
import styled from 'styled-components';
import { Suspense, useEffect, useMemo } from 'react';
import { artwork_categories } from '@/components/PromotionPage/Artwork/Navigation';
import { theme } from '@/styles/theme';
import React from 'react';
const NullException=React.lazy(()=>import('@/components/PromotionPage/Artwork/NullException'))
const SkeletonComponent=React.lazy(()=>import('@/components/PromotionPage/SkeletonComponent/SkeletonComponent'))
const ArtworkCard=React.lazy(()=>import('@/components/PromotionPage/Artwork/ArtworkCard'))

function ArtworkPage() {
  const location = useLocation();
  const categoryId = new URLSearchParams(location.search).get('category');
  const { data, isLoading, error } = useQuery<IArtworksData, Error>(['artwork', 'id'], getArtworkData);
  const category = artwork_categories.find((category) => category.key + '' === categoryId);

  //useMemo를 사용해 별도로 메모리화, 리렌더링 방지 => 동일한 데이터 연산을 반복하지 않을 수 있음
  // const postedData = data?.data?.filter((artwork) => artwork.isPosted === true) ?? [];
  // const filteredData = category
  //   ? postedData.filter((artwork) => artwork.category.toLowerCase() === category.label.toLocaleLowerCase())
  //   : postedData;
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

  // if (error) return <>{error.message}</>;
  // 나중에 사용자 경험성을 향상한다고 판단되면 넣을 것

  return (
    <>
      <ScrollToTop />
      <Wrapper>
        {data && categoryId === null ? (
          <ArtworkWrapper data-cy='PP_artwork_list'>
            {postedData?.length === 0 || data === null ? (
              <Suspense fallback={<div>Loading...</div>}>
              <NullException />
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
              <NullException />
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
  }

  @media ${theme.media.mobile}{
    display: block; // 임시
    grid-gap: 0;
    margin: 0;
    justify-content: center;
    align-items: center;
  }
`;

import { useLocation } from 'react-router-dom';
import { IArtworksData } from '@/types/PromotionPage/artwork';
import { useQuery } from 'react-query';
import { getArtworkData } from '@/apis/PromotionPage/artwork';
import styled from 'styled-components';
import { useEffect } from 'react';
import { artwork_categories } from '@/components/PromotionPage/Artwork/Navigation';
import ArtworkCard from '@/components/PromotionPage/Artwork/ArtworkCard';
import NullException from '@/components/PromotionPage/Artwork/NullException';
import SkeletonComponent from '@/components/PromotionPage/SkeletonComponent/SkeletonComponent';
import { theme } from '@/styles/theme';

function ArtworkPage() {
  const location = useLocation();
  const categoryId = new URLSearchParams(location.search).get('category');
  const { data, isLoading, error } = useQuery<IArtworksData, Error>(['artwork', 'id'], getArtworkData);
  const category = artwork_categories.find((category) => category.key + '' === categoryId);

  const postedData = data?.data?.filter((artwork) => artwork.isPosted === true) ?? [];
  const dataLength = data?.data?.filter((artwork) => artwork.isPosted === true).length || 6;
  console.log("data length" + dataLength);
  const filteredData = category
    ? postedData.filter((artwork) => artwork.category.toLowerCase() === category.label.toLocaleLowerCase())
    : postedData;

  function ScrollToTop() {
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [location]);
    return null;
  }

  if (isLoading) {
    return (
      <Wrapper>
        <ArtworkWrapper>
          {Array.from({ length: 6 }).map((_, index) => (
            <SkeletonComponent
              key={index}
              width="350px"
              height="350px"
              borderRadius="8px"
              margin="0px"
            />
          ))}
        </ArtworkWrapper>
      </Wrapper>
    );
  }

  if (error) return <>{error.message}</>;

  return (
    <>
      {postedData === null || postedData === undefined ? (
        <>Artwork 데이터가 없습니다.</>
      ) : (
        <>
          <ScrollToTop />
          <Wrapper>
            {data && categoryId === null ? (
              <ArtworkWrapper>
                {postedData?.length === 0 || data === null ? (
                  <NullException />
                ) : (
                  <>
                    {postedData?.map((artwork) => (
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
      )}
    </>
  );
}

export default ArtworkPage;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  min-height: 100vh;
  background-color: ${(props) => props.theme.color.background};

  @media ${theme.media.mobile}{
    width: 100%;
    min-height: fit-content;
    align-items: left;
  }
`;

const ArtworkWrapper = styled.div`
  margin-left: 3rem;
  display: flex;
  flex-wrap: wrap;
  grid-gap: 50px;

  @media ${theme.media.mobile}{
    display: block; // 임시
    grid-gap: 0;
    margin: 0;
    justify-content: center;
    align-items: center;
  }
`;

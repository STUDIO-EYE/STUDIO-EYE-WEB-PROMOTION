import { useLocation } from 'react-router-dom';
import { IArtworksData } from '@/types/PromotionPage/artwork';
import { useQuery } from 'react-query';
import { getArtworkData } from '@/apis/PromotionPage/artwork';
import styled from 'styled-components';
import { useEffect } from 'react';
import { artwork_categories } from '@/components/PromotionPage/Artwork/Navigation';
import ArtworkCard from '@/components/PromotionPage/Artwork/ArtworkCard';
import NullException from '@/components/PromotionPage/Artwork/NullException';
import SkeletonArtworkCardComponent from '@/components/PromotionPage/Artwork/SkeletonArtworkCardComponent';
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
            <SkeletonArtworkCardComponent key={index} />
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
`;

const ArtworkWrapper = styled.div`
  margin-left: 3rem;
  display: flex;
  flex-wrap: wrap;
  // grid-template-columns: repeat(auto-fit,minmax(250px, 1fr));
  grid-gap: 50px;
`;

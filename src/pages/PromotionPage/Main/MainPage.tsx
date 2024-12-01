import React, { useRef, useState, useEffect, useCallback, Suspense, lazy } from 'react';
import { ChakraProvider, Box } from '@chakra-ui/react';
import useWindowSize from '@/hooks/useWindowSize';
import { getArtworkMainData } from '@/apis/PromotionPage/artwork';
import { MIArtworksData } from '@/types/PromotionPage/artwork';
import { useQuery } from 'react-query';
import defaultTopImg from '@/assets/images/PP/defaultTopImg.jpg';
import defaultMainImg from '@/assets/images/PP/defaultMainImg.jpg';
import styled from 'styled-components';
import { ARTWORKLIST_DATA } from '@/constants/introdutionConstants'
import { theme } from '@/styles/theme';

const Top = lazy(() => import('@/components/PromotionPage/Main/Top'));
const Intro = lazy(() => import('@/components/PromotionPage/Main/Intro'));
const ArtworkList = lazy(() => import('@/components/PromotionPage/Main/ArtworkList'));
const Outro = lazy(() => import('@/components/PromotionPage/Main/Outro'));
const Footer = lazy(() => import('@/components/PromotionPage/Footer/Footer'));
const ArtworkSlider = lazy(() => import('@/components/PromotionPage/Main/ArtworkSlider'));

const MainPage = () => {
  const [elementHeight, setElementHeight] = useState(window.innerHeight);
  const [activeIndex, setActiveIndex] = useState(0);
  const { data, isLoading, error } = useQuery<MIArtworksData, Error>(['artwork', 'id'], getArtworkMainData, {
    staleTime: 1000 * 60 * 10, // 10분
  });

  const sectionsRef = useRef<HTMLElement[]>([]);
  const filteredMainData = data?.data ? data.data.filter((i) => i.projectType === 'main') : [];
  const filteredTopData = data?.data ? data.data.filter((i) => i.projectType === 'top') : [];
  const { height } = useWindowSize();

  const scrollToSection = useCallback((index: number) => {
    if (sectionsRef.current[index]) {
      sectionsRef.current[index].scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const index = sectionsRef.current.findIndex(
        (section) =>
          section.offsetTop <= currentScroll + window.innerHeight / 2 &&
          section.offsetTop + section.offsetHeight > currentScroll + window.innerHeight / 2,
      );
      setActiveIndex(index !== -1 ? index : 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sectionsRef]);

  useEffect(() => {
    if (sectionsRef.current && sectionsRef.current[0]) {
      setElementHeight(sectionsRef.current[0].offsetHeight);
    }
  }, [height]);

  if (isLoading) return <>Artowrk is Loading...</>;
  if (error) return <>Artwork Error: {error.message}</>;
  return (
    <>
      <style>{`
        body, html {
          overflow: hidden;

          div {
            &::-webkit-scrollbar {
              display: none;
            }
          }
        }

        @media (max-width: 1500px) {
          div {
            &::-webkit-scrollbar {
              display: none;
            }
          }
        }
      `}</style>
      <div style={{ overflowY: 'scroll', height: '100vh', scrollSnapType: 'y mandatory' }}>
        <ChakraProvider>
          <TopSection>
            {filteredTopData && filteredTopData.length > 0 ? (
              filteredTopData.map((i, index) => <Top key={index} backgroundImg={i.mainImg} />)
            ) : (
              <Top backgroundImg={defaultTopImg} />
            )}
          </TopSection>
          <IntroSection>
            <Intro />
          </IntroSection>
          <ArtworkSection>
            <Box
              w="100%"
              h="100vh"
              scrollSnapType="y mandatory"
              overflowY="scroll"
              sx={{
                '&::-webkit-scrollbar': {
                  display: 'none',
                },
              }}
              css={`
                  @supports (-webkit-touch-callout: none) {
                    height: 100dvh;
                  }

                  @media ${theme.media.mobile} {
                    overflow: hidden;
                    scroll-snap-type: y mandatory;
                  }
                `}
            >
              {isLoading ? (
                <div>데이터 로딩 중...</div>
              ) : height <= 780 ? (
                <ArtworkSlider
                  artworks={filteredMainData.map((item) => ({
                    id: item.id,
                    department: item.department || '',
                    category: item.category || '',
                    name: item.name || ARTWORKLIST_DATA.TITLE,
                    link: item.link || '',
                    client: item.client || ARTWORKLIST_DATA.CLIENT,
                    date: item.date || '',
                    mainImg: item.mainImg || defaultMainImg,
                    responsiveMainImg: item.responsiveMainImg || defaultMainImg,
                    overView: item.overView || ARTWORKLIST_DATA.OVERVIEW,
                    isPosted: item.isPosted ?? true,
                    projectImages: item.projectImages || [],
                  }))}
                />
              ) : filteredMainData && filteredMainData.length > 0 ? (
                filteredMainData.map((item, index) => (
                  <ArtworkList
                    key={item.id}
                    data={{
                      backgroundImg: item.mainImg ? item.mainImg : defaultMainImg,
                      title: item.name ? item.name : ARTWORKLIST_DATA.TITLE,
                      client: item.client ? item.client : ARTWORKLIST_DATA.CLIENT,
                      overview: item.overView ? item.overView : ARTWORKLIST_DATA.OVERVIEW,
                      link: item.link,
                    }}
                    count={filteredMainData.length}
                    scrollToSection={scrollToSection}
                    elementHeight={elementHeight}
                    index={index}
                    ref={(element) => (sectionsRef.current[index] = element as HTMLElement)}
                  />
                ))
              ) : (
                <ArtworkList
                  key={'default'}
                  data={{
                    backgroundImg: defaultMainImg,
                    title: ARTWORKLIST_DATA.TITLE,
                    client: ARTWORKLIST_DATA.CLIENT,
                    overview: ARTWORKLIST_DATA.OVERVIEW,
                  }}
                  count={filteredMainData.length}
                  scrollToSection={scrollToSection}
                  elementHeight={elementHeight}
                  index={0}
                  ref={(element) => (sectionsRef.current[0] = element as HTMLElement)}
                />
              )}
            </Box>
          </ArtworkSection>
          <OutroSection>
            <Outro />
          </OutroSection>
          <FooterkSection>
            <Footer />
          </FooterkSection>
        </ChakraProvider>
      </div>
    </>
  );
};

export default MainPage;

const TopSection = styled.section`
  scroll-snap-align: start;
  min-height: 100dvh;
`;

const IntroSection = styled.section`
  scroll-snap-align: start;
  min-height: 100dvh;
`;

const ArtworkSection = styled.section`
  scroll-snap-align: start;
  min-height: 100dvh;
`;

const OutroSection = styled.section`
  scroll-snap-align: start;
  margin-bottom: 0%;
`;

const FooterkSection = styled.section`
  scroll-snap-align: start;
  @supports (-webkit-touch-callout: none) {
    margin-bottom: 5rem;
    overflow: hidden;
  }
`;
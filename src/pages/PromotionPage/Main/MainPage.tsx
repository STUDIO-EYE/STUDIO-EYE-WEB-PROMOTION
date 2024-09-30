import React, { useRef, useState, useEffect, useCallback } from 'react';
import { ChakraProvider, Box } from '@chakra-ui/react';
import Top from '@/components/PromotionPage/Main/Top';
import Intro from '@/components/PromotionPage/Main/Intro';
import useWindowSize from '@/hooks/useWindowSize';
import ArtworkList from '@/components/PromotionPage/Main/ArtworkList';
import { getArtworkMainData } from '@/apis/PromotionPage/artwork';
import { MIArtworksData } from '@/types/PromotionPage/artwork';
import { useQuery } from 'react-query';
import defaultTopImg from '@/assets/images/PP/defaultTopImg.jpg';
import defaultMainImg from '@/assets/images/PP/defaultMainImg.jpg';
import Outro from '@/components/PromotionPage/Main/Outro';
import styled from 'styled-components';
import Footer from '@/components/PromotionPage/Footer/Footer';
import ArtworkNav from '@/components/PromotionPage/Main/ArtworkNav';

const MainPage = () => {
  const [elementHeight, setElementHeight] = useState(window.innerHeight);
  const [activeIndex, setActiveIndex] = useState(0);
  const { data, isLoading } = useQuery<MIArtworksData>(['artwork', 'id'], getArtworkMainData, {
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

  return (
    <div>안녕하세요?</div>
    // <>
    //   <style>{`
    //     body, html {
    //       overflow: hidden;
    //     }
    //   `}</style>
    //   <div style={{ overflowY: 'scroll', height: '100vh', scrollSnapType: 'y mandatory' }}>
    //     <ChakraProvider>
    //       <TopSection>
    //         {filteredTopData && filteredTopData.length > 0 ? (
    //           filteredTopData.map((i, index) => <Top key={index} backgroundImg={i.mainImg} />)
    //         ) : (
    //           <Top backgroundImg={defaultTopImg} />
    //         )}
    //       </TopSection>
    //       <IntroSection>
    //         <Intro />
    //       </IntroSection>
    //       <ArtworkSection>
    //         <Box
    //           scrollSnapType='y mandatory'
    //           overflowY='scroll'
    //           h='100vh'
    //           sx={{
    //             '&::-webkit-scrollbar': {
    //               display: 'none',
    //             },
    //           }}
    //         >
    //           {isLoading ? (
    //             <div>데이터 로딩 중...</div>
    //           ) : filteredMainData && filteredMainData.length > 0 ? (
    //             filteredMainData.map((item, index) => (
    //               <ArtworkList
    //                 key={item.id}
    //                 data={{
    //                   backgroundImg: item.mainImg ? item.mainImg : '',
    //                   title: item.name ? item.name : '',
    //                   client: item.client ? item.client : '',
    //                   overview: item.overView,
    //                   link: item.link,
    //                 }}
    //                 count={filteredMainData.length}
    //                 scrollToSection={scrollToSection}
    //                 elementHeight={elementHeight}
    //                 index={index}
    //                 ref={(element) => (sectionsRef.current[index] = element as HTMLElement)}
    //               />
    //             ))
    //           ) : (
    //             <ArtworkList
    //               key={'default'}
    //               data={{
    //                 backgroundImg: defaultMainImg,
    //                 title: '절대 떠들면 안 되는 호텔',
    //                 client: '넷플릭스 코리아',
    //                 overview: '설명이 뭐였지',
    //               }}
    //               count={filteredMainData.length}
    //               scrollToSection={scrollToSection}
    //               elementHeight={elementHeight}
    //               index={0}
    //               ref={(element) => (sectionsRef.current[0] = element as HTMLElement)}
    //             />
    //           )}
    //         </Box>
    //       </ArtworkSection>
    //       <OutroSection>
    //         <Outro />
    //         <Footer />
    //       </OutroSection>
    //     </ChakraProvider>
    //   </div>
    // </>
  );
};

export default MainPage;

const TopSection = styled.section`
  scroll-snap-align: start;
`;

const IntroSection = styled.section`
  scroll-snap-align: start;
`;

const ArtworkSection = styled.section`
  scroll-snap-align: start;
`;

const ArtworkNavWrapper = styled.div`
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  right: 3%;
  z-index: 1000;
`;

const OutroSection = styled.section`
  scroll-snap-align: start;
`;

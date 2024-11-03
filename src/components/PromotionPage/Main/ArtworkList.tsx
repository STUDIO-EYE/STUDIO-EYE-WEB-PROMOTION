import React from 'react';
import { Box, BoxProps } from '@chakra-ui/react';
import { motion, Variants } from 'framer-motion';
import styled from 'styled-components';
import defaultMainImg from '@/assets/images/PP/defaultMainImg.jpg';
import ArtworkNav from './ArtworkNav';
import SkeletonComponent from '../SkeletonComponent/SkeletonComponent';
import { theme } from '@/styles/theme';

interface SectionProps {
  elementHeight: number;
  index: number;
  data: {
    backgroundImg: string;
    title: string;
    client: string;
    overview: string;
    link?: string;
  };
  count: number;
  scrollToSection: (index: number) => void;
  isLoading: boolean; // 로딩 상태 추가
}

const ArtworkList = React.forwardRef<HTMLElement, SectionProps>(({ index, data, count, scrollToSection, isLoading }, ref) => {
  const MotionBox = motion<BoxProps>(Box);
  const cardInView: Variants = {
    offscreen: {
      opacity: 0,
    },
    onscreen: {
      opacity: 1,
    },
  };

  return (
    <MotionBox data-cy="artwork-section"
      w="100%"
      h="100vh"
      scrollSnapAlign="center"
      initial="offscreen"
      whileInView="onscreen"
      position="relative"
      viewport={{ once: false, amount: 0.7 }}
      ref={ref}
      backgroundImage={`linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url(${data.backgroundImg || defaultMainImg})`}
      backgroundSize="cover"
      backgroundPosition="center"
    >
      {isLoading ? (
        <SkeletonWrapper>
          {/* Skeleton 컴포넌트를 제목, 클라이언트, 개요 부분에 적용 */}
          <SkeletonComponent width="60%" height="40px" margin="0 0 10px 0" />
          <SkeletonComponent width="80%" height="20px" margin="0 0 10px 0" />
          <SkeletonComponent width="90%" height="20px" />
        </SkeletonWrapper>
      ) : (
        <motion.div variants={cardInView}>
          <TextWrapper>
            <ClientWrapper data-cy="artwork_client">{data.client.length > 30 ? `${data.client.slice(0, 30)}...` : data.client}</ClientWrapper>
            <TitleWrapper data-cy="artwork_name">{data.title.length > 20 ? `${data.title.slice(0, 20)}...` : data.title}</TitleWrapper>
            <OverviewWrapper data-cy="artwork_overview">{data.overview}</OverviewWrapper>
          </TextWrapper>
          <ArtworkNav count={count} scrollToSection={scrollToSection} activeIndex={index} />
        </motion.div>
      )}
      {data.link && (
        <a data-cy='artwork_link'
          href={data.link}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            textDecoration: 'none',
            color: 'inherit',
          }}
        />
      )}
    </MotionBox>
  );
});

export default ArtworkList;

const TextWrapper = styled.div`
  padding: 100px;
  position: relative;
  z-index: 1;

  @media ${theme.media.mobile} {
    width: 100%;
    height: 100%;
    padding: 6rem 1.75rem 0 1rem;
    line-height: 1.2;
  }
`;

const TitleWrapper = styled.div`
  font-family: 'pretendard-bold';
  font-size: 80px;
  color: white;
  white-space: nowrap;
  margin: -1rem 0 -0.5rem -0.2rem;

  @media ${theme.media.mobile} {
    margin: 0.3rem 0;
    margin-left: -0.1rem;
    width: 100%;
    font-size: 1.5rem;
    word-break: keep-all;
  }
`;

const ClientWrapper = styled(motion.h2)`
  font-family: 'pretendard-bold';
  font-size: 25px;
  color: #cccccc;

  @media ${theme.media.mobile} {
    font-size: 0.7rem;
  }
`;

const OverviewWrapper = styled.div`
  font-family: 'pretendard-medium';
  font-size: 20px;
  color: white;

  @media ${theme.media.mobile} {
    font-size: 0.8rem;
    word-break: keep-all;
  }
`;

const SkeletonWrapper = styled.div`
  padding: 100px;
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

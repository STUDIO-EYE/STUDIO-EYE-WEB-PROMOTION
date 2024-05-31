import React from 'react';
import { Box, BoxProps } from '@chakra-ui/react';
import { motion, Variants } from 'framer-motion';
import styled from 'styled-components';
import defaultMainImg from '@/assets/images/PP/defaultMainImg.jpg';
import ArtworkNav from './ArtworkNav';

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
}

const ArtworkList = React.forwardRef<HTMLElement, SectionProps>(({ index, data, count, scrollToSection }, ref) => {
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
    <MotionBox
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
      <motion.div variants={cardInView}>
        <TextWrapper>
          <ClientWrapper>{data.client.length > 30 ? `${data.client.slice(0, 30)}...` : data.client}</ClientWrapper>
          <TitleWrapper>{data.title.length > 20 ? `${data.title.slice(0, 20)}...` : data.title}</TitleWrapper>
          <OverviewWrapper>{data.overview}</OverviewWrapper>
        </TextWrapper>
        <ArtworkNav count={count} scrollToSection={scrollToSection} activeIndex={index} />
      </motion.div>
      {data.link && (
        <a
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
`;

const TitleWrapper = styled.div`
  font-family: 'pretendard-bold';
  font-size: 80px;
  color: white;
  white-space: nowrap;
  margin: -1rem 0 -0.5rem -0.2rem;
`;

const ClientWrapper = styled(motion.h2)`
  font-family: 'pretendard-bold';
  font-size: 25px;
  color: #cccccc;
`;

const OverviewWrapper = styled.div`
  font-family: 'pretendard-medium';
  font-size: 20px;
  color: white;
`;

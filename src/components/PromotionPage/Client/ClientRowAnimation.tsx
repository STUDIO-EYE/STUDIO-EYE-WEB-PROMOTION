import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '@/styles/theme';

type Props = {
  data?: string[];
  isLoading: boolean;
  error: Error | null;
};

const ClientRowAnimation = ({ data, isLoading, error }: Props) => {
  const [repeatedImages, setRepeatedImages] = useState<string[]>([]);

  useEffect(() => {
    if (data && data.length) {
      setRepeatedImages(getRepeatedImages(data));
    }
  }, [data]);

  if (isLoading) {
    return <div>로딩 중</div>;
  }

  if (error) {
    return <div>오류: {error.message}</div>;
  }

  const marqueeVariants = (direction: 'left' | 'right') => {
    const screenWidth = window.innerWidth;
    const xInitial = direction === 'right' ? 0 : -screenWidth;
    const xFinal = direction === 'right' ? -screenWidth : 0;
    return {
      animate: {
        x: [xInitial, xFinal],
        transition: {
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: 30,
            ease: 'linear',
          },
        },
      },
    };
  };

  const getRepeatedImages = (images: string[]): string[] => {
    const minWidth = 235; // 각 이미지의 최소 너비
    const screenWidth = window.innerWidth; // 화면 너비
    const imagesPerScreen = Math.ceil(screenWidth / (minWidth - 30));
    const repeatCount = Math.ceil(imagesPerScreen / images.length) * 5;

    return new Array(repeatCount).fill(images).flat();
  };

  return (
    <Container>
      <MarqueeRow variants={marqueeVariants('right')} animate='animate'>
        {repeatedImages.map((imgUrl, index) => (
          <ImgWrapper key={`right-${index}`}>
            <img src={imgUrl} alt={`clientLogoImg${index}`} />
          </ImgWrapper>
        ))}
      </MarqueeRow>
      <MarqueeRow variants={marqueeVariants('left')} animate='animate'>
        {repeatedImages.map((imgUrl, index) => (
          <ImgWrapper key={`left-${index}`}>
            <img src={imgUrl} alt={`clientLogoImg${index}`} />
          </ImgWrapper>
        ))}
      </MarqueeRow>
    </Container>
  );
};

export default ClientRowAnimation;

const Container = styled.div`
  width: 100%;
  overflow-x: hidden;
  white-space: nowrap;

  @media ${theme.media.mobile} {
    padding: 30px 0 0 0;
  }
`;

const MarqueeRow = styled(motion.div)`
  display: flex;
  width: max-content;
  padding: 30px 0;

  @media ${theme.media.mobile} {
    padding: 10px 0;
  }
`;

const ImgWrapper = styled.div`
  flex: none;
  img {
    width: 235px;
    height: 62px;
    object-fit: contain;
    margin: 0 25px;
  }

  @media ${theme.media.tablet} {
  }

  @media ${theme.media.mobile} {
  }
`;

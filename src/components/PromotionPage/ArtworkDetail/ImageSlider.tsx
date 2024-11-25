import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IProjectImages } from '@/types/PromotionPage/artwork';
import styled from 'styled-components';
import { theme } from '@/styles/theme';

interface IImageSliderProps {
  projectImages: IProjectImages[];
}

function ImageSlider({ projectImages }: IImageSliderProps) {
  const [index, setIndex] = useState(0);

  // 자동 슬라이드를 위한 useEffect
  useEffect(() => {
    if (!projectImages || projectImages.length === 0) return; // projectImages가 없거나 빈 배열이면 아무것도 하지 않음
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % projectImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [projectImages]);

  if (!projectImages || projectImages.length === 0) {
    return <ImgException>이미지가 없습니다.</ImgException>;
  }

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      <AnimatePresence>
        <motion.img
          key={projectImages[index].id}
          src={projectImages[index].imageUrlList}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 1 }}
          style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover' }}
          alt=''
        />
      </AnimatePresence>
      <div style={{ position: 'absolute', bottom: '20px', width: '100%', textAlign: 'center' }}>
        {projectImages.map((_, pageIndex) => (
          <motion.span
            key={pageIndex}
            whileHover={{ scale: 1.5 }}
            style={{
              display: 'inline-block',
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: index === pageIndex ? 'white' : 'gray',
              margin: '0 5px',
              cursor: 'pointer',
            }}
            onClick={() => setIndex(pageIndex)}
          />
        ))}
      </div>
    </div>
  );
}

export default ImageSlider;

const ImgException = styled.div`
  color: ${(props) => props.theme.color.white.bold};
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 20px;
  border: 1px solid ${(props) => props.theme.color.yellow.bold};

  @media ${theme.media.mobile} {
    width: 100%;
    height: auto;
  }
`;

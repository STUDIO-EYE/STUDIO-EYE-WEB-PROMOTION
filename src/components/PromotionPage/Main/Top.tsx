import { motion, useInView } from 'framer-motion';
import React, { Suspense, useRef } from 'react';
import styled from 'styled-components';
import { theme } from '@/styles/theme';

type Props = {
  backgroundImg: string;
};

const Top = ({ backgroundImg }: Props) => {
  const ref = useRef(null);
  const isInView = useInView(ref);

  return (
      <Background data-cy="top-section"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${backgroundImg})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }}
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: isInView ? 1 : 0.9, scale: 1 }}
        transition={{ duration: 1.5 }}
      >
        <SloganWrapper
          ref={ref}
          initial={{ opacity: 0, y: '100%' }}
          animate={{
            opacity: isInView ? 1 : 0,
            y: isInView ? '0%' : '100%',
          }}
          exit={{
            opacity: 0,
            y: '-100%'
          }}
          transition={{ duration: 1 }}
        >
          <NameWrapper data-cy="top_name">
            <span>
              <motion.div
                initial={{ y: '50%' }}
                animate={{ y: isInView ? '0%' : '50%' }}
                exit={{ y: '-50%' }}
                transition={{ duration: 1 }}
              >
                STUDIO
              </motion.div>
            </span>
            <span>
              <motion.div
                initial={{ y: '100%' }}
                animate={{ y: isInView ? '0%' : '100%' }}
                exit={{ y: '-50%' }}
                transition={{ duration: 1, delay: 0.1 }}
              >
                EYE
              </motion.div>
            </span>
          </NameWrapper>
          <BackWrapper data-cy="top_back"
            initial={{ opacity: 0 }}
            animate={{ opacity: isInView ? 1 : 0 }}
            transition={{ duration: 1.5 }}
          >
            NEW MEDIA <br /> CONTENTS GROUP
          </BackWrapper>
        </SloganWrapper>
      </Background>
  );
};

export default Top;

const Background = styled(motion.div)`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  @media ${theme.media.mobile}{
    height: 100dvh;
  }
  @supports (-webkit-touch-callout: none) {
    .modal { /* 넘어가지 않는 요소에 사용 */
        height: -webkit-fill-available;
    }
  }
`;

const SloganWrapper = styled(motion.div)`
  display: flex;
  flex-direction: row;
  align-items: center;

  @media ${theme.media.mobile}{
    width: 100%;
    height: auto;
    align-items: left;
    flex-direction: column;
  }
`;

const BackWrapper = styled(motion.div)`
  font-family: 'pretendard-bold';
  position: relative;
  white-space: nowrap;
  font-size: 20px;
  color: white;
  letter-spacing: -0.02em;

  @media ${theme.media.tablet} {
    font-size: 0.75rem;
  }

  @media ${theme.media.mobile}{
    font-size: 1rem;
    line-height: 1;
    text-align: left;
    width: 100%;
    padding-left: 0.75rem;
  }
`;

const NameWrapper = styled.div`
  font-family: 'pretendard-bold';
  font-size: 150px;
  z-index: 10;
  white-space: nowrap;

  overflow: hidden;
  span {
    display: inline-block;
    overflow: hidden;
  }
  div {
    display: inline-block;
  }
  span:first-child {
    color: white;
  }
  span:last-child {
    color: #ffa900;
  }
  
  @media ${theme.media.tablet} {
    font-size: 6rem;
  }

  @media ${theme.media.mobile}{
    width: 100%;
    font-size: 3rem;
    padding: 0.75rem;
    height: 5rem; // 임시
  }
`;
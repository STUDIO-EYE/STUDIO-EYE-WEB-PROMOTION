import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { getCompanyDetailData } from '@/apis/PromotionAdmin/dataEdit';
import { theme } from '@/styles/theme';
import { useMediaQuery } from 'react-responsive';

interface IWhatWeDoProps {
  isHighlighted: boolean;
}

interface IWhatWeDoInputProps {
  leftInput: boolean;
}

const WhatWeDoPage = () => {
  const isMobile = useMediaQuery({ query: `(max-width: ${theme.mediaSize.mobile}px)` });
  const [companyDetailDataTitle, setCompanyDetailDataTitle] = useState<string[]>([]);
  const [companyDetailData, setCompanyDetailData] = useState<string[]>([]);
  const [highlighted, setHighlighted] = useState<number | null>(null);

  useEffect(() => {
    const fetchCompanyDetailData = async () => {
      try {
        const responseData = await getCompanyDetailData();
        if (responseData) {
          const details = Array.isArray(responseData) ? responseData : [responseData];

          const dataKeys = details.map((detail) => detail.key);
          const dataValues = details.map((detail) => detail.value);

          setCompanyDetailDataTitle(dataKeys);
          setCompanyDetailData(dataValues);
        }
      } catch (error) {
        console.error('데이터 수신 오류:', error);
      }
    };

    fetchCompanyDetailData();
  }, []);

  const { scrollY } = useScroll(); // 스크롤 위치 감지

  useMotionValueEvent(scrollY, 'change', (scrollValue) => {
    const sections = document.querySelectorAll('.WhatWeDo');
    let closestSection = null;
    let closestDistance = Infinity;

    sections.forEach((section, index) => {
      const rect = section.getBoundingClientRect();
      const distanceFromCenter = Math.abs(rect.top + rect.height / 2 - window.innerHeight / 2);
      if (distanceFromCenter < closestDistance) {
        closestDistance = distanceFromCenter;
        closestSection = index;
      }
    });

    setHighlighted(closestSection);
  });

  if (companyDetailData.length === 0) {
    return null; // 데이터 로딩 중이면 아무것도 렌더링하지 않음
  }

  return (
    <Container>
      <WhatWeDoContainer>
        {companyDetailData.map((info, index) => (
          <WhatWeDo
            key={index}
            className='WhatWeDo'
            isHighlighted={highlighted === index}
            style={isMobile ? { left: '10%' } : { left: index % 2 === 0 ? '10%' : '90%' }}
          >
            <WhatWeDoInput leftInput={index % 2 === 0}>
              <Circle />
            </WhatWeDoInput>
            <WhatWeDoTitleInput leftInput={index % 2 !== 0}>
              {companyDetailDataTitle[index].length >= 20 ? `WHAT WE DO ${index + 1}` : companyDetailDataTitle[index]}
            </WhatWeDoTitleInput>
            <WhatWeDoContentInput
              leftInput={index % 2 !== 0}
              dangerouslySetInnerHTML={{ __html: info.replace(/\n/g, '<br/>') }}
            ></WhatWeDoContentInput>
          </WhatWeDo>
        ))}

        <ScrollBar>
          <ScrollBarBox />
        </ScrollBar>
      </WhatWeDoContainer>
    </Container>
  );
};

export default WhatWeDoPage;

const Container = styled.div`
  height: auto;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 6.25rem;
  margin-bottom: 9.375rem;
`;

const WhatWeDoContainer = styled.div`
  position: relative;
  width: 50%;
  height: 100%;
  @media ${theme.media.mobile} {
    width: 100%;
  }
`;

const ScrollBar = styled.div`
  position: absolute;
  top: 0%;
  left: 50%;
  translate: -50%;
  width: 5px;
  height: 100%;
  background-color: #1a1a1a;
  @media ${theme.media.mobile} {
    left: 5%;
    translate: none;
    height: 100%;
  }
`;
const ScrollBarBox = styled(motion.div)`
  position: sticky;
  top: 50%;
  left: 50%;
  translate: -50%;
  width: 5px;
  height: 21.875rem;
  background-color: ${theme.color.white.light};
  z-index: 1000;
  @media ${theme.media.mobile} {
    left: 5%;
    translate: none;
    height: 10rem;
  }
`;
const WhatWeDo = styled(motion.div)<IWhatWeDoProps>`
  position: relative;
  transform: translateX(-50%);
  width: 70%;
  height: auto;
  background-color: transparent;
  padding: 10px;
  margin-top: 3.125rem;
  margin-bottom: 3.125rem;
  transition: all 0.2s;
  opacity: ${({ isHighlighted }) => (isHighlighted ? 1 : 0.2)};
  transition: all 300ms ease-in-out;
  @media ${theme.media.mobile} {
    transform: none;
    width: 70%;
    margin-left: 1rem;
    margin-bottom: 1rem;
    margin-top: 1rem;
  }
`;

const WhatWeDoInput = styled.div<IWhatWeDoInputProps>`
  margin-bottom: 1.25rem;
  display: flex;
  justify-content: ${({ leftInput }) => (leftInput ? 'flex-start' : 'flex-end')};
  @media ${theme.media.mobile} {
    justify-content: flex-end;
    margin-bottom: 0.5rem;
  }
`;
const WhatWeDoTitleInput = styled.div<IWhatWeDoInputProps>`
  margin-bottom: 1.875rem;
  font-family: ${theme.font.semiBold};
  font-size: 3.75rem;
  text-align: ${({ leftInput }) => (leftInput ? 'left' : 'right')};
  word-break: keep-all;
  white-space: normal;
  @media ${theme.media.mobile} {
    margin-bottom: 1rem;
    text-align: left;
    font-size: 1.5rem;
  }
`;
const WhatWeDoContentInput = styled.div<IWhatWeDoInputProps>`
  margin-bottom: 0.5rem;
  font-family: ${theme.font.regular};
  font-size: 1.5rem;
  text-align: ${({ leftInput }) => (leftInput ? 'left' : 'right')};
  word-break: keep-all;
  white-space: normal;
  line-height: 1.5;
  @media ${theme.media.mobile} {
    margin-bottom: 0.1rem;
    text-align: left;
    font-size: 0.8rem;
  }
`;
const Circle = styled.div`
  background-color: #ffa900;
  border-radius: 50%;
  width: 3.125rem;
  height: 3.125rem;
  @media ${theme.media.mobile} {
    width: 1rem;
    height: 1rem;
  }
`;

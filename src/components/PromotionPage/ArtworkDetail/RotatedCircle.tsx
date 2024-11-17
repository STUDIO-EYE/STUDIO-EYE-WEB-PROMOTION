import React, { MouseEvent } from 'react';
import circle from '@/assets/images/PP/circle.png';
import styled from 'styled-components';
import { motion, TargetAndTransition } from 'framer-motion';
import { linkCheck } from '@/components/ValidationRegEx/ValidationRegEx';

type Props = {
  label: string;
  link: string;
};

const RotatedCircle = ({ label, link }: Props) => {
  const rotateAnimation: TargetAndTransition = {
    rotate: [0, 360],
    transition: {
      ease: 'linear',
      duration: 3,
      repeat: Infinity,
      repeatType: 'loop',
    },
  };

  const handleClick=(event:MouseEvent<HTMLAnchorElement>)=>{
    if(!linkCheck(link)){
      event.preventDefault();
      alert('링크가 잘못되었습니다. 관리자에게 문의해주세요.');
    }
  }

  return (
    <Container data-cy='PP_link' href={link} target='_blank' onClick={handleClick}>
      <RotatingWrapper
        animate={rotateAnimation}
        whileHover={{ scale: 0.9 }} // 호버 시 90% 크기로 변경
        transition={{ duration: 0.2 }} // 애니메이션 지속 시간 설정
      >
        <RotatingImage src={circle} alt='circle' />
      </RotatingWrapper>
      <LabelWrapper>{label}</LabelWrapper>
    </Container>
  );
};

export default RotatedCircle;

const Container = styled.a`
  position: relative;
  display: inline-block;
  border-radius: 100%;
  color: ${(props) => props.theme.color.white.bold};
`;

const LabelWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  font-family: 'pretendard-bold';
  font-size: 18px;
`;

const RotatingWrapper = styled(motion.div)`
  display: inline-block;
`;

const RotatingImage = styled(motion.img)`
  cursor: pointer;
  position: relative;
`;

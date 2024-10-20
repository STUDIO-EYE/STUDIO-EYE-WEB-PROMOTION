import React, { useRef } from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import { IRecruitmentList, IBenefit } from '@/types/PromotionAdmin/recruitment';
import { getAllRecruitmentData, getRecruitmentData, getBenefitData } from '../../../apis/PromotionAdmin/recruitment';
import { theme } from '@/styles/theme';
import { useNavigate } from 'react-router-dom'; 
import Circle from '@/components/PromotionPage/Circle/Circle'; 
import { motion, useInView } from 'framer-motion';
import { Link, Element } from 'react-scroll';


const RecruitmentPage = () => {
  const currentPage = 1;
  const RecruitmentsPerPage = 10;
  const navigator = useNavigate();

  const circleRef = useRef(null);
  const circleInView = useInView(circleRef);

  const { data: recruitmentData, isLoading: isRecruitmentLoading, error: recruitmentError } = useQuery<IRecruitmentList, Error>(
    ['recruitmentList'],
    () => getAllRecruitmentData(currentPage, RecruitmentsPerPage),
    { keepPreviousData: true },
  );

  const { data: benefitData, isLoading: isBenefitLoading, error: benefitError } = useQuery<IBenefit[], Error>(
    ['benefit'], getBenefitData, { keepPreviousData: false, staleTime: 0 }
  );

  const handleClickPost = async (id: number, status: string) => {
    if (status === 'OPEN') {
      const recruitment = await getRecruitmentData(id);
      window.location.href = `${recruitment.link}`;
    } else {
      console.log('This position is closed.');
    }
  };

  if (isRecruitmentLoading || isBenefitLoading) {
    return <div>Loading...</div>;
  }

  if (recruitmentError || benefitError) {
    return <div>Error occurred!</div>;
  }

  return (
    <Container>
      {/* 첫 번째 섹션: 채용 페이지 인트로 */}
      <Element name="intro" className="element">
      <IntroSection>
        <IntroTitleWrapper>
          <RecruitText>RECRUIT</RecruitText>
          <IntroLine>
            <IntroText2>WOUL</IntroText2>
            <AnimatedContainer>
            <MovingOAnimated delay="0s">D</MovingOAnimated>
            <MovingOAnimated delay="0.2s">D</MovingOAnimated>
            <MovingOAnimated delay="0.4s">D</MovingOAnimated>
            </AnimatedContainer>
            {/* <IntroHighlight>D</IntroHighlight> */}
            <IntroText> YOU</IntroText>
            <IntroTextClored> LIKE</IntroTextClored>
            <IntroText2> T</IntroText2>
            <AnimatedContainer>
            <MovingOAnimated delay="0s">O</MovingOAnimated>
            <MovingOAnimated delay="0.2s">O</MovingOAnimated>
            <MovingOAnimated delay="0.4s">O</MovingOAnimated>
            </AnimatedContainer>
            {/* <IntroHighlight>O</IntroHighlight> */}
          </IntroLine>
          <IntroLine>
            <IntroText>JOIN</IntroText>
            <IntroTextClored> US?</IntroTextClored>
          </IntroLine>

          <CircleWrapper ref={circleRef} style={{ height: '100px', position: 'relative' }}>
  <motion.div
    initial={{ opacity: 0, y: 100 }}
    animate={{ opacity: circleInView ? 1 : 0, y: circleInView ? 0 : 100 }}
    transition={{ duration: 1, delay: 1 }}
  >
    <a href="https://www.saramin.co.kr/zf_user/company-info/view?csn=cnIrYWJNNm1GRXdyd0dBckJuZXJUUT09" target="_blank" rel="noopener noreferrer">
      <div style={{ color: '#FFA900' }}>
        <Circle label='기업 정보 보기' />
      </div>
    </a>
  </motion.div>
</CircleWrapper>


        </IntroTitleWrapper>
      </IntroSection>
      </Element>

      {/* 두 번째 섹션: 채용 게시판 */}
      <Element name="jobBoard" className="element">
      <JobBoardSection>
  <Header>진행중인 채용공고</Header>
  <PostGrid>
    {recruitmentData?.content.reverse().map((recruitment) => (
      <PostItem
        key={recruitment.id}
        onClick={async () => {
          if (recruitment.status === 'OPEN') {
            const recruitmentData = await getRecruitmentData(recruitment.id);
            window.open(recruitmentData.link, '_blank'); // Open link in a new tab
          } else {
            console.log('This position is closed.');
          }
        }}
      >
        <StatusButton
          isDeadline={recruitment.status === 'CLOSE'}
          isPreparing={recruitment.status === 'PREPARING'}
        >
          {recruitment.status === 'CLOSE' ? '마감' : recruitment.status === 'OPEN' ? '진행' : '예정'}
        </StatusButton>
        <TextWrapper>
          <PostTitle>{recruitment.title}</PostTitle>
        </TextWrapper>
      </PostItem>
    ))}
  </PostGrid>
</JobBoardSection>
</Element>


      {/* 세 번째 섹션: 회사 복지 정보 */}
      <Element name="benefits" className="element">
      <BenefitsSection>
        <BenefitSectionTitle>STUDIOEYE'S  BENEFIT</BenefitSectionTitle>
        <ListWrapper>
          {benefitData?.map((benefit) => (
            <BenefitItem key={benefit.id}
            >
              <BenefitImage src={benefit.imageUrl} alt={benefit.imageFileName} />
              <BenefitTitle>{benefit.title}</BenefitTitle>
              <BenefitContent>{benefit.content}</BenefitContent>
            </BenefitItem>
          ))}
        </ListWrapper>
      </BenefitsSection>
      </Element>
    </Container>
  );
};

// 스타일 컴포넌트들
const Container = styled.div`
  min-height: 100vh;
  overflow-x: hidden;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
  scrollbar-width: none;
  -ms-overflow-style: none;
  background-color: #f5f5f5;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const IntroSection = styled.div`
  min-height: 100vh; 
  scroll-snap-align: start;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const IntroTitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  line-height: 1.1;
`;

const RecruitText = styled.h2`
  font-family: 'Pretendard-Bold';
  font-size: 40px;
  font-weight: bold;
  color: black;
  text-align: center;
  margin-bottom: 20px;
`;

const IntroLine = styled.div`
  display: inline-flex; 
  justify-content: center;
  align-items: center; 
  position: relative; 
`;

const IntroText = styled.span`
  font-family: Pretendard;
  font-weight: 700;
  font-size: 85px;
  color: black;
  margin: 0 25px;
`;

const IntroText2 = styled.span`
  font-family: Pretendard;
  font-weight: 700;
  font-size: 85px;
  color: black;
  margin: 0 10px;
`;

const IntroTextClored = styled.span`
  font-family: 'Pretendard-Bold';
  font-size: 85px;
  color: #FFA900;
  position: relative;
  margin: 0 15px;
`;

const AnimatedContainer = styled.span`
  position: relative;
  display: inline-block;
  width: 85px; // MovingDAnimated, MovingOAnimated의 크기와 맞춤
`;

interface MovingProps {
  delay: string;
}

const MovingOAnimated = styled.span<MovingProps>`
  font-size: 85px;  // IntroText와 크기 맞춤
  font-weight: semi-bold;
  color: #FFA900;
  position: absolute;
  top: -49px; // 필요한 만큼 조정
  left: 0px; // 필요한 만큼 조정
  animation: move-horizontal 0.7s ease-in-out infinite alternate;
  animation-delay: ${(props) => props.delay};

  @keyframes move-horizontal {
    0% {
      transform: translateX(-5px);
    }
    100% {
      transform: translateX(5px);
    }
  }
`;

const JobBoardSection = styled.div`
  min-height: 100vh;
  scroll-snap-align: start;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  padding: 20px;
`;

const Header = styled.h3`
  font-size: 25px;
  color: black;
  margin-bottom: 10px;
  max-width: 1200px;
  width: 100%;
  font-family: 'Pretendard-Regular';
`;

const PostGrid = styled.div`
  width: 100%;
  max-width: 1200px;
  padding: 20px 0;
`;

const PostItem = styled.div`
  width: 100%;
  padding: 20px 0;
  margin-bottom: 10px;
  background-color: white;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease-in-out;
  overflow: hidden;
  height: 60px;

  &:hover {
    height: 90px;
    background-color: #f9f9f9;
  }
`;

const StatusButton = styled.div<{ isDeadline: boolean; isPreparing: boolean }>`
  width: 98px;
  height: 37px;
  border-radius: 20px;
  background-color: ${(props) => {
    if (props.isDeadline) {
      return props.theme.color.black.light;
    } else if (props.isPreparing) {
      return props.theme.color.yellow.light;
    } else {
      return props.theme.color.yellow.bold;
    }
  }};
  color: ${(props) => {
    if (props.isPreparing) {
      return props.theme.color.black.light;
    } else {
      return props.theme.color.white.bold;
    }
  }};
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  margin-right: 20px;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex-grow: 1;
`;

const PostTitle = styled.div`
  font-family: 'Pretendard-Regular';
  font-size: 16px;
  color: black;
  margin-bottom: 5px;
`;

const BenefitsSection = styled.div`
  min-height: 100vh; 
  scroll-snap-align: start;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white; 
  padding: 40px 20px;
`;

const BenefitSectionTitle = styled.h2`
  font-family: 'Pretendard-Bold';
  font-size: 35px;
  font-weight: bold;
  color: #FFA900;
  text-align: center;
  margin-bottom: 40px;
`;

const ListWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); /* Responsive grid layout */
  gap: 20px; /* Spacing between items */
  max-width: 1200px;
  width: 100%;
  padding: 0 20px;
`;

const BenefitItem = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  padding: 20px;
  transition: transform 0.3s, box-shadow 0.3s;
`;

const BenefitImage = styled.img`
  width: 100px;
  height: 100px;
  margin-bottom: 15px;
`;

const BenefitTitle = styled.h3`
  font-family: 'Pretendard-Bold';
  font-size: 20px;
  color: black;
  margin-bottom: 10px;
`;

const BenefitContent = styled.p`
  font-family: 'Pretendard-Regular';
  font-size: 14px;
  color: #555;
  text-align: center;
`;

const CircleWrapper = styled.div`
  margin-top: 50px;
`;

export default RecruitmentPage;

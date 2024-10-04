import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { PROMOTION_BASIC_PATH } from '@/constants/basicPathConstants';
import { GoArrowRight } from "react-icons/go"; // Import arrow icon
import groupImage from '@/assets/images/PP/group.png'; // Importing the group.png image
import Footer from '@/components/PromotionPage/Footer/Footer';


import image26 from '@/assets/images/PP/image26.png'; 
import image27 from '@/assets/images/PP/image27.png'; 
import image28 from '@/assets/images/PP/image28.png'; 
import image29 from '@/assets/images/PP/image29.png'; 
import image30 from '@/assets/images/PP/image30.png'; 
import image31 from '@/assets/images/PP/image31.png'; 
import image32 from '@/assets/images/PP/image32.png'; 
import image33 from '@/assets/images/PP/image33.png'; 
import image34 from '@/assets/images/PP/image34.png'; 
import image35 from '@/assets/images/PP/image35.png'; 
import image36 from '@/assets/images/PP/image36.png'; 
import image37 from '@/assets/images/PP/image37.png'; 
import image38 from '@/assets/images/PP/image38.png'; 
import image39 from '@/assets/images/PP/image39.png'; 
import image40 from '@/assets/images/PP/image40.png'; 

interface PostData {
  id: number;
  title: string;
  content: string;
  status: '진행중' | '마감'; // Added status for job postings
}

const RecruitmentPage = () => {
  const [posts, setPosts] = useState<PostData[]>([
    { id: 1, title: '디지털 콘텐츠 PD 채용', content: '우리는 새로운 인재를 찾고 있습니다...', status: '진행중' },
    { id: 2, title: '유튜브 채널운영 마케터(기획 및 운영)', content: '마케팅 매니저를 모집합니다...', status: '마감' },
    { id: 3, title: '2D 모션그래픽 디자이너 모집', content: '소프트웨어 엔지니어를 모집합니다...', status: '마감' },
  ]);

  const navigate = useNavigate();
  const jobBoardRef = useRef<HTMLDivElement>(null); // Create a ref for the job posting section

  useEffect(() => {
    // axios
      // .get(`${PROMOTION_BASIC_PATH}/api/recruitment?page=0&size=10`)
      // .then((response) => {
      //   setPosts(response.data.data.content); // Assuming the API returns an array of recruitment posts
      // })
      // .catch((error) => {
      //   console.error(error);
      // });
  }, []);

  const handleClickPost = (post: PostData) => {
    //navigate(`/recruitment/${post.id}`);

    if (post.status === '진행중') {
      navigate(`/recruitment/${post.id}`);
      window.location.href = "https://www.saramin.co.kr/zf_user/search?search_area=main&search_done=y&search_optional_item=n&searchType=search&searchword=%EB%94%94%EC%A7%80%ED%84%B8%20%EC%BD%98%ED%85%90%EC%B8%A0"; // Replace with the correct URL for the post
    } else {
      console.log('This position is closed.');
    }
  };

  const handleImageClick = () => {
    window.location.href = "https://www.saramin.co.kr/zf_user/company-info/view?csn=UUtVZHVnRklXRE5zRU1pV3VRVXl3UT09&popup_yn=y";
  };

// Welfare data array
const benefits = [
  { image: image26, description: '생일 축하 지원', detail: '생일 축하 지원금, 휴가 지원' },
  { image: image27, description: '경조사 지원', detail: '경조금, 휴가, 화한 등을 지원'  },
  { image: image28, description: '인재 추천 포상', detail: '추천한 인재가 채용될 시 포상금 지급'  },
  { image: image29, description: '장기근속 포상', detail: '장기 근속 시 포상금 지급'  },
  { image: image30, description: '성과급', detail: '경영성과에 따른 성과급 지급'  },
  { image: image31, description: '유연근무제', detail: '선택적 근무, 탄력적 근무, 재량적 근무'  },
  { image: image32, description: '해피프라이데이', detail: '매달 마지막 주 금요일 오전만 근무'  },
  { image: image33, description: '창립기념일 휴무', detail: '9월 26일 창립일을 기념, 추석연휴 전일을 휴일로 지정'  },
  { image: image34, description: '근로지 휴가 지원 사업', detail: '정부와 기업이 함께 근로자의 휴가비를 지원'  },
  { image: image35, description: '육아휴직', detail: '1년 이내 기간을 정하여 육아휴직 부여'  },
  { image: image36, description: '식대&복지 수당' , detail: '매일 점식 식대, 복지 수당 지원' },
  { image: image37, description: '야근 식대&교통비', detail: '야근 시 식대, 택시비 지원'  },
  { image: image38, description: '명절 선물' , detail: '명절 선물 제공' },
  { image: image39, description: '휴게 시설' , detail: '휴식을 위한 안마의자' },
  { image: image40, description: '스낵바', detail: '다양한 간식과 향긋한 커피 무료 제공'  },
];

  return (
    
    <Container>
      {/* 첫 번째 섹션: 채용 페이지 인트로 */}
  <IntroSection>
    <IntroTitleWrapper>
      <RecruitText>RECRUIT</RecruitText>
      <IntroLine>
        <IntroText>WOUL</IntroText>
        <IntroHighlight>D</IntroHighlight>
        <IntroText> YOU</IntroText>
        <IntroTextClored> LIKE</IntroTextClored>
        <IntroText> T</IntroText>
        <IntroHighlight>O</IntroHighlight>
      </IntroLine>
      <IntroLine>
        <IntroText>JOIN</IntroText>
        <IntroTextClored> US?</IntroTextClored>
      </IntroLine>
      <ImageWrapper onClick={handleImageClick}>
        <img src={groupImage} alt="Group" />
      </ImageWrapper>
    </IntroTitleWrapper>
  </IntroSection>

      {/* 두 번째 섹션: 채용 게시판 */}
      <JobBoardSection ref={jobBoardRef}> {/* Added ref to the job board section */}
        <Header>진행중인 채용공고</Header>
        <PostGrid>
        {posts.map((post) => (
            <PostItem key={post.id} onClick={() => handleClickPost(post)}>
              <StatusButton status={post.status}>{post.status}</StatusButton> {/* Circular status button with text */}
              <TextWrapper>
                <PostTitle>{post.title}</PostTitle>
                <PostStatus>{post.status}</PostStatus>
              </TextWrapper>
              <ArrowIcon> <GoArrowRight /> </ArrowIcon>
            </PostItem>
          ))}
        </PostGrid>
      </JobBoardSection>

      {/* 세 번째 섹션: 회사 복지 정보 */}
      <BenefitsSection>
  <BenefitTitle>STUDIOEYE'S BENEFIT</BenefitTitle>
    <BenefitContent>
      {benefits.map((benefit, index) => (
        <BenefitItem key={index}>
          <BenefitImage src={benefit.image} alt={`Benefit ${index + 1}`} />
          <BenefitDescription>{benefit.description}</BenefitDescription>
          <BenefitDetail>{benefit.detail}</BenefitDetail> {/* Add detailed explanation */}
        </BenefitItem>
      ))}
    </BenefitContent>
  </BenefitsSection>

       <>
            <Footer />
      </> 
    </Container>
  );
};

// 스타일 컴포넌트들
const Container = styled.div`
  height: 100vh;
  overflow-x: hidden;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
  scrollbar-width: none;
  -ms-overflow-style: none;
  background-color: #f5f5f5; /* Match the BenefitsSection background */
  &::-webkit-scrollbar {
    display: none;
  }
`;

const IntroSection = styled.div`
  height: 100vh;
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
  display: flex;
  justify-content: center;
`;

const IntroText = styled.span`
font-family: Pretendard;
font-weight: 700;
font-size: 100px;
color: black;
margin: 0 25px; /* 요소 간의 간격 조정 */
`;

const IntroTextClored = styled.span`
  font-family: 'Pretendard-Bold';
  font-size: 100px;
  color: #FFA900;
  position: relative;
  margin: 0 15px;
`;

const IntroHighlight = styled.span`
  font-family: Pretendard;
  font-weight: 700;
  font-size: 100px;
  color: #FFA900;
  position: relative;
  margin: 0 0px; /* 간격 조정 */
  animation: move-horizontal 0.7s ease-in-out infinite alternate;
  
  @keyframes move-horizontal {
    0% {
      transform: translateX(-5px);
    }
    100% {
      transform: translateX(5px);
    }
  }
`;

const ImageWrapper = styled.div`
  margin-top: 40px;
  display: flex;
  justify-content: center;
  cursor: pointer; /* Make the image clickable */
  img {
    max-width: 600px;
    width: 100%;
    height: auto;
  }
`;

const JobBoardSection = styled.div`
  height: 100vh;
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

// Circular status button
const StatusButton = styled.div<{ status: '진행중' | '마감' }>`
  width: 98px; /* Oval width */
  height: 37px; /* Oval height */
  border-radius: 20px; /* Oval shape */
  background-color: ${({ status }) => (status === '진행중' ? '#F8A90D' : '#777777')}; /* Status color */
  color: white; 
  display: flex;
  justify-content: center; 
  align-items: center; 
  font-weight: bold; 
  margin-right: 10px; 
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex-grow: 1; /* Allow it to take the remaining space */
`;

const PostTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: black;
  transition: color 0.3s ease-in-out;
  font-family: 'Pretendard-Medium';
`;

const PostStatus = styled.p`
  font-size: 16px;
  color: #555;
  display: none;
  font-family: 'Pretendard-Bold';
`;

const ArrowIcon = styled.div`
  font-size: 30px;
  color: #ff530e;
  display: none;
  margin-left: auto;
  align-self: center;
`;
const BenefitsSection = styled.div`
  height: 100vh;
  width: 100vw;
  scroll-snap-align: start;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
  padding: 20px;
  margin: 0 auto;
  transform: scale(0.9); /* Shrink all elements inside by 90% */
  transform-origin: center; /* Scale from the center */
`;



const BenefitTitle = styled.h1`
  font-size: 48px;
  font-weight: bold;
  color: #FFA900;
  margin-bottom: 100px;
`;

const BenefitContent = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: auto;
  gap: 30px;
  max-width: 1200px;
  width: 100%;
`;

const BenefitItem = styled.div`
  text-align: center;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.1); /* Enlarges on hover */
  }
`;

const BenefitImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin-bottom: 20px;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1); /* Enlarges on hover */
  }
`;

const BenefitDescription = styled.p`
  font-size: 20px;
  color: black;
  font-family: 'Pretendard-Bold';
  margin-bottom:  20px; /* 사이 간격 조정 */
`;

const BenefitDetail = styled.p`
  font-size: 16px; 
  color: #6B6B6B;
  font-family: 'Pretendard-SemiBold';
  max-width: 200px; /* 고정된 가로 크기 */
  word-wrap: break-word; /* 단어가 너무 길면 줄바꿈 */
  white-space: normal; /* 텍스트가 두 줄 이상일 때 줄바꿈 허용 */
  margin-top: -10px; /* 원래 스타일 유지 */
  text-align: center; /* 중앙 정렬 */
`;


export default RecruitmentPage;

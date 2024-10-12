import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import { IRecruitmentList, IRecruitment, IBenefit } from '@/types/PromotionAdmin/recruitment';
import { getAllRecruitmentData, getRecruitmentData, getBenefitData } from '../../../apis/PromotionAdmin/recruitment';
import { useNavigate } from 'react-router-dom';
import groupImage from '@/assets/images/PP/group.png'; // Importing the group.png image
//import Footer from '@/components/PromotionPage/Footer/Footer';

const RecruitmentPage = () => {
  const currentPage = 1;
  const RecruitmentsPerPage = 10;
  const navigator = useNavigate();

  const {
    data: recruitmentData,
    isLoading: isRecruitmentLoading,
    error: recruitmentError,
  } = useQuery<IRecruitmentList, Error>(
    ['recruitmentList'],
    () => getAllRecruitmentData(currentPage, RecruitmentsPerPage),
    {
      keepPreviousData: true,
    },
  );

  const {
    data: benefitData,
    isLoading: isBenefitLoading,
    error: benefitError,
  } = useQuery<IBenefit[], Error>(['benefit'], getBenefitData, {
    keepPreviousData: false,
    staleTime: 0,
  });

  // const [posts, setPosts] = useState<PostData[]>([
  //   { id: 1, title: '디지털 콘텐츠 PD 채용', content: '우리는 새로운 인재를 찾고 있습니다...', status: '진행중' },
  //   { id: 2, title: '유튜브 채널운영 마케터(기획 및 운영)', content: '마케팅 매니저를 모집합니다...', status: '마감' },
  //   { id: 3, title: '2D 모션그래픽 디자이너 모집', content: '소프트웨어 엔지니어를 모집합니다...', status: '마감' },
  // ]);

  // const navigate = useNavigate();
  // const jobBoardRef = useRef<HTMLDivElement>(null); // Create a ref for the job posting section

  // useEffect(() => {
  // axios
  // .get(`${PROMOTION_BASIC_PATH}/api/recruitment?page=0&size=10`)
  // .then((response) => {
  //   setPosts(response.data.data.content); // Assuming the API returns an array of recruitment posts
  // })
  // .catch((error) => {
  //   console.error(error);
  // });
  // }, []);

  const handleClickPost = async (id: number, status: string) => {
    if (status === 'OPEN') {
      const recruitment = await getRecruitmentData(id);
      window.location.href = `${recruitment.link}`;
    } else {
      console.log('This position is closed.');
    }
  };

  const handleImageClick = () => {
    window.location.href =
      'https://www.saramin.co.kr/zf_user/company-info/view?csn=UUtVZHVnRklXRE5zRU1pV3VRVXl3UT09&popup_yn=y';
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
            <img src={groupImage} alt='Group' />
          </ImageWrapper>
        </IntroTitleWrapper>
      </IntroSection>
      {/* 두 번째 섹션: 채용 게시판 */}
      <JobBoardSection>
        <Header>진행중인 채용공고</Header>
        <PostGrid>
          {recruitmentData?.content.reverse().map((recruitment) => (
            <PostItem key={recruitment.id} onClick={() => handleClickPost(recruitment.id, recruitment.status)}>
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
      {/* 세 번째 섹션: 회사 복지 정보 */}
      <BenefitsSection>
        <BenefitSectionTitle>STUDIOEYE'S BENEFIT</BenefitSectionTitle>
        <ListWrapper>
          {benefitData?.map((benefit) => (
            <BenefitItem key={benefit.id}>
              <BenefitImage src={benefit.imageUrl} alt={benefit.imageFileName} />
              <BenefitTitle>{benefit.title}</BenefitTitle>
              <BenefitContent>{benefit.content}</BenefitContent>
            </BenefitItem>
          ))}
        </ListWrapper>
      </BenefitsSection>
      {/* <>
            <Footer />
      </>  */}
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
  background-color: #f5f5f5;
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

const PostTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: black;
  transition: color 0.3s ease-in-out;
  font-family: 'Pretendard-Medium';
`;

const BenefitsSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${(props) => props.theme.color.white.light};
  height: 100vh;
  width: 100%;
  scroll-snap-align: start;
  padding-top: 80px;
  margin: 0;
`;

const BenefitSectionTitle = styled.h1`
  font-size: 48px;
  font-weight: bold;
  color: #ffa900;
  margin-bottom: 100px;
`;

const ListWrapper = styled.div`
  width: 80%;
  height: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 20px;
  gap: 20px;
`;

const BenefitItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: none;
  padding: 1rem;
  border-radius: 8px;
  background-color: ${(props) => props.theme.color.white.light};
  width: 15rem;
  margin: 0;
  cursor: default;
  height: auto;
  overflow: hidden;
`;

const BenefitImage = styled.img`
  width: 50%;
  height: auto;
  object-fit: cover;
  margin-bottom: 1.25rem;
`;

const BenefitTitle = styled.h3`
  font-family: ${(props) => props.theme.font.bold};
  color: ${(props) => props.theme.color.black.bold};
  font-size: 1.2rem;
  margin-bottom: 1rem;
  width: 100%;
  text-align: center;
`;

const BenefitContent = styled.p`
  font-family: ${(props) => props.theme.font.regular};
  color: ${(props) => props.theme.color.black.light};
  font-size: 16px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;
  width: 70%;
  text-align: center;
  line-height: 1.3;
  white-space: normal;
`;

export default RecruitmentPage;

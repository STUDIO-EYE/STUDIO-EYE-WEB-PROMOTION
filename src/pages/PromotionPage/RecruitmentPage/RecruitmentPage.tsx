import React from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import { IRecruitmentList, IBenefit } from '@/types/PromotionAdmin/recruitment';
import { getAllRecruitmentData, getRecruitmentData, getBenefitData } from '../../../apis/PromotionAdmin/recruitment';
import groupImage from '@/assets/images/PP/group.png';
import { theme } from '@/styles/theme';

const RecruitmentPage = () => {
  const currentPage = 1;
  const RecruitmentsPerPage = 10;

  const {
    data: recruitmentData,
    isLoading: isRecruitmentLoading,
    error: recruitmentError,
  } = useQuery<IRecruitmentList, Error>(
    ['recruitmentList'],
    () => getAllRecruitmentData(currentPage, RecruitmentsPerPage),
    { keepPreviousData: true },
  );

  const {
    data: benefitData,
    isLoading: isBenefitLoading,
    error: benefitError,
  } = useQuery<IBenefit[], Error>(['benefit'], getBenefitData, { keepPreviousData: false, staleTime: 0 });

  const handleClickPost = async (id: number, status: string) => {
    if (status === 'OPEN') {
      const recruitment = await getRecruitmentData(id);
      window.location.href = `${recruitment.link}`;
    } else {
      console.log('This recruitment is closed.');
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
            <AnimatedD>
              <span>D</span>
              <span>D</span>D
            </AnimatedD>
            <IntroText> YOU</IntroText>
            <IntroTextClored> LIKE</IntroTextClored>
            <IntroText> T</IntroText>
            <AnimatedO>
              <span>O</span>
              <span>O</span>O
            </AnimatedO>
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
        <PostGrid>
          <Header>진행중인 채용공고</Header>
          <Content>
            {recruitmentData?.content.slice(0, 5).map((recruitment) => (
              <PostItem
                isOpen={recruitment.status === 'OPEN'}
                key={recruitment.id}
                onClick={() => handleClickPost(recruitment.id, recruitment.status)}
              >
                <StatusButtonWrapper>
                  <StatusButton
                    isDeadline={recruitment.status === 'CLOSE'}
                    isPreparing={recruitment.status === 'PREPARING'}
                  >
                    {recruitment.status === 'CLOSE' ? '마감' : recruitment.status === 'OPEN' ? '진행' : '예정'}
                  </StatusButton>
                </StatusButtonWrapper>
                <TextWrapper>
                  <PostTitle>{recruitment.title}</PostTitle>
                </TextWrapper>
              </PostItem>
            ))}
          </Content>
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
    </Container>
  );
};

const Container = styled.div`
  height: auto;
  display: flex;
  flex-direction: column;
  background-color: ${theme.color.white.light};
`;

const IntroSection = styled.div`
  background-color: ${theme.color.white.light};
  display: flex;
  justify-content: center;
  margin-top: 15rem;
`;

const IntroTitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  line-height: 1.1;
`;

const RecruitText = styled.h2`
  font-family: ${theme.font.bold};
  font-size: clamp(1.5rem, 2vw, 2.5rem);
  color: black;
  text-align: center;
  margin-bottom: 1rem;
`;

const IntroLine = styled.div`
  display: inline-block;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const IntroText = styled.span`
  font-family: ${theme.font.bold};
  font-size: clamp(1.8rem, 5vw, 6.25rem);
  color: black;
`;

const IntroTextClored = styled.span`
  font-family: ${theme.font.bold};
  font-size: clamp(1.8rem, 5vw, 6.25rem);
  color: #ffa900;
`;

const AnimatedD = styled.span`
  position: relative;
  font-family: ${theme.font.thin};
  font-size: clamp(1.8rem, 5vw, 6.25rem);
  color: #ffa900;

  span {
    position: absolute;
    opacity: 0.8;

    &:nth-child(1) {
      animation: moveLeftD 2s infinite ease-in-out;
    }
    &:nth-child(2) {
      animation: moveRightD 2s infinite ease-in-out;
    }
  }

  @keyframes moveLeftD {
    0% {
      opacity: 1;
      transform: translate(0, 0);
    }
    50% {
      opacity: 0.5;
      transform: translate(-1vw, -1vw);
    }
    100% {
      opacity: 1;
      transform: translate(0, 0);
    }
  }

  @keyframes moveRightD {
    0% {
      opacity: 1;
      transform: translate(0, 0);
    }
    50% {
      opacity: 0.5;
      transform: translate(1vw, 1vw);
    }
    100% {
      opacity: 1;
      transform: translate(0, 0);
    }
  }
`;

const AnimatedO = styled.span`
  position: relative;
  font-family: ${theme.font.thin};
  font-size: clamp(1.8rem, 5vw, 6.25rem);
  color: #ffa900;

  span {
    position: absolute;
    opacity: 0.8;

    &:nth-child(1) {
      animation: moveLeftO 2s infinite ease-in-out;
    }
    &:nth-child(2) {
      animation: moveRightO 2s infinite ease-in-out;
    }
  }

  @keyframes moveLeftO {
    0% {
      opacity: 1;
      transform: translate(0, 0);
    }
    50% {
      opacity: 0.5;
      transform: translate(1vw, -1vw);
    }
    100% {
      opacity: 1;
      transform: translate(0, 0);
    }
  }

  @keyframes moveRightO {
    0% {
      opacity: 1;
      transform: translate(0, 0);
    }
    50% {
      opacity: 0.5;
      transform: translate(-1vw, 1vw);
    }
    100% {
      opacity: 1;
      transform: translate(0, 0);
    }
  }
`;

const ImageWrapper = styled.div`
  margin-top: 2.5rem;
  display: flex;
  justify-content: center;
  cursor: pointer;
  img {
    width: clamp(8rem, 13vw, 20rem);
  }
`;

const JobBoardSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  padding: 20px;
  margin-top: 10rem;
  @media ${theme.media.large_tablet} {
    margin-top: 5rem;
  }
  @media ${theme.media.mobile} {
    margin-top: 2rem;
  }
`;

const PostGrid = styled.div`
  width: 100%;
  max-width: 75rem;
  padding: 1rem;
`;

const Header = styled.h3`
  font-size: clamp(0.8rem, 3vw, 1.6rem);
  color: black;
  margin-bottom: 1rem;
  width: 100%;
  font-family: ${theme.font.medium};

  @media ${theme.media.large_tablet} {
    margin-bottom: 0.5rem;
  }
`;

const Content = styled.div`
  border-top: 1.5px solid black;
  border-bottom: 1.5px solid black;
`;

const PostItem = styled.div<{ isOpen: boolean }>`
  width: 100%;
  padding: 1.25rem 0;
  background-color: ${theme.color.white.light};
  border-top: 1px solid #ccc;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  transition: all 0.3s ease-in-out;
  overflow: hidden;
  height: auto;
  min-height: 3.5rem;
  transform: scale(1);
  cursor: ${(props) => (props.isOpen ? 'pointer' : 'default')};

  &:hover {
    background-color: ${(props) => (props.isOpen ? '#f9f9f9' : theme.color.white.light)};
    transform: ${(props) => (props.isOpen ? 'scale(1.02)' : 'scale(1)')};
  }
`;

const StatusButtonWrapper = styled.div``;

const StatusButton = styled.div<{ isDeadline: boolean; isPreparing: boolean }>`
  width: clamp(2.5rem, 5vw, 6rem);
  height: auto;
  padding: 0.5rem;
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
  text-align: center;
  margin-right: 1rem;
  font-size: clamp(0.8rem, 1vw, 1.5rem);
  font-family: ${theme.font.medium};
`;

const TextWrapper = styled.div``;

const PostTitle = styled.h2`
  font-size: clamp(1rem, 2vw, 1.5rem);
  color: black;
  transition: color 0.3s ease-in-out;
  font-family: ${theme.font.semiBold};
`;

const BenefitsSection = styled.div`
  scroll-snap-align: start;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.color.white.light};
  width: 100%;
  margin-top: 10rem;
`;

const BenefitSectionTitle = styled.h1`
  font-size: clamp(1.5rem, 5vw, 3rem);
  font-family: ${theme.font.bold};
  color: #ffa900;
  margin-bottom: 5rem;
`;

const ListWrapper = styled.div`
  width: 85%;
  height: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 1rem;
  gap: 0.5rem;
  @media ${theme.media.large_tablet} {
    width: 90%;
  }
  @media ${theme.media.tablet} {
    width: 100%;
  }
  @media ${theme.media.mobile} {
    width: 100%;
  }
`;

const BenefitItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 8px;
  line-height: 1.1;
  background-color: ${(props) => props.theme.color.white.light};
  width: clamp(11rem, 15vw, 20rem);
  margin: 0;
  margin-bottom: 2rem;
  cursor: default;
  height: auto;
  overflow: hidden;

  @media ${theme.media.mobile} {
    width: clamp(11rem, 15vw, 20rem);
  }
`;

const BenefitImage = styled.img`
  width: 6.25rem;
  height: 6.25rem;
  margin-bottom: 1rem;
`;

const BenefitTitle = styled.h3`
  font-family: ${(props) => props.theme.font.bold};
  color: ${(props) => props.theme.color.black.bold};
  font-size: clamp(0.8rem, 1vw, 1.2rem);
  margin-bottom: 0.5rem;
  width: 100%;
  min-height: 1rem;
  line-height: 1.3;
  text-align: center;
`;

const BenefitContent = styled.p`
  font-family: ${(props) => props.theme.font.regular};
  color: ${(props) => props.theme.color.black.light};
  font-size: clamp(0.7rem, 0.9vw, 1rem);
  width: 95%;
  min-height: 2rem;
  text-align: center;
  line-height: 1.3;
  white-space: normal;
  word-break: keep-all;
  overflow-wrap: break-word;
`;

export default RecruitmentPage;

import { useLocation, useMatch, useNavigate } from 'react-router-dom';
import { PP_ROUTES_CHILD } from '@/constants/routerConstants';
import styled from 'styled-components';
import { IArtwork, IArtworksData } from '@/types/PromotionPage/artwork';
import { useQuery } from 'react-query';
import { getArtworkData } from '@/apis/PromotionPage/artwork';
import { motion, useTransform, useScroll } from 'framer-motion';
import ScrollAnimatedComponent from '@/components/PromotionPage/ArtworkDetail/ScrollAnimatedComponent';
import RotatedCircle from '@/components/PromotionPage/ArtworkDetail/RotatedCircle';
import ImageSlider from '@/components/PromotionPage/ArtworkDetail/ImageSlider';
import { NavWrapper } from '@/components/PromotionPage/ArtworkDetail/Components';
import { useEffect, useState } from 'react';

import { ReactComponent as PrevArrowIcon } from '@/assets/images/PP/leftArrow.svg';
import { ReactComponent as NextArrowIcon } from '@/assets/images/PP/rightArrow.svg';
import { artwork_categories } from '@/components/PromotionPage/Artwork/Navigation';
import { theme } from '@/styles/theme';

function ArtworkDetailPage() {
  const navigator = useNavigate();
  const artworkDetailMatch = useMatch(`${PP_ROUTES_CHILD.ARTWORK}/:id`);
  const { data, isLoading } = useQuery<IArtworksData>(['artwork', 'id'], getArtworkData);
  const [filteredData,setFilteredData]=useState<IArtwork[]>([])
  const{state:{category}}= useLocation();

  const clickedArtwork =
    artworkDetailMatch?.params.id && data?.data.find((artwork) => String(artwork.id) === artworkDetailMatch.params.id);
  useEffect(()=>{
    if(data){
      if(category!=="all"){
        setFilteredData(data.data.filter((d)=>{return d.category===category && d.isPosted===true}))
      }
      else{
        setFilteredData(data.data.filter((d)=>{return d.isPosted===true}))
        console.log(filteredData)
      }
    }
  },[])

  // animation
  const { scrollYProgress } = useScroll();
  const x = useTransform(scrollYProgress, (v) => v * -100);
  const translateX = useTransform(scrollYProgress, (v) => v * 200);

  // navigation
  const dataLength = filteredData?filteredData.length : 0;
  const artworkIndex = Number(artworkDetailMatch?.params.id);
  const currentIndex = filteredData ? filteredData.findIndex((artwork) => artwork.id === artworkIndex) : 0;
  console.log(currentIndex)
  const prevIndex = filteredData && currentIndex === 0 ? null : filteredData[currentIndex - 1]?.id;
  const nextIndex = filteredData && currentIndex === dataLength - 1 ? null : filteredData[currentIndex + 1]?.id;

  function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]); // pathname이 변경될 때마다 실행

    return null;
  }

  function formatDate(date:string) {
    const d=Date.parse(date)
    const parsedDate=new Date(d)
    const year = parsedDate.getFullYear();
    const month = String(parsedDate.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
    const day = String(parsedDate.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
}

  return (
    <>
      {isLoading ? (
        <div> is Loading... </div>
      ) : (
        <>
          {clickedArtwork && (
            <>
              <ScrollToTop />
              <Wrapper>
                <Thumbnail bgPhoto={clickedArtwork.mainImg} bgMobilePhoto={clickedArtwork.responsiveMainImg}>
                  {clickedArtwork.name.length>40
                  ?<LongTitle>{clickedArtwork.name}</LongTitle>
                  :<Title>{clickedArtwork.name}</Title>
                  }
                  
                  <InfoWrapper>
                    <Info
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{
                        ease: 'easeInOut',
                        duration: 1,
                        y: { duration: 1 },
                      }}
                    >
                      <p className='attribute'>Client</p> <p>{clickedArtwork.client}</p>
                    </Info>
                    <Info
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{
                        ease: 'easeInOut',
                        duration: 2,
                        y: { duration: 2 },
                      }}
                    >
                      <p className='attribute'>Category</p> <p>{clickedArtwork.category}</p>
                    </Info>
                    <Info
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{
                        ease: 'easeInOut',
                        duration: 3,
                        y: { duration: 3 },
                      }}
                    >
                      <p className='attribute'>Date</p> <p>{formatDate(clickedArtwork.date)}</p>
                    </Info>
                  </InfoWrapper>
                </Thumbnail>
                <OverviewWrapper>
                  <Overview1 style={{ x }} drag='x' dragSnapToOrigin>
                    OVERVIEW
                  </Overview1>
                  <ScrollAnimatedComponent article={clickedArtwork.overView} />
                  <Overview2 style={{ translateX }} drag='x' dragSnapToOrigin>
                    OVERVIEW
                  </Overview2>
                </OverviewWrapper>
                <ContentWrapper>
                  <Img>
                    <ImageSlider projectImages={clickedArtwork?.projectImages} />
                  </Img>
                  <Content>
                    <p>
                      Do you want to see the project?
                    </p>
                    <CircleWrapper>
                      <RotatedCircle label='WATCH' link={clickedArtwork.link} />
                    </CircleWrapper>
                  </Content>
                </ContentWrapper>

                {isLoading ? (
                  <div>is Loading... </div>
                ) : (
                  <>
                    {currentIndex === 0 ? null : (
                      <NavWrapper
                        onClick={() => {
                          navigator(`/${PP_ROUTES_CHILD.ARTWORK}/${prevIndex}`,{state:{category}});
                        }}
                      >
                        <PrevArrowIcon width={70} height={70} />
                        <Nav location={"left"}>
                          PREV PROJECT
                          <div className='nav_title' style={{whiteSpace:"nowrap",textOverflow:"ellipsis",overflow : "hidden"}}>
                            {filteredData[currentIndex - 1]?.name}</div>
                        </Nav>
                      </NavWrapper>
                    )}

                    {currentIndex === dataLength - 1 ? null : (
                      <NavWrapper
                        onClick={() => {
                          navigator(`/${PP_ROUTES_CHILD.ARTWORK}/${nextIndex}`,{state:{category}});
                        }}
                      >
                        <Nav location={"right"}>
                          NEXT PROJECT
                          <div className='nav_title' style={{whiteSpace:"nowrap",textOverflow:"ellipsis",overflow : "hidden"}}>
                            {filteredData[currentIndex + 1]?.name}</div>
                        </Nav>
                        <NextArrowIcon width={70} height={70} />
                      </NavWrapper>
                    )}

                    <List
                      onClick={() => {
                        if(category==="all"){
                          navigator(`/${PP_ROUTES_CHILD.ARTWORK}`);
                        }else{
                          const key=artwork_categories.find((c) => c.label + '' === category);
                          navigator(`/${PP_ROUTES_CHILD.ARTWORK}?category=${key?.key}`)
                        }
                      }}
                    >
                      LIST
                    </List>
                  </>
                )}
              </Wrapper>
            </>
          )}
        </>
      )}
    </>
  );
}

export default ArtworkDetailPage;

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.color.black.bold};
  height: max-content;

  @media ${theme.media.mobile} {
    width: 100vw;
    height: auto;
  }
`;

const Thumbnail = styled.div<{ bgPhoto: string, bgMobilePhoto: string }>`
  z-index: 99;
  position: relative;
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px;
  background-size: cover;
  background-image: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.4)), url(${(props) => props.bgPhoto});
  @media ${theme.media.mobile}{
    background-image: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.4)), url(${(props) => props.bgMobilePhoto});
  }
`;

const Title = styled.div`
  font-size: 80px;
  font-weight: 800;
  font-family: ${(props) => props.theme.font.bold};
  color: ${(props) => props.theme.color.white.bold};
`;
const LongTitle = styled.div`
  font-size: 30px;
  font-weight: 800;
  font-family: ${(props) => props.theme.font.bold};
  color: ${(props) => props.theme.color.white.bold};
  transition: 2s;

  @media (min-width: 70rem) {
    font-size: 60px;
  }
`;

const InfoWrapper = styled.div`
  color: ${(props) => props.theme.color.white.bold};
  font-size: 20px;
  position: absolute;
  bottom: 50px;
  left: 50px;
`;

const Info = styled(motion.div)`
  display: flex;
  height: 40px;
  font-family: ${(props) => props.theme.font.light};

  .attribute {
    width: 130px;
    font-family: ${(props) => props.theme.font.bold};
  }
`;

const OverviewWrapper = styled(motion.div)`
  position: relative;
  min-height: 65vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 26px;
  font-family: ${(props) => props.theme.font.bold};
  color: ${(props) => props.theme.color.white.bold};
  background-color: ${(props) => props.theme.color.black.bold};
`;
const Overview1 = styled(motion.div)`
  position: absolute;
  font-size: 180px;
  font-weight: 900;
  top: -40px;
  right: 0px;
  color: rgba(255, 255, 255, 0.026);
`;

const Overview2 = styled(motion.div)`
  position: absolute;
  font-size: 180px;
  font-weight: 900;
  bottom: -50px;
  left: 0px;
  color: rgba(255, 255, 255, 0.026);
`;

const ContentWrapper = styled.div`
  display: flex;
  height: 55vh;

  @media ${theme.media.mobile} {
    flex-direction: column;
    width: 100%;
    height: 100vh;
  }
`;

const Img = styled.div`
  width: 47vw;

  @media ${theme.media.mobile} {
    width: 100%;
    height: auto;
    flex-grow: 1;
  }
`;

const Content = styled.div`
  position: relative;
  width: 53vw;
  color: ${(props) => props.theme.color.white.bold};
  font-family: ${(props) => props.theme.font.semiBold};

  p {
    display: flex;
    justify-content: center;
    font-size: 40px;
    padding-top: 50px;
    padding-bottom: 50px;
    margin: 0 2rem;
  }
  span {
    color: ${(props) => props.theme.color.yellow.bold};
  }

  @media ${theme.media.mobile} {
    width: 100%;
    p {
      font-size: 2rem;
      margin: 0 3rem;
      text-align: center;
    }
  }
`;

const CircleWrapper = styled.div`
  display: flex;
  justify-content: center;
  
  @media ${theme.media.mobile} {
    width: 100vw;
    height: auto;
    margin-bottom: 3rem;
  }
`;

const Nav = styled.div<{location:string}>`
  width: 70%;
  text-align: ${(props)=>props.location==="left"?"right":"left"};
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow : hidden;
  font-size: 15px;
  color: ${(props) => props.theme.color.black.light};
  .nav_title {
    color: ${(props) => props.theme.color.yellow.bold};
    font-size: 56px;
    font-weight: 900;
    padding-top: 10px;
    font-family: ${(props) => props.theme.font.bold};
  }
  &:hover {
  }

  @media ${theme.media.mobile} {
    width: 100%;
  }
`;

const List = styled.div`
  cursor: pointer;
  padding: 0 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  font-weight: 500;
  height: 100px;
  color: ${(props) => props.theme.color.black.bold};
  border-bottom: 1px solid ${(props) => props.theme.color.black.bold};
  background-color: ${(props) => props.theme.color.white.bold};

  @media ${theme.media.mobile} {
    font-size: 1.5rem;
  }
`;

import React, { useRef } from "react";
import Body from "../../components/Common/Body";
import styled, { keyframes } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import MainAnimation from "../MainPage/MainAnimation";
import DetailTransition from "../../components/Common/DetailTransition";
import YouTube from "react-youtube";

//지금은 안쓰는 임시 js 파일
const VideoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-right: 50px;
    
    
`;
const StyledYouTube = styled(YouTube)`
    width: 50%;
    height: width*0.6;

`;
const ProjTitle = styled.div`
    font-size: 40px;
    font-weight: 800;
`;
const BasicInfo = styled.div`
    width: 40%;
    margin-left: 30px;
`;
const ProductionTeam = styled.div`
    margin-top: 50px;
`;
const MainSection = styled.div`
    width: 100%; 
    height: 500px;
    background-color: #D9D9D9;
    border-radius: 252px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 20px;
`;
const DetailSection = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 30px;
`;
const DetailBox = styled.div`
    text-align: center;
    width: 30%;
    border-radius: 140px;
    background-color: #D9D9D9;
    margin: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    
`;
const DetailTitle = styled.div`
    margin-top: 50px;
    font-size: 40px;
    font-weight: 600;
`
const DetailContent = styled.div`
    margin-top: 20px;
    font-size: 20px;
    width: 70%;
    margin-bottom: 30px;
`

const DetailPage = () => {
    const options = {
        width: "640",
        height: "360",
        playerVars: {
            autoplay: 0, // 자동 재생
            controls: 1, // 재생 컨트롤 표시
        },
    };
    return (
        <Body>
            {/* <DetailTransition/> */}
            <AnimatePresence />
            <MainSection>
                <BasicInfo>
                    <ProjTitle>
                        똑똑! 보이는 백과사전
                    </ProjTitle>
                    <ProductionTeam>
                        제작 : 제작2실(스아)
                    </ProductionTeam>
                    <ProductionTeam>
                        2023.3
                    </ProductionTeam>
                </BasicInfo>
                <VideoWrapper>
                    <YouTube videoId="bcOO4bu7Alc" opts={options} />
                </VideoWrapper>
            </MainSection>
            <DetailSection>
                <DetailBox><DetailTitle>Category</DetailTitle><DetailContent>Entertainment</DetailContent></DetailBox>
                <DetailBox><DetailTitle>Client</DetailTitle><DetailContent>(주)엘지유플러스</DetailContent></DetailBox>
                <DetailBox><DetailTitle>Overview</DetailTitle><DetailContent>개그맨 황제성이 출연해 다양한 소재에 대한 궁금증을 해결하기 위해 백과사전 속으로 떠나는 탐험!
                    DK백과사전 기반 필수 지식을 알기 쉽고 재미있게 풀어낸 어린이 지식 충전 예능 콘텐츠</DetailContent></DetailBox>
            </DetailSection>
        </Body>


    )
}

export default DetailPage;
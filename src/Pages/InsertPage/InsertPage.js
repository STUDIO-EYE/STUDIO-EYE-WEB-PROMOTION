import React from "react";
import styled from "styled-components";
import Body from "../../components/Common/Body";
import { motion, Variants } from "framer-motion";

const MainBody = styled.div`
    display : flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    background-color: black;
    height: 110vh;
`;

const Video = styled.video`
    width: 80vw;
`;



const InsertPage = () => {

    return (
        <>
            <MainBody>
                <Video src="/videos/text_2.mp4" autoPlay muted />
            </MainBody>
        </>
    )
}

export default InsertPage;
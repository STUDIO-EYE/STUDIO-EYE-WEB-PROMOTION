import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import Body from "../../components/Common/Body";
import PortfolioGrid from "./PortfolioGrid";
import { motion, useScroll, useSpring } from "framer-motion";
import MainLogoAnimation from "./MainLogoAnimation";
import MainCEO from "./MainCEO";
import MainContents from "./MainContents";
import MainLogoSlider from "./MainLogoSlider";
import MainAbout from "./MainAbout";

const ProgressBar = styled(motion.div)`
  position: fixed;
  bottom: 50px;
  left: 0;
  right: 0;
  height: 10px;
  background-color: gray;
`;

const LogoContainer = styled.div`
  height: 100vh;
  display: flex;
  background-color: white;
`;

const PromotionMainpage = () => {
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const PromotionMainpageContent = () => {
    return (
      <>
        {/* <LogoContainer>
                    <MainLogoAnimation />
                </LogoContainer>
                <PortfolioGrid />
                <ProgressBar style={{ scaleX }}></ProgressBar> */}
        <MainAbout />
        <MainContents />
        <MainCEO />
        <MainLogoSlider />
      </>
    );
  };

  return (
    <Body>
      <PromotionMainpageContent />
    </Body>
  );
};
export default PromotionMainpage;

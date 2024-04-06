import React, { useEffect } from "react";
import styled from "styled-components";
import Body from "../../components/Common/Body";
import BasicInfoGrid from "./BasicInfoGrid";
import CoOpInfoGrid from "./CoOpInfoGrid";
import MissionGrid from "./MissionGrid";

const AboutMainpage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const AboutMainpageContent = () => {
    return (
      <>
        <BasicInfoGrid />
        <MissionGrid />
        <CoOpInfoGrid />
      </>
    );
  };

  return (
    <Body>
      <AboutMainpageContent />
    </Body>
  );
};
export default AboutMainpage;

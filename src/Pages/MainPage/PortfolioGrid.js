import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { motion, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import LetterAnimation from "../../components/Common/LetterAnimation";
import axios from "axios";

const ArrowImg = styled.img`
  width: 60px;
  height: 30px;
  position: relative;
  display: flex;
  margin-left: 50px;
`;

const Section = styled(motion.div)`
  display: flex;
  /* scroll-snap-align: center; */
  /* perspective: 500px; */
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 10vh;
  /* margin-left: 30px; */
`;

const VideoSection = styled(motion.div)`
  padding-top: 10px;
  /* height: 100vh; */
  display: flex;
  /* padding-left: 100px; */
  width: 100%;
  /* justify-content: space-between; */
`;
const infovariants = {
  hidden: { opacity: 0, x: 20 }, // Initial state (hidden)
  visible: { opacity: 1, x: 0 }, // Animate to this state (visible)
};
const thumbnailvariants = {
  hidden: { opacity: 0, x: -20 }, // Initial state (hidden)
  visible: { opacity: 1, x: 0 }, // Animate to this state (visible)
};
const Featuredprojects = styled.div`
  text-align: center;
  font-size: 30px;
  font-weight: bold;
`;
const ThumbnailImage = styled(motion.img)`
  width: 100%;
  border-radius: 20px;
  margin-bottom: 20px;
`;
const Year = styled(motion.div)`
  font-size: 90px;
  font-weight: bold;
  margin-top: 20px;
  margin-left: 80px;
`;
const BasicInfo = styled(motion.div)`
  width: 80%;
  margin-left: 50px;
  font-size: 25px;
`;
const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const NumThumbnail = styled(motion.h2)`
  margin: 0;
  color: var(--accent);
  left: calc(50% + 130px);
  font-size: 56px;
  font-weight: 700;
  letter-spacing: -3px;
  line-height: 1.2;
  position: absolute;
`;

//back 연결시 orchestration 적용 stagger
const PortfolioGrid = () => {
  // const [ref, inView] = useInView(); // Hook to detect when Year is in view
  const [ref2, inView2] = useInView(); // Hook to detect when Year is in view
  const [ref3, inView3] = useInView(); // Hook to detect when Year is in view
  const { ref, inView } = useInView({
    threshold: 0.2,
    // triggerOnce: true,
  });
  const [data, setData] = useState([]);
  const [imgData, setImgData] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/projects`)
      .then((response) => {
        const data = response.data;
        console.log(data);
        const objects = [];
        const imgObjects = [];

        for (let i = 0; i < 5; i++) {
          const obj = {
            id: data.data[i].id,
            overView: data.data[i].overView,
            img: data.data[i].imageUrlList[0],
          };
          for (let j = 0; j < data.data[i].imageUrlList.length; j++) {
            const ImgObj = {
              ImgId: data.data[i].id,
              title: data.data[i].title,
            };

            imgObjects.push(obj);
          }

          objects.push(obj);
        }
        setImgData(imgObjects);
        setData(objects);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <Section ref={ref}>
        <Featuredprojects>
          <LetterAnimation text="Our Projects"></LetterAnimation>
        </Featuredprojects>

        {data.map((item, i) => (
          <VideoSection>
            <Link to={`/detail/${item.id}`}>
              <ThumbnailImage
                variants={thumbnailvariants}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                transition={{ duration: 1 }}
                src={item.img}
              />
            </Link>
            {/* <InfoContainer> */}
            <BasicInfo
              variants={infovariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              transition={{ duration: 1 }}
            >
              {item.overView}
            </BasicInfo>
            {/* <ArrowImg src={Arrow} /> */}
            {/* </InfoContainer> */}
          </VideoSection>
        ))}
      </Section>
    </>
  );
};

export default PortfolioGrid;

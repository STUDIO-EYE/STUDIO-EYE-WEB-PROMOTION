import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Body from "../../components/Common/Body";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MainIMG from "../../assets/images/MainIMG.png";

const BoxContainer = styled(motion.div)`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: #f3f4f8;
  position: relative;
`;
const Background = styled.div<{ mainWidth: number }>`
  position: absolute;
  bottom: 0;
  background: linear-gradient(
      to bottom,
      rgba(243, 244, 248, 1),
      rgba(243, 244, 248, 0.5)
    ),
    url(${MainIMG});
  background-position: bottom center;
  background-size: cover;
  width: ${(props) => props.mainWidth}px;
  aspect-ratio: 1442 / 450;
  z-index: 0;
`;
const Text = styled.text`
  font-size: 54px;
  font-weight: 750;
  color: #ff530e;
  letter-spacing: 2px;
  margin-top: 100px;
  margin-bottom: 50px;
  text-align: center;
`;
const Client = styled.text`
  font-size: 1rem;
  white-space: nowrap; /* 텍스트를 한 줄로 제한합니다. */
  overflow: hidden; /* 넘치는 부분을 감춥니다. */
  text-overflow: ellipsis; /* 넘치는 부분에 '...'을 표시합니다. */
`;
const Title = styled.text`
  margin-top: 0.5rem;
  font-size: 1.5rem;
  font-weight: 600;
`;

const ContContainer = styled(motion.div)`
  justify-content: center;
  margin-top: 5vh;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  z-index: 2;
`;
const Div = styled.div`
  width: 29%;
  margin-left: 2%;
  margin-right: 2%;
  margin-bottom: 5vh;
  margin-top: 2vh;
  min-width: 300px;
`;
const Content = styled(motion.img)`
  width: 100%;
  aspect-ratio: 1024 / 720;
  cursor: pointer;
`;

const CategoryVariants = {
  animate: { opacity: 1, transition: { duration: 2 } },
  initial: { opacity: 0 },
};

const ArtworkMainpage = () => {
  const ArtworkMainpageContent = () => {
    const [data, setData] = useState([]);
    const contContainerRef = useRef(null);
    const [mainWidth, setMainWidth] = useState(0);
    const [testData, setTestData] = useState();

    const navigate = useNavigate();

    const goToDetail = (id: number) => {
      navigate(`/detail/${id}`);
    };

    useEffect(() => {
      axios
        .get(`http://3.35.54.100:8080/api/projects`)

        .then((response) => {
          const data = response.data;
          console.log("dkjhkfhgkfhgkjhfg", data);
          const objects: any = [];

          for (let i = data.data.length - 1; i >= 0; i--) {
            const obj = {
              id: data.data[i].id,
              title: data.data[i].name,
              client: data.data[i].client,
              img: data.data[i].imageUrlList[0],
            };
            objects.push(obj);
          }
          setData(objects);
          setTestData(data.message);
        })
        .catch((error) => {
          console.error(error);
        });
    }, []);
    useEffect(() => {
      // 화면 크기확인
      const handleResize = () => {
        const screenWidth = window.innerWidth;
        if (screenWidth > 1440) {
          setMainWidth(1440);
        } else {
          setMainWidth(screenWidth);
        }
      };

      // 초기 로드와 화면 크기 변경 시에도 적용
      handleResize();
      window.addEventListener("resize", handleResize);

      // 컴포넌트 언마운트 시 리스너 해제
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []);

    return (
      <>
        <BoxContainer>
          <Text>CONTENTS</Text>
          <ContContainer
            variants={CategoryVariants}
            initial="initial"
            animate="animate"
            ref={contContainerRef}
          >
            {testData}
            {data.map((item: any, i) => (
              <Div>
                <Content
                  onClick={() => goToDetail(item.id)}
                  key={item.id}
                  src={item.img}
                />
                <div>
                  <Client>{item.client}</Client>
                </div>
                <Title>{item.title}</Title>
              </Div>
            ))}
            {/*{contentToDisplay}*/}
          </ContContainer>
          <Background mainWidth={mainWidth} />
        </BoxContainer>
      </>
    );
  };

  return (
    <Body>
      <ArtworkMainpageContent />
    </Body>
  );
};
export default ArtworkMainpage;

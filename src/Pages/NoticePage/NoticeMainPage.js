import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Body from "../../components/Common/Body";
import { motion } from "framer-motion";
import axios from "axios";
import Accordion from "react-bootstrap/Accordion";
import MyAccordion from "./Components/MyAccordion";

const BoxContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: white;
`;

const Text = styled(motion.text)`
  font-size: 4rem;
  font-weight: 600;
  margin-bottom: 2rem;
`;
const FaQContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: white;
  border: 1px solid red;
  width: 100%;
  height: 70rem;
  margin-top: 2rem;
`;

const Title = styled(motion.div)`
  font-size: 2rem;
  border: 1px solid black;
  width: 98%;
`;

const Accordions = styled(Accordion)`
  font-size: 2rem;
`;
const AccordionItem = styled(Accordion.Item)`
  font-size: 2rem;
`;
const AccordionHeader = styled(Accordion.Header)`
  border: 1px solid blue;
  font-size: 3rem;
  width: 100%;
`;
const AccordionBody = styled(Accordion.Body)`
  border: 1px solid pink;
`;

const NoticeMainpage = () => {
  const NoticeMainpageContent = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
      axios
        .get(`/api/notice-board`)

        .then((response) => {
          const data = response.data;
          console.log(data);
          console.log(data.data[0]);
          const objects = [];

          for (let i = 0; i < data.data.length; i++) {
            const obj = {
              id: data.data[i].id,
              imageUrl: data.data[i].imageUrl,
              title: data.data[i].title,
            };
            console.log("여기");
            console.log(obj);
            objects.push(obj);
          }
          setData(objects);
        })
        .catch((error) => {
          console.error(error);
        });
    }, []);

    return (
      <>
        <BoxContainer>
          <Text>notice</Text>
          {data.map((item, i) => (
            <MyAccordion
              index={i + 1}
              title={item.title}
              contents={item.imageUrl}
            />
          ))}
        </BoxContainer>
      </>
    );
  };

  return (
    <Body>
      <NoticeMainpageContent />
    </Body>
  );
};
export default NoticeMainpage;

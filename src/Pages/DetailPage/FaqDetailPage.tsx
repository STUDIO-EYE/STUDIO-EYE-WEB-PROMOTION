import React, { useEffect, useState } from "react";
import Body from "../../Components/Common/Body";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  // align-items: center;
  justify-content: center;
`;
const Label = styled.label`
  font-size: 30px;
  font-weight: 750;
  color: #ff530e;
  letter-spacing: 2px;
  margin-top: 100px;
  padding-left: 100px;
`;

const Title = styled.div`
  font-size: 54px;
  font-weight: 700;
  color: #000000;
  letter-spacing: 2px;
  margin-top: 50px;
  margin-bottom: 100px;
  padding-left: 100px;
`;
const SubContent = styled.div`
  font-size: 23px;
  font-weight: 500;
  color: #303030;
  white-space: pre-line;
  margin-bottom: 100px;
  padding-left: 100px;
`;

const FaqDetailPage = () => {
  const { detailId } = useParams();
  const [data, setData] = useState({ id: "", title: "", content: "" });

  useEffect(() => {
    axios
      .get(`http://3.35.54.100:8080/api/faq/${detailId}`)
      .then((response) => {
        const data = response.data;
        const object = {
          id: data.data.id,
          title: data.data.title,
          content: data.data.content,
        };
        setData(object);
        console.log("detailPage data : ", data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <Body>
      <Wrapper>
        <Label>FAQ</Label>
        <Title>{data.title}</Title>
        <SubContent>{data.content}</SubContent>
      </Wrapper>
    </Body>
  );
};

export default FaqDetailPage;

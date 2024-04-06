import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Body from "../../Components/Common/Body";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { FaSearch } from "react-icons/fa";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Title = styled.div`
  font-size: 54px;
  font-weight: 750;
  color: #ff530e;
  letter-spacing: 2px;
  margin-top: 100px;
  margin-bottom: 50px;
  text-align: center;
`;
const SubTitle = styled.div`
  font-size: 25px;
  font-weight: bold;
  color: #ffa900;
  margin-bottom: 7px;
`;
const SubContent = styled.div`
  font-size: 23px;
  font-weight: bold;
  color: black;
  white-space: pre-line;
  text-align: center;
  margin-bottom: 20px;
`;
const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  height: 50px;
  border: 1px solid black;
  border-radius: 30px;
  background-color: #eaeaea;
  padding-left: 15px;
  padding-right: 15px;
`;
const InputWrapper = styled.div`
  margin-top: 100px;
  display: flex;
  width: 80%;
  flex-direction: column;
`;
const FaqList = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const FaqDetailTitle = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: #000000;
  margin-bottom: 10px;
`;
const FaqDetailContent = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #000000;
`;
const Label = styled.label`
  margin-bottom: 20px;
  padding-left: 15px;
  font-weight: bold;
  font-size: 18px;
  color: black;
`;
const SearchFaqTitle = styled.input`
  all: unset;
  outline: none;
  align-content: center;
  height: 50px;
  width: 100%;
  font-size: 20px;
  line-height: 30px;
  font-weight: bold;
  overflow-wrap: break-word;
`;
const SearchButton = styled(motion.button)`
  background-color: transparent;
  border: none;
  color: #ffa900;
  cursor: pointer;
  &:hover {
    color: #ffffff;
  }
`;
const FaqDetailButton = styled(motion.button)`
  width: 270px;
  height: 270px;
  margin: 10px;
  margin-bottom: 0px;
  margin-top: 5px;
  background-color: #d5d5d5;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #eaeaea;
  }
  padding: 10px;
  text-align: justify;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const ShowAllFaqButton = styled(motion.button)`
  width: 400px;
  height: 40px;
  margin: 5px;
  background-color: #eaeaea;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  &:hover {
    background-color: #f6f6f6;
  }
  margin-bottom: 50px;
  margin-top: 30px;
  font-size: 20px;
`;

const FaqPage = (e: any) => {
  const [data, setData] = useState([]);
  const [faqTitle, setFaqTitle] = useState("");
  const [showAllFaq, setShowAllFaq] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://3.35.54.100:8080/api/faq`)
      .then((response) => {
        const data = response.data;
        console.log("faq Data : ", data);
        const objects: any = [];

        for (let i = data.data.length - 1; i >= 0; i--) {
          const obj = {
            id: data.data[i].id,
            title: data.data[i].title,
            content: data.data[i].content,
          };
          objects.push(obj);
        }
        setData(objects);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleTextAreaDataChange = (e: any) => {
    setFaqTitle(e.target.value);
  };
  const handleSearch = () => {
    console.log("Button clicked!");
  };
  const goToDetail = (id: number) => {
    navigate(`/faq/detail/${id}`);
  };
  const handleShowAllFaq = () => {
    setShowAllFaq(!showAllFaq);
  };

  return (
    <Body>
      <Wrapper>
        <Title>FAQ</Title>
        <SubContent>
          이곳에 자주 묻는 질문들에 대한 답변을 모아 놓았어요.
        </SubContent>
        <InputWrapper>
          <Label>자주 묻는 질문 검색</Label>
          <SearchWrapper>
            {faqTitle === "" ? (
              <SearchFaqTitle
                placeholder="검색 예시: 컨텐츠 문의, 회사 위치 등"
                autoComplete="off"
                name="searchingfaqtitle"
                value={faqTitle}
                onChange={handleTextAreaDataChange}
              />
            ) : (
              <>
                <SearchFaqTitle
                  autoComplete="off"
                  name="searchingfaqtitle"
                  onChange={handleTextAreaDataChange}
                />{" "}
                <SearchButton
                  whileHover={{ scale: 1.04 }}
                  transition={{ ease: "easeInOut", stiffness: 200, damping: 5 }}
                  onClick={handleSearch}
                >
                  <FaSearch size={24} />
                </SearchButton>
              </>
            )}
          </SearchWrapper>
        </InputWrapper>
        <InputWrapper>
          <FaqList>
            {data
              .slice(0, showAllFaq === false ? 4 : undefined)
              .map((item: any) => (
                <FaqDetailButton
                  key={item.id}
                  whileHover={{ scale: 1.04 }}
                  transition={{ ease: "easeInOut", stiffness: 200, damping: 5 }}
                  onClick={() => goToDetail(item.id)}
                >
                  <FaqDetailTitle>{item.title}</FaqDetailTitle>
                  <FaqDetailContent>
                    {item.content.length >= 100
                      ? item.content.substring(0, 70) + "..."
                      : item.content}
                  </FaqDetailContent>
                </FaqDetailButton>
              ))}
          </FaqList>
        </InputWrapper>
        <ShowAllFaqButton
          whileHover={{ scale: 1.04 }}
          transition={{ ease: "easeInOut", stiffness: 200, damping: 5 }}
          onClick={handleShowAllFaq}
        >
          <SubTitle>모두 보기</SubTitle>
        </ShowAllFaqButton>
      </Wrapper>
    </Body>
  );
};

export default FaqPage;

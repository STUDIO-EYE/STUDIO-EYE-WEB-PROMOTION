import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Body from "../../components/Common/Body";
import { motion } from "framer-motion";
import axios from "axios";
import Modal from "./Components/Modal";
import Select from "react-select";

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
const address =
  "서울시 성동구 광나루로 162 BS성수타워 5F \n 5F, 162, Gwangnaru-ro, Seondong-gu, Seoul, Korea";
const MapButton = styled.button`
  color: #ff530e;
  border: none;
  /* padding: 10px 20px; */
  font-size: 16px;
  font-weight: 100;
  cursor: pointer;
  background: transparent;
  margin-left: 20px;
  margin-top: 12px;
`;
const MapLink = styled.a``;
// const categories = [
//     'Entertainment',
//     'Drama',
//     'Documentary',
//     'Channel Operating',
//     'Branded',
//     'Motion Graphic',
//     'Animation',
//     'Live Commerce',
// ];

const categories = [
  { value: "Entertainment", label: "Entertainment" },
  { value: "Drama", label: "Drama" },
  { value: "Documentary", label: "Documentary" },
  { value: "Channel Operating", label: "Channel Operating" },
  { value: "Branded", label: "Branded" },
  { value: "Motion Graphic", label: "Motion Graphic" },
  { value: "Animation", label: "Animation" },
  { value: "Live Commerce", label: "Live Commerce" },
];

const StyledSelect = styled(Select)`
  .Select__control {
    height: 40px;
    width: 260px;
    border: none;
    border-bottom: 1px solid #c8c9cc;
    border-radius: 0;
    outline: none;
    font-weight: bold;
    font-size: 19px;
    /* padding-left: 15px;  */
    cursor: pointer;
    background-color: #f3f4f8;
  }
  .Select__value-container {
    /* background-color: #F3F4F8; */
  }
  .Select__control:hover {
    /* border-color: #a1a1a1; */
    border-color: rgb(255, 169, 0, 0.3);
  }
  .Select__control--is-focused {
    border: none;
    outline: none;
    box-shadow: 0px 1px #c8c9cc;
  }

  .Select__menu--is-open {
    border-color: transparent;
    box-shadow: none;
  }
  .Select__singleValue {
    background-color: red;
  }

  .Select__indicator-separator {
    display: none;
  }

  .Select__menu {
    /* color: rgb(255, 169, 0, 0.8); */
    /* background-color: rgb(255, 169, 0, 0.8); */
    width: 260px;
  }
  .select__menu-list {
    /* background-color: red; */
  }
  .Select__option {
    height: 40px;
    display: "flex";
    align-items: "center";
    padding: 9px 0px 9px 15px;
    background-color: rgb(255, 169, 0, 0.4);
    &--is-selected {
      color: black;
      background-color: rgb(255, 169, 0, 1);
      font-weight: bold;
    }
    &--is-focused {
      box-shadow: none;
      background-color: rgb(255, 169, 0, 1);
    }
  }
`;
const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  /* max-width: 900px;  */
  margin: 0 auto; // 가운데 정렬을 위한 마진 추가
`;
const RowWrapper = styled.div<{ map: boolean }>`
  display: flex;
  ${(props) => (props.map ? "gap: 0px;" : "gap: 80px;")};
  align-items: center;
`;
// const StyledSelect = styled.select`
//     border: none;
//     border-bottom: 1px solid #C8C9CC;
//     outline: none;
//     padding: 10px;
//     width: 250px;
//     font-weight: bold;
//     font-size: 18px;
// `;
const UnderlinedInput = styled.input`
  border: none;
  border-bottom: 1px solid #c8c9cc;
  outline: none;
  padding-bottom: 5px;
  padding-left: 10px;
  margin-bottom: 10px;
  width: 250px;
  font-size: 18px;
  font-weight: 500;
  background-color: #f3f4f8;
`;

const InputWrapper = styled.div`
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
`;
const Label = styled.label`
  margin-bottom: 10px;
  font-weight: bold;
  font-size: 18px;
  color: #6a6b6d;
  opacity: 0.8;
`;
const UnderlinedTextarea = styled.textarea`
  all: unset;
  resize: none;
  border: none;
  border-bottom: 1px solid #c8c9cc;
  outline: none;
  margin-bottom: 16px;
  width: 100%;
  height: 30px;
  font-size: 18px;
  overflow: hidden;
  line-height: 30px;
  font-weight: 500;
  display: block;
  /* padding-left: 10px; */
  overflow-wrap: break-word;
`;
const SubmitButton = styled(motion.button)`
  border: 1.5px solid #ffa900;
  width: 120px;
  height: 40px;
  background-color: transparent;
  color: #ffa900;
  font-size: 19px;
  font-weight: bold;
  margin-left: auto;
  margin-bottom: 100px;
  cursor: pointer;
  &:hover {
    background-color: #ffa900;
    color: #ffffff;
  }
`;
const InputFileContainer = styled.div`
  display: flex;
  /* margin-top: 5px; */
  margin-bottom: 50px;
  width: 100%;
`;

const FileUploadContainer = styled.div``;
const FileText = styled.input`
  width: 250px;
  background-color: #f3f4f8;
  font-size: 18px;
  height: 30px;
  line-height: 26px;
  text-indent: 5px;
  border: none;
  border-bottom: 1px solid #c8c9cc;
`;

const FileLabel = styled.label`
  display: inline-block;
  min-width: 48px;
  height: 30px;
  line-height: 30px;
  padding: 0 10px;
  border-radius: 20px;
  font-size: 16px;
  background-color: #ffa900;
  color: #fff;
  text-align: center;
  margin-left: 8px;
  cursor: pointer;
`;

const FileUploadInput = styled.input.attrs({ type: "file" })`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0 none;
`;

interface IFormData {
  category: string;
  clientName: string;
  organization: string;
  email: string;
  contact: string;
  description: string;
  position: string;
}

const ContactPage = (e: any) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => setIsModalOpen(false);
  const [fileList, setFileList] = useState<File[]>([]);
  const FileTextRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState<IFormData>({
    category: "Entertainment",
    clientName: "",
    organization: "",
    email: "",
    contact: "",
    description: "",
    position: "default",
  });
  const emailCheck = (email: any) => {
    const emailRegEx =
      /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
    if (!emailRegEx.test(email)) {
      alert("이메일 형식이 올바르지 않습니다. 다시 입력해주세요.");
      return false;
    }
    return true; //형식에 맞을 경우, true 리턴
  };
  const telCheck = (tel: any) => {
    const telRegEx = /^[0-9\b -]{0,13}$/;
    if (!telRegEx.test(tel)) {
      alert("연락처 형식이 올바르지 않습니다. 다시 입력해주세요.");
      return false;
    }
    return true; //형식에 맞을 경우, true 리턴
  };

  const handleDataChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCategoryChange = (e: any) => {
    setFormData({
      ...formData,
      category: e.value,
    });
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles) {
      setFileList([...fileList, ...Array.from(selectedFiles)]);
      if (selectedFiles.length > 0) {
        const fileNames = Array.from(selectedFiles)
          .map((file) => file.name)
          .join(", ");
        if (FileTextRef.current) {
          FileTextRef.current.value = fileNames;
        }
      } else {
        if (FileTextRef.current) {
          FileTextRef.current.value = "";
        }
      }
    }
  };
  // textarea 입력값에 따른 높이 조절
  const handleTextAreaDataChange = (e: any) => {
    if (textareaRef && textareaRef.current) {
      // textareaRef.current.style.height = "0px";
      // const scrollHeight = textareaRef.current.scrollHeight;
      // textareaRef.current.style.height = scrollHeight + "px";
    }
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const emptyData: any = {
      organization: "소속",
      email: "이메일 주소",
      clientName: "이름",
      contact: "연락처",
      description: "프로젝트 내용",
    };
    for (const key in formData) {
      // if (formData[key] === "") {
      //   alert(`${emptyData[key]}을(를) 작성해주세요!`);
      //   return;
      // }
    }
    // 유효성 검사
    const isValidEmail = emailCheck(formData.email);
    const isValidTel = telCheck(formData.contact);

    // 이메일 형식이 올바르지 않으면 더 이상 처리하지 않고 종료
    if (!isValidEmail) {
      return;
    }
    if (!isValidTel) {
      return;
    }

    //5초 후 홈으로 이동 setTimeout할지말지
    const requestData = new FormData();
    requestData.append(
      "request",
      new Blob([JSON.stringify(formData)], { type: "application/json" })
    );
    fileList.forEach((file) => {
      requestData.append("files", file);
    });
    axios
      .post(`http://3.35.54.100:8080/api/requests`, requestData, {})
      .then((response) => {
        console.log(response.data, "임다. ");
        setIsModalOpen(true);
        setFormData({
          // 폼 데이터 초기화
          category: "Entertainment",
          //초기화 설정..
          clientName: "",
          organization: "",
          email: "",
          contact: "",
          description: "",
          position: "default",
        });
        setFileList([]);
        // FileTextRef.current.value = ""; // 파일 입력
        console.log(formData, "제출");
      })

      .catch((error) => {
        console.error("에러 발생", error);
      });
  };
  return (
    <Body>
      <Wrapper>
        <Title>CONTACT</Title>
        <SubTitle>ADDRESS</SubTitle>
        <RowWrapper map>
          <SubContent>{address}</SubContent>
          <MapLink href="https://naver.me/xJqS8qd3" target="_blank">
            <MapButton>MAP</MapButton>
          </MapLink>
        </RowWrapper>
        <SubTitle>TEL</SubTitle>
        <SubContent>02-2038-2663</SubContent>
        <SubTitle>FAX</SubTitle>
        <SubContent>070-7549-2443</SubContent>
        <Title>PROJECT REQUEST</Title>
        <FormContainer>
          <InputWrapper>
            <Label>문의 종류</Label>
            {/* <StyledSelect
                            name="category"
                            onChange={handleDataChange}
                        >
                            {categories.map((category, index) => (
                                <option
                                    key={index}
                                    name="category"
                                    id={category}
                                    value={category}
                                >{category}</option>
                            ))}
                        </StyledSelect> */}
            <StyledSelect
              classNamePrefix="Select"
              options={categories}
              defaultValue={categories[0]}
              onChange={(e: any) => handleCategoryChange(e)}
            />
          </InputWrapper>
          <RowWrapper map>
            <InputWrapper>
              <Label>이름</Label>
              <UnderlinedInput
                type="text"
                value={formData.clientName}
                name="clientName"
                onChange={handleDataChange}
              />
            </InputWrapper>
            <InputWrapper>
              <Label>소속</Label>
              <UnderlinedInput
                type="text"
                value={formData.organization}
                name="organization"
                onChange={handleDataChange}
              />
            </InputWrapper>
          </RowWrapper>
          <RowWrapper map>
            <InputWrapper>
              <Label>이메일</Label>
              <UnderlinedInput
                type="email"
                value={formData.email}
                name="email"
                onChange={handleDataChange}
              />
            </InputWrapper>
            <InputWrapper>
              <Label>연락처</Label>
              <UnderlinedInput
                type="text"
                placeholder="ex) 010-1234-5678"
                value={formData.contact}
                name="contact"
                onChange={handleDataChange}
              />
            </InputWrapper>
          </RowWrapper>

          <InputWrapper>
            <Label>프로젝트 내용</Label>

            <UnderlinedTextarea
              ref={textareaRef}
              autoComplete="off"
              value={formData.description}
              name="description"
              onChange={handleTextAreaDataChange}
            />
          </InputWrapper>

          <Label>파일 첨부</Label>
          <InputFileContainer>
            <FileUploadContainer>
              <FileText
                ref={FileTextRef}
                type="text"
                // readOnly="readonly"
              ></FileText>
              <FileUploadInput
                id="uploadfile"
                type="file"
                accept="*/*"
                multiple
                onChange={handleFileChange}
              />
              <FileLabel htmlFor="uploadfile">upload</FileLabel>
            </FileUploadContainer>
          </InputFileContainer>

          <SubmitButton
            type="submit"
            onClick={handleSubmit}
            whileHover={{ scale: 1.04 }}
            transition={{ ease: "easeInOut", stiffness: 200, damping: 5 }}
          >
            문의하기
          </SubmitButton>
        </FormContainer>
        <Modal isModalOpen={isModalOpen} closeModal={closeModal}></Modal>
      </Wrapper>
    </Body>
  );
};

export default ContactPage;

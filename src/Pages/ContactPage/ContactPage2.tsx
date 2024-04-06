import React, { useState } from "react";
import Body from "../../components/Common/Body";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import Select from "react-select";
import { watch } from "fs/promises";
import axios from "axios";

enum Category {
  "ENTERTAINMENT" = "Entertainment",
  "DRAMA" = "Drama",
  "DOCUMENTARY" = "Documentary",
  "CHANNEL_OPERATING" = "Channel Operating",
  "BRANDED" = "Branded",
  "MOTION_GRAPHIC" = "Motion Graphic",
  "ANIMATION" = "Animation",
  "LIVE_COMMERCE" = "Live Commerce",
}

const categories = [
  { key: 1, label: Category.ENTERTAINMENT },
  { key: 2, label: Category.DRAMA },
  { key: 3, label: Category.DOCUMENTARY },
  { key: 4, label: Category.CHANNEL_OPERATING },
  { key: 5, label: Category.BRANDED },
  { key: 6, label: Category.MOTION_GRAPHIC },
  { key: 7, label: Category.ANIMATION },
  { key: 8, label: Category.LIVE_COMMERCE },
];

type IFormData = {
  errors: {
    email: {
      message: string;
    };
    clientName: {
      message: string;
    };
  };
  category: string;
  clientName: string;
  organization: string;
  contact: string;
  email: string;
  position: string;
  description: string;
  photoURL: Array<File>;
  //   extraError?: string;
};

function ContactPage2() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    setError,
    watch,
  } = useForm<IFormData>({
    defaultValues: {
      category: Category.ENTERTAINMENT,
    },
  });

  const onValid = (data: IFormData) => {
    const fileArray = watch("photoURL");
    const formData = {
      request: {
        category: data.category,
        clientName: data.clientName,
        organization: data.organization,
        contact: data.contact,
        email: data.email,
        position: data.position,
        description: data.description,
      },
      files: [
        fileArray && fileArray.length > 0
          ? URL.createObjectURL(fileArray[0])
          : "",
      ],
    };

    console.log("formdata: ", formData);

    axios
      .post(`http://3.35.54.100:8080/api/requests`, formData, {})
      .then((response) => {
        console.log("제출", response);
        setValue("category", "Entertainment");
        setValue("email", "");
        setValue("clientName", "");
        setValue("organization", "");
        setValue("email", "");
        setValue("contact", "");
        setValue("description", "");
        setValue("photoURL", []);
        setValue("position", "");
      })
      .catch((error) => console.log(error));
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

        <FormContainer onSubmit={handleSubmit(onValid)}>
          <InputWrapper>
            <Label>문의 종류</Label>
            <StyledSelect
              classNamePrefix="Select"
              options={categories}
              defaultValue={categories[0]}
            />
          </InputWrapper>
          <InputWrapper>
            <Label>직책</Label>
            <UnderlinedInput
              {...register("position", {
                required: "직책을 입력해주세요",
              })}
            />
            <Message>{errors?.position?.message}</Message>
          </InputWrapper>

          <RowWrapper map>
            <InputWrapper>
              <Label>이름</Label>
              <UnderlinedInput
                {...register("clientName", {
                  required: "이름을 입력해주세요",
                })}
              />
              <Message>{errors?.clientName?.message}</Message>
            </InputWrapper>
            <InputWrapper>
              <Label>소속</Label>
              <UnderlinedInput
                {...register("organization", {
                  required: "소속을 입력해주세요",
                })}
              />
              <Message>{errors?.organization?.message}</Message>
            </InputWrapper>
          </RowWrapper>

          <RowWrapper map>
            <InputWrapper>
              <Label>이메일</Label>
              <UnderlinedInput
                {...register("email", {
                  required: "이메일을 입력해주세요",
                  pattern: {
                    value:
                      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                    message: "이메일 양식에 맞게 입력해주세요",
                  },
                })}
              />
              <Message>{errors?.email?.message}</Message>
            </InputWrapper>
            <InputWrapper>
              <Label>연락처</Label>
              <UnderlinedInput
                {...register("contact", {
                  required: "연락처 입력해주세요",
                  pattern: {
                    value: /^^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}/,
                    message: "연락처 양식에 맞게 입력해주세요",
                  },
                })}
                placeholder="ex) 010-1234-5678"
              />
              <Message>{errors?.contact?.message}</Message>
            </InputWrapper>
          </RowWrapper>
          <InputWrapper>
            <Label>프로젝트 내용</Label>
            <UnderlinedTextarea
              {...register("description", {
                required: "프로젝트 내용을 입력해주세요",
              })}
            />
            <Message>{errors?.description?.message}</Message>
          </InputWrapper>

          <Label>파일 첨부</Label>
          <InputFileContainer>
            <FileUploadContainer>
              <FileUploadInput
                id="uploadfile"
                type="file"
                accept="*/*"
                multiple
                {...register("photoURL")}
                className="upload-hidden"
              />
            </FileUploadContainer>
          </InputFileContainer>
          <SubmitButton type="submit">문의하기</SubmitButton>
        </FormContainer>
      </Wrapper>
    </Body>
  );
}

export default ContactPage2;

const Message = styled.div`
  color: #ff530e;
`;

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

  :hover {
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
  position: relative;
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
const SubmitButton = styled.button`
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

const FileUploadContainer = styled.div`
  display: flex;
`;
const FileText = styled.div`
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

const FileUploadInput = styled.input.attrs({ type: "file" })``;

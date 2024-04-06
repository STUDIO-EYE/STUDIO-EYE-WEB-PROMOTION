import styled from "styled-components";
import { ContentBox } from "./Components/ContentBox";
import { Editor } from "react-draft-wysiwyg";
import { useState } from "react";
import { EditorState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { IEditorData, IFAQData } from "../../../types/PromotionAdmin/faq";
import { useForm } from "react-hook-form";
import axios from "axios";

const Wrapper = styled.div``;
const Icon = styled.div`
  padding-left: 1rem;
  padding-right: 0.8rem;
`;
const TitleWrapper = styled.div`
  display: flex;
  border-bottom: 1px solid #f1f1f1;
  align-items: center;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  height: 4rem;
  font-size: 1.3rem;
`;

const QAIcon = styled.div`
  background-color: ${(props) => props.theme.color.yellow.light};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1.8rem;
  height: 1.8rem;
  border-radius: 100%;
  font-size: 1.1rem;
  margin-right: 0.5rem;
`;

const Content = styled.div`
  margin-left: 2rem;
  margin-right: 2rem;
`;

const QuestionInput = styled.input`
  padding-left: 1.3rem;
  border: none;
  width: 100%;
  height: 2rem;
  box-shadow: 1px 1px 4px 0.1px #c6c6c6;
`;

const AnswerInput = styled.input``;

const ButtonWrapper = styled.div`
  display: flex;
  padding-top: 3rem;
  width: 100%;
  justify-content: flex-end;
`;

const Button = styled.button`
  border: none;
  background-color: ${(props) => props.theme.color.white.bold};
  box-shadow: 1px 1px 4px 0.1px #c6c6c6;
  padding: 0.4rem 1.4rem;
  border-radius: 0.2rem;
`;
const FormContainer = styled.form``;

function FAQWritePage() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [blocks, setBlocks] = useState<IEditorData[]>([]);

  const updateTextDescription = async (state: any) => {
    await setEditorState(state);
    setBlocks(convertToRaw(editorState.getCurrentContent()).blocks);
  };

  const uploadCallback = () => {
    console.log("이미지 업로드");
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    setError,
    watch,
  } = useForm<IFAQData>();

  const onValid = (data: IFAQData) => {
    const text = blocks.map((arr) => `${arr.text}\n`).join("");
    const formData = {
      title: data.question,
      content: text,
    };
    axios
      .post(`http://3.35.54.100:8080/api/faq`, formData)
      .then((response) => {
        console.log("제출", response);
        setValue("question", "");
        setValue("answer", "");
      })
      .catch((error) => console.log(error));

    setEditorState(EditorState.createEmpty());
  };

  return (
    <Wrapper>
      <ContentBox>
        <TitleWrapper>
          <Icon>
            <svg
              width="20"
              height="20"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 12.2399L0.5 13.4999L1.76 8.9999L10 0.799898C10.0931 0.704652 10.2044 0.628973 10.3271 0.577306C10.4499 0.525638 10.5818 0.499023 10.715 0.499023C10.8482 0.499023 10.9801 0.525638 11.1029 0.577306C11.2256 0.628973 11.3369 0.704652 11.43 0.799898L13.2 2.5799C13.2937 2.67286 13.3681 2.78347 13.4189 2.90532C13.4697 3.02718 13.4958 3.15789 13.4958 3.2899C13.4958 3.42191 13.4697 3.55262 13.4189 3.67448C13.3681 3.79634 13.2937 3.90694 13.2 3.9999L5 12.2399Z"
                stroke="#FFA900"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </Icon>
          <Title>FAQ 게시글 등록</Title>
        </TitleWrapper>

        <FormContainer onSubmit={handleSubmit(onValid)}>
          <Content>
            <Title>
              <QAIcon>Q</QAIcon>
              Question
            </Title>
            <QuestionInput
              {...register("question", {
                required: "질문을 입력해주세요",
              })}
              placeholder="질문을 입력해주세요"
            />
          </Content>

          <Content>
            <Title>
              <QAIcon>A</QAIcon>
              Answer
            </Title>
            {/* <AnswerInput
              {...register("answer", {
                required: "답변을 입력해주세요",
              })}
            /> */}
            <Editor
              placeholder="답변을 작성해주세요"
              editorState={editorState}
              onEditorStateChange={updateTextDescription}
              toolbar={{
                image: { uploadCallback: uploadCallback },
              }}
              localization={{ locale: "ko" }}
              editorStyle={{
                height: "20rem",
                width: "100%",
                border: "3px solid lightgray",
                padding: "20px",
              }}
            />
            <ButtonWrapper>
              <Button type="submit">등록하기</Button>
            </ButtonWrapper>
          </Content>
          {/* <Button onClick={() => navigator("/admin/faq")}>나가기</Button> */}
        </FormContainer>
      </ContentBox>
    </Wrapper>
  );
}

export default FAQWritePage;

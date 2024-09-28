import { dataUpdateState } from '@/recoil/atoms';
import { INEWS } from '@/types/PromotionAdmin/news';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import ReactQuill, {Quill} from 'react-quill';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { theme } from '@/styles/theme';

import ImageResize from 'quill-image-resize';
import { NavigateFunction, useLocation, useNavigate } from 'react-router-dom';
import { postNews } from '@/apis/PromotionAdmin/news';
Quill.register('modules/ImageResize', ImageResize);

const NewsWritePage = () => {
  const navigator = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const listPath = currentPath.substring(0, currentPath.lastIndexOf('/'));

  const setIsEditing = useSetRecoilState(dataUpdateState);
  // const [editorHtml, setEditorHtml] = useState("");
  const {register,handleSubmit,formState: { errors },getValues,setValue,watch,
  }= useForm<INEWS>({
    defaultValues: {
      title: '',
      source: '',
      pubDate: '',
      content: '',
      visibility: true,
    },
  });

  const visibility = watch('visibility');

  const [putData, setPutData] = useState({
    title: '',
    source: '',
    pubDate: '',
    content: '',
    visibility: true,
  });

  const handleCompleteWriting=()=>{//전송하는 로직
    sendNews();
    // console.log(getValues());
    navigator(listPath);
  }
  const handleCancelWriting=()=>{
    //작성중인거 취소하겠냐고 물어보는 로직 필요
    navigator(listPath);
  }

  const setEditorHtml=(content:string)=>{
    setValue('content', content);
  }

  const sendNews = async () => {
    const formData = new FormData();
    const requestData = {
      title: getValues('title'),
      source: getValues('source'),
      pubDate: getValues('pubDate'),
      content: getValues('content'),
      visibility: getValues('visibility'),
    };
    formData.append('dto', new Blob([JSON.stringify(requestData)], { type: 'application/json' }));
    try {
      const response = await postNews(formData);
      if (response.code === 400 && response.data === null && response.message) {
        // setErrorMessage(response.message);
        return;
      }
      // alert(MSG.ALERT_MSG.SAVE);
      console.log(response.data.id);
    } catch (error: any) {
      // alert(MSG.CONFIRM_MSG.FAILED);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    setIsEditing(true);
    const { name, value } = e.target;
    if (/^\s|[~!@#$%^&*(),.?":{}|<>]/.test(value.charAt(0))) {return;}
    setPutData((prevData) => ({...prevData,[name]: value,}));
  };
  const handleChangeVisibility = (value: boolean) => {
    setValue('visibility', value);
  };

  return (
    <Container>
    <HeaderWrapper>
      <span style={{marginTop:"auto",marginBottom:"auto"}}>News 작성</span>
      <div style={{display:'flex'}}>
        <SendButton onClick={handleCompleteWriting}>완료</SendButton>
        <SendButton onClick={handleCancelWriting}>취소</SendButton></div>
    </HeaderWrapper>
    <InputWrapper>
          <InputTitle style={{ justifyContent: 'space-between' }}>
            <p>제목</p>
            <div style={{fontSize: 12,paddingTop: 10,}}></div>
          </InputTitle>
          <input
          {...register('title')}
            name='title'
            value={putData.title}
            onChange={handleChange}
            placeholder='News 제목 입력'
            style={{borderRadius:"5px",fontFamily:"pretendard-semiBold"}}
          />

          <div style={{display:"flex",flexDirection:"row"}}>
          <InputTitle style={{marginTop:"10px", marginBottom:"10px"}}>
            <p style={{marginTop:"auto",marginBottom:"auto",fontSize: 16, padding:10,whiteSpace:"nowrap"}}>출처/작성자</p>
            <input
            {...register('source')}
            name='source'
            value={putData.source}
            onChange={handleChange}
            placeholder='출처 혹은 작성자 입력'
            style={{borderRadius:"5px",fontFamily:"pretendard-semiBold",marginTop:"auto",marginBottom:"auto",}}
            />
            <p style={{marginTop:"auto",marginBottom:"auto",fontSize: 16, padding:10,whiteSpace:"nowrap"}}>원문 날짜</p>
            <input
            {...register('pubDate')}
            name='pubDate'
            value={putData.pubDate}
            onChange={handleChange}
            placeholder='기사 원문 날짜 입력'
            style={{borderRadius:"5px",fontFamily:"pretendard-semiBold",marginTop:"auto",marginBottom:"auto",}}
            />
            <p style={{marginTop:"auto",marginBottom:"auto",marginLeft:"10px",fontSize: 16, padding:10,whiteSpace:"nowrap"}}>공개 여부</p>
            <VisibilityWrapper>
              <CheckBox onClick={() => handleChangeVisibility(true)} className='public' selected={visibility}>
                공개
              </CheckBox>
              <CheckBox onClick={() => handleChangeVisibility(false)} className='private' selected={!visibility}>
                비공개
              </CheckBox>
            </VisibilityWrapper>
          </InputTitle>
          
          </div>
          
          <InputTitle style={{ justifyContent: 'space-between' }}>
            <p>내용</p>
            <div style={{fontSize: 12,paddingTop: 10,}}></div>
          </InputTitle>
          <CustomQuillEditor
            // value={editorHtml}
            value={getValues('content')}
            onChange={(html)=>{
              setEditorHtml(html);
              setIsEditing(true);
            }}
            modules={{
              toolbar: [
                ["bold", "italic", "underline", "strike"],
                ['image', 'video'],
                [{color:[]},{background:[]}],
                [{align:[]}, { list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
                [{ size: ["small", false, "large", "huge"] }],
              ],
              ImageResize: {
                parchment: Quill.import('parchment')
              }
            }}
          />
        </InputWrapper>
    </Container>
  );
};

export default NewsWritePage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 600px;
`;

const HeaderWrapper = styled.div`
  display: flex;
  width:100%;
  flex-direction: row;
  justify-content: space-between;
  align-content: center;
  font-family: 'pretendard-bold';
  font-size: 20px;
  color: #595959;
  margin-bottom: 10px;
`;

const SendButton = styled.button`
  border-radius: 5px;
  width: fit-content;
  font-family: 'pretendard-semibold';
  padding: 7px 15px;
  background-color: #6c757d;
  color: white;
  margin-right: 10px;
  cursor: pointer;
  border: none;

  &:hover {
    background-color: #5a6268;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-family: ${(props) => props.theme.font.semiBold};
  p {
    font-size: 18px;
    margin-bottom: 5px;
  }
  input {
    outline: none;
    font-family: ${(props) => props.theme.font.regular};
    font-size: 14px;
    padding: 5px 10px;
    margin-bottom: 5px;
    width: 95%;
    height: 30px;
    border: none;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  }
`;

const InputTitle = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  width: 100%;
  svg {
    cursor: pointer;
    margin-right: 10px;
  }
`;

const VisibilityWrapper = styled.div`
  display: flex;
`;
const CheckBox = styled.div<{ selected: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  width: 6vw;
  height: 40px;
  font-size: 15px;
  font-family: ${(props) => props.theme.font.medium};
  box-shadow: 1px 1px 4px 0.1px #c6c6c6;
  background-color: ${(props) => (props.selected ? theme.color.yellow.light : "white")};
  cursor: pointer;
`;

const ErrorMessage = styled.div`
  font-family: ${(props) => props.theme.font.light};
  margin-top: 10px;
  margin-left: 10px;
  font-size: 13px;
`;

const CustomQuillEditor = styled(ReactQuill)`
  resize: none;
  background-color:white;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  border-radius: 10px;

  .ql-container {
    border: 1px solid #E4E4E7;
    border-radius: 0 0 10px 10px;
  }

  .ql-editor {
    height: 80vh;
    overflow: auto;
  }
  .ql-editor img {
    max-width: 100%; /* 이미지가 컨테이너를 넘지 않도록 설정 */
    cursor: nwse-resize; /* 크기 조정 시 커서 변경 */
    resize: both; /* 양 방향 리사이징 허용 */
  }

  .ql-toolbar {
    background-color: rgba(0, 0, 0, 0.03);
    border: 1px solid #E4E4E7;
    border-radius: 10px 10px 0 0;
  }

  .ql-editor .ql-size-huge {
    font-size: 1.5em;
  }
  .ql-editor .ql-size-large {
    font-size: 1.2em;
  }
  .ql-editor .ql-size-small {
    font-size: 0.7em;
  }
  .ql-bold {
    font-weight: 800;
  }
  .ql-italic {
    font-style: italic;
  }
  .ql-underline {
    text-decoration: underline;
  }
  .ql-strike {
    text-decoration: overline;
}
`;
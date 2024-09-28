import { dataUpdateState } from '@/recoil/atoms';
import { INEWS } from '@/types/PromotionAdmin/news';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { theme } from '@/styles/theme';

import { useLocation, useNavigate } from 'react-router-dom';
import { postNews } from '@/apis/PromotionAdmin/news';
import { MSG } from '@/constants/messages';

const NewsWritePage = () => {
  const navigator = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const listPath = currentPath.substring(0, currentPath.lastIndexOf('/'));

  const setIsEditing = useSetRecoilState(dataUpdateState);
  // const [editorHtml, setEditorHtml] = useState("");
  const {register,getValues,setValue,watch,
  }= useForm<INEWS>({
    defaultValues: {
      title: '',
      source: '',
      pubDate: '',
      url: '',
      visibility: true,
    },
  });

  const visibility = watch('visibility');

  const [putData, setPutData] = useState({
    title: '',
    source: '',
    pubDate: '',
    url: '',
    visibility: true,
  });

  const handleCompleteWriting=()=>{//전송하는 로직
    sendNews();
    // console.log(getValues());
    navigator(listPath);
  }
  const handleCancelWriting=()=>{
    if(window.confirm(MSG.CONFIRM_MSG.CANCLE)){
      navigator(listPath);
    }
  }

  const sendNews = async () => {
    // const formData = new FormData();
    const requestData = {
      title: getValues('title'),
      source: getValues('source'),
      pubDate: getValues('pubDate'),
      url: getValues('url'),
      visibility: getValues('visibility'),
    };
    // formData.append('dto', new Blob([JSON.stringify(requestData)], { type: 'application/json' }));
    try {
      const response = await postNews(requestData);
      // if (response.code === 400 && response.data === null && response.message) {
        // setErrorMessage(response.message);
        alert(MSG.ALERT_MSG.POST)
        setIsEditing(false)
        return;
      // }
      // alert(MSG.ALERT_MSG.SAVE);
    } catch (error: any) {
      alert(MSG.CONFIRM_MSG.FAILED);
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
          <InputTitle>
            <p>제목</p>
            <input
            {...register('title')}
              name='title'
              value={putData.title}
              onChange={handleChange}
              placeholder='News 제목 입력'
              style={{borderRadius:"5px",fontFamily:"pretendard-semiBold"}}
            />
          </InputTitle>

          <InputTitle>
            <p>출처/작성자</p>
            <input
            {...register('source')}
            name='source'
            value={putData.source}
            onChange={handleChange}
            placeholder='출처 혹은 작성자 입력'
            style={{borderRadius:"5px",fontFamily:"pretendard-semiBold",marginTop:"auto",marginBottom:"auto",}}
            />
          </InputTitle>

          <div style={{display:"flex",flexDirection:"row"}}>
          <InputTitle>
            <p style={{marginTop:"auto",marginBottom:"auto"}}>원문 날짜</p>
            <input
            {...register('pubDate')}
            name='pubDate'
            value={putData.pubDate}
            onChange={handleChange}
            placeholder='기사 원문 날짜 입력'
            style={{borderRadius:"5px",fontFamily:"pretendard-semiBold",marginTop:"auto",marginBottom:"auto",}}
            />
            <p style={{marginTop:"auto",marginBottom:"auto",marginLeft:"10px",fontSize: 16, padding:10}}>공개 여부</p>
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

          <InputTitle>
            <p>링크</p>
            <input
            {...register('url')}
            name='url'
            value={putData.url}
            onChange={handleChange}
            placeholder='기사 링크 입력'
            style={{borderRadius:"5px",fontFamily:"pretendard-semiBold",marginTop:"auto",marginBottom:"auto",}}
            />
          </InputTitle>
        </InputWrapper>
    </Container>
  );
};

export default NewsWritePage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
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
  justify-content: space-between;
  height: 40px;
  width: 100%;
  white-space:nowrap;
  padding: 10px;
  svg {
    cursor: pointer;
    margin-right: 10px;
  }

  p{
    margin-right:10px;
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
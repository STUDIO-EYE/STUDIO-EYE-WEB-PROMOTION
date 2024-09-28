import { putNews } from '@/apis/PromotionAdmin/news';
import { INEWS } from '@/types/PromotionAdmin/news';
import React, { useState } from 'react';
import { useLocation, useNavigate, useOutletContext, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { MSG } from '@/constants/messages';
import { useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import { dataUpdateState } from '@/recoil/atoms';
import { theme } from '@/styles/theme';

const NewsEditPage = () => {
  const { id } = useParams();
  const [errorMessage, setErrorMessage] = useState(''); //데이터 업데이트 할 때
  const news=useOutletContext<{news:INEWS,setIsEditing:(React.Dispatch<React.SetStateAction<boolean>>)}>();
  const setIsEditing = useSetRecoilState(dataUpdateState);

  const navigator = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const listPath = currentPath.substring(0, currentPath.lastIndexOf('/'));

  const {register,getValues,setValue,watch,
  }= useForm<INEWS>({
    defaultValues: {
      title: news.news.title,
      source: news.news.source,
      pubDate: news.news.pubDate,
      url: news.news.url,
      visibility: news.news.visibility,
    },
  });
  const [putData, setPutData] = useState({
    title: news.news.title,
    source: news.news.source,
    pubDate: news.news.pubDate,
    url: news.news.url,
    visibility: news.news.visibility,
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    setIsEditing(true);
    const { name, value } = e.target;
    if (/^\s|[~!@#$%^&*(),.?":{}|<>]/.test(value.charAt(0))) {return;}
    setPutData((prevData) => ({...prevData,[name]: value,}));
  };
  const visibility = watch('visibility');
  const handleChangeVisibility = (value: boolean) => {
    setValue('visibility', value);
  };

  // const formatDate = (date: Date): string => {
  //   const year = date.getFullYear();
  //   const month = String(date.getMonth() + 1).padStart(2, '0');
  //   const day = String(date.getDate()).padStart(2, '0');
  //   return `${year}-${month}-${day}`;
  // };

  const handleCancelWriting=()=>{
    if(window.confirm(MSG.CONFIRM_MSG.CANCLE)){
      news.setIsEditing(false)
      setIsEditing(false)
      navigator(listPath);
    }
  }

  const handlePut=async()=>{
    // const formData = new FormData();
    const requestData = {
      id: Number(id),
      title: getValues('title'),
      source: getValues('source'),
      pubDate: getValues('pubDate'),
      url: getValues('url'),
      visibility: getValues('visibility'),
    };
    // formData.append('dto', new Blob([JSON.stringify(requestData)], { type: 'application/json' }));

    if(window.confirm(MSG.CONFIRM_MSG.SAVE)){
      try{
        const response=await putNews(requestData)
        // if (response.code === 400 && response.data === null) { //에러메시지 있을 때
          alert(MSG.ALERT_MSG.SAVE)
          news.setIsEditing(false)
          setIsEditing(false)
          navigator(listPath)
          return;
        // }
      }catch (error: any) {
        alert(MSG.CONFIRM_MSG.FAILED)
      }
    }
  }

  //----------------------------------------
  return (
    <Container>
      <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between',marginBottom:5}}>
        <Title>제목</Title>
        <div style={{display:'flex',flexDirection:'row',marginTop:'auto',marginBottom:'auto'}}>
            <SendButton onClick={handlePut}>완료</SendButton>
            <SendButton onClick={handleCancelWriting}>취소</SendButton>
        </div>
      </div>
      <InputBlock
            {...register('title')}
            name='title'
            value={putData.title}
            onChange={handleChange}
            placeholder='News 제목'
            style={{borderRadius:"5px",fontFamily:"pretendard-semiBold",marginRight:10}}/>
      
      <div>
        <Title>출처/작성자</Title>
        <InputBlock
            {...register('source')}
            name='source'
            value={putData.source}
            onChange={handleChange}
            placeholder='출처/작성자'
            style={{borderRadius:"5px",fontFamily:"pretendard-semiBold"}}/>
      </div>
      <div>
        <Title>원문 날짜</Title>
        <InputBlock
            {...register('pubDate')}
            name='pubDate'
            value={putData.pubDate}
            onChange={handleChange}
            placeholder='원문 날짜'
            style={{borderRadius:"5px",fontFamily:"pretendard-semiBold"}}/>
      </div>
      <div>
        <Title>공개 여부</Title>
        <VisibilityWrapper>
              <CheckBox onClick={() => handleChangeVisibility(true)} className='public' selected={visibility}>
                공개
              </CheckBox>
              <CheckBox onClick={() => handleChangeVisibility(false)} className='private' selected={!visibility}>
                비공개
              </CheckBox>
      </VisibilityWrapper>
      </div>
      <div>
        <Title>내용</Title>
        <InputBlock
            {...register('url')}
            name='url'
            value={putData.url}
            onChange={handleChange}
            placeholder='기사 링크'
            style={{borderRadius:"5px",fontFamily:"pretendard-semiBold"}}/>
      </div>
    </Container>
  );
};

export default NewsEditPage;

const Container=styled.div`
min-width: 300px;
width: 100%;

display: flex;
flex-direction: column;
background-color: #e8e8e8;
padding-bottom: 5px;
border-radius: 5px;

overflow:hidden;
// white-space:nowrap;
text-overflow: ellipsis;
}
`

const Title=styled.div`
padding: 5px;
font-size: 1em;
white-space: nowrap;
margin-top: auto;
margin-bottom: auto;
font-family: 'pretendard-bold';
margin-right:2px;
`
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
  white-space: nowrap;

  &:hover {
    background-color: #5a6268;
  }
`;

const InputBlock=styled.input`
outline: none;
font-family: pretendard;
font-size: 14px;
padding: 5px 10px;
margin-bottom: 5px;
width: 95%;
height: 30px;
border: none;
`
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
const VisibilityWrapper = styled.div`
  display: flex;
`;
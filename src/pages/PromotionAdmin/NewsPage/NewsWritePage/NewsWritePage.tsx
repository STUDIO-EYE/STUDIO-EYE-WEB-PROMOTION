import { backdropState, dataUpdateState } from '@/recoil/atoms';
import { INEWS } from '@/types/PromotionAdmin/news';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { theme } from '@/styles/theme';

import { useLocation, useNavigate } from 'react-router-dom';
import { postNews } from '@/apis/PromotionAdmin/news';
import { MSG } from '@/constants/messages';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker/DatePicker';
import dayjs from 'dayjs';
import { linkCheck } from '@/components/ValidationRegEx/ValidationRegEx';

const NewsWritePage = () => {
  const navigator = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  // const listPath = currentPath.substring(0, currentPath.lastIndexOf('/'));
  const [producingIsOpend, setProducingIsOpened] = useRecoilState(backdropState);
  const [linkRegexMessage, setLinkRegexMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true);

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

  useEffect(() => {
    setSubmitButtonDisabled(
      putData.title===''||
      putData.source==='' ||
      putData.pubDate==='' ||
      putData.url===''
    );
  }, [putData]);

  const handleCompleteWriting=()=>{//전송하는 로직
    sendNews();
    // navigator(listPath);
  }

  const sendNews = async () => {
    const requestData = {
      title: getValues('title'),
      source: getValues('source'),
      pubDate: getValues('pubDate'),
      url: getValues('url'),
      visibility: getValues('visibility'),
    };
    try {
      const response = await postNews(requestData);
      if (response.code === 400 && response.data === null && response.message) {
        setErrorMessage(response.message);
        alert(MSG.CONFIRM_MSG.FAILED)
        return;
      }
      alert(MSG.ALERT_MSG.SAVE);
      setIsEditing(false);
      setProducingIsOpened(false);
    } catch (error: any) {
      alert(MSG.CONFIRM_MSG.FAILED);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    setIsEditing(true);
    const { name, value } = e.target;
    if (/^\s|[~!@#$%^&*(),.?":{}|<>]/.test(value.charAt(0))) {return;}
    if(name==='url'){handleLinkChange(value)}
    setPutData((prevData) => ({...prevData,[name]: value,}));
  };
  const handleChangeVisibility = (value: boolean) => {
    setValue('visibility', value);
  };

  //링크 유효성 검사----------------------------------------
  const handleLinkChange = (newLink: string) => {
    if (linkCheck(newLink)) {
      setLinkRegexMessage('');
    } else {
      setLinkRegexMessage('외부 연결 링크는 http 혹은 https로 시작해야합니다.');
    }
  };

  return (
    <Container>
      <CloseContainer onClick={
        () => {
          if(window.confirm(MSG.CONFIRM_MSG.CANCLE)){
            setIsEditing(false)
            setProducingIsOpened(false)
          }}}>x</CloseContainer>
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

          <div style={{display:'flex',flexDirection:'row'}}>
            <InputTitle>
            <p>원문 날짜</p>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                {...register('pubDate')}
                format='YYYY-MM-DD'
                value={dayjs(putData.pubDate)}
                onChange={(newValue) => {
                  const formattedDate = dayjs(newValue).format('YYYY-MM-DD'); // 날짜를 string으로 변환
                  setValue('pubDate', formattedDate); // 변환한 string을 form에 저장
                  setPutData((prevData) => ({ ...prevData, pubDate: formattedDate })); // 상태에도 저장
                }}
                slotProps={{
                  textField: {
                    sx: {
                      backgroundColor: '#ffffff',
                      borderRadius:'5px',
                      fontFamily:'pretendard',
                      fontSize: '14px',
                      // margin: 'auto 0 auto 5px',
                      boxShadow: '1px 1px 4px 0.3px #c6c6c6',
                      '.MuiInputBase-input':{
                        padding: '5px',
                        boxShadow:'none',
                        margin:'auto',
                      },
                      '.MuiOutlinedInput-root': {
                        border: 'none',
                        '&:hover': {
                          backgroundColor: '#ffffff73',
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          border: 'none',
                        },
                      },
                      '.MuiOutlinedInput-notchedOutline': {
                        border: 'none',
                      },
                    },
                  },
                }}
              />
            </LocalizationProvider>
          </InputTitle>
          <InputTitle style={{margin:'auto'}}>
            <p>공개 여부</p>
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
          {linkRegexMessage && <ErrorMessage> ⚠ {linkRegexMessage}</ErrorMessage>}
            <div style={{display:'flex',marginLeft:'auto'}}>
              <SendButton 
                title={submitButtonDisabled ? '모든 항목을 다 입력해주세요!' : ''}
                disabled={submitButtonDisabled || errorMessage !== '' || linkRegexMessage !== ''}
                onClick={handleCompleteWriting}
              >완료</SendButton>
            </div>
        </InputWrapper>
    </Container>
  );
};

export default NewsWritePage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position:relative;
`;

const SendButton = styled.button`
  border-radius: 5px;
  width: fit-content;
  font-family: 'pretendard-semibold';
  padding: 7px 15px;
  background-color: #6c757d;
  color: white;
  cursor: pointer;
  border: none;
  &:hover {
    background-color: #5a6268;
  }

  &:disabled {
    opacity: 0.5;
    cursor: default;
    &:hover {
      background-color: #6c757d;
    }
  }
`;

const InputWrapper = styled.div`
  background-color: rgba(255, 255, 255, 0.699);
  border-radius: 10px;
  backdrop-filter: blur(10px);
  box-sizing: border-box;
  width: fit-content;
  padding: 40px 50px;
  
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
    resize: none;
    height: 30px;
    border: none;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  }
`;

const InputTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 100%;
  white-space:nowrap;
  padding: 10px;
  font-size: 1.2rem;

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

const CloseContainer = styled.div`
  font-family: 'pretendard-regular';
  font-size: 30px;
  position: absolute;
  top: 10px;
  z-index: 20;
  right: 20px;
  cursor: pointer;
`;
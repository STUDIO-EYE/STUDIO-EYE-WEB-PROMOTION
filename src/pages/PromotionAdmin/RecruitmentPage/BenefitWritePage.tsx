import React from 'react';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { postBenefit } from '@/apis/PromotionAdmin/recruitment';
import { ContentBox } from '@/components/PromotionAdmin/Recruitment/Components';
import { PA_ROUTES } from '@/constants/routerConstants';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { dataUpdateState } from '@/recoil/atoms';
import { MSG } from '@/constants/messages';
import { IBenefit } from '@/types/PromotionAdmin/recruitment';
import FileButton from '@/components/PromotionAdmin/DataEdit/StyleComponents/FileButton';
import {
  DATAEDIT_NOTICE_COMPONENTS,
  DATAEDIT_TITLES_COMPONENTS,
} from '../../../components/PromotionAdmin/DataEdit/Company/StyleComponents';

function BenefitWritePage() {
  const timeStamp = Date.now();
  const setIsEditing = useSetRecoilState(dataUpdateState);
  const isEditing = useRecoilValue(dataUpdateState);
  const navigator = useNavigate();
  const [putData, setPutData] = useState({
    request: {
      title: '',
      content: '',
    },
    file: '',
  });
  const titleLength = putData.request.title.length;
  const contentLength = putData.request.content.length;
  const maxTitleLength = 14;
  const maxContentLength = 34;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IBenefit>();

  useEffect(() => {
    if (isEditing) {
      const handleBeforeUnload = (event: any) => {
        const message = MSG.CONFIRM_MSG.EXIT;
        event.returnValue = message;
        return message;
      };
      window.addEventListener('beforeunload', handleBeforeUnload);
      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
      };
    }
  }, [isEditing]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsEditing(true);
    const { name, value } = e.target;

    if (/^\s|[~!@#$%^&*(),.?":{}|<>]/.test(value.charAt(0))) {
      return;
    }

    if (name === 'title' && value.length > 14) {
      return;
    }
    if (name === 'content' && value.length > 34) {
      return;
    }
    setPutData((prevData) => ({
      ...prevData,
      request: {
        ...prevData.request,
        [name]: value,
      },
    }));

    setValue(name as keyof IBenefit, value);
  };

  const onValid = async (data: IBenefit) => {
    const formData = new FormData();
    formData.append(
      'request',
      new Blob(
        [
          JSON.stringify({
            title: putData.request.title,
            content: putData.request.content,
          }),
        ],
        { type: 'application/json' },
      ),
    );

    if (putData.file && putData.file !== data?.imageUrl) {
      const file = await urlToFile(putData.file, `${putData.request.title}.${timeStamp}.png`);
      formData.append('file', file);
    } else if (data?.imageUrl) {
      const mainImgBlob = await urlToFile(data.imageUrl, `${putData.request.title}.${timeStamp}.png`);
      formData.append('file', mainImgBlob);
    } else {
      formData.append('file', '');
    }

    if (putData.file === '') {
      alert('이미지를 업로드 해주세요.');
      return;
    }
    if (window.confirm('등록하시겠습니까?')) {
      try {
        const response = await postBenefit(formData);
        alert('사내 복지가 등록되었습니다.');
        console.log(response);
        setIsEditing(false);
        navigator(`${PA_ROUTES.RECRUITMENT}/benefit/manage`, { replace: true });
      } catch (error) {
        console.log(error);
        alert('사내 복지 등록 중 오류가 발생했습니다.');
      }
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        const img = new Image();
        img.src = reader.result as string;

        img.onload = () => {
          // 이미지가 256x256인 경우 리사이즈 생략
          if (img.width === 256 && img.height === 256) {
            // 512x512일 경우, Base64 string 그대로 putData에 저장
            setPutData((prevData) => ({
              ...prevData,
              file: reader.result as string, // 이미지를 string 형태로 저장
            }));
          } else {
            // 이미지 크기가 256x256이 아닌 경우 리사이즈 수행
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = 256;
            canvas.height = 256;

            if (ctx) {
              ctx.drawImage(img, 0, 0, 256, 256);
              const resizedImage = canvas.toDataURL(file.type);
              setPutData((prevData) => ({
                ...prevData,
                file: resizedImage,
              }));
            }
          }
        };
      };

      reader.readAsDataURL(file);
      setIsEditing(true);
    }
  };

  async function urlToFile(url: string, fileName: string): Promise<File> {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      return new File([blob], fileName);
    } catch (error) {
      console.error('Error URL to file:', error);
      throw error;
    }
  }

  return (
    <form noValidate onSubmit={handleSubmit(onValid)}>
      <ContentBox>
        <InputImgWrapper>
          <Box>
            <InputTitle>{DATAEDIT_TITLES_COMPONENTS.BenefitIcon}</InputTitle>
            {DATAEDIT_NOTICE_COMPONENTS.TEXT.BENEFIT}
            <LogoWrapper>
              <FileButton id='BenefitImgFile' description='Benefit Image Upload' onChange={handleImageChange} />
              <ImgBox>
                <img src={putData.file} alt='' />
              </ImgBox>
            </LogoWrapper>
          </Box>
        </InputImgWrapper>
        {DATAEDIT_TITLES_COMPONENTS.Benefit}
        <InputWrapper>
          <InputTitle style={{ justifyContent: 'space-between' }}>
            <p>제목</p>
            <div
              style={{
                fontSize: 12,
                paddingTop: 10,
              }}
            >
              {titleLength}/{maxTitleLength}
            </div>
          </InputTitle>
          <input
            {...register('title', {
              required: '복지 제목을 입력해주세요.',
            })}
            name='title'
            value={putData.request.title}
            onChange={handleChange}
            maxLength={14}
            placeholder='사내 복지 (14자 내로 작성해 주세요.)'
          />
          {errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage>}
          <InputTitle style={{ justifyContent: 'space-between' }}>
            <p>내용</p>
            <div
              style={{
                fontSize: 12,
                paddingTop: 10,
              }}
            >
              {contentLength}/{maxContentLength}
            </div>
          </InputTitle>
          <input
            {...register('content', {
              required: '복지 내용을 입력해주세요',
            })}
            name='content'
            value={putData.request.content}
            onChange={handleChange}
            maxLength={34}
            placeholder='복지 내용 (34자 내로 작성해 주세요.)'
          />
          {errors.content && <ErrorMessage>{errors.content.message}</ErrorMessage>}
          <RowWrapper>
            <PostButton>등록하기</PostButton>
          </RowWrapper>
        </InputWrapper>
      </ContentBox>
    </form>
  );
}

export default BenefitWritePage;

const InputWrapper = styled.div`
  display: flex;
  background-color: ${(props) => props.theme.color.white.bold};
  flex-direction: column;
  font-family: ${(props) => props.theme.font.semiBold};
  p {
    font-size: 18px;
    padding-top: 7px;
    padding-bottom: 3px;
    margin-bottom: 10px;
  }
  input {
    outline: none;
    font-family: ${(props) => props.theme.font.regular};
    font-size: 14px;
    padding: 10px;
    width: 70%;
    height: 30px;
    border: none;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  }
  input:focus {
    transition: 0.2s;
    border-bottom: 3px solid ${(props) => props.theme.color.symbol};
  }
`;

const InputTitle = styled.div`
  display: flex;
  padding-top: 20px;
  align-items: center;
  height: 40px;
  width: 70%;
  svg {
    cursor: pointer;
    margin-right: 10px;
  }
`;

const RowWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
  width: 90%;
  margin-top: 50px;
`;

const InputImgWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 30px;
`;

const Box = styled.div`
  width: 100%;
`;

const ImgBox = styled.div`
  display: flex;
  height: 200px;
  width: 60%;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  box-shadow: 1px 1px 4px 0.1px #c6c6c6;
  border-radius: 5px;
  margin-top: 15px;
`;
const LogoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  input {
    display: none;
  }

  img {
    max-width: 300px;
    max-height: 150px;
    margin-bottom: 10px;
  }
`;

const PostButton = styled.button`
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90px;
  height: 40px;
  margin-right: 20px;
  font-size: 15px;
  font-family: ${(props) => props.theme.font.medium};
  box-shadow: 1px 1px 4px 0.1px #c6c6c6;
  background-color: ${(props) => props.theme.color.white.bold};
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background-color: ${(props) => props.theme.color.yellow.light};
  }
`;

const ErrorMessage = styled.div`
  font-family: ${(props) => props.theme.font.light};
  margin-top: 10px;
  margin-left: 10px;
  font-size: 13px;
  height: 16px;
`;

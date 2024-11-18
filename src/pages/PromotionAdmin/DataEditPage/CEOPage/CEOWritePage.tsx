import { getCEOData } from '@/apis/PromotionAdmin/dataEdit';
import { PROMOTION_BASIC_PATH } from '@/constants/basicPathConstants';
import { ICEOData } from '@/types/PromotionAdmin/dataEdit';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import styled from 'styled-components';
import FileButton from '@/components/PromotionAdmin/DataEdit/StyleComponents/FileButton';
import {
  DATAEDIT_NOTICE_COMPONENTS,
  DATAEDIT_TITLES_COMPONENTS,
} from '../../../../components/PromotionAdmin/DataEdit/Company/StyleComponents';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { dataUpdateState } from '@/recoil/atoms';
import { MSG } from '@/constants/messages';

function CEOWritePage() {
  const setIsEditing = useSetRecoilState(dataUpdateState);
  const isEditing = useRecoilValue(dataUpdateState);
  const { data, isLoading, refetch } = useQuery<ICEOData>(['ceo', 'id'], getCEOData);
  const [putData, setPutData] = useState({
    request: {
      name: '',
      introduction: '',
    },
    file: '',
  });

  useEffect(() => {
    refetch();
  }, [data, refetch]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICEOData>();

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    setIsEditing(true);
    const { name, value } = e.target;

    if (/^\s|[~!@#$%^&*(),.?":{}|<>]/.test(value.charAt(0))) {
      return;
    }

    let processedValue = value;

    if (name === 'introduction') {
      const lines = value.split('\n').length;
      if (lines > 5) {
        const linesArray = value.split('\n');
        processedValue = linesArray.slice(0, 5).join('\n');
      }
    }
    setPutData((prevData) => ({
      ...prevData,
      request: {
        ...prevData.request,
        [name]: processedValue,
      },
    }));
  };

  const [isInvalid, setInvalid] = useState(true);

  const handleSaveClick: SubmitHandler<ICEOData> = async (formData) => {
    // 유효성 검증
    if (!formData.name.trim()) {
      alert('이름을 입력해주세요.');
      return;
    }

    if (!formData.introduction.trim()) {
      alert('소개를 입력해주세요.');
      return;
    }

    if (!putData.file) {
      alert('이미지를 업로드해주세요.');
      return;
    }

    const apiFormData = new FormData();

    apiFormData.append('request', new Blob([JSON.stringify(formData)], { type: 'application/json' }));

    // 이미지 추가
    if (putData.file && putData.file !== data?.imageUrl) {
      const file = await urlToFile(putData.file, 'CEOLogo.png');
      apiFormData.append('file', file);
    }

    if (window.confirm('등록하시겠습니까?')) {
      try {
        const response = await axios.post(`${PROMOTION_BASIC_PATH}/api/ceo`, apiFormData);
        console.log('CEO 등록 성공:', response);
        alert('등록되었습니다.');
        setIsEditing(false);
      } catch (error) {
        console.error('CEO 등록 실패:', error);
        alert('등록에 실패했습니다. 다시 시도해주세요.');
      }
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setPutData((prevData) => ({
          ...prevData,
          file: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
      setIsEditing(true);
    }
  };

  async function urlToFile(url: string, fileName: string): Promise<File> {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      console.log(blob);
      return new File([blob], fileName);
    } catch (error) {
      console.error('Error URL to file:', error);
      throw error;
    }
  }
  const currentLength = putData.request.introduction?.length || 0;
  const maxLimit = 200; // 최대 글자 수

  if (isLoading) return <div>is Loading...</div>;
  return (
    <Wrapper>
      <form onSubmit={handleSubmit(handleSaveClick)}>
        <ContentBlock>
          {DATAEDIT_TITLES_COMPONENTS.CEO}
          <InputWrapper>
            <InputTitle>
              <p>Name</p>
            </InputTitle>
            <input
              {...register('name', {
                required: 'CEO 이름을 입력해주세요',
              })}
              data-cy='ceo-name-input'
              name='name'
              value={putData.request.name}
              onChange={handleChange}
              maxLength={30}
              placeholder='이름'
            />
            {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
            <InputTitle style={{ justifyContent: 'space-between' }}>
              <p>Introduction</p>
              <div
                style={{
                  fontSize: 12,
                  paddingTop: 10,
                }}
              >
                {currentLength}/{maxLimit}
              </div>
            </InputTitle>
            <textarea
              {...register('introduction', {
                required: 'CEO 소개 (5줄, 200자 내로 작성해 주세요.)',
              })}
              data-cy='ceo-introduction-input'
              name='introduction'
              value={putData.request.introduction}
              onChange={handleChange}
              maxLength={200}
              placeholder='CEO 소개 (5줄, 200자 내로 작성해 주세요.)'
            />
            {errors.introduction && <ErrorMessage>{errors.introduction.message}</ErrorMessage>}
            <InputImgWrapper>
              <Box>
                <InputTitle>{DATAEDIT_TITLES_COMPONENTS.CEOIMG}</InputTitle>
                {DATAEDIT_NOTICE_COMPONENTS.IMAGE.CEOIMG}
                {DATAEDIT_NOTICE_COMPONENTS.COLOR.CEOIMG}
                <LogoWrapper>
                  <FileButton id='CEOImgFile' description='CEO Image Upload' onChange={handleImageChange} />
                  <ImgBox>
                    <img src={putData.file} alt='' data-cy='uploaded-image' />
                  </ImgBox>
                </LogoWrapper>
              </Box>
            </InputImgWrapper>
            <ButtonWrapper>
              <Button data-cy='submit-button'>등록하기</Button>
            </ButtonWrapper>
          </InputWrapper>
        </ContentBlock>
      </form>
    </Wrapper>
  );
}

export default CEOWritePage;

const Wrapper = styled.div`
  display: flex;
  input,
  textarea {
    outline: none;
  }
  input:focus {
    transition: 0.2s;
    border-bottom: 3px solid ${(props) => props.theme.color.symbol};
  }

  textarea {
    outline: none;
    font-family: ${(props) => props.theme.font.regular};
    font-size: 14px;
    padding: 10px;
    width: 70%;
    min-height: 200px;
    border: none;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    resize: none;
  }
  textarea:focus {
    transition: 0.2s;
    border-bottom: 3px solid ${(props) => props.theme.color.symbol};
  }
`;

const ContentBlock = styled.div<{ width?: number; height?: number }>`
  padding: 25px;
  background-color: ${(props) => props.theme.color.white.pale};
  position: relative;
  box-shadow: 2px 2px 5px 0.3px ${(props) => props.theme.color.black.pale};
  margin-bottom: 30px;
  margin-right: 30px;

  border-radius: 4px;
  width: ${(props) => (props.width ? props.width + 'px;' : '40vw;')};
  height: ${(props) => (props.height ? props.height + 'px;' : 'fit-content;')};
`;

const InputWrapper = styled.div`
  display: flex;
  background-color: ${(props) => props.theme.color.white.light};
  flex-direction: column;
  font-family: ${(props) => props.theme.font.regular};
  p {
    font-size: 18px;
    padding-top: 7px;
    padding-bottom: 3px;
  }
  input {
    outline: none;
    font-family: ${(props) => props.theme.font.regular};
    font-size: 14px;
    padding-left: 10px;
    width: 30%;
    height: 30px;
    border: none;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  }
  input:focus,
  textarea:focus {
    transition: 0.2s;
    border-bottom: 3px solid ${(props) => props.theme.color.symbol};
  }
`;

const InputImgWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
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
const Box = styled.div`
  width: 100%;
`;

const ImgBox = styled.div`
  display: flex;
  height: 200px;
  width: 80%;
  justify-content: center;
  align-items: center;
  background-color: #1a1a1a;
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
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 10px;
`;

const Button = styled.button`
  cursor: pointer;
  border: none;
  background-color: ${(props) => props.theme.color.white.bold};
  box-shadow: 1px 1px 4px 0.5px #c6c6c6;
  padding: 0.4rem 1.4rem;
  border-radius: 0.2rem;
  transition: 0.2s;

  &:hover {
    background-color: ${(props) => props.theme.color.yellow.light}; /* 버튼 호버 시 색상 조정 */
  }
`;

const ErrorMessage = styled.div`
  font-family: ${(props) => props.theme.font.light};
  margin-top: 10px;
  margin-left: 10px;
  font-size: 13px;
`;

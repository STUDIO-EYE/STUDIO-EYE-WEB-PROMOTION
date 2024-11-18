import { getCEOData } from '@/apis/PromotionAdmin/dataEdit';
import { PROMOTION_BASIC_PATH } from '@/constants/basicPathConstants';
import { ICEOData } from '@/types/PromotionAdmin/dataEdit';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { PA_ROUTES, PA_ROUTES_CHILD } from '@/constants/routerConstants';
import { useNavigate } from 'react-router-dom';
import FileButton from '@/components/PromotionAdmin/DataEdit/StyleComponents/FileButton';
import {
  DATAEDIT_NOTICE_COMPONENTS,
  DATAEDIT_TITLES_COMPONENTS,
} from '../../../../components/PromotionAdmin/DataEdit/Company/StyleComponents';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { dataUpdateState } from '@/recoil/atoms';
import { MSG } from '@/constants/messages';

interface IFormData {
  name: string;
  introduction: string;
}

const CEOEditPage = () => {
  const setIsEditing = useSetRecoilState(dataUpdateState);
  const isEditing = useRecoilValue(dataUpdateState);
  const navigator = useNavigate();
  const { data, isLoading, error, refetch } = useQuery<ICEOData, Error>(['ceo', 'id'], getCEOData);
  const [putData, setPutData] = useState({
    request: {
      name: data?.name,
      introduction: data?.introduction,
    },
    file: data ? data?.imageUrl : '',
    fileName: '',
  });

  const [imgChange, setImgChange] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>({
    defaultValues: {
      name: data?.name,
      introduction: data?.introduction,
    },
  });

  useEffect(() => {
    refetch();
  }, [data, refetch]);

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

  const onValid = (data: IFormData) => {
    handleSaveClick(data);
  };

  const handleSaveClick = async (data: IFormData) => {
    const formData = new FormData();

    formData.append(
      'request',
      new Blob(
        [
          JSON.stringify({
            name: data.name,
            introduction: data.introduction,
          }),
        ],
        { type: 'application/json' },
      ),
    );

    if (window.confirm('수정하시겠습니까?')) {
      if (imgChange) {
        // 이미지를 변경한 경우
        const file = await urlToFile(putData.file, putData.fileName || 'default.png'); // 파일 이름 사용
        if (file) {
          console.log('전송할 파일:', file); // 디버깅
          formData.append('file', file);
        } else {
          console.error('로고 이미지 가져오기 실패');
        }
        console.log('이미지 변경 여부', imgChange);
        axios
          .put(`${PROMOTION_BASIC_PATH}/api/ceo`, formData)
          .then((response) => {
            console.log('CEO data updated:', response);
            alert('수정되었습니다.');
            navigator(`${PA_ROUTES.DATA_EDIT}/${PA_ROUTES_CHILD.DATA_EDIT_CEO}`);
          })
          .catch((error) => console.error('Error updating CEO:', error));
        setIsEditing(false);
      } else {
        // 이미지를 변경하지 않은 경우
        axios
          .put(`${PROMOTION_BASIC_PATH}/api/ceo/modify`, formData)
          .then((response) => {
            console.log('CEO updated:', response);
            alert('수정되었습니다.');
            navigator(`${PA_ROUTES.DATA_EDIT}/${PA_ROUTES_CHILD.DATA_EDIT_CEO}`);
          })
          .catch((error) => console.error('Error updating CEO:', error));
        setIsEditing(false);
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
          fileName: file.name,
        }));
      };
      reader.readAsDataURL(file);
      setImgChange(true);
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

  const handleDelete = async () => {
    if (window.confirm('삭제하시겠습니까?')) {
      axios
        .delete(`${PROMOTION_BASIC_PATH}/api/ceo`)
        .then((response) => {})
        .catch((error) => console.log(error));
      alert('삭제되었습니다.');
      navigator(`${PA_ROUTES.DATA_EDIT}/${PA_ROUTES_CHILD.DATA_EDIT_CEO}`);
    }
  };
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

  const currentLength = putData.request.introduction?.length || 0;
  const maxLimit = 200; // 최대 글자 수

  if (isLoading) return <>is Loading..</>;
  if (error) return <>{error.message}</>;
  return (
    <Wrapper>
      {data && (
        <form onSubmit={handleSubmit(onValid)}>
          <ContentBlock>
            <ButtonWrapper>
              <Button data-cy='submit-button'>등록하기</Button>
            </ButtonWrapper>
            {DATAEDIT_TITLES_COMPONENTS.CEO}
            <InputWrapper>
              <InputTitle>
                <p>Name</p>
              </InputTitle>
              <input
                data-cy='ceo-edit-name-input'
                {...register('name', {
                  required: 'CEO 이름을 입력해주세요',
                })}
                placeholder='CEO 이름을 입력해주세요'
                maxLength={30}
                onChange={handleChange}
                value={putData.request.name}
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
                data-cy='ceo-edit-introduction-input'
                {...register('introduction', {
                  required: 'CEO 소개 (5줄, 200자 내로 작성해 주세요.)',
                })}
                placeholder='CEO 소개 (5줄, 200자 내로 작성해 주세요.)'
                onChange={handleChange}
                maxLength={200}
                value={putData.request.introduction}
              />
              {errors.introduction && <ErrorMessage>{errors.introduction.message}</ErrorMessage>}
              <InputImgWrapper>
                <Box>
                  <InputTitle>{DATAEDIT_TITLES_COMPONENTS.CEOIMG}</InputTitle>
                  {DATAEDIT_NOTICE_COMPONENTS.IMAGE.CEOIMG}
                  {DATAEDIT_NOTICE_COMPONENTS.COLOR.CEOIMG}
                  <LogoWrapper>
                    <FileButton
                      data-cy='ceo-edit-img'
                      id='CEOImgFile'
                      description='CEO Image Upload'
                      onChange={handleImageChange}
                    />
                    <ImgBox>
                      <img src={putData.file} alt='' data-cy='edit-uploaded-image' />
                    </ImgBox>
                  </LogoWrapper>
                </Box>
              </InputImgWrapper>
              <ButtonWrapper>
                <Button data-cy='dataEdit-DeleteButton' onClick={() => handleDelete()}>
                  삭제하기
                </Button>
              </ButtonWrapper>
            </InputWrapper>
          </ContentBlock>
        </form>
      )}
    </Wrapper>
  );
};

export default CEOEditPage;

const Wrapper = styled.div`
  display: flex;
  input,
  textarea {
    outline: none;
  }

  input:focus,
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

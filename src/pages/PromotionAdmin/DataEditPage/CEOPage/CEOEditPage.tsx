import { getCEOData } from '@/apis/PromotionAdmin/dataEdit';
import { PROMOTION_BASIC_PATH } from '@/constants/basicPathConstants';
import { ICEOData } from '@/types/PromotionAdmin/dataEdit';
import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import htmlToDraft from 'html-to-draftjs';
import draftToHtml from 'draftjs-to-html';
import TextEditor from '@/components/PromotionAdmin/FAQ/TextEditor';
import { IEditorData } from '@/types/PromotionAdmin/faq';
import { PA_ROUTES, PA_ROUTES_CHILD } from '@/constants/routerConstants';
import { useNavigate } from 'react-router-dom';

interface IFormData {
  name: string;
}

const CEOEditPage = () => {
  const navigator = useNavigate();
  const { data, isLoading, error } = useQuery<ICEOData, Error>(['ceo', 'id'], getCEOData);
  const [putData, setPutData] = useState({
    request: {
      name: data?.name,
      introduction: data?.introduction,
    },
    file: data ? data?.imageUrl : '',
  });
  const [imgChange, setImgChange] = useState(false);

  const { register, handleSubmit } = useForm<IFormData>({
    defaultValues: {
      name: data?.name,
    },
  });

  const [editorState, setEditorState] = useState(() => {
    const blocksFromHtml = data && htmlToDraft(data.introduction);
    if (blocksFromHtml) {
      const { contentBlocks, entityMap } = blocksFromHtml;
      const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
      return EditorState.createWithContent(contentState);
    } else {
      return EditorState.createEmpty();
    }
  });
  const [blocks, setBlocks] = useState<IEditorData[]>([]);

  const updateTextDescription = async (state: any) => {
    await setEditorState(state);
    setBlocks(convertToRaw(editorState.getCurrentContent()).blocks);
  };

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
            introduction: draftToHtml(convertToRaw(editorState.getCurrentContent())),
          }),
        ],
        { type: 'application/json' },
      ),
    );

    if (window.confirm('수정하시겠습니까?')) {
      if (imgChange) {
        // 이미지를 변경한 경우
        const file = await urlToFile(putData.file, 'CEOLogo.png');
        if (file) {
          formData.append('file', file);
        } else {
          console.error('로고 이미지 가져오기 실패');
        }
        axios
          .put(`${PROMOTION_BASIC_PATH}/api/ceo`, formData)
          .then((response) => {
            console.log('CEO data updated:', response);
            alert('수정되었습니다.');
            navigator(`${PA_ROUTES.DATA_EDIT}/${PA_ROUTES_CHILD.DATA_EDIT_CEO}`);
          })
          .catch((error) => console.error('Error updating CEO:', error));
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
      setImgChange(true);
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

  if (isLoading) return <>is Loading..</>;
  if (error) return <>{error.message}</>;
  return (
    <>
      <Wrapper>
        {data && (
          <form onSubmit={handleSubmit(onValid)}>
            <ContentBlock>
              <Title>Basic</Title>
              <InputWrapper>
                <p>Name</p>
                <input
                  {...register('name', {
                    required: '이름 입력해주세요',
                  })}
                  placeholder='이름 입력해주세요'
                />
              </InputWrapper>
            </ContentBlock>

            <ContentBlock>
              <Title>Introduction</Title>
              <InputWrapper>
                <p>Introduction</p>
                <TextEditor editorState={editorState} onEditorStateChange={updateTextDescription} />
              </InputWrapper>
            </ContentBlock>

            <ContentBlock>
              <Title>Logo</Title>
              <InputWrapper>
                <LogoWrapper>
                  <img src={putData.file} />
                  <label htmlFor='file'>
                    <div>Logo Upload</div>
                    <input id='file' type='file' accept='image/*' onChange={handleImageChange} />
                  </label>
                </LogoWrapper>
              </InputWrapper>
            </ContentBlock>
            <button>저장하기</button>
          </form>
        )}
        <button onClick={() => handleDelete()}>삭제하기</button>
      </Wrapper>
    </>
  );
};

export default CEOEditPage;

const Wrapper = styled.div`
  width: 800px;
`;
const ContentBlock = styled.div`
  display: flex;
  padding: 25px 10px;
  border-bottom: 2px solid ${(props) => props.theme.color.black.pale};
`;
const Title = styled.div`
  font-size: 22px;
  font-family: ${(props) => props.theme.font.medium};
  width: 300px;
`;
const InputWrapper = styled.div`
  display: flex;
  width: 400px;
  flex-direction: column;
  font-family: ${(props) => props.theme.font.light};
  p {
    font-size: 18px;
    padding-top: 7px;
    padding-bottom: 3px;
  }
  input {
    height: 30px;
  }
`;

const LogoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  div {
    cursor: pointer;
    border: none;
    background-color: ${(props) => props.theme.color.white.bold};
    box-shadow: 1px 1px 4px 0.1px #c6c6c6;
    padding: 0.4rem 1.4rem;
    border-radius: 0.2rem;
    transition: 0.2s;
    width: 130px;
    display: flex;
    justify-content: center;
    font-weight: 700;
    margin-right: 20px;

    &:hover {
      background-color: ${(props) => props.theme.color.yellow.light};
    }
  }

  input {
    display: none;
  }

  img {
    width: 200px;
    margin-bottom: 10px;
  }
`;
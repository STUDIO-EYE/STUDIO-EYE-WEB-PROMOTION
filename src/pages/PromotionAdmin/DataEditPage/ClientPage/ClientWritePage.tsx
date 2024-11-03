import styled from 'styled-components';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { PROMOTION_BASIC_PATH } from '@/constants/basicPathConstants';
import { ContentBlock } from '@/components/PromotionAdmin/DataEdit/Company/CompanyFormStyleComponents';
import Title from '@/components/PromotionAdmin/DataEdit/StyleComponents/Title';
import SubTitle from '@/components/PromotionAdmin/DataEdit/StyleComponents/SubTitle';
import FileButton from '@/components/PromotionAdmin/DataEdit/StyleComponents/FileButton';
import ToggleSwitch from '@/components/PromotionAdmin/DataEdit/StyleComponents/ToggleSwitch';
import Button from '@/components/PromotionAdmin/DataEdit/StyleComponents/Button';
import {
  DATAEDIT_NOTICE_COMPONENTS,
  INPUT_MAX_LENGTH,
} from '@/components/PromotionAdmin/DataEdit/Company/StyleComponents';
import { useSetRecoilState } from 'recoil';
import { dataUpdateState } from '@/recoil/atoms';
import { MSG } from '@/constants/messages';
import { useNavigate } from 'react-router-dom';
import { PA_ROUTES, PA_ROUTES_CHILD } from '@/constants/routerConstants';

interface IFormData {
  name: string;
  visibility: boolean;
}

function ClientWritePage() {
  const setIsEditing = useSetRecoilState(dataUpdateState);
  const navigate = useNavigate();
  const [postData, setPostData] = useState({
    clientInfo: {
      name: '',
      visibility: true,
    },
    logoImg: '',
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IFormData>();

  // 글자수 제한
  const [charLength, setCharLength] = useState(0);
  const handleCharChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputLength = e.target.value.length;
    if (inputLength <= INPUT_MAX_LENGTH.CLIENT_NAME) {
      setCharLength(inputLength);
      setValue('name', e.target.value, { shouldValidate: true });
      setIsEditing(true);
    } else {
      const trimmedValue = e.target.value.slice(0, INPUT_MAX_LENGTH.CLIENT_NAME);
      setCharLength(INPUT_MAX_LENGTH.CLIENT_NAME);
      setValue('name', trimmedValue, { shouldValidate: true });
    }
  };

  const onValid = (data: IFormData) => {
    if (postData.logoImg === '') {
      alert(MSG.INVALID_MSG.FILE);
      return;
    }

    handleSaveClick(data);
  };

  const handleSaveClick = async (data: IFormData) => {
    const formData = new FormData();

    formData.append(
      'clientInfo',
      new Blob(
        [
          JSON.stringify({
            name: data.name,
            visibility: data.visibility,
          }),
        ],
        { type: 'application/json' },
      ),
    );

    const file = await urlToFile(postData.logoImg, 'ClientLogo.png');
    formData.append('logoImg', file);

    if (window.confirm(MSG.CONFIRM_MSG.POST)) {
      axios
        .post(`${PROMOTION_BASIC_PATH}/api/client`, formData)
        .then((response) => {
          console.log('Client posted:', response);
          alert(MSG.ALERT_MSG.POST);
          setIsEditing(false);
          navigate(`${PA_ROUTES.DATA_EDIT}/${PA_ROUTES_CHILD.DATA_EDIT_CLIENT}`);
        })
        .catch((error) => console.error('Error updating client:', error));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const logoImg = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setPostData((prevData) => ({
          ...prevData,
          logoImg: reader.result as string,
        }));
      };
      reader.readAsDataURL(logoImg);
      setIsEditing(true);
    }
  };

  async function urlToFile(url: string, fileName: string): Promise<File> {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      // console.log(blob);
      return new File([blob], fileName);
    } catch (error) {
      console.error('Error URL to file:', error);
      throw error;
    }
  }

  return (
    <ContentBlock height={380}>
      <TitleWrapper>
        <Title description='Client 등록' />
      </TitleWrapper>

      <FormContainer onSubmit={handleSubmit(onValid)}>
        <LeftContainer>
          <LogoContainer>
            <SubTitle description='Logo' />
            {DATAEDIT_NOTICE_COMPONENTS.IMAGE.LOGO}
            {DATAEDIT_NOTICE_COMPONENTS.COLOR.LOGO}

            <ImgBox>{postData.logoImg && <img src={postData.logoImg} />}</ImgBox>
            <FileButton description='Logo Upload' id='file' width={230} onChange={handleImageChange} />
          </LogoContainer>
        </LeftContainer>

        <RightContainer>
          <InputWrapper>
            <SubTitle description='Name' />
            <div style={{ display: 'flex' }}>
              <input
                id="create_client_name"
                style={{ paddingLeft: '10px' }}
                {...register('name', {
                  required: MSG.PLACEHOLDER_MSG.NAME,
                  maxLength: INPUT_MAX_LENGTH.CLIENT_NAME,
                  validate: (value) => value.trim().length > 0 || MSG.INVALID_MSG.NAME,
                  onChange: handleCharChange,
                })}
                placeholder={MSG.PLACEHOLDER_MSG.NAME}
              />

              <CharCountWrapper>
                {charLength}/{INPUT_MAX_LENGTH.CLIENT_NAME}자
              </CharCountWrapper>
            </div>
            {errors.name && <p>{errors.name.message}</p>}
          </InputWrapper>
          <VisibilityWrapper>
            공개여부
            <input type='checkbox' id='switch' defaultChecked {...register('visibility')} />
            <ToggleSwitch option1='공개' option2='비공개' selected={true} />
          </VisibilityWrapper>
        </RightContainer>
      </FormContainer>
      <ButtonWrapper>
        <Button id='create_client_finish' onClick={handleSubmit(onValid)} description={MSG.BUTTON_MSG.POST} width={100} />
      </ButtonWrapper>
    </ContentBlock>
  );
}

export default ClientWritePage;

const CharCountWrapper = styled.div`
  font-size: 12px;
  color: gray;
  width: 60px;
  font-family: ${(props) => props.theme.font.light};
  align-self: flex-end;
  margin-left: 5px;
  padding-bottom: 20px;
`;

const RightContainer = styled.div`
  margin-left: 50px;
`;
const LeftContainer = styled.div``;
const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 200px;
  justify-content: space-between;
`;

const VisibilityWrapper = styled.div`
  #switch {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
  }

  .switch_label {
    display: flex;
    border-radius: 5px;
    cursor: pointer;
  }

  input {
    margin-top: 20px;
  }
`;

const TitleWrapper = styled.div`
  margin-top: 20px;
  margin-bottom: 30px;
`;

const ImgBox = styled.div`
  background-color: ${(props) => props.theme.color.background};
  width: 230px;
  border-radius: 4px;
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 90%;
    height: 90%;
    object-fit: contain;
  }
`;

const ButtonWrapper = styled.div`
  position: absolute;
  bottom: 20px;
  right: 15px;
`;

const FormContainer = styled.form`
  display: flex;
  position: relative;
  width: 100%;
`;

const InputWrapper = styled.div`
  width: 460px;
  display: flex;
  flex-direction: column;
  input {
    margin-top: 10px;
    margin-bottom: 15px;
    width: 100%;
    outline: none;
    font-family: ${(props) => props.theme.font.regular};
    font-size: 14px;
    height: 40px;
    border: none;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  }
  input:focus {
    transition: 0.2s;
    border-bottom: 3px solid ${(props) => props.theme.color.symbol};
  }

  p {
    font-size: 14px;
    color: ${(props) => props.theme.color.symbol};
  }
`;

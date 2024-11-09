import { getCompanyData } from '@/apis/PromotionAdmin/dataEdit';
import { ICompanyData } from '@/types/PromotionAdmin/dataEdit';
import { putCompanySloganData, putCompanyLogosData, putCompanyLogosSloganData } from '@/apis/PromotionAdmin/dataEdit';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { theme } from '@/styles/theme';

import {
  Wrapper,
  ContentBlock,
  ImgBox,
  LogoWrapper,
  Box,
  RowWrapper,
  SloganWrapper,
  SloganBox,
} from '../CompanyFormStyleComponents';
import { DATAEDIT_NOTICE_COMPONENTS, DATAEDIT_TITLES_COMPONENTS } from '../StyleComponents';
import FileButton from '../../StyleComponents/FileButton';
import Button from '../../StyleComponents/Button';
import styled from 'styled-components';
import { MSG } from '@/constants/messages';
import { useSetRecoilState } from 'recoil';
import { dataUpdateState } from '@/recoil/atoms';

interface IImageProps {
  setEditImage: (editMode: boolean) => void;
}

const Image = ({ setEditImage }: IImageProps) => {
  const { data, isLoading, error, refetch } = useQuery<ICompanyData, Error>(['company', 'id'], getCompanyData);
  const [logoChange, setLogoChange] = useState(false);
  const [sloganChange, setSloganChange] = useState(false);
  const [putData, setPutData] = useState({
    lightLogoImageUrl: '',
    darkLogoImageUrl: '',
    sloganImageUrl: '',
  });
  const setIsEditing = useSetRecoilState(dataUpdateState);

  useEffect(() => {
    if (data) {
      setPutData({
        lightLogoImageUrl: data.lightLogoImageUrl,
        darkLogoImageUrl: data.darkLogoImageUrl,
        sloganImageUrl: data.sloganImageUrl,
      });
    }
  }, [data]);

  const handleSaveClick = async () => {
    const formData = new FormData();

    if (window.confirm(MSG.CONFIRM_MSG.SAVE)) {
      try {
        if (logoChange) {
          const lightLogoFile = putData.lightLogoImageUrl
            ? await urlToFile(putData.lightLogoImageUrl, 'LightLogo.png')
            : null;
          const darkLogoFile = putData.darkLogoImageUrl
            ? await urlToFile(putData.darkLogoImageUrl, 'DarkLogo.png')
            : null;
          if (lightLogoFile) formData.append('lightLogoImage', lightLogoFile);
          if (darkLogoFile) formData.append('darkLogoImage', darkLogoFile);
        }

        if (sloganChange) {
          const sloganFile = putData.sloganImageUrl ? await urlToFile(putData.sloganImageUrl, 'Slogan.png') : null;
          if (sloganFile) formData.append('sloganImageUrl', sloganFile);
        }

        if (logoChange && sloganChange) {
          await putCompanyLogosSloganData(formData);
        } else if (logoChange) {
          await putCompanyLogosData(formData);
        } else if (sloganChange) {
          await putCompanySloganData(formData);
        }

        const updatedData = await refetch();
        if (updatedData.data) {
          setPutData(updatedData.data);
        }

        alert(MSG.ALERT_MSG.SAVE);
        setEditImage(false);
        setLogoChange(false);
        setSloganChange(false);
      } catch (error) {
        console.error('Error updating company:', error);
        alert('저장 중 문제가 발생했습니다. 다시 시도해 주세요.');
      }
    }
  };

  const handleImageChange = (file: File, key: string, changeSetter: React.Dispatch<React.SetStateAction<boolean>>) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setPutData((prevData) => ({
        ...prevData,
        [key]: reader.result as string,
      }));
      changeSetter(true);
      setIsEditing(true);
    };
    reader.readAsDataURL(file);
  };

  const handleLightLogoImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleImageChange(e.target.files[0], 'lightLogoImageUrl', setLogoChange);
    }
  };

  const handleDarkLogoImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleImageChange(e.target.files[0], 'darkLogoImageUrl', setLogoChange);
    }
  };

  const handleSloganImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleImageChange(e.target.files[0], 'sloganImageUrl', setSloganChange);
    }
  };

  async function urlToFile(url: string, fileName: string): Promise<File> {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('네트워크 오류로 파일을 가져올 수 없습니다.');
      const blob = await response.blob();
      return new File([blob], fileName);
    } catch (error) {
      console.error('Error URL to file:', error);
      throw error;
    }
  }

  if (isLoading) return <>is Loading..</>;
  if (error) return <>{error.message}</>;
  return (
    <>
      <Wrapper>
        {data && (
          <>
            <ContentBlock isFocused={true}>
              <InputImgWrapper>
                <RowWrapper>
                  <Box>
                    {DATAEDIT_TITLES_COMPONENTS.Logo}
                    {DATAEDIT_NOTICE_COMPONENTS.IMAGE.LOGO}
                    {DATAEDIT_NOTICE_COMPONENTS.COLOR.LOGO}

                    <LogoWrapper>
                      <FileButton
                        id='lightLogo'
                        description={MSG.BUTTON_MSG.UPLOAD.LOGO}
                        onChange={handleLightLogoImageChange}
                      />

                      <ImgBox>
                        <img src={putData.lightLogoImageUrl} alt='' />
                      </ImgBox>
                    </LogoWrapper>
                  </Box>
                  <Box>
                    {DATAEDIT_TITLES_COMPONENTS.Logo}
                    {DATAEDIT_NOTICE_COMPONENTS.IMAGE.LOGO}
                    {DATAEDIT_NOTICE_COMPONENTS.COLOR.LOGO}

                    <LogoWrapper>
                      <FileButton
                        id='darkLogo'
                        description={MSG.BUTTON_MSG.UPLOAD.LOGO}
                        onChange={handleDarkLogoImageChange}
                      />

                      <ImgBox style={{ backgroundColor: theme.color.white.light }}>
                        <img src={putData.darkLogoImageUrl} alt='' />
                      </ImgBox>
                    </LogoWrapper>
                  </Box>
                </RowWrapper>
                <Box style={{ marginTop: '20px', width: '100%' }}>
                  {DATAEDIT_TITLES_COMPONENTS.Slogan}
                  {DATAEDIT_NOTICE_COMPONENTS.IMAGE.SLOGAN}
                  {DATAEDIT_NOTICE_COMPONENTS.COLOR.SLOGAN}
                  <SloganWrapper>
                    <FileButton
                      id='sloganFile'
                      description={MSG.BUTTON_MSG.UPLOAD.SLOGAN}
                      onChange={handleSloganImageChange}
                    />

                    <SloganBox>
                      <img src={putData.sloganImageUrl} alt='' />
                    </SloganBox>
                  </SloganWrapper>
                </Box>
                <ButtonWrapper>
                  <Button fontSize={14} width={100} description={MSG.BUTTON_MSG.SAVE} onClick={handleSaveClick} />
                </ButtonWrapper>
              </InputImgWrapper>
            </ContentBlock>
          </>
        )}
      </Wrapper>
    </>
  );
};

export default Image;

const ButtonWrapper = styled.div`
  position: absolute;
  right: 0px;
`;

const InputImgWrapper = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  justify-content: space-between;
  flex-direction: column;
`;

import { getCompanyData } from '@/apis/PromotionAdmin/dataEdit';
import { ICompanyData } from '@/types/PromotionAdmin/dataEdit';
import React, { useEffect, useState } from 'react';
import { theme } from '@/styles/theme';
import { useQuery } from 'react-query';

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
import { DATAEDIT_TITLES_COMPONENTS } from '../StyleComponents';
import Button from '../../StyleComponents/Button';
import styled from 'styled-components';
import { MSG } from '@/constants/messages';

interface IImageProps {
  setEditImage: (editMode: boolean) => void;
}

const Image = ({ setEditImage }: IImageProps) => {
  const { data, isLoading, error } = useQuery<ICompanyData, Error>(['company', 'id'], getCompanyData);
  const [putData, setPutData] = useState({
    lightLogoImageUrl: '',
    darkLogoImageUrl: '',
    sloganImageUrl: '',
  });

  useEffect(() => {
    if (data) {
      setPutData({
        lightLogoImageUrl: data.lightLogoImageUrl,
        darkLogoImageUrl: data.darkLogoImageUrl,
        sloganImageUrl: data.sloganImageUrl,
      });
    }
  }, [data]);

  if (isLoading) return <>is Loading..</>;
  if (error) return <>{error.message}</>;
  return (
    <>
      <Wrapper>
        {data && (
          <>
            <ContentBlock>
              <InputImgWrapper>
                <RowWrapper>
                  <Box>
                    {DATAEDIT_TITLES_COMPONENTS.Logo}

                    <LogoWrapper>
                      <ImgBox>
                        <img src={`${putData.lightLogoImageUrl}`} />
                      </ImgBox>
                    </LogoWrapper>
                  </Box>
                  <Box>
                    {DATAEDIT_TITLES_COMPONENTS.Logo}

                    <LogoWrapper style={{ alignItems: 'flex-end' }}>
                      <ImgBox style={{ backgroundColor: theme.color.white.light }}>
                        <img src={`${putData.darkLogoImageUrl}`} />
                      </ImgBox>
                    </LogoWrapper>
                  </Box>
                </RowWrapper>
                <Box style={{ marginTop: '20px', width: '100%' }}>
                  {DATAEDIT_TITLES_COMPONENTS.Slogan}

                  <SloganWrapper>
                    <SloganBox>
                      <img src={`${putData.sloganImageUrl}`} />
                    </SloganBox>
                  </SloganWrapper>
                </Box>
                <ButtonWrapper>
                  <Button
                    fontSize={14}
                    width={100}
                    description={MSG.BUTTON_MSG.MODIFY}
                    onClick={() => setEditImage(true)}
                  />
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

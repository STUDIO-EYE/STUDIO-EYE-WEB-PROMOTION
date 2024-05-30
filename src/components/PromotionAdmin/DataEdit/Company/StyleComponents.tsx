import styled from 'styled-components';
import { ReactComponent as InfoIcon } from '@/assets/images/PA/infoIcon.svg';
import Title from '../StyleComponents/Title';
import Tooltip from '../StyleComponents/Tooltip';

const TitleWrapper = styled.div`
  display: flex;
`;

const IMAGE_PIXEL = {
  LOGO: '200x200',
  SLOGAN: '1080x1080',
};

const IMAGE_COLOR = {
  LOGO: '밝은 색상',
  SLOGAN: '밝은 색상',
};

const DATAEDIT_COLUMNS = {
  CEO: {
    title: 'CEO',
    description: 'About 화면에 반영됩니다.',
  },

  Basic: {
    title: 'Basic',
    description: 'Contact 화면과 Footer에 반영됩니다.',
  },

  Logo: {
    title: 'Logo',
    description: 'Header, Footer에 반영됩니다.',
  },

  Slogan: {
    title: 'Slogan',
    description: 'About 화면에 반영됩니다.',
  },

  Detail: {
    title: 'Detail',
    description: 'About 화면에 반영됩니다.',
  },

  Introduction: {
    title: 'Introduction',
    description:
      'Main Overview: Main 화면에 반영됩니다. \n Commitment: Main 화면에 반영됩니다. \n Introduction: About 화면 반영됩니다. ',
  },

  Partner: {
    title: 'Partner',
    description: 'About 화면에 반영됩니다.',
  },

  Client: {
    title: 'Client',
    description: 'Main 화면에 반영됩니다.',
  },
};

export const DATAEDIT_NOTICE_COMPONENTS = {
  IMAGE: {
    LOGO: <div>{IMAGE_PIXEL.LOGO}</div>,
    SLOGAN: <div>{IMAGE_PIXEL.SLOGAN}</div>,
  },

  COLOR: {
    LOGO: <div>{IMAGE_COLOR.LOGO}</div>,
    SLOGAN: <div>{IMAGE_COLOR.SLOGAN}</div>,
  },
};

export const DATAEDIT_TITLES_COMPONENTS = {
  Basic: (
    <TitleWrapper>
      <Tooltip description={DATAEDIT_COLUMNS.Basic.description} svgComponent={<InfoIcon width={20} height={20} />} />
      <Title description={DATAEDIT_COLUMNS.Basic.title} />
    </TitleWrapper>
  ),

  Logo: (
    <TitleWrapper>
      <Tooltip description={DATAEDIT_COLUMNS.Logo.description} svgComponent={<InfoIcon width={20} height={20} />} />
      <Title description={DATAEDIT_COLUMNS.Logo.title} />
    </TitleWrapper>
  ),

  Slogan: (
    <TitleWrapper>
      <Tooltip description={DATAEDIT_COLUMNS.Slogan.description} svgComponent={<InfoIcon width={20} height={20} />} />
      <Title description={DATAEDIT_COLUMNS.Slogan.title} />
    </TitleWrapper>
  ),

  Introduction: (
    <TitleWrapper>
      <Tooltip
        description={DATAEDIT_COLUMNS.Introduction.description}
        svgComponent={<InfoIcon width={20} height={20} />}
      />
      <Title description={DATAEDIT_COLUMNS.Introduction.title} />
    </TitleWrapper>
  ),

  Detail: (
    <TitleWrapper>
      <Tooltip description={DATAEDIT_COLUMNS.Detail.description} svgComponent={<InfoIcon width={20} height={20} />} />
      <Title description={DATAEDIT_COLUMNS.Detail.title} />
    </TitleWrapper>
  ),

  Partner: (
    <TitleWrapper>
      <Tooltip description={DATAEDIT_COLUMNS.Partner.description} svgComponent={<InfoIcon width={20} height={20} />} />
      <Title description={DATAEDIT_COLUMNS.Partner.title} />
    </TitleWrapper>
  ),

  Client: (
    <TitleWrapper>
      <Tooltip description={DATAEDIT_COLUMNS.Client.description} svgComponent={<InfoIcon width={20} height={20} />} />
      <Title description={DATAEDIT_COLUMNS.Client.title} />
    </TitleWrapper>
  ),
};

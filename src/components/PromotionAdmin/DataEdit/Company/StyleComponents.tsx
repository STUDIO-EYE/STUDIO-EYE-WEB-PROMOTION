import styled from 'styled-components';
import { ReactComponent as InfoIcon } from '@/assets/images/PA/infoIcon.svg';
import Title from '../StyleComponents/Title';
import Tooltip from '../StyleComponents/Tooltip';
import NoticeComponent from '../StyleComponents/NoticeComponent';

const TitleWrapper = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

export const INPUT_MAX_LENGTH = {
  BASIC_ADDRESS: 100,
  BASIC_ENGLISH_ADDRESS: 150,
  BASIC_PHONE: 20,
  BASIC_FAX: 20,
  INFOMATION_MAIN_OVERVIEW: 80,
  INFOMATION_COMMITMENT: 250,
  INFOMATION_INTRODUCTION: 250,
  DETAIL_TITLE: 20,
  DETAIL_CONTENT: 200,
  FAQ_QUESTION: 50,
  CLIENT_NAME: 30,
  PARTNER_NAME: 30,
  PARTNER_LINK: 50,
};

const IMAGE_PIXEL = {
  LOGO: '200x200',
  SLOGAN: '1080x1080',
  CEOIMG: '320x330',
  BENEFIT: '100x100',
};

const IMAGE_COLOR = {
  LOGO: '밝은 색상',
  SLOGAN: '밝은 색상',
  CEOIMG: '밝은 색상',
  BENEFIT: '투명 배경',
};

const DATAEDIT_COLUMNS = {
  CEO: {
    title: 'CEO',
    description: 'About 화면에 반영됩니다.',
  },

  CEOIMG: {
    title: 'CEO Image',
    description: 'CEO 이미지 설정입니다. (CEO 소개 배경과 아래 사진 배경이 같습니다.)',
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
      'Main Overview: Main 화면에 반영됩니다. \nCommitment: Main 화면에 반영됩니다. \nIntroduction: About 화면 반영됩니다. ',
    recommand: '공식 홈페이지 배경색은 검정색입니다.\n글자색은 밝은 색상을 사용하는 것을 권장합니다.',
  },

  Partner: {
    title: 'Partner',
    description: 'About 화면에 반영됩니다.',
  },

  Client: {
    title: 'Client',
    description: 'Main 화면에 반영됩니다.',
  },

  FAQ: {
    title: 'FAQ',
    description: 'FAQ 화면에 반영됩니다.',
  },

  Benefit: {
    title: 'Benefit',
    description: 'Recruitment 화면에 반영됩니다.',
  },

  BenefitIcon: {
    title: 'Benefit Icon',
    description: '사내 복지 아이콘 설정입니다. (아래의 아이콘이 반영됩니다.)',
    recommand:
      'Recruitment 페이지는 하얀색 배경입니다.\n\n설정할 아이콘의 배경은 꼭 투명으로 설정하고 100x100 또는 정사각형 이미지로 업로드 해주세요.\n\n* 사내 복지는 최대 30개 등록 가능합니다 *',
  },
};

export const DATAEDIT_NOTICE_COMPONENTS = {
  IMAGE: {
    LOGO: <NoticeComponent description={`권장 픽셀: ${IMAGE_PIXEL.LOGO}`} />,
    SLOGAN: <NoticeComponent description={`권장 픽셀: ${IMAGE_PIXEL.SLOGAN}`} />,
    CEOIMG: <NoticeComponent description={`권장 픽셀: ${IMAGE_PIXEL.CEOIMG}`} />,
  },

  COLOR: {
    LOGO: <NoticeComponent description={`권장 색상: ${IMAGE_COLOR.LOGO}`} />,
    SLOGAN: <NoticeComponent description={`권장 색상: ${IMAGE_COLOR.SLOGAN}`} />,
    CEOIMG: <NoticeComponent description={`권장 색상: ${IMAGE_COLOR.CEOIMG}`} />,
  },

  TEXT: {
    INTRODUCTION: <NoticeComponent description={DATAEDIT_COLUMNS.Introduction.recommand} />,
    BENEFIT: <NoticeComponent description={DATAEDIT_COLUMNS.BenefitIcon.recommand} />,
  },
};

export const DATAEDIT_TITLES_COMPONENTS = {
  CEO: (
    <TitleWrapper>
      <Tooltip description={DATAEDIT_COLUMNS.CEO.description} svgComponent={<InfoIcon width={20} height={20} />} />
      <Title description={DATAEDIT_COLUMNS.CEO.title} />
    </TitleWrapper>
  ),

  CEOIMG: (
    <TitleWrapper>
      <Tooltip description={DATAEDIT_COLUMNS.CEOIMG.description} svgComponent={<InfoIcon width={20} height={20} />} />
      <Title description={DATAEDIT_COLUMNS.CEOIMG.title} />
    </TitleWrapper>
  ),

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

  FAQ: (
    <TitleWrapper style={{ marginBottom: 0 }}>
      <Tooltip description={DATAEDIT_COLUMNS.FAQ.description} svgComponent={<InfoIcon width={20} height={20} />} />
      {/* <Title description={DATAEDIT_COLUMNS.FAQ.title} /> */}
    </TitleWrapper>
  ),

  Benefit: (
    <TitleWrapper style={{ marginBottom: 0 }}>
      <Tooltip description={DATAEDIT_COLUMNS.Benefit.description} svgComponent={<InfoIcon width={20} height={20} />} />
      <Title description={DATAEDIT_COLUMNS.Benefit.title} />
    </TitleWrapper>
  ),
  BenefitIcon: (
    <TitleWrapper>
      <Tooltip
        description={DATAEDIT_COLUMNS.BenefitIcon.description}
        svgComponent={<InfoIcon width={20} height={20} />}
      />
      <Title description={DATAEDIT_COLUMNS.BenefitIcon.title} />
    </TitleWrapper>
  ),
};

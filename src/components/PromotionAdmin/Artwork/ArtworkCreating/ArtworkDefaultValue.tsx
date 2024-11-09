import { projectType } from '@/types/PromotionAdmin/artwork';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import styled from 'styled-components';
import CategoryDropDown from '../CategoryDropDown';
import ImageUpload from './ImageUpload';

export type DefaultValueItem = {
  name: string;
  title: string;
  description: string;
  content: React.ReactNode;
  error?: string;
};

export const getArtworkDefaultValue = (
  selectedDate: Date | null,
  handleDateChange: (date: Date | null) => void,
  selectedCategory: string,
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>,
  isprojectopened: boolean,
  handleTogglePosted: () => void,
  projectType: projectType,
  setProjectType: (type: projectType) => void,
  link: string,
  handleLinkChange: (newLink: string) => void,
  mainImage: File | undefined | null,
  handleMainImageChange: (newImage: File | File[]) => void,
  responsiveMain: File | undefined | null,
  handleResponsiveMainImageChange: (newImage: File|File[])=>void,
  detailImage: File[],
  handleDetailImageChange: (newImages: File | File[]) => void,
  title: string,
  handleTitleChange: (newTitle: string) => void,
  customer: string,
  handleCustomerChange: (newCustomer: string) => void,
  overview: string,
  handleOverviewChange: (newOverview: string) => void,
  isTopMainArtwork: boolean,
  getModeMainImg?: string,
  getModeResponsiveMainImg? : string,
  getModeDetailImgs?: string[],
  isGetMode?: boolean,
) => {
  const defaultValue: DefaultValueItem[] = [
    {
      name: 'title',
      title: '아트워크 제목',
      description: '아트워크 제목은 최대 30자까지 입력 가능합니다.',
      content: isGetMode ? (
        <GetInputWrapper>{title}</GetInputWrapper>
      ) : (
        <StyledInput
          data-cy='create_artwork_title'
          required
          value={title}
          type='text'
          maxLength={30}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleTitleChange(e.target.value)}
        />
      ),
    },
    {
      name: 'overview',
      title: '아트워크 설명',
      description: '아트워크 설명은 최대 120자까지 입력 가능합니다.',
      content: isGetMode ? (
        <GetInputWrapper>{overview}</GetInputWrapper>
      ) : (
        <OverviewInput
          data-cy='create_artwork_overview'
          required
          type='text'
          value={overview}
          maxLength={120}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleOverviewChange(e.target.value)}
        />
      ),
    },
    {
      name: 'customer',
      title: '아트워크 고객사',
      description: '아트워크 고객사는 최대 30자까지 입력 가능합니다.',
      content: isGetMode ? (
        <GetInputWrapper>{customer}</GetInputWrapper>
      ) : (
        <StyledInput
          data-cy='create_artwork_customer'
          required
          type='text'
          value={customer}
          maxLength={30}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleCustomerChange(e.target.value)}
        />
      ),
    },
    {
      name: 'date',
      title: '아트워크 제작 일시',
      description: '해당 아트워크의 제작 일시를 선택해주세요.',
      content: isGetMode ? (
        <GetInputWrapper>{selectedDate ? dayjs(selectedDate).format('YYYY-MM-DD') : ''}</GetInputWrapper>
      ) : (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            format='YYYY-MM-DD'
            value={selectedDate ? dayjs(selectedDate) : null}
            onChange={(newValue) => handleDateChange(newValue ? newValue.toDate() : null)}
            slotProps={{
              textField: {
                inputProps:{'data-cy':'create_artwork_date'},
                sx: {
                  backgroundColor: '#dadada9f',
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
      ),
    },
    {
      name: 'category',
      title: '아트워크 카테고리',
      description: '',
      content: isGetMode ? (
        <GetInputWrapper>{selectedCategory}</GetInputWrapper>
      ) : (
        <CategoryDropDown data-cy="create_artwork_category" putCategory={selectedCategory.toString()} setSelectedCategory={setSelectedCategory} />
      ),
    },
    {
      name: 'link',
      title: '아트워크 외부 연결 미디어 링크',
      description: '',
      content: isGetMode ? (
        <GetHrefContainer>
          <GetHrefWrapper href={link} target='_blank'>
            {link}
          </GetHrefWrapper>
        </GetHrefContainer>
      ) : (
        <StyledInput
          data-cy='create_artwork_link'
          required
          type='text'
          value={link}
          placeholder='링크를 입력하세요'
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleLinkChange(e.target.value)}
        />
      ),
    },
    {
      name: 'artworkType',
      title: '아트워크 타입',
      description: `① Top\n 메인 페이지에서 가장 먼저 보이는 아트워크이며, 1개만 지정할 수 있습니다. \n\n ③ Main\n 메인 페이지에서 슬라이드로 보이는 아트워크이며, 최대 5개까지 지정할 수 있습니다. \n\n ② Others\n 그 외의 아트워크 유형으로, 아트워크 페이지에서 보여집니다.`,
      content: (
        <TypeContainer data-cy='create_artwork_artworkType' projectType={projectType}>
          <div onClick={() => !isGetMode && projectType !== 'top' && setProjectType('top')}>Top</div>
          <div onClick={() => !isGetMode && projectType !== 'main' && setProjectType('main')}>Main</div>
          <div onClick={() => !isGetMode && projectType !== 'others' && setProjectType('others')}>Others</div>
        </TypeContainer>
      ),
    },
    {
      name: 'isOpened',
      title: '아트워크 프로모션 페이지 공개 여부',
      description: '비공개로 설정할 시, 프로모션의 아트워크 페이지에서 숨겨집니다.',
      content: isTopMainArtwork ? (
        <>
          <IsTopMainArtworkText>⚠ Top, Main 선택 시 항상 프로모션 페이지에 공개됩니다.</IsTopMainArtworkText>
          <IsTopMainArtworkContainer data-cy='create_artwork_isOpened'>
            <div data-cy='create_artwork_isOpened_open' onClick={() => !isGetMode && !isprojectopened && handleTogglePosted()}>공개</div>
            <div data-cy='create_artwork_isOpened_hide' onClick={() => !isGetMode && isprojectopened && handleTogglePosted()}>비공개</div>
          </IsTopMainArtworkContainer>
        </>
      ) : (
        <Ispostedcontainer data-cy='create_artwork_isOpened' isopened={isprojectopened ? 'true' : 'false'}>
          <div data-cy='create_artwork_isOpened_open' onClick={() => !isGetMode && !isprojectopened && handleTogglePosted()}>공개</div>
          <div data-cy='create_artwork_isOpened_hide' onClick={() => !isGetMode && isprojectopened && handleTogglePosted()}>비공개</div>
        </Ispostedcontainer>
      ),
    },

    {
      name: 'mainImage',
      title: '아트워크 썸네일 이미지 설정',
      description: '썸네일 이미지는 최대 한 개만 설정 가능합니다.',
      content:
        isGetMode && getModeMainImg ? (
          <IsGetModeImg
            src={getModeMainImg}
            alt='메인 이미지'
            style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
          />
        ) : (
          <>
            <ImageUpload
              type='main'
              value={mainImage}
              onChange={(newImage: File | File[]) => handleMainImageChange(newImage)}
            />
          </>
        ),
    },
    {
      name: 'responsiveMainImage',
      title: '아트워크 반응형 썸네일 이미지 설정',
      description: '반응형 썸네일 이미지는 최대 한 개만 설정 가능합니다.\n권장픽셀: 400px*900px',
      content:
      isGetMode && getModeResponsiveMainImg ? (
        <IsGetModeImg
          src={getModeResponsiveMainImg}
          alt='메인 반응형 이미지'
          style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
        />
      ) : (
        <>
          <ImageUpload
            type='responsiveMain'
            value={responsiveMain}
            onChange={(newImage: File | File[]) => handleResponsiveMainImageChange(newImage)}
          />
        </>
      ),
    },
    {
      name: 'detailImages',
      title: '아트워크 서브 이미지',
      description:
        '아트워크 서브 이미지는 해당 아트워크 페이지 안에서 보이며, 최소 1개에서 최대 3개까지 지정 가능합니다.',

      content:
        isGetMode && getModeDetailImgs ? (
          getModeDetailImgs.map((i, index) => (
            <IsGetModeImg
              src={i}
              alt='메인 이미지'
              style={{ width: '100%', height: 'auto', objectFit: 'contain', marginBottom: '30px' }}
            />
          ))
        ) : (
          <ImageUpload
            type='detail'
            value={detailImage}
            onChange={(newImages: File | File[]) => handleDetailImageChange(newImages)}
          />
        ),
    },
  ];
  return defaultValue;
};

export default getArtworkDefaultValue;

const IsGetModeImg = styled.img`
  border-radius: 10px;
`;

const IsTopMainArtworkText = styled.h1`
  font-family: 'pretendard-semibold';
  margin-bottom: 8px;
  font-size: 13px;
  color: #4e4e4ec5;
`;

const IsTopMainArtworkContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  font-family: 'pretendard-semibold';
  background-color: #cacaca88;
  height: 40px;
  border-radius: 20px;
  position: relative;
  width: 150px;

  h1 {
  }

  div {
    z-index: 1;
    flex: 1;
    text-align: center;
    padding: 5px 0;
    font-weight: normal;
    color: grey;
  }
`;

const Ispostedcontainer = styled.div<{ isopened: string }>`
  display: flex;
  align-items: center;
  cursor: pointer;
  font-family: 'pretendard-semibold';
  background-color: #a3a3a360;
  height: 40px;
  border-radius: 20px;
  position: relative;
  width: 150px;

  &::before {
    content: '';
    position: absolute;
    width: 75px;
    height: 100%;
    background-color: #fcfcfce2;
    border-radius: 20px;
    transition: transform 0.3s ease-in-out;
    transform: ${(props) => (props.isopened === 'true' ? 'translateX(0)' : 'translateX(75px)')};
  }

  div {
    z-index: 1;
    flex: 1;
    text-align: center;
    padding: 5px 0;
    font-weight: normal;
    color: grey;

    &:first-child {
      color: ${(props) => (props.isopened === 'true' ? 'black' : 'grey')};
      font-weight: ${(props) => (props.isopened === 'true' ? 'bold' : 'normal')};
    }

    &:last-child {
      color: ${(props) => (props.isopened === 'true' ? 'grey' : 'black')};
      font-weight: ${(props) => (props.isopened === 'true' ? 'normal' : 'bold')};
    }
  }
`;
const TypeContainer = styled.div<{ projectType: projectType }>`
  display: flex;
  align-items: center;
  cursor: pointer;
  font-family: 'pretendard-semibold';
  background-color: #a3a3a360;
  height: 40px;
  border-radius: 20px;
  position: relative;
  width: 225px;

  &::before {
    content: '';
    position: absolute;
    width: 75px;
    height: 100%;
    background-color: #fcfcfce2;
    border-radius: 20px;
    transition: transform 0.3s ease-in-out;
    transform: ${(props) => {
      switch (props.projectType) {
        case 'top':
          return 'translateX(0)';
        case 'main':
          return 'translateX(75px)';
        case 'others':
          return 'translateX(150px)';
        default:
          return 'translateX(0)';
      }
    }};
  }

  div {
    z-index: 1;
    flex: 1;
    text-align: center;
    padding: 5px 0;
    font-weight: normal;
    color: grey;

    &:nth-child(1) {
      color: ${(props) => (props.projectType === 'top' ? 'black' : 'grey')};
      font-weight: ${(props) => (props.projectType === 'top' ? 'bold' : 'normal')};
    }

    &:nth-child(2) {
      color: ${(props) => (props.projectType === 'main' ? 'black' : 'grey')};
      font-weight: ${(props) => (props.projectType === 'main' ? 'bold' : 'normal')};
    }

    &:nth-child(3) {
      color: ${(props) => (props.projectType === 'others' ? 'black' : 'grey')};
      font-weight: ${(props) => (props.projectType === 'others' ? 'bold' : 'normal')};
    }
  }
`;

const StyledInput = styled.input`
  width: 90%;
  height: 'fit-content';
  padding: 8px;
  height: 30px;
  font-family: 'pretendard-medium';
  outline-style: none;
  border-radius: 5px;
  font-size: 15px;
  border: none;
  color: black;
  margin-bottom: 20px;
  background-color: #dadada9f;
  &:hover {
    cursor: pointer;
    background-color: #ffffff73;
    transition: all 300ms ease-in-out;
  }
  &:focus {
    background-color: white;
    transition: all 300ms ease-in-out;
  }
  ::placeholder {
    color: #7a7a7a;
  }
`;
const GetInputWrapper = styled.div`
  width: 80%;
  padding: 8px;
  border: none;
  border-bottom: 1px solid #ccc;
  font-size: 15px;
  line-height: 140%;
  font-family: 'pretendard-regular';
`;

const GetHrefContainer = styled.div`
  width: 100%;
  border-bottom: 1px solid #ccc;
  padding: 8px;
`;
const GetHrefWrapper = styled.a`
  text-decoration: none;
  border: none;
  font-size: 17px;
  line-height: 140%;
  font-family: 'pretendard-regular';
`;
const OverviewInput = styled.input`
  width: 90%;
  height: 'fit-content';
  padding: 8px;
  height: 30px;
  font-family: 'pretendard-medium';
  outline-style: none;
  border-radius: 5px;
  font-size: 15px;
  border: none;
  background-color: #d1d1d1a0;
  color: black;
  margin-bottom: 20px;
  &:hover {
    cursor: pointer;
    background-color: #ffffff73;
    transition: all 300ms ease-in-out;
  }
  &:focus {
    background-color: white;
    transition: all 300ms ease-in-out;
  }
  ::placeholder {
    color: #7a7a7a;
  }
`;

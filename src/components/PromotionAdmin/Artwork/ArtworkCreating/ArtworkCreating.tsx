import React, { useEffect, useState } from 'react';
import getArtworkDefaultValue, { DefaultValueItem } from './ArtworkDefaultValue';
import styled from 'styled-components';
import ArtworkValueLayout from './ArtworkValueLayout';
import { projectType } from '@/types/PromotionAdmin/artwork';
import { backdropState } from '@/recoil/atoms';
import { useRecoilState } from 'recoil';
import { postArtwork } from '@/apis/PromotionAdmin/artwork';
import { linkCheck } from '@/components/ValidationRegEx/ValidationRegEx';
import { useNavigate } from 'react-router-dom';
import { PA_ROUTES } from '@/constants/routerConstants';
import { MSG } from '@/constants/messages';

const ArtworkCreating = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isProjectOpened, setIsProjectOpened] = useState<boolean>(false);
  const [projectType, setProjectType] = useState<projectType>('others');
  const [link, setLink] = useState('');
  const [mainImage, setMainImage] = useState<File>();
  const [responsiveMainImage, setResponsiveMainImage] = useState<File>();
  const [detailImages, setDetailImages] = useState<File[]>([]);
  const [title, setTitle] = useState('');
  const [customer, setCustomer] = useState('');
  const [producingIsOpend, setProducingIsOpened] = useRecoilState(backdropState);
  const [overview, setOverview] = useState('');
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true);
  const [linkRegexMessage, setLinkRegexMessage] = useState('');
  const [isTopMainArtwork, setIsTopMainArtwork] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    setSubmitButtonDisabled(
      !selectedDate ||
        selectedCategory === '' ||
        projectType === null ||
        link === '' ||
        !mainImage ||
        !responsiveMainImage ||
        detailImages.length === 0 ||
        title === '' ||
        customer === '' ||
        overview === '',
    );
  }, [
    selectedDate,
    selectedCategory,
    isProjectOpened,
    projectType,
    link,
    mainImage,
    responsiveMainImage,
    detailImages,
    title,
    customer,
    overview,
  ]);

  useEffect(() => {
    if (projectType === 'top' || projectType === 'main') {
      setIsTopMainArtwork(true);
    } else {
      setIsTopMainArtwork(false);
    }
    console.log('바뀜', isTopMainArtwork);
  }, [projectType]);

  const handleOverviewChange = (newOverview: string) => {
    setOverview(newOverview);
  };

  const handleDateChange = (newDate: Date | null) => {
    setSelectedDate(newDate);
  };

  const handleTogglePosted = () => {
    setIsProjectOpened(!isProjectOpened);
  };

  const handleLinkChange = (newLink: string) => {
    setLink(newLink);
    if (linkCheck(newLink)) {
      setLink(newLink);
      setLinkRegexMessage('');
    } else {
      setLinkRegexMessage('외부 연결 링크는 http 혹은 https로 시작해야합니다.');
    }
  };

  const handleMainImageChange = (newImage: File | File[]) => {
    setMainImage(Array.isArray(newImage) ? newImage[0] : newImage);
  };

  const handleResponsiveMainImageChange = (newImage: File | File[]) => {
    setResponsiveMainImage(Array.isArray(newImage) ? newImage[0] : newImage);
  };

  // 상세 이미지 상태 (1~3개)
  const handleDetailImageChange = (newImages: File | File[]) => {
    const updatedImages = Array.isArray(newImages) ? newImages : [newImages];

    // 최대 3개 제한
    if (updatedImages.length > 3) {
      updatedImages.splice(3);
    }
    setDetailImages(updatedImages);
  };

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
  };

  const handleCustomerChange = (newCustomer: string) => {
    setCustomer(newCustomer);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    const requestData = {
      category: selectedCategory,
      name: title,
      client: customer,
      department: '',
      date: selectedDate ? selectedDate.toISOString() : '',
      link: link,
      projectType: projectType,
      isPosted: isTopMainArtwork ? true : isProjectOpened,
      overView: overview,
    };
    formData.append('request', new Blob([JSON.stringify(requestData)], { type: 'application/json' }));

    if (mainImage) {
      formData.append('file', mainImage);
    }
    if (responsiveMainImage) {
      formData.append('responsiveFile', responsiveMainImage);
    }
    if (detailImages) {
      detailImages.forEach((file, index) => {
        formData.append('files', file);
      });
    }

    try {
      const response = await postArtwork(formData);
      if (response.code === 400 && response.data === null && response.message) {
        return;
      }
      alert(MSG.ALERT_MSG.SAVE);
      setProducingIsOpened(false);
      console.log(response.data.id);
      navigate(`${PA_ROUTES.ARTWORK}/${response.data.id}?page=1`);
    } catch (error: any) {
      alert(MSG.CONFIRM_MSG.FAILED);
    }
  };

  const defaultValue = getArtworkDefaultValue(
    selectedDate,
    handleDateChange,
    selectedCategory,
    setSelectedCategory,
    isProjectOpened,
    handleTogglePosted,
    projectType,
    setProjectType,
    link,
    handleLinkChange,
    mainImage,
    handleMainImageChange,
    responsiveMainImage,
    handleResponsiveMainImageChange,
    detailImages,
    handleDetailImageChange,
    title,
    handleTitleChange,
    customer,
    handleCustomerChange,
    overview,
    handleOverviewChange,
    isTopMainArtwork,
  );

  return (
    <Container>
      <CloseContainer onClick={() => setProducingIsOpened(false)}>x</CloseContainer>
      <ValueWrapper data-cy='PA_artwork_createBox'>
        {defaultValue.map((item: DefaultValueItem, index: number) =>
          item.name === 'responsiveMainImage' ? null : item.name === 'mainImage' &&
            defaultValue[index + 1]?.name === 'responsiveMainImage' ? (
            <div key={index}>
              {/* {errorMessage && <ErrorMessage> ⚠ {errorMessage}</ErrorMessage>} */}
              <ArtworkValueLayout valueTitle={item.title} description={item.description} content={item.content} />
              <ArtworkValueLayout
                valueTitle={defaultValue[index + 1].title}
                description={defaultValue[index + 1].description}
                content={defaultValue[index + 1].content}
              />
            </div>
          ) : (
            <div key={index}>
              {/* {errorMessage && item.name === 'artworkType' && <ErrorMessage> ⚠ {errorMessage}</ErrorMessage>} */}
              {linkRegexMessage && item.name === 'link' && <ErrorMessage> ⚠ {linkRegexMessage}</ErrorMessage>}
              <ArtworkValueLayout valueTitle={item.title} description={item.description} content={item.content} />
            </div>
          ),
        )}
        <div />
        <SubmitBtn
          data-cy='create_artwork_submit'
          title={submitButtonDisabled ? '모든 항목을 다 입력해주세요!' : ''}
          disabled={submitButtonDisabled || linkRegexMessage !== ''}
          onClick={() => handleSubmit()}
        >
          저장하기
        </SubmitBtn>
      </ValueWrapper>
    </Container>
  );
};

export default ArtworkCreating;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const ValueWrapper = styled.div`
  background-color: rgba(255, 255, 255, 0.699);
  border-radius: 10px;
  backdrop-filter: blur(10px);
  box-sizing: border-box;
  width: fit-content;
  height: 32rem;
  overflow-y: scroll;
  width: 100%;
  padding: 2.3rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem; /* 박스 간 간격 */
`;

const CloseContainer = styled.div`
  font-family: 'pretendard-regular';
  font-size: 30px;
  position: absolute;
  top: 10px;
  z-index: 20;
  right: 20px;
  cursor: pointer;
`;

const SubmitBtn = styled.button`
  border: none;
  outline-style: none;
  font-family: 'pretendard-semibold';
  font-size: 1rem;
  background-color: #6c757d;
  width: 150px;
  text-align: center;
  color: white;
  border-radius: 5px;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  padding: 0.7rem;
  margin-left: auto;
  margin-top: 20px;
  &:disabled {
    opacity: 0.5;
    cursor: default;
    &:hover {
      background-color: #6c757d;
    }
  }
  &:hover {
    background-color: #5a6268;
    cursor: pointer;
    transition: all 300ms ease-in-out;
  }
`;

const ErrorMessage = styled.div`
  font-family: 'pretendard-semibold';
  background-color: #ca050599;
  color: #ffffff;
  font-size: 13px;
  padding: 7px;
  border-radius: 5px;
  width: fit-content;
  margin-bottom: 15px;
`;

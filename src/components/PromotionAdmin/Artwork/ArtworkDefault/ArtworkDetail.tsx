import { deleteArtwork, getArtworkDetail, putArtwork } from '@/apis/PromotionAdmin/artwork';
import React, { useEffect, useState } from 'react';
import getArtworkDefaultValue, { DefaultValueItem } from '../ArtworkCreating/ArtworkDefaultValue';
import { ArtworkData, projectType, UpdateArtwork } from '@/types/PromotionAdmin/artwork';
import styled from 'styled-components';
import ArtworkValueLayout from '../ArtworkCreating/ArtworkValueLayout';
import { useParams, useNavigate } from 'react-router-dom';
import ScrollToTop from '@/hooks/useScrollToTop';
import { PA_ROUTES } from '@/constants/routerConstants';
import { linkCheck } from '@/components/ValidationRegEx/ValidationRegEx';
import { useUnsavedChangesWarning } from '@/hooks/useUnsavedChangesWarning';
import { MSG } from '@/constants/messages';
import BackDrop from '@/components/Backdrop/Backdrop';
import ArtworkImgView from './ArtworkImgView';
import { urlToFile } from '@/utils/urlToFile';

const ArtworkDetail = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImgSrc, setModalImgSrc] = useState<string>('');
  const [getModeMainImg, setGetModeMainImg] = useState('');
  const [getModeResponsiveMainImg, setGetModeResponsiveMainImg] = useState('');
  const [getModeDetailImgs, setGetModeDetailImgs] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isProjectOpened, setIsProjectOpened] = useState<boolean>(false);
  const [projectType, setProjectType] = useState<projectType>('others');
  const [link, setLink] = useState('');
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [responsiveMainImage, setResponsiveMainImage] = useState<File | null>(null);
  const [detailImages, setDetailImages] = useState<File[]>([]);
  const [title, setTitle] = useState('');
  const [customer, setCustomer] = useState('');
  const [overview, setOverview] = useState('');
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true);
  const { artworkId } = useParams();
  const [artworkData, setArtworkData] = useState<ArtworkData>();
  const [isGetMode, setIsGetMode] = useState<boolean>(true);
  const navigate = useNavigate();
  const [linkRegexMessage, setLinkRegexMessage] = useState('');
  const [isTopMainArtwork, setIsTopMainArtwork] = useState(false);
  useUnsavedChangesWarning(MSG.CONFIRM_MSG.EXIT, !isGetMode);

  useEffect(() => {
    setSubmitButtonDisabled(
      !selectedDate ||
        selectedCategory === '' ||
        projectType === null ||
        link === '' ||
        !mainImage ||
        !responsiveMainImage ||
        !detailImages ||
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
    fetchArtworkDetails();
    setIsGetMode(true);
  }, [artworkId]);

  useEffect(() => {
    if (projectType === 'top' || projectType === 'main') {
      setIsTopMainArtwork(true);
    } else {
      setIsTopMainArtwork(false);
    }
  }, [projectType]);

  const convertURLsToFiles = async (data: ArtworkData) => {
    try {
      if (data.mainImg) {
        const mainImgFile = await urlToFile(data.mainImg);
        setMainImage(mainImgFile);
      }
      if (data.responsiveImg) {
        const responsiveImgFile = await urlToFile(data.responsiveImg);
        setResponsiveMainImage(responsiveImgFile);
      }
      if (data.projectImages && data.projectImages.length > 0) {
        const detailImageFiles = await Promise.all(data.projectImages.map((image) => urlToFile(image.imageUrlList)));
        setDetailImages(detailImageFiles);
      }
    } catch (error) {
      console.error('[Error converting URLs to Files]', error);
    }
  };

  // fetchArtworkDetails 함수 내에서 ArtworkData를 받아와서 state에 설정하는 부분
  const fetchArtworkDetails = async () => {
    try {
      const data = await getArtworkDetail(Number(artworkId));
      setArtworkData(data);
      setTitle(data.name);
      setSelectedDate(data.date);
      setSelectedCategory(data.category);
      setIsProjectOpened(data.isPosted);
      setProjectType(data.projectType);
      setLink(data.link);
      setCustomer(data.client);
      setOverview(data.overView);

      if (data.projectType === 'top' || data.projectType === 'main') {
        setIsTopMainArtwork(true);
      } else {
        setIsTopMainArtwork(false);
      }

      // getMode에서는 URL만 저장
      setGetModeMainImg(data.mainImg || '');
      setGetModeResponsiveMainImg(data.responsiveMainImg || '');
      setGetModeDetailImgs(data.projectImages?.map((image: { imageUrlList: string }) => image.imageUrlList) || []);

      if (!isGetMode) {
        // 수정 모드에서는 바로 파일 변환
        convertURLsToFiles(data);
      }
    } catch (error) {
      console.error('[Error fetching artwork details]', error);
    }
  };

  const handleEditClick = async () => {
    setIsGetMode(false); // 수정 모드로 전환
    window.scrollTo({ top: 0, behavior: 'smooth' });

    try {
      // URL 데이터를 파일로 변환
      if (getModeMainImg) {
        const mainImgFile = await urlToFile(getModeMainImg);
        setMainImage(mainImgFile);
      }
      if (getModeResponsiveMainImg) {
        const responsiveImgFile = await urlToFile(getModeResponsiveMainImg);
        setResponsiveMainImage(responsiveImgFile);
      }
      if (getModeDetailImgs.length > 0) {
        const detailImageFiles = await Promise.all(getModeDetailImgs.map((url) => urlToFile(url)));
        setDetailImages(detailImageFiles);
      }
    } catch (error) {
      console.error('[Error converting URL to File in edit mode]', error);
    }
  };

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

  // 메인 이미지 상태 변경
  const handleMainImageChange = (newImage: File | File[]) => {
    const updatedImage = Array.isArray(newImage) ? newImage[0] : newImage;
    setMainImage(updatedImage); // 새 이미지로 상태 교체
  };

  // 반응형 메인 이미지 상태 변경
  const handleResponsiveMainImageChange = (newImage: File | File[]) => {
    const updatedImage = Array.isArray(newImage) ? newImage[0] : newImage;
    setResponsiveMainImage(updatedImage); // 새 이미지로 상태 교체
  };

  // 상세 이미지 상태 변경
  const handleDetailImageChange = (newImages: File | File[]) => {
    const updatedImages = Array.isArray(newImages) ? newImages : [newImages];
    const truncatedImages = updatedImages.slice(0, 3); // 최대 3개 제한
    setDetailImages(truncatedImages); // 새 이미지로 상태 교체
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
      projectId: artworkData?.id,
      category: selectedCategory,
      name: title,
      client: customer,
      department: '',
      date: selectedDate,
      link: link,
      overView: overview,
      isPosted: isTopMainArtwork ? true : isProjectOpened,
      projectType: projectType,
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
    const formDataEntries = Array.from(formData.entries());
    formDataEntries.forEach(([key, value]) => {
      console.log(`${key}:`, value);
    });

    try {
      const response = await putArtwork(formData);
      if (response.code === 400 && response.data === null && response.message) {
        return;
      }
      alert(MSG.ALERT_MSG.SAVE);
      await fetchArtworkDetails();
      setIsGetMode(true);

      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error: any) {
      console.log('[artwork updating error]', error);
    }
  };

  const handleArtworkDelete = async () => {
    const confirmDelete = window.confirm(MSG.CONFIRM_MSG.DELETE);
    if (confirmDelete) {
      try {
        // 삭제 API 호출
        await deleteArtwork(Number(artworkId));
        alert(MSG.ALERT_MSG.DELETE);
        navigate(`${PA_ROUTES.ARTWORK}`);
      } catch (error) {
        alert(MSG.CONFIRM_MSG.FAILED);
        console.error('Error deleting requestData:', detailImages);
      }
    }
  };

  const handleImageClick = (src: string) => {
    setModalImgSrc(src);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalImgSrc('');
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
    handleImageClick,
    getModeMainImg,
    getModeResponsiveMainImg,
    getModeDetailImgs,
    isGetMode,
  );

  return (
    <>
      {isModalOpen && (
        <BackDrop children={<ArtworkImgView src={modalImgSrc} closeModal={closeModal} />} isOpen={isModalOpen} />
      )}
      <Container>
        <ScrollToTop />
        <ValueWrapper data-cy='PP_artwork_detail'>
          {defaultValue.map((item: DefaultValueItem, index: number) =>
            item.name === 'responsiveMainImage' ? null : item.name === 'mainImage' &&
              defaultValue[index + 1]?.name === 'responsiveMainImage' ? (
              <div key={index}>
                <ArtworkValueLayout valueTitle={item.title} description={item.description} content={item.content} />
                <ArtworkValueLayout
                  valueTitle={defaultValue[index + 1].title}
                  description={defaultValue[index + 1].description}
                  content={defaultValue[index + 1].content}
                />
              </div>
            ) : (
              <div key={index}>
                {linkRegexMessage && item.name === 'link' && <ErrorMessage> ⚠ {linkRegexMessage}</ErrorMessage>}
                <ArtworkValueLayout valueTitle={item.title} description={item.description} content={item.content} />
              </div>
            ),
          )}
        </ValueWrapper>
      </Container>
      <ButtonContainer>
        {!isGetMode && (
          <SubmitBtn
            data-cy='modify_artwork_finish'
            title={submitButtonDisabled ? `모든 항목을 다 입력해주세요!` : ''}
            disabled={submitButtonDisabled || linkRegexMessage !== ''}
            onClick={() => handleSubmit()}
          >
            저장하기
          </SubmitBtn>
        )}
        {isGetMode && (
          <SubmitBtn data-cy='modify_artwork_submit' onClick={handleEditClick}>
            수정하기
          </SubmitBtn>
        )}{' '}
        <DeleteWrapper onClick={handleArtworkDelete}>삭제하기</DeleteWrapper>
      </ButtonContainer>{' '}
    </>
  );
};

export default ArtworkDetail;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 44rem;
  position: relative;
`;

const ValueWrapper = styled.div`
  background-color: #00000009;
  border-radius: 10px;
  backdrop-filter: blur(7px);
  box-sizing: border-box;
  width: 100%;
  padding: 2rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem; /* 박스 간 간격 */
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

const DeleteWrapper = styled.button`
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
    cursor: pointer;
    transition: all 300ms ease-in-out;
    background-color: #ca0505c5;
  }
`;

const ButtonContainer = styled.div`
  text-align: right;
`;

import styled from 'styled-components';
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { PROMOTION_BASIC_PATH } from '@/constants/basicPathConstants';
import logo from '../../../assets/logo/Logo.png';
import BackgroundYellowCircle from '@/components/BackgroundYellowCircle/BackgroundYellowCircle';
import { PP_ROUTES } from '@/constants/routerConstants';
import { useNavigate } from 'react-router-dom';
import { getCompanyBasicData } from '../../../apis/PromotionAdmin/dataEdit';
import { emailCheck, phoneFaxCheck } from '@/components/ValidationRegEx/ValidationRegEx';
import { theme } from '@/styles/theme';

interface ICircleProps {
  filled: boolean;
}
interface IButtonProps {
  disabled?: boolean;
  checked?: boolean;
}
interface IFormData {
  category: string;
  projectName: string;
  clientName: string;
  organization: string;
  contact: string;
  email: string;
  position: string;
  description: string;
}
type ICompanyBasic = {
  address: string;
  addressEnglish: string;
  phone: string;
  fax: string;
};

const ContactUsPage = () => {
  const navigator = useNavigate();
  const [requestStep, setRequestStep] = useState(0);
  const [formData, setFormData] = useState<IFormData>({
    category: '',
    projectName: '',
    clientName: '',
    organization: '',
    contact: '',
    email: '',
    position: '',
    description: '',
  });
  const [companyBasicData, setCompanyBasicData] = useState<ICompanyBasic>({
    address: '',
    addressEnglish: '',
    phone: '',
    fax: '',
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCompanyBasicData();
        // console.log(data);
        if (data !== null) {
          setCompanyBasicData(data);
        } else {
          setCompanyBasicData({
            address: '',
            addressEnglish: '',
            phone: '',
            fax: '',
          });
        }
      } catch (error) {
        console.error('Error fetching company data: ', error);
      }
    };
    fetchData();
  }, []);

  // wheel event 관리
  const containerRef = useRef<HTMLDivElement | null>(null);
  const handleWheel = () => (e: WheelEvent) => {
    const textarea = document.getElementById('myTextarea'); // textarea 참조
    const isTextarea = e.target === textarea; // 이벤트가 textarea 내부에서 발생했는지 확인
    if (containerRef.current && isTextarea) {
      e.stopPropagation(); // 조건에 따라 외부 스크롤 방지
    } else {
      const element = containerRef.current;
      if (element && !isTextarea) {
        e.preventDefault();
        if (e.deltaY > 0) {
          element.scrollBy({
            top: element.clientHeight,
            behavior: 'smooth',
          });
        } else {
          element.scrollBy({
            top: -element.clientHeight,
            behavior: 'smooth',
          });
        }
      }
    }
  };
  // wheel event 감지 & 작동
  useEffect(() => {
    const element = containerRef.current;
    const wheelHandler = handleWheel();

    if (element) {
      element.addEventListener('wheel', wheelHandler);
      return () => {
        element.removeEventListener('wheel', wheelHandler);
      };
    }
  }, [requestStep]);

  const [selectedCategory, setSelectedCategory] = useState('');
  // 새로고침 경고
  useEffect(() => {
    const handleBeforeUnload = (e: any) => {
      e.preventDefault();
      e.returnValue = '';
      return '';
    };

    if (formData.category !== '') {
      window.addEventListener('beforeunload', handleBeforeUnload);
    }
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [formData.category]);
  // 문의 단계 표시
  const handleNext = (e: any) => {
    if (requestStep < 3) {
      if (requestStep === 0) {
        if (formData.category === '') {
          alert('카테고리를 선택해주세요.');
          return;
        }
      } else if (requestStep === 1) {
        const isValidTel = phoneFaxCheck(formData.contact);
        const isValidEmail = emailCheck(formData.email);
        if (formData.clientName === '' || formData.organization === '') {
          alert('직책을 제외한 모든 칸에 입력을 해주세요.');
          return;
        }
        if (!isValidTel || formData.contact === '') {
          alert('연락처 형식이 올바르지 않습니다. 다시 입력해주세요.');
          return;
        }
        if (!isValidEmail) {
          alert('이메일 형식이 올바르지 않습니다. 다시 입력해주세요.');
          return;
        }
      } else if (requestStep === 2) {
        if (formData.description === '' || formData.projectName === '') {
          alert('프로젝트에 대한 필수 내용을 모두 입력해주세요.');
          return;
        }
        handleSubmit(e);
        // setRequestStep(requestStep + 1);
      }
      if (requestStep < 2) {
        setRequestStep(requestStep + 1);
      }
    }
  };
  const handlePrev = () => {
    if (requestStep > 0) {
      setRequestStep(requestStep - 1);
    }
  };
  const categories = [
    { value: 'Entertainment', label: 'Entertainment' },
    { value: 'Drama', label: 'Drama' },
    { value: 'Documentary', label: 'Documentary' },
    { value: 'Channel Operating', label: 'Channel Operating' },
    { value: 'Branded', label: 'Branded' },
    { value: 'Motion Graphic', label: 'Motion Graphic' },
    { value: 'Animation', label: 'Animation' },
    { value: 'Live Commerce', label: 'Live Commerce' },
  ];
  const handleButtonClick = (category: string) => {
    setSelectedCategory(category);
    setFormData({
      ...formData,
      category: category,
    });
  };

  //////////////////////////////////////////////////////////// 1번
  const [errors, setErrors] = useState({
    contact: '',
    email: '',
  });
  //////////////////////////////////////////////////////////// 1번

  const handleDataChange = (e: any) => {
    const { name, value } = e.target;
    // setFormData({
    //   ...formData,
    //   [name]: value,
    // });

    //////////////////////////////////////////////////////////// 2번
    if (/^\s|[~!@#$%^&*(),.?":{}|<>]/.test(value.charAt(0))) {
      return;
    }
    const truncatedValue = value.slice(0, 200);

    if (name === 'contact') {
      const fixedValue = value.replace(/[^0-9]/g, '');
      if (fixedValue.length <= 3) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          contact: fixedValue,
        }));
      } else if (fixedValue.length <= 7) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          contact: fixedValue.slice(0, 3) + '-' + fixedValue.slice(3),
        }));
      } else if (fixedValue.length <= 11) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          contact: fixedValue.slice(0, 3) + '-' + fixedValue.slice(3, 7) + '-' + fixedValue.slice(7),
        }));
      } else {
        setFormData((prevFormData) => ({
          ...prevFormData,
          contact: fixedValue.slice(0, 3) + '-' + fixedValue.slice(3, 7) + '-' + fixedValue.slice(7, 11),
        }));
      }

      if (
        fixedValue &&
        !phoneFaxCheck(fixedValue.slice(0, 3) + '-' + fixedValue.slice(3, 7) + '-' + fixedValue.slice(7, 11))
      ) {
        // console.log(fixedValue);
        setErrors((prevErrors) => ({
          ...prevErrors,
          contact: '010-1234-5678의 형식으로 작성해주세요.',
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          contact: '',
        }));
      }
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: truncatedValue,
      }));
    }

    if (name === 'email') {
      if (value && !emailCheck(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: '@와 .com이 포함되도록 해주세요. (예: user@example.com)',
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: '',
        }));
      }
    }

    if (name === 'description') {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value.slice(0, 1500),
      }));
    }
  };

  const FileTextRef = useRef<HTMLInputElement>(null);
  const [fileList, setFileList] = useState<File[]>([]);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles) {
      setFileList([...fileList, ...Array.from(selectedFiles)]);
      if (selectedFiles.length > 0) {
        const fileNames = Array.from(selectedFiles)
          .map((file) => file.name)
          .join(', ');
        if (FileTextRef.current) {
          FileTextRef.current.value = fileNames;
        }
      } else {
        if (FileTextRef.current) {
          FileTextRef.current.value = '';
        }
      }
    }
  };

  const [loading, setLoading] = useState(false);
  const handleSubmit = (e: any) => {
    e.preventDefault();

    setLoading(true);
    const requestData = new FormData();
    requestData.append('request', new Blob([JSON.stringify(formData)], { type: 'application/json' }));
    fileList.forEach((file) => {
      requestData.append('files', file);
    });

    const source = axios.CancelToken.source();

    const timeoutId = setTimeout(() => {
      source.cancel('요청이 10초 안에 완료되지 않아 취소되었습니다. 다시 시도해주세요.');
      alert('서버 또는 인터넷 연결에 문제가 발생하였습니다. 문제가 지속 될 경우 문의해주시기 바랍니다.');
    }, 10000);

    axios
      .post(`${PROMOTION_BASIC_PATH}/api/requests`, requestData, {
        // cancelToken: source.token,
      })
      .then((response) => {
        console.log(formData);
        clearTimeout(timeoutId);
        console.log('response.data : ', response.data);

        setFormData({
          category: '',
          projectName: '',
          clientName: '',
          organization: '',
          contact: '',
          email: '',
          position: '',
          description: '',
        });
        setFileList([]);
        setRequestStep(requestStep + 1);
      })
      .catch((error) => {
        console.log(requestData);
        if (axios.isCancel(error)) {
          console.log(formData);
          console.error('요청 취소: ', error.message);
        } else {
          console.log(requestData);
          alert('예기치 못한 에러가 발생했습니다.');
          console.error('에러 발생', error);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const notValidAddress = (address: string | undefined | null, addressEnglish: string | undefined | null) => {
    return {
      addressInvalid: !address || address.length > 300,
      addressEnglishInvalid: !addressEnglish || addressEnglish.length > 300,
    };
  };

  const { addressInvalid, addressEnglishInvalid } = notValidAddress(
    companyBasicData.address,
    companyBasicData.addressEnglish,
  );

  const notValidInfo = (info: string | undefined | null) => {
    return !info || info.length > 18;
  };

  return (
    <Container ref={containerRef} data-cy="contact-page">
      <IntroSection data-cy="intro-section">
        <IntroWrapper>
          <IntroTitleWrapper>
            <IntroTitleCONTACT data-cy="intro-title-contact">CONTACT</IntroTitleCONTACT>
            <IntroTitleUS data-cy="intro-title-us">US</IntroTitleUS>
          </IntroTitleWrapper>
          <IntroSubTitleWrapper>
            <IntroSubtitle data-cy="intro-subtitle">대한민국 No.1 뉴미디어 전문 제작사 스튜디오 아이와 함께 해보세요!</IntroSubtitle>
          </IntroSubTitleWrapper>
          <IntroAboutWrapper data-cy="intro-about-wrapper">
            <div style={{ width: '100%' }}>
              {(!addressInvalid || !addressEnglishInvalid) && (
                <IntroAdress data-cy="intro-address-label" style={{ color: '#8a8a8a' }}>Address</IntroAdress>
              )}

              {addressInvalid && !addressEnglishInvalid && <IntroAdress>{companyBasicData.addressEnglish}</IntroAdress>}
              {!addressInvalid && addressEnglishInvalid && <IntroAdress>{companyBasicData.address}</IntroAdress>}
              {!addressInvalid && !addressEnglishInvalid && (
                <>
                  <IntroAdress>{companyBasicData.address}</IntroAdress>
                  <IntroAdress>{companyBasicData.addressEnglish}</IntroAdress>
                </>
              )}
              <IntroNumberWrapper>
                {!notValidInfo(companyBasicData.phone) && (
                  <div>
                    <IntroNumber style={{ color: '#8a8a8a' }}>tel</IntroNumber>
                    <IntroNumber>{companyBasicData.phone}</IntroNumber>
                  </div>
                )}
                {!notValidInfo(companyBasicData.fax) && (
                  <div>
                    <IntroNumber style={{ color: '#8a8a8a' }}>fax</IntroNumber>
                    <IntroNumber>{companyBasicData.fax}</IntroNumber>
                  </div>
                )}
              </IntroNumberWrapper>
            </div>
          </IntroAboutWrapper>
        </IntroWrapper>
        <BackgroundYellowCircle> </BackgroundYellowCircle>
      </IntroSection>

      <>
        {loading && (
          <LoadingModal>
            <LoadingIcon />
          </LoadingModal>
        )}
        <RequestSection>
          <RequestContentsContainer>
            <RequestLeftContentsContainer>
              <RequestStepContainer>
                <RequestStepCircle filled={requestStep === 0}>1</RequestStepCircle>
                <RequestStepLine></RequestStepLine>
                <RequestStepCircle filled={requestStep === 1}>2</RequestStepCircle>
                <RequestStepLine></RequestStepLine>
                <RequestStepCircle filled={requestStep === 2}>3</RequestStepCircle>
                <RequestStepLine></RequestStepLine>
                <RequestStepCircle filled={requestStep === 3}>4</RequestStepCircle>
              </RequestStepContainer>
              {requestStep === 3 ? (
                <></>
              ) : (
                <>
                  <RequestExplanationWrapper>
                    <RequestExplanationSmall data-cy="project-request-title" >Project Request</RequestExplanationSmall>
                    {requestStep === 0 ? (
                      <>
                        <RequestExplanation>문의할 프로젝트 항목을 선택해주세요. *</RequestExplanation>
                        <RequestSubExplanation>&nbsp;</RequestSubExplanation>
                      </>
                    ) : requestStep === 1 ? (
                      <>
                        <RequestExplanation>인적사항을 입력해주세요.</RequestExplanation>
                        <RequestSubExplanation>* 이 들어간 항목은 필수로 작성해주세요.</RequestSubExplanation>
                      </>
                    ) : (
                      <>
                        <RequestExplanation>프로젝트 정보를 입력해주세요.</RequestExplanation>
                        <RequestSubExplanation>* 이 들어간 항목은 필수로 작성해주세요.</RequestSubExplanation>
                      </>
                    )}
                  </RequestExplanationWrapper>
                  <RequestLeftLogoWrapper>
                    <RequestLeftLogo src={logo} alt='로고' />
                  </RequestLeftLogoWrapper>
                </>
              )}
            </RequestLeftContentsContainer>
            {requestStep === 3 ? (
              <RequestRightContentsContainer />
            ) : (
              <RequestRightContentsContainer>
                {requestStep === 0 ? (
                  <RequestInputWrapper>
                    <RequestCategoryButtonWrapper>
                      {categories.map((category) => (
                        <RequestCategoryButton
                          key={category.value}
                          checked={selectedCategory === category.value}
                          onClick={() => handleButtonClick(category.value)}
                          data-cy="category-button"
                        >
                          {category.label}
                        </RequestCategoryButton>
                      ))}
                    </RequestCategoryButtonWrapper>
                  </RequestInputWrapper>
                ) : requestStep === 1 ? (
                  <RequestInputWrapper data-cy="request-input-personal">
                    <RequestInfoInput
                      autoComplete='off'
                      type='text'
                      placeholder='성함을 입력해주세요 *'
                      value={formData.clientName}
                      name='clientName'
                      onChange={handleDataChange}
                      aria-autocomplete='none'
                      data-cy="input-client-name" 
                    ></RequestInfoInput>
                    <RequestInfoInput
                      autoComplete='off'
                      type='text'
                      placeholder='기관 혹은 기업명을 입력해주세요 *'
                      value={formData.organization}
                      name='organization'
                      onChange={handleDataChange}
                      aria-autocomplete='none'
                      data-cy="input-organization"
                    ></RequestInfoInput>
                    <RequestInfoInput
                      autoComplete='off'
                      type='text'
                      placeholder='연락처를 입력해주세요 (예: 010-1234-5678) *'
                      value={formData.contact}
                      name='contact'
                      onChange={handleDataChange}
                      aria-autocomplete='none'
                      data-cy="input-contact"
                    ></RequestInfoInput>{' '}
                    {errors.contact && <ErrorMessage>{errors.contact}</ErrorMessage>}
                    <RequestInfoInput
                      autoComplete='off'
                      type='email'
                      placeholder='@이하 도메인을 포함한 이메일 주소를 입력해주세요 *'
                      value={formData.email}
                      name='email'
                      onChange={handleDataChange}
                      aria-autocomplete='none'
                      data-cy="input-email"
                    ></RequestInfoInput>
                    {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
                    <RequestInfoInput
                      autoComplete='off'
                      type='position'
                      placeholder='직책을 입력해주세요'
                      value={formData.position}
                      name='position'
                      onChange={handleDataChange}
                      aria-autocomplete='none'
                      data-cy="input-position"
                    ></RequestInfoInput>
                  </RequestInputWrapper>
                ) : (
                  <RequestInputWrapper>
                    <RequestInfoInput
                      autoComplete='off'
                      type='projectName'
                      placeholder='제목을 입력해주세요 *'
                      value={formData.projectName}
                      name='projectName'
                      onChange={handleDataChange}
                      data-cy="input-project-name"
                    ></RequestInfoInput>
                    <RowWrapper data-cy="file-upload-wrapper">
                      <RequestFileText ref={FileTextRef} type='text' readOnly data-cy="file-text"></RequestFileText>
                      <RequestFileUploadInput
                        id='uploadfile'
                        type='file'
                        accept='*/*'
                        multiple
                        onChange={handleFileChange}
                        data-cy="file-upload-input"
                      />
                      <RequestUploadLabel htmlFor='uploadfile'>파일 선택</RequestUploadLabel>
                    </RowWrapper>
                    <RequestInfoTextarea
                      autoComplete='off'
                      id='myTextarea'
                      placeholder='프로젝트 설명을 적어주세요 *'
                      value={formData.description}
                      name='description'
                      onChange={handleDataChange}
                      data-cy="input-project-details"
                    ></RequestInfoTextarea>
                  </RequestInputWrapper>
                )}
                <RequestStepButtonWrapper>
                  <RequestStepButton 
                  onClick={handlePrev} 
                  disabled={requestStep === 0}
                  data-cy="prev-step-button"
                  >
                    이전
                  </RequestStepButton>
                  <RequestStepButton 
                  onClick={handleNext}     
                  disabled={requestStep >= 3}
                  data-cy="next-step-button"
                  >
                    {requestStep === 2 ? '문의 접수' : '다음'}
                  </RequestStepButton>
                </RequestStepButtonWrapper>
              </RequestRightContentsContainer>
            )}
          </RequestContentsContainer>
          {requestStep === 3 ? (
            <>
              <RequestCompleteContentWrapper>
                <RequestExplanationBig data-cy="success-message">문의가 정상적으로 접수되었습니다. 이메일을 확인해주세요.</RequestExplanationBig>
                <RequestExplanationSmall style={{ textAlign: 'center' }}>
                  담당자 배정 후 연락 드리겠습니다. 감사합니다.
                </RequestExplanationSmall>
              </RequestCompleteContentWrapper>
              <RequestSuccessLogoWrapper>
                <RequestSuccessLogo src={logo} alt='로고' />
              </RequestSuccessLogoWrapper>
              <BackToMainButton
                onClick={() => {
                  // console.log(formData);
                  navigator(`/${PP_ROUTES.MAIN}`);
                }}
              >
                메인화면으로
              </BackToMainButton>
            </>
          ) : null}
        </RequestSection>
      </>
    </Container>
  );
};

export default ContactUsPage;

const Container = styled.div`
  height: 100vh;
  overflow-x: hidden;
  overflow-y: scroll;
  scroll-snap-type: y mandatory; // 수직 스냅
  scroll-behavior: 'smooth';
  scrollbar-width: none; // 파이어폭스 스크롤바 숨김
  -ms-overflow-style: none; // 인터넷 익스플로러/엣지 스크롤바 숨김
  &::-webkit-scrollbar {
    display: none; // 크롬/사파리 스크롤바 숨김
  }
  @media ${theme.media.mobile} {
    width: 100%;
  }
`;

const IntroSection = styled.div`
  height: 100vh;
  scroll-snap-align: start; // 섹션의 시작점에 스냅
  background-color: black;
  position: relative; // 구형 도형의 위치 지정
  display: flex;
  justify-content: center;
  align-items: center;
  @media ${theme.media.mobile} {
    max-width: 100%;
  }
`;

const IntroWrapper = styled.div`
  @media ${theme.media.mobile} {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const IntroTitleWrapper = styled.div`
  display: flex;
  flex-direction: 'row';
  justify-content: center;
`;
const IntroTitleCONTACT = styled.div`
  font-family: ${theme.font.bold};
  font-size: 6.25rem;
  color: ${theme.color.white.light};
  @media ${theme.media.mobile} {
    font-size: 3rem;
  }
`;
const IntroTitleUS = styled.div`
  margin-left: 1.25rem;
  font-family: ${theme.font.bold};
  font-size: 6.25rem;
  color: #ffa900;
  @media ${theme.media.mobile} {
    margin-left: 1rem;
    font-size: 3rem;
  }
`;
const IntroSubTitleWrapper = styled.div`
  margin-top: 1.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const IntroSubtitle = styled.div`
  font-family: ${theme.font.semiBold};
  font-size: 1.25rem;
  color: #ffffff;
  @media ${theme.media.mobile} {
    width: 80%;
    font-family: ${theme.font.semiBold};
    text-align: center;
    font-size: 1rem;
    color: ${theme.color.white.light};
    word-break: keep-all;
    white-space: normal;
  }
`;

const IntroAboutWrapper = styled.div`
  margin-top: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;

  @media ${theme.media.mobile} {
    margin-top: 10rem;
    width: 80%;
  }
`;
const IntroAdress = styled.div`
  margin-bottom: 1.25rem;
  font-family: ${theme.font.medium};
  font-size: 1.25rem;
  color: #ffffff;
  text-align: left;
  word-wrap: break-word;
  line-height: 1.2;

  @media ${theme.media.mobile} {
    margin-bottom: 0.5rem;
    font-family: ${theme.font.medium};
    font-size: 0.8rem;
    color: #ffffff;
    text-align: center;
    max-width: 100%;
    word-wrap: break-word;
  }
`;
const IntroNumberWrapper = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  @media ${theme.media.mobile} {
    margin-top: 1rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
`;
const IntroNumber = styled.div`
  font-family: ${theme.font.medium};
  font-size: 1.25rem;
  color: #ffffff;
  text-align: left;
  padding-bottom: 1.25rem;
  max-width: 20vw;
  word-wrap: break-word;

  @media ${theme.media.mobile} {
    font-family: ${theme.font.medium};
    font-size: 0.9rem;
    padding-bottom: 0.5rem;
    color: #ffffff;
    text-align: center;
    max-width: 100%;
    word-wrap: break-word;
  }
`;
const RequestSection = styled.div`
  height: 100vh;
  width: 100%;
  scroll-snap-align: start;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: black;

  @media ${theme.media.mobile} {
    margin: 0;
    padding: 0;
  }
`;

const RequestContentsContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 80%;
  justify-content: space-around;
  align-items: center;

  @media ${theme.media.tablet} {
    width: 90%;
  }
  @media ${theme.media.mobile} {
    flex-direction: column;
  }
`;
const RequestLeftContentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
  padding-left: 2vw;

  @media ${theme.media.large_tablet} {
    width: 45%;
    padding: 0;
  }
  @media ${theme.media.mobile} {
    margin: 0;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
`;

const RequestRightContentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 45%;
  justify-content: center;
  align-items: center;

  @media ${theme.media.mobile} {
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: center;
    align-items: center;
  }
`;
const RequestStepContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  @media ${theme.media.mobile} {
    width: 100%;
    justify-content: center;
    margin: 0 auto;
    box-sizing: border-box;
  }
`;
const RequestStepCircle = styled.div<ICircleProps>`
  width: clamp(2.25rem, 3vw, 3rem);
  height: clamp(2.25rem, 3vw, 3rem);
  border-radius: 50%;
  border: 1px solid white;
  background-color: ${(props) => (props.filled ? '#ffa900' : 'transparent')};
  display: inline-block;
  font-family: ${theme.font.semiBold};
  font-size: clamp(0.9rem, 1vw, 1.25rem);
  color: #ffffff;
  align-content: center;
  text-align: center;
`;
const RequestStepLine = styled.div`
  width: clamp(3rem, 5vw, 5rem);
  height: 0;
  border: 1px solid white;
`;
const RequestExplanationWrapper = styled.div`
  margin-top: 4.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  @media ${theme.media.mobile} {
    margin-left: 2rem;
    margin-top: 3rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
  }
`;

const RequestExplanationSmall = styled.div`
  margin-bottom: 0.75rem;
  font-family: ${theme.font.regular};
  font-size: clamp(1rem, 1.5vw, 1.5rem);
  color: ${theme.color.white.light};
  text-align: left;
  width: 100%;
  word-break: keep-all;
  white-space: normal;
`;
const RequestExplanation = styled.div`
  margin-bottom: 0.75rem;
  font-family: ${theme.font.semiBold};
  font-size: clamp(1.25rem, 2vw, 2.5rem);
  color: ${theme.color.white.light};
  text-align: left;
  width: 100%;

  @media ${theme.media.mobile} {
    font-size: 1.25rem;
    font-family: ${theme.font.semiBold};
    color: ${(props) => (props.color ? theme.color.white.pale : theme.color.white.light)};
    text-align: left;
    padding: 0;
    margin: 0;
    margin-bottom: 1rem;
    width: 100%;
    word-break: keep-all;
    white-space: normal;
  }
`;
const RequestExplanationBig = styled.div`
  margin-bottom: clamp(1.5rem, 2vw, 2.5rem);
  font-family: ${theme.font.semiBold};
  font-size: clamp(1.25rem, 2.5vw, 2.75rem);
  color: ${theme.color.white.light};
  text-align: center;
  width: 100%;
  word-break: keep-all;
  white-space: normal;
`;

const RequestSubExplanation = styled.div`
  font-family: ${theme.font.light};
  font-size: clamp(1rem, 1vw, 1.25rem);
  color: #eaeaea;
  text-align: left;
  @media ${theme.media.mobile} {
    display: none;
  }
`;
const RequestLeftLogoWrapper = styled.div`
  margin-top: clamp(2rem, 4vw, 4.375rem);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;

  @media ${theme.media.mobile} {
    display: none;
  }
`;
const RequestLeftLogo = styled.img`
  width: clamp(15rem, 25vw, 30rem);
  height: clamp(4rem, 8vw, 8.125rem);
  object-fit: contain;
  opacity: 0.3;

  @media ${theme.media.mobile} {
    display: none;
  }
`;

const RequestSuccessLogoWrapper = styled.div`
  margin-top: clamp(1rem, 4vw, 4.375rem);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;
const RequestSuccessLogo = styled.img`
  width: clamp(15rem, 25vw, 30rem);
  height: clamp(4rem, 8vw, 8rem);
  object-fit: contain;
  opacity: 0.3;
`;

const RequestInputWrapper = styled.div`
  margin-bottom: clamp(0.5rem, 2vw, 2.5rem);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
const RowWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: clamp(0.3rem, 0.5vw, 0.625rem);
`;
const RequestCategoryButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;
const RequestCategoryButton = styled.button<IButtonProps>`
  border: 1px solid white;
  transition: all 0.4s ease;
  &:hover {
    cursor: pointer;
    background-color: ${(props) => (props.checked ? '#ffa900' : '#353535')};
  }
  height: clamp(3rem, 4vw, 4.375rem);
  width: 45%;
  text-align: center;
  align-items: center;
  background-color: ${(props) => (props.checked ? '#ffa900' : 'black')};
  font-family: ${theme.font.medium};
  font-size: clamp(0.875rem, 2vw, 2rem);
  color: white;
  margin-bottom: 1.875rem;

  @media ${theme.media.large_tablet} {
    margin-bottom: 1.5rem;
  }
  @media ${theme.media.mobile} {
    font-family: ${theme.font.regular};
    margin-bottom: 1rem;
  }
`;
const RequestInfoInput = styled.input`
  margin-bottom: clamp(0.5rem, 1vw, 1rem);
  padding-left: 0.9rem;
  padding-right: 0.9rem;
  box-sizing: border-box;
  outline: none;
  border: 2px solid gray;
  background-color: transparent;
  height: clamp(2.5rem, 4vw, 3.75rem);
  width: 100%;
  font-family: ${theme.font.medium};
  font-size: clamp(0.75rem, 1.5vw, 1.25rem);
  color: ${theme.color.white.light};
  line-height: clamp(1rem, 2vw, 1.875rem);
`;
const ErrorMessage = styled.div`
  width: 100%;
  margin-bottom: clamp(0.5rem, 1vw, 1rem);
  padding-left: 0.625rem;
  font-family: ${theme.font.regular};
  font-size: clamp(0.75rem, 1vw, 1rem);
  color: red;
  text-align: left;
`;
const RequestInfoTextarea = styled.textarea`
  box-sizing: border-box;
  padding: 0.625rem;
  resize: none;
  border: 2px solid gray;
  outline: none;
  width: 100%;
  height: clamp(10rem, 20vw, 18.75rem);
  font-family: ${theme.font.medium};
  font-size: clamp(0.75rem, 1.5vw, 1.25rem);
  color: ${theme.color.white.light};
  overflow-y: auto;
  line-height: clamp(1rem, 2vw, 1.875rem);
  display: block;
  overflow-wrap: break-word;
  background-color: transparent;
  @media ${theme.media.mobile} {
    margin-bottom: 1rem;
  }
`;
const RequestFileText = styled.input`
  margin-bottom: clamp(0.5rem, 1vw, 1rem);
  padding-left: 0.9rem;
  padding-right: 0.9rem;
  box-sizing: border-box;
  outline: none;
  border: 2px solid gray;
  background-color: transparent;
  height: clamp(2.5rem, 4vw, 3.75rem);
  width: 100%;
  font-family: ${theme.font.medium};
  font-size: clamp(0.75rem, 1.5vw, 1.25rem);
  color: white;
  line-height: clamp(1rem, 2vw, 1.875rem);
`;
const RequestUploadLabel = styled.label`
  margin-bottom: clamp(0.5rem, 1vw, 1rem);
  padding-left: 0.9rem;
  padding-right: 0.9rem;
  box-sizing: border-box;
  outline: none;
  border: 2px solid gray;
  background-color: ${theme.color.white.light};
  height: clamp(2.5rem, 4vw, 3.75rem);
  width: 40%;
  font-family: ${theme.font.medium};
  font-size: clamp(0.75rem, 1.5vw, 1.25rem);
  color: black;
  line-height: clamp(1rem, 2vw, 1.875rem);
  text-align: center;
  align-items: center;
  align-content: center;
`;
const RequestFileUploadInput = styled.input.attrs({ type: 'file' })`
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0 none;
`;

const RequestStepButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;
const RequestStepButton = styled.button<IButtonProps>`
  border: none;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  transition: transform 0.2s;
  &:hover {
    cursor: ${(props) => (props.disabled ? '' : 'pointer')};
    background-color: ${(props) => (props.disabled ? '#ffa900' : '#ff7800')};
    transform: ${(props) => (props.disabled ? 'none' : 'scale(1.01)')};
  }
  height: clamp(3rem, 4vw, 4.375rem);
  width: 45%;
  text-align: center;
  align-items: center;
  background-color: #ffa900;
  font-family: ${theme.font.semiBold};
  font-size: clamp(1.25rem, 1.5vw, 2rem);
  color: ${theme.color.white.light};

  @media ${theme.media.mobile} {
    font-family: ${theme.font.regular};
  }
`;
const RequestCompleteContentWrapper = styled.div`
  margin-top: clamp(4rem, 6vw, 6.25rem);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;

  @media ${theme.media.mobile} {
    width: 85%;
  }
`;
const BackToMainButton = styled.button`
  margin-top: clamp(2rem, 3vw, 3.125rem);
  border: 2px solid white;
  transition: transform 0.2s;
  &:hover {
    cursor: pointer;
    background-color: #ffa900;
    transform: scale(1.01);
  }
  height: clamp(3rem, 5vw, 4.375rem);
  width: clamp(10rem, 12vw, 12.5rem);
  text-align: center;
  align-items: center;
  background-color: transparent;
  font-family: ${theme.font.semiBold};
  font-size: clamp(1rem, 1.5vw, 1.5rem);
  color: ${theme.color.white.bold};

  @media ${theme.media.mobile} {
    font-size: 1rem;
  }
`;
const LoadingModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(3px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const LoadingIcon = styled.div`
  border: 8px solid rgba(255, 255, 255, 0.3);
  border-top: 8px solid ${theme.color.white.bold};
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

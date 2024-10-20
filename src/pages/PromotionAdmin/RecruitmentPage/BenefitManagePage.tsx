import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import { IBenefit } from '@/types/PromotionAdmin/recruitment';
import {
  getBenefitData,
  updateBenefit,
  updateBenefitText,
  deleteBenefitData,
} from '../../../apis/PromotionAdmin/recruitment';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { PA_ROUTES } from '@/constants/routerConstants';
import { ContentBox } from '@/components/PromotionAdmin/Recruitment/Components';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { dataUpdateState } from '@/recoil/atoms';
import { ReactComponent as AddedIcon } from '@/assets/images/PA/plusIcon.svg';
import { MSG } from '@/constants/messages';
import FileButton from '@/components/PromotionAdmin/DataEdit/StyleComponents/FileButton';
import {
  DATAEDIT_NOTICE_COMPONENTS,
  DATAEDIT_TITLES_COMPONENTS,
} from '../../../components/PromotionAdmin/DataEdit/Company/StyleComponents';

function BenefitManagePage() {
  const timeStamp = Date.now();
  const setIsEditing = useSetRecoilState(dataUpdateState);
  const isEditing = useRecoilValue(dataUpdateState);
  const navigator = useNavigate();

  const { data, isLoading, error, refetch, isFetching, isRefetching } = useQuery<IBenefit[], Error>(
    ['benefit'],
    getBenefitData,
    {
      keepPreviousData: false,
      staleTime: 0,
    },
  );

  const [currentBenefit, setCurrentBenefit] = useState<IBenefit | null>();
  const [isSelected, setIsSelected] = useState(false);
  const [titleLength, setTitleLength] = useState<number>(0);
  const [contentLength, setContentLength] = useState<number>(0);
  const maxTitleLength = 14;
  const maxContentLength = 35;

  useEffect(() => {
    if (!isFetching && !isRefetching && (data === null || data?.length === 0)) {
      navigator(`${PA_ROUTES.RECRUITMENT}/benefit/write`);
    }
  }, [data, navigator, isFetching, isRefetching]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IBenefit>({
    defaultValues: {
      id: currentBenefit?.id,
      imageUrl: currentBenefit?.imageUrl,
      imageFileName: currentBenefit?.imageFileName,
      title: currentBenefit?.title,
      content: currentBenefit?.content,
    },
  });

  useEffect(() => {
    if (currentBenefit) {
      setValue('id', currentBenefit.id);
      setValue('imageUrl', currentBenefit.imageUrl);
      setValue('imageFileName', currentBenefit.imageFileName);
      setValue('title', currentBenefit.title);
      setValue('content', currentBenefit.content);
      setTitleLength(currentBenefit.title.length);
      setContentLength(currentBenefit.content.length);
    }
  }, [currentBenefit, setValue]);

  const handleDelete = async (id: number) => {
    if (window.confirm('삭제하시겠습니까?')) {
      try {
        const response = await deleteBenefitData(id);
        alert('사내 복지가 삭제되었습니다.');
        console.log(response);
        await refetch();
        setCurrentBenefit(null);
      } catch (error) {
        console.log(error);
        alert('사내 복지 삭제 중 오류가 발생했습니다.');
      }
    }
  };

  const onValid = async (data: IBenefit) => {
    console.log(currentBenefit);
    const formData = new FormData();
    formData.append(
      'request',
      new Blob(
        [
          JSON.stringify({
            id: data.id,
            title: data.title,
            content: data.content,
          }),
        ],
        { type: 'application/json' },
      ),
    );
    if (imgChange) {
      if (currentBenefit?.imageUrl && currentBenefit.imageUrl !== data?.imageUrl) {
        const file = await urlToFile(currentBenefit.imageUrl, `${currentBenefit.title}.${timeStamp}.png`);
        formData.append('file', file);
      } else if (data?.imageUrl) {
        const mainImgBlob = await urlToFile(data.imageUrl, `${data.title}.${timeStamp}.png`);
        formData.append('file', mainImgBlob);
      } else {
        formData.append('file', '');
      }
      if (window.confirm('수정하시겠습니까?')) {
        try {
          const response = await updateBenefit(formData);
          alert('사내 복지가 수정되었습니다.');
          console.log(response);
          await refetch();
          setIsEditing(false);
          setImgChange(false);
        } catch (error) {
          console.log(error);
          alert('사내 복지 수정 중 오류가 발생했습니다.');
        }
      }
    } else {
      if (window.confirm('수정하시겠습니까?')) {
        try {
          const response = await updateBenefitText(formData);
          alert('사내 복지가 수정되었습니다.');
          console.log(response);
          await refetch();
          setIsEditing(false);
          setImgChange(false);
        } catch (error) {
          console.log(error);
          alert('사내 복지 수정 중 오류가 발생했습니다.');
        }
      }
    }
  };

  const [imgChange, setImgChange] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        const img = new Image();
        img.src = reader.result as string;

        img.onload = () => {
          // 이미지가 256x256인 경우 리사이즈 생략
          if (img.width === 256 && img.height === 256) {
            // 256x256일 경우, Base64 string 그대로 putData에 저장
            setCurrentBenefit((prevData) => ({
              ...prevData,
              imageUrl: reader.result as string,
              id: prevData?.id ?? 0,
              imageFileName: prevData?.imageFileName ?? '',
              title: prevData?.title ?? '',
              content: prevData?.content ?? '',
            }));
          } else {
            // 이미지 크기가 256x256이 아닌 경우 리사이즈 수행
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = 256;
            canvas.height = 256;

            if (ctx) {
              ctx.drawImage(img, 0, 0, 256, 256);
              const resizedImage = canvas.toDataURL(file.type);
              setCurrentBenefit((prevData) => ({
                ...prevData,
                imageUrl: resizedImage,
                id: prevData?.id ?? 0,
                imageFileName: prevData?.imageFileName ?? '',
                title: prevData?.title ?? '',
                content: prevData?.content ?? '',
              }));
            }
          }
        };
      };
      reader.readAsDataURL(file);
      setIsEditing(true);
      setImgChange(true);
    }
  };

  async function urlToFile(url: string, fileName: string): Promise<File> {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      return new File([blob], fileName);
    } catch (error) {
      console.error('Error URL to file:', error);
      throw error;
    }
  }

  useEffect(() => {
    if (isEditing) {
      const handleBeforeUnload = (event: any) => {
        const message = MSG.CONFIRM_MSG.EXIT;
        event.returnValue = message;
        return message;
      };
      window.addEventListener('beforeunload', handleBeforeUnload);
      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
      };
    }
  }, [isEditing]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsEditing(true);
    const { name, value } = e.target;
    if (/^\s/.test(value.charAt(0))) {
      return;
    }
    if ((name === 'title' && value.length > 14) || (name === 'content' && value.length > 35)) {
      return;
    }

    if (name === 'title') {
      setTitleLength(value.length);
    } else if (name === 'content') {
      setContentLength(value.length);
    }
    setCurrentBenefit((prevRecruitment) => (prevRecruitment ? { ...prevRecruitment, [name]: value } : null));
  };

  const fetchBenefitData = async (benefit: IBenefit) => {
    if (isEditing) {
      const confirmMove = window.confirm('수정중인 내용이 저장되지 않습니다.\n이동하시겠습니까?');
      setIsEditing(false);
      if (!confirmMove) {
        setIsEditing(true);
        return;
      }
    }
    setCurrentBenefit(benefit);
    setTitleLength(benefit.title.length);
    setContentLength(benefit.content.length);
    setIsSelected(true);
  };

  const handleAddNewBenefit = () => {
    if (isEditing) {
      if (window.confirm('현재 페이지를 나가면 변경 사항이 저장되지 않습니다.\n나가시겠습니까?')) {
        setIsEditing(false);
        navigator(`${PA_ROUTES.RECRUITMENT}/benefit/write`);
      }
    } else {
      navigator(`${PA_ROUTES.RECRUITMENT}/benefit/write`);
    }
  };

  if (isLoading) return <>Loading...</>;
  if (error) return <>{error.message}</>;

  return (
    <Wrapper>
      <LeftContentWrapper>
        <ContentBox>
          <TitleWrapper>
            <Title>
              사내 복지 관리
              <Info>* 최대 등록 가능한 사내 복지는 20개 입니다 *</Info>
            </Title>
            <Button onClick={handleAddNewBenefit}>
              <div style={{ paddingRight: 10 }}>
                <AddedIcon />
              </div>
              새로운 복지 등록
            </Button>
          </TitleWrapper>
          <ListWrapper>
            {data?.map((benefit) => (
              <BenefitItem
                key={benefit.id}
                isSelected={currentBenefit?.id === benefit.id && isSelected}
                onClick={() => fetchBenefitData(benefit)}
              >
                <BenefitImage src={benefit.imageUrl} alt={benefit.imageFileName} />
                <BenefitTitle>{benefit.title}</BenefitTitle>
                <BenefitContent>{benefit.content}</BenefitContent>
              </BenefitItem>
            ))}
          </ListWrapper>
        </ContentBox>
      </LeftContentWrapper>

      <RightContentWrapper>
        {currentBenefit ? (
          <form noValidate onSubmit={handleSubmit(onValid)}>
            <ContentBox>
              <InputImgWrapper>
                <Box>
                  <InputTitle>{DATAEDIT_TITLES_COMPONENTS.BenefitIcon}</InputTitle>
                  {DATAEDIT_NOTICE_COMPONENTS.TEXT.BENEFIT}
                  <LogoWrapper>
                    <FileButton id='BenefitImgFile' description='Benefit Image Upload' onChange={handleImageChange} />
                    <ImgBox>
                      <img src={currentBenefit.imageUrl} alt='' />
                    </ImgBox>
                  </LogoWrapper>
                </Box>
              </InputImgWrapper>
              {DATAEDIT_TITLES_COMPONENTS.Benefit}
              <InputWrapper>
                <InputTitle style={{ justifyContent: 'space-between' }}>
                  <p>제목</p>
                  <div
                    style={{
                      fontSize: 12,
                      paddingTop: 10,
                    }}
                  >
                    {titleLength}/{maxTitleLength}
                  </div>
                </InputTitle>
                <input
                  {...register('title', {
                    required: '복지 제목을 입력해주세요.',
                  })}
                  name='title'
                  value={currentBenefit?.title || ''}
                  onChange={handleChange}
                  maxLength={14}
                  placeholder='사내 복지 (14자 내로 작성해 주세요.)'
                />
                {errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage>}
                <InputTitle style={{ justifyContent: 'space-between' }}>
                  <p>내용</p>
                  <div
                    style={{
                      fontSize: 12,
                      paddingTop: 10,
                    }}
                  >
                    {contentLength}/{maxContentLength}
                  </div>
                </InputTitle>
                <input
                  {...register('content', {
                    required: '복지 내용을 입력해주세요',
                  })}
                  name='content'
                  value={currentBenefit?.content || ''}
                  onChange={handleChange}
                  maxLength={35}
                  placeholder='복지 내용 (35자 내로 작성해 주세요.)'
                />
                {errors.content && <ErrorMessage>{errors.content.message}</ErrorMessage>}
                <RowWrapper>
                  <ModifyButton type='button' onClick={() => handleDelete(currentBenefit.id)}>
                    삭제하기
                  </ModifyButton>
                  <ModifyButton>수정하기</ModifyButton>
                </RowWrapper>
              </InputWrapper>
            </ContentBox>
          </form>
        ) : (
          <div></div>
        )}
      </RightContentWrapper>
    </Wrapper>
  );
}

export default BenefitManagePage;

const Wrapper = styled.div`
  display: flex;
`;

const LeftContentWrapper = styled.div``;
const RightContentWrapper = styled.div``;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10px;
  margin-bottom: 10px;
  background-color: ${(props) => props.theme.color.white.bold};
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  align-content: center;

  svg {
    cursor: pointer;
    margin-right: 10px;
  }
  font-family: ${(props) => props.theme.font.bold};
  font-size: 25px;
`;

const Info = styled.div`
  display: flex;
  align-items: end;
  padding-left: 14px;
  font-size: 14px;
  font-family: ${(props) => props.theme.font.medium};
  color: gray;
`;

const Button = styled.button`
  display: flex;
  cursor: pointer;
  border: none;
  background-color: ${(props) => props.theme.color.white.bold};
  box-shadow: 1px 1px 4px 0.5px #c6c6c6;
  padding: 10px;
  border-radius: 0.2rem;
  transition: 0.2s;
  font-family: ${(props) => props.theme.font.medium};
  font-size: 15px;

  &:hover {
    background-color: ${(props) => props.theme.color.yellow.light};
  }
`;

const ListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 20px;
  gap: 20px;
`;

const BenefitItem = styled.button<{ isSelected: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: none;
  padding: 15px;
  border-radius: 8px;
  background-color: ${(props) => (props.isSelected ? props.theme.color.yellow.light : props.theme.color.white.bold)};
  box-shadow: 1px 1px 4px 0.1px ${(props) => props.theme.color.black.pale};
  width: 8rem;
  margin: 0;
  cursor: pointer;
  transition: background-color 0.1s ease;
  height: auto;
  overflow: hidden;

  &:hover {
    background-color: ${(props) => props.theme.color.yellow.light};
  }
`;

const BenefitImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  margin-bottom: 20px;
  border-radius: 8px;
`;

const BenefitTitle = styled.h3`
  font-family: ${(props) => props.theme.font.bold};
  color: ${(props) => props.theme.color.black.bold};
  font-size: 12px;
  margin-bottom: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-break: keep-all;
  width: 100%;
`;

const BenefitContent = styled.p`
  font-family: ${(props) => props.theme.font.regular};
  color: ${(props) => props.theme.color.black.light};
  font-size: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: keep-all;
  width: 100%;
`;

const InputWrapper = styled.div`
  display: flex;
  background-color: ${(props) => props.theme.color.white.bold};
  flex-direction: column;
  font-family: ${(props) => props.theme.font.semiBold};
  p {
    font-size: 18px;
    padding-top: 7px;
    padding-bottom: 3px;
    margin-bottom: 10px;
  }
  input {
    outline: none;
    font-family: ${(props) => props.theme.font.regular};
    font-size: 14px;
    padding: 10px;
    width: 70%;
    height: 30px;
    border: none;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  }
  input:focus {
    transition: 0.2s;
    border-bottom: 3px solid ${(props) => props.theme.color.symbol};
  }
`;

const InputTitle = styled.div`
  display: flex;
  padding-top: 20px;
  align-items: center;
  height: 40px;
  width: 70%;
  svg {
    cursor: pointer;
    margin-right: 10px;
  }
`;

const RowWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  width: 90%;
  margin-top: 50px;
`;

const InputImgWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 30px;
`;

const Box = styled.div`
  width: 100%;
`;

const ImgBox = styled.div`
  display: flex;
  height: 200px;
  width: 60%;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  box-shadow: 1px 1px 4px 0.1px #c6c6c6;
  border-radius: 5px;
  margin-top: 15px;
`;
const LogoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  input {
    display: none;
  }

  img {
    max-width: 300px;
    max-height: 150px;
    margin-bottom: 10px;
  }
`;

const ModifyButton = styled.button`
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90px;
  height: 40px;
  margin-right: 20px;
  font-size: 15px;
  font-family: ${(props) => props.theme.font.medium};
  box-shadow: 1px 1px 4px 0.1px #c6c6c6;
  background-color: ${(props) => props.theme.color.white.bold};
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background-color: ${(props) => props.theme.color.yellow.light};
  }
`;

const ErrorMessage = styled.div`
  font-family: ${(props) => props.theme.font.light};
  margin-top: 10px;
  margin-left: 10px;
  font-size: 13px;
`;

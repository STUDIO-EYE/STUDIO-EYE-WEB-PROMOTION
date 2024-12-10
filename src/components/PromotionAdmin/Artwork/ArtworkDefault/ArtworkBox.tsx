import React from 'react';
import styled from 'styled-components';
import { ReactComponent as IsPosted } from '@/assets/images/isPosted.svg';
import { ReactComponent as IsNotPosted } from '@/assets/images/isNotPosted.svg';
import { ArtworkData } from '@/types/PromotionAdmin/artwork';

const ArtworkBox = ({
  id,
  department,
  category,
  name,
  client,
  date,
  link,
  overView,
  projectType,
  isPosted,
  mainImg,
  projectImages,
  responsiveMainImg,
  responsiveMainImgFileName,
  mainImgFileName,
  sequence,
}: ArtworkData) => {
  const slicedName = name.length > 15 ? `${name.slice(0, 15)}...` : name;
  const slicedOverview = overView.length > 80 ? `${overView.slice(0, 80)}...` : overView;
  const slicedClient = client.length > 20 ? `${client.slice(0, 20)}...` : client;
  return (
    <Container>
      <img src={mainImg} alt={mainImg} />
      <DescriptionWrapper data-cy='PA_artwork'>
        <Wrapper>
          <div>
            <h2 data-cy='PA_artwork_client'>{slicedClient}</h2>
            <h1 data-cy='PA_artwork_title'>{slicedName}</h1>
          </div>
          <RightAlignWrapper>
            {isPosted ? <IsPosted data-cy='PA_artwork_isOpen' /> : <IsNotPosted data-cy='PA_artwork_isClose' />}
            <h2 data-cy='PA_artwork_category'>{category}</h2>
          </RightAlignWrapper>
        </Wrapper>
        <OverviewWrapper>
          <h3 data-cy='PA_artwork_overview'>{slicedOverview}</h3>
        </OverviewWrapper>

        <TypeWrapper data-cy='PA_artwork_type' projectType={projectType}>
          {projectType === 'others' ? '기본 아트워크' : projectType === 'top' ? '대표 아트워크' : '메인 아트워크'}
        </TypeWrapper>
      </DescriptionWrapper>
    </Container>
  );
};

export default ArtworkBox;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 35rem;
  border-radius: 10px;
  background-color: #00000009;
  padding: 1rem;
  box-sizing: border-box;
  margin-bottom: 10px;

  &:hover {
    cursor: pointer;
    opacity: 0.7;
    transition: all ease-in-out 300ms;
  }
  img {
    width: 9.4rem;
    height: 9.4rem;
    object-fit: cover;
    border-radius: 5px;
  }
  h1 {
    font-family: 'pretendard-semibold';
    font-size: 1.1rem;
    color: black;
    margin-top: 3px;
  }
  h2 {
    font-family: 'pretendard-medium';
    font-size: 0.8rem;
    color: #707070;
  }
  h3 {
    font-family: 'pretendard-medium';
    font-size: 0.9rem;
    color: #4b4b4b;
    line-height: 18px;
  }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.8rem;
`;

const DescriptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  margin-left: 23px;
`;
const RightAlignWrapper = styled.div`
  text-align: right;
  h2 {
    margin-top: 10px;
  }
`;

const OverviewWrapper = styled.div`
  height: 5rem;
`;

const TypeWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'projectType',
})<{ projectType: 'others' | 'top' | 'main' }>`
  width: fit-content;
  height: fit-content;
  padding: 5px 10px;
  border-radius: 10px;
  background-color: ${({ projectType }) =>
    projectType === 'main' ? '#ffaa007d' : projectType === 'top' ? '#d3002384' : '#33333321'};

  margin-left: auto;

  font-family: 'pretendard-medium';
  font-size: 0.8rem;
  color: ${({ projectType }) => (projectType === 'main' || projectType === 'top' ? 'white' : 'black')};
`;

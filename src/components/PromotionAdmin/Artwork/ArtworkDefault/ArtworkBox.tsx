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
  sequence,
}: ArtworkData) => {
  const slicedName = name.length > 25 ? `${name.slice(0, 25)}...` : name;
  const slicedOverview = overView.length > 120 ? `${overView.slice(0, 120)}...` : overView;
  const slicedClient = client.length > 30 ? `${client.slice(0, 30)}...` : client;
  return (
    <Container>
      {mainImg ? <img src={mainImg} alt='mainImg' /> : <NoMainImageWrapper>No Image</NoMainImageWrapper>}
      <DescriptionWrapper data-cy='PA_artwork'>
        <Wrapper>
          <div>
            <h2 data-cy='PA_artwork_client'>{slicedClient}</h2>
            <h1 data-cy='PA_artwork_title'>{slicedName}</h1>
          </div>
          <RightAlignWrapper>
            {isPosted ? <IsPosted data-cy='PA_artwork_isOpen' /> : <IsNotPosted data-cy='PA_artwork_isClose'/>}
            <h2 data-cy='PA_artwork_category'>{category}</h2>
          </RightAlignWrapper>
        </Wrapper>
        <h3 data-cy='PA_artwork_overview'>{slicedOverview}</h3> <TypeWrapper data-cy='PA_artwork_type' projectType={projectType}>{projectType}</TypeWrapper>
      </DescriptionWrapper>
    </Container>
  );
};

export default ArtworkBox;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  border-radius: 10px;
  background-color: #afafaf13;
  padding: 20px;
  box-sizing: border-box;
  margin-bottom: 10px;

  &:hover {
    cursor: pointer;
    opacity: 0.8;
    transition: all ease-in-out 300ms;
  }
  img {
    width: 130px;
    height: 130px;
    object-fit: cover;
    border-radius: 5px;
  }
  h1 {
    font-family: 'pretendard-semibold';
    font-size: 18px;
    color: black;
    margin-top: 3px;
  }
  h2 {
    font-family: 'pretendard-medium';
    font-size: 15px;
    color: #707070;
  }
  h3 {
    font-family: 'pretendard-medium';
    font-size: 15px;
    color: #4b4b4b;
    line-height: 18px;
  }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 23px;
`;

const NoMainImageWrapper = styled.div`
  width: 180px;
  height: 180px;
  font-family: 'pretendard-medium';
  font-size: 15px;
  color: #ffffff;
`;

const DescriptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 500px;
  margin-left: 23px;
`;
const RightAlignWrapper = styled.div`
  text-align: right;
  h2 {
    margin-top: 10px;
  }
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
  margin-bottom: 5px;
  margin-left: auto;
  margin-top: 15px;
  font-family: 'pretendard-medium';
  font-size: 15px;
  color: ${({ projectType }) => (projectType === 'main' || projectType === 'top' ? 'white' : 'black')};
`;

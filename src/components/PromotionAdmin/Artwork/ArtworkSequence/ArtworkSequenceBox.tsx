import React from 'react';
import styled from 'styled-components';
import { ArtworkData } from '@/types/PromotionAdmin/artwork';

const ArtworkSequenceBox = (
    {type,artworkData,}
    :{type:string,
      artworkData:ArtworkData,
      // updateSequence:(projectId:number,oldSequence:number,newSequence:number)=>void
    }) => {

  return (
    <Container>
      <Sequence>{type==="top"?"-":(type==="main"?artworkData.mainSequence:artworkData.sequence)}</Sequence>
      {artworkData.mainImg ? <img src={artworkData.mainImg} alt='mainImg' /> : <NoMainImageWrapper>No Image</NoMainImageWrapper>}
      <DescriptionWrapper>
        <RightAlignWrapper>
            <h2 data-cy='PA_artworksequence_category'>{artworkData.category}</h2>
            <TypeWrapper data-cy='PA_artworksequence_type' projectType={artworkData.projectType}>{artworkData.projectType}</TypeWrapper>
        </RightAlignWrapper>
        <Wrapper>
          <div style={{width:"80%",whiteSpace: "nowrap",textOverflow: "ellipsis",overflow : "hidden"}}>
            <h2 data-cy='PA_artworksequence_client'>{artworkData.client}</h2>
            <h1 data-cy='PA_artworksequence_title'>{artworkData.name}</h1>
          </div>
        </Wrapper>
      </DescriptionWrapper>
      {/* <EditWrapper>
        {isEditing&&<SequenceInput type='number' placeholder='숫자 입력' onChange={handleSequence}/>}
        <Button onClick={handleEditing}>{isEditing?"완료":"순서 수정"}</Button>
      </EditWrapper> */}
    </Container>
  );
};

export default ArtworkSequenceBox;

const Container = styled.div`
-webkit-user-select: none;
 -moz-user-select: none;
 -ms-use-select: none;
 user-select: none;

  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  min-width: 625px;
  border-radius: 10px;
  background-color: #afafaf13;
  padding: 20 20 20 0px;
  box-sizing: border-box;

  white-space: nowrap;
  text-overflow: ellipsis;
  overflow : hidden;

  &:hover {
    cursor: pointer;
    transition: all ease-in-out 300ms;
  }
  img {
    width: 50px;
    min-width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 5px;
  }
  h1 {
    font-family: 'pretendard-semibold';
    font-size: 18px;
    color: black;
    margin-top: 3px;
    transition: 0.3s;
    height:1.3rem;
  }
  h2 {
    font-family: 'pretendard-medium';
    font-size: 15px;
    color: #707070;
    transition: 0.3s;
    height:1rem;
  }
  h3 {
    font-family: 'pretendard-medium';
    font-size: 15px;
    color: #4b4b4b;
    line-height: 18px;
    transition: 0.3s;
  }
`;

const Sequence=styled.h2`
  font-size:20px;
  min-width:40px;
  text-align:center;
`;

const Wrapper = styled.div`
  width:90%;
  display: flex;
  align-items: center;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow : hidden;

  h1,h2{
    white-space: nowrap;
  text-overflow: ellipsis;
  overflow : hidden;
  }
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
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;
  margin-left: 15px;
  transition: 1s;
`;
const RightAlignWrapper = styled.div`
  text-align: left;
display:flex;
flex-direction: column;
min-width: 130px;
align-item: center;
`;

const TypeWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'projectType',
})<{ projectType: 'others' | 'top' | 'main' }>`
  width: fit-content;
  height: fit-content;
  padding: 3px 6px;
  border-radius: 10px;
  background-color: ${({ projectType }) =>
    projectType === 'main' ? '#ffaa007d' : projectType === 'top' ? '#d3002384' : '#33333321'};
  font-family: 'pretendard-medium';
  font-size: 13px;
  color: ${({ projectType }) => (projectType === 'main' || projectType === 'top' ? 'white' : 'black')};
`;
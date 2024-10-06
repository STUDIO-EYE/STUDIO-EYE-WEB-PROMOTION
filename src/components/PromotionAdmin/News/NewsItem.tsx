import { INEWS } from '@/types/PromotionAdmin/news';
import React from 'react';
import styled from 'styled-components';

const NewsItem = ({data}:{data:INEWS}) => {

    // const formatDate = (date: Date): string => {
    //     const year = date.getFullYear();
    //     const month = String(date.getMonth() + 1).padStart(2, '0');
    //     //getMonth하면 0부터 11을 가져오므로 +1, 문자열의 길이가 2보다 짧으면 앞부터 0 추가
    //     const day = String(date.getDate()).padStart(2, '0');
    //     return `${year}-${month}-${day}`;
    //   };

    return (
    <Container>
      <h2>{data.source+" | "+data.pubDate}</h2>
        <div style={{display:'flex',flexDirection:'row',alignContent:'center'}}>
          <Visibility visibility={data.visibility}>{data.visibility?"공개":"비공개"}</Visibility>
          <h1>{data.title}</h1>
        </div>
        <h3>{data.url}</h3>
    </Container>
  );
};

export default NewsItem;

const Container = styled.div`
  display: flex;
  // align-items: center;
  justify-content: space-between;
  width:600px;
  border-radius: 10px;
  flex-direction: column;
  background-color: #afafaf13;
  padding: 20px;
  box-sizing: border-box;
  
  overflow:hidden;
  white-space:nowrap;
  text-overflow: ellipsis;

  &:hover {
    cursor: pointer;
    opacity: 0.8;
    transition: all ease-in-out 300ms;
  }
  h1 {
    font-family: 'pretendard-semibold';
    font-size: 18px;
    color: black;
    margin-top: 0.2rem;
  }
  h2 {
    font-family: 'pretendard-medium';
    font-size: 14px;
    color: #707070;
    margin-bottom: 0.2rem;
  }
  h3 {
    font-family: 'pretendard-medium';
    font-size: 15px;
    color: #4b4b4b;
    line-height: 18px;
    margin-top: 0.4rem;
  }
}

`;

const Visibility=styled.div<{visibility: boolean}>`
border-radius: 5px;
background-color: ${({visibility})=>visibility===true?'#ffaa007d':'#33333321'};
width: fit-content;
padding: 4px;
font-family: pretendard-medium;
font-size: 0.9em;
margin-right: 5px;
`
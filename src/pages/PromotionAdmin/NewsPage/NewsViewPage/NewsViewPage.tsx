import { getNewsDetail } from '@/apis/PromotionAdmin/news';
import { INEWS } from '@/types/PromotionAdmin/news';
import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const NewsViewPage = () => {
  const { id } = useParams();
  const { data, isLoading, error, refetch } = useQuery<INEWS, Error>(['newsDetail',id], ()=>getNewsDetail(Number(id)));
  const news=data;

  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  
  return (
    <Container>
      <Title>{news?.title}</Title>
      <Day>{news?.source+" | "+news?.pubDate}</Day>
      <Visibility>{"공개 여부: "+news?.visibility}</Visibility>
      <Content>{news?.content}</Content>
    </Container>
  );
};

export default NewsViewPage;

const Container=styled.div`
margin-left: 10px;
min-width: 300px;
width: 100%;
height: 

display: flex;
flex-direction: column;
background-color: #e8e8e8;
padding: 5px;
border-radius: 5px;

overflow:hidden;
// white-space:nowrap;
text-overflow: ellipsis;
}
`

const Title=styled.div`
padding: 5px;
font-size: 1.5em;
font-family: 'pretendard-bold';
`
const Day=styled.div`
padding: 5px;
font-size: 0.9em;
font-family: 'pretendard';
`
const Visibility=styled.div`
padding: 5px;
font-size: 0.9em;
font-family: 'pretendard';
`
const Content=styled.div`
padding: 5px;
font-family: 'pretendard';
`
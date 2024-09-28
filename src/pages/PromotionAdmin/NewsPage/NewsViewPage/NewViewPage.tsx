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
      <Day>{news?.pubDate}</Day>
      <Source>{news?.source}</Source>
      <Visibility>{news?.visibility}</Visibility>
      <Content>{news?.content}</Content>
    </Container>
  );
};

export default NewsViewPage;

const Container=styled.div`
margin-left: 10px;
min-width: 300px;
background-color: white;
`

const Title=styled.div`
`
const Day=styled.div``
const Source=styled.div``
const Visibility=styled.div``
const Content=styled.div``
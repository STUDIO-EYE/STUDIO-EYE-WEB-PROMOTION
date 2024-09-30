import { INEWS } from '@/types/PromotionAdmin/news';
import { locale } from 'dayjs';
import React from 'react';
import { NavigateFunction } from 'react-router-dom';
import styled from 'styled-components';

const NewsItem = ({data}:{data:INEWS}) => {

    const formatDate = (date: Date): string => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        //getMonth하면 0부터 11을 가져오므로 +1, 문자열의 길이가 2보다 짧으면 앞부터 0 추가
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      };

    return (
    <Container>
        <Title>{data.title}</Title>
        <Day>{data.source+" | "+data.pubDate}</Day>
        <Content>{data.url}</Content>
    </Container>
  );
};

export default NewsItem;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #e8e8e8;
  width: 400px;
  padding: 5px;
  border-radius: 5px;

  overflow:hidden;
  white-space:nowrap;
  text-overflow: ellipsis;
}

`;

const Title=styled.div`
font-family: 'pretendard-semibold';
font-size: 15px;
color: #333333;
margin-bottom: 3px;
`;

const Day=styled.div`
font-family: 'pretendard-medium';
font-size: 12px;
color: #333333;
margin-bottom: 4px;
`;

const Content=styled.div`
font-family: 'pretendard';
font-size: 14px;
overflow:hidden;
text-overflow: ellipsis;
line-height: normal;
color: #666666;
`;
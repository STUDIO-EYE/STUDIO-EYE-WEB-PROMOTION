import React from 'react';
import styled from 'styled-components';
import NewsItem from './NewsItem';
import { NavigateFunction } from 'react-router-dom';
import { INEWS } from '@/types/PromotionAdmin/news';
import { useQuery } from 'react-query';
import { getNews } from '@/apis/PromotionAdmin/news';
import GreetingComponent from '@/pages/ForTest/GreetingComponent';

const NewsList = ({handler}:{handler:(id:number)=>void}) => {
  const { data, isLoading, error, refetch } = useQuery<INEWS[], Error>('newsList', getNews);
  const newsData: INEWS[]=data?data:[];

    const handleClick=(id:number)=>{
      handler(id)
    }

  return (
    <div style={{flexDirection:'column'}}>
    {newsData.map((i)=>(
        <div
        key={i.id}
        style={{marginBottom:"5px"}}
        onClick={()=>handleClick(i.id)}>
        <NewsItem data={i}/>
        </div>
    ))}
    <GreetingComponent/>
    </div>
  );
};

export default NewsList;
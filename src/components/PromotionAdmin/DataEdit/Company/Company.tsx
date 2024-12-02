import React from 'react';
import styled from 'styled-components';
import { ICompanyData } from '@/types/PromotionAdmin/dataEdit';
import { getCompanyData } from '@/apis/PromotionAdmin/dataEdit';
import { useQuery } from 'react-query';
import InputForm from './InputForm';
import CompanyInfo from './CompanyInfo';
import SkeletonComponent from '@/components/PromotionPage/SkeletonComponent/SkeletonComponent';

const Company = () => {
  const { data, isLoading, error } = useQuery<ICompanyData[], Error>(['client', 'id'], getCompanyData);

  if (isLoading) return <SkeletonComponent width={'100vw'} height={'100vh'}/>;
  if (error) return <div>Error: {error.message}</div>;

  return <Wrapper>{data === null ? <InputForm /> : <CompanyInfo />}</Wrapper>;
};

export default Company;

const Wrapper = styled.div``;

import { AxiosError } from 'axios';

export interface IPartnerInfo {
  id: number;
  is_main: boolean;
  link: string;
}

export interface ICorpInfoData {
  partnerInfo: IPartnerInfo;
  logoImg: string;
}

export interface ICEOInfoData {
  id: number;
  name: string;
  introduction: string;
  imageFileName: string;
  imageUrl: string;
}

export interface WhatWeDoPageProps {
  companyDetailData: { id: number; key: string; value: string }[]; // 데이터 타입 정의
}

export interface AboutPageLoaderData {
  ceoData: ICEOInfoData; // CEO 데이터
  partnersData: ICorpInfoData[]; // 파트너 데이터
  companyIntroData: string; // 회사 소개 데이터
  sloganImageUrl: string; // 슬로건 이미지 URL
  companyDetailData: { id: number; key: string; value: string }[]; // 회사 세부 데이터
  errors: AxiosError[];
}

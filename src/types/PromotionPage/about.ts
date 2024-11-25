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

export interface AboutPageLoaderData {
  ceoData: ICEOInfoData;
  partnersData: ICorpInfoData[];
  companyIntroData: string;
  sloganImageUrl: string;
}

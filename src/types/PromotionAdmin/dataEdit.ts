export interface IClientData {
  clientInfo: {
    name: string;
    visibility: boolean;
    id: number;
  };
  logoImg: string;
}

export interface ICEOData {
  id: number;
  name: string;
  introduction: string;
  imageFileName: string;
  imageUrl: string;
}

export interface ICompanyData {
  id: number;
  mainOverview: string;
  commitment: string;
  address: string;
  addressEnglish: string;
  lightLogoImageFileName: string;
  lightLogoImageUrl: string;
  darkLogoImageFileName: string;
  darkLogoImageUrl: string;
  phone: string;
  fax: string;
  introduction: string;
  sloganImageFileName: string;
  sloganImageUrl: string;
  detailInformation: { id: number; key: string; value: string }[];
}
export interface IPartnersData {
  logoImg: string;
  partnerInfo: {
    id: number;
    isMain: boolean;
    link: string;
    name: string;
  };
}

interface IClientContentItem {
  id: number;
  name: string;
  logoImg: string;
  visibility: boolean;
}

interface IPartnerContentItem {
  id: number;
  name: string;
  logoImageUrl: string;
  isMain: boolean;
  link: string;
}

interface IPageable {
  pageNumber: number;
  pageSize: number;
  sort: any[];
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

export interface IClientPaginationData {
  content: IClientContentItem[];
  pageable: IPageable;
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  number: number;
  sort: any[];
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}

export interface IPartnerPaginationData {
  content: IPartnerContentItem[];
  pageable: IPageable;
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  number: number;
  sort: any[];
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}

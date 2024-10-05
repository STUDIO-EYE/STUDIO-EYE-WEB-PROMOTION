export type IContent = {
  id: number;
  status: string;
  title: string;
};

export interface IRecruitmentList {
  totalPages: number;
  totalElements: number;
  size: number;
  content: IContent[];
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  numberOfElements: number;
  pageable: {
    offset: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    unpaged: boolean;
  };
  first: boolean;
  last: boolean;
  empty: boolean;
}

export interface IRecruitment {
  id: number;
  title: string;
  startDate: string;
  deadline: string;
  status: string;
  createdAt: string;
  link: string;
}

export interface IBenefit {
  id: number;
  imageUrl: string;
  imageFileName: string;
  title: string;
  content: string;
}

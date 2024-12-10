import { CATEGORIES } from '@/constants/categories';
export type ArtworkImage = {
  id: number;
  imageUrlList: string;
  fileName: string;
};

export type ArtworkData = {
  id: number;
  department: string;
  category: typeof CATEGORIES;
  name: string;
  client: string;
  date: string;
  link: string;
  overView: string;
  projectType: projectType;
  isPosted: boolean;
  mainImg: string;
  mainImgFileName: string;
  responsiveMainImg: string;
  responsiveMainImgFileName: string;
  projectImages: ArtworkImage[];
  sequence: number;
  mainSequence: number;
};
export type PostArtworkData = {
  request: PostArtworkDataRequestType;
  file: string | File;
  responsiveFile: string | File;
  files: (string | File)[]; // UpdateArtwork와 동일한 타입
};

export type PostArtworkDataRequestType = {
  projectId?: number; // 선택적 속성으로 추가
  department: string;
  category: string;
  name: string;
  client: string;
  date: string;
  link: string;
  overView: string;
  projectType: projectType;
  isPosted: boolean;
  deletedImageId?: number[]; // 선택적 속성으로 추가
};

export type projectType = 'top' | 'main' | 'others';

export type UpdateArtwork = {
  request: {
    projectId?: number; // 선택적 속성
    department: string;
    category: string;
    name: string;
    client: string;
    date: string;
    link: string;
    overView: string;
    projectType: projectType;
    isPosted: boolean;
    deletedImageId: number[]; // 필수 속성 유지
  };
  file: string | File;
  responsiveFile: string | File;
  files: (string | File)[]; // 일관된 타입
};

type filesType = {
  fileName: string;
  id: number;
  imageUrlList: string;
};

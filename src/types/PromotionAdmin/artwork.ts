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
  projectImages: ArtworkImage[];
  sequence: number;
  mainSequence: number;
};

export type PostArtworkData = {
  request: PostArtworkDataRequestType;
  file: string;
  files: string[];
};

export type PostArtworkDataRequestType = {
  department: string;
  category: string;
  name: string;
  client: string;
  date: string;
  link: string;
  overView: string;
  projectType: projectType;
  isPosted: boolean;
};

export type projectType = 'top' | 'main' | 'others';

export type UpdateArtwork = {
  request: {
    projectId: number;
    department: string;
    category: string;
    name: string;
    client: string;
    date: string;
    link: string;
    overView: string;
    deletedImageId: number[];
  };
  file: string;
  responsiveFile: string;
  files: string[];
};

type filesType = {
  fileName: string;
  id: number;
  imageUrlList: string;
};

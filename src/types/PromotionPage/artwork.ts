export interface IArtwork {
  id: number;
  department: string;
  category: string;
  name: string;
  link: string;
  client: string;
  date: string;
  mainImg: string;
  responsiveMainImg: string;
  overView: string;
  isPosted: boolean;
  projectImages: IProjectImages[];
}

export interface IProjectImages {
  fileName: string;
  id: number;
  imageUrlList: string;
}

export interface IArtworksData {
  data: IArtwork[];
}

export interface IArtworkData {
  data: IArtwork;
}

// 아래는 수정된 버전이고, 에러가 날 수도 있을 것 같아서 따로 작성해 놓았습니다.
// 추후 하나로 합쳐주세요!
interface MIArtwork {
  id: number;
  department: string;
  category: string;
  name: string;
  link: string;
  client: string;
  date: string;
  mainImg: string;
  overView: string;
  isPosted: boolean;
  projectType: string;
  projectImages: MIProjectImages[];
}

export interface MIProjectImages {
  fileName: string;
  id: number;
  imageUrlList: string;
}

export interface MIArtworksData {
  data: MIArtwork[];
}

export interface MIArtworkData {
  data: MIArtwork;
}

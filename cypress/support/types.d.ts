//Artwork data type
export interface ArtworkData {
  title: string;
  overview: string;
  customer: string;
  date: string;
  category: string;
  link: string;
  artworkType: string;
  isOpened: string;
}

export interface PPArtworkData {
  title: string;
  overview: string;
  customer: string;
  link: string;
}

export interface IntroData {
  mainOverview: string;
  commitment: string;
}

export interface ClientData {
  name: string;
  visibility: boolean;
}

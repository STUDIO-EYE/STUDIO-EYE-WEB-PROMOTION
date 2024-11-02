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

  export interface ArtworkRequiredField {
    name: string;
    selector: string;
    value: string;
    type?: 'type'|'dropdown'|'select';
  }

  export interface ArtworkDataMain {
    name: string;
    overview: string;
    client: string;
    link: string;
  }

  export interface IntroDataMain {
    mainOverview: string;
    commitment: string;
  }
  
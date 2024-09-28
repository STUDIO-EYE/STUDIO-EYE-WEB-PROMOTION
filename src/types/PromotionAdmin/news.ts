export interface INEWS {
    id: number;
    title: string;
    source: string;
    pubDate: string;
    content: string;    
    visibility: boolean;
    createdAt: string;
    updatedAt: string;
    newsFiles:[
      id:number,
      fileName:string,
      filePath:string
    ]
  }
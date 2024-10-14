export type ViewData = {
  id: number;
  year: number;
  month: number;
  views: number;
};

export type RequestData = {
  year: number;
  month: number;
  requestCount: {
    WAITING: number,
    APPROVED: number,
    REJECTED: number,
    DISCUSSING: number
};
};

export type WaitingRequestData = {
  id: number;
  projectName: string;
  category: string;
  clientName: string;
  organization: string;
  contact: string;
  email: string;
  position: string;
  description: string;
  answer: string;
  year: number;
  month: number;
  state: number;
  fileurlList: string[];
  createdAt: string;
};

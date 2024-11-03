export type IContent = {
  id: number;
  status: string;
  title: string;
};

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

export interface RecruitmentData {
  title: string;
  link: string;
  startDate: string;
  deadline: string;
}

export interface BenefitData {
  title: string;
  content: string;
}

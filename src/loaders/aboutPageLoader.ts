import { getCEOData, getPartnersData, getCompanyData, getCompanyDetailData } from '@/apis/PromotionAdmin/dataEdit';
import { CEO_DATA } from '@/constants/introdutionConstants';
import { ICEOInfoData, ICorpInfoData } from '@/types/PromotionPage/about';
import LocomoLogo from '@/assets/images/Locomo.png';
import defaultCEOLogo from '@/assets/images/PP/studioeye_ceo.png';
import { AxiosError } from 'axios';

const defaultCEOData: ICEOInfoData = {
  id: 1,
  name: CEO_DATA.CEO_Name,
  introduction: CEO_DATA.CEO_Instruction,
  imageFileName: defaultCEOLogo,
  imageUrl: defaultCEOLogo,
};

const defaultCorpData: ICorpInfoData[] = [
  {
    partnerInfo: {
      id: 1,
      isMain: true,
      link: 'https://www.netflix.com/browse',
    },
    logoImg: LocomoLogo,
  },
];

export const aboutPageLoader = async () => {
  const errors: AxiosError[] = [];
  try {
    const [ceoData, partnersData, companyData, companyDetailData] = await Promise.all([
      getCEOData().catch((error) => {
        errors.push(error);
        return { data: defaultCEOData, error };
      }), // CEO 데이터 실패 시 기본값 반환
      getPartnersData().catch((error) => {
        errors.push(error);
        return { data: defaultCorpData, error };
      }), // Partners 데이터 실패 시 기본값 반환
      getCompanyData().catch((error) => {
        errors.push(error);
        return { data: { introduction: '', sloganImageUrl: '' }, error };
      }), // 회사 데이터 실패 시 기본값 반환
      getCompanyDetailData().catch((error) => {
        errors.push(error);
        return { data: [], error };
      }), // 회사 세부 데이터 실패 시 빈 배열 반환
    ]);

    // 강제 새로고침 효과를 위해 데이터 복사
    return {
      ceoData: JSON.parse(JSON.stringify(ceoData || defaultCEOData)),
      partnersData: JSON.parse(JSON.stringify(partnersData || defaultCorpData)),
      companyIntroData: companyData.introduction || '',
      sloganImageUrl: companyData.sloganImageUrl || '',
      companyDetailData: companyDetailData || [],
      errors: errors,
    };
  } catch (error) {
    console.error('[🌡AboutPageLoader Error]', error);

    // 모든 데이터 로드 실패 시 기본값 반환
    return {
      ceoData: defaultCEOData,
      partnersData: defaultCorpData,
      companyIntroData: '',
      sloganImageUrl: '',
      companyDetailData: [],
      errors,
    };
  }
};

import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { PA_ROUTES, PA_ROUTES_CHILD, PP_ROUTES_CHILD } from '@/constants/routerConstants';
import Root from './Root';
import withSuspense from './utils/withSuspense';
import Layout from './components/PromotionAdmin/Layout/Layout';
import PAHomePage from './pages/PromotionAdmin/HomePage/index';
import PARequestPage from './pages/PromotionAdmin/RequestPage/index';
import PAArtworkPage from './pages/PromotionAdmin/ArtworkPage/Artwork';
import PADataEditPage from './pages/PromotionAdmin/DataEditPage/index';
import PAStatisticsPage from './pages/PromotionAdmin/StatisticsPage/index';
import PAFaqPage from './pages/PromotionAdmin/FaqPage/index';
import PARecruitmentPage from './pages/PromotionAdmin/RecruitmentPage/index';
import PASettingPage from './pages/PromotionAdmin/SettingPage/index';
import PANewsPage from './pages/PromotionAdmin/NewsPage/index';
import PANewsWritePage from './pages/PromotionAdmin/NewsPage/NewsWritePage/NewsWritePage';
import PANewsViewPage from './pages/PromotionAdmin/NewsPage/NewsViewPage/NewsViewPage';
import PANewsEditPage from './pages/PromotionAdmin/NewsPage/NewsViewPage/NewsEditPage';
import RequestManagePage from './pages/PromotionAdmin/RequestPage/RequestManagePage';
import RequestCheckPage from './pages/PromotionAdmin/RequestPage/RequestCheckPage';
import PAArtworkDetail from '@/pages/PromotionAdmin/ArtworkPage/ArtworkDetail';
import FAQWritePage from './pages/PromotionAdmin/FaqPage/FAQWritePage';
import RecruitmentManagePage from './pages/PromotionAdmin/RecruitmentPage/RecruitmentManagePage';
import RecruitmentWritePage from './pages/PromotionAdmin/RecruitmentPage/RecruitmentWritePage';
import BenefitManagePage from './pages/PromotionAdmin/RecruitmentPage/BenefitManagePage';
import BenefitWritePage from './pages/PromotionAdmin/RecruitmentPage/BenefitWritePage';
import FAQManagePage from './pages/PromotionAdmin/FaqPage/FAQManagePage';
import PARequestDetailPage from '@/pages/PromotionAdmin/RequestPage/RequestCheckPage';
import FAQCheckPage from './pages/PromotionAdmin/FaqPage/FAQCheckPage';
import Login from './pages/PromotionAdmin/Login/Login';
import CEOEditPage from './pages/PromotionAdmin/DataEditPage/CEOPage/CEOEditPage';
import CEOPage from './pages/PromotionAdmin/DataEditPage/CEOPage/CEOPage';
import ClientEditPage from './pages/PromotionAdmin/DataEditPage/ClientPage/ClientEditPage';
import ClientPage from './pages/PromotionAdmin/DataEditPage/ClientPage/ClientPage';
import ClientWritePage from './pages/PromotionAdmin/DataEditPage/ClientPage/ClientWritePage';
import CompanyPage from './pages/PromotionAdmin/DataEditPage/CompanyPage/CompanyPage';
import MenuPage from './pages/PromotionAdmin/DataEditPage/MenuPage/MenuPage';
import PartnerEditPage from './pages/PromotionAdmin/DataEditPage/PartnerPage/PartnerEditPage';
import PartnerPage from './pages/PromotionAdmin/DataEditPage/PartnerPage/PartnerPage';
import PartnerWritePage from './pages/PromotionAdmin/DataEditPage/PartnerPage/PartnerWritePage';
import { aboutPageLoader } from './loaders/aboutPageLoader';
import ErrorPage from './pages/ErrorPage/ErrorPage';

// PromotionAdmin

// const PALayout = withSuspense(lazy(() => import('./components/PromotionAdmin/Layout/Layout')));
// const Login = withSuspense(lazy(() => import('./pages/PromotionAdmin/Login/Login')));
// const PAHomePage = withSuspense(lazy(() => import('./pages/PromotionAdmin/HomePage/index')));
// const PARequestPage = withSuspense(lazy(() => import('./pages/PromotionAdmin/RequestPage/index')));
// const PAArtworkPage = withSuspense(lazy(() => import('./pages/PromotionAdmin/ArtworkPage/Artwork')));
// const PADataEditPage = withSuspense(lazy(() => import('./pages/PromotionAdmin/DataEditPage/index')));
// const PAStatisticsPage = withSuspense(lazy(() => import('./pages/PromotionAdmin/StatisticsPage/index')));
// const PAFaqPage = withSuspense(lazy(() => import('./pages/PromotionAdmin/FaqPage/index')));
// const PARecruitmentPage = withSuspense(lazy(() => import('./pages/PromotionAdmin/RecruitmentPage/index')));
// const PASettingPage = withSuspense(lazy(() => import('./pages/PromotionAdmin/SettingPage/index')));
// const PANewsPage = withSuspense(lazy(() => import('./pages/PromotionAdmin/NewsPage/index')));
// const PANewsWritePage = withSuspense(lazy(() => import('./pages/PromotionAdmin/NewsPage/NewsWritePage/NewsWritePage')));
// const PANewsViewPage = withSuspense(lazy(() => import('./pages/PromotionAdmin/NewsPage/NewsViewPage/NewsViewPage')));
// const PANewsEditPage = withSuspense(lazy(() => import('./pages/PromotionAdmin/NewsPage/NewsViewPage/NewsEditPage')));
// const FAQWritePage = withSuspense(lazy(() => import('./pages/PromotionAdmin/FaqPage/FAQWritePage')));
// const FAQManagePage = withSuspense(lazy(() => import('./pages/PromotionAdmin/FaqPage/FAQManagePage')));
// const FAQCheckPage = withSuspense(lazy(() => import('./pages/PromotionAdmin/FaqPage/FAQCheckPage')));
// const RecruitmentManagePage = withSuspense(
//   lazy(() => import('./pages/PromotionAdmin/RecruitmentPage/RecruitmentManagePage')),
// );
// const RecruitmentWritePage = withSuspense(
//   lazy(() => import('./pages/PromotionAdmin/RecruitmentPage/RecruitmentWritePage')),
// );
// const BenefitManagePage = withSuspense(lazy(() => import('./pages/PromotionAdmin/RecruitmentPage/BenefitManagePage')));
// const BenefitWritePage = withSuspense(lazy(() => import('./pages/PromotionAdmin/RecruitmentPage/BenefitWritePage')));
// const PARequestDetailPage = withSuspense(lazy(() => import('@/pages/PromotionAdmin/RequestPage/RequestCheckPage')));
// const RequestManagePage = withSuspense(lazy(() => import('./pages/PromotionAdmin/RequestPage/RequestManagePage')));
// const RequestCheckPage = withSuspense(lazy(() => import('./pages/PromotionAdmin/RequestPage/RequestCheckPage')));
// const PAArtworkDetail = withSuspense(lazy(() => import('@/pages/PromotionAdmin/ArtworkPage/ArtworkDetail')));
// const MenuPage = withSuspense(lazy(() => import('./pages/PromotionAdmin/DataEditPage/MenuPage/MenuPage')));
// const ClientWritePage = withSuspense(
//   lazy(() => import('./pages/PromotionAdmin/DataEditPage/ClientPage/ClientWritePage')),
// );
// const CEOEditPage = withSuspense(lazy(() => import('./pages/PromotionAdmin/DataEditPage/CEOPage/CEOEditPage')));
// const CEOPage = withSuspense(lazy(() => import('./pages/PromotionAdmin/DataEditPage/CEOPage/CEOPage')));
// const CompanyPage = withSuspense(lazy(() => import('./pages/PromotionAdmin/DataEditPage/CompanyPage/CompanyPage')));
// const PartnerPage = withSuspense(lazy(() => import('./pages/PromotionAdmin/DataEditPage/PartnerPage/PartnerPage')));
// const ClientPage = withSuspense(lazy(() => import('./pages/PromotionAdmin/DataEditPage/ClientPage/ClientPage')));
// const PartnerEditPage = withSuspense(
//   lazy(() => import('./pages/PromotionAdmin/DataEditPage/PartnerPage/PartnerEditPage')),
// );
// const ClientEditPage = withSuspense(
//   lazy(() => import('./pages/PromotionAdmin/DataEditPage/ClientPage/ClientEditPage')),
// );
// const PartnerWritePage = withSuspense(
//   lazy(() => import('./pages/PromotionAdmin/DataEditPage/PartnerPage/PartnerWritePage')),
// );

// PromotionPage

const PPLayout = withSuspense(lazy(() => import('@/components/PromotionPage/Layout/Layout')));
const Mainpage = withSuspense(lazy(() => import('@/pages/PromotionPage/Main/MainPage')));
const AboutPage = withSuspense(lazy(() => import('@/pages/PromotionPage/AboutPage/AboutPage')));
const ContactUsPage = withSuspense(lazy(() => import('./pages/PromotionPage/ContactPage/ContactUsPage')));
const FaqPage = withSuspense(lazy(() => import('./pages/PromotionPage/FaqPage/FaqPage')));
const NewsBoardPage = withSuspense(lazy(() => import('./pages/PromotionPage/NewsPage/NewsBoardPage')));
const RecruitmentPage = withSuspense(lazy(() => import('./pages/PromotionPage/RecruitmentPage/RecruitmentPage')));
const ArtworkPage = withSuspense(lazy(() => import('./pages/PromotionPage/ArtworkPage/ArtworkPage')));
const ArtworkLayout = withSuspense(lazy(() => import('./components/PromotionPage/Artwork/Layout')));
const ArtworkDetailPage = withSuspense(lazy(() => import('./pages/PromotionPage/ArtworkPage/ArtworkDetailPage')));

// ForTest
const GreetingComponent = withSuspense(lazy(() => import('./pages/ForTest/GreetingComponent')));

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />, // 에러 페이지 설정
    children: [
      {
        path: '',
        element: <PPLayout />,
        children: [
          {
            path: PP_ROUTES_CHILD.MAIN,
            element: <Mainpage />,
          },
          {
            path: PP_ROUTES_CHILD.ABOUT,
            element: <AboutPage />,
            loader: aboutPageLoader,
          },
          {
            path: PP_ROUTES_CHILD.ARTWORK,
            element: <ArtworkLayout />,
            children: [
              {
                path: '',
                element: <ArtworkPage />,
              },
            ],
          },
          {
            path: PP_ROUTES_CHILD.ARTWORK_DETAIL,
            element: <ArtworkDetailPage />,
          },
          {
            path: PP_ROUTES_CHILD.FAQ,
            element: <FaqPage />,
          },
          {
            path: PP_ROUTES_CHILD.CONTACT,
            element: <ContactUsPage />,
          },
          {
            path: PP_ROUTES_CHILD.LOGIN,
            element: <Login />,
          },
          {
            path: PP_ROUTES_CHILD.NEWSBOARD,
            element: <NewsBoardPage />,
          },
          {
            path: PP_ROUTES_CHILD.RECRUITMENT,
            element: <RecruitmentPage />,
          },
        ],
      },

      {
        path: '/promotion-admin',
        element: <Layout />,
        children: [
          {
            path: PA_ROUTES_CHILD.HOME,
            element: <PAHomePage />,
          },
          {
            path: PA_ROUTES_CHILD.REQUEST,
            element: <PARequestPage />,
            children: [
              {
                path: '',
                element: <RequestManagePage />,
              },
              {
                path: `${PA_ROUTES.REQUEST}/:requestId`,
                element: <RequestCheckPage />,
              },
            ],
          },
          {
            path: PA_ROUTES_CHILD.REQUEST_DETAIL,
            element: <PARequestDetailPage />,
          },
          {
            path: PA_ROUTES_CHILD.ARTWORK,
            element: <PAArtworkPage />,
            children: [
              {
                path: `${PA_ROUTES.ARTWORK}/:artworkId`,
                element: <PAArtworkDetail />,
              },
            ],
          },
          {
            path: PA_ROUTES_CHILD.DATA_EDIT,
            element: <PADataEditPage />,
            children: [
              {
                path: `${PA_ROUTES.DATA_EDIT}/ceo`,
                element: <CEOPage />,
              },
              {
                path: `${PA_ROUTES.DATA_EDIT}/ceo/edit`,
                element: <CEOEditPage />,
              },
              {
                path: `${PA_ROUTES.DATA_EDIT}/company`,
                element: <CompanyPage />,
              },
              {
                path: `${PA_ROUTES.DATA_EDIT}/partner`,
                element: <PartnerPage />,
                children: [
                  {
                    path: `${PA_ROUTES.DATA_EDIT}/partner/:partnerId`,
                    element: <PartnerEditPage />,
                  },
                  {
                    path: `${PA_ROUTES.DATA_EDIT}/partner/write`,
                    element: <PartnerWritePage />,
                  },
                ],
              },
              {
                path: `${PA_ROUTES.DATA_EDIT}/client`,
                element: <ClientPage />,
                children: [
                  {
                    path: `${PA_ROUTES.DATA_EDIT}/client/:clientId`,
                    element: <ClientEditPage />,
                  },
                  {
                    path: `${PA_ROUTES.DATA_EDIT}/client/write`,
                    element: <ClientWritePage />,
                  },
                ],
              },
              {
                path: `${PA_ROUTES.DATA_EDIT}/menu`,
                element: <MenuPage />,
              },
            ],
          },
          {
            path: PA_ROUTES_CHILD.STATISTICS,
            element: <PAStatisticsPage />,
          },
          {
            path: PA_ROUTES_CHILD.FAQ,
            element: <PAFaqPage />,
            children: [
              {
                path: '',
                element: <FAQManagePage />,
                children: [
                  {
                    path: `${PA_ROUTES.FAQ}/:faqId`,
                    element: <FAQCheckPage />,
                  },
                ],
              },
              {
                path: `${PA_ROUTES.FAQ}/write`,
                element: <FAQWritePage />,
              },
            ],
          },
          {
            path: PA_ROUTES_CHILD.RECRUITMENT,
            element: <PARecruitmentPage />,
            children: [
              {
                path: `${PA_ROUTES.RECRUITMENT}/manage`,
                element: <RecruitmentManagePage />,
              },
              {
                path: `${PA_ROUTES.RECRUITMENT}/write`,
                element: <RecruitmentWritePage />,
              },
              {
                path: `${PA_ROUTES.RECRUITMENT}/benefit/manage`,
                element: <BenefitManagePage />,
              },
              {
                path: `${PA_ROUTES.RECRUITMENT}/benefit/write`,
                element: <BenefitWritePage />,
              },
            ],
          },
          {
            path: PA_ROUTES_CHILD.SETTING,
            element: <PASettingPage />,
          },
          {
            path: PA_ROUTES_CHILD.NEWS,
            element: <PANewsPage />,
            children: [
              {
                path: `writing`,
                element: <PANewsWritePage />,
              },
              {
                path: `:id`,
                element: <PANewsViewPage />,
                children: [
                  {
                    path: `edit`,
                    element: <PANewsEditPage />,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        path: '/api/greeting',
        element: <GreetingComponent />,
      },
    ],
  },
]);

export default router;

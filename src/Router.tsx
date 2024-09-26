import { createBrowserRouter } from 'react-router-dom';
import Root from './Root';
import PAHomePage from './pages/PromotionAdmin/HomePage/index';
import PARequestPage from './pages/PromotionAdmin/RequestPage/index';
import PAArtworkPage from './pages/PromotionAdmin/ArtworkPage/Artwork';
import PADataEditPage from './pages/PromotionAdmin/DataEditPage/index';
import PAStatisticsPage from './pages/PromotionAdmin/StatisticsPage/index';
import PAFaqPage from './pages/PromotionAdmin/FaqPage/index';
import PASettingPage from './pages/PromotionAdmin/SettingPage/index';
import PANewsPage from './pages/PromotionAdmin/NewsPage/index';
import PANewsWritePage from './pages/PromotionAdmin/NewsPage/NewsWritePage/NewsWritePage';
import PANewsViewPage from './pages/PromotionAdmin/NewsPage/NewsViewPage/NewsViewPage';
import PALayout from './components/PromotionAdmin/Layout/Layout';
import { PA_ROUTES, PA_ROUTES_CHILD, PP_ROUTES_CHILD } from '@/constants/routerConstants';
import FAQWritePage from './pages/PromotionAdmin/FaqPage/FAQWritePage';
import FAQManagePage from './pages/PromotionAdmin/FaqPage/FAQManagePage';
import PARequestDetailPage from '@/pages/PromotionAdmin/RequestPage/RequestCheckPage';
import FAQCheckPage from './pages/PromotionAdmin/FaqPage/FAQCheckPage';
import RequestManagePage from './pages/PromotionAdmin/RequestPage/RequestManagePage';
import RequestCheckPage from './pages/PromotionAdmin/RequestPage/RequestCheckPage';
import PAArtworkDetail from '@/pages/PromotionAdmin/ArtworkPage/ArtworkDetail';
import ArtworkDetailPage from './pages/PromotionPage/ArtworkPage/ArtworkDetailPage';
import ArtworkPage from './pages/PromotionPage/ArtworkPage/ArtworkPage';
import ArtworkLayout from './components/PromotionPage/Artwork/Layout';
import Mainpage from '@/pages/PromotionPage/Main/MainPage';
import PPLayout from '@/components/PromotionPage/Layout/Layout';
import AboutPage from '@/pages/PromotionPage/AboutPage/AboutPage';
import ContactUsPage from './pages/PromotionPage/ContactPage/ContactUsPage';
import FaqPage from './pages/PromotionPage/FaqPage/FaqPage';

import CEOPage from './pages/PromotionAdmin/DataEditPage/CEOPage/CEOPage';
import CompanyPage from './pages/PromotionAdmin/DataEditPage/CompanyPage/CompanyPage';
import PartnerPage from './pages/PromotionAdmin/DataEditPage/PartnerPage/PartnerPage';
import ClientPage from './pages/PromotionAdmin/DataEditPage/ClientPage/ClientPage';
import PartnerEditPage from './pages/PromotionAdmin/DataEditPage/PartnerPage/PartnerEditPage';
import ClientEditPage from './pages/PromotionAdmin/DataEditPage/ClientPage/ClientEditPage';
import PartnerWritePage from './pages/PromotionAdmin/DataEditPage/PartnerPage/PartnerWritePage';

import Login from './pages/PromotionAdmin/Login/Login';
import ClientWritePage from './pages/PromotionAdmin/DataEditPage/ClientPage/ClientWritePage';
import CEOEditPage from './pages/PromotionAdmin/DataEditPage/CEOPage/CEOEditPage';
import NewsBoardPage from './pages/PromotionPage/NewsPage/NewsBoardPage';
import NewsDetailPage from './pages/PromotionPage/NewsPage/NewsDetailPage';
const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
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
            path: PP_ROUTES_CHILD.FAQ,
            element: <FaqPage />,
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
            path: PP_ROUTES_CHILD.NEWSBOARD_DETAIL,
            element: <NewsDetailPage />,
          },
        ],
      },

      {
        path: '/promotion-admin',
        element: <PALayout />,
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
                    path: `${PA_ROUTES.DATA_EDIT}/client/:clientrId`,
                    element: <ClientEditPage />,
                  },
                  {
                    path: `${PA_ROUTES.DATA_EDIT}/client/write`,
                    element: <ClientWritePage />,
                  },
                ],
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
            path: PA_ROUTES_CHILD.SETTING,
            element: <PASettingPage />,
          },
          {
            path: PA_ROUTES_CHILD.NEWS,
            element: <PANewsPage/>,
            children:[
              {
                path: `writing`,
                element: <PANewsWritePage/>,
              },
              {
                path:`:id`,
                element: <PANewsViewPage/>
              }
            ]
          }
        ],
      },
    ],
  },
]);

export default router;

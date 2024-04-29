import { createBrowserRouter } from 'react-router-dom';
import Root from './Root';
import PAHomePage from './pages/PromotionAdmin/HomePage/index';
import PARequestPage from './pages/PromotionAdmin/RequestPage/index';
import PAArtworkPage from './pages/PromotionAdmin/ArtworkPage/Artwork';
import PAPageEditPage from './pages/PromotionAdmin/PageEditPage/index';
import PAStatisticsPage from './pages/PromotionAdmin/StatisticsPage/index';
import PAFaqPage from './pages/PromotionAdmin/FaqPage/index';
import PASettingPage from './pages/PromotionAdmin/SettingPage/index';
import PALayout from './components/PromotionAdmin/Layout/Layout';
import { PA_ROUTES, PA_ROUTES_CHILD, PP_ROUTES_CHILD } from '@/constants/routerConstants';
import FAQWritePage from './pages/PromotionAdmin/FaqPage/FAQWritePage';
import FAQManagePage from './pages/PromotionAdmin/FaqPage/FAQManagePage';
import PARequestDetailPage from '@/pages/PromotionAdmin/RequestPage/RequestCheckPage';
import FAQEditPage from './pages/PromotionAdmin/FaqPage/FAQEditPage';
import FAQCheckPage from './pages/PromotionAdmin/FaqPage/FAQCheckPage';
import RequestManagePage from './pages/PromotionAdmin/RequestPage/RequestManagePage';
import RequestCheckPage from './pages/PromotionAdmin/RequestPage/RequestCheckPage';
import PAArtworkDetail from '@/pages/PromotionAdmin/ArtworkPage/ArtworkDetail';
import ArtworkDetailPage from './pages/PromotionPage/ArtworkPage/ArtworkDetailPage';
import ArtworkPage from './pages/PromotionPage/ArtworkPage/ArtworkPage';
import ArtworkLayout from './components/PromotionPage/Artwork/Layout';
import Mainpage from '@/pages/PromotionPage/Main/MainPage';
import PPLayout from '@/components/PromotionPage/Layout/Layout';
import ContactUsPage from './pages/PromotionPage/ContactPage/ContactUsPage';

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
            path: PP_ROUTES_CHILD.CONTACT,
            element: <ContactUsPage />,
          },
        ],
      },

      {
        path: '/pa-test',
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
            path: PA_ROUTES_CHILD.PAGE_EDIT,
            element: <PAPageEditPage />,
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
                  {
                    path: `${PA_ROUTES.FAQ}/write/:faqId`,
                    element: <FAQEditPage />,
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
        ],
      },
    ],
  },
]);

export default router;

import { Suspense, lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { PA_ROUTES, PA_ROUTES_CHILD, PP_ROUTES_CHILD } from '@/constants/routerConstants';
import Root from './Root';

const Loading = lazy(()=>import('./components/PromotionPage/Layout/Loading'));

// PromotionAdmin

const PALayout = lazy(() => import('./components/PromotionAdmin/Layout/Layout'));
const Login = lazy(() => import('./pages/PromotionAdmin/Login/Login'));
const PAHomePage = lazy(() => import('./pages/PromotionAdmin/HomePage/index'));
const PARequestPage = lazy(() => import('./pages/PromotionAdmin/RequestPage/index'));
const PAArtworkPage = lazy(() => import('./pages/PromotionAdmin/ArtworkPage/Artwork'));
const PADataEditPage = lazy(() => import('./pages/PromotionAdmin/DataEditPage/index'));
const PAStatisticsPage = lazy(() => import('./pages/PromotionAdmin/StatisticsPage/index'));
const PAFaqPage = lazy(() => import('./pages/PromotionAdmin/FaqPage/index'));
const PARecruitmentPage = lazy(() => import('./pages/PromotionAdmin/RecruitmentPage/index'));
const PASettingPage = lazy(() => import('./pages/PromotionAdmin/SettingPage/index'));
const PANewsPage = lazy(() => import('./pages/PromotionAdmin/NewsPage/index'));
const PANewsWritePage = lazy(() => import('./pages/PromotionAdmin/NewsPage/NewsWritePage/NewsWritePage'));
const PANewsViewPage = lazy(() => import('./pages/PromotionAdmin/NewsPage/NewsViewPage/NewsViewPage'));
const PANewsEditPage = lazy(() => import('./pages/PromotionAdmin/NewsPage/NewsViewPage/NewsEditPage'));
const FAQWritePage = lazy(() => import('./pages/PromotionAdmin/FaqPage/FAQWritePage'));
const FAQManagePage = lazy(() => import('./pages/PromotionAdmin/FaqPage/FAQManagePage'));
const FAQCheckPage = lazy(() => import('./pages/PromotionAdmin/FaqPage/FAQCheckPage'));
const RecruitmentManagePage = lazy(() => import('./pages/PromotionAdmin/RecruitmentPage/RecruitmentManagePage'));
const RecruitmentWritePage = lazy(() => import('./pages/PromotionAdmin/RecruitmentPage/RecruitmentWritePage'));
const BenefitManagePage = lazy(() => import('./pages/PromotionAdmin/RecruitmentPage/BenefitManagePage'));
const BenefitWritePage = lazy(() => import('./pages/PromotionAdmin/RecruitmentPage/BenefitWritePage'));
const PARequestDetailPage = lazy(() => import('@/pages/PromotionAdmin/RequestPage/RequestCheckPage'));
const RequestManagePage = lazy(() => import('./pages/PromotionAdmin/RequestPage/RequestManagePage'));
const RequestCheckPage = lazy(() => import('./pages/PromotionAdmin/RequestPage/RequestCheckPage'));
const PAArtworkDetail = lazy(() => import('@/pages/PromotionAdmin/ArtworkPage/ArtworkDetail'));
const MenuPage = lazy(() => import('./pages/PromotionAdmin/DataEditPage/MenuPage/MenuPage'));
const ClientWritePage = lazy(() => import('./pages/PromotionAdmin/DataEditPage/ClientPage/ClientWritePage'));
const CEOEditPage = lazy(() => import('./pages/PromotionAdmin/DataEditPage/CEOPage/CEOEditPage'));
const CEOPage = lazy(() => import('./pages/PromotionAdmin/DataEditPage/CEOPage/CEOPage'));
const CompanyPage = lazy(() => import('./pages/PromotionAdmin/DataEditPage/CompanyPage/CompanyPage'));
const PartnerPage = lazy(() => import('./pages/PromotionAdmin/DataEditPage/PartnerPage/PartnerPage'));
const ClientPage = lazy(() => import('./pages/PromotionAdmin/DataEditPage/ClientPage/ClientPage'));
const PartnerEditPage = lazy(() => import('./pages/PromotionAdmin/DataEditPage/PartnerPage/PartnerEditPage'));
const ClientEditPage = lazy(() => import('./pages/PromotionAdmin/DataEditPage/ClientPage/ClientEditPage'));
const PartnerWritePage = lazy(() => import('./pages/PromotionAdmin/DataEditPage/PartnerPage/PartnerWritePage'));

// PromotionPage

const PPLayout = lazy(() => import('@/components/PromotionPage/Layout/Layout'));
const Mainpage = lazy(() => import('@/pages/PromotionPage/Main/MainPage'));
const AboutPage = lazy(() => import('@/pages/PromotionPage/AboutPage/AboutPage'));
const ContactUsPage = lazy(() => import('./pages/PromotionPage/ContactPage/ContactUsPage'));
const FaqPage = lazy(() => import('./pages/PromotionPage/FaqPage/FaqPage'));
const NewsBoardPage = lazy(() => import('./pages/PromotionPage/NewsPage/NewsBoardPage'));
const RecruitmentPage = lazy(() => import('./pages/PromotionPage/RecruitmentPage/RecruitmentPage'));
const ArtworkPage=lazy(()=>import('./pages/PromotionPage/ArtworkPage/ArtworkPage'));
const ArtworkLayout=lazy(()=>import('./components/PromotionPage/Artwork/Layout'));
const ArtworkDetailPage = lazy(() => import('./pages/PromotionPage/ArtworkPage/ArtworkDetailPage'));

// ForTest
const GreetingComponent = lazy(() => import('./pages/ForTest/GreetingComponent'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '',
        element: (
          <Suspense fallback={<Loading/>}>
            <PPLayout />
          </Suspense>
        ),
        children: [
          {
            path: PP_ROUTES_CHILD.MAIN,
            element: (
              <Suspense fallback={<Loading/>}>
                <Mainpage />
              </Suspense>
            ),
          },
          {
            path: PP_ROUTES_CHILD.ABOUT,
            element: (
              <Suspense fallback={<Loading/>}>
                <AboutPage />
              </Suspense>
            ),
          },
          {
            path: PP_ROUTES_CHILD.ARTWORK,
            element: (
              <Suspense fallback={<Loading/>}>
                <ArtworkLayout />
              </Suspense>
            ),
            children: [
              {
                path: '',
                element: (
                  <Suspense fallback={<Loading/>}>
                    <ArtworkPage />
                  </Suspense>
                ),
              },
            ],
          },
          {
            path: PP_ROUTES_CHILD.ARTWORK_DETAIL,
            element: (
              <Suspense fallback={<Loading/>}>
                <ArtworkDetailPage />
              </Suspense>
            ),
          },
          {
            path: PP_ROUTES_CHILD.FAQ,
            element: (
              <Suspense fallback={<Loading/>}>
                <FaqPage />
              </Suspense>
            ),
          },
          {
            path: PP_ROUTES_CHILD.CONTACT,
            element: (
              <Suspense fallback={<Loading/>}>
                <ContactUsPage />
              </Suspense>
            ),
          },
          {
            path: PP_ROUTES_CHILD.LOGIN,
            element: (
              <Suspense fallback={<Loading/>}>
                <Login />
              </Suspense>
            ),
          },
          {
            path: PP_ROUTES_CHILD.NEWSBOARD,
            element: (
              <Suspense fallback={<Loading/>}>
                <NewsBoardPage />
              </Suspense>
            ),
          },
          {
            path: PP_ROUTES_CHILD.RECRUITMENT,
            element: (
              <Suspense fallback={<Loading/>}>
                <RecruitmentPage />
              </Suspense>
            ),
          },
        ],
      },

      {
        path: '/promotion-admin',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <PALayout />
          </Suspense>
        ),
        children: [
          {
            path: PA_ROUTES_CHILD.HOME,
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <PAHomePage />
              </Suspense>
            ),
          },
          {
            path: PA_ROUTES_CHILD.REQUEST,
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <PARequestPage />
              </Suspense>
            ),
            children: [
              {
                path: '',
                element: (
                  <Suspense fallback={<div>Loading...</div>}>
                    <RequestManagePage />
                  </Suspense>
                ),
              },
              {
                path: `${PA_ROUTES.REQUEST}/:requestId`,
                element: (
                  <Suspense fallback={<div>Loading...</div>}>
                    <RequestCheckPage />
                  </Suspense>
                ),
              },
            ],
          },
          {
            path: PA_ROUTES_CHILD.REQUEST_DETAIL,
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <PARequestDetailPage />
              </Suspense>
            ),
          },
          {
            path: PA_ROUTES_CHILD.ARTWORK,
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <PAArtworkPage />
              </Suspense>
            ),
            children: [
              {
                path: `${PA_ROUTES.ARTWORK}/:artworkId`,
                element: (
                  <Suspense fallback={<div>Loading...</div>}>
                    <PAArtworkDetail />
                  </Suspense>
                ),
              },
            ],
          },
          {
            path: PA_ROUTES_CHILD.DATA_EDIT,
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <PADataEditPage />
              </Suspense>
            ),
            children: [
              {
                path: `${PA_ROUTES.DATA_EDIT}/ceo`,
                element: (
                  <Suspense fallback={<div>Loading...</div>}>
                    <CEOPage />
                  </Suspense>
                ),
              },
              {
                path: `${PA_ROUTES.DATA_EDIT}/ceo/edit`,
                element: (
                  <Suspense fallback={<div>Loading...</div>}>
                    <CEOEditPage />
                  </Suspense>
                ),
              },
              {
                path: `${PA_ROUTES.DATA_EDIT}/company`,
                element: (
                  <Suspense fallback={<div>Loading...</div>}>
                    <CompanyPage />
                  </Suspense>
                ),
              },
              {
                path: `${PA_ROUTES.DATA_EDIT}/partner`,
                element: (
                  <Suspense fallback={<div>Loading...</div>}>
                    <PartnerPage />
                  </Suspense>
                ),
                children: [
                  {
                    path: `${PA_ROUTES.DATA_EDIT}/partner/:partnerId`,
                    element: (
                      <Suspense fallback={<div>Loading...</div>}>
                        <PartnerEditPage />
                      </Suspense>
                    ),
                  },
                  {
                    path: `${PA_ROUTES.DATA_EDIT}/partner/write`,
                    element: (
                      <Suspense fallback={<div>Loading...</div>}>
                        <PartnerWritePage />
                      </Suspense>
                    ),
                  },
                ],
              },
              {
                path: `${PA_ROUTES.DATA_EDIT}/client`,
                element: (
                  <Suspense fallback={<div>Loading...</div>}>
                    <ClientPage />
                  </Suspense>
                ),
                children: [
                  {
                    path: `${PA_ROUTES.DATA_EDIT}/client/:clientId`,
                    element: (
                      <Suspense fallback={<div>Loading...</div>}>
                        <ClientEditPage />
                      </Suspense>
                    ),
                  },
                  {
                    path: `${PA_ROUTES.DATA_EDIT}/client/write`,
                    element: (
                      <Suspense fallback={<div>Loading...</div>}>
                        <ClientWritePage />
                      </Suspense>
                    ),
                  },
                ],
              },
              {
                path: `${PA_ROUTES.DATA_EDIT}/menu`,
                element: (
                  <Suspense fallback={<div>Loading...</div>}>
                    <MenuPage />
                  </Suspense>
                ),
              },
            ],
          },
          {
            path: PA_ROUTES_CHILD.STATISTICS,
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <PAStatisticsPage />
              </Suspense>
            ),
          },
          {
            path: PA_ROUTES_CHILD.FAQ,
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <PAFaqPage />
              </Suspense>
            ),
            children: [
              {
                path: '',
                element: (
                  <Suspense fallback={<div>Loading...</div>}>
                    <FAQManagePage />
                  </Suspense>
                ),
                children: [
                  {
                    path: `${PA_ROUTES.FAQ}/:faqId`,
                    element: (
                      <Suspense fallback={<div>Loading...</div>}>
                        <FAQCheckPage />
                      </Suspense>
                    ),
                  },
                ],
              },
              {
                path: `${PA_ROUTES.FAQ}/write`,
                element: (
                  <Suspense fallback={<div>Loading...</div>}>
                    <FAQWritePage />
                  </Suspense>
                ),
              },
            ],
          },
          {
            path: PA_ROUTES_CHILD.RECRUITMENT,
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <PARecruitmentPage />
              </Suspense>
            ),
            children: [
              {
                path: `${PA_ROUTES.RECRUITMENT}/manage`,
                element: (
                  <Suspense fallback={<div>Loading...</div>}>
                    <RecruitmentManagePage />
                  </Suspense>
                ),
              },
              {
                path: `${PA_ROUTES.RECRUITMENT}/write`,
                element: (
                  <Suspense fallback={<div>Loading...</div>}>
                    <RecruitmentWritePage />
                  </Suspense>
                ),
              },
              {
                path: `${PA_ROUTES.RECRUITMENT}/benefit/manage`,
                element: (
                  <Suspense fallback={<div>Loading...</div>}>
                    <BenefitManagePage />
                  </Suspense>
                ),
              },
              {
                path: `${PA_ROUTES.RECRUITMENT}/benefit/write`,
                element: (
                  <Suspense fallback={<div>Loading...</div>}>
                    <BenefitWritePage />
                  </Suspense>
                ),
              },
            ],
          },
          {
            path: PA_ROUTES_CHILD.SETTING,
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <PASettingPage />
              </Suspense>
            ),
          },
          {
            path: PA_ROUTES_CHILD.NEWS,
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <PANewsPage />
              </Suspense>
            ),
            children: [
              {
                path: `writing`,
                element: (
                  <Suspense fallback={<div>Loading...</div>}>
                    <PANewsWritePage />
                  </Suspense>
                ),
              },
              {
                path: `:id`,
                element: (
                  <Suspense fallback={<div>Loading...</div>}>
                    <PANewsViewPage />
                  </Suspense>
                ),
                children: [
                  {
                    path: `edit`,
                    element: (
                      <Suspense fallback={<div>Loading...</div>}>
                        <PANewsEditPage />
                      </Suspense>
                    ),
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        path: '/api/greeting',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <GreetingComponent />
          </Suspense>
        ),
      },
    ],
  },
]);

export default router;

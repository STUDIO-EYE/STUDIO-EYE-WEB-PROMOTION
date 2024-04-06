import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import PromotionMainpage from "./pages/MainPage/PromotionMainPage";
import AboutMainpage from "./pages/AboutPage/AboutMainPage";
import ArtworkMainpage from "./pages/ArtworkPage/ArtworkMainPage";
import ContentDetailPage from "./pages/DetailPage/ContentDetailPage";
import AdminMainPage from "./pages/AdminPage/AdminMainPage";
import AdminEditPage from "./pages/AdminPage/AboutEditPage";
import ArtworkEditPage from "./pages/AdminPage/ArtworkEditPage";
import ContactEditPage from "./pages/AdminPage/ContactEditPage";
import MainEditPage from "./pages/AdminPage/MainEditPage";
import ContactPage from "./pages/ContactPage/ContactPage";
import LoginPage from "./pages/LoginPage/LoginMainPage";
import ContactPage2 from "./pages/ContactPage/ContactPage2";
import FaqPage from "./Pages/FaqPage/FaqPAge";
import FaqDetailPage from "./Pages/DetailPage/FaqDetailPage";
import FAQMainPage from "./pages/PromotionAdmin/FAQPage/FAQMainPage";
import FAQWritePage from "./pages/PromotionAdmin/FAQPage/FAQWritePage";
import FAQManagePage from "./pages/PromotionAdmin/FAQPage/FAQManagePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <PromotionMainpage />,
      },
      {
        path: "/about",
        element: <AboutMainpage />,
      },
      {
        path: "/contents",
        element: <ArtworkMainpage />,
      },
      {
        path: "/detail/:detailId",
        element: <ContentDetailPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/admin",
        element: <AdminMainPage />,
      },
      {
        path: "/admin/about",
        element: <AdminEditPage />,
      },
      {
        path: "/admin/artwork",
        element: <ArtworkEditPage />,
      },
      {
        path: "/admin/contact",
        element: <ContactEditPage />,
      },
      {
        path: "/admin/mainpage",
        element: <MainEditPage />,
      },
      {
        path: "/contact",
        element: <ContactPage />,
      },
      {
        path: "/faq",
        element: <FaqPage />,
      },
      {
        path: "/faq/detail/:detailId",
        element: <FaqDetailPage />,
      },
      // {
      //   path: "/contact",
      //   element: <ContactPage2 />,
      // },
      {
        path: "/admin/faq",
        element: <FAQMainPage />,
        children: [
          {
            path: "",
            element: <FAQManagePage />,
          },
          {
            path: "/admin/faq/write/:faqId",
            element: <FAQManagePage />,
          },
          {
            path: "/admin/faq/write",
            element: <FAQWritePage />,
          },
        ],
      },
    ],
  },
]);

export default router;

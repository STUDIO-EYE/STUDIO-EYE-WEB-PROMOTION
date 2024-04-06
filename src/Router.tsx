import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import PromotionMainpage from "./Pages/MainPage/PromotionMainPage";
import AboutMainpage from "./Pages/AboutPage/AboutMainPage";
import ArtworkMainpage from "./Pages/ArtworkPage/ArtworkMainPage";
import ContentDetailPage from "./Pages/DetailPage/ContentDetailPage";
import AdminMainPage from "./Pages/AdminPage/AdminMainPage";
import AdminEditPage from "./Pages/AdminPage/AboutEditPage";
import ArtworkEditPage from "./Pages/AdminPage/ArtworkEditPage";
import ContactEditPage from "./Pages/AdminPage/ContactEditPage";
import MainEditPage from "./Pages/AdminPage/MainEditPage";
import ContactPage from "./Pages/ContactPage/ContactPage";
import LoginPage from "./Pages/LoginPage/LoginMainPage";
import FaqPage from "./Pages/FaqPage/FaqPAge";
import FaqDetailPage from "./Pages/DetailPage/FaqDetailPage";
import ContactPage2 from "./Pages/ContactPage/ContactPage2";

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
    ],
  },
]);

export default router;

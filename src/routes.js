// Pages
import AboutUs from "layouts/pages/landing-pages/about-us";
import ContactUs from "layouts/pages/landing-pages/contact-us";
import MainPage from "layouts/pages/presentation/index";
//import SignIn from "layouts/pages/authentication/sign-in";

const routes = [
  {
    name: "trang chủ",
    //route: "/pages/presentaion/index",
    route: "/monitoring-prime/page/home",
    component: <MainPage />,
  },
  {
    name: "liên hệ với chúng tôi",
    // route: "/pages/landing-pages/contact-us",
    route: "/monitoring-prime/page/contact-us",
    component: <ContactUs />,
  },
  {
    name: "về chúng tôi",
    route: "/monitoring-prime/page/about-us",
    component: <AboutUs />,
  },
  //{
  //   name: "đăng nhập",
  //   route: "/monitoring-prime/authentication/sign-in",
  //   component: <SignIn />,
  // },
];

export default routes;

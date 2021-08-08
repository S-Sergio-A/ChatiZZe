import { Route, Switch } from "react-router-dom";
import { lazy } from "react";
// import TermsAndConditions from "../info-pages/TermsAndConditions";
// import InformationPage from "../info-pages/InformationPage";
// import Registration from "../registration/Registration";
// import PrivacyPolicy from "../info-pages/PrivacyPolicy";
// import Verification from "../verification/Verification";
// import CookiePolicy from "../info-pages/CookiePolicy";
// import Attribution from "../attribution/Attribution";
// import PageNotFound from "../error/PageNotFound";
// import FeaturesPage from "../features/Features";
// import ContactUs from "../contact-us/ContactUs";
// import Main from "../main-page/Main";
// import Login from "../login/Login";
// import Chat from "../chat/Chat";
// import Blog from "../blog/Blog";

const Attribution = lazy(() => import(/* webpackChunkName: "attribution" */ "../attribution/Attribution"));
const PageNotFound = lazy(() => import(/* webpackChunkName: "notFound" */ "../error/PageNotFound"));
const FeaturesPage = lazy(() => import(/* webpackChunkName: "features" */ "../features/Features"));
const Registration = lazy(() => import(/* webpackChunkName: "registration", webpackPrefetch: true */ "../registration/Registration"));
const Verification = lazy(() => import(/* webpackChunkName: "verification", webpackPrefetch: true */ "../verification/Verification"));
const Login = lazy(() => import(/* webpackChunkName: "login" */ "../login/Login"));
const Chat = lazy(() => import(/* webpackChunkName: "chat" */ "../chat/Chat"));
const Blog = lazy(() => import(/* webpackChunkName: "blog" */ "../blog/Blog"));
const ContactUs = lazy(() => import(/* webpackChunkName: "contact" */ "../contact-us/ContactUs"));
const CookiePolicy = lazy(() => import(/* webpackChunkName: "cookPol" */ "../info-pages/CookiePolicy"));
const TermsAndConditions = lazy(() => import(/* webpackChunkName: "termCond" */ "../info-pages/TermsAndConditions"));
const PrivacyPolicy = lazy(() => import(/* webpackChunkName: "privPol" */ "../info-pages/PrivacyPolicy"));
const InformationPage = lazy(() => import(/* webpackChunkName: "faq" */ "../info-pages/InformationPage"));
const Main = lazy(() => import(/* webpackChunkName: "main" */ "../main-page/Main"));

export const Routes = () => {
  return (
    <Switch>
      <Route exact path="/:lang/" component={Main} />
      <Route exact path="/:lang/features" component={FeaturesPage} />
      <Route exact path="/:lang/faq" component={InformationPage} />
      <Route exact path="/:lang/terms-of-use" component={TermsAndConditions} />
      <Route exact path="/:lang/privacy-policy" component={PrivacyPolicy} />
      <Route exact path="/:lang/cookie-policy" component={CookiePolicy} />
      <Route exact path="/:lang/attribution" component={Attribution} />
      <Route exact path="/:lang/contact-us" component={ContactUs} />
      <Route exact path="/:lang/blog" component={Blog} />
      <Route exact path="/:lang/user/registration" component={Registration} />
      <Route path="/:lang/user/login" component={Login} />
      <Route exact path="/:lang/verification/:type/:verificationCode" component={Verification} />
      <Route exact path="/:lang/chat" component={Chat} />
      <Route component={PageNotFound} />
    </Switch>
  );
};

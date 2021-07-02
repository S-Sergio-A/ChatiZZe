import React, { useContext } from "react";
import { Route, Switch } from "react-router-dom";
import { AuthedRoute, UnauthedRoute } from "./Redirect";
import { AuthContext } from "../../context/auth/AuthContext";
import Main from "../main-page/Main";
import Attribution from "../attribution/Attribution";
import ContactUs from "../contact-us/ContactUs";
import InformationPage from "../info-pages/InformationPage";
import PrivacyPolicy from "../info-pages/PrivacyPolicy";
import CookiePolicy from "../info-pages/CookiePolicy";
import TermsAndConditions from "../info-pages/TermsAndConditions";
import Registration from "../registration/Registration";
import Login from "../login/Login";
import PageNotFound from "../error/PageNotFound";
import Chat from "../chat/Chat";

// const Attribution = lazy(() =>  import(/* webpackChunkName: "attribution" */ '../attribution/Attribution'));
// const PageNotFound = lazy(() =>  import(/* webpackChunkName: "notFound" */ '../error/PageNotFound'));
// const CateringController = lazy(() =>
//   import(/* webpackChunkName: "cateringController", webpackPrefetch: true */ '../catering/CateringController')
// );
// const Catering = lazy(() =>  import(/* webpackChunkName: "catering" */ '../catering/Catering'));
// const News = lazy(() =>  import(/* webpackChunkName: "news" */ '../news/News'));
// const PressRelease = lazy(() =>  import(/* webpackChunkName: "pressRelease" */ '../news/PressRelease'));
// const ShopAll = lazy(() =>  import(/* webpackChunkName: "shopAll", webpackPrefetch: true */ '../shop-all/ShopAll'));
// const ProductsList = lazy(() =>  import(/* webpackChunkName: "prodList", webpackPrefetch: true */ '../shop-all/ProductsList'));
// const ProductPage = lazy(() =>  import(/* webpackChunkName: "prodPage", webpackPrefetch: true */ '../shop-all/ProductPage'));
// const Registration = lazy(() => import(/* webpackChunkName: "registration", webpackPrefetch: true */ '../user/Registration'));
// const EmailValidation = lazy(() => import(/* webpackChunkName: "emailVal", webpackPrefetch: true */ '../user/EmailValidation'));
// const Login = lazy(() => import(/* webpackChunkName: "login" */ '../login/Login'));
// const Homepage = lazy(() => import(/* webpackChunkName: "homepage" */ '../user/Homepage'),);

export const Routes = () => {
  const { logged } = useContext(AuthContext);

  return (
    <Switch>
      {/*@ts-ignore*/}
      <Route exact path="/:lang/" component={Main} isPrivate={false} />
      {/*<Route exact path="/:lang/features" component={Features}*/}
      {/*  isPrivate={false}*/}
      {/*/>*/}
      {/*@ts-ignore*/}
      <Route exact path="/:lang/faq" component={InformationPage} isPrivate={false} />
      {/*@ts-ignore*/}
      <Route exact path="/:lang/attribution" component={Attribution} isPrivate={false} />

      {/*<Route exact path="/:lang/support" component={Support}*/}
      {/*       isPrivate={false}*/}
      {/*/>*/}
      {/*@ts-ignore*/}
      <Route exact path="/:lang/contact-us" component={ContactUs} isPrivate={false} />
      {/*@ts-ignore*/}
      <Route exact path="/:lang/chat" component={Chat} isPrivate={false} />
      {/*<Route exact path="/:lang/blog" component={Blog}*/}
      {/*       isPrivate={false}*/}
      {/*/>*/}
      {/*<Route exact path="/:lang/news/article/:id" component={PressRelease}*/}
      {/*       isPrivate={false}*/}
      {/*/>*/}

      {/*@ts-ignore*/}
      <Route exact path="/:lang/terms-of-use" component={TermsAndConditions} isPrivate={false} />
      {/*@ts-ignore*/}
      <Route exact path="/:lang/privacy-policy" component={PrivacyPolicy} isPrivate={false} />
      {/*@ts-ignore*/}
      <Route exact path="/:lang/cookie-policy" component={CookiePolicy} isPrivate={false} />

      {/*@ts-ignore*/}
      <Route exact path="/:lang/user/registration" component={Registration} isPrivate={false} />
      <UnauthedRoute path="/:lang/user/login" component={Login} logged={logged} isPrivate={false} />
      {/*<Route exact path="/:lang/user/verification/:email/:verificationCode" component={EmailValidation}*/}
      {/*  isPrivate={false}*/}
      {/*/>*/}
      <AuthedRoute path="/:lang/chats" component={Chat} logged={logged} isPrivate />
      {/*@ts-ignore*/}
      <Route component={PageNotFound} isPrivate />
    </Switch>
  );
};

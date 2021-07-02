import { Redirect, Route, useLocation } from 'react-router-dom';
import i18n from 'i18next';
import React from 'react';

interface RedirectProps {
  component: any;
  logged: boolean;
  path: string;
  isPrivate: boolean;
}

interface RedirectWithStatusProps {
  to: string;
  status: number;
}

export const AuthedRoute = ({ component: Component, logged, path, isPrivate }: RedirectProps) => {
  return (
    // @ts-ignore
    <Route path={path} isPrivate={isPrivate} render={(props: any) => (
      logged ?
        <Component {...props} />
        : <RedirectWithStatus status={301} to={`/${i18n.language}/user/login`} />
    )}
    />
  );
};

export const UnauthedRoute = ({ component: Component, logged, path, isPrivate }: RedirectProps) => {
  return (
    // @ts-ignore
    <Route path={path} isPrivate={isPrivate} render={(props: any) => (
      logged ?
        <RedirectWithStatus status={301} to={`/${i18n.language}/user/homepage`} />
        : <Component {...props} />
    )}
    />
  );
};

function RedirectWithStatus({ to, status }: RedirectWithStatusProps) {
  const from = useLocation();
  
  return (
    <Route
      render={({ staticContext }) => {
        if (staticContext) {
          staticContext.statusCode = status;
        }
        return <Redirect from={from.pathname} to={to} />;
      }}
    />
  );
}

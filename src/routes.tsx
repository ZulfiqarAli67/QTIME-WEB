import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useLocation
} from "react-router-dom";
import { useAuth } from "./contexts/use-auth";
import LoginPage  from "./components/login";
import Dashboard from './components/Dashboard/dashboard';
import SimpleBackdrop from "./components/common/Backdrop";
import { useLoader } from "./contexts/use-loader";

export function Routes() {

  const {isLoading} = useLoader();
  return (
    <Router>      
        <Switch>SignalCellularNull
          <PrivateRoute path="/timesheet">
              <Dashboard/>
              {isLoading ? <SimpleBackdrop/> : null}
            </PrivateRoute>
            <PublicRoute exact={true} path="/">
                <LoginPage />
            </PublicRoute>
          <Route path="*">
            <NoMatch />
          </Route>
        </Switch>
    </Router>
  );
}

function PrivateRoute(props : any) {
  const { children, ...rest } = props;
  let auth = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.token ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

function PublicRoute(props : any) {
  const { children, ...rest } = props;
  let auth = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.token ? (
          <Redirect
            to={{
              pathname: "/timesheet",
            }}
          />
        ) : (
          children
        ) 
      }
    />
  );
}

function NoMatch() {
  let location = useLocation();

  return (
    <div>
      <h3>
        No match for <code>{location.pathname}</code>
      </h3>
    </div>
  );
}
import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router';
import Keycloak from 'keycloak-js';
import Layout from './components/Layout';
import Home from './components/Home';
import './index.css';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();


const MyApp = () =>{
  return (
    <MuiThemeProvider muiTheme={getMuiTheme()} >
      <Layout />
    </MuiThemeProvider>
  );
}
// ReactDOM.render(
    // <MyApp />,
    // document.getElementById('root')
// );

const routes = {
  path: '/',
  component: Layout,
  indexRoute: { component: Home },
  childRoutes: [
    { path: 'home', component:  Home },
    { path: 'apps', component:  Home },
    { path: 'home', component:  Home },
    { path: 'home', component:  Home },
    { path: 'home', component:  Home },
  ]
}


let KeycloakConfig = {
  "realm": "waziup",
  "auth-server-url": "http://aam.waziup.io/auth/",
  "ssl-required": "none",
  "resource": "mobile-app-cli",
  "clientId": "mobile-app-cli",
  "public-client": true,
  "credentials": {
    "secret": "28226338-eb58-45f5-bdae-921091a8b35c"
  },
  "policy-enforcer": {}
}

//{
    // "realm": "waziup",
    // "url": "http://aam.waziup.io/auth",
    // "resource": "mobile-app-cli",
    // "public-client": true,
    // "clientId":"web-waziup-cli",
    // "credentials": {
          // "secret": "28226338-eb58-45f5-bdae-921091a8b35c"
        // },
    // "policy-enforcer": {}
// };


let kc = Keycloak(KeycloakConfig);
console.log(kc);
kc.init({onLoad: 'check-sso'}).success(authenticated => {
  if (authenticated) {
//  store.getState().keycloak = kc;
    setInterval(() => {
      kc.updateToken(10).error(() => kc.logout());
    }, 10000);
   ReactDOM.render(<Router history={hashHistory} routes={routes} />, document.getElementById('root'))
  } else {
   // show possibly other page here...
    kc.login();
  }
});

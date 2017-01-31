import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore} from 'react-router-redux'
import Keycloak from 'keycloak-js';
import configureStore from './store';
import Layout from './components/Layout';
import Home from './components/Home';
import Sensors from './components/Sensors';
import './index.css';
import {fetchSensors} from './actions/actions';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store)

function loadSensors() {
    store.dispatch(fetchSensors());
};

const MyApp = () =>{
  return (
    <MuiThemeProvider muiTheme={getMuiTheme()} >
      <Layout />
    </MuiThemeProvider>
  );
}

const routes = {
  path: '/',
  component: Layout,
  indexRoute: { component: Home },
  childRoutes: [
    { path: 'home', component:  Home },
    { path: 'apps', component:  Home },
    { path: 'sensors', component:  Sensors , onEnter:loadSensors},
    { path: 'home', component:  Home },
    { path: 'home', component:  Home },
  ]
}


// let KeycloakConfig = {
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


// let kc = Keycloak(KeycloakConfig);
  // console.log(kc);
// kc.init({onLoad: 'check-sso'}).success(authenticated => {
  // if (authenticated) {
    //store.getState().keycloak = kc;
    // setInterval(() => {
      // kc.updateToken(10).error(() => kc.logout());
    // }, 10000);
    ReactDOM.render(
      <Provider store={store}>
        <Router history={history} routes={routes} />
      </Provider>
      , document.getElementById('root'))
  // } else {
    // show possibly other page here...
    // kc.login();
  // }
// });

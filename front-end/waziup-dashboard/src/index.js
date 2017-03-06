import React from 'react';
import ReactDOM from 'react-dom';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore} from 'react-router-redux'
import Keycloak from 'keycloak-js';
import configureStore from './store';
import Layout from './components/Layout';
import Home from './components/Home';
import MVPWeather from './components/Mvpweather';
import MVPAgri from './components/Mvpagri.js';
import MVPUrbanWaste from './components/Mvpurbanwaste';
import MVPFishFarming from './components/Mvpfishfarming';
import Sensors from './components/Sensors';
import Profile from './components/profile/ProfileContainer.js';
import UserList from './components/user/UserList/UserListContainer';
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
    <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)} >
      <Layout />
    </MuiThemeProvider>
  );
}

const routes = {
  path: '/',
  component: Layout,
  indexRoute: { component: Home },
  childRoutes: [
    { path: 'home', component:  Home, onEnter:loadSensors},
    { path: 'apps', component:  Home },
    { path: 'profile', component:  Profile },
    { path: 'apps/weather', component:  MVPWeather },
    { path: 'apps/agri', component:  MVPAgri },
    { path: 'apps/urbanwaste', component:  MVPUrbanWaste },
    { path: 'apps/fishfarming', component:  MVPFishFarming },
    { path: 'sensors', component:  Sensors , onEnter:loadSensors},
    { path: 'users', component:  UserList },
    { path: 'home', component:  Home },
  ]
}


// let KeycloakConfig = {
//   "realm": "waziup",
//   "realm-public-key": "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAiIzXeJ5OxrvawVoNXz+4zCBX66pki5PYltqggPYkt45Q60zBtK5ZS5vVecBBJ10Ae4NxKCRE9iNr0COmabK+a13e1FYYrsj1tN0SfQC2cKuI1WWc7LO7gEycS4+sauOjzdMYTkmLwj2GhIxo1vuhcBqyLV2NmSBEAqfGntjkI6kTRU3QlAlIp0NsNpc6ZYn9TPE+zhcr3GBruCDLbg0yYDtpK5GxK2gh8C4uaq9e55pPIVKo3FjX+5iYUJ6zluu1oafcec3MYRtYnbyOIQpkvpeUheqif5SKATeVgn4jyhEcH03zY+tiFe0p6spivT4gzxp9kkrKEnX0CsvFprQH6QIDAQAB",
//   "url": "http://localhost:8180/auth",
//   "ssl-required": "none",
//   "resource": "dashboard",
//   "clientId": "dashboard",
//   "public-client": true
// }


// let kc = Keycloak(KeycloakConfig);
//   console.log(kc);
// kc.init({ onLoad: 'login-required' }).success(authenticated => {
//   if (authenticated) {
//    store.getState().keycloak = kc;
//     setInterval(() => {
//       kc.updateToken(10).error(() => kc.logout());
//     }, 10000);
    ReactDOM.render(
      <Provider store={store}>
        <Router history={history} routes={routes} />
      </Provider>
      , document.getElementById('root'))
//   } else {
//     // show possibly other page here...
//     kc.login();
//   }
// });

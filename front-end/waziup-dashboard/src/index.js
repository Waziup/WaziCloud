import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router';
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


ReactDOM.render(<Router history={hashHistory} routes={routes} />, document.getElementById('root'))


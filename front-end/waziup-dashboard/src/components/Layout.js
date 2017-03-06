require('normalize.css');
import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import { Link } from 'react-router';
import IconButton from 'material-ui/IconButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FontIcon from 'material-ui/FontIcon';
import AccountCircle from 'material-ui/svg-icons/action/account-circle';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import Logo from "../images/logo-waziup-white.svg";
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';
import { Container, Row, Col, Visible, Hidden, ScreenClassRender } from 'react-grid-system'

const styles = {
   medium: {
     marginRight: 30,
     color:'#cecece'
  },
  logo:{
    width:170,
    paddingTop:10,
  },
  menuLink:{
    border:'none',
  }
}
class Layout extends Component {
    constructor(props) {
      super(props);
      this.state = {open: false};
      this.toggleNavigation = this.toggleNavigation.bind(this);
    }
    profileButton = (
        <IconButton
          className="profile-menu"
          style={styles.medium}
        >
          <AccountCircle />
        </IconButton>
    );
    headerMenu = (
      <IconMenu
      iconButtonElement={this.profileButton}
      anchorOrigin={{horizontal: 'left', vertical: 'top'}}
      targetOrigin={{horizontal: 'left', vertical: 'top'}}
      >
        <MenuItem primaryText="Profile" />
        <MenuItem primaryText="Settings" />
        <MenuItem primaryText="Help" />
        <MenuItem primaryText="Sign out" />
      </IconMenu>
    );
    getChildContext() {
      return {
        muiTheme: this.state.muiTheme
      };
    }

    componentWillMount() {
      this.setState({
        muiTheme:getMuiTheme()
      });
    }

    toggleNavigation() {
      this.setState({open: !this.state.open});
    }

    render() {
      var navTitleStyle = {
        marginLeft: '-8px'
      };
      return (
            <div id="main">
                <AppBar
                  title={<img style={styles.logo} src={Logo}/>}
                  onLeftIconButtonTouchTap={this.toggleNavigation}
                  iconElementRight={this.headerMenu}
                  className="navbar"
                  onLeftIconButtonTouchTap={this.toggleNavigation}
                />
                <Visible xs sm>
                   <Drawer
                      open={this.state.open}
                      docked={false}
                      onRequestChange={(open) => this.setState({open})}
                    >
                    <MenuItem
                              containerElement={<Link to="/home" />}
                              primaryText="Dashboard"
                              innerDivStyle={styles.menuLink}
                            />
                            <MenuItem
                              containerElement={<Link to="/profile" />}
                              primaryText="Profile"
                              innerDivStyle={styles.menuLink}
                            />
                          <MenuItem
                              containerElement={<Link to="/users" />}
                              primaryText="Users"
                              innerDivStyle={styles.menuLink}
                            />

                            <MenuItem
                              primaryText="Apps"
                              innerDivStyle={styles.menuLink}
                              rightIcon={<ArrowDropRight />}
                              menuItems={[
                                <MenuItem primaryText="MVP Weather" containerElement={<Link to="/apps/weather" />}/>,
                                <MenuItem primaryText="MVP Fish Farming" containerElement={<Link to="/apps/fishfarming" />} />,
                                <MenuItem primaryText="MVP Agriculture" containerElement={<Link to="/apps/agri" />} />,
                                <MenuItem primaryText="MVP Urban Waste" containerElement={<Link to="/apps/urbanwaste" />} />,
                                ]} />
                            <MenuItem
                              containerElement={<Link to="/sensors" />}
                              innerDivStyle={styles.menuLink}
                              primaryText="Sensors"
                            />
                            <MenuItem
                              containerElement={<Link to="/logout" />}
                              innerDivStyle={styles.menuLink}
                              primaryText="Logout"
                            />
                    </Drawer>
                </Visible>
                <Hidden xs sm>
                  <Col md={2} className="page-sidebar sidebar">
                    <div className="page-sidebar-inner">
                      <div className="menu">
                        <MenuItem
                          containerElement={<Link to="/home" />}
                          primaryText="Dashboard"
                          innerDivStyle={styles.menuLink}
                        />
                        <MenuItem
                          containerElement={<Link to="/profile" />}
                          primaryText="Profile"
                          innerDivStyle={styles.menuLink}
                        />
                      <MenuItem
                          containerElement={<Link to="/users" />}
                          primaryText="Users"
                          innerDivStyle={styles.menuLink}
                        />

                        <MenuItem
                          primaryText="Apps"
                          innerDivStyle={styles.menuLink}
                          rightIcon={<ArrowDropRight />}
                          menuItems={[
                            <MenuItem primaryText="MVP Weather" containerElement={<Link to="/apps/weather" />}/>,
                            <MenuItem primaryText="MVP Fish Farming" containerElement={<Link to="/apps/fishfarming" />} />,
                            <MenuItem primaryText="MVP Agriculture" containerElement={<Link to="/apps/agri" />} />,
                            <MenuItem primaryText="MVP Urban Waste" containerElement={<Link to="/apps/urbanwaste" />} />,
                            ]} />
                        <MenuItem
                          containerElement={<Link to="/sensors" />}
                          innerDivStyle={styles.menuLink}
                          primaryText="Sensors"
                        />
                        <MenuItem
                          containerElement={<Link to="/logout" />}
                          innerDivStyle={styles.menuLink}
                          primaryText="Logout"
                        />
                      </div>
                    </div>
                  </Col>
                </Hidden>
                <Col md={10} className="page-inner">
                  <div id="main-wrapper">
                      {this.props.children}
                  </div>
                  <div className="page-footer">
                    <Container>
                      <Col md={6}>
                        <img className="waziup-logo" src={Logo}/ >
                      </Col>
                      <Col md={6} className="footer-left">
                        <p className="text">Code licensed under <a type="application/rss+xml" href="https://www.apache.org/licenses/LICENSE-2.0" target="_blank">Apache 2</a> © 2016 <a href="">Waziup.io</a></p>
                      </Col>
                    </Container>
                  </div>
                 </Col>
            </div>
            
          );
    }
}

Layout.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired
};

export default Layout;


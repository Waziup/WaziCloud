require('normalize.css');
import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import { Link } from 'react-router';
import IconButton from 'material-ui/IconButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Avatar from 'material-ui/Avatar';
import { connect } from 'react-redux';
import FontIcon from 'material-ui/FontIcon';
import AccountCircle from 'material-ui/svg-icons/action/account-circle';
import Logo from "../images/logo-waziup-white.svg";
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';
import { Container,  Col, Visible, Hidden } from 'react-grid-system'

const styles = {
   medium: {
     marginRight: 30,
     color:'#cecece'
  },
  logo:{
    width:171,
    paddingTop:10,
  },
  menuLink:{
    border:'none',
  }
}
class Layout extends Component {
    constructor(props) {
      super(props);
      this.state = {
        open: false,
        user:{}
      };
      this.toggleNavigation = this.toggleNavigation.bind(this);
    }
    profileButton = (user) => (
          <IconButton
            className="profile-menu"
            style={styles.medium}
          >
            <span className="user-name">{user.name}</span>
            <AccountCircle />
          </IconButton>
        
    );
    headerMenu = (user) =>(
      <IconMenu
      iconButtonElement={this.profileButton(user)}
      anchorOrigin={{horizontal: 'left', vertical: 'top'}}
      targetOrigin={{horizontal: 'left', vertical: 'top'}}
      >
        <MenuItem primaryText="Profile" />
        <MenuItem primaryText="Settings" />
        <MenuItem primaryText="Help" />
        <MenuItem primaryText="Sign out" onClick={()=>{this.props.keycloak.logout()}}/>
      </IconMenu>
    );
    getChildContext() {
      return {
        muiTheme: this.state.muiTheme
      };
    }
    componentWillReceiveProps(nextProps){
      
    }
    componentWillMount() {
      if (this.props.user) {
        this.setState({user:this.props.user});
      }
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
                  iconElementRight={this.headerMenu(this.state.user)}
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
                        <div className="sidebar-header">
                          <div className="sidebar-profile">
                              <a id="profile-menu-link">
                                  <div className="sidebar-profile-image">
                                      <Avatar icon={<AccountCircle />} className="img-circle img-responsive"/>
                                      
                                  </div>
                                  <div className="sidebar-profile-details">
                                      <span>{this.state.user.name}<br/><small></small></span>
                                  </div>
                              </a>
                          </div>
                      </div>
  
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

function mapStateToProps(state) {
  return { 
    user: state.keycloak.idTokenParsed,
    keycloak: state.keycloak
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);

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
import Logo from "../images/logo-waziup-white.svg";
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';


const styles = {
   medium: {
     marginRight: 10,
  },
  mediumIcon: {
    width: 48,
    height: 48,
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
      this.state = {open: true};
      this.toggleNavigation = this.toggleNavigation.bind(this);
    }
    profileButton = (
        <IconButton
          iconStyle={styles.mediumIcon}
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
    )
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
      console.log(this.props);
      return (
            <div id="main">
                <AppBar
                  title={<img style={styles.logo} src={Logo}/>}
                  onLeftIconButtonTouchTap={this.toggleNavigation}
                  iconElementRight={this.headerMenu}
                />
                <Drawer
                  open={this.state.open}
                  docked={true}
                  onRequestChange={(open) => this.setState({open})}
                >
                <AppBar
                  title={<img style={styles.logo} src={Logo}/>}
                  showMenuIconButton={false}
                  titleStyle={navTitleStyle}
                />
                    <MenuItem
                      containerElement={<Link to="/home" />}
                      primaryText="Dashboard"
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
                <div className="page-content">
                  <div className="inner-page">
                    {this.props.children}
                  </div>
                </div>
                <div className="footer-bottom">
                  <div className="container">
                    <div className="part">
                      <img className="waziup-logo" src={Logo}/ >
                    </div>
                    <div className="part">
                      <p className="text">Code licensed under <a type="application/rss+xml" href="https://www.apache.org/licenses/LICENSE-2.0" target="_blank">Apache 2</a> © 2016 <a href="">Waziup.io</a></p>
                    </div>
                  </div>
                </div>
            </div>
          );
    }
}

Layout.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired
};

export default Layout;


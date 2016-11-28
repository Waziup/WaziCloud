/**
 * Menu Contents
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
'use strict';

// /* Setup ==================================================================== */
import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView
} from 'react-native'

// App Globals
import AppStyles from '../styles'
import AppConfig from '../config'

//Image
const logo = require('../images/splash_logo_icon.png')

// // Screens
import StyleGuide from '../screens/style.guide'
import Home from '../screens/home'               // **
import FormExample from '../screens/forms'             // **
import ListViewExample from '../screens/listview'      // **
import Tabs from '../screens/tabs'                     // **


/* Component ==================================================================== */
class Menu extends Component {
  constructor() {
    super();

    // Initial state
    this.state = {
      menu: [
        {title: 'Home', component: Home, props: {passProps: {placeholder: 'Hey there, you passProps bro?'}}},
        {title: 'Refresh', component: Home},
        {title: 'Sensors', component: Home},
        {title: 'Notifications', component: Home},
        {title: 'Settings', component: Home},
        {title: 'Support', component: Home},
        {title: 'Terms and Conditions', component: Home},
        {title: 'About Waziup', component: Home},
        {title: 'Feedback', component: Home},
      ],
    };
  }

  static propTypes = {
    navigate: React.PropTypes.func.isRequired,
  }

  /**
    * RENDER
    */
  render = () => {
    let { navigate } = this.props;
    let { menu } = this.state;

    // Build the actual Menu Items
    let menuItems = [];
    menu.map((item)=>{
      let { title, component, props } = item;

      menuItems.push(
        <TouchableOpacity key={'menu-item-'+title}
          onPress={()=>navigate(title, component, props)}>
          <View style={[styles.menuItem]}>
            <Text style={[AppStyles.baseText, styles.menuItem_text]}>{title}</Text>
          </View>
        </TouchableOpacity>
      );
    });

    return (
      <View style={[styles.menuContainer]}>
        <View style={[styles.menuLogoContainer]}>
          <Image  source={logo} resizeMode="contain" style={{width:200}}/>
        </View>
        <ScrollView style={[styles.menu]}>{menuItems}</ScrollView>
      </View>
    );
  }
}


/* Styles ==================================================================== */
const styles = StyleSheet.create({
  menuContainer: {
    left: 0,
    right: 0,
    backgroundColor: "#111111",
  },
  menu: {
    left: 0,
    right: 0,
    height: AppConfig.windowHeight,
    backgroundColor: "#111111",
    padding: 0,
    paddingTop: AppConfig.statusBarHeight,
  },
  menuItem: {
    borderBottomWidth: 1,
    paddingLeft:10,
    borderBottomColor: AppConfig.white,
    paddingBottom: 10,
  },
  menuLogoContainer:{
    flex:1,
    justifyContent: 'center',
    height:90,
    alignItems: 'center',
    backgroundColor:AppConfig.white,
    borderBottomWidth: 1,
  },

  menuItem_text: {
    fontSize: 18,
    lineHeight: parseInt(18 + (18 * 0.5)),
    fontWeight: '500',
    marginTop: 10,
    color: "#EEE"
  },
});

// /* Export Component ==================================================================== */
export default Menu

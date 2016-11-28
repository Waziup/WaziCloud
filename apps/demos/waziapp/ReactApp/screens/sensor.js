/**
 * First Load
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
'use strict';

/* Setup ==================================================================== */
import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
} from 'react-native'

// App Globals
import AppStyles from '../styles'
import AppConfig from '../config'

// Components
import Button from '../components/button'


/* Component ==================================================================== */
class Sensor extends Component {


  static propTypes = {
    navigator: React.PropTypes.object.isRequired,
    close: React.PropTypes.func.isRequired,
  }


  /**
    * RENDER
    */
  render = () => {
    return (
      <View style={[AppStyles.container, styles.containerCover]}>
      	<View style={[AppStyles.paddingHorizontal]}>


      	</View>
      </View>
    );
  }
}

/* Styles ==================================================================== */
const styles = StyleSheet.create({
	containerCover: {
		marginTop: -AppConfig.navbarHeight,
		backgroundColor: "#FFF",
		justifyContent: 'center',
	},
});

/* Export Component ==================================================================== */
export default Sensor

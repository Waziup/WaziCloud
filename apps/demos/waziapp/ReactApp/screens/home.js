/**
 * Coming Soon
 *
 */
'use strict';

/* Setup ==================================================================== */
import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Modal,
  ListView,
  TouchableHighlight,
} from 'react-native'
import { connect } from 'react-redux'

import SplashScreen from 'react-native-splash-screen'
import TimerMixin from 'react-timer-mixin'
import reactMixin from 'react-mixin'
// App Globals
import AppStyles from '../styles'
import AppConfig from '../config'
// Biller Actions
import { fetchSensor,fetchSensorSuccess,fetchSensorFailure } from '../actions/sensors'

// Components
import Button from '../components/button'

// Screens
import sensor from './sensor'

/* Component ==================================================================== */
class ComingSoon extends Component {
  static componentName = 'ComingSoon';
  constructor(props) {
    super(props);
    let dataSource = new ListView.DataSource({
      rowHasChanged: this._rowHasChanged,
    });
    this.state = {
      splashScreenVisible: this.props.showSplashScreen || false,
      dataSource: dataSource,
    }
  }

  static propTypes = {
    navigator: React.PropTypes.object.isRequired,
    showSplashScreen: React.PropTypes.bool,
    placeholder: React.PropTypes.string,
  }

  componentWillMount(){
    this.props.fetchSensor();
  }
  componentDidMount() {
    SplashScreen.hide();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.sensorsList.sensors !== this.props.sensorsList.sensors) {
      let array =[];
      nextProps.sensorsList.sensors.data.map((obj)=>{
        for (var key in obj) {
          if ((key!=='id')&&(key!=='type')) {
            let row = {
              id:obj.id,
              type:obj.type,
              sensing:key,
            }
            row[key] = obj[key];
            array.push(row);
          }
        }

      })
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(array)
      })
    }
  }
  _rowHasChanged(oldRow, newRow) {
    return oldRow !== newRow;
  }

  _renderRow(rowData) {
    return (
      <TouchableOpacity style={[styles.listRow]} onPress={() => {}} activeOpacity={0.7}>
        <View style={styles.listRowInner}>
          <View >
            <Text style={[AppStyles.baseText, styles.listRow_text]}>{rowData.id+' - Type :'+ rowData.type}</Text>
          </View>
          <View >
            <Text style={[AppStyles.baseText, styles.listRow_text]}>{rowData.sensing.toUpperCase()}</Text>
          </View>
          <View >
            <Text style={[AppStyles.baseText, styles.listRow_text]}>{rowData[rowData.sensing].value}</Text>
          </View>
        </View>
      </TouchableOpacity>

    );
  }

  /**
    * Navigates to same scene (for Demo purposes)
    */
  _navigate = (navbarTitle) => {
    this.props.navigator.push({
      title: navbarTitle,
      component: ComingSoon,
      index: 2
    });
  }


  /**
    * RENDER
    */
  render = () => {
    let text = this.props.placeholder || 'Coming soon...'

    // Done
    return (
      <View style={[AppStyles.container]}>
      <ListView
        ref="listView"
        automaticallyAdjustContentInsets={false}
        dataSource={this.state.dataSource}
        renderRow={this._renderRow.bind(this)}
        contentContainerStyle={AppStyles.paddingBottom}
      />
      </View>
    );
  }
}
var styles = StyleSheet.create({
  listRow: {
    width:AppConfig.windowWidth,
    left: 0,
    right: 0,
    backgroundColor: "#FFF",
  },
  listRowInner: {
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: AppConfig.borderColor,
  },
  listRow_text: {
    color: AppConfig.textColor,
    textAlign: 'center',
    fontWeight: '500',
    backgroundColor: 'transparent',
  },
});
reactMixin(ComingSoon.prototype, TimerMixin);

const mapStateToProps = (state) => {
  return {
    sensorsList: state.sensors.sensorsList,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSensor: () => { dispatch(fetchSensor())},
  }
}

const Home = connect(mapStateToProps, mapDispatchToProps)(ComingSoon);

/* Export Component ==================================================================== */
export default Home

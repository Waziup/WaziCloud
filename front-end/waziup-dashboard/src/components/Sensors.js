import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FullWidthSection from './FullWidthSection'
import { connect } from 'react-redux';
import SensorData from './SensorData.js'
import SensorForm from './sensors/sensorForm/sensorFormContainer.js'
import {createSensor} from '../actions/actions';
import { Container} from 'react-grid-system'
import Griddle from 'griddle-react';

class Sensors extends Component {
  constructor(props){
    super(props);
    this.state = {
      data : props.data,
      modalOpen:false
    };
  }
  defaultProps = {
    data: []
  };
  componentWillReceiveProps(nextProps){
    if (nextProps.data) {
      this.setState({data:nextProps.data})
    }
  }

  handleOpen = () => {
    this.setState({modalOpen: true});
  };

  handleClose = () => {
    this.setState({modalOpen: false});
  };
  tableMeta = [
    {
      "columnName": "id",
      "order": 1,
      "displayName": "ID"
    },
    {
      "columnName": "type",
      "order": 2,
      "visible": true,
      "displayName": "Sensor type"
    },
    {
      "columnName": "owner",
      "order": 3,
      "displayName": "Owner"
    },
    {
      "columnName": "last_value",
      "order": 4,
      "visible": true,
      "displayName": "Last Value",
      "customComponent": SensorData
    },
  ];
  handleSubmit = (values) => {
    // Do something with the form values
    let sensor  = {
      id: values.sensorId,
      type: values.sensorType,
  
    }
    sensor[values.sensorName] = {
      value: 0,
      type: values.sensorValueType
    }
    
    this.props.createSensor(sensor)
  
  }
  render() {
    let {data} = this.props;
  
    return (
      <div>
          <h1 className="page-title">Sensors</h1>
          <Container>
            <RaisedButton label="Add Sensors" primary={true} onTouchTap={this.handleOpen} />
              <FullWidthSection useContent={true}>
                <Griddle resultsPerPage={10} results={this.state.data} columnMetadata={this.tableMeta} columns={["id", "type","owner","last_value"]} showFilter={true} />
              </FullWidthSection>
            <SensorForm  modalOpen={this.state.modalOpen} handleClose={this.handleClose} onSubmit={this.handleSubmit} />     
          </Container>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { data: state.example.data };
}

function mapDispatchToProps(dispatch) {
  return {
    createSensor:(sensor)=>{dispatch(createSensor(sensor))}
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Sensors);


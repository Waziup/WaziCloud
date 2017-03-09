import React, {Component} from 'react';
import { reduxForm, Field } from 'redux-form'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
// import RaisedButton from 'material-ui/RaisedButton';

import MenuItem from 'material-ui/MenuItem'
import { RadioButton } from 'material-ui/RadioButton'
import {
  SelectField,
  TextField,
} from 'redux-form-material-ui'
import {  Row, Col, Visible} from 'react-grid-system'

// validation functions
const required = value => value == null ? 'Required' : undefined

class sensorForm extends Component {
  componentDidMount() {

  }
  
  render() {
    const {pristine, reset, submitting,modalShowing, modalOpen,handleClose, onSubmit} = this.props;
      const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        onTouchTap={()=>{
          this.props.submit();          
          handleClose();
        }}
      />,
    ];
    return (
        <Dialog
              title="Add new Sensor"
              actions={actions}
              modal={true}
              open={modalOpen}
              autoScrollBodyContent={true}
              ref={'sensorFormDialog'}
            >
          <form onSubmit={onSubmit}>
            <Row>
              <Col md={4}>
                <Field name="sensorId"
                  component={TextField}
                  hintText="Sensor id"
                  floatingLabelText="Sensor Id"
                  validate={required}
                  ref="sensorId" withRef/>
              </Col>
              <Col md={4} offset={{md:2}}>
                <Field
                  name="sensorType"
                  component={SelectField}
                  hintText="Sensor Type"
                  floatingLabelText="Sensor Type"
                  validate={required}>
                  <MenuItem value="SensingDevice" primaryText="Sensing Device"/>
                  <MenuItem value="Device" primaryText="Device"/>
                </Field>
              </Col>
              </Row>
              <Row>
                <Col md={4}>
                  <Field name="sensorName"
                    component={TextField}
                    hintText="'Temperature'"
                    floatingLabelText="Sensor value"
                    validate={required}
                    ref="sensorName" withRef/>
                </Col>
                <Col md={4} offset={{md:2}}>
                  <Field name="sensorUnit"
                    component={TextField}
                    hintText="Unit"
                    floatingLabelText="Sensor Unit"
                    validate={required}
                    ref="sensorUnit" withRef/>
                </Col>
            </Row>
            <Row>
              <Col>
                <Field
                    name="sensorValueType"
                    component={SelectField}
                    hintText="Sensor Value type"
                    floatingLabelText="Sensor Value Type"
                    validate={required}>
                    <MenuItem value="number" primaryText="Number"/>
                    <MenuItem value="percent" primaryText="Percent"/>
                  </Field>
              </Col>
            </Row>
          </form>
        </Dialog>
      );
  }
}
// Decorate with redux-form
sensorForm = reduxForm({
  form: 'sensorForm',
})(sensorForm)

export default sensorForm;


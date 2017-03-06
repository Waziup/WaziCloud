import React, {Component} from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import { reduxForm, Field } from 'redux-form'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import MenuItem from 'material-ui/MenuItem'
import { RadioButton } from 'material-ui/RadioButton'
import {
  Checkbox,
  RadioButtonGroup,
  SelectField,
  TextField,
  Toggle,
  DatePicker
} from 'redux-form-material-ui'
import { Container, Row, Col, Visible, Hidden, ScreenClassRender } from 'react-grid-system'

// validation functions
const required = value => value == null ? 'Required' : undefined

class userForm extends Component {
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
              title="Create User"
              actions={actions}
              modal={true}
              open={modalOpen}
              autoScrollBodyContent={true}
              ref={'userFormDialog'}
            >
          <form onSubmit={onSubmit}>
            <Row>
              <Col md={4}>
                <Field name="userName"
                  component={TextField}
                  hintText="John"
                  floatingLabelText="Username"
                  validate={required}
                  ref="userName" withRef/>
              </Col>
              <Col md={4} offset={{md:2}}>
                <Field
                  name="lastName"
                  component={TextField}
                  hintText="Last Name"
                  floatingLabelText="Last Name"
                  validate={required} />
              </Col>
              </Row>
              <Row>
                <Col md={4}>
                  <Field name="userName"
                    component={TextField}
                    hintText="Username"
                    floatingLabelText="Username"
                    validate={required}
                    ref="userName" withRef/>
                </Col>
                <Col md={4} offset={{md:2}}>
                  <Field
                    name="gender"
                    component={SelectField}
                    hintText="Gender"
                    floatingLabelText="Gender"
                    validate={required}>
                    <MenuItem value="female" primaryText="Female"/>
                    <MenuItem value="male" primaryText="Male"/>
                  </Field> 
                </Col>
            </Row>
  
          </form>
        </Dialog>
      );
  }
}
// Decorate with redux-form
userForm = reduxForm({
  form: 'userForm',
})(userForm)

export default userForm;


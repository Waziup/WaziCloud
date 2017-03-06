'use strict';
import { connect } from 'react-redux';
import userForm from './userForm';

// import {} from '../../redux/action/ActionCounter.js';


function mapStateToProps(state) {
    return {}
}

function mapDispatchToProps(dispatch) {
    return {}
}
const userFormContainer = connect( mapStateToProps,mapDispatchToProps)(userForm);
export default userFormContainer;

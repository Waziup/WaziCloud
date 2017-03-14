import { connect } from 'react-redux';
import sensorForm from './sensorForm.js';

// import {} from '../../redux/action/ActionCounter.js';


function mapStateToProps(state) {
    return {}
}

function mapDispatchToProps(dispatch) {
    return {}
}
const sensorFormContainer = connect( mapStateToProps,mapDispatchToProps)(sensorForm);
export default sensorFormContainer;

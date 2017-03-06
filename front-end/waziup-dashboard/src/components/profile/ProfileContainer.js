'use strict';
import { connect } from 'react-redux';
import Profile from './Profile.js';

// import {} from '../../redux/action/ActionCounter.js';


function mapStateToProps(state) {
    return {}
}

function mapDispatchToProps(dispatch) {
    return {}
}
const ProfileContainer = connect( mapStateToProps,mapDispatchToProps)(Profile);
export default ProfileContainer;

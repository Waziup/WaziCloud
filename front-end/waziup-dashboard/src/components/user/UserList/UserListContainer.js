import { connect } from 'react-redux'
import UserList from './UserList'
// import {fetchUser} from 'actionCreatorPath'

const mapStateToProps = (state) => {
    return {
        users: state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        // fetchUser: () => {
        //     dispatch(fetchUser)
        // }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(UserList)
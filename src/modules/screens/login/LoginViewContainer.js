import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {NavigationActions} from 'react-navigation';
import LoginView from './LoginView';

export default connect(
  state => ({
    isLogin: state.getIn(['user', 'isUserLogIn']),
  }),
  dispatch => {
    return {
      navigate: bindActionCreators(NavigationActions.navigate, dispatch),
    };
  },
)(LoginView);

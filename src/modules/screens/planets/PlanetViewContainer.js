import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {NavigationActions} from 'react-navigation';
import PlanetView from './PlanetView';

export default connect(
  state => ({
    planetData: state.getIn(['user', 'planetData']),
    isLogin: state.getIn(['user', 'isUserLogIn']),
  }),
  dispatch => {
    return {
      navigate: bindActionCreators(NavigationActions.navigate, dispatch),
    };
  },
)(PlanetView);

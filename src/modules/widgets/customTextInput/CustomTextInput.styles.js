import {StyleSheet} from 'react-native';
import {colors, Fonts} from '../../theme/css/Common';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    // padding: '90%',
    justifyContent: 'center',
    alignContent: 'center',
  },
  heading: {
    fontSize: 12,
    padding: 20,
    paddingBottom: 0,
    color: colors._363445,
  },
  viewInput: {
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: 20,
    marginRight:20,
    // backgroundColor: 'yellow',
  },
  textIcon: {
    marginTop:6,
    marginLeft:5,
    marginRight: 15,
    width: 20,
    height: 20,
    resizeMode: 'center',
  },
  textInput: {
    height: 40,
    marginTop: 10,
    marginBottom: 0,
    fontSize: 15,
    // backgroundColor: 'red',
  },
  seprator: {
    bottom: 0,
    marginLeft: 20,
    marginRight: 20,
    height: 1.5,
    backgroundColor: colors._363445,
    alignContent: 'center',
  },
  errorView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
  },
  errorImage: {
    width: 24,
    height: 24,
  },
  errorText: {
    fontSize: 12,
    color: colors._E60505,
    marginLeft: 10,
  },
});

/* export the styling */
export default styles;

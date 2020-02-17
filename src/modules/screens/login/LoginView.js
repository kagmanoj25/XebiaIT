import React, {Component} from 'react';
import {View, StyleSheet, Keyboard} from 'react-native';
import {connect} from 'react-redux';
import {AllTexts, Images} from '../../theme/css/Common';
import CustomTextInput from '../../widgets/customTextInput';
import RoundedButton from '../../widgets/roundedButton';
import * as APICalls from '../../../services/APICalls';
import * as CommonFunctions from '../../theme/js/CommonFunctions';

class LoginView extends Component {
 
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password:'',
      isError: false,
      passTextInput: null
    };
    if (CommonFunctions.isJson(this.props.isLogin)) {
      if (this.props.isLogin === true) {
        this.props.navigation.navigate('auth');
      }
    }
  }
  render() {
    return (
      <View style={styles.container}>
        {/* Text Input View with error */}
        <CustomTextInput
          isIconEnable={true}
          textPlaceholder={AllTexts.userNamePlaceholder}
          iconName={Images.userIcon}
          titleText={AllTexts.userName}
          textValue={this.state.username}
          textChangeOnPress={username => {
            this.setState({username: username});
          }}
          textSubmitRef={event => {
            this.passTextInput.focus();
          }}
        />
        <CustomTextInput
          textRef={input => {
            this.passTextInput = input;
          }}
          isIconEnable={true}
          textPlaceholder={AllTexts.passwordPlaceholder}
          isSecureText={true}
          iconName={Images.password}
          titleText={AllTexts.password}
          textValue={this.state.password}
          textReturnType={'done'}
          textChangeOnPress={password => {
            this.setState({password: password});
          }}
          textSubmitRef={()=>{Keyboard.dismiss();}}
        />
        {/* login and cancel button */}
        <View style={styles.viewButtons}>
          <RoundedButton
            nextButtonAction={() => {
              Keyboard.dismiss();
              this.props.dispatch(
                APICalls.onUserLoginAsync(
                  this.props,
                  this.state.username,
                  this.state.password,
                ),
              );
            }}
            titleText={AllTexts.Login}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewButtons: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
  },
  viewLoginSocial: {
    padding: 15,
    height: 50,
    justifyContent: 'center',
  },
  signUpTextView: {
    padding: 20,
  },
});

export default connect()(LoginView);

import React, {Component} from 'react';
import {TextInput, View, Text, Image} from 'react-native';
import PropTypes from 'prop-types';

import styles from './CustomTextInput.styles';

import {AllTexts} from '../../theme/css/Common';

export default class CustomTextInput extends Component {
  static propTypes = {
    titleText: PropTypes.string,
    errorText: PropTypes.string,
    textValue: PropTypes.string,
    textRef: PropTypes.func,
    textPlaceholder: PropTypes.string,
    textReturnType: PropTypes.string,
    keyboardType: PropTypes.string,
    isSecureText: PropTypes.bool,
    textSubmitRef: PropTypes.func,
    textChangeOnPress: PropTypes.func,
    isEmptyText: PropTypes.bool,
    actionClearText: PropTypes.func,
    actionSelectImage: PropTypes.func,
    editable: PropTypes.bool,
    isIconEnable: PropTypes.bool,
    isErrorEnable: PropTypes.bool
  };

  // initialize default props
  static defaultProps = {
    titleText: AllTexts.loginEmail,
    errorText: AllTexts.validEmail,
    textReturnType: 'next',
    // imgPath: Images.BtnCancel,
    isSecureText: false,
    isEmptyText: false,
    keyboardType: 'default',
    editable: true,
    isIconEnable: false,
    isErrorEnable: false
  };

  constructor(props) {
    super(props);
  }
  render() {
    const {
      titleText,
      errorText,
      textValue,
      editable,
      keyboardType,
      textRef,
      textPlaceholder,
      textReturnType,
      textSubmitRef,
      isSecureText,
      actionClearText,
      isEmptyText,
      textChangeOnPress,
      isIconEnable,
      isErrorEnable,
      iconName
    } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>{titleText}</Text>
        <View style={styles.viewInput}>
          {isIconEnable && (
            <View>
              <Image source={iconName} style={styles.textIcon} />
            </View>
          )}

          <TextInput
            ref={textRef}
            style={[styles.textInput, {width: isIconEnable ? '86%' : '100%'}]}
            spellChec={false}
            autoCapitalize="none"
            keyboardType={keyboardType}
            autoCorrect={false}
            editable={editable}
            underlineColorAndroid="transparent"
            placeholder={textPlaceholder}
            onChangeText={textChangeOnPress}
            value={textValue}
            blurOnSubmit={false}
            secureTextEntry={isSecureText}
            returnKeyType={textReturnType}
            onSubmitEditing={textSubmitRef}
          />
        </View>
        <View style={styles.seprator} />
        {isErrorEnable && (
          <View style={styles.errorView}>
            <Text style={styles.errorText}>{errorText}</Text>
          </View>
        )}
      </View>
    );
  }
}

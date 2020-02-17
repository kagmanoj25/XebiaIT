import React, {Component} from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  ImageBackground,
} from 'react-native';
import PropTypes from 'prop-types';

import styles from './RounButton.styles';

import {colors, Images, AllTexts} from '../../theme/css/Common';

export default class RoundButton extends Component {
  static propTypes = {
    titleText: PropTypes.string,
  };

  // initialize default props
  static defaultProps = {
    titleText: AllTexts.Login,
  };

  constructor(props) {
    super(props);
  }
  render() {
    const {titleText, nextButtonAction} = this.props;
    return (
      <TouchableOpacity style={styles.container} onPress={nextButtonAction}>
        <Text style={styles.nextText}>{titleText}</Text>
      </TouchableOpacity>
    );
  }
}

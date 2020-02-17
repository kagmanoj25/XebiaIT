import React, { Component } from 'react'
import {
  Text,
  View,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {connect} from 'react-redux';
import {AllTexts} from '../../theme/css/Common';
import * as APICalls from '../../../services/APICalls';
import * as CommonFunctions from '../../theme/js/CommonFunctions';

class PlanetView extends Component {
  constructor(props) {
    super(props);
    this.page = 1;
    this.state = {
      loading: false, // user list loading
      isRefreshing: false, //for pull to refresh
      data: [], //planet list
      finalPlanet: [],
      filterData: [],
      error: '',
      text: '',
    };
    this.props.dispatch(APICalls.onPlanetAPIAsync(this.page));
  }

  componentDidMount() {
    if (CommonFunctions.isJson(this.props.planetData)) {
      var planet = JSON.parse(this.props.planetData).value;
      this.setState({
        data: [...this.state.data, ...planet],
        finalPlanet: [...this.state.data, ...planet],
        isRefreshing: false,
      });
    }
  }

  UNSAFE_componentWillReceiveProps(nextProp) {
    if (nextProp.planetData !== this.props.planetData) {
      if (CommonFunctions.isJson(nextProp.planetData)) {
        var planet = JSON.parse(nextProp.planetData).value;
        if (planet) {
          this.setState({
            data: [...this.state.data, ...planet],
            finalPlanet: [...this.state.data, ...planet],
            isRefreshing: false,
          });
        }
      }
    }
    if (nextProp.isLogin !== this.props.isLogin) {
      if (CommonFunctions.isJson(nextProp.isLogin)) {
        if (nextProp.isLogin === false) {
          this.props.navigation.navigate('unauth');
        }
      }
    }
  }

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: '#CED0CE',
        }}
      />
    );
  };

  renderFooter = () => {
    //it will show indicator at the bottom of the list when data is loading otherwise it returns null
    if (!this.state.loading) return null;
    return <ActivityIndicator style={{color: '#000'}} />;
  };

  handleLoadMore = () => {
    if (!this.state.loading) {
      if (this.state.text === '') {
        this.page = this.page + 1; // increase page by 1
        this.props.dispatch(APICalls.onPlanetAPIAsync(this.page));
      }
    }
  };

  onRefresh() {
    this.page = 1;
    this.setState({isRefreshing: true, data: [], finalPlanet: []}); // true isRefreshing flag for enable pull to refresh indicator
    this.props.dispatch(APICalls.onPlanetAPIAsync(this.page));
  }

  SearchFilterFunction(text) {
    //passing the inserted text in textinput
    const newData = this.state.finalPlanet.filter(item => {
      //applying filter for the inserted text in search bar
      const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      //setting the filtered newData on datasource
      //After setting the data it will automatically re-render the view
      data: newData,
      text: text,
    });
  }

  onLogoutPress=()=>{
      Alert.alert(
        'XebiaIT',
        AllTexts.SureLogout,
        [
          {
            text: AllTexts.Cancel,
            onPress: () => (console.log('Cancel Pressed')),
          },
          {text: AllTexts.LogoutText, onPress: () => this.LogoutFromApp()},
        ],
        {cancelable: false},
      );
  }

  LogoutFromApp=()=> {
    console.log('logut here****');
    this.props.dispatch(APICalls.loginFail(''))
  }

  render() {
    return (
      <View style={styles.viewStyle}>
        <TextInput
          style={styles.textInputStyle}
          onChangeText={text => this.SearchFilterFunction(text)}
          value={this.state.text}
          underlineColorAndroid="transparent"
          placeholder="Search Here"
        />
        <FlatList
          data={
            this.state.text === '' ? this.state.finalPlanet : this.state.data
          }
          extraData={this.state}
          refreshing={this.state.isRefreshing}
          onRefresh={this.onRefresh.bind(this)}
          renderItem={({item}) => (
            <View
              style={{
                padding: 15,
              }}>
              <Text
                style={{
                  fontSize: item.population >= 1500000 ? 22 : 18,
                  alignItems: 'center',
                  color: '#65A7C5',
                }}>
                {item.name}
              </Text>
              <Text
                style={{
                  fontSize: item.population >= 1500000 ? 18 : 14,
                  alignItems: 'center',
                  color: '#65A7A5',
                }}>
                {item.population}
              </Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={this.renderSeparator}
          ListFooterComponent={this.renderFooter.bind(this)}
          onEndReachedThreshold={0.4}
          onEndReached={this.handleLoadMore.bind(this)}
        />
        <View style={styles.textStyle}>
          <TouchableOpacity onPress={this.onLogoutPress.bind(this)}> 
            <Text>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewStyle: {
    justifyContent: 'center',
    flex: 1,
    marginTop: 10,
    padding: 10,
  },
  textStyle: {
    padding: 10,
    height:50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInputStyle: {
    height: 40,
    borderRadius:10,
    borderWidth: 1,
    paddingLeft: 10,
    borderColor: '#009688',
    backgroundColor: '#FFFFFF',
  },
});
export default connect()(PlanetView);


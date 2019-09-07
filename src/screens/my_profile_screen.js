import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, ImageBackground, Image } from 'react-native';
import userInfo from '../components/userInfo';
import { ScrollView } from 'react-native-gesture-handler';
import { userInfo } from 'os';

export default class my_profile_screen extends Component {
  days = {
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
    7: "Sunday"
  }
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.navigation.getParam('user'),
      date: new Date(),
      nextClass: ""
    }
  }

  componentWillMount() {
    axios.get('https://myclass-backend.herokuapp.com/classesOfUser?email='+this.state.user.email)
    .then(response => {
        this.setState({nextClass: response.data});
    });  

  }

  renderUserInfo() {
    return (
      <userInfo
        picture={this.state.user.picture}
        className={this.state.}
        classLocation={this.state.}
      />
    )
  }

  renderJoinClass() {
    return (
      <View></View>
    )
  }

  renderMyClasses() {
    return (
      <View></View>
    )
  }

  render() {
    return (
      <ImageBackground
        source={require('../../assets/background.jpeg')}
        style={{ width: '100%', height: '100%' }}>
        <View style={styles.container}>
          <Image 
            style={{alignSelf: 'center'}}
            source={require('../../assets/logo.png')} />
          <Text style={styles.text}>Hello {this.state.user.name}!</Text>
          <View>{this.renderUserInfo()}</View>
          <View>{this.renderJoinClass()}</View>
          <View>{this.renderMyClasses()}</View>
        </View>
      </ImageBackground>
    )
  };
}

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    alignSelf: 'flex-start'
  },
  touchOp: {

    fontSize: 30,
    backgroundColor: '#fff',
    elevation: 2,
    height: 50,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },

  container: {
    alignItems: 'center',
    flexDirection: 'column'
  }
});
import React, { Component } from 'react';
import { Text, StyleSheet, View, ScrollView, ImageBackground, Image } from 'react-native';
import axios from 'axios';
import ClassesList from '../components/ClassesList';
import AddClassButton from '../components/AddClassButton';

export default class my_profile_screen extends Component {
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
        source= {require('../../assets/background.jpeg')} 
        style={{width:'100%', height:'100%' }}>
      <View style={styles.container}>
      <Image source={require('../../assets/logo.png')}/>
      <Text style={styles.text}>Hello {this.state.user.name}!</Text>
        <ScrollView showsVerticalScrollIndicator={false}>
              <ClassesList user= {this.state.user}/>
              <AddClassButton user= {this.state.user}/>
        </ScrollView>
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
    flexDirection: 'column',
    top: 20
  }
});
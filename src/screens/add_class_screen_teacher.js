import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
  Alert,
} from 'react-native';
import { CheckBox } from 'native-base';
import axios from 'axios';
import {withNavigation} from 'react-navigation';

class add_classes_screen_teacher extends Component {
    passUser = this.props.navigation.getParam('user');

    constructor(props) {
    super(props);
    this.state = {
        name   : '', 
        time   : '',
        location: '',
        teacher: '',
        icon: '',
    }

    this.onCreate = this.onCreate.bind(this);
  }

  onCreate = (viewId) => {
    const newClass = {
        id: '222',
      name: this.state.name,
      time: this.state.time,
      location: this.state.location,
      teacher: this.passUser.email,
      //icon: this.state.icon,
    };

    axios.post('https://myclass-backend.herokuapp.com/class',  newClass)
    .catch((err) => {
      console.log(err);
    });
    this.props.navigation.navigate('my_classes');
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={require('../../assets/logo.png')}/>

        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
              placeholder="class name:"
              underlineColorAndroid='transparent'
              onChangeText={(name) => this.setState({name})}/>
        </View>

        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://cdn2.iconfinder.com/data/icons/basic-thin-line-color/21/20-512.png'}}/>
          <TextInput style={styles.inputs}
              placeholder="location: "
              underlineColorAndroid='transparent'
              onChangeText={(location) => this.setState({location})}/>
        </View>
        
        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.onCreate('register')}>
          <Text style={styles.loginText}>create</Text>
        </TouchableHighlight>
      </View>
    );
  }

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
  },
  inputContainer: {
      borderBottomColor: '#F5FCFF',
      backgroundColor: '#FFFFFF',
      borderRadius:30,
      borderBottomWidth: 1,
      width:250,
      height:45,
      marginBottom:20,
      flexDirection: 'row',
      alignItems:'center'
  },
  inputs:{
      height:45,
      marginLeft:16,
      borderBottomColor: '#FFFFFF',
      flex:1,
  },
  inputIcon:{
    width:30,
    height:30,
    marginLeft:15,
    justifyContent: 'center'
  },
  buttonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
  },
  loginButton: {
    backgroundColor: "#00b5ec",
  },
  loginText: {
    color: 'white',
  }
});

export default withNavigation(add_classes_screen_teacher);
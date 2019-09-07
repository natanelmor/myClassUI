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

export default class register_screen extends Component {

  constructor(props) {
    super(props);
    this.state = {
        name   : '', 
        email   : '',
        password: '',
        isTeacher: false
    }

    this.onRegister = this.onRegister.bind(this);
  }

  onRegister = (viewId) => {
    const user = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      type: this.state.isTeacher ? "Teacher" : "Student"
    };

    axios.post('https://myclass-backend.herokuapp.com/user',  user)
    .catch((err) => {
      console.log(err);
    });
    this.props.navigation.navigate('login_screen');
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={require('../../assets/logo.png')}/>
        <Text style={styles.loginText}>Teacher</Text>
            <CheckBox
             onPress={() => this.setState({ isTeacher: !this.state.isTeacher})}
            checked={this.state.isTeacher}/>

        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
              placeholder="User Name"
              underlineColorAndroid='transparent'
              onChangeText={(name) => this.setState({name})}/>
        </View>

        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://cdn2.iconfinder.com/data/icons/basic-thin-line-color/21/20-512.png'}}/>
          <TextInput style={styles.inputs}
              placeholder="Email"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={(email) => this.setState({email})}/>
        </View>
        
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db'}}/>
          <TextInput style={styles.inputs}
              placeholder="Password"
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              onChangeText={(password) => this.setState({password})}/>
        </View> 

        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.onRegister('register')}>
          <Text style={styles.loginText}>Submit</Text>
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
    top: 20
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
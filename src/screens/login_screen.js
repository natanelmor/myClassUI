import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
  Alert
} from 'react-native';
import axios from 'axios';

export default class login_screen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email   : '',
      password: '',
      type : '',
    }

    this.onLogin = this.onLogin.bind(this);
    this.onRestorePassword = this.onRestorePassword.bind(this);
    this.onRegister = this.onRegister.bind(this);
  }

  validateCredentials = (user) => {
    return this.state.password === user['password'];
  }

  onLogin = (viewId) => { 
    const userCredentials = {
      email: this.state.email,
      password: this.state.password
    }

    axios.get('https://myclass-backend.herokuapp.com/user?email='+this.state.email)
    .then(res => {
      if(this.validateCredentials(res.data)){
        this.setState({type:res.data.type});
        this.props.navigation.navigate('my_profile',{user: res.data});
      }
    })
    .catch(err => {
      console.log(err);
    });
  }

  onRestorePassword = (viewId) => {
  
  }

  onRegister = (viewId) => {

    this.props.navigation.navigate('register_screen', );
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={require('../../assets/logo.png')}/>
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

        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.onLogin('login')}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableHighlight>

        <TouchableHighlight style={styles.buttonContainer} onPress={() => this.onRestorePassword('restore_password')}>
            <Text>Forgot your password?</Text>
        </TouchableHighlight>

        <TouchableHighlight style={styles.buttonContainer} onPress={() => this.onRegister('register')}>
            <Text>Register</Text>
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
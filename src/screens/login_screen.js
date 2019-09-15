import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import axios from 'axios';
import CoverImage from '../components/CoverImage';
import globalStyle from '../style'
import { LinearGradient} from 'expo-linear-gradient';
import componentStyle from '../components/style';
import Modal from 'react-native-modal';
import AwesomeAlert from 'react-native-awesome-alerts';

export default class login_screen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email   : '',
      password: '',
      type : '',
      classes: [],
      grades: [],
      attendance: [],
      name: '',
      errmsg: '',
      showAlert: false,
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
    if(this.state.email == '' && this.state.password == ''){
      this.setState({errmsg: 'Enter a valid email address and a password'})
    }
    else if(this.state.password == ''){
      this.setState({errmsg: 'Enter a password'})
    }
    else if(this.state.email == ''){
      this.setState({errmsg: 'Enter a valid email address'})
    }
    if(this.state.email == '' || this.state.password == ''){
      this.toggleAlert(!this.state.showAlert);
    }

    axios.get('https://myclass-backend.herokuapp.com/user?email=' + this.state.email)
    .then(res => {
      if(res.data == null && this.state.password != ''){
        this.setState({errmsg: 'Incorrect email address'})
        this.toggleAlert(!this.state.showAlert);
      }
      else if (this.validateCredentials(res.data)) {
        this.setState({
          user: res.data,
          type: res.data.type,
          classes: res.data.classes,
          grades: res.data.grades,
          attendance: res.data.attendance,
          email: res.data.email,
          name: res.data.name,
        });
        this.props.navigation.navigate('my_profile', { user: this.state.user });
      }
      else{
        this.setState({errmsg: 'Incorrect password'})
        this.toggleAlert(!this.state.showAlert);
      }
    })
    .catch(err => {
      console.log(err);
    });
  }

  toggleAlert(visible){
    this.setState({ showAlert: visible });
  }

  onRestorePassword = (viewId) => {

  }

  onRegister = (viewId) => {

    this.props.navigation.navigate('register_screen', );
  }

  render() {
    return (
      <View style={globalStyle.container}>
        <LinearGradient
          style={globalStyle.header}
          colors={['#6F86D6', '#48C6EF']}
          start={{ x: 0.0, y: 0.25 }}
          end={{ x: 0.5, y: 1.0 }}
        >
        <Image source={require('../../assets/logo.png')}/>
        </LinearGradient>
        <View style={[globalStyle.marginTopValue]}>
          <TextInput   underlineColorAndroid="rgba(0,0,0,0)"
              style={[componentStyle.inputField, componentStyle.shadow]}
              placeholder=" Email"
              keyboardType="email-address"
              onChangeText={(email) => this.setState({email})}/>

          <TextInput underlineColorAndroid="rgba(0,0,0,0)"
              style={[componentStyle.inputField, componentStyle.shadow]}
              placeholder=" Password"
              secureTextEntry={true}
              onChangeText={(password) => this.setState({password})}/>

        <TouchableHighlight  style={componentStyle.buttonBordered} underlayColor="#f1f1f1" onPress={() => this.onLogin('login')}>
          <Text style={componentStyle.buttonBorderedText}>Login</Text>
        </TouchableHighlight>

        <TouchableHighlight style={componentStyle.buttonBordered} underlayColor="#f1f1f1" onPress={() => this.onRegister('register')}>
            <Text style={componentStyle.buttonBorderedText}>Register</Text>
        </TouchableHighlight>

        <AwesomeAlert
            show={this.state.showAlert}
            showProgress={false}
            message={this.state.errmsg}
            closeOnTouchOutside={true}
            showConfirmButton={true}
            confirmText="ok"
            confirmButtonColor="#1e90ff"
            onConfirmPressed={() => {
              this.toggleAlert(!this.state.showAlert);
            }}
          />

        </View>






      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    top: 20,
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
    backgroundColor: "black",
  },
  loginText: {
    color: 'white',
  }
});

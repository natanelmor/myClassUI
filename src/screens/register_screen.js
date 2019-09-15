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
import CoverImage from '../components/CoverImage';
import globalStyle from '../style'
import { LinearGradient} from 'expo-linear-gradient';
import componentStyle from '../components/style'
import AwesomeAlert from 'react-native-awesome-alerts';

export default class register_screen extends Component {

  constructor(props) {
    super(props);
    this.state = {
        name   : '',
        email   : '',
        password: '',
        isTeacher: false,
        errmsg: '',
        showAlert: false,
    }

    this.onRegister = this.onRegister.bind(this);
  }

  toggleAlert(visible){
   this.setState({ showAlert: visible });
 }

  onRegister = (viewId) => {
    const reg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*$/;
    const user = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      type: this.state.isTeacher ? "Teacher" : "Student"
    };

    if(this.state.name == '' || this.state.email == '' || this.state.password == ''){
      this.setState({errmsg: 'Enter user name, email and password'});
      this.toggleAlert(!this.state.showAlert);
    }
    else if(reg.test(this.state.email) == false){
      this.setState({errmsg: 'Invalid email address. Pattern: user@gmail.com'});
      this.toggleAlert(!this.state.showAlert);
    }
    else if(this.state.password.length < 5){
      this.setState({errmsg: 'Password should contain at least 5 characters'});
      this.toggleAlert(!this.state.showAlert);
    }

    else{

    axios.post('https://myclass-backend.herokuapp.com/user',  user)
    .catch((err) => {
      console.log(err);
    });
    Alert.alert('','Registered successfully');
    this.props.navigation.navigate('login_screen');
  }
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

        <TextInput underlineColorAndroid="rgba(0,0,0,0)"
              style={[componentStyle.inputField, componentStyle.shadow]}
              placeholder=" User Name"
              underlineColorAndroid='transparent'
              onChangeText={(name) => this.setState({name})}/>

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

            <View style={componentStyle.centreItems}>
            <Text style={styles.teacherText}>Teacher</Text>
            <CheckBox color="#2196f3"
             onPress={() => this.setState({ isTeacher: !this.state.isTeacher})}
            checked={this.state.isTeacher}/>
            </View>
        <TouchableHighlight style={componentStyle.buttonBordered} underlayColor="#f1f1f1" onPress={() => this.onRegister('register')}>
            <Text style={componentStyle.buttonBorderedText}>Submit</Text>
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
    backgroundColor: "black",
  },
  loginText: {
    color: 'white',
  },
  teacherText: {
    color: 'black',
  }
});

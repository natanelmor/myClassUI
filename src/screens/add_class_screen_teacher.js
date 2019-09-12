import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
} from 'react-native';
import axios from 'axios';
import {withNavigation } from 'react-navigation';
import MultiSelectDays from '../components/MultiSelectDays';

class add_classes_screen_teacher extends Component {
    constructor(props) {
    super(props);
    this.state = {
        name: '', 
        time: [],
        location: '',
        teacher: '',
        icon: '',
    };

    this.onCreate = this.onCreate.bind(this);

    this.passUser = this.props.navigation.getParam('user');
  }

  onCreate = () => {
    const newClass = {
      name: this.state.name,
     // time: this.state.time,
      location: this.state.location,
      teacher: this.passUser.email,
    };

    console.log(newClass);

    axios.post('https://myclass-backend.herokuapp.com/class', newClass)
    .catch((err) => {
      console.log(err);
    });
    this.props.navigation.navigate('my_profile');
  }

  updateTimeFromSelectDay(timeArr) {
    console.log('time in add class: ');
    //const myTime = timearr;
    console.log(timeArr);
    this.setState({ time: timeArr });
    
    
    console.log(this.state.time);
    //console.log(this.state.time);

    //this.setState({ icon: this.state.name });
    //console.log(this);
  }

  render() {
    return (
      <View style={styles.container}>
      
        <View style={styles.inputContainer}>
          <TextInput 
              style={styles.inputs}
              placeholder="class name:"
              underlineColorAndroid='transparent'
              onChangeText={(name) => this.setState({ name })}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput 
              style={styles.inputs}
              placeholder="location: "
              underlineColorAndroid='transparent'
              onChangeText={(location) => this.setState({ location })}
          />
        </View>

        <MultiSelectDays updateTimeFromSelectDay={this.updateTimeFromSelectDay.bind(this)} />
       
        
        <TouchableHighlight 
          style={[styles.buttonContainer, styles.loginButton]} 
          onPress={() => this.onCreate('register')}
        >
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
      borderRadius: 10,
      borderBottomWidth: 1,
      width: 350,
      height: 45,
      marginBottom: 20,
      flexDirection: 'row',
      alignItems:'center'
  },
  inputs: {
      height: 45,
      marginLeft: 16,
      borderBottomColor: '#FFFFFF',
      flex: 1,
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginLeft: 15,
    justifyContent: 'center'
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
  },
  loginButton: {
    backgroundColor: '#00b5ec',
  },
  loginText: {
    color: 'white',
  }
});

export default withNavigation(add_classes_screen_teacher);
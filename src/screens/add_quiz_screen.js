import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import {withNavigation } from 'react-navigation';
import MultiSelectDays from '../components/MultiSelectDays';
import Modal from 'react-native-modal';

class add_quiz_screen extends Component {
    constructor(props) {
    super(props);
    this.state = {
        name: '', 
        time: [],
        location: '',
        teacher: '',
        icon: '',
        addQuestionVisible: false,
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
    this.props.navigation.navigate('QuizIndex');
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
  renderAddQuestionPopUp(){
    
  }

  AddQuestion(){

  }

  setAddQuestionVisible(visible){
    this.setState({ addQuestionVisible: visible });
  }

  render() {
    return (
      <View style={styles.container}>
      
        <View style={styles.inputContainer}>
          <TextInput 
              style={styles.inputs}
              placeholder="quiz name:"
              underlineColorAndroid='transparent'
              onChangeText={(name) => this.setState({ name })}
          />
        </View>
        
        <TouchableHighlight 
          style={[styles.buttonContainer, styles.loginButton]} 
          onPress={() => this.setAddQuestionVisible(!this.state.addQuestionVisible) }
        >
          <Text style={styles.loginText}>add question</Text>
        </TouchableHighlight>

        <TouchableHighlight 
          style={[styles.buttonContainer, styles.loginButton]} 
          onPress={() => this.onCreate('register')}
        >
          <Text style={styles.loginText}>create</Text>
        </TouchableHighlight>
        <View style={{flex: 1 }}>
                                    <Modal scroll inside the modal isVisible={this.state.addQuestionVisible}>
                                        <View style={{
                                            backgroundColor: '#f0f8ff', borderRadius: 15,
                                            height: 500
                                            }}
                                        >

                                            <View style={styles.headerStyle}>
                                                <Text style={styles.headerTextStyle}>Please add a question</Text>
                                            </View>
                                            <ScrollView
                                                showsVerticalScrollIndicator={false}
                                                nestedScrollEnabled
                                            >
                                                <View>{this.renderAddQuestionPopUp()}</View>
                                            </ScrollView>
                                            <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end' , flexDirection: 'row', marginTop: 15, marginRight: 10, marginBottom: 10 , alignContent:'space-between'}}>
                                                <TouchableHighlight
                                                    style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}
                                                    onPress={() => {
                                                        this.setAddQuestionVisible(!this.state.addQuestionVisible);
                                                        this.AddQuestion();
                                                    }}>
                                                    <Text style={{ fontSize: 18 }}>  add</Text>
                                                </TouchableHighlight>
                                                <TouchableHighlight
                                                    style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}
                                                    onPress={() => {
                                                        this.setAddQuestionVisible(!this.state.addQuestionVisible);

                                                    }}>
                                                    <Text style={{ fontSize: 18 }}>cancle  </Text>
                                                </TouchableHighlight>
                                            </View>

                                        </View>
                                    </Modal>
                                </View>
      </View>
    );
  }

}
const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
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

export default withNavigation(add_quiz_screen);
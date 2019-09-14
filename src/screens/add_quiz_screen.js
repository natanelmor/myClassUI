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
import Modal from 'react-native-modal';

class add_quiz_screen extends Component {
    constructor(props) {
    super(props);
    this.state = {
      new_question: {
        answers: []
      },
      questions: [],
      addQuestionVisible: false,
    };

    this.onCreate = this.onCreate.bind(this);

    this.passUser = this.props.navigation.getParam('user');
  }

  onCreate = () => {
    this.props.navigation.navigate('QuizIndex');
  }

  renderAddQuestionPopUp(){
    return (
      <ScrollView
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled>
          <View style={styles.inputContainer}>
              <TextInput
                  style={styles.inputs}
                  placeholder="Question:"
                  underlineColorAndroid='transparent'
                  onChangeText={(question) => {
                    var get_question = this.state.new_question
                    get_question.question = question
                    this.setState({new_question: get_question})
                    console.log(this.state.new_question)}
                  }
              />
          </View>
          <View style={styles.inputContainer}>
              <TextInput
                  style={styles.inputs}
                  placeholder="Answer A (The correct one):"
                  underlineColorAndroid='transparent'
                  onTextChange={(text) => {
                    console.log('do I even get here')
                    var get_question = this.state.new_question
                    var new_answer = {
                      answer: text,
                      correct: true
                    }
                    console.log(new_answer)
                    get_question.answers.push(new_answer)
                    console.log(get_question)
                    this.setState({new_question: get_question})
                    console.log(this.state.new_question)}
                  }
                  
              />
          </View>
          <View style={styles.inputContainer}>
              <TextInput
                  style={styles.inputs}
                  placeholder="Answer B:"
                  underlineColorAndroid='transparent'
                  onChangeText={(answer) => {
                    var get_question = this.state.new_question
                    get_question.answers.push({answer: answer, correct: false})
                    this.setState({new_question: get_question})
                    console.log(this.state.questions)}
                  }
              />
          </View>
          <View style={styles.inputContainer}>
              <TextInput
                  style={styles.inputs}
                  placeholder="Answer C:"
                  underlineColorAndroid='transparent'
                  onChangeText={(answer) => {
                    var get_question = this.state.new_question
                    get_question.answers.push({answer: answer, correct: false})
                    this.setState({new_question: get_question})}
                  }
              />
          </View>
          <View style={styles.inputContainer}>
              <TextInput
                  style={styles.inputs}
                  placeholder="Answer D:"
                  underlineColorAndroid='transparent'
                  onChangeText={(answer) => {
                    var get_question = this.state.new_question
                    get_question.answers.push({answer: answer, correct: false})
                    this.setState({new_question: get_question})}
                  }
              />
          </View>
      </ScrollView>
    ) 
  }

  AddQuestion() {
    this.state.questions.push(this.state.new_question)
    console.log(this.state.questions)
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
          onPress={() => this.onCreate('QuizIndex')}
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
                  <View>{this.renderAddQuestionPopUp()}</View>
                  <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end' , flexDirection: 'row', marginTop: 15, marginRight: 10, marginBottom: 10 , alignContent:'space-between'}}>
                      <TouchableHighlight
                          style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}
                          onPress={() => {
                              this.setAddQuestionVisible(!this.state.addQuestionVisible);
                              this.AddQuestion();
                          }}>
                          <Text style={{ fontSize: 18, margin: 3 }}>add</Text>
                      </TouchableHighlight>
                      <TouchableHighlight
                          style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}
                          onPress={() => {
                              this.setAddQuestionVisible(!this.state.addQuestionVisible);
                          }}>
                          <Text style={{ fontSize: 18, margin: 3 }}>cancel</Text>
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
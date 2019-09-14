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
        id: this.props.navigation.getParam('id'),
        new_question: {},
        
        class_quizes: [],
        addQuestionVisible: false,

        class: {},
        questions: [],
        answers: [],
        quiz_name: '',
        final_question: '',
        final_correct_answer: '',
        final_wrong_answer1: '',
        final_wrong_answer2: '',
        final_wrong_answer3: '',
    };
    this.onCreate = this.onCreate.bind(this);

    this.passUser = this.props.navigation.getParam('user');
  }

  onCreate = () => {

    console.log('id :' + this.state.id);

    const final_quiz = { 'quiz_name': this.state.quiz_name, 'questions': this.state.questions };

    //console.log('final_quiz: ');
    //console.log(final_quiz);

    axios.get('https://myclass-backend.herokuapp.com/class?id=' + this.state.id)//get the class
            .then(res => {
                //console.log(res);
                this.setState({
                    class: res.data,
                });
                
                //console.log('class before : ');
                //console.log(this.state.class);
                this.state.class.quizes.push(final_quiz);
                //console.log('class after : ');
               // console.log(this.state.class);
                axios.patch('https://myclass-backend.herokuapp.com/class?id=' + this.state.id, this.state.class)//update the class
                    .then(response => {}).catch(e => { console.log(e); });
                this.props.navigation.navigate('quiz_time');
            
            
            
            })
            .catch(err => {
                console.log(err);
            }); 

    //console.log('class before : ');
    //console.log(this.state.class);


    //console.log(this.state.class_quizes);

   // this.state.class.quizes.push(final_quiz);

    //console.log('class after : ');
    //console.log(this.state.class);


    //axios.patch('https://myclass-backend.herokuapp.com/class?id=' + this.state.id, this.state.class)//update the class
      //  .then(response => {}).catch(e => { console.log(e); });

   // this.props.navigation.navigate('QuizIndex');
  }

  renderAddQuestionPopUp() {
    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled
        >
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.inputs}
                    placeholder="Question:"
                    underlineColorAndroid='transparent'
                    onChangeText={(question) => {
                       // console.log(question); 
                        this.setState({ final_question: question });
                    //var get_question = this.state.new_question; 
                    //get_question.question = question;
                    //this.setState({ new_question: get_question }, () => {
                    //  console.log(this.state.new_question)
                    //});
                  }}
                />
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.inputs}
                    placeholder="Answer A (The correct one):"
                    underlineColorAndroid='transparent'
                    onChangeText={(answer) => {
                        //console.log(answer);
                        this.setState({ final_correct_answer: answer });

                    //var get_question2 = this.state.new_question;
                    //var new_answer = { answer: answer, correct: true };
                    //if (!get_question2.answers) {
                    //    get_question2.answers = [];
                    //}
                    //get_question2.answers.push(new_answer);
                    //console.log(get_question2);
                    //this.state.new_question.setState(get_question2);
                    //console.log(this.state.new_question.answers);
                    //console.log('new_question:' + JSON.stringify(new_question.answers))
                  }}
                  
                />
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.inputs}
                    placeholder="Answer B:"
                    underlineColorAndroid='transparent'
                    onChangeText={(text) => {
                       // console.log(text);
                        this.setState({ final_wrong_answer1: text });
                        
                    //var get_question = this.state.new_question
                    //get_question.answers.push({answer: text, correct: false})
                    //this.setState({new_question: get_question})}
                    }}
                />
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.inputs}
                    placeholder="Answer C:"
                    underlineColorAndroid='transparent'
                    onChangeText={(text) => {
                        //console.log(text);
                        this.setState({ final_wrong_answer2: text });


                    //var get_question = this.state.new_question
                    //get_question.answers.push({answer: text, correct: false})
                    //this.setState({new_question: get_question})}
                  }}
                />
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.inputs}
                    placeholder="Answer D:"
                    underlineColorAndroid='transparent'
                    onChangeText={(text) => {
                        //console.log(text);
                        this.setState({ final_wrong_answer3: text });

                    //var get_question = this.state.new_question
                   // get_question.answers.push({answer: text, correct: false})
                    //this.setState({new_question: get_question})}
                  }}
                />
            </View>
        </ScrollView>
    );
  }


  AddQuestion() {
    const answers = [];
    const correctAnswer = { 'answer_id': 0, 'answer': this.state.final_correct_answer, 'correct': true };
    answers.push(correctAnswer);

    const wrongAnswer1 = { 'answer_id': 1, 'answer': this.state.final_wrong_answer1, 'correct': false };
    answers.push(wrongAnswer1);

    const wrongAnswer2 = { 'answer_id': 2, 'answer': this.state.final_wrong_answer2, 'correct': false };
    answers.push(wrongAnswer2);

    const wrongAnswer3 = { 'answer_id': 3, 'answer': this.state.final_wrong_answer3, 'correct': false };
    answers.push(wrongAnswer3);
    
    const question = { 'question': this.state.final_question, 'answers': answers };  

    this.state.questions.push(question);

    //console.log(this.state.questions);
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
              onChangeText={(name) => this.setState({ quiz_name: name })}
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
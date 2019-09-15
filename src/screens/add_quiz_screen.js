import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  ScrollView
} from 'react-native';
import axios from 'axios';
import { withNavigation } from 'react-navigation';
import Modal from 'react-native-modal';
import QuestionsToAdd from '../components/QuestionsToAdd';
import globalStyle from '../style'
import componentStyle from '../style'
import { LinearGradient } from 'expo-linear-gradient';

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

    const final_quiz = { 'quiz_name': this.state.quiz_name, 'questions': this.state.questions };

    axios.get('https://myclass-backend.herokuapp.com/class?id=' + this.state.id)//get the class
      .then(res => {
        this.setState({
          class: res.data,
        });


        this.state.class.quizes.push(final_quiz);


        axios.patch('https://myclass-backend.herokuapp.com/class?id=' + this.state.id, this.state.class)//update the class
          .then(response => { }).catch(e => { console.log(e); });
        this.props.navigation.navigate('class_info');
      })
      .catch(err => {
      });


  }

  renderAddQuestionPopUp() {
    return (
      <ScrollView 
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled
      >
        <View style={globalStyle.container}>
          <TextInput underlineColorAndroid="rgba(0,0,0,0)"
            style={[styles.inputField, styles.shadow]}
            placeholder="Question:"
            underlineColorAndroid='transparent'
            onChangeText={(question) => {
              this.setState({ final_question: question });
            }}
          />
        </View>
        <View style={globalStyle.container}>
          <TextInput underlineColorAndroid="rgba(0,0,0,0)"
            style={[styles.inputField, styles.shadow]}
            placeholder="Answer A (The correct one):"
            underlineColorAndroid='transparent'
            onChangeText={(answer) => {
              this.setState({ final_correct_answer: answer });
            }}

          />
        </View>
        <View style={globalStyle.container}>
          <TextInput underlineColorAndroid="rgba(0,0,0,0)"
            style={[styles.inputField, styles.shadow]}
            placeholder="Answer B:"
            underlineColorAndroid='transparent'
            onChangeText={(text) => {
              this.setState({ final_wrong_answer1: text });
            }}
          />
        </View>
        <View style={globalStyle.container}>
          <TextInput underlineColorAndroid="rgba(0,0,0,0)"
              style={[styles.inputField, styles.shadow]}
            placeholder="Answer C:"
            underlineColorAndroid='transparent'
            onChangeText={(text) => {
              this.setState({ final_wrong_answer2: text });
            }}
          />
        </View>
        <View style={globalStyle.container}>
          <TextInput underlineColorAndroid="rgba(0,0,0,0)"           
            style={[styles.inputField, styles.shadow]}
            placeholder="Answer D:"
            underlineColorAndroid='transparent'
            onChangeText={(text) => {
              this.setState({ final_wrong_answer3: text });
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
  }

  setAddQuestionVisible(visible) {
    this.setState({ addQuestionVisible: visible });
  }

  render() {
    return (
      <View style={styles.container}>
        <LinearGradient
          style={globalStyle.header}
          colors={['#6F86D6', '#48C6EF']}
          start={{ x: 0.0, y: 0.25 }}
          end={{ x: 0.5, y: 1.0 }}
        ></LinearGradient>
        <View style={globalStyle.titleContainer}>
          <Text style={globalStyle.title}> Start a new quiz: </Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputs}
            placeholder="quiz name:"
            underlineColorAndroid='transparent'
            onChangeText={(name) => this.setState({ quiz_name: name })}
          />
        </View>
        <View style={globalStyle.bottomView}>
          <TouchableHighlight
            style={styles.buttonBordered} underlayColor="#f1f1f1"
            onPress={() => this.setAddQuestionVisible(!this.state.addQuestionVisible)}
          >
            <Text style={styles.buttonBorderedText}>add question</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.buttonBordered} underlayColor="#f1f1f1"
            onPress={() => { this.onCreate('QuizIndex') }}
          >
            <Text style={styles.buttonBorderedText}>create</Text>
          </TouchableHighlight>
        </View>
        <View style={{ flex: 1 }}>
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
              <View style={globalStyle.buttonContainer}>
                <TouchableHighlight
                  style={styles.buttonBordered} underlayColor="#f1f1f1"
                  onPress={() => {
                    this.AddQuestion();
                    this.setAddQuestionVisible(!this.state.addQuestionVisible);
                  }}>
                  <Text style={styles.buttonBorderedText}>add</Text>
                </TouchableHighlight>
                <TouchableHighlight
                  style={styles.buttonBordered} underlayColor="#f1f1f1"
                  onPress={() => {
                    this.setAddQuestionVisible(!this.state.addQuestionVisible);
                  }}>
                  <Text style={styles.buttonBorderedText}>cancel</Text>
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
    alignItems: 'center'
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
  },
  buttonBordered: {
    width: 270,
    height: 45,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    marginTop: 10,
    borderColor: '#FF758C',
    borderWidth: 1,
    alignSelf: 'center',
  },
  buttonBorderedText: {
    color: '#FF758C',
    textAlign: 'center',
    fontSize: 15,
  },
  inputField: {
    backgroundColor: 'white',
    color: '#4990E2',
    height: 50,
    width: 270,
    marginTop: 10,
    padding: 4,
    paddingLeft: 10,
    fontSize: 18,
    borderRadius: 10,
    alignSelf: 'center',
  },
  shadow: {
    shadowColor: '#444',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 1,
  }
});

export default withNavigation(add_quiz_screen);
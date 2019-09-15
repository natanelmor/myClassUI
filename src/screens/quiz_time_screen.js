import React, { Component } from "react";
import {
  ScrollView, StatusBar, Image, ImageBackground,
  StyleSheet, View, Text, FlatList, TouchableOpacity
} from "react-native";
import spaceQuestions from "../data/space";
import westernsQuestions from "../data/westerns";
import computerQuestions from "../data/computers";
import { RowItem } from "../components/RowItem";
import { withNavigation } from 'react-navigation';
import axios from 'axios';
import { Feather } from '@expo/vector-icons';
import componentStyle from '../style'
import globalStyle from '../style'
import AwesomeAlert from 'react-native-awesome-alerts' 

class QuizIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.navigation.getParam('user'),
      addQuizVisible: false,
      id: '',
      showAlert: false,
      errmst: '',
      selectedItem: {}
    };
  }

  componentDidMount() {
    this.focusListener = this.props.navigation.addListener('didFocus', () => {});
    this.setState({
      user: this.props.navigation.getParam('user'),
      id: this.props.navigation.getParam('id'),
      quizes: this.props.navigation.getParam('quizes'),
    });

  }

  componentWillUnmount() {
    this.focusListener.remove();
  }

  renderAddQuizButton() {
    if (this.state.user.type == 'Teacher') {
      return (
        <View style={[globalStyle.centreItems, position='aboslute', bottom=0]}>
        <TouchableOpacity
        style={[componentStyle.mt10, styles.actionButton]}
        underlayColor="#f1f1f1"underlayColor="#f1f1f1"
          onPress={() => this.props.navigation.navigate('add_quiz', { id: this.state.id, })}
        >
          <Feather style={{ justifyContent: 'center'}} size={30} color="white" name ="plus"/>
        </TouchableOpacity>
        </View>
      )
    }
  }

  toggleAlert(visible){
    this.setState({ showAlert: visible });
  }


  deleteQuiz() {
    if (this.state.user.type === 'Teacher'){
      axios.get('https://myclass-backend.herokuapp.com/class?id=' + this.state.id)
      .then(res => {
        var index = res.data.quizes.map(quiz => quiz._id).indexOf(this.state.selectedItem._id)
        if (index !== -1) {
          res.data.quizes.splice(index, 1);
          axios.patch('https://myclass-backend.herokuapp.com/class?id=' + this.state.id, res.data)
          .catch(err => {console.log(err)})
        }
      })
    }
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <Image style={{ width: '100%', height: '20%', top: 20 }} source={require('../../assets/quiz.jpg')} />
        <View style={[styles.container, marginBottom=20]}>
          <ScrollView>
            <StatusBar barStyle="dark-content" />
            <FlatList
              keyExtractor={(file) => file._id}
              data={this.state.quizes}
              renderItem={({ item }) => {
                const res = this.state.user.grades.some(e => ((e.quiz_id == item.quiz_name) && (e.class_id == this.state.id)));
                if(res && this.state.user.type === 'Student') {
                  return (
                    <View>
                      <RowItem
                        name={item.quiz_name}
                        color="#a9a9a9"
                      />
                    </View>
                  );
                }
                else {
                  return (
                    <View>
                      <RowItem
                        name={item.quiz_name}
                        color="#f0f8ff"
                        onPress={() =>
                          this.props.navigation.navigate("Quiz", {
                            title: item.quiz_name,
                            questions: item.questions,
                            color: '#1564bf',
                            user: this.state.user,
                            id: this.state.id,
                          })
                        }
                        onLongPress={() => {
                          this.setState({ errmsg: 'Are you sure you want to delete this quiz?' });
                          this.setState({selectedItem: item})
                          this.toggleAlert(!this.state.showAlert);
                         }}
                      />
                    </View>
                  );
                }
                return (<View />);
              }

              }
            />
            <View>{this.renderAddQuizButton()}</View>
          </ScrollView>
        </View>
        <AwesomeAlert
          show={this.state.showAlert}
          showProgress={false}
          message={this.state.errmsg}
          closeOnTouchOutside={true}
          showConfirmButton={true}
          showCancelButton={true}
          confirmText="Yes"
          confirmButtonColor="#1e90ff"
          cancelText="No"
          onConfirmPressed={() => {
            this.deleteQuiz()
            this.toggleAlert(!this.state.showAlert);
            this.props.navigation.navigate('class_info')
          }}          
          onCancelPressed={() => {
            this.toggleAlert(!this.state.showAlert);
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  touchOp: {
    alignItems: 'center',
    fontSize: 30,
    padding: 10,
    backgroundColor: '#fff',
    elevation: 2,
  },
  textStyle: {
    marginHorizontal: 15,
    fontSize: 25,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'blue',
    position: 'absolute',
    bottom:0,
    alignSelf: 'center'
  },
  containerFiles: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  containerMessages: {
    height: 180,
    borderWidth: 4,
    borderColor: 'black',
    borderRadius: 5
  },
  messageInput: {
    flex: 1,
    margin: 10,
    height: 180
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    top: 20
  },
  userIcon: {
    width: 50,
    height: 50,
    justifyContent: 'center'
  },
  headerImg: {
    width: 100,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    top: 20
  },
  classIcon: {
    width: 70,
    height: 70
  },
  headerTextStyle: {
    marginHorizontal: 15,
    fontSize: 25,
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold'
  },
  headerStyle: {
  },
  actionButton: {
    backgroundColor: '#FF758C',
    borderRadius: 30,
    padding: 10,
    marginRight: 10,
    marginBottom: 10,
    width: 100,
  },
});

export default withNavigation(QuizIndex);

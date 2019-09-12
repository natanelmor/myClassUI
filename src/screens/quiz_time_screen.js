import React, { Component } from "react";
import { ScrollView, StatusBar, Image, ImageBackground, 
        StyleSheet, View , Text, FlatList} from "react-native";
import spaceQuestions from "../data/space";
import westernsQuestions from "../data/westerns";
import computerQuestions from "../data/computers";
import { RowItem } from "../components/RowItem";
import { withNavigation } from 'react-navigation';
import axios from 'axios';

class QuizIndex extends Component { 
  constructor(props) {
    super(props);
    this.state = {
      stam: '',
    };
  }

  componentDidMount() {
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
    });
  }
  
componentWillUnmount() {
    this.focusListener.remove();
}


    render() {
      return (
    <ImageBackground
      source= {require('../../assets/background.jpeg')}
      style={{width:'100%', height:'100%' }}>
      <Image  style={{width:'100%', height:'20%', top:20 }} source={require('../../assets/quiz.jpg')}/>
      <View style={styles.container}>
        <ScrollView>
          <StatusBar barStyle="dark-content" />
            <FlatList
              keyExtractor={(file) => file._id}
              data={this.props.navigation.getParam('quizes')}
              renderItem={({ item }) => {
              const res = this.props.navigation.getParam('user').grades.some(e => ((e.quiz_id == item.quiz_name) && (e.class_id == this.props.navigation.getParam('id'))));
                if (!res) {
                  return (
                  <View>
                    <RowItem
                      name={item.quiz_name}
                      color="#36b1f0"
                      onPress={() =>
                        this.props.navigation.navigate("Quiz", {
                        title: item.quiz_name,
                        questions: item.questions,
                        color: "#36b1f0",
                        user: this.props.navigation.getParam('user'),
                        id: this.props.navigation.getParam('id'),
                      })
                    }
                    />
                  </View>
                  );
                }
                return (<View />);
              }
            
              }
            />
        </ScrollView>
      </View>
    </ImageBackground>
      );
  }
}

const styles = StyleSheet.create({
  textStyle: {
      marginHorizontal: 15,
      fontSize: 25,
      justifyContent: 'center',
      alignItems: 'center',
      color: 'blue'
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
});

export default withNavigation(QuizIndex);

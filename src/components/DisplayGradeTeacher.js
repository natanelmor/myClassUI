import React, { Component } from 'react';
import { SectionList, StyleSheet, Text, View } from 'react-native';
import axios from 'axios';
import { withNavigation } from 'react-navigation';



export default class StudensGrades extends Component {
  constructor(props) {
    super(props);
    this.state ={
    class: this.props.class,
    allGrades :[]
  }
  this.getAllGrades = this.getAllGrades.bind(this);
  this.getStudentGrade = this.getStudentGrade.bind(this);
}

  componentDidMount(){
    var array = this.getAllGrades()
    this.setState({allGrades: array})
  }

  getStudentGrade(quiz_id){
    var quizGrade = new Array();
    if(this.state.class.students.length >0 ){
    this.state.class.students.forEach(element => { 
      axios.get('https://myclass-backend.herokuapp.com/user?email='+element)
      .then(res => {  
          quiz = (res.data.grades.find(obj => obj.class_id === this.state.class._id && obj.quiz_id === quiz_id))
          if (quiz === undefined) { quiz = '-' } 
          else {quiz = quiz.value }
          quizGrade.push(res.data.name + ' | ' + quiz)
      }).catch(err => alert(err))       
    });
  }

    return quizGrade
  }

  getAllGrades(){
    var listofgrades = new Array();
    if(this.state.class.quizes.length >0 ){
    this.state.class.quizes.forEach(element =>{
      listofgrades.push({title: element.quiz_name ,data: this.getStudentGrade(element.quiz_name)})
    })}

    return listofgrades
  }

  render() {
    return (
      <View style={styles.container}>
      <SectionList
        sections={this.state.allGrades}
        renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
        renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
        keyExtractor={(item, index) => index}
      />
    </View>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: '#4990E2',
    borderRadius: 10,
    shadowColor: '#444',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 1,
    marginLeft: 15,
    marginRight: 15,
    backgroundColor: 'white',
    marginTop: 20,
    paddingBottom: 20,
    paddingTop: 20,
  },
  item: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 17,
    fontWeight: 'bold',
    backgroundColor: '#4990E2',
    borderRadius: 10,
    shadowColor: '#444',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 1,
    marginLeft: 15,
    marginRight: 15,
    backgroundColor: '#4990E2',
    marginTop: 10,
    paddingBottom: 20,
    paddingTop: 20,
  },
})

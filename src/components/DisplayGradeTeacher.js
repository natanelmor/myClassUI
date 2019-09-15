import React, { Component } from 'react';
import { SectionList, StyleSheet, Text, View, FlatList, ListItem, Content,Container } from 'react-native';
import axios from 'axios';
import { withNavigation } from 'react-navigation';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import globalStyle from '../style'
import componentStyle from './style'






export default class StudensGrades extends Component {
  constructor(props) {
    super(props);
    this.state ={
    class: this.props.class,
    allGrades :[]
  }
  this.getAllGrades = this.getAllGrades.bind(this);
  this.getStudentGrade = this.getStudentGrade.bind(this);
  this.showgrades = this.showgrades.bind(this);
  this.avggrade = this.avggrade.bind(this);
}

  async componentDidMount(){
    var array = await this.getAllGrades()
    this.setState({allGrades: array})
   // console.log(array)
  }

   getStudentGrade(quiz_id){
    var quizGrade = []
    if(this.state.class.students.length >0 ){
    this.state.class.students.forEach(async element => { 
      await axios.get('https://myclass-backend.herokuapp.com/user?email='+element)
      .then(res => {  
          quiz = (res.data.grades.find(obj => obj.class_id === this.state.class._id && obj.quiz_id === quiz_id))
          if (quiz === undefined) { quiz = '-' } 
          else {quiz = quiz.value }
         // console.log({name:res.data.name, id:res.data._id, grade:quiz})
          quizGrade.push({name:res.data.name, id:res.data._id, grade:quiz})
      }).catch(err => alert(err))       
    });
  }

    return quizGrade
  }

  getAllGrades(){
    var listofgrades = [];
    if(this.state.class.quizes.length >0 ){
    this.state.class.quizes.forEach(async element =>{
      let tmpchildern = await this.getStudentGrade(element.quiz_name)
      //console.log({name: element.quiz_name, id:element._id ,childern: tmpchildern})
     listofgrades.push({name: element.quiz_name, id:element._id ,data: tmpchildern})
    })}

    return listofgrades
  }

  showgrades(grades){
    if(grades !== undefined){
      let listofgrades = grades.map(student => (
        <View key={student.name+student.grade+grades} style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} > 
            <View style={styles.item}>
            <Text  >{student.grade}</Text>
            </View>
 
          <View  style={styles.item} >
             <Text>{student.name}</Text>
          </View>
           

        </View>))
      return( 
        <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
         {listofgrades}
        </View>    
        )}
    else{
      return (  <View></View>)
    } 
  }

  avggrade(grades){
    var sum = 0 
    var count = 0 
    if(grades !==undefined){
      grades.forEach(element => {
        if(element.grade  !== '-'){
            sum += Number(element.grade);
            count++;
        }});
        if(sum !== 0){
          sum = sum/count
        }
    return(  
      <Text style={{ marginBottom: 6}}>Total Average: {sum}</Text>)
    }
    else{
      return (  <View></View>)
    }
  }

  renderall(){
    if (this.state.allGrades !== undefined){
      var all = this.state.allGrades.map(item => 
        <View key={item.name}>
          <View style={[componentStyle.inputField, componentStyle.shadow]}>
          <Text style={styles.sectionHeader}>{item.name}</Text> 
          {this.avggrade(item.data)}
          </View>
          {this.showgrades(item.data)}
         
        </View>)

        return  (
        <View >
        {all}
        </View>  )}
    else{
      return  (
        <View></View>  )}
    }
    


  render() {
    
  return(
        <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', }}>
          {this.renderall()}
        </View>)}

  }
  
   


const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22
  },
  sectionHeader: { 
      color: '#4990E2',
      fontSize: 18,
  },
  item: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 13,
    fontWeight: 'bold',
    borderRadius: 10,
    shadowColor: '#444',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 1,
    marginTop: 3,
    paddingBottom: 20,
    paddingTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    color: '#000',
    borderRadius: 2,
    borderWidth: 1,
    width: 130,
    height: 35,
  },
})

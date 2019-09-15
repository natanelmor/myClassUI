import React, { Component } from 'react';
import { SectionList, StyleSheet, Text, View, FlatList, ListItem, Content,Container } from 'react-native';
import axios from 'axios';
import { withNavigation } from 'react-navigation';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import globalStyle from '../style'
import componentStyle from './style'
import { CheckBox } from 'react-native-elements'





export default class StudensAttendance extends Component {
  constructor(props) {
    super(props);
    this.state ={
    class: this.props.class,
    attendanceList :[]
  }
  this.isStudentInClass = this.isStudentInClass.bind(this);
  this.getStudentAttendance = this.getStudentAttendance.bind(this);
  this.renderall = this.renderall.bind(this);
}

  async componentDidMount(){
    var array = await this.getStudentAttendance()
    this.setState({attendanceList: array})
  }

  isStudentInClass(user){
    const currentTime = new Date();
    user.attendance.forEach(attendance => {
            const attendanceDate = new Date(attendance.date);           
            if ((attendanceDate.getDay() == currentTime.getDay()) && 
                (attendanceDate.getMonth() == currentTime.getMonth()) && 
                (attendanceDate.getFullYear() == currentTime.getFullYear()) &&
                (attendance.class_id == this.state.class._id)){
                  console.log(user.name)
                  return true
              }
            else{
              return false
            }
        });
    }

   getStudentAttendance(){
    var attendanceList = []
    if(this.state.class.students.length >0 ){
    this.state.class.students.forEach(async element => { 
      await axios.get('https://myclass-backend.herokuapp.com/user?email='+element)
      .then(res => {  
        
         if(this.isStudentInClass(res.data)){
           attendanceList.push({name: res.data.name, inClass: true})
         }
         else{
         
          attendanceList.push({name: res.data.name, inClass: false})
         }
      }).catch(err => alert(err))       
    });
  }

    return attendanceList
  }

  renderall(){
    if (this.state.attendanceList !== undefined){
      var all = this.state.attendanceList.map(item => 
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }} key={item.name}>
          <CheckBox checked={true}/>
          <Text style={styles.sectionHeader}>{item.name}</Text> 
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

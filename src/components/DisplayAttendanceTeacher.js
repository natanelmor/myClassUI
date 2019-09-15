import React, { Component } from 'react';
import { SectionList, StyleSheet, Text, View, FlatList, ListItem, Content,Container } from 'react-native';
import axios from 'axios';
import { withNavigation } from 'react-navigation';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import globalStyle from '../style'
import componentStyle from './style'
import { CheckBox,Divider } from 'react-native-elements'





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

   async componentWillMount(){
    var array = await this.getStudentAttendance()
    this.setState({attendanceList: array})
  }

  isStudentInClass(user){
    const currentTime = new Date();
    let check = false;
    user.attendance.forEach(attendance => {
            const attendanceDate = new Date(attendance.date);           
            if ((attendanceDate.getDay() == currentTime.getDay()) && 
                (attendanceDate.getMonth() == currentTime.getMonth()) && 
                (attendanceDate.getFullYear() == currentTime.getFullYear()) &&
                (attendance.class_id == this.state.class._id)){
                  check = true;
                  return (check)
              }
            else{
              return (check)
            }
        });
    }

   getStudentAttendance(){
    var attendanceList = []
    var pushFlag = true;
    if(this.state.class.students !=undefined ){
    this.state.class.students.forEach(async element => { 
      await axios.get('https://myclass-backend.herokuapp.com/user?email='+element)
      .then(res => {
        const currentTime = new Date();
        pushFlag = true;
        res.data.attendance.forEach(attendance => {
            const attendanceDate = new Date(attendance.date);           
            if ((attendanceDate.getDay() == currentTime.getDay()) && 
                (attendanceDate.getMonth() == currentTime.getMonth()) && 
                (attendanceDate.getFullYear() == currentTime.getFullYear()) &&
                (attendance.class_id == this.state.class._id)){
                  attendanceList.push({name: res.data.name, inClass: true})
                  pushFlag = false;
              }
      
        });
        if(pushFlag){
          attendanceList.push({name: res.data.name, inClass: false})
        }
      }).catch(err => alert(err))            
    });
  }

    return attendanceList
  }

    renderall(){
    if (this.state.attendanceList !== undefined){
      //console.log(this.state.attendanceList)
      var all = this.state.attendanceList.map(item => 
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginLeft:15, marginRight:15, paddingRight:15, paddingLeft:15}} key={item.name}>
           <Text style={styles.sectionHeader}>{item.name}</Text> 
          <CheckBox checkedColor="green" checked={item.inClass}/>
          
        </View>)
        return (
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
            <Text style={styles.sectionHeader}>Look which students are in class:</Text>
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

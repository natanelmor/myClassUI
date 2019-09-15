import React, { Component, userState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    TextInput,
    StatusBar,
    Button,
    TouchableOpacity,
    Image,
    FlatList,
    ImageBackground,
    TouchableHighlight,
    AppState
} from 'react-native';
import spaceQuestions from "../data/space";
import westernsQuestions from "../data/westerns";
import computerQuestions from "../data/computers";
import { RowItem } from "../components/RowItem";
import { Linking } from 'expo';
import axios from 'axios';
import Modal from 'react-native-modal';
import DisplayGrade from '../components/DisplayGrade';
import DisplayGradeTeacher from '../components/DisplayGradeTeacher'
import ClassInfo from '../components/ClassInfo';
import Messages from '../components/Messages';
import ResourceFiles from '../components/ResourceFiles';
import Participants from '../components/Participants';
import Feed from './feed_screen'
import {AntDesign, MaterialCommunityIcons} from '@expo/vector-icons';
import { withNavigation } from 'react-navigation';
import LargeHeading from '../components/LargeHeading';
import CoverImage from '../components/CoverImage';
import globalStyle from '../style'
import componentStyle from '../components/style'
import { LinearGradient} from 'expo-linear-gradient';
import DisplayAttendanceTeacher from '../components/DisplayAttendanceTeacher'
import ProgressCircle from 'react-native-progress-circle'
import * as Progress from 'react-native-progress';

class class_info_screen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            appState: AppState.currentState,
            totalTime: 0,
            start: 0,
            curr: 0,
            timer: '',
            startDisable: false,
            participants: [],
            name: '',
            icon: '',
            user: this.props.navigation.getParam('user'),
            id: this.props.navigation.getParam('key'),
            class: '',
            teacher: '',
            time: [],
            location: [],
            items: [
                { id: '1', type: 'file', source: '', name: 'File' },
                { id: '2', type: 'file', source: '', name: 'File' },
                { id: '3', type: 'link', source: '', name: 'Link' },
                { id: '4', type: 'file', source: '', name: 'File' },
                { id: '5', type: 'file', source: '', name: 'File' },
                { id: '6', type: 'link', source: '', name: 'Link' },
                { id: '7', type: 'file', source: '', name: 'File' },
                { id: '8', type: 'file', source: '', name: 'File' },
            ],
            quizes: [],
            grades: [],
            modalVisible: false,
            startAttendance: false,
            unRegisterVisible: false,

            classDuringTimeInSEC: 7200,
            percentage: 0,
            attTime: 0,
            attendanceMsg: 'you dont have class for today',
            attendanceVisible: false,
        }

        this.startTimer = this.startTimer.bind(this);
        this.renderGrades = this.renderGrades.bind(this);
        this.renderAttendance = this.renderAttendance.bind(this);
        this.stopTimer = this.stopTimer.bind(this);
        this.getTimeString = this.getTimeString.bind(this);
    }

    componentDidMount() {
       this.focusListener = this.props.navigation.addListener('didFocus', () => {
        axios.get('https://myclass-backend.herokuapp.com/class?id=' + this.state.id)
            .then(res => {
                this.setState({
                    class: res.data,
                    name: res.data.name,
                    teacher: res.data.teacher,
                    time: res.data.time,
                    location: res.data.location,
                    icon: res.data.icon,
                    participants: res.data.students,
                    quizes: res.data.quizes,
                    grades: this.state.user.grades,
                });
                this.updateAttendancePercentage();

                if (this.checkIfNeedToSetTimer()) {
                    //this.updateAttendancePercentage;
                    this.updateAttendance();
                    console.log('checkIfNeedToSetTimer pass');
                    //this.startTimer();
                   // AppState.addEventListener('change', this._handleAppStateChange);
                }

            })
            .catch(err => {
                console.log(err);
            });

        //check if we need to take time at all
        //this.checkIfNeedToSetTimer();
       // this.startTimer();
        AppState.addEventListener('change', this._handleAppStateChange);
        });
    }

    componentWillUnmount() {
        console.log('componentWillUnmount: currtime- ' + this.state.curr);
        if(this.state.curr > 0) {
           // AppState.removeEventListener('change', this._handleAppStateChange);
            this.updateAttendance();
        }
        clearInterval(this.state.timer);
        AppState.removeEventListener('change', this._handleAppStateChange);
        //check if total time != 0
       // this.updateAttendance();
        //clearInterval(this.state.timer);
        //this.focusListener.remove();
    }

    checkTheClassHours(time) {                      //בודק שהשעות מתאימות לשיעור של היום
        const start = time.from;
        const end = time.until;
        var currentTime = new Date();
        var currendHour= currentTime.getHours();
        var currendMin= currentTime.getMinutes();

        const [staerHour, startMin] = start.split(':');
        const [endrHour, endtMin] = end.split(':');

        const currentTimeInMinuts = (currendHour * 60) + currendMin;
        const startTimeInMinuts = (Number(staerHour) * 60) + (Number(startMin));
        const endTimeInMinuts = (Number(endrHour) * 60) + (Number(endtMin));


        if ((currentTimeInMinuts >= startTimeInMinuts) && (currentTimeInMinuts <= endTimeInMinuts)) {
            console.log('we are in!');
            return true;
        } else {
            console.log('we dont have match time');
            return false;
        }

        console.log('currentTimeInMinuts :' + currentTimeInMinuts);
        console.log('startTimeInMinuts :' + startTimeInMinuts);
        console.log('endTimeInMinuts :' + endTimeInMinuts);



        //console.log('class start hour:' + staerHour);
        //console.log('class start min:' + startMin);

        //console.log('class end hour:' + endrHour);
        //console.log('class end min:' + endtMin);

        //console.log('currend hour:' + currendHour);
        //console.log('currend min:' + currendMin);

       // if ()



    }

    checkIfNeedToSetTimer() {
        //console.log('checkIfNeedToSetTimer: ');
        var currentTime = new Date();
        
        axios.get('https://myclass-backend.herokuapp.com/user?email=' + this.state.user.email)
        .then(res => {
            this.setState({
                user: res.data,
            });

            //console.log(this.state);
            
            this.state.class.time.forEach(time => {
                if ((currentTime.getDay() + 1) === time.day) {                     //  בודק שיש לך שיעור באותו יום
                    console.log('we have class that day: ' + time.day);
                    if (this.checkTheClassHours(time)) {                            // בודק שהשעות מתאימות לשיעור של היום
                        console.log('we find a class to check in');
                        this.startTimer();
                        this.stopTimer();
                        this.updateAttendance();
                        this.startTimer();
                        this.setState({ attendanceMsg: 'class ' + this.state.class.name + ' started', attendanceVisible: true });

                        console.log(this.state.attendanceMsg);
                        
                        return true;
                        //this.updateOrCreateAttendance();  
                        //return true;
                    }



                } else {
                    console.log('we dont have class that day: ' + time.day);   //           "אפשר להוסיף הדפסה "אין לך שיעור היום
                }
            });
           // this.setState({ attendanceMsg: 'you dont have class for today' });
            return false;      
        });

/*
            this.state.user.attendance.forEach(element => {   //check if we need to update attendance or create new one
                //console.log(element.date);
                
                var timestmp2 = new Date(element.date);

                //console.log('day :' + timestmp2.getDay());

                if(timestmp2.getDay() == currentTime.getDay())
                {

                }


      
            });

              




        }).catch(err => { console.log(err); });


        //////////////////////////////////////////good practice
        //var currentTime = Date.now();
        //var timestmp = new Date();
        //var timestmp2 = new Date(currentTime);
        //var day1 = timestmp.getDay();
        //var day2 = timestmp2.getDay();


        //console.log('currentTime: ' + timestmp);
        //console.log('currentTime2 : ' + timestmp2);
        //var currentDay = currentTime.getDay();
        //console.log('currentDay: ' + day1);
        //console.log('currentDay2: ' + day2);

        */

    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    setUnRegisterVisible(visible) {
        this.setState({ unRegisterVisible: visible });
    }

    setStartAttendanceVisible(visible) {
        this.setState({ startAttendance: visible });
    }

    getTimeString(timeInSec) {
        var delim = ":";
        var hours = Math.floor(timeInSec / (60 * 60) % 60);
        var minutes = Math.floor(timeInSec / (60) % 60);
        var seconds = Math.floor(timeInSec % 60);

        hours = hours < 10 ? '0' + hours : hours;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;
        return hours + delim + minutes + delim + seconds;
    }

    stopTimer() {
        this.setState({
            totalTime: this.state.start + this.state.totalTime,
            start: 0,
            startDisable: false
        });
        clearInterval(this.state.timer);
    }

    startTimer() {
        let timer = setInterval(() => {
           this.setState({
           start: this.state.start + 1,
           curr: this.state.start + this.state.totalTime,
           percentage: (this.state.attTime + 1) / this.state.classDuringTimeInSEC,
           attTime: this.state.attTime +1,   
           
           });
       }, 1000);
       this.setState({ timer });

       this.setState({ startDisable: true });
   }

   _handleAppStateChange = (nextAppState) => {
        if (this.state.appState.match(/background/) && nextAppState === 'active') {
            this.startTimer();
        } else {
            this.stopTimer();
        }
        this.setState({ appState: nextAppState });
    }

    updateAttendancePercentage() {
        
        const currentTime = new Date();
        
    
        //const [staerHour, startMin] = start.split(':');
        //const [endrHour, endtMin] = end.split(':');
        this.state.user.attendance.forEach(attendance => {
            const attendanceDate = new Date(attendance.date);
            
            if ((attendanceDate.getDay() == currentTime.getDay()) && 
                (attendanceDate.getMonth() == currentTime.getMonth()) && 
                (attendanceDate.getFullYear() == currentTime.getFullYear()) &&
                (attendance.class_id == this.state.id)) {
                    //attendance.time += this.state.curr;
                    //newAttendanceFlag = false;

                    this.setState({
                        percentage: (attendance.time) / this.state.classDuringTimeInSEC,
                        attTime: attendance.time
                    } );
            }


        });
    }

    updateAttendance() {
        var newAttendanceFlag = true;
        const currentTime = new Date();
        this.state.user.attendance.forEach(attendance => {
            const attendanceDate = new Date(attendance.date);
            
            if ((attendanceDate.getDay() == currentTime.getDay()) && 
                (attendanceDate.getMonth() == currentTime.getMonth()) && 
                (attendanceDate.getFullYear() == currentTime.getFullYear()) &&
                (attendance.class_id == this.state.id)) {
                    attendance.time += this.state.curr;
                    newAttendanceFlag = false;
                    
            }


        });

        if (newAttendanceFlag) {
            this.state.user.attendance.push({
                "class_id": "" + this.state.id,
                "date": Date.now(),
                "time": this.state.curr,
            });
        }

        axios.patch('https://myclass-backend.herokuapp.com/user?email=' + this.state.user.email, this.state.user)
            .then(response => {}).catch(e => { console.log(e); });
    }

    unRegister() {
        let passClass = this.state.class;
        let index = this.state.user.classes.indexOf(this.state.id);
        if (index !== -1) {
            this.state.user.classes.splice(index, 1);
            axios.patch('https://myclass-backend.herokuapp.com/user?email=' + this.state.user.email, this.state.user);
        }

        index = -1;
        index = passClass.students.indexOf(this.state.user.email);

        if (index !== -1) {
            passClass.students.splice(index, 1);
            axios.patch('https://myclass-backend.herokuapp.com/class?id=' + this.state.id, passClass);
        }

        
        this.props.navigation.navigate('my_profile', { user: this.state.user });
    }

    renderParticipants() {
        return (
            <Participants data={this.state.participants} />);
    }

    renderResources() {
        return (
            <ResourceFiles data={this.state.items} />);
    }

    renderMessages() {
        return (
            <Feed></Feed>
        );
    }

    renderClassInfo() {
        return (
            <ClassInfo
                icon={this.state.icon}
                classIcon={this.state.icon}
                name={this.state.name}
                time={this.state.time}
                location={this.state.location}
                teacher={this.state.teacher}
            />
        );
    }

    renderGrades() {
        if( this.state.user.type !== "Teacher"){
            return(<DisplayGrade data={this.state.grades} id={this.state.id}/>)
        }
        else{
            return ( <DisplayGradeTeacher class={this.state.class}/>)
        }
    }

    renderAttendance() {
        if( this.state.user.type === "Teacher"){
            return(<DisplayAttendanceTeacher class={this.state.class}/>)
        } else {
            return(
                <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', paddingTop:25, marginVertical:20, paddingVertical:20}}>
                    <View style={globalStyle.row}>
                        <Text style={[globalStyle.name]}> { this.state.attendanceMsg } </Text>
                    </View> 
                    <View style={{paddingTop:20}}>  
                        {this.state.attendanceVisible ? 
                        <Progress.Circle size={180} progress={this.state.percentage} showsText="true"  formatText={() => { return `${Math.floor(this.state.percentage*100)}%`}} /> : null}
                    </View>  
                </View> 
            )
        }
    }

    renderUnRegisterPopUp() {
        return (
            <Text>Are you sure you bitch?</Text>
            );

    }

    renderTools(){
        return(
            <View style={globalStyle.recentlyPlayed}>
            <Text style={[globalStyle.name, globalStyle.paddingLeftValue]}>Tools</Text>
            <View   horizontal
                    showsHorizontalScrollIndicator={false}
             style={{ flexDirection: 'row', alignItems: 'center' , justifyContent: 'center', padding:20}}>
                <TouchableOpacity  style={styles.card_container} onPress ={() => this.props.navigation.navigate('QuizIndex' , {id: this.state.id, user : this.state.user, quizes: this.state.quizes})}>
                <Image
                    source={require('../../assets/back_card.jpg')} style={styles.card_background} resizeMode="cover"/>
                    <View style={styles.card_overlay} />
                        <AntDesign style={styles.card_icon} color="white" size={30} name="form" />
                        <Text style={styles.card_name}>Quizes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.card_container} onPress={() => { this.setModalVisible(!this.state.modalVisible); }}>
                    <Image source={require('../../assets/back_card.jpg')} style={styles.card_background} resizeMode="cover" />
                    <View style={styles.card_overlay} />
                        <MaterialCommunityIcons style={styles.card_icon} size={30} color="white" name="format-annotation-plus" />
                        <Text style={styles.card_name}>Grades</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.card_container} onPress={() => { this.setStartAttendanceVisible(!this.state.startAttendance); }}>
                    <Image source={require('../../assets/back_card.jpg')} style={styles.card_background} resizeMode="cover" />
                    <View style={styles.card_overlay} />
                        <MaterialCommunityIcons style={styles.card_icon} size={30} color="white" name ="clock-outline" />
                        <Text style={styles.card_name}>Check-in</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.card_container} onPress={() => this.props.navigation.navigate('feed', { id: this.state.id, user: this.state.user })}>
                    <Image source={require('../../assets/back_card.jpg')} style={styles.card_background} resizeMode="cover" />
                    <View style={styles.card_overlay} />
                        <MaterialCommunityIcons style={styles.card_icon} size={30} color="white" name="forum-outline" />
                        <Text style={styles.card_name}>Feed</Text>
                    </TouchableOpacity>
            </View>
            </View>
        );
    }

    render() {
        return (
              <View style={globalStyle.container}> 
                <ScrollView style={globalStyle.scrollContainer}>
                    <LinearGradient
                        style={globalStyle.header}
                        colors={['#6F86D6', '#48C6EF']}
                        start={{ x: 0.0, y: 0.25 }}
                        end={{ x: 0.5, y: 1.0 }}
                    >
                        <CoverImage />
                    </LinearGradient>
                        <View>{this.renderClassInfo()}</View>
                        <View>{this.renderTools()}</View>
                        <View>{this.renderResources()}</View>
                        <View>{this.renderParticipants()}</View>
                        <View style={{ flex: 1 }}>
                            <Modal
                                scroll inside the modal
                                isVisible={this.state.modalVisible}
                            >
                                <View style={{
                                    backgroundColor: '#f0f8ff', borderRadius: 15,
                                    height: 500}}>
                                    <ScrollView
                                        showsVerticalScrollIndicator={false}
                                        nestedScrollEnabled>
                                        <View>
                                            {this.renderGrades()}
                                        </View>
                                    </ScrollView>
                                    <View  style={{ justifyContent: 'center', alignItems: 'center', marginTop: 15, marginRight: 10, marginBottom: 10 }}>
                                        <TouchableHighlight
                                             style={[componentStyle.actionButton, componentStyle.mt10]}
                                             underlayColor="#f1f1f1"
                                            onPress={() => {
                                                this.setModalVisible(!this.state.modalVisible);
                                            }}>
                                            <Text style={{   alignSelf: 'center', color:"white" ,fontSize: 18 }}>Close</Text>
                                        </TouchableHighlight>
                                        </View>
                                </View>
                            </Modal>
                        </View>
                        <View style={{ flex: 1, direction: 'rtl' }}>
                            <Modal scroll inside the modal isVisible={this.state.startAttendance}>
                                <View style={{ backgroundColor: '#f0f8ff', borderRadius: 15, height: 500 }}>
                                <ScrollView
                                        showsVerticalScrollIndicator={false}
                                        nestedScrollEnabled>
                                        <View>
                                        {this.renderAttendance()}
                                        </View>
                                    </ScrollView>
                                        <View  style={{ justifyContent: 'center', alignItems: 'center', marginTop: 15, marginRight: 10, marginBottom: 10 }}>
                                        <TouchableHighlight  style={[componentStyle.actionButton, componentStyle.mt10]}
                                             underlayColor="#f1f1f1"
                                            onPress={() => { this.setStartAttendanceVisible(!this.state.startAttendance); }}>
                                           <Text style={{   alignSelf: 'center', color:"white" ,fontSize: 18 }}>Close</Text>
                                        </TouchableHighlight>
                                        </View>
                                </View>
                            </Modal>
                        </View>

                        <TouchableHighlight  style={componentStyle.buttonBordered} underlayColor="#f1f1f1"  onPress={() => {this.unRegister();}}>
                                <Text style={componentStyle.buttonBorderedText}>Unregister</Text>
                        </TouchableHighlight>
                    </ScrollView>
                </View >
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
    classIcon: {
        width: 70,
        height: 70
    },
    headerTextStyle: {
        marginHorizontal: 15,
        fontSize: 25,
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff8dc',
        fontWeight: 'bold'
    },
    headerStyle: {
        backgroundColor: '#696969',
        borderRadius: 15,
    },
    card_container: {
        width: 80,
        height: 80,
        borderRadius: 6,
        backgroundColor: '#ccc',
        overflow: 'hidden',
        padding: 15,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        marginRight:5
      },
      card_background: {
        width: 80,
        height: 80,
        position: 'absolute',
      },
      card_overlay: {
        width: 80,
        height: 80,
        backgroundColor: 'rgba(0,0,0,0.4)',
        position: 'absolute',
      },
      card_name: {
        color: 'white',
        fontSize: 10,
        fontWeight: '600',
        marginTop: 7,
      },
      card_icon: {
        width: 32,
        height: 32,
      },
      mb15: {
        marginBottom: 20
      },
});

export default withNavigation(class_info_screen);

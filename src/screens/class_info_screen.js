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
import ClassInfo from '../components/ClassInfo';
import Messages from '../components/Messages';
import ResourceFiles from '../components/ResourceFiles';
import Participants from '../components/Participants';

export default class class_info_screen extends Component {

    constructor(props) {
        super(props);

        user = this.props.navigation.getParam('user');
        this.state = {
            appState: AppState.currentState,
            totalTime: 0,
            start: 0,
            timer: null,
            startDisable: false,
            messages: [
                { content: 'Welcome!' },
                { content: 'Education is the movement from darkness to light.\n ~Allan Bloom~' },
                { content: 'I wish you to be inspired by the school,  \n \n to explore things with curiosity and the eyes wide open, \n \n to listen attentively and then you will discover a whole new world!' },
                { content: 'Be successful and have a lot fun at school!' },
            ],
            participants: [],
            name: null,
            icon: null,
            id: this.props.navigation.getParam('key'),
            teacher: null,
            time: null,
            location: null,
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
            quizes: null,
            grades: [
                { subject: 'Math', grade: '91' },
            ],
            modalVisible: false,
            startAttendance: false,
            unRegisterVisible : false,
        }
    }

    componentDidMount() {
        this.startTimer();
        AppState.addEventListener('change', this._handleAppStateChange);
        axios.get('https://myclass-backend.herokuapp.com/class?id='+this.state.id)
        .then(res => {
            this.setState({
                class : res.data,
                name: res.data.name,
                teacher: res.data.teacher,
                time: res.data.time[0].day + ' ' + res.data.time[0].from + ' - ' + res.data.time[0].until,
                location: res.data.location,
                icon: res.data.icon,
                participants: res.data.students,
                quizes: res.data.quizes
                });
            })
            .catch(err => {
                console.log(err);
            });
        const user = this.props.navigation.getParam('user')
    }

    componentWillUnmount() {
        AppState.removeEventListener('change', this._handleAppStateChange);
    }

    _handleAppStateChange = (nextAppState) => {
        if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
            this.stopTimer();
        }
        else{
            this.startTimer();
        }
        this.setState({appState: nextAppState});
    }

    setUnRegisterVisible(visible) {
        this.setState({ unRegisterVisible: visible });
    }

    unRegister(){

        var index = user.classes.indexOf(this.state.id);
        if (index !== -1) {
            user.classes.splice(index, 1);
            axios.patch('https://myclass-backend.herokuapp.com/user?email='+user.email, user);
        }

        passClass = this.state.class;

        index = passClass.students.indexOf(user.email);
        if (index !== -1) {
            passClass.students.splice(index, 1);
            axios.patch('https://myclass-backend.herokuapp.com/class?id='+this.state.id, passClass);
        }

        console.log(this.state.participants);


        this.props.navigation.navigate('my_profile',{user: user});

    };

    renderUnRegisterPopUp(){
        return (
            <Text>Are you sure you bitch?</Text>
            )

    }

    setModalVisible(visible){
        this.setState({ modalVisible: visible });
    }

    setStartAttendanceVisible(visible) {
        this.setState({ startAttendance: visible });
    }


    startTimer(){

        let timer = setInterval(() => {
            this.setState({
            start : this.state.start +1
            });
        }, 1000);
        this.setState({timer})
        this.setState({startDisable : true})
        console.log("start: ", this.getTimeString(this.state.totalTime))
    }


    stopTimer(){
        this.setState({
            totalTime : this.state.start + this.state.totalTime,
            start : 0,
            startDisable : false
        });
        clearInterval(this.state.timer);
        console.log("stop: ", this.getTimeString(this.state.totalTime))
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

    renderGrades() {
        return (
            this.state.grades.map(grades =>
                <DisplayGrade
                    key={grades.subject}
                    grades={grades}/>
        ))}

    renderClassInfo() {
        return (
            <ClassInfo
                icon={this.state.icon}
                classIcon={this.state.icon}
                name={this.state.name}
                time={this.state.time}
                location={this.state.location}
                teacher={this.state.teacher}/>
        )}

    renderMessages() {
        return (
            <Messages messages={this.state.messages}/>)
    }

    renderResources() {
        return (
            <ResourceFiles data={this.state.items}/>)
    }

    renderParticipants() {
        return (
            <Participants data={this.state.participants}/>)
    }

    render() {
        return (
            <ImageBackground
                source={require('../../assets/background.jpeg')}
                style={{ width: '100%', height: '100%' }}>
                <View style={{marginTop: 15}}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View>{this.renderClassInfo()}</View>
                        <View style={styles.headerStyle}><Text style={styles.headerTextStyle}>Achievements</Text></View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' , justifyContent: 'center'}}>
                            <TouchableOpacity onPress ={() => this.props.navigation.navigate('QuizIndex' , {id: this.props.navigation.getParam('key'), user : this.props.navigation.getParam('user'), quizes: this.state.quizes})}>
                                <View>
                                     <Image
                                            style={styles.classIcon}
                                            source={{uri: 'https://cdn3.iconfinder.com/data/icons/quiz/96/quiz_09-512.png'}}/>
                                            </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {this.setModalVisible(!this.state.modalVisible);}}>
                                    <View>
                                        <Image
                                            style={styles.classIcon}
                                            source={require('../../assets/grades-icon.png')}/>
                                            
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress ={() => {this.setStartAttendanceVisible(!this.state.startAttendance)}}>
                                <View>
                                     <Image
                                            style={styles.classIcon}
                                            source={{uri: 'https://icon-library.net/images/student-attendance-icon/student-attendance-icon-2.jpg'}}/>

                                    </View>
                                </TouchableOpacity>
                        </View>
                        <View>{this.renderMessages()}</View>
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
                                    <View style={styles.headerStyle}>
                                        <Text style={styles.headerTextStyle}>Grades</Text>
                                    </View>
                                    <ScrollView
                                        showsVerticalScrollIndicator={false}
                                        nestedScrollEnabled>
                                        <View>
                                            {this.renderGrades()}
                                        </View>
                                    </ScrollView>
                                    <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', marginTop: 15, marginRight: 10, marginBottom: 10 }}>
                                        <TouchableHighlight
                                            style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}
                                            onPress={() => {
                                                this.setModalVisible(!this.state.modalVisible);
                                            }}>
                                            <Text style={{ fontSize: 18 }}>Close</Text>
                                        </TouchableHighlight></View>
                                </View>
                            </Modal>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Modal scroll inside the modal isVisible={this.state.startAttendance}>
                                <View style={{ backgroundColor: '#f0f8ff', borderRadius: 15, height: 500}}>
                                    <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', marginTop: 15, marginRight: 10, marginBottom: 10 }}>
                                    <Text style={{ fontSize: 18 }}>Time in class: {this.getTimeString(this.state.totalTime)}</Text>
                                        <TouchableHighlight
                                            style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}
                                            onPress={() => {this.setStartAttendanceVisible(!this.state.startAttendance);}}>
                                           <Text style={{ fontSize: 18 }}>Close</Text>
                                        </TouchableHighlight>
                                    </View>
                                </View>
                            </Modal>
                        </View>

                        <View style={{ flex: 1, alignSelf: 'flex-end' }}>
                            <TouchableOpacity
                                onPress={() => {
                                this.setUnRegisterVisible(!this.state.unRegisterVisible);
                                }}
                            >
                                <View>
                                    <Image
                                        style={{width: 100,
                                        height: 50}}
                                        source={ {uri :'http://www.clker.com/cliparts/O/6/3/C/g/l/cancel-button-hi.png'}}
                                    />
                                </View>
                            </TouchableOpacity>
                        </View>
                                <View style={{flex: 1 }}>
                                    <Modal scroll inside the modal isVisible={this.state.unRegisterVisible}>
                                        <View style={{
                                            backgroundColor: '#f0f8ff', borderRadius: 15,
                                            height: 500
                                            }}
                                        >

                                            <View style={styles.headerStyle}>
                                                <Text style={styles.headerTextStyle}>Unregister</Text>
                                            </View>
                                            <ScrollView
                                                showsVerticalScrollIndicator={false}
                                                nestedScrollEnabled
                                            >
                                                <View>{this.renderUnRegisterPopUp()}</View>
                                            </ScrollView>
                                            <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end' , flexDirection: 'row', marginTop: 15, marginRight: 10, marginBottom: 10 , alignContent:'space-between'}}>
                                                <TouchableHighlight
                                                    style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}
                                                    onPress={() => {
                                                        this.setUnRegisterVisible(!this.state.unRegisterVisible);
                                                        this.unRegister();
                                                    }}>
                                                    <Text style={{ fontSize: 18 }}>  unsign</Text>
                                                </TouchableHighlight>
                                                <TouchableHighlight
                                                    style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}
                                                    onPress={() => {
                                                        this.setUnRegisterVisible(!this.state.unRegisterVisible);

                                                    }}>
                                                    <Text style={{ fontSize: 18 }}>cancle  </Text>
                                                </TouchableHighlight>
                                            </View>

                                        </View>
                                    </Modal>
                                </View>
                    </ScrollView>
                </View >
            </ImageBackground >
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
});

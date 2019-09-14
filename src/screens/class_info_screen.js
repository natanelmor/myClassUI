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
import Feed from './feed_screen'
import {AntDesign, MaterialCommunityIcons} from '@expo/vector-icons';
import { withNavigation } from 'react-navigation';
import LargeHeading from '../components/LargeHeading';
import CoverImage from '../components/CoverImage';

class class_info_screen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            appState: AppState.currentState,
            totalTime: 0,
            start: 0,
            curr: 0,
            timer: null,
            startDisable: false,
            participants: [],
            name: null,
            icon: null,
            user: this.props.navigation.getParam('user'),
            id: this.props.navigation.getParam('key'),
            teacher: null,
            time: [],
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
            grades: null,
            modalVisible: false,
            startAttendance: false,
            unRegisterVisible: false,
        }

        this.startTimer = this.startTimer.bind(this);
        this.stopTimer = this.stopTimer.bind(this);
        this.getTimeString = this.getTimeString.bind(this);
    }

    componentDidMount() {
       // this.focusListener = this.props.navigation.addListener('didFocus', () => {
       // });
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
            })
            .catch(err => {
                console.log(err);
            });
        this.startTimer();
        AppState.addEventListener('change', this._handleAppStateChange);
                   // console.log('missing params in class info:   ');
           // console.log(this.state);
    }

    componentWillUnmount() {
        AppState.removeEventListener('change', this._handleAppStateChange);
        this.updateAttendance();
        clearInterval(this.state.timer);
        //this.focusListener.remove();
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
       // console.log("stop: ", this.getTimeString(this.state.totalTime))
    }

    startTimer() {
        let timer = setInterval(() => {
           this.setState({
           start: this.state.start + 1,
           curr: this.state.start + this.state.totalTime
           });
       }, 1000);
       this.setState({ timer });
       
       this.setState({ startDisable: true });
       //console.log("start: ", this.getTimeString(this.state.totalTime))
   }

   _handleAppStateChange = (nextAppState) => {
        if (this.state.appState.match(/background/) && nextAppState === 'active') {
            this.startTimer();
        } else {
            this.stopTimer();
        }
        this.setState({ appState: nextAppState });
    }

    updateAttendance() {
        this.state.user.attendance.push({
            "class_id": "" + this.state.id,
            "date": Date.now(),
            "time": Math.floor(this.state.totalTime / 60 )});
        axios.patch('https://myclass-backend.herokuapp.com/user?email=' + this.state.user.email, this.state.user)
            .then(response => {}).catch(e => { console.log(e); });
    }

    unRegister() {
        let passClass = this.state.class;
        let index = this.state.user.classes.indexOf(this.state.id);
        console.log('index: ' + index);
        //console.log('classes: '+ this.state.user.classes);
        console.log('user before : ');
        console.log(this.state.user);

        if (index !== -1) {
            this.state.user.classes.splice(index, 1);
            axios.patch('https://myclass-backend.herokuapp.com/user?email=' + this.state.user.email, this.state.user);
        }
      //  console.log('classes: ' + this.state.user.classes);
        console.log('user after: ');
        console.log(this.state.user);
       
        index = -1;
        index = passClass.students.indexOf(this.state.user.email);
        console.log('index: ' + index);
        console.log('students before: ');
        console.log(passClass.students);

        if (index !== -1) {
            passClass.students.splice(index, 1);
            axios.patch('https://myclass-backend.herokuapp.com/class?id=' + this.state.id, passClass);
        }
        console.log('students after: ');
        console.log(passClass.students);
        //console.log(this.state.participants);

      //  console.log(this.state.participants);

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
        return (
                <DisplayGrade
                    data={this.state.grades}
                    id={this.state.id}
                />
        );
    }

    renderUnRegisterPopUp() {
        return (
            <Text>Are you sure you bitch?</Text>
            );

    }

    renderTools() {
        return (
            <View>
            <LargeHeading>Tools</LargeHeading>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 15 }}>
                <TouchableOpacity style={styles.card_container} onPress={() => this.props.navigation.navigate('QuizIndex', { id: this.state.id, user: this.state.user, quizes: this.state.quizes })}>
                <Image source={require('../../assets/back_card.jpg')} style={styles.card_background} resizeMode="cover" />
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
                <View style={{ flex: 1, backgroundColor: '#fff', marginTop: 15 }} >
                    <CoverImage />
                    <ScrollView showsVerticalScrollIndicator={false}>

                        <View>{this.renderClassInfo()}</View>
                        <View>{this.renderTools()}</View>
                        <View>{this.renderResources()}</View>
                        <View>{this.renderParticipants()}</View>
                        <View style={{ flex: 1 }}>
                            <Modal
                                scroll inside the modal
                                isVisible={this.state.modalVisible}
                            >
                                <View 
                                    style={{
                                        backgroundColor: '#f0f8ff', 
                                        borderRadius: 15,
                                        height: 500 }}
                                >
                                    <View style={styles.headerStyle}>
                                        <Text style={styles.headerTextStyle}>Grades</Text>
                                    </View>
                                    <ScrollView
                                        showsVerticalScrollIndicator={false}
                                        nestedScrollEnabled
                                    >
                                        <View>
                                            {this.renderGrades()}
                                        </View>
                                    </ScrollView>
                                    <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', marginTop: 15, marginRight: 10, marginBottom: 10 }}>
                                        <TouchableHighlight
                                            style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}
                                            onPress={() => {
                                                this.setModalVisible(!this.state.modalVisible);
                                            }}
                                        >
                                            <Text style={{ fontSize: 18 }}>Close</Text>
                                        </TouchableHighlight></View>
                                </View>
                            </Modal>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Modal scroll inside the modal isVisible={this.state.startAttendance}>
                                <View style={{ backgroundColor: '#f0f8ff', borderRadius: 15, height: 500 }}>
                                    <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', marginTop: 15, marginRight: 10, marginBottom: 10 }}>
                                    <Text style={{ fontSize: 18 }}>Time in class: {this.getTimeString(this.state.curr)}</Text>
                                        <TouchableHighlight
                                            style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}
                                            onPress={() => { this.setStartAttendanceVisible(!this.state.startAttendance); }}
                                        >
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
                                        style={{ width: 100,
                                        height: 50 }}
                                        source={{ uri: 'http://www.clker.com/cliparts/O/6/3/C/g/l/cancel-button-hi.png' }}
                                    />
                                </View>
                            </TouchableOpacity>
                        </View>
                                <View style={{ flex: 1 }}>
                                    <Modal scroll inside the modal isVisible={this.state.unRegisterVisible}>
                                        <View 
                                            style={{
                                                backgroundColor: '#f0f8ff', 
                                                borderRadius: 15,
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
                                            <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', flexDirection: 'row', marginTop: 15, marginRight: 10, marginBottom: 10, alignContent: 'space-between' }}>
                                                <TouchableHighlight
                                                    style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}
                                                    onPress={() => {
                                                        this.setUnRegisterVisible(!this.state.unRegisterVisible);
                                                        this.unRegister();
                                                    }}
                                                >
                                                    <Text style={{ fontSize: 18 }}>  unsign</Text>
                                                </TouchableHighlight>
                                                <TouchableHighlight
                                                    style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}
                                                    onPress={() => {
                                                        this.setUnRegisterVisible(!this.state.unRegisterVisible);
                                                    }}
                                                >
                                                    <Text style={{ fontSize: 18 }}>cancle</Text>
                                                </TouchableHighlight>
                                            </View>

                                        </View>
                                    </Modal>
                                </View>
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
        marginRight:15
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
});

export default withNavigation(class_info_screen);

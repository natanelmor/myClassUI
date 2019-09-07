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
    AppState,
} from 'react-native';
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

        this.state = {
           // user : this.props.navigation.getParam('user'),
           // id : this.props.navigation.getParam('key'),
            appState: AppState.currentState,
            totalTime: null,
            start: null,
            messages: [
                { content: 'Welcome!' },
                { content: 'Education is the movement from darkness to light.\n ~Allan Bloom~' },
                { content: 'I wish you to be inspired by the school,  \n \n to explore things with curiosity and the eyes wide open, \n \n to listen attentively and then you will discover a whole new world!' },
                { content: 'Be successful and have a lot fun at school!' },
            ],
            participants: [],
            name: null,
            icon: null,
            id: null,
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
                { id: '9', type: 'link', source: '', name: 'Link' },
            ],
            grades: [
                { subject: 'Math', grade: '91' },
                { subject: 'Science', grade: '90' },
                { subject: 'Literature', grade: '82' },
                { subject: 'Sport', grade: '100' },
                { subject: 'Math1', grade: '91' },
                { subject: 'Science1', grade: '90' },
                { subject: 'Literature1', grade: '82' },
                { subject: 'Sport1', grade: '100' },
                { subject: 'Math2', grade: '91' },
                { subject: 'Science2', grade: '90' },
                { subject: 'Literature2', grade: '82' },
                { subject: 'Sport2', grade: '100' },
            ],
            quizes: 'https://play.kahoot.it/v2/lobby?quizId=ff490155-b7f8-40cc-92b3-4243b6b9487f',
            modalVisible: false,
        }
    }

    componentWillMount() {
        AppState.addEventListener('change', this._handleAppStateChange);
        axios.get('https://myclass-backend.herokuapp.com/class?id='+this.props.navigation.getParam('key'))
        .then(res => {
            this.setState({
                name: res.data.name,
                teacher: res.data.teacher,
                time: res.data.time[0].day + ' ' + res.data.time[0].from + ' - ' + res.data.time[0].until,
                location: res.data.location,
                icon: res.data.icon,
                participants: res.data.students
            });
    })
    .catch(err => {
      console.log(err);
    });
     }
    
    
      componentWillUnmount() {
        AppState.removeEventListener('change', this._handleAppStateChange);
      }
    
      _handleAppStateChange = (nextAppState) => {
        let newtime = null;
        if (
          this.state.appState.match(/inactive|background/) &&
          nextAppState === 'active'
        ) {
            this.setState({start: Date.now()});
        }
        else{
           newtime = (Date.now() -  this.state.start) + this.state.totalTime ;
           this.setState({totalTime: newtime});
        }
        this.setState({appState: nextAppState});
      };
      setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    renderGrades() {
        return (
            this.state.grades.map(grades =>
                <DisplayGrade
                    key={grades.subject}
                    grades={grades}
                />
            )
        )
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
        )
    }

    renderMessages() {
        return (
            <Messages
                messages={this.state.messages}
            />
        )
    }

    renderResources() {
        return (
            <ResourceFiles
                data={this.state.items}
            />
        )
    }

    renderParticipants() {
        return (
            <Participants
                data={this.state.participants}
            />
        )
    }

    render() {
        return (
            <ImageBackground
                source={require('../../assets/background.jpeg')}
                style={{ width: '100%', height: '100%' }}>
                <View>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                    >
                        <View>{this.renderClassInfo()}</View>
                        <View>{this.renderMessages()}</View>
                        <View>{this.renderResources()}</View>

                        <View style={{ flexDirection: 'row', }}>
                            <View style={{ flex: 1, alignSelf: 'flex-start' }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        Linking.openURL(this.state.quizes).catch((err) => console.error('An error occurred', err));
                                    }}>
                                    <View>
                                        <Image
                                            style={styles.classIcon}
                                            source={require('../../assets/credit-kahoot.png')}
                                        />
                                    </View>
                                </TouchableOpacity></View>

                            <View style={{ flex: 1, alignSelf: 'flex-end' }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.setModalVisible(!this.state.modalVisible);
                                    }}
                                >
                                    <View>
                                        <Image
                                            style={styles.classIcon}
                                            source={require('../../assets/grades-icon.png')}
                                        />
                                    </View>
                                </TouchableOpacity></View>
                        </View>

                        <View style={{ flex: 1 }}>

                            <Modal
                                scroll inside the modal
                                isVisible={this.state.modalVisible}
                            >
                                <View style={{
                                    backgroundColor: '#f0f8ff', borderRadius: 15,
                                    height: 500
                                }}>

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
                                            }}>
                                            <Text style={{ fontSize: 18 }}>Close</Text>
                                        </TouchableHighlight></View>

                                </View>
                            </Modal>
                        </View>

                        <View>{this.renderParticipants()}</View>
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
        flexDirection: 'row'
    },
    userIcon: {
        width: 50,
        height: 50,
        justifyContent: 'center'
    },
    classIcon: {
        width: 200,
        height: 200
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
        marginBottom: 5
    },
});
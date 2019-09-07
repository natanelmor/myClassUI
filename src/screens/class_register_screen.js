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


export default class class_register_screen extends Component {

    constructor(props) {
        super(props);

        user = this.props.navigation.getParam('user');

        this.state = {
            appState: AppState.currentState,
            totalTime: null,
            start: null,
            messages: [
                { content: 'hi man' },
                { content: 'Education is the movement from darkness to light.\n ~Allan Bloom~' },
                { content: 'soo if you want to sign up to this coure press register downs here' },
            ],
            name: null,
            icon: null,
            id: null,
            teacher: null,
            time: null,
            location: null,
            modalVisible: false,
        }
    }
    

    componentWillMount() {
        axios.get('https://myclass-backend.herokuapp.com/class?id='+this.props.navigation.getParam('key'))
        .then(res => {
            this.setState({
                class : res.data, 
                id: this.props.navigation.getParam('key'), 
                name: res.data.name,
                teacher: res.data.teacher,
                time: res.data.time[0].day + ' ' + res.data.time[0].from + ' - ' + res.data.time[0].until,
                location: res.data.location,
                icon: res.data.icon,
                
            });
        console.log(res.data);
        })

        .catch(err => {
        console.log(err);
        });
    }
    
    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }
    
    register(){
       
        user.classes.push(this.state.id);
        axios.patch('https://myclass-backend.herokuapp.com/user?email='+user.email, user);
        passClass = this.state.class;
        passClass.students.push(user.email);

        //this.setState({class : this.state.class.participants.push(user.email)});

        console.log(this.state.participants);
        axios.patch('https://myclass-backend.herokuapp.com/class?id='+this.state.id, passClass);

        this.props.navigation.navigate('my_profile',{user: user});
        
    }

    renderRegisterPopUp() {
        return (
            <Text>Are you sure you bitch?</Text>
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

                            <View style={{ flex: 1, alignSelf: 'flex-end' }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.setModalVisible(!this.state.modalVisible);
                                    }}
                                >
                                <View>
                                    <Image
                                        style={styles.classIcon}
                                        source={ {uri :'https://www.giraffelaugh.org/wp-content/uploads/2017/12/register-button.png'}}
                                    />
                                </View>
                                </TouchableOpacity>
                            </View>

                        <View style={{flex: 1 }}>
                            <Modal
                                scroll inside the modal
                                isVisible={this.state.modalVisible}
                            >
                                <View style={{
                                    backgroundColor: '#f0f8ff', borderRadius: 15,
                                    height: 500
                                }}
                                >

                                <View style={styles.headerStyle}>
                                    <Text style={styles.headerTextStyle}>praivacy</Text>
                                </View>
                                <ScrollView
                                    showsVerticalScrollIndicator={false}
                                    nestedScrollEnabled
                                >
                                    <View>
                                        {this.renderRegisterPopUp()}
                                    </View>
                                </ScrollView>
                                <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end' , flexDirection: 'row', marginTop: 15, marginRight: 10, marginBottom: 10 , alignContent:'space-between'}}>
                                    <TouchableHighlight
                                        style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}
                                        onPress={() => {
                                            this.setModalVisible(!this.state.modalVisible);
                                            this.register();
                                        }}>
                                        <Text style={{ fontSize: 18 }}>  sign</Text>
                                    </TouchableHighlight>
                                    <TouchableHighlight
                                        style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}
                                        onPress={() => {
                                            this.setModalVisible(!this.state.modalVisible);
                                            
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
        flexDirection: 'row'
    },
    userIcon: {
        width: 50,
        height: 50,
        justifyContent: 'center'
    },
    classIcon: {
        width: 200,
        height: 100
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
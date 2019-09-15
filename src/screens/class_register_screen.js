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
import globalStyle from '../style'
import { LinearGradient} from 'expo-linear-gradient';


export default class class_register_screen extends Component {

    constructor(props) {
        super(props);

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
            registerVisible: false,
            user: this.props.navigation.getParam('user'),
        };
    }


    componentWillMount() {
        axios.get('https://myclass-backend.herokuapp.com/class?id='+this.props.navigation.getParam('key'))
        .then(res => {
            this.setState({
                class : res.data,
                id: this.props.navigation.getParam('key'),
                name: res.data.name,
                teacher: res.data.teacher,
                time: res.data.time,
                location: res.data.location,
                icon: res.data.icon,

            });
        })

        .catch(err => {
        console.log(err);
        });
    }

    setRegisterVisible(visible) {
        this.setState({ registerVisible: visible });
    }

    setUnRegisterVisible(visible) {
        this.setState({ unRegisterVisible: visible });
    }

    register() {
        this.state.user.classes.push(this.state.id);
        axios.patch('https://myclass-backend.herokuapp.com/user?email=' + this.state.user.email, this.state.user);

        this.state.class.students.push(this.state.user.email);

 
        axios.patch('https://myclass-backend.herokuapp.com/class?id=' + this.state.id, this.state.class);

        this.props.navigation.navigate('my_profile', { user: this.state.user });

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
    <View style={globalStyle.container}>
    <ScrollView style={globalStyle.scrollContainer}>
      <LinearGradient
        style={globalStyle.header}
        colors={['#6F86D6', '#48C6EF']}
        start={{ x: 0.0, y: 0.25 }}
        end={{ x: 0.5, y: 1.0 }}
      />
        <View style={globalStyle.marginTopValue}>
       {this.renderClassInfo()}
        {this.renderMessages()}
        </View>
      <TouchableOpacity onPress={() => {this.register()}}>
         <View>
            <Image
                style={globalStyle.largeImage}
                source={ {uri :'https://www.giraffelaugh.org/wp-content/uploads/2017/12/register-button.png'}}/>
        </View>
        </TouchableOpacity>
 
    </ScrollView>
  </View>
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
        top: 20,
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

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
    Dimensions,
} from 'react-native';
import { Linking } from 'expo';


export default class class_info_screen extends Component {

    constructor(props) {
        super(props);


        this.state = {
            messages: 'Welcome! \n \n Education is the movement from darkness to light.\n ~Allan Bloom~ \n \n I wish you to be inspired by the school,  \n \n to explore things with curiosity and the eyes wide open, \n \n to listen attentively and then you will discover a whole new world! \n \n \n Be successful and have a lot fun at school!',
            participants: [
                { name: 'student #1' },
                { name: 'student #2' },
                { name: 'student #3' },
                { name: 'student #4' },
                { name: 'student #5' },
                { name: 'student #6' },
                { name: 'student #7' },
                { name: 'student #8' },
                { name: 'student #9' },
            ],
            name: 'Science',
            icon: require('../../assets/science.jpg'),
            id: '1111',
            teacher: 'classTeacher',
            time: 'Sun, 9:00',
            location: 'classLocation',
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
            quizes: 'https://play.kahoot.it/v2/lobby?quizId=ff490155-b7f8-40cc-92b3-4243b6b9487f',

        }
    }

    render() {
        return (
            <View>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.container} >
                        <View>
                            <Image
                                style={styles.classIcon}
                                source={require('../../assets/classIcon.jpeg')}
                            /></View>
                        <View style={{ alignItems: 'flex-start' }}>
                            <Image
                                style={styles.userIcon}
                                source={this.state.icon}
                            />
                            <Text style={{ fontSize: 25 }}>{this.state.name}</Text>
                            <Text>Time: {this.state.time}</Text>
                            <Text>Location:</Text>
                            <Text>{this.state.location}</Text>
                            <Text>Teacher:</Text>
                            <Text>{this.state.teacher}</Text>
                        </View>
                    </View>

                    <View style={styles.containerMessages}>
                        <TextInput
                            multiline={true}
                            scrollEnabled
                            style={styles.messageInput}
                            value={this.state.messages}
                        />
                    </View>

                    <View style={styles.containerFiles}>
                        <Text style={styles.textStyle}>Resources</Text>
                        <FlatList
                            numColumns={4}
                            keyExtractor={(file) => file.id}
                            data={this.state.items}
                            renderItem={({ item }) => {
                                icon = (item.type) === 'file' ? require('../../assets/fileIcon.jpeg') : require('../../assets/linkIcon.jpeg')
                                return (
                                    <View style={{ height: 75, width: 75 }}>
                                        <TouchableOpacity>
                                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                                <Image
                                                    style={styles.userIcon}
                                                    source={icon}
                                                />
                                                <Text>{item.name}</Text></View>
                                        </TouchableOpacity>
                                    </View>
                                );
                            }}
                        />
                    </View>

                    <View style={{ flexDirection: 'row', }}>
                        <View style={{ flex: 1, alignSelf: 'flex-start' }}>
                            <TouchableOpacity
                                onPress={() => {
                                    Linking.openURL(this.state.quizes).catch((err) => console.error('An error occurred', err));
                                }}>
                                <View>
                                    <Image
                                        style={styles.classIcon}
                                        source={require('../../assets/credit-kahoot.jpeg')}
                                    />
                                </View>
                            </TouchableOpacity></View>
                        <View style={{ flex: 1, alignSelf: 'flex-end' }}>
                            <TouchableOpacity>
                                <View>
                                    <Image
                                        style={styles.classIcon}
                                        source={require('../../assets/grades-icon.jpeg')}
                                    />
                                </View>
                            </TouchableOpacity></View>
                    </View>

                    <View>
                        <Text style={styles.textStyle}>class info</Text>
                    </View>


                    <TouchableOpacity>
                        <Text style={styles.textStyle}>Participants</Text>
                    </TouchableOpacity>
                    <View>
                        <FlatList
                            keyExtractor={(student) => student.name}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            data={this.state.participants}
                            renderItem={({ item }) => {
                                return (
                                    <View>
                                        <View style={styles.container}>
                                            <Image
                                                style={styles.userIcon}
                                                source={require('../../assets/user.jpeg')}
                                            /></View>
                                        <Text style={styles.textStyle}>{item.name}</Text></View>
                                );
                            }}
                        />
                    </View>
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
        alignItems: 'center',
        backgroundColor: '#c3c4be'
    },
    containerMessages: {
        borderWidth: 4,
        borderColor: 'black',
        backgroundColor: '#92f7e5'
    },
    messageInput: {
        height: 150,

        margin: 10,
        textAlignVertical: 'top'
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
    }
});
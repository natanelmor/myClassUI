import React from 'react';
import { View, StyleSheet, Text, ScrollView, FlatList } from 'react-native';
import globalStyle from '../style'
import { LinearGradient} from 'expo-linear-gradient';
import componentStyle from './style'

const Messages = (props) => {
    return (
        <View style={[globalStyle.profileCard, globalStyle.padding20]}>
                    <FlatList
                        keyExtractor={(message) => message.content}
                        showsVerticalScrollIndicator
                        data={props.messages}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => {
                            return (
                                <View><Text style={componentStyle.conversationText}>{item.content + '\n'}</Text></View>
                            );
                        }}/>

            </View>
    )
}

const styles = StyleSheet.create({
    containerMessages: {
        height: 180,
    },
    messageInput: {
        flex: 1,
        margin: 10,
        height: 180
    },
    textStyle: {
        marginHorizontal: 15,
        fontSize: 25,
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff8dc',
        fontWeight: 'bold'
    },
    headerStyle: {
        backgroundColor: '#696969',
        borderRadius: 5
    },
});

export default Messages;
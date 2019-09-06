import React from 'react';
import { View, StyleSheet, Text, ScrollView, FlatList } from 'react-native';

const Messages = (props) => {
    return (
        <View>
            <View style={styles.headerStyle}><Text style={styles.textStyle}>Messages</Text></View>
            <View style={styles.containerMessages}><View style={styles.messageInput}>
                <ScrollView
                    nestedScrollEnabled
                    showsVerticalScrollIndicator={false}
                >
                    <FlatList
                        keyExtractor={(message) => message.content}
                        showsVerticalScrollIndicator
                        data={props.messages}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => {
                            return (
                                <View><Text style={{ fontSize: 16 }}>{item.content + '\n'}</Text></View>
                            );
                        }}
                    /></ScrollView>
            </View></View></View>
    )
}

const styles = StyleSheet.create({
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
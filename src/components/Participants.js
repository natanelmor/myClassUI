import React from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import LargeHeading from './LargeHeading'

const Participants = (props) => {
    return (
        <View>
                <LargeHeading>Students</LargeHeading>          
            <View>
                <FlatList
                    keyExtractor={(student) => student}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={props.data}
                    renderItem={({ item }) => {
                        return (
                            <View>
                                <View style={styles.container}>
                                    <Image
                                        style={styles.userIcon}
                                        source={require('../../assets/user.png')}
                                    /></View>
                                <Text style={styles.nameStyle}>{item}</Text></View>
                        );
                    }}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    nameStyle: {
        marginHorizontal: 15,
        fontSize: 15,
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 'bold'
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
        borderRadius: 5,
        marginBottom: 5
    },
    userIcon: {
        width: 50,
        height: 50,
        justifyContent: 'center'
    }
});

export default Participants;
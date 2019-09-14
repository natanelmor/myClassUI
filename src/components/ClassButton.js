import React from 'react';
import {Text, StyleSheet, View, TouchableOpacity, Image, FlatList } from 'react-native';
import {withNavigation} from 'react-navigation';

const ClassButton = (props)=> {
    const {name , icon, _id, time, location, teacher} = props.myclass;
    const next = props.nextPage;
    //console.log(time);

    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return (
        <View>
            <TouchableOpacity
                onPress ={() => props.navigation.navigate(next, { key: _id , user : props.user})}
                >
                <View style={{height: 100, backgroundColor: '#e6e6fa', flexDirection: 'row',
                borderRadius: 5, marginBottom: 2}}>
                    <View style={{width: 120 ,marginLeft: 20, justifyContent: 'center',}}>
                        <Image
                          style={{width: 50, height: 50}}
                          source={{uri: icon}}
                        />
                        <Text style={{fontSize: 18, fontWeight: 'bold',}}> {name} </Text>
                    </View>
                    <View>
                    <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 15 }}>
                      <FlatList
                          keyExtractor={(time) => time._id}
                          data={time}
                          renderItem={({ item }) => {
                              return (
                                <View style={{justifyContent: 'center', alignSelf: 'center' }}><Text>{days[item.day - 1]}, {item.from} - {item.until}</Text></View>
                              )}}
                      />
                      <View style={{justifyContent: 'center', alignSelf: 'center' }}><Text>{location}</Text></View></View>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
        );
};

const styles = StyleSheet.create({
    touchOp: {
        alignItems: 'center',
        fontSize: 30,
        backgroundColor: '#e6e6fa',
        padding: 10,
        elevation: 2,
        justifyContent: 'center',
        flexWrap: 'nowrap'
    },
    container: {
        alignItems: 'center',
        flexDirection: 'column',
        height: 100,
        width: 100,
    },
});

export default withNavigation(ClassButton);

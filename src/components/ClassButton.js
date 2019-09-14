import React from 'react';
import {Text, StyleSheet, View, TouchableOpacity, Image, FlatList } from 'react-native';
import {withNavigation} from 'react-navigation';
import globalStyle from '../style'

const ClassButton = (props)=> {
    const {name , icon, _id, time, location, teacher} = props.myclass;
    const next = props.nextPage;
    //console.log(time);

    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return (
            <TouchableOpacity style={globalStyle.listItem} underlayColor="#f1f1f1"
                onPress ={() => props.navigation.navigate(next, { key: _id , user : props.user})}>
                <View>
                <View style={globalStyle.row}>
                        <Image style={globalStyle.thumb} source={{uri: icon}}/>
                        <View style={globalStyle.text}>
                        <Text style={[globalStyle.name]}> {name} </Text>
                </View>
              </View>
            </View>
            </TouchableOpacity>
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

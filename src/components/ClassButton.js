import React from 'react';
import {Text, StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import {withNavigation} from 'react-navigation';

const ClassButton = (props)=> {
    const {name , icon, _id} = props.myclass;
    const next = props.nextPage;
    return (
        <View>
            <TouchableOpacity
                onPress ={() => props.navigation.navigate(next, { key: _id , user : props.user})}
                >
                <View style={{height: 100, backgroundColor: 'skyblue', alignSelf: 'stretch', flexDirection: 'row',
                borderRadius: 5, marginBottom: 2}}>
                    <View style={{width: 120 ,marginLeft: 20, justifyContent: 'center',}}>
                        <Image
                          style={{width: 50, height: 50}}
                          source={{uri: icon}}
                        />
                        <Text style={{fontSize: 18, fontWeight: 'bold',}}> {name} </Text>
                    </View>
                    <View style={{ alignSelf: 'center', marginLeft: 10}}>
                      <Text>Time:  - </Text>
                      <Text>Location: </Text>
                      <Text>Teacher: </Text>
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
        backgroundColor: '#DDDDDD',
        padding: 10,
        backgroundColor: '#fff',
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

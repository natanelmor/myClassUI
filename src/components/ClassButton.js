import React from 'react';
import {Text, StyleSheet, View, TouchableOpacity, Image } from 'react-native';


const ClassButton = (props)=> {
    return (
        <View style={styles.container}>
            <TouchableOpacity 
                style={styles.touchOp}
                onPress ={() => props.navigation.navigate('class_info')}>
                <Image 
                    style={{width: 50, height: 50}}
                    source={props.imageSource}
                />
                <Text> {props.title} </Text>
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

    },
    container: {
        alignItems: 'center',
        flexDirection: 'column',
        height: 100,
        width: 100,
    },
}); 

export default ClassButton;
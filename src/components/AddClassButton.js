import React from 'react';
import {Text, StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import{Feather} from '@expo/vector-icons';

const AddClassButton = ({navigation})=> {
    return (
        <View style={styles.container}>
            <TouchableOpacity 
            style={styles.touchOp} 
            onPress ={() => navigation.navigate('add_class') }>
                <Feather name ="plus"/>
                <Text> add class </Text>
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

export default AddClassButton;
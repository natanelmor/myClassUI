import React from 'react';
import {StyleSheet, View, ImageBackground } from 'react-native';
import AddClassButton from '../components/AddClassButton';
import ClassesList from '../components/ClassesList';


const my_classes_screen = ({navigation}) => {
    const passUser = navigation.getParam('user');


    return (
        <View style={styles.container}>
            <ClassesList user= {passUser}/>
            <AddClassButton user= {passUser}/>
        </View>
        );
};

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: '#e6e6fa',
        alignItems: 'center',
        flexDirection: 'column',
        top: 20,
    },

}); 

export default my_classes_screen;
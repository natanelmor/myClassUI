import React from 'react';
import {Text, StyleSheet, View, ImageBackground } from 'react-native';
import ClassButton from '../components/ClassButton';
import AddClassButton from '../components/AddClassButton';
import ClassesList from '../components/ClassesList';


const my_classes_screen = ({navigation}) => {
    return (
        <ImageBackground
      source= {require('../../assets/background.jpeg')} 
      style={{width:'100%', height:'100%' }}>
        <View style={styles.container}>
            <ClassesList />
            <AddClassButton />
        </View>
        </ImageBackground>
        );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flexDirection: 'column',
       // backgroundColor : '../../assets/green-school-board-background.jpg',
    },

}); 

export default my_classes_screen;
import React from 'react';
import {Text, StyleSheet, View, ImageBackground } from 'react-native';
import ClassButton from '../components/ClassButton';
import AddClassButton from '../components/AddClassButton';

const my_classes_screen = ({navigation}) => {
    return (
        <ImageBackground source= {require('../../assets/green-school-board-background.jpg')} 
            style={{width:'100%', height:'100%' }}
             
             >
        <View style={styles.container}>
            
            <ClassButton
                navigation={navigation}
                title="bible" 
                imageSource={require('../../assets/bible.png')}/>
            <ClassButton
                navigation={navigation} 
                title="math" 
                imageSource={require('../../assets/math.png')}/>
            <ClassButton 
                navigation={navigation}
                title="science" 
                imageSource={require('../../assets/science.jpg')}/>
            <ClassButton 
                navigation={navigation}
                title="sport" 
                imageSource={require('../../assets/sport.png')}/>
            <AddClassButton navigation={navigation}/>

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
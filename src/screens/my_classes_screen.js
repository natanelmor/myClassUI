import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import ClassButton from '../components/ClassButton';
import AddClassButton from '../components/AddClassButton';

const my_classes_screen = ({navigation})=> {
    return (
        <View style={styles.container}>
            <ClassButton
                title="bible" 
                imageSource={require('../../assets/bible.png')}/>
            <ClassButton 
                title="math" 
                imageSource={require('../../assets/math.png')}/>
            <ClassButton 
                title="science" 
                imageSource={require('../../assets/science.jpg')}/>
            <ClassButton 
                title="sport" 
                imageSource={require('../../assets/sport.png')}/>
            <AddClassButton navigation={navigation}/>

        </View>
        );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flexDirection: 'column',
    },

}); 

export default my_classes_screen;
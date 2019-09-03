import React, { useState } from 'react';
import {Text, StyleSheet, View} from 'react-native';
import ClassButton from '../components/ClassButton';
import SearchBar from '../components/SearchBar';

const add_classes_screen_student = () => {
    const [term, setTerm] = useState('') ;
    const [results , setResults] = useState([]) ;

   // const searchApi= async () => {

    //}


    return (
       <View>
       <View>
           <SearchBar 
                term={term} 
                onTermChange ={(newTerm) => setTerm(newTerm)} 
                onTermSubmit={()=> console.log('term was submitted')}
                />
            <Text>we found {results.length}</Text>
        </View>
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
        </View>
        </View>
        );
};

const styles = StyleSheet.create({

}); 

export default add_classes_screen_student;
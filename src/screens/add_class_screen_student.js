import React, { useState } from 'react';
import {Text, StyleSheet, View} from 'react-native';
import ClassButton from '../components/ClassButton';
import SearchBar from '../components/SearchBar';
import AllClassesList from '../components/AllClassesList'

const add_classes_screen_student = (props) => {
    const myUser = props.navigation.getParam('user');

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
        <AllClassesList user= {myUser}/>
        </View>
        </View>
        );
};

const styles = StyleSheet.create({

}); 

export default add_classes_screen_student;
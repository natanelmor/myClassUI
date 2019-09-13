import React, { useState } from 'react';
import {Text, StyleSheet, View, ScrollView, Dimensions} from 'react-native';
import ClassButton from '../components/ClassButton';
import SearchBar from '../components/SearchBar';
import AllClassesList from '../components/AllClassesList';
import CoverImage from '../components/CoverImage';


const add_classes_screen_student = (props) => {
    const myUser = props.navigation.getParam('user');

    const [term, setTerm] = useState('') ;
    const [results , setResults] = useState([]) ;
    var height = Dimensions.get('window').height;
   // const searchApi= async () => {

    //}


    return (
      <View style={{ flex: 1, backgroundColor: '#fff', flexDirection:'column' }}>
        <CoverImage/>
           <SearchBar
                term={term}
                onTermChange ={(newTerm) => setTerm(newTerm)}
                onTermSubmit={()=> console.log('term was submitted')}
                />

        <ScrollView
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}>
        <AllClassesList user= {myUser}/></ScrollView>
        </View>
 
        );
};

const styles = StyleSheet.create({
  container: {

  }
});

export default add_classes_screen_student;

import React, { useState } from 'react';
import {Text, StyleSheet, View, ScrollView, Dimensions} from 'react-native';
import ClassButton from '../components/ClassButton';
import SearchBar from '../components/SearchBar';
import AllClassesList from '../components/AllClassesList';
import CoverImage from '../components/CoverImage';
import globalStyle from '../style'
import { LinearGradient} from 'expo-linear-gradient';


const add_classes_screen_student = (props) => {
    const myUser = props.navigation.getParam('user');

    const [term, setTerm] = useState('') ;
    const [results , setResults] = useState([]) ;
    var height = Dimensions.get('window').height;
   // const searchApi= async () => {

    //}
    return (
    <View style={globalStyle.container}>
    <ScrollView style={globalStyle.scrollContainer}>
      <LinearGradient
        style={globalStyle.header}
        colors={['#6F86D6', '#48C6EF']}
        start={{ x: 0.0, y: 0.25 }}
        end={{ x: 0.5, y: 1.0 }}
      >
        <View style={globalStyle.titleContainer}>
          <Text style={globalStyle.title}> Choose Class </Text>
        </View>
      </LinearGradient>
      <View style={globalStyle.marginTopValue}>
        <AllClassesList user={myUser} />
      </View>
    </ScrollView>
  </View>
  )

};

const styles = StyleSheet.create({
  container: {

  }
});

export default add_classes_screen_student;

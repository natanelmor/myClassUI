import React from 'react';
import { Text, StyleSheet, View, Button, TouchableOpacity, ImageBackground, Image} from 'react-native';
import { setRecoveryProps } from 'expo/build/ErrorRecovery/ErrorRecovery';


const my_profile_screen = ({navigation}) => {
  return (
    <ImageBackground
      source= {require('../../assets/background.jpeg')} 
      style={{width:'100%', height:'100%' }}>
  <View style={styles.container}>
    <Image source={require('../../assets/logo.png')}/>
    <Text style={styles.text}>My Profile</Text>
    <TouchableOpacity style={styles.touchOp} onPress ={() => navigation.navigate('my_classes') }  >
      <Text>classes </Text>
    </TouchableOpacity>
  </View>
  </ImageBackground>
  )
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30
  },
  touchOp: {
    
    fontSize: 30,   
    backgroundColor: '#fff',
    elevation: 2, 
    height: 50,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  container: {
    alignItems: 'center',
  }
  

});

export default my_profile_screen;

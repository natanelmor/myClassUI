import React from 'react';
import { Text, StyleSheet, View, Button, TouchableOpacity} from 'react-native';
import { setRecoveryProps } from 'expo/build/ErrorRecovery/ErrorRecovery';


const my_profile_screen = ({navigation}) => {
  return (
  <View style={styles.container}>
    <Text style={styles.text}>My Profile</Text>
    <TouchableOpacity style={styles.touchOp} onPress ={() => navigation.navigate('my_classes') }  >
      <Text>classes </Text>
    </TouchableOpacity>
  </View>
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

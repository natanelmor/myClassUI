import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity, ImageBackground, Image} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import AddClassButton from '../components/AddClassButton';
import ClassesList from '../components/ClassesList';
import { Row, Col } from 'native-base';


const my_profile_screen = ({navigation}) => {
  const passUser = navigation.getParam('user');

  return (
    <ImageBackground
      source= {require('../../assets/background.jpeg')} 
      style={{width:'100%', height:'100%' }}>
    <View style={styles.container}>
    <Image source={require('../../assets/logo.png')}/>
    <Text style={styles.text}>Hello {passUser.name}!</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.classes}>
            <ClassesList user= {passUser}/>
            <AddClassButton user= {passUser}/>
        </View>
        <TouchableOpacity style={styles.touchOp} onPress ={() => navigation.navigate('my_classes',{ user : passUser} ) }  >
          <Text>classes </Text>
        </TouchableOpacity>
      </ScrollView>
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
    flexDirection: 'column'
  }
});

export default my_profile_screen;

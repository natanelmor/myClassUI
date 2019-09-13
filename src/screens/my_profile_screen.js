import React, { Component } from 'react';
import { Text, StyleSheet, View, ScrollView, ImageBackground, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';
import ClassesList from '../components/ClassesList';
import AddClassButton from '../components/AddClassButton';
import { withNavigation } from 'react-navigation';
import{Feather} from '@expo/vector-icons';
import CoverImage from '../components/CoverImage';

class my_profile_screen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.navigation.getParam('user'),
      date: new Date(),
      nextClass: ""
    }


  }

  componentDidMount() {
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
     // console.log('rerendr: ');
      axios.get('https://myclass-backend.herokuapp.com/classesOfUser?email='+this.state.user.email)
        .then(response => {
          this.setState({nextClass: response.data });
        });
        //console.log(this.statenextClass);
    });
  }

  componentWillUnmount() {
    this.focusListener.remove();
}

  renderUserInfo() {
    return (
      <userInfo
        picture={this.state.user.picture}
      />
    )
  }

  renderJoinClass() {
    return (
      <View></View>
    )
  }

  renderMyClasses() {
    return (
      <View></View>
    )
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.container}>
        <CoverImage/>
        <Image source={require('../../assets/logo.png')}/>
      </View>
      <View style={{marginLeft: 10, width: 300}}>
          <View style={{marginLeft: 40}}><Image
              style={styles.userIcon}
              source={require('../../assets/user.png')}
          /></View></View>
      <View style={{marginLeft: 20, flexDirection: 'row'}}>
      <Text style={styles.text}>Hello {this.state.user.name}!</Text>
      </View>

      <View style={{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
      }}>
      <View style={{minHeight: '10%',
maxHeight: 350}}>
      <ScrollView
      nestedScrollEnabled
      showsVerticalScrollIndicator={false}>
      <ClassesList user= {this.state.user}/>
      </ScrollView></View>
      <View style={{height: 50, alignSelf: 'stretch'}}>
      <AddClassButton user= {this.state.user}/>
      </View></View>
      </View>
    )
  };
}

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    alignSelf: 'flex-start',
    fontWeight: 'bold',
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
    flexDirection: 'column',
    marginBottom: 10,
  },
  iconStyle:{
      fontSize: 20,
      color: 'rgba(100, 100, 100, 0.8)'
  },
  userIcon: {
      width: 70,
      height: 70,
  },
});

export default withNavigation(my_profile_screen);

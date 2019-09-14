import React, { Component } from 'react';
import { Text, StyleSheet, View, ScrollView, ImageBackground, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';
import ClassesList from '../components/ClassesList';
import AddClassButton from '../components/AddClassButton';
import { withNavigation } from 'react-navigation';
import{Feather} from '@expo/vector-icons';
import CoverImage from '../components/CoverImage';
import globalStyle from '../style'
import { LinearGradient} from 'expo-linear-gradient';

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
      axios.get('https://myclass-backend.herokuapp.com/classesOfUser?email='+this.state.user.email)
        .then(response => {
          this.setState({ nextClass: response.data });
        });
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
      <View style={globalStyle.container}>
        <ScrollView style={globalStyle.scrollContainer}>
          <LinearGradient
            style={globalStyle.header}
            colors={['#6F86D6', '#48C6EF']}
            start={{ x: 0.0, y: 0.25 }}
            end={{ x: 0.5, y: 1.0 }}
          >
            <View style={globalStyle.titleContainer}>
              <Text style={globalStyle.title}> Hello {this.state.user.name}! </Text>
            </View>
          </LinearGradient>
          <View style={globalStyle.marginTopValue}>
            <ClassesList user= {this.state.user}/>
            <AddClassButton user= {this.state.user}/>
          </View>
        </ScrollView>
      </View>
    )
  }
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

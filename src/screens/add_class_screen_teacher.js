import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  Image,
  Alert,
} from 'react-native';
import axios from 'axios';
import { withNavigation } from 'react-navigation';
import MultiSelectDays from '../components/MultiSelectDays';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import globalStyle from '../style'
import { LinearGradient} from 'expo-linear-gradient';
import componentStyle from '../components/style';
import AwesomeAlert from 'react-native-awesome-alerts';


class add_classes_screen_teacher extends Component {
    constructor(props) {
    super(props);
    this.state = {
        name: '',
        time: [],
        location: '',
        teacher: '',
        icon: '',
        sendTime: [],
        errmsg: '',
        showAlert: false,
    };

    this.onCreate = this.onCreate.bind(this);
    this.updateTimeFromSelectDay = this.updateTimeFromSelectDay.bind(this);
    this.passUser = this.props.navigation.getParam('user');
  }

  toggleAlert(visible){
   this.setState({ showAlert: visible });
 }

  onCreate = () => {
    const newClass = {
      name: this.state.name,
      time: this.state.sendTime,
      location: this.state.location,
      teacher: this.passUser.email,
      icon: 'https://static.thenounproject.com/png/22412-200.png',
    };

    if(this.state.name == '' || this.state.sendTime.length == 0 || this.state.location == ''){
      this.setState({errmsg: 'Enter class name, location and choose time'});
      this.toggleAlert(!this.state.showAlert);
    }
    else{
      axios.get('https://myclass-backend.herokuapp.com/classes')
          .then(res => {
            const classesName = res.data.filter((item) => item.name == this.state.name);
            if(classesName.length > 0){
              this.setState({errmsg: 'Class name is already used'});
              this.toggleAlert(!this.state.showAlert);
            }
            else{
              axios.post('https://myclass-backend.herokuapp.com/class', newClass)
              .catch((err) => {
                console.log(err);
              });
              let msg = 'Class ' + this.state.name + ' created successfully';
              Alert.alert('',msg);
              this.props.navigation.navigate('my_profile');
            }
          })
          .catch((err) => {
            console.log(err);
          });
  }
  }

  onSelectedItemsChange = (selectedItems) => {
    this.setState({ selectedItems });
  };
  onSelectedItemObjectsChange = (selectedItemObjects) => {
    this.setState({selectedItemObjects });
   }

  onConfirm() {
      const sendData = this.state.selectedItemObjects;
      this.updateTimeFromSelectDay(sendData);
      this.setState({selectedItemObjects: this.state.selectedItemObjects });


  }

  pushTime(currTime) {
    const obj= { 'day': currTime.day, 'from': currTime.from, 'until': currTime.until };
    this.state.sendTime.push(obj);
  }
  updateTimeFromSelectDay(timeArr) {
    this.setState({ time: timeArr });

    this.orderTime();
    }

  orderTime() {
    this.state.selectedItemObjects.map(currTime => this.pushTime(currTime));
  }

  render() {
    return (
      <View style={globalStyle.container}>
         <LinearGradient
          style={globalStyle.header}
          colors={['#6F86D6', '#48C6EF']}
          start={{ x: 0.0, y: 0.25 }}
          end={{ x: 0.5, y: 1.0 }}
        >
        <Image source={require('../../assets/logo.png')}/>
        </LinearGradient>


          <TextInput
              underlineColorAndroid="rgba(0,0,0,0)"
              style={[componentStyle.inputField, componentStyle.shadow]}
              placeholder="Class name"
              onChangeText={(name) => this.setState({ name })}
          />



          <TextInput
             underlineColorAndroid="rgba(0,0,0,0)"
             style={[componentStyle.inputField, componentStyle.shadow]}
              placeholder="Location"
              onChangeText={(location) => this.setState({ location })}
          />


        <View style={{width:'100%' }}>
        <SectionedMultiSelect style={[componentStyle.inputField, componentStyle.shadow]}
          items={items}
          uniqueKey="id"
          subKey="children"
          modalWithTouchable
          modalWithSafeAreaView
          selectText="Choose class time:"
          ref={SectionedMultiSelect  => this.SectionedMultiSelect = SectionedMultiSelect }
          showDropDowns={true}
          readOnlyHeadings={true}
          onSelectedItemsChange={this.onSelectedItemsChange}
          onSelectedItemObjectsChange={this.onSelectedItemObjectsChange}
          selectedItems={this.state.selectedItems}
          onConfirm={() => this.onConfirm()}

        />
      </View>


        <TouchableHighlight
         style={componentStyle.buttonBordered} underlayColor="#f1f1f1"
          onPress={() => this.onCreate('register')}
        >
          <Text style={componentStyle.buttonBorderedText}>Create Class</Text>
        </TouchableHighlight>
        <AwesomeAlert
            show={this.state.showAlert}
            showProgress={false}
            message={this.state.errmsg}
            closeOnTouchOutside={true}
            showConfirmButton={true}
            confirmText="ok"
            confirmButtonColor="#1e90ff"
            onConfirmPressed={() => {
              this.toggleAlert(!this.state.showAlert);
            }}
          />
      </View>
    );
  }

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
  },
  inputContainer: {
      borderBottomColor: '#F5FCFF',
      backgroundColor: '#FFFFFF',
      borderRadius: 10,
      borderBottomWidth: 1,
      width: 350,
      height: 45,
      marginBottom: 20,
      flexDirection: 'row',
      alignItems:'center'
  },
  inputs: {
      height: 45,
      marginLeft: 16,
      borderBottomColor: '#FFFFFF',
      flex: 1,
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginLeft: 15,
    justifyContent: 'center'
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
  },
  loginButton: {
    backgroundColor: '#00b5ec',
  },
  loginText: {
    color: 'white',
  }
});

export default withNavigation(add_classes_screen_teacher);

const items = [
  // this is the parent or 'item'
  {
    name: 'Sunday',
    id: 0,
    // these are the children or 'sub items'
    children: [
      {
        name: '8:00-10:00',
        id: 1,
        day: 1,
        from: '8:00',
        until: '10:00'
      },
      {
        name: '10:00-12:00',
        id: 2,
        day: 1,
        from: '10:00',
        until: '12:00'
      },
      {
        name: '12:00-14:00',
        id: 3,
        day: 1,
        from: '12:00',
        until: '14:00'
      },
      {
        name: '14:00-16:00',
        id: 4,
        day: 1,
        from: '14:00',
        until: '16:00'
      },
      {
        name: '16:00-18:00',
        id: 5,
        day: 1,
        from: '16:00',
        until: '18:00'
      },
      {
        name: '18:00-20:00',
        id: 6,
        day: 1,
        from: '18:00',
        until: '20:00'
      },
      {
        name: '20:00-22:00',
        id: 7,
        day: 1,
        from: '20:00',
        until: '22:00'
      },
    ],
  },
  {
    name: 'Monday',
    id: 10,
    // these are the children or 'sub items'
    children: [
      {
        name: '8:00-10:00',
        id: 11,
        day: 2,
        from: '8:00',
        until: '10:00'
      },
      {
        name: '10:00-12:00',
        id: 12,
        day: 2,
        from: '10:00',
        until: '12:00'
      },
      {
        name: '12:00-14:00',
        id: 13,
        day: 2,
        from: '12:00',
        until: '14:00'
      },
      {
        name: '14:00-16:00',
        id: 14,
        day: 2,
        from: '14:00',
        until: '16:00'
      },
      {
        name: '16:00-18:00',
        id: 15,
        day: 2,
        from: '16:00',
        until: '18:00'
      },
      {
        name: '18:00-20:00',
        id: 16,
        day: 2,
        from: '18:00',
        until: '20:00'
      },
      {
        name: '20:00-22:00',
        id: 17,
        day: 2,
        from: '20:00',
        until: '22:00'
      },
    ],

  },
  {
    name: 'Tuesday',
    id: 20,
    // these are the children or 'sub items'
    children: [
      {
        name: '8:00-10:00',
        id: 21,
        day: 3,
        from: '8:00',
        until: '10:00'

      },
      {
        name: '10:00-12:00',
        id: 22,
        day: 3,
        from: '10:00',
        until: '12:00'
      },
      {
        name: '12:00-14:00',
        id: 23,
        day: 3,
        from: '12:00',
        until: '14:00'
      },
      {
        name: '14:00-16:00',
        id: 24,
        day: 3,
        from: '14:00',
        until: '16:00'
      },
      {
        name: '16:00-18:00',
        id: 25,
        day: 3,
        from: '16:00',
        until: '18:00'
      },
      {
        name: '18:00-20:00',
        id: 26,
        day: 3,
        from: '18:00',
        until: '20:00'
      },
      {
        name: '20:00-22:00',
        id: 27,
        day: 3,
        from: '20:00',
        until: '22:00'
      },
    ],

  },
  {
    name: 'Whednesday',
    id: 30,
    // these are the children or 'sub items'
    children: [
      {
        name: '8:00-10:00',
        id: 31,
        day: 4,
        from: '8:00',
        until: '10:00'
      },
      {
        name: '10:00-12:00',
        id: 32,
        day: 4,
        from: '10:00',
        until: '12:00'
      },
      {
        name: '12:00-14:00',
        id: 33,
        day: 4,
        from: '12:00',
        until: '14:00'
      },
      {
        name: '14:00-16:00',
        id: 34,
        day: 4,
        from: '14:00',
        until: '16:00'
      },
      {
        name: '16:00-18:00',
        id: 35,
        day: 4,
        from: '16:00',
        until: '18:00'
      },
      {
        name: '18:00-20:00',
        id: 36,
        day: 4,
        from: '18:00',
        until: '20:00'
      },
      {
        name: '20:00-22:00',
        id: 37,
        day: 4,
        from: '20:00',
        until: '22:00'
      },
    ],

  },
  {
    name: 'Thursday',
    id: 40,
    // these are the children or 'sub items'
    children: [
      {
        name: '8:00-10:00',
        id: 41,
        day: 5,
        from: '8:00',
        until: '10:00'
      },
      {
        name: '10:00-12:00',
        id: 42,
        day: 5,
        from: '10:00',
        until: '12:00'
      },
      {
        name: '12:00-14:00',
        id: 43,
        day: 5,
        from: '12:00',
        until: '14:00'
      },
      {
        name: '14:00-16:00',
        id: 44,
        day: 5,
        from: '14:00',
        until: '16:00'
      },
      {
        name: '16:00-18:00',
        id: 45,
        day: 5,
        from: '16:00',
        until: '18:00'
      },
      {
        name: '18:00-20:00',
        id: 46,
        day: 5,
        from: '18:00',
        until: '20:00'
      },
      {
        name: '20:00-22:00',
        id: 47,
        day: 5,
        from: '20:00',
        until: '22:00'
      },
    ],

  },
  {
    name: 'Friday',
    id: 50,
    // these are the children or 'sub items'
    children: [
      {
        name: '8:00-10:00',
        id: 51,
        day: 6,
        from: '8:00',
        until: '10:00'
      },
      {
        name: '10:00-12:00',
        id: 52,
        day: 6,
        from: '10:00',
        until: '12:00'
      },
      {
        name: '12:00-14:00',
        id: 53,
        day: 6,
        from: '12:00',
        until: '14:00'
      },
      {
        name: '14:00-16:00',
        id: 54,
        day: 6,
        from: '14:00',
        until: '16:00'
      },
      {
        name: '16:00-18:00',
        id: 55,
        day: 6,
        from: '16:00',
        until: '18:00'
      },
      {
        name: '18:00-20:00',
        id: 56,
        day: 6,
        from: '18:00',
        until: '20:00'
      },
      {
        name: '20:00-22:00',
        id: 57,
        day: 6,
        from: '20:00',
        until: '22:00'
      },
    ],

  },

];

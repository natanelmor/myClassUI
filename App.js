import { createStackNavigator, createAppContainer } from 'react-navigation';
import my_profile_screen from './src/screens/my_profile_screen';
import my_classes_screen from './src/screens/my_classes_screen';
import add_class_screen_student from './src/screens/add_class_screen_student';
import class_info_screen from './src/screens/class_info_screen';
import AddClassButton from './src/components/AddClassButton';
import login_screen from './src/screens/login_screen';
import register_screen from './src/screens/register_screen';
import add_classes_screen_teacher from './src/screens/add_class_screen_teacher';
import class_register_screen from './src/screens/class_register_screen'
import QuizIndex from "./src/screens/quiz_time_screen";
import Quiz from "./src/screens/Quiz";
import React from 'react';
import { Text, StyleSheet, View, Button, TouchableOpacity, ImageBackground, Image} from 'react-native';
import Feed from "./src/screens/feed_screen";
import add_quiz_screen from "./src/screens/add_quiz_screen";
import quiz_time_screen from './src/screens/quiz_time_screen';
const navigator = createStackNavigator(
  {
    feed : Feed,
    my_profile: my_profile_screen,
    my_classes: my_classes_screen,
    add_class_student: add_class_screen_student,
    add_class_teacher: add_classes_screen_teacher,
    class_info: class_info_screen,
    addClassButton: AddClassButton,
    login_screen: login_screen,
    register_screen: register_screen,
    class_register: class_register_screen,
    QuizIndex: QuizIndex,
    Quiz: {
      screen: Quiz,
      navigationOptions: ({ navigation }) => ({
        headerTitle: navigation.getParam("title"),
        headerTintColor: "#fff",
        headerStyle: {
          backgroundColor: navigation.getParam("color"),
          borderBottomColor: navigation.getParam("color")
        }
      })
    },
    add_quiz: add_quiz_screen,
    quiz_time: quiz_time_screen
  },
  {
    initialRouteName: 'login_screen',
    defaultNavigationOptions: {
      //title : 'check'
      header:null
    }
  }
);

const App = createAppContainer(navigator);

export default () => {
  return(
    <View>
    <ImageBackground
    source= {require('./assets/background.jpeg')}
    style={{width:'100%', height:'100%' }}>
        <App/>
    </ImageBackground>
    </View>
  )
}

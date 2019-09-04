import { createStackNavigator, createAppContainer } from 'react-navigation';
import my_profile_screen from './src/screens/my_profile_screen';
import ComponentScreen from './src/examples/ComponentScreen_example';
import ListScreen from './src/examples/ListScreen_example';
import my_classes_screen from './src/screens/my_classes_screen'; 
import add_class_screen_student from './src/screens/add_class_screen_student'; 
import class_info_screen from './src/screens/class_info_screen'; 
import AddClassButton from './src/components/AddClassButton';
import login_screen from './src/screens/login_screen'; 
import register_screen from './src/screens/register_screen'; 
import add_classes_screen_teacher from './src/screens/add_class_screen_teacher';


const navigator = createStackNavigator(
  {
    my_profile: my_profile_screen,
    my_classes: my_classes_screen,
    add_class_student : add_class_screen_student,
    add_class_teacher : add_classes_screen_teacher,
    class_info : class_info_screen,
    addClassButton : AddClassButton,
    login_screen: login_screen,
    register_screen: register_screen,
  },
  {
    initialRouteName: 'login_screen',
    defaultNavigationOptions: {
      header:null
    }
  }
);

export default createAppContainer(navigator);
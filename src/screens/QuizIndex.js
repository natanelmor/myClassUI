import React from "react";
import { ScrollView, StatusBar, Image, ImageBackground, StyleSheet, View , Text} from "react-native";

import spaceQuestions from "../data/space";
import westernsQuestions from "../data/westerns";
import computerQuestions from "../data/computers";

import { RowItem } from "../components/RowItem";

export default ({ navigation }) => (
<ImageBackground
  source= {require('../../assets/background.jpeg')} 
  style={{width:'100%', height:'100%' }}>
<Image  style={{width:'100%', height:'20%', top:20 }} source={require('../../assets/quiz.jpg')}/>
<View style={styles.container}>

  <ScrollView>
    <StatusBar barStyle="dark-content" />
    <RowItem
      name="Space"
      color="#36b1f0"
      onPress={() =>
        navigation.navigate("Quiz", {
          title: "Space",
          questions: spaceQuestions,
          color: "#36b1f0"
        })
      }
    />
    <RowItem
      name="Westerns"
      color="#799496"
      onPress={() =>
        navigation.navigate("Quiz", {
          title: "Westerns",
          questions: westernsQuestions,
          color: "#799496"
        })
      }
    />
    <RowItem
      name="Computers"
      color="#49475B"
      onPress={() =>
        navigation.navigate("Quiz", {
          title: "Computers",
          questions: computerQuestions,
          color: "#49475B"
        })
      }
    />
    </ScrollView>
  </View>
</ImageBackground>
);


const styles = StyleSheet.create({
  textStyle: {
      marginHorizontal: 15,
      fontSize: 25,
      justifyContent: 'center',
      alignItems: 'center',
      color: 'blue'
  },
  containerFiles: {
      justifyContent: 'center',
      alignItems: 'center'
  },
  containerMessages: {
      height: 180,
      borderWidth: 4,
      borderColor: 'black',
      borderRadius: 5
  },
  messageInput: {
      flex: 1,
      margin: 10,
      height: 180
  },
  container: {
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      top: 20
  },
  userIcon: {
      width: 50,
      height: 50,
      justifyContent: 'center'
  },
  headerImg: {
    width: 100,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    top: 20
  },
  classIcon: {
      width: 70,
      height: 70
  },
  headerTextStyle: {
      marginHorizontal: 15,
      fontSize: 25,
      justifyContent: 'center',
      alignItems: 'center',
      fontWeight: 'bold'
  },
  headerStyle: {
  },
});
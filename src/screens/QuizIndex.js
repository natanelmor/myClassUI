import React from "react";
import { ScrollView, StatusBar, Image, ImageBackground, StyleSheet, View , Text, FlatList} from "react-native";

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
    <FlatList
      keyExtractor={(file) => file._id}
      data={navigation.getParam('quizes')}
      renderItem={({ item }) => {
          return (
            <View>
            <RowItem
              name={item.quiz_name}
              color="#36b1f0"
              onPress={() =>
                navigation.navigate("Quiz", {
                  title: item.quiz_name,
                  questions: item.questions,
                  color: "#36b1f0",
                  user: navigation.getParam('user'),
                  id: navigation.getParam('id'),
                })
              }
            />
            </View>);
  }}
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

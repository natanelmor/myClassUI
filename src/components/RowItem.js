import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import globalStyle from '../style';
import axios from 'axios';

export const RowItem = ({ onPress = () => {}, name, color, userType, classID, quizID}) => {
  return(
   <TouchableOpacity style={[globalStyle.listItem, {backgroundColor: color}]} 
   onPress={onPress} activeOpacity={0.8}
   onLongPress={({userType}) => {
      if (userType === 'Teacher'){
        axios.get('https://myclass-backend.herokuapp.com/class?id=' + classID)
        .then(res => {
          var index = res.data.quizes.indexOf(quizID)
          if (index !== -1) {
            res.data.quizes.splice(index, 1);
            axios.patch('https://myclass-backend.herokuapp.com/class?id=' + classID, res.data)
            .catch(err => {console.log(err)})
          }
        })
      }
   }}>
    <View style={styles.row}>
      <Text style={globalStyle.textCenter}>{name}</Text>
    </View>
  </TouchableOpacity>  
  )
};

const styles = StyleSheet.create({
  row: {
    paddingHorizontal: 15,
    paddingVertical: 20,
    },
  text: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "600"
  }
});

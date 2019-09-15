import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import globalStyle from '../style';
import axios from 'axios';

export const RowItem = ({ onPress = () => {}, onLongPress = () => {}, name, color}) => {
  return(
   <TouchableOpacity style={[globalStyle.listItem, {backgroundColor: color}]} 
   onPress={onPress} activeOpacity={0.8}
   onLongPress={onLongPress}
>
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

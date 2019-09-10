import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const DisplayGrade = (props) => {
    return (
      <View>
        <FlatList
          data={props.data}
          keyExtractor={(grade) => grade.quiz_id}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => {
              return (
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
            <View style={styles.leftBorderStyle}>
                <Text style={styles.textStyle}>{item.quiz_id}</Text></View>
            <View style={styles.rightBorderStyle}><Text style={styles.textStyle}>{item.value}</Text></View></View>
          )}}/>
        </View>
    )
}

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 25,
        alignItems: 'flex-start'
    },
    leftBorderStyle: {
        color: '#000',
        borderRadius: 5,
        borderWidth: 4,
        width: 200
    },
    rightBorderStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        color: '#000',
        borderRadius: 5,
        borderWidth: 4,
        width: 90
    }
})

export default DisplayGrade;

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DisplayGrade = (props) => {
    const { subject, grade } = props.grades;
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
            <View style={styles.leftBorderStyle}>
                <Text style={styles.textStyle}>{subject}</Text></View>
            <View style={styles.rightBorderStyle}><Text style={styles.textStyle}>{grade}</Text></View>
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
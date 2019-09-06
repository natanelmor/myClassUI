import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';

const ClassInfo = (props) => {
    return (
        <View style={styles.container} >
            <View>
                <Image
                    style={styles.classIcon}
                    source={require('../../assets/classIcon.png')}
                /></View>
            <View style={{ alignItems: 'flex-start' }}>
                <Image
                    style={styles.userIcon}
                    source={props.icon}
                />
                <Text style={{ fontSize: 25, fontWeight: 'bold' }}>{props.name}</Text>
                <Text>Time: {props.time}</Text>
                <Text>Location:</Text>
                <Text>{props.location}</Text>
                <Text>Teacher:</Text>
                <Text>{props.teacher}</Text>
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 10
    },
    userIcon: {
        width: 50,
        height: 50,
        justifyContent: 'center'
    },
    classIcon: {
        width: 200,
        height: 200
    }
});

export default ClassInfo;
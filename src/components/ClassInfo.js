import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';

const ClassInfo = (props) => {
    return (
        <View style={styles.container} >
            <View style={{ alignItems: 'center' }}>
                <Image
                    style={styles.userIcon}
                    source={{ uri: props.icon === null ? '../../assets/bible.png' : props.icon }}
                />
                <Text style={{ fontSize: 25, fontWeight: 'bold' }}>{props.name}</Text>
                <Text>Time: {props.time}</Text>
                <Text>Location: {props.location}</Text>
                <Text>Teacher: {props.teacher}</Text>
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
import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';

const UserInfo = (props) => {
    return (
        <View style={styles.container} >
            <View style={{ alignItems: 'flex-start' }}>
                <Image
                    style={styles.userIcon}
                    source={{uri: props.picture}}/>
                <Text>Your upcoming class is {props.className}, at {props.classLocation} {props.classTime}.</Text>
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginTop: 10
    },
    userIcon: {
        width: 50,
        height: 50,
        justifyContent: 'flew-start'
    },
    classIcon: {
        width: 200,
        height: 200
    }
});

export default ClassInfo;
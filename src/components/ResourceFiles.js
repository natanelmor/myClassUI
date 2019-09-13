import React from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import LargeHeading from './LargeHeading'

const ResourceFiles = (props) => {
    return (
        <View>
            <LargeHeading>Resources</LargeHeading>
            <View style={styles.containerFiles}>
                <FlatList
                    numColumns={4}
                    keyExtractor={(file) => file.id}
                    data={props.data}
                    renderItem={({ item }) => {
                        icon = (item.type) === 'file' ? require('../../assets/fileIcon.png') : require('../../assets/linkIcon.png')
                        return (
                            <View style={{ height: 75, width: 75 }}>
                                <TouchableOpacity>
                                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                        <Image
                                            style={styles.userIcon}
                                            source={icon}
                                        />
                                        <Text>{item.name}</Text></View>
                                </TouchableOpacity>
                            </View>
                        );
                    }}
                />
            </View></View>
    )
}

const styles = StyleSheet.create({
    containerFiles: {
        marginTop: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textStyle: {
        marginHorizontal: 15,
        fontSize: 25,
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff8dc',
        fontWeight: 'bold'
    },
    headerStyle: {
        backgroundColor: '#696969',
        borderRadius: 5
    },
    userIcon: {
        width: 50,
        height: 50,
        justifyContent: 'center'
    }
});

export default ResourceFiles;
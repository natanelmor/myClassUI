import React from 'react';
import {  View ,Text, StyleSheet, FlatList } from 'react-native';

const ListScreen = () => {
    const friends = [
        {name :'friend 1', key : '1'},
        {name :'friend 2', key : '2'},
        {name :'friend 3', key : '3'},
        {name :'friend 4', key : '4'},
        {name :'friend 4', key : '5'},
        {name :'friend 4', key : '6'},
        {name :'friend 4', key : '7'},
        {name :'friend 4', key : '8'},
        {name :'friend 4', key : '9'},
        {name :'friend 4', key : '10'},
        {name :'friend 4', key : '11'},
        {name :'friend 4', key : '12'},
        {name :'friend 4', key : '13'},
        {name :'friend 4', key : '14'},

    ];

    return (
    <FlatList 
        horizontal
        showsHorizontalScrollIndicator={false}
        data = {friends}
        renderItem= {({ item }) => {
            return <Text>{item.name} </Text>
    
        }}
      />
    );
};

const styles = StyleSheet.create({

}); 

export default ListScreen;
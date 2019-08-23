import React from 'react';
import {Text, StyleSheet, View} from 'react-native';

const ComponentScreen = () => {
    const name = 'Natanel';
    const greeting =<Text> hello my name is {name}</Text>;
    

    return (
    <View>  
        <Text style={style.textStyle}>test  </Text>
        {greeting}
    </View>
    );
};

const style = StyleSheet.create({
    textStyle : {
        fontSize :30
    }

});


export default ComponentScreen;
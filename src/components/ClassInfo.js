import React from 'react';
import { View, Image, StyleSheet, Text, FlatList } from 'react-native';
import globalStyle from '../style'
import { LinearGradient} from 'expo-linear-gradient';
import componentStyle from './style'

const ClassInfo = (props) => {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return (
        <View style={[globalStyle.profileCard, globalStyle.padding20]}>
        <Text style={componentStyle.profileValues}>{props.name}</Text>
                <Image
                   style={globalStyle.smallImage}
                    source={{ uri: props.icon === null ? 'https://cdn3.iconfinder.com/data/icons/education-flat-icon-1/130/135-512.png' : props.icon }}/>
                <FlatList  
                    keyExtractor={(time) => time._id}
                    data={props.time}
                    renderItem={({ item }) => {
                        return (
                          <Text style={[componentStyle.label, componentStyle.strong, componentStyle.smallText]}>
                          {days[item.day - 1]}, {item.from} - {item.until}</Text>
                        )}}
                />
                <Text  style={[componentStyle.label, componentStyle.strong, componentStyle.smallText]}>Location: {props.location}</Text>
                <Text  style={[componentStyle.label, componentStyle.strong, componentStyle.smallText]}>Teacher: {props.teacher}</Text>
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
        justifyContent: 'center',
        alignItems: 'center',
    },
    classIcon: {
        width: 200,
        height: 200
    }
});

export default ClassInfo;

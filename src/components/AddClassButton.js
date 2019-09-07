import React, {Component}  from 'react';
import {Text, StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import{Feather} from '@expo/vector-icons';
import {withNavigation} from 'react-navigation';

const navigationPage= '';

class AddClassButton extends Component {
    constructor(props) {
        super(props);
    this.state ={};

    }
    

    navigateAddClassByType(){
        if(this.props.user.type=='Student'){
            this.props.navigation.navigate('add_class_student', { user : this.props.user}) ;
        }
        else if(this.props.user.type=='Teacher'){
            this.props.navigation.navigate('add_class_teacher', { user : this.props.user}) ;
        }


    };

    render(){
        return (
            <View style={styles.container}>
                
                <TouchableOpacity 
                style={styles.touchOp} 
                onPress ={() => this.navigateAddClassByType()}>
                    <Feather name ="plus"/>
                    <Text> add class </Text>
                </TouchableOpacity>  
            </View>
            );
    }
};  

const styles = StyleSheet.create({
    touchOp: {
        alignItems: 'center',
        fontSize: 30,
        backgroundColor: '#DDDDDD',
        padding: 10,
        backgroundColor: '#fff',
        elevation: 2, 
        justifyContent: 'center',

    },
    container: {
        alignItems: 'center',
        flexDirection: 'column',
        height: 100,
        width: 100,
    },



}); 

export default withNavigation(AddClassButton);
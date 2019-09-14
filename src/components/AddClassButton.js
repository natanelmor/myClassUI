import React, { Component } from 'react';
import {Text, StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import{Feather} from '@expo/vector-icons';
import {withNavigation} from 'react-navigation';
import globalStyle from '../style'
import componentStyle from './style'


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
            <View style={globalStyle.centreItems}>
                <TouchableOpacity
                style={[componentStyle.actionButton, componentStyle.mt10]}
                underlayColor="#f1f1f1"
                onPress ={() => this.navigateAddClassByType()}>
                    <Feather style={{ justifyContent: 'center'}} size={30} color="white" name ="plus"/>
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
        justifyContent: 'center',
        backgroundColor: 'rgba(100, 100, 100, 0.8)'
    },
    container: {
        alignItems: 'center',
        flexDirection: 'column',
        height: 100,
        width: 100,
        top: 20
    },



});

export default withNavigation(AddClassButton);

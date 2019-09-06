import React, {Component}  from 'react';
import {View, StyleSheet} from 'react-native';
import axios from 'axios';
import ClassButton from '../components/ClassButton';
import { ScrollView } from 'react-native-gesture-handler';

class ClassesList extends Component {
    constructor(props) {
        super(props);
    this.state ={classes:[]};

    }
    
    componentWillMount(){
        console.log(this.props.user);
        axios.get('https://myclass-backend.herokuapp.com/classesOfUser?email='+this.props.user.email)
        .then(response => {
            this.setState({classes: response.data});
        });
    }

    renderClasses(){
        return( 
            this.state.classes.map(myclass => 
            <ClassButton key={myclass.id}
                myclass={myclass} user={this.props.user}
                nextPage= 'class_info' />)
        )
    }

    render(){

        return (
            <View style={styles.classes}>
                {this.renderClasses()}
            </View>

        );
    }
}

const styles = StyleSheet.create({
    classes: {
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap'
      }
});

export default ClassesList;
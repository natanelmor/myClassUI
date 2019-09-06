import React, {Component}  from 'react';
import {View , Text} from 'react-native';
import axios from 'axios';
import ClassButton from '../components/ClassButton';

class ClassesList extends Component {
    constructor(props) {
        super(props);
    this.state ={classes:[]};

    }
    
    componentWillMount(){
        console.log(this.props.user);
        axios.get('https://myclass-backend.herokuapp.com/classesOfUser?email='+this.props.user.email)
        .then(response => {
            console.log('response.data:    ',response.data);
            this.setState({classes: response.data});
            console.log('this.state.classes:    ',this.state.classes);
        });
    }

    renderClasses(){
        console.log('renderClasses');
        //console.log(this.state.classes[0].id);
        return( 
            this.state.classes.map(myclass => 
            <ClassButton key={myclass.id}
                myclass={myclass} user={this.props.user} />)
        )
    }


    render(){
        console.log('render :    ',this.state.classes)

        return (
            <View>
                {this.renderClasses()}
            </View>

        );
    }
}

export default ClassesList;
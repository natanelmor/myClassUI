import React, {Component}  from 'react';
import {View , Text} from 'react-native';
import axios from 'axios';
import ClassButton from '../components/ClassButton';

class AllClassesList extends Component {
    constructor(props) {
        super(props);
    this.state ={classes:[]};

    }
    
    componentWillMount(){
        axios.get('https://myclass-backend.herokuapp.com/classes')
        .then(response => {
            this.setState({classes: response.data});
        }
        );

    }

    renderClasses(){
        return( 
            this.state.classes.map(myclass => 
            <ClassButton key={myclass.id}
                myclass={myclass} />)
        )
    }


    render(){
        return (
            <View>
                {this.renderClasses()}
            </View>

        );
    }
}

export default AllClassesList;
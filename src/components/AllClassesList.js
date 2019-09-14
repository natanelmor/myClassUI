import React, {Component}  from 'react';
import {View , Text, FlatList} from 'react-native';
import axios from 'axios';
import ClassButton from '../components/ClassButton';

class AllClassesList extends Component {
    constructor(props) {
        super(props);
    this.state ={classes:[]};

    }
    
    componentWillMount(){
        axios.get('https://myclass-backend.herokuapp.com/classesUserCanRegister?email='+this.props.user.email)
        .then(response => {
            this.setState({classes: response.data});
        }
        );
    }

    renderClasses(rowData) {
        const myclass = rowData
        return (
              <ClassButton
                  key={myclass._id}
                  myclass={myclass} user={this.props.user}
                  nextPage = 'class_register' />
            )
    }


    render() {
        return (
            <FlatList  
            keyExtractor={(time) => time._id}
            data={this.state.classes}
            renderItem={({ item }) => this.renderClasses(item)}/>
        )
}
}

export default AllClassesList;
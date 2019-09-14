import React, { Component }  from 'react';
import { View, StyleSheet,FlatList,  } from 'react-native';
import axios from 'axios';
import ClassButton from '../components/ClassButton';
import { withNavigation } from 'react-navigation';

class ClassesList extends Component {
    constructor(props) {
        super(props);
    this.state = { classes: [],
    classComponent: [],
    time: [],
    location: '',
    teacher: '', };
    }

    componentDidMount() {
        this.focusListener = this.props.navigation.addListener('didFocus', () => {
            axios.get('https://myclass-backend.herokuapp.com/classesOfUser?email='+this.props.user.email)
            .then(response => {
                this.setState({ classes: response.data });
            });
        });
    }

    componentWillUnmount() {
        this.focusListener.remove();
    }

    renderClasses(rowData) {
        const myclass = rowData
        return (
              <ClassButton
                  key={myclass._id}
                  myclass={myclass} user={this.props.user}
                  nextPage = 'class_info' />
            )
    }


    render() {
   // const ds = new .DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    //let dataSource =  ds.cloneWithRows(this.state.classes)
        return (
            <FlatList  
            keyExtractor={(time) => time._id}
            data={this.state.classes}
            renderItem={({ item }) => this.renderClasses(item)}/>
                )
}
}

const styles = StyleSheet.create({
    classes: {
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap'
      }
});

export default withNavigation(ClassesList);

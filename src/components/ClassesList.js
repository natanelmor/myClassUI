import React, { Component }  from 'react';
import { View, StyleSheet } from 'react-native';
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

    renderClasses() {
        return (
            this.state.classes.map(myclass =>
              <ClassButton
                  key={myclass._id}
                  myclass={myclass} user={this.props.user}
                  nextPage = 'class_info' />
            )
        )

    }

    render() {
        return (
            <View>
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

export default withNavigation(ClassesList);

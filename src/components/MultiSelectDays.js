import React, { Component } from 'react';
import { View } from 'react-native';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';

const items = [
  // this is the parent or 'item'
  {
    name: 'Sunday',
    id: 0,
    // these are the children or 'sub items'
    children: [
      {
        name: '8:00-10:00',
        id: 1,
      },
      {
        name: '10:00-12:00',
        id: 2,
      },
      {
        name: '12:00-14:00',
        id: 3,
      },
      {
        name: '14:00-16:00',
        id: 4,
      },
      {
        name: '16:00-18:00',
        id: 5,
      },
      {
        name: '18:00-20:00',
        id: 6,
      },
      {
        name: '20:00-22:00',
        id: 7,
      },
    ],
  },
  {
    name: 'Monday',
    id: 10,
    // these are the children or 'sub items'
    children: [
      {
        name: '8:00-10:00',
        id: 11,
      },
      {
        name: '10:00-12:00',
        id: 12,
      },
      {
        name: '12:00-14:00',
        id: 13,
      },
      {
        name: '14:00-16:00',
        id: 14,
      },
      {
        name: '16:00-18:00',
        id: 15,
      },
      {
        name: '18:00-20:00',
        id: 16,
      },
      {
        name: '20:00-22:00',
        id: 17,
      },
    ],

  },
  {
    name: 'Tuesday',
    id: 20,
    // these are the children or 'sub items'
    children: [
      {
        name: '8:00-10:00',
        id: 21,
      },
      {
        name: '10:00-12:00',
        id: 22,
      },
      {
        name: '12:00-14:00',
        id: 23,
      },
      {
        name: '14:00-16:00',
        id: 24,
      },
      {
        name: '16:00-18:00',
        id: 25,
      },
      {
        name: '18:00-20:00',
        id: 26,
      },
      {
        name: '20:00-22:00',
        id: 27,
      },
    ],

  },
  {
    name: 'Whednesday',
    id: 30,
    // these are the children or 'sub items'
    children: [
      {
        name: '8:00-10:00',
        id: 31,
      },
      {
        name: '10:00-12:00',
        id: 32,
      },
      {
        name: '12:00-14:00',
        id: 33,
      },
      {
        name: '14:00-16:00',
        id: 34,
      },
      {
        name: '16:00-18:00',
        id: 35,
      },
      {
        name: '18:00-20:00',
        id: 36,
      },
      {
        name: '20:00-22:00',
        id: 37,
      },
    ],

  },
  {
    name: 'Thursday',
    id: 40,
    // these are the children or 'sub items'
    children: [
      {
        name: '8:00-10:00',
        id: 41,
      },
      {
        name: '10:00-12:00',
        id: 42,
      },
      {
        name: '12:00-14:00',
        id: 43,
      },
      {
        name: '14:00-16:00',
        id: 44,
      },
      {
        name: '16:00-18:00',
        id: 45,
      },
      {
        name: '18:00-20:00',
        id: 46,
      },
      {
        name: '20:00-22:00',
        id: 47,
      },
    ],

  },
  {
    name: 'Friday',
    id: 50,
    // these are the children or 'sub items'
    children: [
      {
        name: '8:00-10:00',
        id: 51,
      },
      {
        name: '10:00-12:00',
        id: 52,
      },
      {
        name: '12:00-14:00',
        id: 53,
      },
      {
        name: '14:00-16:00',
        id: 54,
      },
      {
        name: '16:00-18:00',
        id: 55,
      },
      {
        name: '18:00-20:00',
        id: 56,
      },
      {
        name: '20:00-22:00',
        id: 57,
      },
    ],

  },

];

export default class MultiSelectDays extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItems: [],
      myarr: []
    };
  }

  onSelectedItemsChange = (selectedItems) => {
    this.setState({selectedItems });
    //this.setState({ myarr: selectedItems });
    //this.setState({ selectedItems: selectedItems });
    
    //console.log(this.state.myarr);
  };
  onSelectedItemObjectsChange = (selectedItemObjects) => {
    this.setState({selectedItemObjects });
    //this.state.myarr.push(selectedItemObjects);
    //console.log(selectedItemObjects);
  }

  onConfirm() {
   // this.setState({ myarr: this.atate.selectedItems });
     // console.log('press confirm');
      //console.log(this.state.selectedItemObjects);
      //console.log(this.SectionedMultiSelect.props);
      this.props.updateTimeFromSelectDay(this.state.selectedItemObjects);
  }

  findId(fruit) { 
    return fruit.name === 'cherries';
  }

  

  render() {
    return (
      <View style={{width:'100%' }}>
        <SectionedMultiSelect style={{width:'100%', height:'100%',alignItems :'center'}}
          items={items}
          uniqueKey="id"
          subKey="children"
          modalWithTouchable
          modalWithSafeAreaView
          selectText="choose class time:"
          ref={SectionedMultiSelect  => this.SectionedMultiSelect = SectionedMultiSelect }
          showDropDowns={true}
          readOnlyHeadings={true}
          onSelectedItemsChange={this.onSelectedItemsChange}
          onSelectedItemObjectsChange={this.onSelectedItemObjectsChange}
          selectedItems={this.state.selectedItems}
          onConfirm={() => this.onConfirm()}
        
        />
      </View>
    );
    
  }
}
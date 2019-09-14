import React, { Component } from 'react';
import { View } from 'react-native';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';



export default class MultiSelectDays extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItems: [],
      myarr: []
    };
    this.onConfirm = this.onConfirm.bind(this);
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
      console.log('press confirm: ');
      console.log(this.state.selectedItemObjects);
      //console.log(this.SectionedMultiSelect.props);
      const sendData = this.state.selectedItemObjects;
      this.props.updateTimeFromSelectDay(sendData);
      this.setState({selectedItemObjects: this.state.selectedItemObjects });
     
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
        day: 1,
        from: '8:00',
        until: '10:00'
      },
      {
        name: '10:00-12:00',
        id: 2,
        day: 1,
        from: '10:00',
        until: '12:00'
      },
      {
        name: '12:00-14:00',
        id: 3,
        day: 1,
        from: '12:00',
        until: '14:00'
      },
      {
        name: '14:00-16:00',
        id: 4,
        day: 1,
        from: '14:00',
        until: '16:00'
      },
      {
        name: '16:00-18:00',
        id: 5,
        day: 1,
        from: '16:00',
        until: '18:00'
      },
      {
        name: '18:00-20:00',
        id: 6,
        day: 1,
        from: '18:00',
        until: '20:00'
      },
      {
        name: '20:00-22:00',
        id: 7,
        day: 1,
        from: '20:00',
        until: '22:00'
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
        day: 2,
        from: '8:00',
        until: '10:00'
      },
      {
        name: '10:00-12:00',
        id: 12,
        day: 2,
        from: '10:00',
        until: '12:00'
      },
      {
        name: '12:00-14:00',
        id: 13,
        day: 2,
        from: '12:00',
        until: '14:00'
      },
      {
        name: '14:00-16:00',
        id: 14,
        day: 2,
        from: '14:00',
        until: '16:00'
      },
      {
        name: '16:00-18:00',
        id: 15,
        day: 2,
        from: '16:00',
        until: '18:00'
      },
      {
        name: '18:00-20:00',
        id: 16,
        day: 2,
        from: '18:00',
        until: '20:00'
      },
      {
        name: '20:00-22:00',
        id: 17,
        day: 2,
        from: '20:00',
        until: '22:00'
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
        day: 3,
        from: '8:00',
        until: '10:00'

      },
      {
        name: '10:00-12:00',
        id: 22,
        day: 3,
        from: '10:00',
        until: '12:00'
      },
      {
        name: '12:00-14:00',
        id: 23,
        day: 3,
        from: '12:00',
        until: '14:00'
      },
      {
        name: '14:00-16:00',
        id: 24,
        day: 3,
        from: '14:00',
        until: '16:00'
      },
      {
        name: '16:00-18:00',
        id: 25,
        day: 3,
        from: '16:00',
        until: '18:00'
      },
      {
        name: '18:00-20:00',
        id: 26,
        day: 3,
        from: '18:00',
        until: '20:00'
      },
      {
        name: '20:00-22:00',
        id: 27,
        day: 3,
        from: '20:00',
        until: '22:00'
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
        day: 4,
        from: '8:00',
        until: '10:00'
      },
      {
        name: '10:00-12:00',
        id: 32,
        day: 4,
        from: '10:00',
        until: '12:00'
      },
      {
        name: '12:00-14:00',
        id: 33,
        day: 4,
        from: '12:00',
        until: '14:00'
      },
      {
        name: '14:00-16:00',
        id: 34,
        day: 4,
        from: '14:00',
        until: '16:00'
      },
      {
        name: '16:00-18:00',
        id: 35,
        day: 4,
        from: '16:00',
        until: '18:00'
      },
      {
        name: '18:00-20:00',
        id: 36,
        day: 4,
        from: '18:00',
        until: '20:00'
      },
      {
        name: '20:00-22:00',
        id: 37,
        day: 4,
        from: '20:00',
        until: '22:00'
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
        day: 5,
        from: '8:00',
        until: '10:00'
      },
      {
        name: '10:00-12:00',
        id: 42,
        day: 5,
        from: '10:00',
        until: '12:00'
      },
      {
        name: '12:00-14:00',
        id: 43,
        day: 5,
        from: '12:00',
        until: '14:00'
      },
      {
        name: '14:00-16:00',
        id: 44,
        day: 5,
        from: '14:00',
        until: '16:00'
      },
      {
        name: '16:00-18:00',
        id: 45,
        day: 5,
        from: '16:00',
        until: '18:00'
      },
      {
        name: '18:00-20:00',
        id: 46,
        day: 5,
        from: '18:00',
        until: '20:00'
      },
      {
        name: '20:00-22:00',
        id: 47,
        day: 5,
        from: '20:00',
        until: '22:00'
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
        day: 6,
        from: '8:00',
        until: '10:00'
      },
      {
        name: '10:00-12:00',
        id: 52,
        day: 6,
        from: '10:00',
        until: '12:00'
      },
      {
        name: '12:00-14:00',
        id: 53,
        day: 6,
        from: '12:00',
        until: '14:00'
      },
      {
        name: '14:00-16:00',
        id: 54,
        day: 6,
        from: '14:00',
        until: '16:00'
      },
      {
        name: '16:00-18:00',
        id: 55,
        day: 6,
        from: '16:00',
        until: '18:00'
      },
      {
        name: '18:00-20:00',
        id: 56,
        day: 6,
        from: '18:00',
        until: '20:00'
      },
      {
        name: '20:00-22:00',
        id: 57,
        day: 6,
        from: '20:00',
        until: '22:00'
      },
    ],

  },

];
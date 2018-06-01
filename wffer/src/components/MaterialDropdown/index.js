import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { gstyles } from '../../GlobalStyles';
import { Dropdown } from 'react-native-material-dropdown';
import PropTypes from 'prop-types';
export class MaterialDropdownComponent extends React.Component{  
  onChangeTextPress(key, value){
    this.setState((prevState) => {
      let selected = Object.assign({}, prevState.selected);
      selected[key] = value;
      return { selected };
    }, () => {
      // because setState is async you need to use a callback
      // to be sure of the state set before using a state value
      console.log(this.state.selected);
    });
  }
  render(){
      // alert(JSON.stringify(this.props.data));
      return(
        <View {...this.props}>
            <Dropdown
              label={this.props.defaultValue}
              ref={(ref) => this.select = ref}
              data={this.props.data}
              valueExtractor={({ value }) => value}
               onChangeText={(value)=>{this.onChangeTextPress(item.name, value)}}
            />
        </View>
      )
      
  }
}
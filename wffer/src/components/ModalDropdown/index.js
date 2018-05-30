import React, { Component } from 'react';
import { View } from 'react-native';
import { gstyles } from '../../GlobalStyles';
import ModalDropdown from 'react-native-modal-dropdown';

export class ModalDropdownComponent extends React.Component{
  constructor(props) {
      super(props);
      // alert(JSON.stringify(this.props.navigation));
    }
    // selected(index,value){
    //   alert(value)
    //   return value;
    // }
  render(){
      return(
        <View>
            <ModalDropdown 
                      style={gstyles.dropdownMainStyles}
                      dropdownTextStyle={gstyles.dropdownTextStyle}
                      textStyle={gstyles.textStyle}
                      dropdownStyle={gstyles.dropdownStyles}
                      showsVerticalScrollIndicator={true}
                      defaultValue={this.props.defaultValue}
                      options={this.props.options}
                     
                      />
        </View>
        )
      }
  }
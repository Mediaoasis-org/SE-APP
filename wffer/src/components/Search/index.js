import React, { Component } from 'react';
import { TextInput, View, TouchableOpacity, Platform } from 'react-native';
import { gstyles } from '../../GlobalStyles';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

export class SearchComponent extends React.Component{
  constructor(props) {
      super(props);
      this.state={
        search :'',
      }
      // alert(JSON.stringify(this.props.navigation));
    }
  render(){
      return(
        <View style={gstyles.searchView}>
            <TouchableOpacity style={gstyles.searchViewLeft}><Icon name="search" size={24} color="#ccc" /></TouchableOpacity>
            <TextInput style={gstyles.searchViewRight}
                placeholder="Search Product"
                underlineColorAndroid="transparent"
                placeholderTextColor="rgb(158,145,140)"
                autoCorrect={true}
                value={this.state.search}
                onChangeText={(text) => this.setState({search: text})}
            />
        </View>
        )
      }
  }
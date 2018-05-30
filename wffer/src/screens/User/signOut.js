import React, { Component } from 'react';
import { Text, TextInput, View, TouchableOpacity, ScrollView, AsyncStorage,FlatList, } from 'react-native';
import { gstyles } from '../../GlobalStyles';
import { Constants } from '../../common';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { DrawerActions } from 'react-navigation';

 class LogoutComponent extends Component {
	constructor(props){
		super(props)
	}
	componentDidMount() {
        AsyncStorage.removeItem('userData');
        this.props.navigation.navigate('Login')
    }
}
export default LogoutComponent;
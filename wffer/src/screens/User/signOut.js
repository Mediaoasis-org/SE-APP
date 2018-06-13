import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { gstyles } from '../../GlobalStyles';
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
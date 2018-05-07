import React, { Component } from 'react';
import {
  Text,
  View,
  // Dimension
} from 'react-native';
// const window= Dimensions.get('window');
export  default class SplashScreen extends Component {
	render(){
		return(
				<View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
						
						<Text style={{color:'#febe2b',fontSize:40}}>Wffer</Text>
				</View>
			);
	}
}
import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  Dimensions
} from 'react-native';
const window= Dimensions.get('window');
export  default class SplashScreen extends Component {
	render(){
		return(
				<View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'#fff'}}>
						
						<Image source={require('./assets/icon.png')} resizeMode="contain" style={{width:window.width/3,height:window.height/3}}/>
				</View>
			);
	}
}
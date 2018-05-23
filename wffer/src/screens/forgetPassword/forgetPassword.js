import React, { Component } from 'react';
import { Text, TextInput, View, Dimension, TouchableOpacity, Image, FlatList, ScrollView } from 'react-native';
import { gstyles } from '../../GlobalStyles';
import { DrawerActions } from 'react-navigation';
import { Constants } from '../../common';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

export class ForgetComponent extends Component {
	constructor(props){
		super(props);
		this.state={
			email:'',
		}
		// alert(JSON.stringify(this.props.navigation))
	}
	Capitalize(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
    }
	render(){
		return(
				<View style={gstyles.container}>
					<View style={gstyles.headerMenu}>
								<TouchableOpacity onPress={() =>this.props.navigation.goBack() } style={gstyles.headerMenuButton}>
									<Icon name="angle-left" size={30} color="#fff" />
			                    </TouchableOpacity>
			                    <Text style={gstyles.headerProfileLabel}>{Constants.forgetPassword}</Text>
			                    
					</View>
					<ScrollView>
						<View style={gstyles.profileHeadingView}><Text style={gstyles.profileHeadingText}>Forget Password</Text></View>
						<View>
							<TextInput name="email" keyboardType="email-address" placeholder="Email Address" returnKeyType="next" underlineColorAndroid="#fff" style={gstyles.textInputStyle}/>	
							<TouchableOpacity onPress={()=>alert('submit')} style={gstyles.buttonView}><Text style={gstyles.buttonText}>Submit</Text></TouchableOpacity>
						</View>
					</ScrollView>
				</View>
			);
	}
}
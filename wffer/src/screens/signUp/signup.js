import React, { Component } from 'react';
import { Text, TextInput, View, TouchableOpacity, ScrollView } from 'react-native';
import { Constants } from '../../common';
import { ModalDropdownComponent } from '../../components/ModalDropdown';
import { gstyles } from '../../GlobalStyles';
import CheckBox from 'react-native-checkbox';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { DrawerActions } from 'react-navigation';

export class SignupComponent extends Component {
	constructor(props){
		super(props);
		this.state={
			email:'',
			password:'',
			 checked: false,
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
								<TouchableOpacity onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())} style={gstyles.headerMenuButton}>
									<Icon name="bars" size={24} color="#fff" />
			                    </TouchableOpacity>
			                    <Text style={gstyles.headerProfileLabel}>{Constants.Signup}</Text>
					</View>
					<ScrollView>
						<View style={gstyles.profileHeadingView}><Text style={gstyles.profileHeadingText}>Sign Up</Text></View>
						<View>
							<TextInput name="email" keyboardType="email-address" placeholder="Email Address" returnKeyType="next" underlineColorAndroid="#fff" style={gstyles.textInputStyle}/>	
							<TextInput name="password" placeholder="Password" secureTextEntry={true} underlineColorAndroid="#fff" style={gstyles.textInputStyle}/>	
							<TextInput name="confirm_password" placeholder="Confirm Password" secureTextEntry={true} underlineColorAndroid="#fff" style={gstyles.textInputStyle}/>	
							<ModalDropdownComponent defaultValue='Select Time Zone'
				                	options={['(UTC+5:30) Bombay,Calcutta,New Delhi','(UTC+5:45) Nepal','(UTC+6) Dhaka','(UTC+9:30) Darwin']}/>	
							<ModalDropdownComponent defaultValue='Select Language' options={['English','Saudi Arabia Arabic']}/>
							
							<View style={{flexDirection: 'row',padding: 15,width:'100%'}}>
								<CheckBox
								  label='I have read and agreed to the terms and services'
								  labelStyle={{color:'#000',fontSize:16}}
								  onClick={() => this.setState({checked: !checked})}
								  style={{color:'#ff0000',backgroundColor:'#00ff00'}}
								  labelLines={4}
								/>
				   			</View>
				   			<View style={gstyles.termsView}><TouchableOpacity><Text style={gstyles.termsLink}>Click Here</Text></TouchableOpacity><Text style={gstyles.fontSize18}> to read the terms of service</Text></View>
							<TouchableOpacity onPress={()=>alert('submit')} style={gstyles.buttonView}><Text style={gstyles.buttonText}>Submit</Text></TouchableOpacity>
							
						</View>
					</ScrollView>
				</View>
			);
	}
}
import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import {
  Text,
  TextInput,
  View,
  Dimension,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,

} from 'react-native';
import {Constants} from '../../common';
import ModalDropdown from 'react-native-modal-dropdown';
import {gstyles} from '../../GlobalStyles';
import CheckBox from 'react-native-checkbox';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { DrawerActions } from 'react-navigation';
// import iconFont from 'react-native-vector-icons/Fonts/FontAwesome.ttf';
// const window= Dimensions.get('window');

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
						<View style={{width:'100%',alignItems:'center'}}><Text style={{padding:10,fontSize:20}}>Sign Up</Text></View>
						<View>
							<TextInput name="email" keyboardType="email-address" placeholder="Email Address" returnKeyType="next" underlineColorAndroid="#fff" style={{margin:10,padding:10,borderWidth:1,borderColor:'#ccc'}}/>	
							<TextInput name="password" placeholder="Password" secureTextEntry={true} underlineColorAndroid="#fff" style={{margin:10,padding:10,borderWidth:1,borderColor:'#ccc'}}/>	
							<TextInput name="confirm_password" placeholder="Confirm Password" secureTextEntry={true} underlineColorAndroid="#fff" style={{margin:10,padding:10,borderWidth:1,borderColor:'#ccc'}}/>	
							<View>
									<ModalDropdown 
					                	style={{borderWidth:1,borderColor:'#ccc',margin:10,padding:5}}
					                	dropdownTextStyle={{fontSize: 18, color: '#000',padding:10}}
		                				textStyle={{color: '#000', fontSize: 18,padding:10}}
					                	dropdownStyle={{width:'100%',padding:5,}}
					                	defaultValue='Select Time Zone'
					                	options={['Saudi','India','America']}/>
							</View>
							<View>
									<ModalDropdown 
					                	style={{borderWidth:1,borderColor:'#ccc',margin:10,padding:5}}
					                	dropdownTextStyle={{fontSize: 18, color: '#000',padding:10}}
		                				textStyle={{color: '#000', fontSize: 18,padding:10}}
					                	dropdownStyle={{width:'100%',padding:5}}
					                	defaultValue='Select Language'
					                	options={['English','Saudi Arabia Arabic']}/>
							</View>
							<View style={{flexDirection: 'row',padding: 15,width:'100%'}}>
								<CheckBox
								  label='I have read and agreed to the terms and services'
								  labelStyle={{color:'#000',fontSize:16}}
								  onClick={() => this.setState({checked: !checked})}
								  style={{color:'#ff0000',backgroundColor:'#00ff00'}}
								  labelLines={4}
								/>
				   			</View>
				   			<View style={{flexDirection: 'row',justifyContent:'center',width:'100%'}}><TouchableOpacity><Text style={{color:'#62C462',fontSize:16}}>Click Here</Text></TouchableOpacity><Text style={{fontSize:16}}> to read the terms of service</Text></View>
							<TouchableOpacity onPress={()=>alert('submit')} style={{margin:10,padding:10,backgroundColor:'#696969',alignItems:'center'}}><Text style={{color:'#fff',fontSize:16,fontWeight:'bold'}}>Submit</Text></TouchableOpacity>
							
						</View>
					</ScrollView>
				</View>
			);
	}
}
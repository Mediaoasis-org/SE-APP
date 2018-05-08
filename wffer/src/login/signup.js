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
import ModalDropdown from 'react-native-modal-dropdown';
import {gstyles} from '../GlobalStyles';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
// import iconFont from 'react-native-vector-icons/Fonts/FontAwesome.ttf';
// const window= Dimensions.get('window');

export class SignupComponent extends Component {
	constructor(props){
		super(props);
		this.state={
			email:'',
			password:'',
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
								<TouchableOpacity onPress={() => this.props.navigation.goBack()} style={gstyles.headerMenuButton}>
									<Icon name="bars" size={24} color="#fff" />
			                    </TouchableOpacity>
					</View>
					<ScrollView>
						<View style={{width:'100%',alignItems:'center'}}><Text style={{padding:10,fontSize:20}}>Sign Up</Text></View>
						<View>
							<TextInput name="email" keyboardType="email-address" placeholder="Email Address" returnKeyType="next" underlineColorAndroid="#fff" style={{margin:10,padding:10,borderWidth:1,borderColor:'#ccc'}}/>	
							<TextInput name="password" placeholder="Password" secureTextEntry={true} underlineColorAndroid="#fff" style={{margin:10,padding:10,borderWidth:1,borderColor:'#ccc'}}/>	
							<TextInput name="confirm_password" placeholder="Confirm Password" secureTextEntry={true} underlineColorAndroid="#fff" style={{margin:10,padding:10,borderWidth:1,borderColor:'#ccc'}}/>	
							<View>
									<ModalDropdown 
					                
					                	dropdownTextStyle={{fontSize: 18, color: '#000',margin:10,padding:10}}
		                				textStyle={{color: '#000', fontSize: 18,margin:10,padding:10}}
					                	dropdownStyle={{width:'100%',margin:2,padding:5}}
					                	defaultValue='2001'
					                	options={['2001', '2002', '2003','2004','2005','2006','2007','2008','2009','2010']}/>
							</View>
							<TouchableOpacity onPress={()=>alert('submit')} style={{margin:10,padding:10,backgroundColor:'#696969',alignItems:'center'}}><Text style={{color:'#fff',fontSize:16,fontWeight:'bold'}}>Submit</Text></TouchableOpacity>
							
						</View>
					</ScrollView>
				</View>
			);
	}
}
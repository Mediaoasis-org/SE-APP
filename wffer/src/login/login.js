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
  ScrollView
} from 'react-native';
import {gstyles} from '../GlobalStyles';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
// import iconFont from 'react-native-vector-icons/Fonts/FontAwesome.ttf';
// const window= Dimensions.get('window');

export class LoginComponent extends Component {
	constructor(props){
		super(props);
		this.state={
			email:'',
			password:''
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
						<View style={{width:'100%',alignItems:'center'}}><Text style={{padding:10,fontSize:20}}>Sign In</Text></View>
						<View>
							<TextInput name="email" keyboardType="email-address" placeholder="Email Address" returnKeyType="next" underlineColorAndroid="#fff" style={{margin:10,padding:10,borderWidth:1,borderColor:'#ccc'}}/>	
							<TextInput name="password" placeholder="Password" secureTextEntry={true} underlineColorAndroid="#fff" style={{margin:10,padding:10,borderWidth:1,borderColor:'#ccc'}}/>	
							<TouchableOpacity onPress={()=>alert('submit')} style={{margin:10,padding:10,backgroundColor:'#696969',alignItems:'center'}}><Text style={{color:'#fff',fontSize:16,fontWeight:'bold'}}>Submit</Text></TouchableOpacity>
							<View style={{margin:10,padding:10,alignItems:'center'}}><Text style={{color:'#000',fontWeight:'bold',fontSize:16}}>New to Wffer ?</Text></View>
							<TouchableOpacity style={{margin:10,padding:10,backgroundColor:'#62C462',alignItems:'center'}}><Text style={{fontSize:16,color:'#fff',fontWeight:'bold'}}>Create New Account</Text></TouchableOpacity>
							<View style={{margin:10,padding:10,justifyContent:'center',flexDirection:'row'}}><TouchableOpacity style={{flexDirection:'column'}}><Text style={{fontSize:16,color:'#007F97'}}>Forget Password ?</Text></TouchableOpacity><TouchableOpacity style={{flexDirection:'column'}}><Text style={{fontSize:16,color:'#007F97'}}>Help</Text></TouchableOpacity></View>
						</View>
					</ScrollView>
				</View>
			);
	}
}
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
import { DrawerActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
// import iconFont from 'react-native-vector-icons/Fonts/FontAwesome.ttf';
// const window= Dimensions.get('window');

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
			                    
					</View>
					<ScrollView>
						<View style={{width:'100%',alignItems:'center'}}><Text style={{padding:10,fontSize:20}}>Forget Password</Text></View>
						<View>
							<TextInput name="email" keyboardType="email-address" placeholder="Email Address" returnKeyType="next" underlineColorAndroid="#fff" style={{margin:10,padding:10,borderWidth:1,borderColor:'#ccc'}}/>	
							<TouchableOpacity onPress={()=>alert('submit')} style={{margin:10,padding:10,backgroundColor:'#696969',alignItems:'center'}}><Text style={{color:'#fff',fontSize:16,fontWeight:'bold'}}>Submit</Text></TouchableOpacity>
						</View>
					</ScrollView>
				</View>
			);
	}
}
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Image
} from 'react-native';
import {gstyles} from '../../GlobalStyles';
// import MapView from 'react-native-maps';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { DrawerActions } from 'react-navigation';
import ModalDropdown from 'react-native-modal-dropdown';
export  class PersonalInfoComponent extends Component {
	constructor(props){
		super(props);
		this.state={
			firstname:'',
			lastname:''
		}
	}
	static navigationOptions = {
        title: 'Personal Info',
        

    };
	render(){
		return(
			<View style={gstyles.container}>
					<View style={gstyles.headerMenu}>
								<TouchableOpacity onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())} style={gstyles.headerMenuButton}>
									<Icon name="bars" size={24} color="#fff" />
			                    </TouchableOpacity>
			                    <Text style={gstyles.headerProfileLabel}>Profile</Text>
					</View>
				 	<ScrollView>
						<View style={{width:'100%',alignItems:'center'}}><Text style={{padding:10,fontSize:20}}>Personal Information</Text></View>
						<View>
							<TextInput name="firstname" placeholder="First Name" returnKeyType="next" underlineColorAndroid="#fff" style={{margin:10,padding:10,borderWidth:1,borderColor:'#ccc'}}/>	
							<TextInput name="lastname" placeholder="Last Name" returnKeyType="next" underlineColorAndroid="#fff" style={{margin:10,padding:10,borderWidth:1,borderColor:'#ccc'}}/>	
							<ModalDropdown 
				                	style={{borderWidth:1,borderColor:'#ccc',margin:10,padding:5}}
				                	dropdownTextStyle={{fontSize: 18, color: '#000',padding:10}}
	                				textStyle={{color: '#000', fontSize: 18,padding:10}}
				                	dropdownStyle={{width:'90%',padding:5,margin:5}}
				                	showsVerticalScrollIndicator={true}
				                	defaultValue='Select Gender'
				                	options={['Male','Female']}/>
							<TouchableOpacity onPress={()=>alert('submit')} style={{margin:10,padding:10,backgroundColor:'#696969',alignItems:'center'}}><Text style={{color:'#fff',fontSize:16,fontWeight:'bold'}}>Save</Text></TouchableOpacity>
						</View>
					</ScrollView>
			</View>
		)
	}
}

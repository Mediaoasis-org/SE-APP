import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, Dimensions, ScrollView, TouchableOpacity, Image } from 'react-native';
import { gstyles } from '../../GlobalStyles';
import { ModalDropdownComponent } from '../../components/ModalDropdown';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { DrawerActions } from 'react-navigation';
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
						<View style={gstyles.profileHeadingView}><Text style={gstyles.profileHeadingText}>Personal Information</Text></View>
						<View>
							<TextInput name="firstname" placeholder="First Name" returnKeyType="next" underlineColorAndroid="#fff" style={gstyles.textInputStyle}/>	
							<TextInput name="lastname" placeholder="Last Name" returnKeyType="next" underlineColorAndroid="#fff" style={gstyles.textInputStyle}/>	
							<ModalDropdownComponent defaultValue='Select Gender' options={['Male','Female']}/>
							<TouchableOpacity onPress={()=>alert('submit')} style={gstyles.buttonView}><Text style={gstyles.buttonText}>Save</Text></TouchableOpacity>
						</View>
					</ScrollView>
			</View>
		)
	}
}

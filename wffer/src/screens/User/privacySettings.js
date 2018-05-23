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
import CheckBox from 'react-native-checkbox';
import { DrawerActions } from 'react-navigation';
import ModalDropdown from 'react-native-modal-dropdown';
const window= Dimensions.get('window');
export  class PrivacySettingsComponent extends Component {
	constructor(props){
		super(props);
		this.state={
			firstname:'',
			lastname:''
		}
	}
	static navigationOptions = {
        title: 'Privacy',
        

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
						<View style={{width:'100%',alignItems:'center'}}><Text style={{padding:10,fontSize:20}}>Privacy Settings</Text></View>
						<View>
							<View style={{margin:10}}>
								<Text style={{fontWeight:'bold',fontSize:14}}>Blocked Members</Text>
								<Text style={{marginBottom:10}}>Adding a person to your block list makes your profile (and all of your other content) unviewable to them and vice-versa. Blocked users will not be able to message you or view things you post. Any connections you have to the blocked person will be canceled. To add someone to your block list, visit that person/''s profile page.</Text>
								<CheckBox
								  label='Do not display me in searches, browsing members, or the "online members" list'
								  labelStyle={{color:'#000',fontSize:16,padding:3}}
								  onClick={() => this.setState({checked: !checked})}
								  style={{color:'#ff0000',backgroundColor:'#00ff00'}}
								  labelLines={4}

								/>
							</View>
							<TouchableOpacity onPress={()=>alert('submit')} style={gstyles.buttonView}><Text style={gstyles.buttonText}>Save Changes</Text></TouchableOpacity>
						</View>
					</ScrollView>
			</View>
		)
	}
}

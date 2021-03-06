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
// import { DrawerActions } from 'react-navigation';
import ModalDropdown from 'react-native-modal-dropdown';
export  class OtherSettingsComponent extends Component {
	constructor(props){
		super(props);
		this.state={
			firstname:'',
			lastname:''
		}
	}
	static navigationOptions = {
        title: 'More Settings',
        

    };
	render(){
		return(
			<View style={gstyles.container}>
					<View style={gstyles.headerMenu}>
								<TouchableOpacity onPress={() => this.props.navigation.openDrawer()} style={gstyles.headerMenuButton}>
									<Icon name="bars" size={24} color="#fff" />
			                    </TouchableOpacity>
			                    <Text style={gstyles.headerProfileLabel}>Profile</Text>
					</View>
				 	<ScrollView>
						<View style={{width:'100%',alignItems:'center'}}><Text style={{padding:10,fontSize:20}}>More Settings</Text></View>
						<View>
							<TouchableOpacity onPress={()=>alert('Notifications')} style={{margin:10,padding:10,borderColor:'#696969',borderWidth:1,alignItems:'center',flexDirection:'row'}}>
								<Text style={{color:'#000',fontSize:16,fontWeight:'bold',flexDirection:'column',width:'95%'}}>Notifications</Text>
								<Icon name="angle-right" size={24} color="#000" style={{flexDirection:'column',width:'5%'}}/>
							</TouchableOpacity>
							<TouchableOpacity onPress={()=>alert('Hide Content Feed')} style={{margin:10,padding:10,borderColor:'#696969',borderWidth:1,alignItems:'center',flexDirection:'row'}}>
								<Text style={{color:'#000',fontSize:16,fontWeight:'bold',flexDirection:'column',width:'95%'}}>Hide Content Feed</Text>
								<Icon name="angle-right" size={24} color="#000" style={{flexDirection:'column',width:'5%'}}/>
							</TouchableOpacity>
							<TouchableOpacity onPress={()=>this.props.navigation.navigate('ChangePassword')} style={{margin:10,padding:10,borderColor:'#696969',borderWidth:1,alignItems:'center',flexDirection:'row'}}>
								<Text style={{color:'#000',fontSize:16,fontWeight:'bold',flexDirection:'column',width:'95%'}}>Change Password</Text>
								<Icon name="angle-right" size={24} color="#000" style={{flexDirection:'column',width:'5%'}}/>
							</TouchableOpacity>
							<TouchableOpacity onPress={()=>alert('Delete Account')} style={{margin:10,padding:10,borderColor:'#696969',borderWidth:1,alignItems:'center',flexDirection:'row'}}>
								<Text style={{color:'#000',fontSize:16,fontWeight:'bold',flexDirection:'column',width:'95%'}}>Delete Account</Text>
								<Icon name="angle-right" size={24} color="#000" style={{flexDirection:'column',width:'5%'}}/>
							</TouchableOpacity>
							<TouchableOpacity onPress={()=>this.props.navigation.goBack()} style={{margin:10,padding:10,borderColor:'#696969',borderWidth:1,alignItems:'center',flexDirection:'row'}}>
								<Text style={{color:'#000',fontSize:16,fontWeight:'bold',flexDirection:'column',width:'95%'}}>Cancel</Text>
								<Icon name="angle-right" size={24} color="#000" style={{flexDirection:'column',width:'5%'}}/>
							</TouchableOpacity>
						</View>
					</ScrollView>
			</View>
		)
	}
}
							// <TouchableOpacity onPress={()=>alert('submit')} style={gstyles.buttonView}><Text style={gstyles.buttonText}>Save</Text></TouchableOpacity>

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
								<TouchableOpacity onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())} style={gstyles.headerMenuButton}>
									<Icon name="bars" size={24} color="#fff" />
			                    </TouchableOpacity>
			                    <Text style={gstyles.headerProfileLabel}>Profile</Text>
					</View>
				 	<ScrollView>
						<View style={{width:'100%',alignItems:'center'}}><Text style={{padding:10,fontSize:20}}>More Settings</Text></View>
						<View>
							<TouchableOpacity onPress={()=>alert('Notifications')} style={{margin:10,padding:10,borderColor:'#696969',borderWidth:1,alignItems:'center',flexDirection:'row'}}>
								<Text style={{color:'#000',fontSize:16,fontWeight:'bold',flexDirection:'column',width:'90%'}}>Notifications</Text>
								<Icon name="angle-right" size={24} color="#000" style={{flexDirection:'column',width:'10%'}}/>
							</TouchableOpacity>
							<TouchableOpacity onPress={()=>alert('Hide Content Feed')} style={{margin:10,padding:10,borderColor:'#696969',borderWidth:1,alignItems:'center',flexDirection:'row'}}>
								<Text style={{color:'#000',fontSize:16,fontWeight:'bold',flexDirection:'column',width:'90%'}}>Hide Content Feed</Text>
								<Icon name="angle-right" size={24} color="#000" style={{flexDirection:'column',width:'10%'}}/>
							</TouchableOpacity>
							<TouchableOpacity onPress={()=>alert('Change Password')} style={{margin:10,padding:10,borderColor:'#696969',borderWidth:1,alignItems:'center',flexDirection:'row'}}>
								<Text style={{color:'#000',fontSize:16,fontWeight:'bold',flexDirection:'column',width:'90%'}}>Change Password</Text>
								<Icon name="angle-right" size={24} color="#000" style={{flexDirection:'column',width:'10%'}}/>
							</TouchableOpacity>
							<TouchableOpacity onPress={()=>alert('Delete Account')} style={{margin:10,padding:10,borderColor:'#696969',borderWidth:1,alignItems:'center',flexDirection:'row'}}>
								<Text style={{color:'#000',fontSize:16,fontWeight:'bold',flexDirection:'column',width:'90%'}}>Delete Account</Text>
								<Icon name="angle-right" size={24} color="#000" style={{flexDirection:'column',width:'10%'}}/>
							</TouchableOpacity>
							<TouchableOpacity onPress={()=>alert('Cancel')} style={{margin:10,padding:10,borderColor:'#696969',borderWidth:1,alignItems:'center',flexDirection:'row'}}>
								<Text style={{color:'#000',fontSize:16,fontWeight:'bold',flexDirection:'column',width:'90%'}}>Cancel</Text>
								<Icon name="angle-right" size={24} color="#000" style={{flexDirection:'column',width:'10%'}}/>
							</TouchableOpacity>
							<TouchableOpacity onPress={()=>alert('submit')} style={{margin:10,padding:10,backgroundColor:'#696969',alignItems:'center'}}><Text style={{color:'#fff',fontSize:16,fontWeight:'bold'}}>Save</Text></TouchableOpacity>
						</View>
					</ScrollView>
			</View>
		)
	}
}

import React, { Component } from 'react';
// import { withNavigation } from 'react-navigation';
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
import {gstyles} from '../../GlobalStyles';
import {Constants} from '../../common';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { DrawerActions } from 'react-navigation';
import CheckBox from 'react-native-checkbox';
// import iconFont from 'react-native-vector-icons/Fonts/FontAwesome.ttf';
// const window= Dimensions.get('window');

export class MultipleWishlistComponent extends Component {
	constructor(props){
		super(props);
		this.state={
			name:'',
			note:'',
			checked: false,
		}
		// alert(JSON.stringify(this.props.navigation))
	}
	Capitalize(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
    }
	render(){
		// const navigation = this.props.navigation;
		return(
				<View style={gstyles.container}>
					<View style={gstyles.headerMenu}>
								<TouchableOpacity onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())} style={gstyles.headerMenuButton}>
									<Icon name="bars" size={24} color="#fff" />
			                    </TouchableOpacity>
			                    
					</View>
					<ScrollView>
						<View style={{width:'100%',alignItems:'center'}}><Text style={{padding:10,fontSize:20}}>Add to Shopping List</Text></View>
						<Text style={{padding:10,fontSize:16}}>Please select the wishlists in which you want to add products.</Text>
						<View style={{padding:10}}>
							<CheckBox
							  label='first List'
							  labelStyle={{color:'#000',fontSize:16}}
							  onClick={() => this.setState({checked: !checked})}
							  style={{color:'#ff0000',backgroundColor:'#00ff00'}}
							/>	
						</View>
						<View style={{padding:10}}>
							<CheckBox
							  label='Second List'
							  labelStyle={{color:'#000',fontSize:16}}
							  onClick={() => this.setState({checked: !checked})}
							  style={{color:'#ff0000',backgroundColor:'#00ff00'}}
							/>	
						</View>
						<TouchableOpacity onPress={()=>this.props.navigation.navigate('Wishlists')} style={{margin:10,padding:10,backgroundColor:'#696969',alignItems:'center'}}><Text style={{color:'#fff',fontSize:16,fontWeight:'bold'}}>Save</Text></TouchableOpacity>
							<View style={{width:'100%'}}><Text style={{textAlign:'center'}}>OR</Text></View>
							<TouchableOpacity onPress={()=>this.props.navigation.goBack()} style={{margin:10,padding:10,borderColor:'#696969',borderWidth:1,alignItems:'center'}}><Text style={{color:'#000',fontSize:16,fontWeight:'bold'}}>Cancel</Text></TouchableOpacity>
					</ScrollView>
				</View>
			);
	}
}
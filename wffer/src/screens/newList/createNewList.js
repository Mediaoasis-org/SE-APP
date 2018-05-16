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
// import iconFont from 'react-native-vector-icons/Fonts/FontAwesome.ttf';
// const window= Dimensions.get('window');

export class CreateWishlistComponent extends Component {
	constructor(props){
		super(props);
		this.state={
			name:'',
			note:''
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
			                    <Text style={gstyles.headerProfileLabel}>Wishlist</Text>
					</View>
					<ScrollView>
						<View style={{width:'100%',alignItems:'center'}}><Text style={{padding:10,fontSize:20}}>Create New Wishlist</Text></View>
						<View>
							<TextInput name="wishlist_name" placeholder="Wishlist Name" returnKeyType="next" underlineColorAndroid="#fff" style={{margin:10,padding:10,borderWidth:1,borderColor:'#ccc'}}/>	
							<TextInput name="wishlist_note" placeholder="Wishlist Note" underlineColorAndroid="#fff" style={{margin:10,padding:10,borderWidth:1,borderColor:'#ccc'}}/>	
							<TouchableOpacity onPress={()=>this.props.navigation.navigate('ShoppingList')} style={{margin:10,padding:10,backgroundColor:'#696969',alignItems:'center'}}><Text style={{color:'#fff',fontSize:16,fontWeight:'bold'}}>Create</Text></TouchableOpacity>
							<View style={{width:'100%'}}><Text style={{textAlign:'center'}}>OR</Text></View>
							<TouchableOpacity onPress={()=>this.props.navigation.goBack()} style={{margin:10,padding:10,borderColor:'#696969',borderWidth:1,alignItems:'center'}}><Text style={{color:'#000',fontSize:16,fontWeight:'bold'}}>Cancel</Text></TouchableOpacity>
						</View>
					</ScrollView>
				</View>
			);
	}
}
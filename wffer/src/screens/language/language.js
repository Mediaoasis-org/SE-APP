import React, { Component } from 'react';
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

export class LanguageComponent extends Component {
	constructor(props){
		super(props);
		this.state={
			email:'',
			password:''
		}
		// alert(JSON.stringify(this.props.navigation))
	}
	
	render(){
		// const navigation = this.props.navigation;
		return(
				<View style={gstyles.container}>
					<View style={gstyles.headerMenu}>
								<TouchableOpacity onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())} style={gstyles.headerMenuButton}>
									<Icon name="bars" size={24} color="#fff" />
			                    </TouchableOpacity>
			                    <Text style={gstyles.headerProfileLabel}>{Constants.Language}</Text>
					</View>
					<View style={{padding:10}}>
						<Text style={{fontWeight:'bold'}}>Choose Your Language</Text>
						<View style={{flexDirection:'row',width:'100%'}}>
							<TouchableOpacity style={{flexDirection:'column',width:'40%',margin:'2%'}}>
								<View style={{flexDirection:'row',paddingTop:10,paddingBottom:10,paddingLeft:10,paddingRight:10,borderWidth:1,borderColor:'#000'}}>
									<Image source={require('../../../assets/sa-icon.png')} style={{flexDirection:'column',marginRight:10}}/><Text style={{flexDirection:'column',paddingTop:15}}> عربى </Text>
								</View>
							</TouchableOpacity>
							<TouchableOpacity style={{flexDirection:'column',width:'45%',margin:'2%'}}>
								<View style={{flexDirection:'row',paddingTop:10,paddingBottom:10,paddingLeft:10,paddingRight:10,borderWidth:1,borderColor:'#000'}}>
									<Image source={require('../../../assets/en-icon.png')} style={{flexDirection:'column',marginRight:10}}/><Text style={{flexDirection:'column',paddingTop:15}}> English </Text>
								</View>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			);
	}
}
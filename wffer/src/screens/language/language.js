import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import {gstyles} from '../../GlobalStyles';
import {Constants} from '../../common';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

export class LanguageComponent extends Component {
	constructor(props){
		super(props);
		this.state={
		}
		// alert(JSON.stringify(this.props.navigation))
	}
	
	render(){
		// const navigation = this.props.navigation;
		return(
				<View style={gstyles.container}>
					<View style={gstyles.headerMenu}>
								<TouchableOpacity onPress={() => this.props.navigation.openDrawer()} style={gstyles.headerMenuButton}>
									<Icon name="bars" size={24} color="#fff" />
			                    </TouchableOpacity>
			                    <Text style={gstyles.headerProfileLabel}>{Constants.Language}</Text>
			                    <Text style={gstyles.headerRightButton}></Text>
					</View>
					<View style={gstyles.padding10}>
						<View style={gstyles.profileHeadingView}><Text style={gstyles.profileHeadingText}>Choose Your Language</Text></View>
						<View style={[gstyles.width100,gstyles.flexDirectionRow]}>
							<TouchableOpacity style={gstyles.languageView}>
								<View style={gstyles.languageImageView}>
									<Image source={require('../../../assets/sa-icon.png')} resizeMode="contain" style={gstyles.languageImage}/><Text style={gstyles.languageText}> عربى </Text>
								</View>
							</TouchableOpacity>
							<TouchableOpacity style={gstyles.languageView}>
								<View style={gstyles.languageImageView}>
									<Image source={require('../../../assets/en-icon.png')} resizeMode="contain" style={gstyles.languageImage}/><Text style={gstyles.languageText}> English </Text>
								</View>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			);
	}
}
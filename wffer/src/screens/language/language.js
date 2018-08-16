import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  AsyncStorage,
} from 'react-native';
import {gstyles} from '../../GlobalStyles';
import {Constants} from '../../common';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

export class LanguageComponent extends Component {
	constructor(props){
		super(props);
		this.state={
			lang: '',
			languagesData:[],
          	language : '',
		}
		this._getStorageValue()
		// alert(JSON.stringify(this.props.navigation))
		
	}
	async _getStorageValue(){
		var languageData = await AsyncStorage.getItem('languageData');
        const Datalang = JSON.parse(languageData);
        const lang = await AsyncStorage.getItem('languageinfo');
        this.setState({language:lang})
        // alert(this.state.language);
        this.setState({languagesData : Datalang[lang]})
    }
	async selectLanguage(lang){
      // alert(city)
	      AsyncStorage.setItem('languageinfo', lang);
	      var value = await AsyncStorage.getItem('languageinfo');
	      console.log(value);
	      this.setState({lang:value})
	      // alert(this.state.lang)
	      // this.setModalVisible(!this.state.modalVisible);
	      this.props.navigation.push('Home');
	  }
	render(){
		// const navigation = this.props.navigation;
		return(
				<View style={gstyles.container}>
					<View style={gstyles.headerMenu}>
								<TouchableOpacity onPress={() => this.props.navigation.openDrawer()} style={gstyles.headerMenuButton}>
									<Icon name="bars" size={24} color="#fff" />
			                    </TouchableOpacity>
			                    <Text style={gstyles.headerProfileLabel}>{this.state.languagesData.DrawerLanguageTitleText}</Text>
			                    <Text style={gstyles.headerRightButton}></Text>
					</View>
					<View style={gstyles.padding10}>
						<View style={gstyles.profileHeadingView}><Text style={gstyles.profileHeadingText}>{this.state.languagesData.LANGUAGE_HeaderTitile}</Text></View>
						<View style={[gstyles.width100,gstyles.flexDirectionRow]}>
							<TouchableOpacity style={gstyles.languageView} onPress={()=>{this.selectLanguage('ar_SA')}}>
								<View style={gstyles.languageImageView}>
									<Image source={require('../../../assets/sa-icon.png')} resizeMode="contain" style={gstyles.languageImage}/><Text style={gstyles.languageText}> {this.state.languagesData.LANGUAGE_Arabic} </Text>
								</View>
							</TouchableOpacity>
							<TouchableOpacity style={gstyles.languageView}  onPress={()=>{this.selectLanguage('en')}}>
								<View style={gstyles.languageImageView}>
									<Image source={require('../../../assets/en-icon.png')} resizeMode="contain" style={gstyles.languageImage}/><Text style={gstyles.languageText}> {this.state.languagesData.LANGUAGE_English} </Text>
								</View>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			);
	}
}
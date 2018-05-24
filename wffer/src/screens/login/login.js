import React, { Component } from 'react';
import { Text, TextInput, View, TouchableOpacity, ScrollView, AsyncStorage } from 'react-native';
import { gstyles } from '../../GlobalStyles';
import { Constants } from '../../common';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { DrawerActions } from 'react-navigation';

export class LoginComponent extends Component {
	constructor(props){
		super(props);
		this.state={
			dataSource:[],
			// email:'',
			// password:'',
			LoggedIn:null
		}
		// alert(JSON.stringify(this.props.navigation))
		
		this._getStorageValue()
	}
	async _getStorageValue(){
	  var value = await AsyncStorage.getItem('fields');
	  // alert(value)
	  if(value!=null){
	  	// alert('entering');
	  	// const data = JSON.parse(value)
	  const	data= JSON.parse(value);
	  	this.setState({LoggedIn:true})
		this.setState({dataSource:data});
		// console.log(this.state.dataSource)
	  }
	  else
	  {
	  	this.setState({LoggedIn:false})
	  	this.fetchFields();
	  }
	}
	 fetchFields(){
		
			 return fetch('https://wffer.com/se/api/rest/login?oauth_consumer_key=mji82teif5e8aoloye09fqrq3sjpajkk&oauth_consumer_secret=aoxhigoa336wt5n26zid8k976v9pwipe',{
			       
			        // headers:{
			        //   'Accept':'application/json',
			        //   'Content-Type':'application/json',
			        // },
			        method:'GET'
			      })
			      .then((response) => response.json())
			      .then((responseJson) => {
			      	if(responseJson.status_code=='200'){
			      		 this.setState({
			          isLoading: false,
			          dataSource: responseJson.body.form,
			        },async function(){
			        await AsyncStorage.setItem('fields', JSON.stringify(this.state.dataSource));
			        	// alert(JSON.stringify(this.state.dataSource));   	
			        });
			      	}
			      	else
			      	{
			      		// this.setState({Message:responseJson.Message});
			      	}
			      })
			      .catch((error) =>{
			        console.error(error);
			      });
			
	}
	Capitalize(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
    }
    renderForm(){
    	
    	this.state.dataSource.map((item)=>{
			// alert(item.type)
			return (
				<View style={{width:'100%',flexDirection:'row'}}>
						<Text>fdfdf</Text>
						
				</View>
				
			);
		})
    }
	render(){
		
		return(
				<View style={gstyles.container}>
					<View style={gstyles.headerMenu}>
								<TouchableOpacity onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())} style={gstyles.headerMenuButton}>
									<Icon name="bars" size={24} color="#fff" />
			                    </TouchableOpacity>
			                    <Text style={gstyles.headerProfileLabel}>{Constants.Login}</Text>
					</View>
					<ScrollView>
						<View style={gstyles.profileHeadingView}><Text style={gstyles.profileHeadingText}>Sign In</Text></View>
						
						<View>
								{

							    	this.state.dataSource.map((item)=>{
									
										if(item.type=='Text'){
											return (
											<View>
													<TextInput name={item.name} style={gstyles.textInputStyle} placeholder={item.label} underlineColorAndroid="#fff"/>
													
											</View>
											
										);
										}
										if(item.type=='Password'){
											return (
											<View>
													<TextInput name={item.name} style={gstyles.textInputStyle} secureTextEntry={true} placeholder={item.label} underlineColorAndroid="#fff"/>
													
											</View>
											)
										}
										if(item.type=='Submit'){
											return (
											<View>
													<TouchableOpacity onPress={()=>alert('submit')} style={gstyles.buttonView}>
														<Text style={gstyles.buttonText}>{item.label}</Text>
													</TouchableOpacity>
													
											</View>
											)
										}
									})
								}
							
						
							
							
							<View style={gstyles.newToView}><Text style={gstyles.newToText}>New to Wffer ?</Text></View>
							<TouchableOpacity style={gstyles.createAccountView} onPress={()=>this.props.navigation.navigate('Signup')}>
								<Text style={gstyles.createAccountText}>Create New Account</Text>
							</TouchableOpacity>
							<View style={gstyles.forgetPasswordView}>
								<TouchableOpacity style={gstyles.flexDirectionColumn} onPress={()=>this.props.navigation.navigate('ForgetPassword')}>
									<Text style={gstyles.forgetPasswordText}>Forget Password ?</Text>
								</TouchableOpacity>
								<TouchableOpacity style={gstyles.flexDirectionColumn}>
									<Text style={gstyles.forgetPasswordText}>Help</Text>
								</TouchableOpacity>
							</View>
						</View>
					</ScrollView>
				</View>
			);
	}
}
// <TextInput name="email" keyboardType="email-address" placeholder="Email Address" returnKeyType="next" underlineColorAndroid="#fff" style={gstyles.textInputStyle}/>	
// <TextInput name="password" placeholder="Password" secureTextEntry={true} underlineColorAndroid="#fff" style={gstyles.textInputStyle}/>	
// <TouchableOpacity onPress={()=>alert('submit')} style={gstyles.buttonView}>
// 	<Text style={gstyles.buttonText}>Submit</Text>
// </TouchableOpacity>
// ref={ref => {this._nameInput = ref}}
import React, { Component } from 'react';
import { Text, TextInput, View, TouchableOpacity, ScrollView,AsyncStorage } from 'react-native';
import { Constants } from '../../common';
import { ModalDropdownComponent } from '../../components/ModalDropdown';
import { gstyles } from '../../GlobalStyles';
import CheckBox from 'react-native-checkbox';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { DrawerActions } from 'react-navigation';

export class SignupComponent extends Component {
	constructor(props){
		super(props);
		this.state={
			dataSource:[],
			// email:'',
			// password:'',
			 checked: false,
			 LoggedIn:null
		}
		// alert(JSON.stringify(this.props.navigation))
		this._getStorageValue()
	}
	async _getStorageValue(){
	  var value = await AsyncStorage.getItem('fieldsSignup');
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
		
			 return fetch('https://wffer.com/se/api/rest/signup?oauth_consumer_key=mji82teif5e8aoloye09fqrq3sjpajkk&oauth_consumer_secret=aoxhigoa336wt5n26zid8k976v9pwipe',{
			       
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
			          dataSource: responseJson.body.account,
			        },async function(){
			       	  await AsyncStorage.setItem('fieldsSignup', JSON.stringify(this.state.dataSource));
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
	render(){
		return(
				<View style={gstyles.container}>
					<View style={gstyles.headerMenu}>
								<TouchableOpacity onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())} style={gstyles.headerMenuButton}>
									<Icon name="bars" size={24} color="#fff" />
			                    </TouchableOpacity>
			                    <Text style={gstyles.headerProfileLabel}>{Constants.Signup}</Text>
					</View>
					<ScrollView>
						<View style={gstyles.profileHeadingView}><Text style={gstyles.profileHeadingText}>Sign Up</Text></View>
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
										if(item.type=='Select'){
											var options = item.multiOptions;
											var result = [];
											for(var i in options)
											    result.push([i, options [i]]);
											return(
											<View>
												<ModalDropdownComponent defaultValue={item.type + item.label}
				                					options={options}/>
				                			</View>
											)
											
										}
										if(item.type=='Checkbox'){
											return(
											<View style={{flexDirection: 'row',padding: 10,width:'100%'}}>
												<CheckBox
												  label={item.description}
												  labelStyle={{color:'#000',fontSize:16,padding:3}}
												  onClick={() => this.setState({checked: !checked})}
												  style={{color:'#ff0000',backgroundColor:'#00ff00'}}
												  labelLines={4}
												  

												/>
											</View>
											)
										}
									})
								
								}
								
						
							
								
				   			
				   			<View style={gstyles.termsView}><TouchableOpacity><Text style={gstyles.termsLink}>Click Here</Text></TouchableOpacity><Text style={gstyles.fontSize18}> to read the terms of service</Text></View>
							<TouchableOpacity onPress={()=>alert('submit')} style={gstyles.buttonView}><Text style={gstyles.buttonText}>Submit</Text></TouchableOpacity>
							
						</View>
					</ScrollView>
				</View>
			);
	}
}

// <TextInput name="email" keyboardType="email-address" placeholder="Email Address" returnKeyType="next" underlineColorAndroid="#fff" style={gstyles.textInputStyle}/>	
// 							<TextInput name="password" placeholder="Password" secureTextEntry={true} underlineColorAndroid="#fff" style={gstyles.textInputStyle}/>	
// 							<TextInput name="confirm_password" placeholder="Confirm Password" secureTextEntry={true} underlineColorAndroid="#fff" style={gstyles.textInputStyle}/>
	// <ModalDropdownComponent defaultValue='Select Time Zone'
	// 			                	options={['(UTC+5:30) Bombay,Calcutta,New Delhi','(UTC+5:45) Nepal','(UTC+6) Dhaka','(UTC+9:30) Darwin']}/>	
	// 						<ModalDropdownComponent defaultValue='Select Language' options={['English','Saudi Arabia Arabic']}/>

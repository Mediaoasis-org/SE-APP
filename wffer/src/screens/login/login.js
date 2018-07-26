import React, { Component } from 'react';
import { Text, TextInput, View, TouchableOpacity, ScrollView, AsyncStorage,FlatList, ActivityIndicator} from 'react-native';
import { gstyles } from '../../GlobalStyles';
import { Constants } from '../../common';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
// import { DrawerActions } from 'react-navigation';
  
export class LoginComponent extends Component {
	constructor(props){
		super(props);
		this.state={
			email:'',
			password:'',
			dataSource:[],
			dataSource1:[],
			userData:[],
			LoggedIn:null,
			isLoading:true,
		}
		// alert(JSON.stringify(this.props.navigation))
		
		this._getStorageValue()
	}
	async _getStorageValue(){
	  var fieldData = await AsyncStorage.getItem('fields');
	  // alert(value)
	  if(fieldData !== null){
	  	// alert('entering');
	  	// const data = JSON.parse(value)
	    const data= JSON.parse(fieldData);
	  	this.setState({LoggedIn:1})
		this.setState({dataSource:data});
		this.setState({isLoading:false})
		// console.log(this.state.dataSource)
	  }
	  else
	  {
	  	this.setState({LoggedIn:0})
	  	this.fetchFields();
	  }
	}
	 fetchFields(){
			 return fetch('https://wffer.com/se/api/rest/login?oauth_consumer_key=mji82teif5e8aoloye09fqrq3sjpajkk&oauth_consumer_secret=aoxhigoa336wt5n26zid8k976v9pwipe',{
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
    login(){
	     	var formData = new FormData;
		    formData.append('email',this.state.email);
		    formData.append('password',this.state.password);
		    formData.append('oauth_consumer_key','mji82teif5e8aoloye09fqrq3sjpajkk');
		    formData.append('oauth_consumer_secret','aoxhigoa336wt5n26zid8k976v9pwipe');
		    formData.append('ip','45.121.29.194');
		      return fetch('https://wffer.com/se/api/rest/login',{
		        body: formData,
		        headers:{
		          'Accept':'application/json',
		         'Content-Type': 'multipart/form-data'
		        },
		        method:'POST'
		      })
		        .then((response) => response.json())
		        .then((responseJson) => {
		        	
		          if(responseJson.status_code=="200"){
		            this.setState({
		              // isLoading: false,
		              dataSource1: responseJson.body.oauth_token,
		              userData: responseJson.body.user,
		            }, async function(){
			        await AsyncStorage.setItem('userLoginAuthentication', responseJson.body.oauth_token);
			        await AsyncStorage.setItem('userData',JSON.stringify(responseJson.body));
		              this.props.navigation.navigate('Home');
		            });
		          }
		          else
		          {
		            this.setState({
		              Message : responseJson.message,
		            })
		            alert(JSON.stringify(responseJson.message))
		          
		          }
		          

		        })
		       
		        .catch((error) =>{
		          console.error(error);
		          alert('There was an error logging in.');
		        });
  	}
    _keyExtractor = (item, index) => index.toString();
    render_item = ({item}) => {
    		if(item.type=='Text'){						
				return (
				<View>
						<TextInput name={item.name} style={gstyles.textInputStyle} returnKeyType={"next"}  placeholder={item.label} underlineColorAndroid="#fff" onChangeText={(text) => this.setState({[item.name]: text})}/>	
				</View>
				
			);
			} 
			if(item.type=='Password'){
				return (
				<View>
						<TextInput name={item.name} style={gstyles.textInputStyle} returnKeyType={"done"}  secureTextEntry={true} placeholder={item.label} underlineColorAndroid="#fff"  onChangeText={(text) => this.setState({[item.name]: text})} />			
				</View>
				);
			}
			if(item.type=='Submit'){
				return (
				<View>
						<TouchableOpacity onPress={()=>this.login()} style={gstyles.buttonView}>
							<Text style={gstyles.buttonText}>{item.label}</Text>
						</TouchableOpacity>	
				</View>
				);
			}
    }
	render(){
		return(
				<View style={gstyles.container}>
					<View style={gstyles.headerMenu}>
								<TouchableOpacity onPress={() => this.props.navigation.openDrawer()} style={gstyles.headerMenuButton}>
									<Icon name="bars" size={24} color="#fff" />
			                    </TouchableOpacity>
			                    <Text style={gstyles.headerProfileLabel}>{Constants.Login}</Text>
			                    <Text style={gstyles.headerRightButton}></Text>
					</View>
					{
						this.state.isLoading ? <View style={gstyles.loading}><ActivityIndicator style={gstyles.loadingActivity} color='#333' size="large"/></View> :
						<ScrollView>
							<View style={gstyles.profileHeadingView}><Text style={gstyles.profileHeadingText}>Sign In</Text></View>
								<FlatList extraData={this.state.dataSource}
								  data={this.state.dataSource}
								  renderItem={this.render_item}	
								  keyExtractor={this._keyExtractor}
								/>							
								<View style={gstyles.newToView}><Text style={gstyles.newToText}>New to Wffer ?</Text></View>
								<TouchableOpacity style={gstyles.createAccountView} onPress={()=>this.props.navigation.push('Signup')}>
									<Text style={gstyles.createAccountText}>Create New Account</Text>
								</TouchableOpacity>
								<View style={gstyles.forgetPasswordView}>
									<TouchableOpacity style={gstyles.flexDirectionColumn} onPress={()=>this.props.navigation.push('ForgetPassword')}>
										<Text style={gstyles.forgetPasswordText}>Forget Password ?</Text>
									</TouchableOpacity>
									<TouchableOpacity style={gstyles.flexDirectionColumn} onPress={()=>this.props.navigation.push('Help')}>
										<Text style={gstyles.forgetPasswordText}>Help</Text>
									</TouchableOpacity>
								</View>
							
						</ScrollView>
					}
				</View>
			);
	}
}
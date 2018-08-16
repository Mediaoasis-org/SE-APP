import React, { Component } from 'react';
import { Text, TextInput, View, TouchableOpacity, ScrollView, AsyncStorage,FlatList, ActivityIndicator} from 'react-native';
import { gstyles } from '../../GlobalStyles';
import { Constants } from '../../common';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Toast, {DURATION} from 'react-native-easy-toast'
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
			email_error:'',
			password_error:'',
			languagesData:[],
          	language : '',
		}
		// alert(JSON.stringify(this.props.navigation))
		
		this._getStorageValue()
	}
	async _getStorageValue(){
		var languageData = await AsyncStorage.getItem('languageData');
        const Datalang = JSON.parse(languageData);
        const lang = await AsyncStorage.getItem('languageinfo');
        this.setState({language:lang})
        // alert(this.state.language);
        this.setState({languagesData : Datalang[lang]})
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
    	this.setState({email_error:'',password_error:''});
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
		              email_error:'',
		              password_error:''
		              
		            }, async function(){
			        await AsyncStorage.setItem('userLoginAuthentication', responseJson.body.oauth_token);
			        await AsyncStorage.setItem('userData',JSON.stringify(responseJson.body));
		              this.props.navigation.push('Home');
		            });
		          }
		          else if(responseJson.status_code=="401"){
		          		 this.setState({
			              Message : responseJson.message,
			            })
		            	alert(this.state.Message)
		            
		          }
		          else if(responseJson.status_code=='400')
		          {
		            this.setState({
		              Message : responseJson.message,
		            })
		           
		            // console.log(responseJson.error_code)
		            console.log(this.state.Message);
		            // this.state.Message.map((item)=>{
		            // 	console.log(item)
		            // })
		            Object.entries(this.state.Message).map(([key, value]) => {
		            	// console.log(`${value}`);
		            	if(key == 'email'){
		            		this.setState({email_error:value});
		            		// this.refs.toast.show(this.state.email_error);
		            		
		            		// this.refs.toast.show(value,1000);
		            		// this.refs.toast.close()
		            	}
		            	 if(key == 'password'){
		            		this.setState({password_error:value});
		            		// this.refs.toast.show(this.state.password_error);
		            		
		            		// this.refs.toast.show(value,2000);
		            		// this.refs.toast.close()
		            	}
		            	// this.refs.toast.close()
		            	// this.refs.toast.show(value);
		            	// console.log(value)
		            })
		          
		          }
		          

		        })
		       
		        .catch((error) =>{
		          console.error(error);
		          alert('There was an error logging in.');
		        });
  	}
    _keyExtractor = (item, index) => index.toString();
    render_item = ({item}) => {
    		
    }
	render(){
		return(
				<View style={gstyles.container}>
					<View style={gstyles.headerMenu}>
								<TouchableOpacity onPress={() => this.props.navigation.openDrawer()} style={gstyles.headerMenuButton}>
									<Icon name="bars" size={24} color="#fff" />
			                    </TouchableOpacity>
			                    <Text style={gstyles.headerProfileLabel}>{this.state.languagesData.LOGIN_HeaderTitle}</Text>
			                    <Text style={gstyles.headerRightButton}></Text>
					</View>
					{
						this.state.isLoading ? <View style={gstyles.loading}><ActivityIndicator style={gstyles.loadingActivity} color='#333' size="large"/></View> :
						<View>
							
							
							<View style={gstyles.profileHeadingView}><Text style={gstyles.profileHeadingText}>{this.state.languagesData.LOGIN_HeaderTitle}</Text></View>
								<FlatList extraData={this.state}
								  data={this.state.dataSource}
								  renderItem={({item})=>
								  {
								  		if(item.type=='Text'){						
											return (
											<View>
													<TextInput name={item.name} style={[gstyles.textInputStyle,(this.state.email_error!='') ? {borderWidth:1,borderColor:'red'} : null]} returnKeyType={"next"}  placeholder={item.label} underlineColorAndroid="#fff" onChangeText={(text) => this.setState({[item.name]: text})}/>	
													{this.state.email_error!='' ? <Text style={gstyles.texterrorStyle}>{this.state.email_error}</Text> : null }
											</View>	
											);
										} 
										if(item.type=='Password'){
											return (
											<View>
													<TextInput name={item.name} style={[gstyles.textInputStyle,(this.state.password_error!='') ? {borderWidth:1,borderColor:'red'} : null]} returnKeyType={"done"}  secureTextEntry={true} placeholder={item.label} underlineColorAndroid="#fff"  onChangeText={(text) => this.setState({[item.name]: text})} />
													{this.state.password_error!='' ? <Text style={gstyles.texterrorStyle}>{this.state.password_error}</Text> : null }	
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
								  }	
								  keyExtractor={this._keyExtractor}
								/>							
								<View style={gstyles.newToView}><Text style={gstyles.newToText}>New to Wffer ?</Text></View>
								<TouchableOpacity style={gstyles.createAccountView} onPressIn={()=>this.props.navigation.push('Signup')}>
									<Text style={gstyles.createAccountText}>{this.state.languagesData.LOGIN_SignUpButtonText}</Text>
								</TouchableOpacity>
								<View style={gstyles.forgetPasswordView}>
									<TouchableOpacity style={gstyles.flexDirectionColumn} onPressIn={()=>this.props.navigation.push('ForgetPassword')}>
										<Text style={gstyles.forgetPasswordText}>{this.state.languagesData.LOGIN_ForgetPasswordText}</Text>
									</TouchableOpacity>
									<TouchableOpacity style={gstyles.flexDirectionColumn} onPressIn={()=>this.props.navigation.push('Help')}>
										<Text style={gstyles.forgetPasswordText}>{this.state.languagesData.LOGIN_HelpText}</Text>
									</TouchableOpacity>
								</View>
							
						</View>
					}
				</View>
			);
	}
}

// {this.state.email_error!='' ? null : <Text style={{flex:1,height:50}}>{this.state.email_error}</Text> }
// 							{this.state.password_error=='' ? null : <Text style={{height:50}}>{this.state.password_error}</Text> }
// <Toast ref="toast"/>
import React, { Component } from 'react';
import { Text, TextInput, View, TouchableOpacity, FlatList, ScrollView,AsyncStorage,ActivityIndicator } from 'react-native';
import { gstyles } from '../../GlobalStyles';
// import { DrawerActions } from 'react-navigation';
// import { Constants } from '../../common';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
// import api from '../../api/auth';
export class ChangePasswordComponent extends Component {
	constructor(props){
		super(props);
		this.state={
			isLoading:true,
			dataSource:[],
			userData:[],
			oldPassword:'',
			password:'',
			passwordConfirm:'',
			LoggedIn:null,
			oauthToken:'',
			oauthSecret:''

		}
		// this.isButtonDisabled=false;
		// alert(JSON.stringify(this.props.navigation))
		this._getStorageValue()
	}
	static navigationOptions = {
        title: 'Chagne Password',
    };
	async _getStorageValue(){

		// this.fetchFields()
	  var value = await AsyncStorage.getItem('changepasswordFields');
	  var userData = await AsyncStorage.getItem('userData');
	  	 this.setState({userData:JSON.parse(userData)});
		 this.setState({oauthToken:this.state.userData.oauth_token});
		 this.setState({oauthSecret:this.state.userData.oauth_secret});
	  // alert(value)
	  if(value!=null){
	    const data= JSON.parse(value);
	  	this.setState({LoggedIn:1})
		this.setState({dataSource:data});
		this.setState({isLoading:false})
	  }
	  else
	  {
	  	this.setState({LoggedIn:0})
	  	this.fetchFields();
	  }
	}
	fetchFields(){
		
			 return fetch('https://wffer.com/se/api/rest/members/settings/password?oauth_consumer_key=mji82teif5e8aoloye09fqrq3sjpajkk&oauth_consumer_secret=aoxhigoa336wt5n26zid8k976v9pwipe&oauth_token='+ this.state.oauthToken + '&oauth_secret=' + this.state.oauthSecret,{
			       
			        headers:{
			          'Accept':'application/json',
			          // 'Content-Type':'application/json',
			        },
			        method:'GET'
			      })
			      .then((response) => response.json())
			      .then((responseJson) => {
			      	if(responseJson.status_code=='200'){
			      		 this.setState({
			          isLoading: false,
			          dataSource: responseJson.body,
			        },async function(){
			        		await AsyncStorage.setItem('changepasswordFields', JSON.stringify(this.state.dataSource));
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
	chagnePassword(){
	        var formData = new FormData;
		    formData.append('oldPassword',this.state.oldPassword);
		    formData.append('password',this.state.password);
		    formData.append('passwordConfirm',this.state.passwordConfirm);
		    formData.append('oauth_consumer_key','mji82teif5e8aoloye09fqrq3sjpajkk');
		    formData.append('oauth_consumer_secret','aoxhigoa336wt5n26zid8k976v9pwipe');
		    formData.append('oauth_token',this.state.oauthToken);
		    formData.append('oauth_secret',this.state.oauthSecret);
		      return fetch('https://wffer.com/se/api/rest/members/settings/password',{
		        body: formData,
		        headers:{
		          'Accept':'application/json',
		         'Content-Type': 'multipart/form-data'
		        },
		        method:'POST'
		      })
		        .then((response) => response.json())
		        .then((responseJson) => {
		        	if(responseJson.status_code=="204"){
		        		let message = "Password Changed Successfully.";
		        		this.setState({Message:message})
		        	}
		        	else if(responseJson.status_code=="400"){
		        		this.setState({Message:responseJson.message});
		        		this.props.navigation.navigate('ChangePassword')
		        	}
		        	else if(responseJson.status_code=="401"){
		        		this.setState({Message:responseJson.message})
		        	}
		         	this.textInput.clear()
		            Object.entries(this.state.Message).map(([key, value]) => {
		            	// console.log(`${value}`);

		            	alert(key +', '+ value)
		            })
		        })
		       
		        .catch((error) =>{
		          console.error(error);
		          alert('There was an error logging in.');
		        });
  	}
	Capitalize(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
    }
     disable(){
	     // this.isButtonDisabled= true; setTimeout(() => this.isButtonDisabled = false , 1000);
	  }
    _keyExtractor = (item, index) => index.toString();
    render_item = ({item}) => {
    		 
			if(item.type=='Password'){
				return (
				<View key={item.id}>
						<TextInput name={item.name} style={gstyles.textInputStyle} ref={input => { this.textInput = input }} returnKeyType={"done"}  secureTextEntry={true} placeholder={item.label} underlineColorAndroid="#fff"  onChangeText={(text) => this.setState({[item.name]: text})} />
						
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
							                    <Text style={gstyles.headerProfileLabel}>Change Password</Text>
							                    <Text style={gstyles.headerRightButton}></Text>
									</View>
									<ScrollView>
							{ 
		           				this.state.isLoading ? <View style={gstyles.loading}><ActivityIndicator style={gstyles.loadingActivity} color='#333' size="large"/></View> :
									<View>
									
										<View style={gstyles.profileHeadingView}><Text style={gstyles.profileHeadingText}>Change Password</Text></View>
										<View>
											<FlatList extraData={this.state.dataSource}
												  data={this.state.dataSource}
												  renderItem={this.render_item}	
												  keyExtractor={this._keyExtractor}
											/>	
											
											<TouchableOpacity onPress={()=>{ this.disable();this.chagnePassword()}}  style={gstyles.buttonView}><Text style={gstyles.buttonText}>Change Password</Text></TouchableOpacity>
										</View>
									
									</View>
							}
							</ScrollView>
						</View>
				
			);
	}
}
/// <TextInput name="oldPassword" secureTextEntry={true} placeholder="Old Password" returnKeyType={"next"} underlineColorAndroid="#fff" style={gstyles.textInputStyle} onChangeText={(text) => this.setState({oldPassword: text})}/>
// 							<TextInput name="password" secureTextEntry={true} placeholder="Old Password" returnKeyType={"next"} underlineColorAndroid="#fff" style={gstyles.textInputStyle} onChangeText={(text) => this.setState({password: text})}/>
// 							<TextInput name="passwordConfirm" secureTextEntry={true} placeholder="Old Password" returnKeyType={"next"} underlineColorAndroid="#fff" style={gstyles.textInputStyle} onChangeText={(text) => this.setState({passwordConfirm: text})}/>
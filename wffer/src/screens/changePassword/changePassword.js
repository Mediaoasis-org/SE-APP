import React, { Component } from 'react';
import { Text, TextInput, View, Dimension, TouchableOpacity, Image, FlatList, ScrollView,AsyncStorage } from 'react-native';
import { gstyles } from '../../GlobalStyles';
import { DrawerActions } from 'react-navigation';
import { Constants } from '../../common';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import api from '../../api/auth';
export class ChangePasswordComponent extends Component {
	constructor(props){
		super(props);
		this.state={
			dataSource:[],
			userData:[],
			oldPassword:'',
			password:'',
			passwordConfirm:'',
			LoggedIn:null,
			oauthToken:'',
			oauthSecret:''

		}
		// alert(JSON.stringify(this.props.navigation))
		this._getStorageValue()
	}
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
		        		// this.props.navigation.navigate("Home");
		        		// api.logout().then((data) => {
					      // this.setState({LoggedIn:0})
					      // console.log(data)
					      // this.props.navigation.navigate('ChangePassword')
					    // })
		        	}
		        	else if(responseJson.status_code=="400"){
		        		this.setState({Message:responseJson.message});
		        		this.props.navigation.navigate('ChangePassword')
		        	}
		        	else if(responseJson.status_code=="401"){
		        		this.setState({Message:responseJson.message})
		        	}
		         //  if(responseJson.status_code=="200"){
		         //    this.setState({
		         //      isLoading: false,
		         //      // dataSource1: responseJson.body.oauth_token,
		         //    }, async function(){
			        // // await AsyncStorage.setItem('userLoginAuthentication', responseJson.body.oauth_token);
		         //      // alert(JSON.stringify(responseJson.body.user));
		         //      // alert(this.state.dataSource1)
		         //      alert("Logged In");
		         //      this.props.navigation.navigate('Home');
		         //    });
		         //  }
		         //  else
		         //  {
		         //    this.setState({
		         //      Message : responseJson.message,
		         //    })
		         	this.textInput.clear()
		            alert(this.state.Message)
		          
		         //  }
		          

		        })
		       
		        .catch((error) =>{
		          console.error(error);
		          alert('There was an error logging in.');
		        });
  	}
  	// logout = async() => {
   //    await AsyncStorage.removeItem('userLoginAuthentication');
   //     this.setState({LoggedIn:0})
   //    this.props.navigation.navigate('Login');
   //  }
	Capitalize(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
    }
    _keyExtractor = (item, index) => item.id;
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
								<TouchableOpacity onPress={() =>this.props.navigation.goBack() } style={gstyles.headerMenuButton}>
									<Icon name="angle-left" size={30} color="#fff" />
			                    </TouchableOpacity>
			                    <Text style={gstyles.headerProfileLabel}>Change Password</Text>
			                    
					</View>
					<ScrollView>
						<View style={gstyles.profileHeadingView}><Text style={gstyles.profileHeadingText}>Change Password</Text></View>
						<View>
							<FlatList extraData={this.state.dataSource}
								  data={this.state.dataSource}
								  renderItem={this.render_item}	
								  keyExtractor={this._keyExtractor}
							/>	
							
							<TouchableOpacity onPress={()=>this.chagnePassword()} style={gstyles.buttonView}><Text style={gstyles.buttonText}>Change Password</Text></TouchableOpacity>
						</View>
					</ScrollView>
				</View>
			);
	}
}
// <TextInput name="oldPassword" secureTextEntry={true} placeholder="Old Password" returnKeyType={"next"} underlineColorAndroid="#fff" style={gstyles.textInputStyle} onChangeText={(text) => this.setState({oldPassword: text})}/>
// 							<TextInput name="password" secureTextEntry={true} placeholder="Old Password" returnKeyType={"next"} underlineColorAndroid="#fff" style={gstyles.textInputStyle} onChangeText={(text) => this.setState({password: text})}/>
// 							<TextInput name="passwordConfirm" secureTextEntry={true} placeholder="Old Password" returnKeyType={"next"} underlineColorAndroid="#fff" style={gstyles.textInputStyle} onChangeText={(text) => this.setState({passwordConfirm: text})}/>
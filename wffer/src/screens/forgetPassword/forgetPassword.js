import React, { Component } from 'react';
import { Text, TextInput, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import { gstyles } from '../../GlobalStyles';
import { DrawerActions } from 'react-navigation';
import { Constants } from '../../common';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

export class ForgetComponent extends Component {
	constructor(props){
		super(props);
		this.state={
			email:'',
			Message:''
		}
	}
	forget(){

	     var formData = new FormData;
		    formData.append('email',this.state.email);
		    formData.append('oauth_consumer_key','mji82teif5e8aoloye09fqrq3sjpajkk');
		    formData.append('oauth_consumer_secret','aoxhigoa336wt5n26zid8k976v9pwipe');
		    
		      return fetch('https://wffer.com/se/api/rest/forgot-password',{
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
		        		let message = "email has been sent.";
		        		this.setState({Message:message})
		        		this.props.navigation.navigate('Home');
		        	}
		        	else if(responseJson.status_code=="400"){
		        		this.setState({Message:responseJson.message})
		        	}
		        	else if(responseJson.status_code=="401"){
		        		this.setState({Message:responseJson.message})
		        	}		        
		         	this.textInput.clear()
		            alert(this.state.Message)
		        })		       
		        .catch((error) =>{
		          console.error(error);
		          alert('There was an error logging in.');
		        });
  	}
	Capitalize(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
    }
	render(){
		return(
				<View style={gstyles.container}>
					<View style={gstyles.headerMenu}>
								<TouchableOpacity onPress={() =>this.props.navigation.goBack() } style={gstyles.headerMenuButton}>
									<Icon name="angle-left" size={30} color="#fff" />
			                    </TouchableOpacity>
			                    <Text style={gstyles.headerProfileLabel}>{Constants.forgetPassword}</Text>           
					</View>
					<ScrollView>
						<View style={gstyles.profileHeadingView}><Text style={gstyles.profileHeadingText}>Forget Password</Text></View>
						<View>
							<TextInput name="email" ref={input => { this.textInput = input }} keyboardType="email-address" placeholder="Email Address" returnKeyType={"done"} underlineColorAndroid="#fff" style={gstyles.textInputStyle} onChangeText={(text) => this.setState({email: text})}/>	
							<TouchableOpacity onPress={()=>this.forget()} style={gstyles.buttonView}><Text style={gstyles.buttonText}>Submit</Text></TouchableOpacity>
						</View>
					</ScrollView>
				</View>
			);
	}
}
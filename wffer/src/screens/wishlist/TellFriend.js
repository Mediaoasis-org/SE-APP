import React, { Component } from 'react';
import { Text, TextInput, View, TouchableOpacity, ScrollView, AsyncStorage,FlatList,ActivityIndicator } from 'react-native';
import { gstyles } from '../../GlobalStyles';
import { Constants } from '../../common';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { DrawerActions } from 'react-navigation';
import CheckBox from 'react-native-checkbox';

export class TellFriendComponent extends Component {
	constructor(props){
		super(props);
		this.state={
			sender_name:'',
			sender_email:'',
			receiver_emails:'',
			send_me:'',
			message:'',
			// checked: false,
			dataSource:[],
			userData:[],
			oauthToken:'',
			oauthSecret:'',
			LoggedIn:null,
			isLoading:true,
		}
		this.checked=false;
		this._getStorageValue()
	}
	async _getStorageValue(){
		// alert(this.props.navigation.state.params.wishlist_id);
		// this.fetchFields();
		const userData = await AsyncStorage.getItem('userData');
	 	const fieldData = await AsyncStorage.getItem('TellFriendFields');
  		this.setState({userData:JSON.parse(userData)});
        this.setState({oauthToken:this.state.userData.oauth_token});
        this.setState({oauthSecret:this.state.userData.oauth_secret});
        this.fetchValues();
        // console.log(this.state.sender_email)
		  if(fieldData != null){
		    const data= JSON.parse(fieldData);
			this.setState({dataSource:data});
			this.setState({isLoading:false});
		  }
		  else
		  {
		  	this.fetchFields();
		  }

	}
	fetchFields(){
			let wishlist_id = this.props.navigation.state.params.wishlist_id;
			 return fetch('https://wffer.com/se/api/rest/listings/wishlist/tell-a-friend?oauth_consumer_key=mji82teif5e8aoloye09fqrq3sjpajkk&oauth_consumer_secret=aoxhigoa336wt5n26zid8k976v9pwipe&oauth_token='+ this.state.oauthToken + '&oauth_secret='+this.state.oauthSecret+'&listingtype_id=2&wishlist_id='+wishlist_id,{
			        method:'GET'
			      })
			      .then((response) => response.json())
			      .then((responseJson) => {
			      	// alert(JSON.stringify(responseJson));
			      	if(responseJson.status_code=='200'){
			      		 this.setState({
				          isLoading: false,
				          dataSource: responseJson.body.form,
			        },async function(){
				        	await AsyncStorage.setItem('TellFriendFields', JSON.stringify(this.state.dataSource));
				        	// alert(JSON.stringify(this.state.dataSource));   	
			        });
			      	}
			      	else
			      	{
			      		this.setState({Message:responseJson.Message});
			      		// alert(this.state.Message)
			      	}
			      })
			      .catch((error) =>{
			        console.error(error);
			      });
			
	}

	fetchValues(){
		let wishlist_id = this.props.navigation.state.params.wishlist_id;
			return fetch('https://wffer.com/se/api/rest/listings/wishlist/tell-a-friend?oauth_consumer_key=mji82teif5e8aoloye09fqrq3sjpajkk&oauth_consumer_secret=aoxhigoa336wt5n26zid8k976v9pwipe&oauth_token='+ this.state.oauthToken + '&oauth_secret='+this.state.oauthSecret+'&listingtype_id=2&wishlist_id='+wishlist_id,{
			        method:'GET'
			      })
			      .then((response) => response.json())
			      .then((responseJson) => {
			      	if(responseJson.status_code=='200'){
			      		 this.setState({
			          isDataLoading: false,
			          fieldValues: responseJson.body.formValues,
			        },function(){
			        		this.setState({'sender_name':this.state.fieldValues.sender_name})
			        		this.setState({'sender_email':this.state.fieldValues.sender_email})        
			        		// alert(this.state.title)	
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

	onChange(text,name){
     	var state = name;
     	var val = text;
     	// console.log(state);
     	// console.log(val);   
     	var obj1  = {}
     	obj1[state] = val;
     	// console.log(obj1)
     	this.setState(obj1);
     	
     }
     
     ShareList(){
    		let wishlist_id = this.props.navigation.state.params.wishlist_id;
    		var formData = new FormData;
		    formData.append('sender_name',this.state.sender_name);
		    formData.append('sender_email',this.state.sender_email);
		    formData.append('receiver_emails',this.state.receiver_emails);
		    formData.append('message',this.state.message);
		    formData.append('send_me',this.state.send_me);
		       fetch('https://wffer.com/se/api/rest/listings/wishlist/tell-a-friend?oauth_consumer_key=mji82teif5e8aoloye09fqrq3sjpajkk&oauth_consumer_secret=aoxhigoa336wt5n26zid8k976v9pwipe&oauth_token='+ this.state.oauthToken + '&oauth_secret='+this.state.oauthSecret+'&wishlist_id='+wishlist_id,{
		        body: formData,
		        headers:{
		          'Accept':'application/json',
		          // 'Content-Type': 'multipart/form-data'
		        },
		        method:'POST'
		       })
		        .then((response) => response.json())
		        .then((responseJson) => {      	
		          if(responseJson.status_code=="204"){
		            this.props.navigation.push('Wishlists',{wishlist_id:wishlist_id});
		          }
		          else
		          {
		            this.setState({
		              Message : responseJson.message,
		            })
		            alert(JSON.stringify(responseJson))
		          }
		        })
		       
		        .catch((error) =>{
		          console.error(error);
		        });
    }
    chagneState(){
    	this.checked=!this.checked;
    	this.setState({send_me:this.checked})
    	// console.log(this.checked)
    }

	render(){
		return(
			<View style={gstyles.container}>
					<View style={gstyles.headerMenu}>
			                    <Text style={gstyles.headerProfileLabel}>Wffer</Text>      
					</View>
					{ 
                      this.state.isLoading ?   <View style={gstyles.container}><ActivityIndicator color='#00ff00' size="large"/></View> :
                      							<ScrollView>
                      								<View style={gstyles.profileHeadingView}><Text style={gstyles.profileHeadingText}>Tell A Friend</Text></View>
                      									{
                      										this.state.dataSource.map((item)=>{
                      											if(item.type=='Text' || item.type=='Textarea' || item.type=="Password"){
																	return (
																	<View>
																			<TextInput name={item.name} 
																					returnKeyType="next"
																					style={gstyles.textInputStyle} 
																					ref={(input) => {this[item.name] = input; }}	    
																					onSummitTextInput={this.onSummitTextInput}
																					placeholder={item.label} 
																					underlineColorAndroid="#fff" 
																					onChangeText={(text)=>this.onChange(text,item.name)}  
																					value={this.state[item.name]} 
																					secureTextEntry={(item.type=='Password')?true:false}
																					
																			/>
																			{
																				(item.description) ? <Text style={{marginLeft:10,marginRight:10,marginTop:2,marginBottom:2}}>{item.description}</Text> : null
																			}
																	</View>	
																);
																} 
																if(item.type=='Checkbox'){
																	return(
																		<View>
																				<View style={gstyles.tellfriend}>
																	                  <Text style={gstyles.title}>{item.label}</Text>
																	                  <View style={gstyles.rightButton}><CheckBox  label=' ' onChange={()=>this.chagneState()} /></View>
																	              </View>
																				
																				
																		</View>
																	)
																}
                      										})
                      									}
                      									<TouchableOpacity onPress={()=>this.ShareList()} style={gstyles.buttonView}><Text style={gstyles.buttonText}>Tell a Friend</Text></TouchableOpacity>
														<View style={{width:'100%'}}><Text style={{textAlign:'center'}}>OR</Text></View>
														<TouchableOpacity onPress={()=>this.props.navigation.goBack()} style={{margin:10,padding:10,borderColor:'#696969',borderWidth:1,alignItems:'center'}}>
																<Text style={{color:'#000',fontSize:16,fontWeight:'bold'}}>Cancel</Text>
														</TouchableOpacity>
                      							</ScrollView>
                    }
			</View>
		);
	}
}
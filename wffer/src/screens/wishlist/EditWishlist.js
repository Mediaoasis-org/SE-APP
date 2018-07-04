import React, { Component } from 'react';
import { Text, TextInput, View, TouchableOpacity, ScrollView, AsyncStorage,FlatList,ActivityIndicator } from 'react-native';
import { gstyles } from '../../GlobalStyles';
import { Constants } from '../../common';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { DrawerActions } from 'react-navigation';
  
export class EditWishlistComponent extends Component {
	constructor(props){
		super(props);
		this.state={
			title:'',
			body:'',
			Message:'',
			dataSource:[],
			userData:[],
			oauthToken:'',
			oauthSecret:'',
			LoggedIn:null,
			isLoading:true,
		}
		this._getStorageValue()
	}
	async _getStorageValue(){
		const userData = await AsyncStorage.getItem('userData');
	 	const fieldData = await AsyncStorage.getItem('EditWishlistFields');
  		this.setState({userData:JSON.parse(userData)});
        this.setState({oauthToken:this.state.userData.oauth_token});
        this.setState({oauthSecret:this.state.userData.oauth_secret});
        this.fetchValues();
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
			 return fetch('https://wffer.com/se/api/rest/listings/wishlist/edit/'+wishlist_id+'?oauth_consumer_key=mji82teif5e8aoloye09fqrq3sjpajkk&oauth_consumer_secret=aoxhigoa336wt5n26zid8k976v9pwipe&oauth_token='+ this.state.oauthToken + '&oauth_secret='+this.state.oauthSecret,{
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
				        	await AsyncStorage.setItem('EditWishlistFields', JSON.stringify(this.state.dataSource));
				        	// alert(JSON.stringify(this.state.dataSource));   	
			        });
			      	}
			      	else
			      	{
			      		this.setState({Message:responseJson.Message});
			      		alert(this.state.Message)
			      	}
			      })
			      .catch((error) =>{
			        console.error(error);
			      });
			
	}

	fetchValues(){
		let wishlist_id = this.props.navigation.state.params.wishlist_id;
			return fetch('https://wffer.com/se/api/rest/listings/wishlist/edit/'+wishlist_id+'?oauth_consumer_key=mji82teif5e8aoloye09fqrq3sjpajkk&oauth_consumer_secret=aoxhigoa336wt5n26zid8k976v9pwipe&oauth_token='+ this.state.oauthToken + '&oauth_secret='+this.state.oauthSecret,{
			        method:'GET'
			      })
			      .then((response) => response.json())
			      .then((responseJson) => {
			      	if(responseJson.status_code=='200'){
			      		 this.setState({
			          isDataLoading: false,
			          fieldValues: responseJson.body.formValues,
			        },function(){
			        		this.setState({'title':this.state.fieldValues.title})
			        		this.setState({'body':this.state.fieldValues.body})        	
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
     
	render(){
		return(
			<View style={gstyles.container}>
					<View style={gstyles.headerMenu}>
			                    <Text style={gstyles.headerProfileLabel}>Wffer</Text>      
					</View>
					{ 
                      this.state.isLoading ?   <View style={gstyles.container}><ActivityIndicator color='#00ff00' size="large"/></View> :
                      							<ScrollView>
                      								<View style={gstyles.profileHeadingView}><Text style={gstyles.profileHeadingText}>Edit Shopping List</Text></View>
                      									{
                      										this.state.dataSource.map((item)=>{
                      											if(item.type=='Text' || item.type=='Textarea'){
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
																			
																	</View>	
																);
																} 
                      										})
                      									}
                      									<TouchableOpacity onPress={()=>this.createList()} style={gstyles.buttonView}><Text style={gstyles.buttonText}>Save Changes</Text></TouchableOpacity>
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
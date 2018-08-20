import React, { Component } from 'react';
import { Text, TextInput, View, TouchableOpacity, ScrollView, AsyncStorage,FlatList,ActivityIndicator } from 'react-native';
import { gstyles } from '../../GlobalStyles';
import { Constants } from '../../common';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
// import { DrawerActions } from 'react-navigation';
  
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
			isDataLoading:true,
			languagesData:[],
          	language : '',
		}
		this._getStorageValue()
	}
	async _getStorageValue(){
		var languageData = await AsyncStorage.getItem('languageData');
        const Datalang = JSON.parse(languageData);
        const lang = await AsyncStorage.getItem('languageinfo');
        this.setState({language:lang})
        // alert(this.state.language);
        this.setState({languagesData : Datalang[lang]})
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
			        		this.setState({'title':(this.state.fieldValues.title).toString()})
			        		this.setState({'body':(this.state.fieldValues.body).toString()})        
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
     
     EditList(){
    		let wishlist_id = this.props.navigation.state.params.wishlist_id;
    		var formData = new FormData;
		    formData.append('title',this.state.title);
		    formData.append('body',this.state.body);
		       fetch('https://wffer.com/se/api/rest/listings/wishlist/edit/'+wishlist_id+'?oauth_consumer_key=mji82teif5e8aoloye09fqrq3sjpajkk&oauth_consumer_secret=aoxhigoa336wt5n26zid8k976v9pwipe&oauth_token='+ this.state.oauthToken + '&oauth_secret='+this.state.oauthSecret,{
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
		            this.setState({
		              // isLoading: false,
		              // dataSource1: responseJson.body,
		            }, async function(){
			        // await AsyncStorage.setItem('userData', JSON.stringify(this.state.dataSource1));
		              // alert('Data Updated');
		              this.props.navigation.push('Wishlists',{wishlist_id:wishlist_id});
		            });
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


	render(){
		return(
			<View style={gstyles.container}>
					<View style={gstyles.headerMenu}>
								<Text style={gstyles.headerMenuButton}></Text>
			                    <Text style={gstyles.headerProfileLabel}>{this.state.languagesData.EDITWISHLIST_HeaderTitle}</Text>  
			                    <Text style={gstyles.headerRightButton}></Text>    
					</View>
					{ 
                      this.state.isDataLoading && this.state.isLoading ?   <View style={gstyles.loading}><ActivityIndicator style={gstyles.loadingActivity} color='#333' size="large"/></View> :
                      							<ScrollView>
                      								<View style={gstyles.profileHeadingView}><Text style={gstyles.profileHeadingText}>{this.state.languagesData.EDITWISHLIST_TitleText}</Text></View>
                      									{
                      										this.state.dataSource.map((item)=>{
                      											if(item.type=='Text' || item.type=='Textarea'){
																	return (
																	<View>
																			<TextInput name={item.name} 
																					returnKeyType="next"
																					style={[gstyles.textInputStyle,{textAlign:this.state.language == 'en' ? 'left' : 'right'}]} 
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
                      									<TouchableOpacity onPress={()=>this.EditList()} style={gstyles.buttonView}><Text style={gstyles.buttonText}>{this.state.languagesData.EDITWISHLIST_SaveButtonText}</Text></TouchableOpacity>
														<View style={gstyles.width100}><Text style={gstyles.textCenter}>OR</Text></View>
														<TouchableOpacity onPress={()=>this.props.navigation.goBack()} style={gstyles.cancelButton}>
																<Text style={gstyles.cancelButtonText}>{this.state.languagesData.EDITWISHLIST_CancelButtonText}</Text>
														</TouchableOpacity>
                      							</ScrollView>
                    }
			</View>
		);
	}
}
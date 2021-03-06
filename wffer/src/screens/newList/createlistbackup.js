import React, { Component } from 'react';
import { Text, TextInput, View, Dimension, TouchableOpacity, Image, FlatList,  ScrollView,AsyncStorage,ActivityIndicator } from 'react-native';
import { gstyles } from '../../GlobalStyles';
import { Constants } from '../../common';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { DrawerActions } from 'react-navigation';

export class CreateWishlistComponent extends Component {
	constructor(props){
		super(props);
		this.state={
			title:'',
			body:'',	
			isLoading:true,
			LoggedIn:null,
			dataSource:[],
		}
		this._getStorageValue()
	}
	async _getStorageValue(){
	  const userData = await AsyncStorage.getItem('userData');
	  if(userData != null){
	  	const value = await AsyncStorage.getItem('createListFields');
	  	alert(value)
	  	this.setState({userData:JSON.parse(userData)});
     	this.setState({oauthToken:this.state.userData.oauth_token});
     	this.setState({oauthSecret:this.state.userData.oauth_secret});
	  	this.setState({LoggedIn:true})
	  	if(value == null){
	  		this.fetchFields();	
	  	}
	  	else
	  	{
	  		this.setState({dataSource:value});
	  		this.setState({isLoading:false})
	  	}
	  }
	  else
	  {	  	
		this.setState({LoggedIn:false})
	  }
	}

	fetchFields(){
				
			  fetch('https://wffer.com/se/api/rest/listings/wishlist/create?oauth_consumer_key=mji82teif5e8aoloye09fqrq3sjpajkk&oauth_consumer_secret=aoxhigoa336wt5n26zid8k976v9pwipe&oauth_token='+ this.state.oauthToken + '&oauth_secret=' +this.state.oauthSecret + '&listingtype_id=1',{
			        method:'GET'
			      })
			      .then((response) => response.json())
			      .then((responseJson) => {
			      	if(responseJson.status_code=='200'){
			      		 this.setState({
				          isLoading: false,
				          dataSource: responseJson.body,
			        },async function(){
			        		await AsyncStorage.setItem('createListFields', this.state.dataSource);		
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
    createList(){
    		var formData = new FormData;
		    formData.append('title',this.state.title);
		    // formData.append('body',this.state.body);
		    formData.append('oauth_token',this.state.oauthToken);
		    formData.append('oauth_secret',this.state.oauthSecret);
		       fetch('https://wffer.com/se/api/rest/listings/wishlist/create?oauth_consumer_key=mji82teif5e8aoloye09fqrq3sjpajkk&oauth_consumer_secret=aoxhigoa336wt5n26zid8k976v9pwipe&oauth_token='+ this.state.oauthToken + '&oauth_secret=' +this.state.oauthSecret,{
		        body: formData,
		        headers:{
		          'Accept':'application/json',
		          // 'Content-Type': 'multipart/form-data'
		        },
		        method:'POST'
		      })
		        .then((response) => response.json())
		        .then((responseJson) => {
		        	
		          if(responseJson.status_code=="200"){
		            this.setState({
		              // isLoading: false,
		              // dataSource1: responseJson.body,
		            }, async function(){
			        // await AsyncStorage.setItem('userData', JSON.stringify(this.state.dataSource1));
		              // alert('Data Updated');
		              this.props.navigation.navigate('ShoppingList')
		            });
		          }
		          else
		          {
		            this.setState({
		              Message : responseJson.message,
		            })
		            
		          
		          }
		          alert(JSON.stringify(this.state.Message))

		        })
		       
		        .catch((error) =>{
		          console.error(error);
		        });
    	
    }
    renderData(){
    	return(
    		<View>
		    	{
		    		this.state.dataSource.map((item,index)=>{
		    			if(item.type=='Text'){
							return (
							<View key={index}>
									<TextInput name={item.name} style={gstyles.textInputStyle} placeholder={item.label} underlineColorAndroid="#fff" onChangeText={(text) => this.setState({[item.name]: text})}/>							
							</View>
							
							);
						}
		    		})
		    	}
		    </View>
    		)	
    }
	render(){
		// alert(this.state.dataSource)
		if(this.state.LoggedIn == false){
			return (
				<View style={gstyles.container}>
					<View style={gstyles.headerMenu}>
								<TouchableOpacity onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())} style={gstyles.headerMenuButton}>
									<Icon name="bars" size={24} color="#fff" />
			                    </TouchableOpacity>
			                    <Text style={gstyles.headerProfileLabel}>Wishlist</Text>        
					</View>
					<Text style={{padding:10,fontSize:18,margin:10,textAlign:'center'}}>To Create Wishlist ,Please Sign In</Text>
		              <TouchableOpacity style={gstyles.createAccountView} onPress={()=>this.props.navigation.navigate('Login')}>
		                  <Text style={gstyles.createAccountText}>Sign In</Text>
		              </TouchableOpacity>
				</View>
			)
		}
		else
		{
			return(
				<View style={gstyles.container}>
					<View style={gstyles.headerMenu}>
								<TouchableOpacity onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())} style={gstyles.headerMenuButton}>
									<Icon name="bars" size={24} color="#fff" />
			                    </TouchableOpacity>
			                    <Text style={gstyles.headerProfileLabel}>Wishlist</Text>
					</View>
					<ScrollView>
						{
							this.state.isLoading ? <View style={gstyles.loading}><ActivityIndicator color='#00ff00' size="large"/></View> :
							<View>	
								<View style={gstyles.profileHeadingView}><Text style={gstyles.profileHeadingText}>Create New Wishlist</Text></View>
									{this.renderData()}
									<TouchableOpacity onPress={()=>this.createList()} style={gstyles.buttonView}><Text style={gstyles.buttonText}>Create</Text></TouchableOpacity>
									<View style={{width:'100%'}}><Text style={{textAlign:'center'}}>OR</Text></View>
									<TouchableOpacity onPress={()=>this.props.navigation.goBack()} style={{margin:10,padding:10,borderColor:'#696969',borderWidth:1,alignItems:'center'}}>
											<Text style={{color:'#000',fontSize:16,fontWeight:'bold'}}>Cancel</Text>
									</TouchableOpacity>
								
							</View>
						}
					</ScrollView>
				</View>
			);
		}
	}
}

/// {
// 								    	this.state.dataSource.map((item,index)=>{
// 											if(item.type=='Text'){
// 												return (
// 												<View key={index}>
// 														<TextInput name={item.name} style={gstyles.textInputStyle} placeholder={item.label} underlineColorAndroid="#fff" onChangeText={(text) => this.setState({[item.name]: text})}/>							
// 												</View>
												
// 											);
// 											}
// 										})
// 									}

/// <View>

// 							<TextInput name="wishlist_name" placeholder="Wishlist Name" returnKeyType="next" underlineColorAndroid="#fff" style={gstyles.textInputStyle}/>	
							
// 							<TouchableOpacity onPress={()=>this.props.navigation.navigate('ShoppingList')} style={gstyles.buttonView}><Text style={gstyles.buttonText}>Create</Text></TouchableOpacity>
// 							<View style={{width:'100%'}}><Text style={{textAlign:'center'}}>OR</Text></View>
// 							<TouchableOpacity onPress={()=>this.props.navigation.goBack()} style={{margin:10,padding:10,borderColor:'#696969',borderWidth:1,alignItems:'center'}}><Text style={{color:'#000',fontSize:16,fontWeight:'bold'}}>Cancel</Text></TouchableOpacity>
// 						</View>
/// <TextInput name="wishlist_note" placeholder="Wishlist Note" underlineColorAndroid="#fff" style={gstyles.textInputStyle} />	
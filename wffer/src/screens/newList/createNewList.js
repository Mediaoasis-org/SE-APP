import React, { Component } from 'react';
import { Text, TextInput, View, Dimension, TouchableOpacity, Image, FlatList,  ScrollView,AsyncStorage,ActivityIndicator } from 'react-native';
import { gstyles } from '../../GlobalStyles';
import { Constants } from '../../common';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
// import { DrawerActions } from 'react-navigation';

export class CreateWishlistComponent extends Component {
	constructor(props){
		super(props);
		this.state={
			title:'',
			body:'',
			dataSource:[],
			isLoading:true,
			LoggedIn:null,
			languagesData:[],
          	language : '',
		}
		this._getStorageValue()
		// alert(JSON.stringify(this.props.navigation))
	}
	async _getStorageValue(){
		// this.fetchFields()
	 var languageData = await AsyncStorage.getItem('languageData');
        const Datalang = JSON.parse(languageData);
        const lang = await AsyncStorage.getItem('languageinfo');
        this.setState({language:lang})
        // alert(this.state.language);
        this.setState({languagesData : Datalang[lang]})
	  const userData = await AsyncStorage.getItem('userData');
      var value = await AsyncStorage.getItem('createListFields');
      // alert(value)
	  if(userData != null){
	  	this.setState({userData:JSON.parse(userData)});
     	this.setState({oauthToken:this.state.userData.oauth_token});
     	this.setState({oauthSecret:this.state.userData.oauth_secret});
	  	this.setState({LoggedIn:true})
		  	if(value == null){
			  	this.fetchFields();	
		 	}
		  	else
		  	{
		  		// alert('entering');
			  	const data = JSON.parse(value);
				this.setState({dataSource:data});
				this.setState({isLoading:false})
				// console.log(this.state.dataSource)
		  	}
	  }
	  else
	  {
	  	// alert('entering');
	  	
		this.setState({LoggedIn:false})
		// console.log(this.state.dataSource)
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
			        		await AsyncStorage.setItem('createListFields', JSON.stringify( this.state.dataSource));
			        		// alert(JSON.stringify(this.state.data));  
			        	
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
		              isLoading: false,
		              // dataSource1: responseJson.body,
		            }, async function(){
			        // await AsyncStorage.setItem('userData', JSON.stringify(this.state.dataSource1));
		              // alert('Data Updated');
		              this.props.navigation.push('ShoppingList')
		            });
		          }
		          else
		          {
		            this.setState({
		              Message : responseJson.message,
		            })
		            alert(JSON.stringify(this.state.Message))
		          
		          }
		          

		        })
		       
		        .catch((error) =>{
		          console.error(error);
		        });
    	
    }
	render(){
		if(this.state.LoggedIn == false){
			return (
				<View style={gstyles.container}>
					<View style={gstyles.headerMenu}>
								<TouchableOpacity onPress={() => this.props.navigation.openDrawer()} style={gstyles.headerMenuButton}>
									<Icon name="bars" size={24} color="#fff" />
			                    </TouchableOpacity>
			                    <Text style={gstyles.headerProfileLabel}>{this.state.languagesData.SHOPPING_LIST_HeaderTitle}</Text>        
					</View>
					<Text style={gstyles.signInButton}>{this.state.languagesData.CREATENEWLIST_SIGNIN_DefaultText}</Text>
		              <TouchableOpacity style={gstyles.createAccountView} onPress={()=>this.props.navigation.navigate('Login')}>
		                  <Text style={gstyles.createAccountText}>{this.state.languagesData.LOGIN_HeaderTitle}</Text>
		              </TouchableOpacity>
				</View>
			);
		}
		return(
				<View style={gstyles.container}>
					<View style={gstyles.headerMenu}>
								<TouchableOpacity onPress={() => this.props.navigation.openDrawer()} style={gstyles.headerMenuButton}>
									<Icon name="bars" size={24} color="#fff" />
			                    </TouchableOpacity>
			                    <Text style={gstyles.headerProfileLabel}>{this.state.languagesData.SHOPPING_LIST_HeaderTitle}</Text>
			                    <Text style={gstyles.headerRightButton}></Text>
					</View>
					{
						this.state.isLoading ? <View style={gstyles.loading}><ActivityIndicator style={gstyles.loadingActivity} color='#333' size="large"/></View> :
					
					<ScrollView>
						<View style={gstyles.profileHeadingView}><Text style={gstyles.profileHeadingText}>this.state.languagesData.CREATENEWLIST_HeaderTitle</Text></View>
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
							<TouchableOpacity onPress={()=>this.createList()} style={gstyles.buttonView}><Text style={gstyles.buttonText}>{this.state.languagesData.CRETAENEWLIST_SaveButtonText}</Text></TouchableOpacity>
							<View style={gstyles.width100}><Text style={gstyles.textCenter}>OR</Text></View>
							<TouchableOpacity onPress={()=>this.props.navigation.goBack()} style={gstyles.cancelButton}>
									<Text style={gstyles.cancelButtonText}>{this.state.languagesData.CRETAENEWLIST_CancelButtonText}</Text>
							</TouchableOpacity>
						</View>

					</ScrollView>
				}
				</View>
			);
	}
}



/// <View>

// 							<TextInput name="wishlist_name" placeholder="Wishlist Name" returnKeyType="next" underlineColorAndroid="#fff" style={gstyles.textInputStyle}/>	
							
// 							<TouchableOpacity onPress={()=>this.props.navigation.navigate('ShoppingList')} style={gstyles.buttonView}><Text style={gstyles.buttonText}>Create</Text></TouchableOpacity>
// 							<View style={{width:'100%'}}><Text style={{textAlign:'center'}}>OR</Text></View>
// 							<TouchableOpacity onPress={()=>this.props.navigation.goBack()} style={{margin:10,padding:10,borderColor:'#696969',borderWidth:1,alignItems:'center'}}><Text style={{color:'#000',fontSize:16,fontWeight:'bold'}}>Cancel</Text></TouchableOpacity>
// 						</View>
/// <TextInput name="wishlist_note" placeholder="Wishlist Note" underlineColorAndroid="#fff" style={gstyles.textInputStyle} />	
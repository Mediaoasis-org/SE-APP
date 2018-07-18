import React, { Component } from 'react';

import {
	Text,
	View,
	Dimensions,
	TouchableOpacity,
	Image,
	FlatList,
	ScrollView,
	AsyncStorage,
	ActivityIndicator
} from 'react-native';
import {gstyles} from '../../GlobalStyles';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { SearchComponent } from '../../components/Search';
import {Constants} from '../../common';
// import { DrawerActions } from 'react-navigation';
// import {FlatlistComponent} from '../../components/FlatlistComponent';
const window= Dimensions.get('window');
export class Catalog extends Component {
	constructor(props){
		super(props);
		this.state={
			oauthToken:'',
      		oauthSecret:'',
      		userData:[],
    		search :'',
    		fieldValues:[],
    		LoggedIn:null,
    		isLoading:true,
    	}
    	this.getStorageValues()
	}

	async getStorageValues(){
         const userData = await AsyncStorage.getItem('userData');
         // alert(userData.length);
          if(userData!=null){
            this.setState({LoggedIn:true});
            this.setState({userData:JSON.parse(userData)});
            this.setState({oauthToken:this.state.userData.oauth_token});
            this.setState({oauthSecret:this.state.userData.oauth_secret});
            this.fetchValues();
          }
          else
          {
            this.setState({LoggedIn:false})
          }         
   }

   fetchValues(){
      return fetch('https://wffer.com/se/api/rest/albums?oauth_consumer_key=mji82teif5e8aoloye09fqrq3sjpajkk&oauth_consumer_secret=aoxhigoa336wt5n26zid8k976v9pwipe&oauth_token='+ this.state.oauthToken + '&oauth_secret=' +this.state.oauthSecret,{
              method:'GET'
            })
            .then((response) => response.json())
            .then((responseJson) => {
              if(responseJson.status_code=='200'){
                // alert(JSON.stringify(responseJson.body));
                 this.setState({
                  fieldValues:responseJson.body.response,
                  totalItems: responseJson.body.totalItemCount,
                  isLoading:false,
                });
              }
              else
              {
                // 
              }
              this.setState({Message:responseJson.Message});
            })
            .catch((error) =>{
              console.error(error);
            });
  	}
	render(){
		if(this.state.LoggedIn==false){
	        return(
	          <View style={gstyles.container}>
	              <View style={gstyles.headerMenu}>
						<TouchableOpacity onPress={() =>this.props.navigation.openDrawer()} style={gstyles.headerMenuButton}>
							<Icon name="bars" size={24} color="#fff" />
	                    </TouchableOpacity>
	                    <Text style={gstyles.headerProfileLabel}>{Constants.AppName}</Text>
	                    <Text style={gstyles.headerRightButton}></Text>
				</View>
	              <Text style={gstyles.signInButton}>To get Lists ,Please Sign In</Text>
	              <TouchableOpacity style={gstyles.createAccountView} onPress={()=>this.props.navigation.navigate('Login')}>
	                  <Text style={gstyles.createAccountText}>Sign In</Text>
	              </TouchableOpacity>
	          </View>
	        )
	    }
	    else
	    {
		return(
			<View style={gstyles.flexContainer}>
				<View style={gstyles.headerMenu}>
							<TouchableOpacity onPress={() =>this.props.navigation.openDrawer()} style={gstyles.headerMenuButton}>
								<Icon name="bars" size={24} color="#fff" />
		                    </TouchableOpacity>
		                    <Text style={gstyles.headerProfileLabel}>{Constants.AppName}</Text>
		                    <Text style={gstyles.headerRightButton}></Text>
				</View>
				 { 
        			this.state.isLoading ? <View style={gstyles.loading}><ActivityIndicator style={gstyles.loadingActivity} color='#333' size="large"/></View> :
					<ScrollView>
						<SearchComponent />
						<View style={[gstyles.width100,gstyles.flexDirectionRow]}>
							<FlatList data={this.state.fieldValues}
				                renderItem={({item}) =>      
				                    <View style={[gstyles.catalogView,{marginBottom:0}]}>
				                     
				                      <TouchableOpacity style={gstyles.alignItemsCenter} onPress={()=>{this.props.navigation.push('CatalogItems',{album_id:item.album_id})}}>
					                      <Text style={gstyles.catalogPhotoCount}>{item.photo_count}</Text>
					                      <Image source={{uri: item.image}} style={gstyles.catalogPhoto}  />
				                      </TouchableOpacity>
				                      <View style={[gstyles.backgroundWhite,gstyles.padding10]}><Text style={gstyles.newToText}>{item.title}</Text></View> 
				                    </View>                    
				                    }
				                keyExtractor={(item, index) => index.toString()}
				              />
						
						</View>
					</ScrollView>
				}
			</View>
		)
		}
	}
}
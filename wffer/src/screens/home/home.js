import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ScrollView,AsyncStorage,ActivityIndicator } from 'react-native';
// import Carousel from 'react-native-banner-carousel';
import { gstyles } from '../../GlobalStyles';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { Constants } from '../../common';
// import { DrawerActions } from 'react-navigation';
import { SpecialOfferComponent } from '../../components/specialOffer';
import { SearchComponent } from '../../components/Search';
import { BannerSliderComponent } from '../../components/BannerSlider';
import { PromotionalOfferStoreComponent } from '../../components/PromotionalOfferStore';

export class HomeComponent extends Component {
    constructor(props){
    	super(props);
    	this.state={
    		search :'',
    		 LoggedIn:false,
    		 isLoading:true,
    		 stores:[],
         specialOffers:[]
    	}
    	this.getLoginValue();

    }	
    async getLoginValue(){
        var value = await AsyncStorage.getItem('userLoginAuthentication');
        // alert(value)
        if(value !== null){
        	
          this.setState({LoggedIn:true});
          // 
        }
        else
        {
        	
        }
        this.fetchStore();
        this.getSpecialoffer();
    }
    fetchStore(){
		 return fetch('https://wffer.com/se/api/rest/listings/get-stores?oauth_consumer_key=mji82teif5e8aoloye09fqrq3sjpajkk&oauth_consumer_secret=aoxhigoa336wt5n26zid8k976v9pwipe',{
              method:'GET'
            })
            .then((response) => response.json())
            .then((responseJson) => {
              if(responseJson.status_code=='200'){
                // alert(JSON.stringify(responseJson.body));
                 this.setState({
                  stores:responseJson.body,
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
  getSpecialoffer(){
    return fetch('https://wffer.com/se/api/rest/listings/special-offer?oauth_consumer_key=mji82teif5e8aoloye09fqrq3sjpajkk&oauth_consumer_secret=aoxhigoa336wt5n26zid8k976v9pwipe&listingtype_id=2&city=Riyadh&limit=10',{
              method:'GET'
            })
            .then((response) => response.json())
            .then((responseJson) => {
              if(responseJson.status_code=='200'){
                // alert(JSON.stringify(responseJson.body));
                 this.setState({
                  specialOffers:responseJson.body.response,
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
		return(
				<View style={gstyles.flexContainer}>
					<View style={gstyles.headerMenu}>
								<TouchableOpacity onPress={() => this.props.navigation.openDrawer()}  style={gstyles.headerMenuButton}>
									<Icon name="bars" size={24} color="#fff" />
			                    </TouchableOpacity>
			                    <Text style={gstyles.headerProfileLabel}>{Constants.AppName}</Text>
			                    <TouchableOpacity onPress={()=>this.props.navigation.push('ShoppingList')} style={gstyles.headerRightButton}><Icon name="shopping-basket" size={24} color="#fff" /></TouchableOpacity>
					</View>
					<ScrollView>
						
						<SearchComponent />
            {
              this.state.LoggedIn ? null : 
              <View>
    						<BannerSliderComponent />
    						{ 
                  this.state.isLoading ? <View style={gstyles.loading}><ActivityIndicator style={gstyles.loadingActivity} color='#333' size="large"/></View>  :
      						  <PromotionalOfferStoreComponent data={this.state.stores}/>
      					}
              </View>
            }
						<View style={gstyles.SpecialOfferHeadingsHome}><Text style={gstyles.fontSize18}>Special Offers</Text></View>
						<View style={gstyles.specialOfferViewHome}>
            { 
              this.state.isLoading ? 
                <View style={gstyles.loading}><ActivityIndicator style={gstyles.loadingActivity} color='#333' size="large"/></View>  :
  						  <SpecialOfferComponent numcols={2} data={this.state.specialOffers}/>
            }
						</View>

					</ScrollView>
					
				</View>
			);
	}
}
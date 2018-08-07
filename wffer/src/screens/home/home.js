import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ScrollView,AsyncStorage,ActivityIndicator,FlatList,Image } from 'react-native';
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
         specialOffers:[],
         city:'',
      
    	}
      // NetInfo.getConnectionInfo().then((connectionInfo) => {
      //     if (connectionInfo.type === 'none') {
      //         alert("No internet connection")
      //     } else {
      //         // online
      //        // do something

      //     }
      // });
      // this.isButtonDisabled=false;
    	this.getLoginValue();

    }	
    async getLoginValue(){
        var value = await AsyncStorage.getItem('userLoginAuthentication');
        const city = await AsyncStorage.getItem('cityInformation');
        this.setState({city:city});
        // alert(value)
        if(value !== null){
        	
          this.setState({LoggedIn:true});
          // 
        }
        else
        {
        	
        }

        this.categories_func()
        this.fetchStore();
        this.getSpecialoffer();
    }

    categories_func(){
   fetch('https://wffer.com/se/api/rest/listings/categories?oauth_consumer_key=mji82teif5e8aoloye09fqrq3sjpajkk&oauth_consumer_secret=aoxhigoa336wt5n26zid8k976v9pwipe&listingtype_id=2',{
              method:'GET'
            })
            .then((response) => response.json())
            .then((responseJson) => {
          
              if(responseJson.status_code=='200'){
                 this.setState({
                  isCategoryLoading: false,
                  categories: responseJson.body.categories,
                });
                 // alert(JSON.stringify(this.state.fieldValues));
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
    return fetch('https://wffer.com/se/api/rest/listings/special-offer?oauth_consumer_key=mji82teif5e8aoloye09fqrq3sjpajkk&oauth_consumer_secret=aoxhigoa336wt5n26zid8k976v9pwipe&listingtype_id=2&limit=10&city='+this.state.city,{
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
  // disable(){
  //    this.isButtonDisabled= true;setTimeout(() => this.isButtonDisabled = false , 1000);
  // }
	render(){
		return(
				<View style={gstyles.flexContainer}>
					<View style={gstyles.headerMenu}>
								<TouchableOpacity onPress={() =>{ this.props.navigation.openDrawer()}} style={gstyles.headerMenuButton}>
									<Icon name="bars" size={24} color="#fff" />
			                    </TouchableOpacity>
			                    <Text style={gstyles.headerProfileLabel}>{Constants.AppName}</Text>
			                    <TouchableOpacity onPress={()=>{ this.disable();this.props.navigation.push('ShoppingList')}} style={gstyles.headerRightButton}><Icon name="shopping-basket" size={24} color="#fff" /></TouchableOpacity>
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
						<View style={gstyles.SpecialOfferHeadingsHome}><Text style={gstyles.fontSize18,gstyles.textBlack}>Special Offers</Text></View>
						<View style={gstyles.specialOfferViewHome}>
            { 
              this.state.isLoading ? 
                <View style={gstyles.loading}><ActivityIndicator style={gstyles.loadingActivity} color='#333' size="large"/></View>  :
  						  <View style={gstyles.specialOfferViewHome}>
                  <FlatList numColumns={2} data={this.state.specialOffers}
                            renderItem={({item}) =>      
                                <TouchableOpacity style={gstyles.specialOfferView} onPress={()=>{this.props.navigation.push('ProductDetails',{product_id:item.listing_id,best_price:item.discountprice,best_title:item.store_title})}}>
                                  <Text style={gstyles.discountShow}>{item.percentageOff} Off </Text>
                                  <View style={gstyles.alignItemsCenter}><Image source={{uri:item.image_normal}} style={gstyles.flatimage} resizeMode="contain"/></View>
                                      <View style={gstyles.flexDirectionColumn}>
                                          
                                          <View style={gstyles.specialOfferTitle}><Text numberOfLines={2}  style={gstyles.title}>{item.title}</Text></View>
                                          <View>  
                                            {
                                    this.state.categories.map((cat)=>{
                                      if(cat.category_id==item.category_id){
                                        return(
                                        <View style={gstyles.width100} key={cat.category_id}><Text style={gstyles.specialOfferCategory}>{cat.category_name}</Text></View>
                                        );
                                      }
                                    })
                                  }
                                  </View>
                                          <Text style={gstyles.specialOfferCompany}>{item.store_title}</Text>
                                          <Text style={[gstyles.specialOfferCategory,{textDecorationLine: 'line-through', textDecorationStyle: 'solid'}]}>{item.listing_price} {item.currency}</Text>
                                          <Text style={gstyles.specialOfferCategory}>{item.discountprice} {item.currency}</Text>
                                          <Text style={gstyles.specialOfferCategory}>Offer Ends {item.end_time}</Text>
                                      </View>
                                </TouchableOpacity>                    
                                }
                            keyExtractor={(item, index) => index}
                          />
                  
                </View>
            }
						</View>

					</ScrollView>
					
				</View>
			);
	}
}
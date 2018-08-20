import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ScrollView,AsyncStorage,ActivityIndicator,FlatList,Image,NetInfo,BackHandler,TextInput,Alert,I18nManager } from 'react-native';
// import Carousel from 'react-native-banner-carousel';
import { gstyles } from '../../GlobalStyles';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { Constants } from '../../common';
// import { DrawerActions } from 'react-navigation';
import { SpecialOfferComponent } from '../../components/specialOffer';
import { SearchComponent } from '../../components/Search';
import { BannerSliderComponent } from '../../components/BannerSlider';
import { PromotionalOfferStoreComponent } from '../../components/PromotionalOfferStore';
// import languages from '../../common/constantslist';
// var RNFS = require('react-native-fs');
// var path = RNFS.DocumentDirectoryPath + '/abc.csv';
function MiniOfflineSign() {
  return (
  <View style={{backgroundColor: '#b52424',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width:'100%',
    
   }}>
      <Text style={{color: '#fff'}}>No Internet Connection</Text>
    </View>
  )
}
export class HomeComponent extends Component {
    constructor(props){
    	super(props);
    	this.state={
    		search :'',
    		 LoggedIn:false,
    		 isLoading:true,
    		 stores:[],
         specialOffers:[],
         renderData:[],
         city:'',
         isConnected: true,
        languagesData:[],
        categories:[],
        language : '',
    	}
    	this.getLoginValue();
      console.log("right : " + I18nManager.isRTL)
    }	
    componentDidMount() {
      BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
       NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
    }

    componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
       NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
    }
    handleConnectivityChange = isConnected => {
        if (isConnected) {
          this.setState({ isConnected });
        } else {
          this.setState({ isConnected });
        }
    }
    handleBackButton = () => {
     BackHandler.exitApp()
      return true;
    } 
    async getLoginValue(){
        var languageData = await AsyncStorage.getItem('languageData');
        const Datalang = JSON.parse(languageData);
        const lang = await AsyncStorage.getItem('languageinfo');
        this.setState({language:lang})
        this.setState({languagesData : Datalang[lang]})
        var value = await AsyncStorage.getItem('userLoginAuthentication');
        const city = await AsyncStorage.getItem('cityInformation');
        this.setState({city:city});
        if(value !== null){	
          this.setState({LoggedIn:true});
        }
        else
        {
        	
        }
        if(this.state.isConnected){
          // alert('Network connection');
           this.categories_func()
           this.fetchStore();
           this.getSpecialoffer(); 
        }
        else
        {
          // alert('no internet')
        }
             
    }
    handleSearchInput(e){
      let text = e.toLowerCase()
      this.setState({search : e})
      let fullList = this.state.specialOffers;

      let filteredList = fullList.filter((item) => { // search from a full list, and not from a previous search results list
        if(item.title.toLowerCase().match(text))
          return item;
      })
      if (!text || text === '') {
        this.setState({
          renderData: fullList,
          noData:false,
        })
      } else if (!filteredList.length) {
       // set no data flag to true so as to render flatlist conditionally
         this.setState({
           noData: true
         })
      }
      else if (Array.isArray(filteredList)) {
        this.setState({
          noData: false,
          renderData: filteredList
        })
      }
  }
    // write_file(){

    //   RNFS.downloadFile({fromUrl:'https://www.sample-videos.com/csv/Sample-Spreadsheet-10-rows.csv',toFile:path}).promise.then((success) => {
    //     console.log('FILE downloaded!');
    //   })
    //   .catch((err) => {
    //     console.log(err.message);
    //   });
    // }
    // read_file(){
    //   RNFS.readFile(path, 'ascii').then((file) => {
    //     // console.log(file);
    //     var csv = this.csvToArray(file)
    //     console.log(csv)
    //   })
    //   .catch((err) => {
    //     console.log(err.message);
    //   });
    // }
    //  csvToArray (csv) {
    //     rows = csv.split("\n");

    //     return rows.map(function (row) {
    //       return row.split(",");
    //     });
    // };

    categories_func(){
      // this.isNetworkConnected();
      // console.log("Network "  + this.state.isConnected)
      // if(this.state.isConnected){
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
      // }
      // else
      // {
      //   alert('No Network connection')
      // }
   
    }
    fetchStore(){
		  fetch('https://wffer.com/se/api/rest/listings/get-stores?oauth_consumer_key=mji82teif5e8aoloye09fqrq3sjpajkk&oauth_consumer_secret=aoxhigoa336wt5n26zid8k976v9pwipe',{
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
     fetch('https://wffer.com/se/api/rest/listings/special-offer?oauth_consumer_key=mji82teif5e8aoloye09fqrq3sjpajkk&oauth_consumer_secret=aoxhigoa336wt5n26zid8k976v9pwipe&listingtype_id=2&limit=10&city='+this.state.city,{
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
                 this.setState({renderData:responseJson.body.response});
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

  disable(){
     this.isButtonDisabled= true;setTimeout(() => this.isButtonDisabled = false , 1000);
  }
	render(){
    // console.log(this.state.languagesData.HOME_HeaderApp)
   if (!this.state.isConnected) {
      return (
          <View style={gstyles.flexContainer}>
              <View style={gstyles.headerMenu}>
                    <TouchableOpacity  style={gstyles.headerMenuButton}></TouchableOpacity>
                    <Text style={gstyles.headerProfileLabel}>{Constants.AppName}</Text>
                    <TouchableOpacity style={gstyles.headerRightButton}></TouchableOpacity>
              </View>
              <MiniOfflineSign />
          </View>
      );
    }
		return(
				<View style={[gstyles.flexContainer]}>
					<View style={gstyles.headerMenu}>
								<TouchableOpacity onPress={() =>{BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton); this.props.navigation.openDrawer()}} style={gstyles.headerMenuButton}>
									<Icon name="bars" size={24} color="#fff" />
			                    </TouchableOpacity>
			                    <Text style={gstyles.headerProfileLabel}>{this.state.languagesData.HOME_HeaderApp}</Text>
			                    <TouchableOpacity onPress={()=>{  BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);this.disable();this.props.navigation.push('ShoppingList')}} style={gstyles.headerRightButton}><Icon name="shopping-basket" size={24} color="#fff" /></TouchableOpacity>
					</View>
					<ScrollView>
						
						<View style={gstyles.searchView}>
                <Text style={gstyles.searchViewLeft}>
                        <Icon name="search" size={24} color="#ccc" />
                </Text>
                <TextInput style={[gstyles.searchViewRight]}
                    placeholder="Search"
                    underlineColorAndroid="transparent"
                    placeholderTextColor="rgb(158,145,140)"
                    autoCorrect={true}
                    value={this.state.search}
                    onChangeText={this.handleSearchInput.bind(this)}
                />
            </View>
            {
              this.state.LoggedIn ? null : 
              <View>
    						<BannerSliderComponent />
    						{ 
                  this.state.isLoading ? <View style={gstyles.loading}><ActivityIndicator style={gstyles.loadingActivity} color='#333' size="large"/></View>  :
      						  <PromotionalOfferStoreComponent data={this.state.stores} title={this.state.languagesData.HOME_PromotionalOffer_HeadingText} lang={this.state.language}/>
      					}
              </View>
            }
           
						<View style={gstyles.SpecialOfferHeadingsHome}><Text style={[gstyles.fontSize18,gstyles.textBlack]}>{this.state.languagesData.HOME_SpecialOffer_HeadingText}</Text></View>
						<View style={gstyles.specialOfferViewHome}>
            { 
              this.state.isLoading ? 
                <View style={gstyles.loading}><ActivityIndicator style={gstyles.loadingActivity} color='#333' size="large"/></View>  :
  						  <View style={gstyles.specialOfferViewHome}>
                {
                   (this.state.noData) ? <Text style={gstyles.margin5}>No Data Found</Text> :
                  <FlatList numColumns={2} data={this.state.renderData} extraData={this.state}
                            renderItem={({item}) =>      
                                <TouchableOpacity style={gstyles.specialOfferView} onPress={()=>{BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);this.props.navigation.push('ProductDetails',{product_id:item.listing_id,best_price:item.discountprice,best_title:item.store_title})}}>
                                  <Text style={[gstyles.discountShow,{textAlign:this.state.language == 'en' ? 'left' : 'right'}]}>{item.percentageOff} Off </Text>
                                  <View style={gstyles.alignItemsCenter}><Image source={{uri:item.image_icon}} style={gstyles.flatimage} resizeMode="contain"/></View>
                                      <View style={gstyles.flexDirectionColumn}>
                                          
                                          <View style={gstyles.specialOfferTitle}><Text numberOfLines={2}  style={[gstyles.title]}>{item.title}</Text></View>
                                          <View>  
                                            {
                                    this.state.categories.map((cat)=>{
                                      if(cat.category_id==item.category_id){
                                        return(
                                        <View style={gstyles.width100} key={cat.category_id}><Text style={[gstyles.specialOfferCategory]}>{cat.category_name}</Text></View>
                                        );
                                      }
                                    })
                                  }
                                  </View>
                                          <Text style={[gstyles.specialOfferCompany]}>{item.store_title}</Text>
                                          <Text style={[gstyles.specialOfferCategory,{textDecorationLine: 'line-through', textDecorationStyle: 'solid',}]}>{item.listing_price} {item.currency}</Text>
                                          <Text style={[gstyles.specialOfferCategory]}>{item.discountprice} {item.currency}</Text>
                                          <Text style={[gstyles.specialOfferCategory]}>Offer Ends {item.end_time}</Text>
                                      </View>
                                </TouchableOpacity>                    
                                }
                            keyExtractor={(item, index) => index}
                          />
                  }
                </View>
            }
						</View>

					</ScrollView>
					
				</View>
			);
	}
}

 // <TouchableOpacity onPress={()=>this.write_file()}><Text> add file to base library</Text></TouchableOpacity>
 //             <TouchableOpacity onPress={()=>this.read_file()}><Text> read file</Text></TouchableOpacity>
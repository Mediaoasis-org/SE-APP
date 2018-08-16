import React, { Component } from 'react';

import {
	Text,
	View,
	Dimensions,
	TouchableOpacity,
  TextInput,
	Image,
	FlatList,
	ScrollView,
	AsyncStorage,
	ActivityIndicator,
NetInfo
} from 'react-native';
import {gstyles} from '../../GlobalStyles';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

import {Constants} from '../../common';
import ModalDropdown from 'react-native-modal-dropdown';

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
    		// LoggedIn:null,
    		isLoading:true,
    		city:'',
        renderData:[],
        stores:[],
        searchFields:[],
        languagesData:[],
            language : '',
    	}
    	this.getStorageValues()
	}
  componentDidMount(){
    NetInfo.getConnectionInfo().then((connectionInfo) => {
      console.log('Initial, type: ' + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType);
    });
  }
	async getStorageValues(){
    var languageData = await AsyncStorage.getItem('languageData');
        const Datalang = JSON.parse(languageData);
        const lang = await AsyncStorage.getItem('languageinfo');
        this.setState({language:lang})
        // alert(this.state.language);
        this.setState({languagesData : Datalang[lang]})
         const userData = await AsyncStorage.getItem('userData');
         const city = await AsyncStorage.getItem('cityInformation');
         this.setState({city:city});
         this.fetchSearchFields()
          this.fetchStore();
         this.fetchValues();
         // alert(userData.length);
          // if(userData!=null){
          //   this.setState({LoggedIn:true});
          //   this.setState({userData:JSON.parse(userData)});
          //   this.setState({oauthToken:this.state.userData.oauth_token});
          //   this.setState({oauthSecret:this.state.userData.oauth_secret});
          //   this.fetchValues();
          // }
          // else
          // {
          //   this.setState({LoggedIn:false})
          // }         
   }
   fetchSearchFields(){
    
    return fetch('https://wffer.com/se/api/rest/albums/search-form?oauth_consumer_key=mji82teif5e8aoloye09fqrq3sjpajkk&oauth_consumer_secret=aoxhigoa336wt5n26zid8k976v9pwipe&oauth_token='+ this.state.oauthToken + '&oauth_secret=' +this.state.oauthSecret,{
              method:'GET'
            })
            .then((response) => response.json())
            .then((responseJson) => {
              if(responseJson.status_code=='200'){
                // alert(JSON.stringify(responseJson.body));
                 this.setState({
                  searchFields:responseJson.body,
                });
              }
              else
              {
                // 
              }
              this.setState({Message:responseJson.Message});
              // console.log(this.state.searchFields);
            })
            
            .catch((error) =>{
              console.error(error);
            });
   }
   fetchStore(){
      var store_title ;
      let temp = ["Select"];
      let temp1 = [{value : "Select"}];
     return fetch('https://wffer.com/se/api/rest/listings/get-stores?oauth_consumer_key=mji82teif5e8aoloye09fqrq3sjpajkk&oauth_consumer_secret=aoxhigoa336wt5n26zid8k976v9pwipe',{
              method:'GET'
            })
            .then((response) => response.json())
            .then((responseJson) => {
              if(responseJson.status_code=='200'){
                // alert(JSON.stringify(responseJson.body));
                store_title = responseJson.body;
                
                  store_title.map((item)=>{
                    temp.push(item.title);
                    temp1.push({value : item.title});
                  })
                 this.setState({
                 stores1:temp1,
                  stores:temp,
                  isLoading:false,
                });
                 console.log(this.state.stores1)
              }
              else
              {
                // 0
              }
              this.setState({Message:responseJson.Message});
            })
            .catch((error) =>{
              console.error(error);
            });
  }
  

   fetchValues(){
      return fetch('https://wffer.com/se/api/rest/albums?oauth_consumer_key=mji82teif5e8aoloye09fqrq3sjpajkk&oauth_consumer_secret=aoxhigoa336wt5n26zid8k976v9pwipe&city='+this.state.city,{
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
                 this.setState({renderData:this.state.fieldValues});
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
    handleSearchList(e){
      let text = e;
      // console.log(text)
      // this.setState({search : e})
      let fullList = this.state.fieldValues;

      let filteredList = fullList.filter((item) => { // search from a full list, and not from a previous search results list
        if(item.category_id == text)
          return item;
      })
      if (!text || text === '' || text == "0") {
        this.setState({
          renderData: fullList,
          noData:false,
        })
      } else if (!filteredList.length) {
       // set no data flag to true so as to render flatlist conditionally
         this.setState({
           noData: true,
           renderData:filteredList
         })
      }
      else if (Array.isArray(filteredList)) {
        this.setState({
          noData: false,
          renderData: filteredList
        })
      }
  }
  onTagSelect(idx, data,options){ 
        // console.log("======== on tag selected ==========="); 
        // console.log(idx,data); 
        Object.entries(options).map(([key, value]) => {
                  // console.log(`${value}`);
                  if(data == value){
                    this.handleSearchList(key)
                  }    
        })  
  };
  	catalogItems(){
  		if(this.state.totalItems == 0){
              	return(
	            	<View style={[gstyles.width100,gstyles.flexDirectionRow]}>
			              <Text style={gstyles.ShoppingText}>No data found</Text>
			              
	            	</View>)
  		}
  		else
  		{
  			return(
  				<View>
          {
            this.state.noData ? <Text style={gstyles.margin5}>No Data Found</Text> :  
  						<View style={[gstyles.width100,gstyles.flexDirectionRow]}>
  							
  							<FlatList data={this.state.renderData}
  				                renderItem={({item}) =>      
  				                    <View style={[gstyles.catalogView,{marginBottom:0}]}>
  				                     
  				                      <TouchableOpacity style={gstyles.alignItemsCenter} onPress={()=>{this.props.navigation.push('CatalogItems',{album_id:item.album_id,name:item.title})}}>
  					                      <Text style={gstyles.catalogPhotoCount}>{item.photo_count}</Text>
  					                      <Image source={{uri: item.image_profile}} style={gstyles.catalogPhoto}  />
  				                      </TouchableOpacity>
  				                      <View style={[gstyles.backgroundWhite,gstyles.padding10]}><Text style={gstyles.newToText}>{item.title}</Text></View> 
  				                    </View>                    
  				                    }
  				                keyExtractor={(item, index) => index.toString()}
  				              />
						  </View>
          }
				</View>
  			);
  		}
  	}
	render(){
		
		return(
			<View style={gstyles.flexContainer}>
				<View style={gstyles.headerMenu}>
							<TouchableOpacity onPress={() =>this.props.navigation.openDrawer()} style={gstyles.headerMenuButton}>
								<Icon name="bars" size={24} color="#fff" />
		                    </TouchableOpacity>
		                    <Text style={gstyles.headerProfileLabel}>{this.state.languagesData.CATALOG_HeaderTitle}</Text>
		                    <Text style={gstyles.headerRightButton}></Text>
				</View>
				 { 
        			this.state.isLoading ? <View style={gstyles.loading}><ActivityIndicator style={gstyles.loadingActivity} color='#333' size="large"/></View> :
					<ScrollView>
          {
            this.state.searchFields.map((item,index)=>{
              if(item.name=='category_id'){
                 return(
                  <View key={index}>
                      <ModalDropdown 
                            style={gstyles.dropdownMainStyles}                                  
                            dropdownTextStyle={gstyles.dropdownTextStyle}
                            textStyle={gstyles.textStyle}
                            dropdownStyle={gstyles.dropdownStyles}
                            defaultIndex={this.props.defaultIndex}
                            showsVerticalScrollIndicator={true}
                            animated={false}
                            defaultValue='Select Store'
                            options={Object.keys(item.multiOptions).map(key => item.multiOptions[key])}                  
                            onSelect={(key, data)=>{ this.onTagSelect(key, data,item.multiOptions)}}       
                      />       
                  </View>
                 )
             }
            })
          }

						   
						{this.catalogItems()}
					</ScrollView>
				}
			</View>
		)
		}
	
}


// <View style={gstyles.searchView}>
//                 <Text style={gstyles.searchViewLeft}>
//                         <Icon name="search" size={24} color="#ccc" />
//                 </Text>
//                 <TextInput style={gstyles.searchViewRight}
//                     placeholder="Search Product"
//                     underlineColorAndroid="transparent"
//                     placeholderTextColor="rgb(158,145,140)"
//                     autoCorrect={true}
//                     value={this.state.search}
//                     onChangeText={this.handleSearchInput.bind(this)}
//                 />
//           </View>
// if(this.state.LoggedIn==false){
// 	        return(
// 	          <View style={gstyles.container}>
// 	              <View style={gstyles.headerMenu}>
// 						<TouchableOpacity onPress={() =>this.props.navigation.openDrawer()} style={gstyles.headerMenuButton}>
// 							<Icon name="bars" size={24} color="#fff" />
// 	                    </TouchableOpacity>
// 	                    <Text style={gstyles.headerProfileLabel}>{Constants.AppName}</Text>
// 	                    <Text style={gstyles.headerRightButton}></Text>
// 				</View>
// 	              <Text style={gstyles.signInButton}>To get Lists ,Please Sign In</Text>
// 	              <TouchableOpacity style={gstyles.createAccountView} onPress={()=>this.props.navigation.navigate('Login')}>
// 	                  <Text style={gstyles.createAccountText}>Sign In</Text>
// 	              </TouchableOpacity>
// 	          </View>
// 	        )
// 	    }
// 	    else
// 	    {
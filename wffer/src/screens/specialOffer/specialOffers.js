import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ScrollView,AsyncStorage,ActivityIndicator,TextInput,FlatList,Image } from 'react-native';
import { gstyles } from '../../GlobalStyles';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { Constants } from '../../common';
// import { DrawerActions } from 'react-navigation';
import { SpecialOfferComponent } from '../../components/specialOffer';
import { SearchComponent } from '../../components/Search';
import ModalDropdown from 'react-native-modal-dropdown';

export class SpecialOffers extends Component {
    constructor(props){
    	super(props);
    	this.state={
    		search:'',
    		city:'',
    		specialOffers:[],
    		renderData:[],
    		stores:[],
    		isLoading:true,
    		showLoadMore:false,
    		Message:''
    	}
    	this.page=1;
    	this.getStorageValues()
    }
    async getStorageValues(){
         // const userData = await AsyncStorage.getItem('userData');
         const city = await AsyncStorage.getItem('cityInformation');
         this.setState({city:city});
         this.categories_func();
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
   		var store_title ;
   		let temp = ["Select"];
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
	                })
                 this.setState({
                  stores:temp,
                  // isLoading:false,
                });
                 
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
    getSpecialoffer(){
    	let URL = 'https://wffer.com/se/api/rest/listings/special-offer?oauth_consumer_key=mji82teif5e8aoloye09fqrq3sjpajkk&oauth_consumer_secret=aoxhigoa336wt5n26zid8k976v9pwipe&listingtype_id=2&city='+this.state.city + '&page=' + this.page;

    return fetch(URL,{
              method:'GET'
            })
            .then((response) => response.json())
            .then((responseJson) => {
              if(responseJson.status_code=='200'){

                // alert(JSON.stringify(responseJson.body));
                if(responseJson.body.response){
                	this.setState({
		                  specialOffers:responseJson.body.response,
		                  isLoading:false,
		                });
		                 this.setState({renderData : this.state.specialOffers})
		                 let count = this.state.specialOffers.length;
			      		 // alert(count);
			      		 if(count >= 20){
			      		 	this.setState({showLoadMore:true})
			      		 }
                }
                else{
                	this.setState({Message : "No Data Found"});
                	this.setState({isLoading:false})
                }

                 
              }
              else
              {
               this.setState({Message:responseJson.Message});
              }
              
            })
            .catch((error) =>{
              console.error(error);
            });
  }
  showLoadMore(){
	 	// alert(this.state.showLoadMore)
	 	// alert(this.state.page);
	 	// let pageno = this.state.page+1;
	 	// // alert(page);
	 	// this.setState({page : pageno});
	 	let json_data;
	 	this.setState({search : ''})
	 	this.page = this.page + 1;
	 	this.setState({ fetching_Status: true,showLoadMore:false}, ()=>{
		 	// alert(this.state.showLoadMore);
		 	// alert(this.page);
		 	let URL = 'https://wffer.com/se/api/rest/listings/special-offer?oauth_consumer_key=mji82teif5e8aoloye09fqrq3sjpajkk&oauth_consumer_secret=aoxhigoa336wt5n26zid8k976v9pwipe&listingtype_id=2&city='+this.state.city + '&page=' + this.page;
	    	return fetch(URL,{
				        method:'GET'
				      })
				      .then((response) => response.json())
				      .then((responseJson) => {
				      	

				      	if(responseJson.status_code=='200'){
				      		json_data = responseJson.body.response;
				      		 this.setState({
					          specialOffers:[...this.state.specialOffers,...json_data],isLoading: false,fetching_Status:false
					        });

				      		  this.setState({renderData : this.state.specialOffers})
				      		 // this.selectQuantities();	
				      		 let count = responseJson.body.response.length;
				      		 if(count >= 20){
				      		 	this.setState({showLoadMore:true})
				      		 }
				      		 // console.log(this.state.fieldValues)
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
				  })
	 }
 
onTagSelect(idx, data,name){ 
	      // console.log("======== on tag selected ==========="); 
	      // console.log(idx,data,name); 
	      this.handleSearchList(data)
	      // this.handleInput(idx,data,name)
	};
 handleSearchList(e){
	    let text = e.toLowerCase()
	    console.log(text)
	    // this.setState({search : e})
	    let fullList = this.state.specialOffers;

	    let filteredList = fullList.filter((item) => { // search from a full list, and not from a previous search results list
	      if(item.store_title.toLowerCase().match(text))
	        return item;
	    })
	    if (!text || text === '' || text == "select") {
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
    // handleInput(idx,data,value){
    //  	var state = value;
    //  	var val = idx;
    //  	// console.log(state);
    //  	// console.log(val); 
    //  	// console.log(data);  
    //  	var obj  = {}
    //  	obj[state] = data;
    //  	// obj.append(obj[])
    //  	this.setState(obj);
    //  	console.log(obj)
    //  	// console.log(this.state[state]);
    // }
	

	// select_dropdown(value,options){
	//  	let data;
	//  		// console.log(value);
	//  		// return value
	//  		Object.keys(options).map(function(k){
	//  			// console.log(options[k],k);
	//  			if(options[k] == value){
	//  				// return options[k]
	//  				// console.log(value);
	//  				// console.log(k)
	//  				// console.log(options[k])
	//  				data = options[k];
	//  			}


	//  		})
	//  		return data
	// }

    removeCompleted = () => {
	    const {dispatch} = this.props
	    dispatch(actionCreators.removeCompleted())
	}
	render(){
		return(
				<View style={gstyles.flexContainer}>
					<View style={gstyles.headerMenu}>
								<TouchableOpacity onPress={() =>this.props.navigation.openDrawer()} style={gstyles.headerMenuButton}>
									<Icon name="bars" size={24} color="#fff" />
			                    </TouchableOpacity>
			                    <Text style={gstyles.headerProfileLabel}>{Constants.specialOffer}</Text>
			                    <TouchableOpacity onPress={()=>this.props.navigation.navigate('ShoppingList')} style={gstyles.headerRightButton}><Icon name="shopping-basket" size={24} color="#fff" /></TouchableOpacity>
					</View>
					
					{ 
                        this.state.isLoading ? <View style={gstyles.loading}><ActivityIndicator style={gstyles.loadingActivity} color='#333' size="large"/></View>  :
						<ScrollView>					
								<View style={gstyles.searchView}>
						            <Text style={gstyles.searchViewLeft}>
						                    <Icon name="search" size={24} color="#ccc" />
						            </Text>
						            <TextInput style={gstyles.searchViewRight}
						                placeholder="Search Product"
						                underlineColorAndroid="transparent"
						                placeholderTextColor="rgb(158,145,140)"
						               
						                value={this.state.search}
						                onChangeText={this.handleSearchInput.bind(this)}
						            />
						        </View>

						    <ModalDropdown 
			                      style={gstyles.dropdownMainStyles}						                      
			                      dropdownTextStyle={gstyles.dropdownTextStyle}
			                      textStyle={gstyles.textStyle}
			                      dropdownStyle={gstyles.dropdownStyles}
			                      animated={false}
			                      defaultIndex={this.props.defaultIndex}
			                      showsVerticalScrollIndicator={true}
			                      defaultValue='Select Store'
			                      options={this.state.stores}		
			                      keyboardShouldPersistTaps='always'				         
			                      onSelect={(idx, data)=>{ this.onTagSelect(idx, data,data)}}				
	                		/>
	                				
	                		{(this.state.Message!= '') ?  <View><Text>{this.state.Message}</Text></View> : null }
						<View style={gstyles.specialOfferViewHome}>
							<FlatList numColumns={2} data={this.state.renderData}
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
						{
							(this.state.showLoadMore==true) ? <TouchableOpacity style={gstyles.buttonView} onPress={()=>this.showLoadMore()}><Text style={gstyles.buttonText}>Load More</Text></TouchableOpacity> : null
							}
							{				
								this.state.fetching_Status==true ? <View style={gstyles.loadMoreActivity}><ActivityIndicator color='#333' size="large"/></View>:<View />
							}
					</ScrollView>
				}
				</View>
			);
	}
}


//// <ModalDropdown 
// 			                      style={gstyles.dropdownMainStyles}						                      
// 			                      dropdownTextStyle={gstyles.dropdownTextStyle}
// 			                      textStyle={gstyles.textStyle}
// 			                      dropdownStyle={gstyles.dropdownStyles}
// 			                      defaultIndex={this.props.defaultIndex}
// 			                      showsVerticalScrollIndicator={true}
// 			                      defaultValue={this.state[item.name]=='' ? item.label : this.select_dropdown(this.state[item.name],item.multiOptions)}
// 			                      options={item.multiOptions}						         
// 			                      onSelect={(idx, data)=>{ this.onTagSelect(idx, data,item.name)}}				
// 	                		/>	
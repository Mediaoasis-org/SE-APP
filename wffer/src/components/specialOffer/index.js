import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, FlatList } from 'react-native';
import { gstyles } from '../../GlobalStyles';

export class SpecialOfferComponent extends React.Component{
	constructor(props){
		super(props);
		this.categories_func();
		this.state={
			categories:[],
		}
		
		// alert(this.props.data)
	}
	Capitalize(str){
    	return str.charAt(0).toUpperCase() + str.slice(1);
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
	render(){
		return(
			<View>
	              <FlatList numColumns={this.props.numcols} data={this.props.data}
	                renderItem={({item}) =>      
	                    <TouchableOpacity style={gstyles.specialOfferView}>
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
		)
	}
}

// <FlatList numColumns={this.props.numcols} data={this.props.data}
// 	                renderItem={({item}) =>      
// 	                    <View style={{width: '50%',padding:15}}>
// 	                      <TouchableOpacity style={{alignItems:'center'}}><Image source={require('../../../assets/product1.jpg')} style={gstyles.flatimage}/></TouchableOpacity>
// 	                          <View style={{flexDirection: 'column'}}>
// 	                          	  <Text style={{width:'60%',marginTop:10,backgroundColor:'#c30000',padding:5,color:'#fff',fontSize:16}}>{item.discount} </Text>
// 	                              <TouchableOpacity style={{width: '90%',paddingTop:10}} ><Text numberOfLines={2}  style={gstyles.title}>{this.Capitalize(item.name)}</Text></TouchableOpacity>
// 	                              <Text style={{color:'#808080',fontSize:16,fontWeight:'bold'}}>{item.category}</Text>
// 	                              <Text style={{color:'#c40b00',fontSize:17}}>{item.company}</Text>
// 	                              <Text style={{color:'#808080',fontSize:16,fontWeight:'bold',textDecorationLine: 'line-through', textDecorationStyle: 'solid'}}>{item.price}</Text>
// 	                              <Text style={{color:'#808080',fontSize:16,fontWeight:'bold'}}>{item.discountedPrice}</Text>
// 	                          </View>
// 	                    </View>                    
// 	                    }
// 	                keyExtractor={(item, index) => index}
// 	              />
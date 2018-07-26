import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  AsyncStorage
} from 'react-native';
import {gstyles} from '../../GlobalStyles';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
export  class LowestPriceComponent extends Component {
	constructor(props){
		super(props);
		this.state={
			data:[],
			isLoading:true,
			wishlist_id:'',

		}
		this.getStorageValue();
		
	}
 	async getStorageValue(){
    	const city = await AsyncStorage.getItem('cityInformation');
      	this.setState({city:city});
      	this.fetchValues()
      	// alert(this.state.city)
    }
	fetchValues(){
		let wishlist_id = this.props.navigation.state.params.wishlist_id;
		// alert(wishlist_id)
		return fetch('https://wffer.com/se/api/rest/listings/wishlist/get-lowest-price/'+wishlist_id+'?oauth_consumer_key=mji82teif5e8aoloye09fqrq3sjpajkk&oauth_consumer_secret=aoxhigoa336wt5n26zid8k976v9pwipe&city='+this.state.city,{
			        method:'GET'
	      })
	      .then((response) => response.json())
	      .then((responseJson) => {
	      	// alert(JSON.stringify(responseJson))
	      	if(responseJson.status_code=='200'){
	      		 this.setState({
			          data: responseJson.body,
			          isLoading: false,
	          
	        },function(){
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
	renderItems(){
		if(this.state.data.length == 0){
			return(
			<Text style={[gstyles.ShoppingText,gstyles.padding10]}>no record found</Text>
			)
		}
		else
		{
		return Object.entries(this.state.data).map(([key, value]) => {	
		console.log(`${key} ${value.productAvailable}`);	
				return ( 
					<TouchableOpacity onPress={()=>{this.props.navigation.push('StoreProfile',{wishlist_id:this.props.navigation.state.params.wishlist_id,store_id:value.wheretobuy_id,store_name:value.title})}} style={gstyles.flatlist} key={key}>
		          		<View style={gstyles.lowestPriceLeftBox}>
		          			<View style={gstyles.width90}>
		          				
		          					<Image source={{uri : value.photoSrc}} style={gstyles.lowestPriceImage} resizeMode="contain"/>
		          				
		          			</View>
		          		 </View>
			            <View style={gstyles.lowestPriceRightBox}>
				            <View style={gstyles.lowestPriceRightInner}>
				            	<View style={gstyles.lowestPriceRightInnerBox}>
					          				<Text style={gstyles.lowestPriceTitle}>{value.title}</Text>
							          		<Text style={gstyles.lowestPriceSubTitle}>Products Available {value.productAvailable}</Text>
							          		<Text style={[gstyles.lowestPriceSubTitle,gstyles.textRed]}>Total Price : {value.indivisualSum}</Text>	
							          		<Text style={[gstyles.lowestPriceSubTitle,gstyles.textRed,gstyles.marginBottom10]}>Total Save : {value.totalSave}</Text>	
								</View>	
								<View style={gstyles.lowestPriceLeftInnerBox}>
										<Icon name="angle-right" size={40} color='#000' style={gstyles.marginTop40} />
								</View>
							</View>				               
		          		</View>
		        	</TouchableOpacity>
		        )
	    })	
	    }   
	}
	render(){
		return(
			<View style={gstyles.container}>
					<View style={gstyles.headerMenu}>
								<TouchableOpacity onPress={() => this.props.navigation.goBack()} style={gstyles.headerMenuButton}>
									<Icon name="angle-left" size={26} color="#fff" />
			                    </TouchableOpacity>
			                    <Text style={gstyles.headerProfileLabel}>Price Comparison</Text>
			                    <Text style={gstyles.headerRightButton}></Text>
					</View>
					<ScrollView>
					{	
						this.state.isLoading ?  <View style={gstyles.loading}><ActivityIndicator color='#333' size="large" style={{height:100,width:'30%'}}/></View> :
						<View>
							{this.renderItems()}
					    </View>
					}
					</ScrollView>
			</View>
		);
	}
}
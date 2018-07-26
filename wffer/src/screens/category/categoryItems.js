import React, { Component } from 'react';
// import { withNavigation } from 'react-navigation';
import {
	Text,
	View,
	TouchableOpacity,
	Image,
	FlatList,
	ScrollView,
	ActivityIndicator,
	AsyncStorage
} from 'react-native';
// import Carousel from 'react-native-snap-carousel';
import {gstyles} from '../../GlobalStyles';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
// import {Constants} from '../../common';

import {ProductDetail} from '../../components/Products';
// import iconFont from 'react-native-vector-icons/Fonts/FontAwesome.ttf';
// const window= Dimensions.get('window');

export class ProductDetails extends Component {

    constructor(props){
    	super(props);
    	this.state = {
            qty:1,
            isLoading:true,
            fieldValues:[],
            priceValues:[],
            city:'',
            Message:'',
            priceMessage:'',
      
      }
      this.getStorageValue();
      this.fetchValues();
      this.priceComparision();
    }
    async getStorageValue(){
    	const city = await AsyncStorage.getItem('cityInformation');
      	this.setState({city:city});
    }
    fetchValues(){
    	let product_id = this.props.navigation.state.params.product_id;
    	return fetch('https://wffer.com/se/api/rest/listing/view/'+product_id+'?oauth_consumer_key=mji82teif5e8aoloye09fqrq3sjpajkk&oauth_consumer_secret=aoxhigoa336wt5n26zid8k976v9pwipe',{
			        method:'GET'
			      })
			      .then((response) => response.json())
			      .then((responseJson) => {
			      	if(responseJson.status_code=='200'){
			      		 this.setState({
				          
				          fieldValues:responseJson.body,isLoading: false
				          
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

    priceComparision(){
    	let product_id = this.props.navigation.state.params.product_id;
    	return fetch('https://wffer.com/se/api/rest/listing/where-to-buy/'+product_id+'?oauth_consumer_key=mji82teif5e8aoloye09fqrq3sjpajkk&oauth_consumer_secret=aoxhigoa336wt5n26zid8k976v9pwipe&city='+this.state.city,{
			        method:'GET'
			      })
			      .then((response) => response.json())
			      .then((responseJson) => {
			      	if(responseJson.status_code=='200'){
			      		 this.setState({
				          
				          priceValues:responseJson.body.priceInfo,isLoading: false
				          
				        });
			      		 // alert(JSON.stringify(this.state.priceValues));
			      	}
			      	else
			      	{
			      		 this.setState({priceMessage:responseJson.message});
			      	}
			      	
			      	
			      })
			      .catch((error) =>{
			        console.error(error);
			      });
    }

	// decrease_qty(qty){
	// 	// alert(qty)
	// 	if(parseInt(qty)!=1){
	// 	 qty=parseInt(qty)-1; 
	// 	}
	// 	this.setState({qty:qty});
	// }
	//  increase_qty(qty){
	//    	// alert(id)
	   	
	//    	qty=parseInt(qty)+1; 
	//    	// alert(qty)
	//    	this.setState({qty:qty});
	//  }
	render(){
		// alert(this.state.Message)
		return(
				<View style={gstyles.flexContainer}>
					<View style={gstyles.headerMenu}>
								<TouchableOpacity onPress={() =>this.props.navigation.goBack()} style={gstyles.headerMenuButton}>
									<Icon name="angle-left" size={30} color="#fff" />
			                    </TouchableOpacity>
			                    <Text style={gstyles.headerProfileLabel}>Product Details</Text>
			                    <Text style={gstyles.headerRightButton}></Text>
					</View>
					{
                              this.state.isLoading==true ?  <View style={gstyles.loading}><ActivityIndicator style={gstyles.loadingActivity} color='#333' size="large"/></View> :  	
					<ScrollView>							
								<ProductDetail data={this.state.fieldValues} />
								<Text style={gstyles.priceComparisonText}>Price Comparison</Text>
								if(this.state.priceValues != ''){
										<FlatList data={this.state.priceValues} 
											renderItem={({item,index}) =>      
						                    <View style={gstyles.priceComparisonView} >
									          		<View style={gstyles.priceComparisonLeft}>
									          			<View style={gstyles.paddingTop10}><Image source={require('../../../assets/so-carrefour.png')} resizeMode="contain" style={gstyles.priceCompanyImage}/></View>
									          		</View>
										            <View style={gstyles.priceComparisonRight}>
											          		<View style={gstyles.priceTitleTextView}><Text style={gstyles.priceTitleText}>{item.price} SAR</Text></View>
											          		<View style={gstyles.priceTitleTextView}><Text style={gstyles.priceSubtitleText}>{item.wheretobuy_title}</Text></View>
											          		<View style={gstyles.priceTitleTextView}><Text style={gstyles.priceSubtitleText}>{item.city}</Text></View>
											               
									          		</View>
									        </View>
									                      
						                    }
						                keyExtractor={(item, index) => index.toString()}
										/>
								}
								else
								{
									<View><Text style={[gstyles.ShoppingText,gstyles.padding10]}>{this.state.priceMessage}</Text></View>
								}
								
								
					</ScrollView>

					}
				</View>
			);
	}
}
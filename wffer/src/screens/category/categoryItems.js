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
	AsyncStorage,
	TouchableHighlight
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
            isPriceLoading:true,
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
    	// alert(product_id)
    	 fetch('https://wffer.com/se/api/rest/listing/view/'+product_id+'?oauth_consumer_key=mji82teif5e8aoloye09fqrq3sjpajkk&oauth_consumer_secret=aoxhigoa336wt5n26zid8k976v9pwipe',{
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
    	 fetch('https://wffer.com/se/api/rest/listing/where-to-buy/'+product_id+'?oauth_consumer_key=mji82teif5e8aoloye09fqrq3sjpajkk&oauth_consumer_secret=aoxhigoa336wt5n26zid8k976v9pwipe&city='+this.state.city,{
			        method:'GET'
			      })
			      .then((response) => response.json())
			      .then((responseJson) => {
			      	// alert(JSON.stringify(responseJson))
			      	if(responseJson.status_code=='200'){
			      		 this.setState({
				          
				          priceValues:responseJson.body.priceInfo,isPriceLoading: false
				          
				        });
			      		 // alert(JSON.stringify(this.state.priceValues));
			      	}
			      	if(responseJson.status_code == '404'){
			      		this.setState({priceMessage : responseJson.message})
			      	}
			      	
			      })
			      .catch((error) =>{
			        console.error(error);
			      });
    }

	decrease_qty(qty){
		// alert(qty)
		if(parseInt(qty)!=1){
		 qty=parseInt(qty)-1; 
		}
		this.setState({qty:qty});
	}
	 increase_qty(qty){
	   	// alert(id)
	   	
	   	qty=parseInt(qty)+1; 
	   	// alert(qty)
	   	this.setState({qty:qty});
	 }
	render(){
		// alert(this.state.priceValues.length)
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
							
								<View style={gstyles.backgroundWhite}>
							          <View style={[gstyles.width100,gstyles.flexDirectionRow]}>
							                <View style={gstyles.lowestPriceLeftBox}>
							                    
							                      <Image source={{uri:this.state.fieldValues.image}} style={gstyles.productDetailsImage}/>
							                    
							                </View>
							                <View style={gstyles.lowestPriceRightBox}>
							                    <View style={gstyles.width80}><Text style={gstyles.productDetailsTitle}>{this.state.fieldValues.title}</Text></View>
							                    
							                    <View style={[gstyles.width80,gstyles.flexDirectionRow,gstyles.marginTop5per]}><Text>{this.state.fieldValues.like_count} likes</Text><Text> - </Text><Text>{this.state.fieldValues.view_count} Views</Text><Text> - </Text><Text>{this.state.fieldValues.comment_count} Comments</Text></View>
							              		<View style={[gstyles.flexDirectionRow,gstyles.padding10,{width:'50%',marginLeft:'5%'}]}>   
								          			<Text style={gstyles.qtyText}>{this.state.qty}</Text>		
							                          <TouchableHighlight 
							                             onPress={() => this.increase_qty(this.state.qty)}
							                             underlayColor='#BEBEBE' style={gstyles.qtybuttonDecrease}>
							                             <Image source={require('../../../assets/plus.png')} style={gstyles.qtyIcon}/>
							                          </TouchableHighlight>
							                          
							                          <TouchableHighlight 
							                             onPress={() => this.decrease_qty(this.state.qty)}
							                             underlayColor='#BEBEBE' style={gstyles.qtybuttonIncrease}>
							                            <Image source={require('../../../assets/minus.png')} style={gstyles.qtyIcon}/>
							                          </TouchableHighlight>
							                    </View>
							              	</View>


							          </View>
							          <View style={[gstyles.width100,gstyles.flexDirectionRow]}>
							             	
							              <TouchableOpacity style={gstyles.likeButton} onPress={()=>this.props.navigation.push('MultipleWishlist',{product_ids:[this.state.fieldValues.listing_id],quantities:[{id : this.state.fieldValues.listing_id,qty : this.state.qty}]})}>
							                  <Text style={gstyles.textCenter}>Add to Shopping List</Text>
							              </TouchableOpacity>
							          </View>
						        </View>
								<Text style={gstyles.priceComparisonText}>Price Comparison</Text>
								
									
									{(this.state.priceValues.length > 0) ? 
										<View style={gstyles.backgroundWhite}>
										<FlatList data={this.state.priceValues} 
											renderItem={({item,index}) =>      
						                    <View style={gstyles.priceComparisonView} >
									          		<View style={gstyles.priceComparisonLeft}>
									          			<View style={gstyles.paddingTop10}><Image source={{uri : item.image}} resizeMode="contain" style={gstyles.priceCompanyImage}/></View>
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
									</View>
									:
										<View style={gstyles.backgroundWhite}><Text style={[gstyles.ShoppingText,gstyles.padding10]}>{this.state.priceMessage}</Text></View>
									}
								
								
								
					</ScrollView>

					}
				</View>
			);
	}
}

	// <ProductDetail data={this.state.fieldValues} />

	// if(this.state.priceValues != ""){
	// 								<View>
	// 									<FlatList data={this.state.priceValues} 
	// 										renderItem={({item,index}) =>      
	// 					                    <View style={gstyles.priceComparisonView} >
	// 								          		<View style={gstyles.priceComparisonLeft}>
	// 								          			<View style={gstyles.paddingTop10}><Image source={require('../../../assets/so-carrefour.png')} resizeMode="contain" style={gstyles.priceCompanyImage}/></View>
	// 								          		</View>
	// 									            <View style={gstyles.priceComparisonRight}>
	// 										          		<View style={gstyles.priceTitleTextView}><Text style={gstyles.priceTitleText}>{item.price} SAR</Text></View>
	// 										          		<View style={gstyles.priceTitleTextView}><Text style={gstyles.priceSubtitleText}>{item.wheretobuy_title}</Text></View>
	// 										          		<View style={gstyles.priceTitleTextView}><Text style={gstyles.priceSubtitleText}>{item.city}</Text></View>
											               
	// 								          		</View>
	// 								        </View>
									                      
	// 					                    }
	// 					                keyExtractor={(item, index) => index.toString()}
	// 									/>
	// 								</View>
	// 							}
	// 							else
	// 							{
	// 								<View><Text style={[gstyles.ShoppingText,gstyles.padding10]}>{this.state.priceMessage}</Text></View>
	// 							}
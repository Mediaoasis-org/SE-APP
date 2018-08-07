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
      this.best_price='';
      this.best_price_store='';
      this.getStorageValue();
       if(this.props.navigation.state.params.best_price){
		      	this.best_price = this.props.navigation.state.params.best_price;
		      	this.best_price_store = this.props.navigation.state.params.best_title;
      }
      console.log(this.best_price,this.best_price_store)
    }
    async getStorageValue(){
    	const city = await AsyncStorage.getItem('cityInformation');
      	this.setState({city:city});
      	this.fetchValues();
      	this.priceComparision();

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
							
								<View style={[gstyles.backgroundWhite,{marginTop:15,width:'94%',marginLeft:'3%',marginRight:'3%'}]}>
							          <View style={[gstyles.width100,gstyles.flexDirectionRow]}>
							                <View style={{flexDirection:'column',width:'30%',justifyContent:'center',alignItems:'center'}}>
									             <Image source={{uri:this.state.fieldValues.image}} style={[gstyles.productDetailsImage,{padding:10}]}/>
											</View>
							                <View style={{flexDirection:'column',width:'55%'}}>

												<View style={gstyles.width80}><Text style={gstyles.productDetailsTitle,{paddingTop:25,fontSize:16,color:'#000'}}>{this.state.fieldValues.title}</Text></View>						                    
									            <View style={[gstyles.width80,gstyles.flexDirectionRow,gstyles.marginTop5per]}><Text style={{fontSize:14,color:'#727272'}}>{this.state.fieldValues.like_count} likes</Text></View>
									            <View style={[gstyles.width80,gstyles.flexDirectionRow,gstyles.marginTop5per]}><Text style={{fontSize:14,color:'#727272'}}>Location - {this.state.fieldValues.location} </Text></View>
									      	</View>

											<View style={{width:'15%',flexDirection:'column',borderLeftWidth:1,borderLeftColor:'#EAEAEA',paddingTop:10}}>   
										          					
									                          <TouchableHighlight 
									                             onPress={() => this.increase_qty(this.state.qty)}
									                             underlayColor='transparent' style={[gstyles.qtybuttonDecrease,{justifyContent:'center',alignItems:'center'}]}>
									                             <Image source={require('../../../assets/aditionsign.png')} style={{width:24,height:24}}/>
									                          </TouchableHighlight>
									                      <View style={{justifyContent:'center',height:50}}>
									                          <Text style={{color:'#727272',paddingLeft:5,textAlign:'center',fontSize:22}}>{this.state.qty}</Text>
									                       </View>
									                          <TouchableHighlight 
									                             onPress={() => this.decrease_qty(this.state.qty)}
									                             underlayColor='transparent' style={[gstyles.qtybuttonIncrease,{justifyContent:'center',alignItems:'center'}]}>
									                            <Image source={require('../../../assets/subsign.png')} style={{width:24,height:24}}/>
									                          </TouchableHighlight>
									          </View>


							          </View>
							          <View style={[gstyles.width100,gstyles.flexDirectionRow]}>
							             	<TouchableOpacity style={gstyles.likeButton} onPress={()=>alert('liked')}>
							                  	<Text style={gstyles.textCenter}>Like</Text>
							              	</TouchableOpacity>
							             	<TouchableOpacity style={gstyles.likeButton} onPress={()=>this.props.navigation.push('MultipleWishlist',{product_ids:[this.state.fieldValues.listing_id],quantities:[{id : this.state.fieldValues.listing_id,qty : this.state.qty}]})}>
							                  	<Text style={gstyles.textCenter}>Add to Shopping List</Text>
							             	 </TouchableOpacity>
							          </View>
						        </View>
						        {(this.state.priceValues.length > 0) ? 
						        		<View>
											<Text style={gstyles.priceComparisonText}>Price Comparison</Text>
											<View style={gstyles.backgroundWhite}>
												<FlatList data={this.state.priceValues} 
													renderItem={({item,index}) =>      
								                    <View style={gstyles.priceComparisonView} >
											          		<View style={gstyles.priceComparisonLeft}>
											          			<View style={gstyles.paddingTop10}><Image source={{uri : item.image}} resizeMode="contain" style={gstyles.priceCompanyImage}/></View>
											          		</View>
												            <View style={gstyles.priceComparisonRight}>
												            		{(this.best_price_store == item.wheretobuy_title) && (this.best_price != item.price) ? 
												            			<View style={gstyles.priceTitleTextView}>
													            			<Text style={[gstyles.specialOfferCategory,{textDecorationLine: 'line-through', textDecorationStyle: 'solid',fontSize:16}]}>{item.price} SAR</Text>
					                              							<Text style={gstyles.priceTitleText}>{this.best_price} SAR</Text>
				                              							</View>
												            		:
												            			<View style={gstyles.priceTitleTextView}><Text style={gstyles.priceTitleText}>{item.price} SAR</Text></View>
												            		
													          		}
													          		<View style={gstyles.priceTitleTextView}><Text style={gstyles.priceSubtitleText}>{item.wheretobuy_title}</Text></View>
													          		<View style={gstyles.priceTitleTextView}><Text style={gstyles.priceSubtitleText}>{item.city}</Text></View>
													               
											          		</View>
											        </View>
											                      
								                    }
								                keyExtractor={(item, index) => index.toString()}
												/>
											</View>						
										</View>
								: null
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
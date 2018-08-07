import React, { Component } from 'react';
import {
  Text,
  View,
TouchableOpacity,
TouchableHighlight,
TextInput,
Image,
FlatList,
ScrollView,
Dimensions,
ActivityIndicator,
} from 'react-native';
// import Carousel from 'react-native-snap-carousel';
import {gstyles} from '../../GlobalStyles';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { SearchComponent } from '../../components/Search';
// import {Constants} from '../../common';
// import { DrawerActions } from 'react-navigation';
import CheckBox from 'react-native-checkbox';
// import { CategoryListComponent } from '../../components/CategoryList';
// import iconFont from 'react-native-vector-icons/Fonts/FontAwesome.ttf';
const window = Dimensions.get('window')
export class Products extends Component {

    constructor(props){
    	super(props);
    	this.state = {
            // qty:1,
            activeRow:'',
            search:'',
            fetchValues:[],
            isLoading:true,
            isCategoryLoading:true,
            showLoadMore:false,
            selectedCheckboxId:[],
            fetching_Status: false,
            categories:[],
            quantities:[],
            fieldValues:[],
            renderData:[],
            // page:1,
      }
      this.page=1;
      this.fetchValues();
      this.categories_func();
      
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
    fetchValues(){
    	let json_data;
    	let category_id = this.props.navigation.state.params.cat_id;
    	let categoryUrl;
    	if(category_id){
    		categoryUrl='https://wffer.com/se/api/rest/listings/index?oauth_consumer_key=mji82teif5e8aoloye09fqrq3sjpajkk&oauth_consumer_secret=aoxhigoa336wt5n26zid8k976v9pwipe&listingtype_id=2&category_id='+category_id + '&limit=20&page=' + this.page;
    	}
    	else
    	{
    		categoryUrl='https://wffer.com/se/api/rest/listings/index?oauth_consumer_key=mji82teif5e8aoloye09fqrq3sjpajkk&oauth_consumer_secret=aoxhigoa336wt5n26zid8k976v9pwipe&listingtype_id=2&limit=20&page=' + this.page;
    	}
    	return fetch(categoryUrl,{
			        method:'GET'
			      })
			      .then((response) => response.json())
			      .then((responseJson) => {
			    	// alert(responseJson.body.response)
			    	// console.log(responseJson);
			    	// const arr = Object.keys(json_data).map((key) => [key, json_data[key]]);
			      	if(responseJson.status_code=='200'){
			      		if(responseJson.body.response){
			      			json_data = responseJson.body.response;
				      		json_data.map((item)=>{
				      			item.quantity = 1;
				      		});
				      		this.setState({
				          
					          fieldValues:json_data,isLoading: false,

					          // [...this.state.fieldValues,...responseJson.body.response]
					        });
					        this.setState({renderData : this.state.fieldValues})
			      		}
			      		else{
			      			this.setState({fieldValues:responseJson.body.response,isLoading:false})
			      		}
			      		 // this.selectQuantities();	
			      		 let count = this.state.fieldValues.length;
			      		 // alert(count);
			      		 if(count >= 20){
			      		 	this.setState({showLoadMore:true})
			      		 }
			      		 // console.log(JSON.stringify(this.state.fieldValues));
			      	}
			      	else
			      	{
			      		alert("no data found")
			      	}
			      	this.setState({Message:responseJson.Message});
			      })
			      .catch((error) =>{
			        console.error(error);
			      });
    }
	onCheckBoxPress(id) {
    	// alert(id)
	    let tmp = this.state.selectedCheckboxId;
		
	    if ( tmp.includes( id ) ) {
	      tmp.splice( tmp.indexOf(id), 1 );
	    } else {
	      tmp.push( id );
	    }
	    this.setState({
	      selectedCheckboxId: tmp
	    });
	    // alert(this.state.selectedCheckboxId)
	  }
	
	 
	 increase_qty(listing_id){
	 	// let qty = 1;
	 	let temp = this.state.fieldValues;
	 	// let index = temp.findIndex(el => el.listing_id === listing_id);
	 	temp.map((items)=>{
	 		if(listing_id == items.listing_id){
	 			return items.quantity = items.quantity + 1;
	 		}
	 	})
	 	// console.log(temp)
	 	this.setState({
	      fieldValues: temp
	    });
	 	
	 }
	 decrease_qty(listing_id){
	 	let temp = this.state.fieldValues;
	 	// let index = temp.findIndex(el => el.listing_id === listing_id);
	 	temp.map((items)=>{
	 		if(listing_id == items.listing_id){
	 			if(items.quantity <=1){
	 				return items.quantity;
	 			}
	 			else{
		 			return items.quantity = items.quantity - 1;
		 		}
	 		}
	 	})
	 	// console.log(temp)
	 	this.setState({
	      fieldValues: temp
	    });
	}
	 addToCart(){
	 	if(this.state.selectedCheckboxId.length<=0){
	 		alert("Select Atleast One Product");
	 	}
	 	else
	 	{
	 		let tempquan = [];
	 		this.state.selectedCheckboxId.map((selected)=>{
	 			this.state.fieldValues.map((item)=>{

			    	if(selected == item.listing_id){
			    		tempquan.push({id : selected , qty : item.quantity});
			    	}
			    	
			    })
	 		})
	 		  
	 		   // this.setState({quantities : tempquan});

	 		this.props.navigation.push('MultipleWishlist',{product_ids:this.state.selectedCheckboxId,quantities : tempquan});
	 	}
	 	
	 }
	 showLoadMore(){
	 	// alert(this.state.showLoadMore)
	 	// alert(this.state.page);
	 	// let pageno = this.state.page+1;
	 	// // alert(page);
	 	// this.setState({page : pageno});
	 	let json_data;
	 	this.page = this.page + 1;
	 	this.setState({ fetching_Status: true,showLoadMore:false}, ()=>{
		 	// alert(this.state.showLoadMore);
		 	// alert(this.page);
		 	let category_id = this.props.navigation.state.params.cat_id;
	    	let categoryUrl;
	    	if(category_id){
	    		categoryUrl='https://wffer.com/se/api/rest/listings/index?oauth_consumer_key=mji82teif5e8aoloye09fqrq3sjpajkk&oauth_consumer_secret=aoxhigoa336wt5n26zid8k976v9pwipe&listingtype_id=2&category_id='+category_id + '&limit=20&page=' + this.page;
	    	}
	    	else
	    	{
	    		categoryUrl='https://wffer.com/se/api/rest/listings/index?oauth_consumer_key=mji82teif5e8aoloye09fqrq3sjpajkk&oauth_consumer_secret=aoxhigoa336wt5n26zid8k976v9pwipe&listingtype_id=2&limit=20&page=' + this.page;
	    	}
	    	return fetch(categoryUrl,{
				        method:'GET'
				      })
				      .then((response) => response.json())
				      .then((responseJson) => {
				      	

				      	if(responseJson.status_code=='200'){
				      		json_data = responseJson.body.response;
				      		json_data.map((item)=>{
				      			item.quantity = 1;
				      		})
				      		 this.setState({
					          fieldValues:[...this.state.fieldValues,...json_data],isLoading: false,fetching_Status:false
					        });

				      		  this.setState({renderData : this.state.fieldValues})
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
	 handleSearchInput(e){
	    let text = e.toLowerCase()
	    this.setState({search : e})
	    let fullList = this.state.fieldValues;

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

	 // renderQuantity(list_id)
	 // {
	 // 	return(
					
  //           );
	 // }
	render(){
		// alert("render");
		return(
				<View style={gstyles.flexContainer}>
					<View style={gstyles.headerMenu}>
								<TouchableOpacity onPress={() =>this.props.navigation.openDrawer()} style={gstyles.headerMenuButton}>
									<Icon name="bars" size={24} color="#fff" />
			                    </TouchableOpacity>
			                    <Text style={gstyles.headerProfileLabel}>{this.props.navigation.state.params.cat_name}</Text>
			                    <TouchableOpacity onPress={()=>this.addToCart()} style={gstyles.headerRightButton}><Icon name="cart-plus" size={24} color="#fff" /></TouchableOpacity>
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
				                autoCorrect={true}
				                value={this.state.search}
				                onChangeText={this.handleSearchInput.bind(this)}
				            />
				        </View>
						<View>
						{
							this.state.noData ? <Text>No Data Found</Text> :  <View>    
						{
							this.state.renderData.map((item,index)=>{
								return(
									<View style={[gstyles.productsMain,{paddingLeft:10,paddingRight:10,paddingTop:10}]} key={index}>
		                    		<TouchableOpacity onPress={()=>{this.props.navigation.push('ProductDetails',{product_id:item.listing_id,best_price:item.best_deal_price,best_title:item.best_deal_title})}}>
		                    			<View style={{width:'96%',flexDirection:'row',backgroundColor:'#fff',marginLeft:'2%',marginRight:'2%'}}>
		                    				<TouchableOpacity style={{width:'30%',flexDirection:'column',paddingLeft:10}} onPress={()=>{this.onCheckBoxPress(item.listing_id)}}>
					          						<Image source={{uri:item.image}} style={[{marginTop:'15%', marginBottom:'10%', width: '100%', height: window.height/6},this.state.selectedCheckboxId.map((items)=>{ if(items == item.listing_id){ return ({opacity:0.6})} })]} />
					          				</TouchableOpacity>
					          				
								            <View style={{width:'55%',flexDirection:'column',paddingLeft:10,paddingTop:10,paddingRight:10,paddingBottom:10}}>
								            	<View style={gstyles.width100}>
								          					
								          						<Text style={gstyles.productTitle}>{item.title}</Text>
								          					
								       			</View>
							       				<View>
							          				{
							          					this.state.categories.map((cat)=>{
							          						if(cat.category_id==item.category_id){
							          							return(
							          							<View style={gstyles.width100} key={cat.category_id}><Text style={gstyles.productCatTitle,{color:'#727272',paddingTop:7,fontSize:16,fontWeight:'bold'}}>{cat.category_name}</Text></View>
							          							);
							          						}
							          					})
							          				}
								          		</View>
									          	<Text style={{fontSize:16,color:'#727272',paddingTop:7}}>{item.best_deal_title}</Text>
								          		<View style={gstyles.bestDealView,{flexDirection:'row',paddingTop:7}}>
					          						<Text style={{fontSize:16}}>Best Deal</Text>
									          		<Text style={{fontSize:16,color:'#ff0000'}}> : {item.best_deal_price} {item.currency} </Text>
									          	</View>												          	 	
								          	</View>
								            <View style={{width:'15%',flexDirection:'column',borderLeftWidth:1,borderLeftColor:'#EAEAEA',}}>
						                          <TouchableHighlight 
						                             onPress={() => this.increase_qty(item.listing_id)}
						                             underlayColor='#BEBEBE' style={[gstyles.qtybuttonDecrease,{justifyContent:'center',alignItems:'center',height:50}]}>
						                             <Image source={require('../../../assets/aditionsign.png')} style={{width:24,height:24}}/>
						                          </TouchableHighlight>										                      
						                          <View style={{justifyContent:'center',alignItems:'center',height:50}}>
						                          		<Text style={{color:'#727272',paddingLeft:5,textAlign:'center',fontSize:18}}>{item.quantity}</Text>
						                          </View>										                          
						                          <TouchableHighlight 
						                             onPress={() => this.decrease_qty(item.listing_id)}
						                             underlayColor='#BEBEBE' style={[gstyles.qtybuttonIncrease,{justifyContent:'center',alignItems:'center',height:50}]}>
						                            <Image source={require('../../../assets/subsign.png')} style={gstyles.qtyIcon}/>
						                          </TouchableHighlight>										                        
								            </View>

						        		</View>
					          		</TouchableOpacity> 
						        	</View>
								);
							})
						}  
						</View>
						}   
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

//// <View style={{flexDirection: 'row',marginTop: '10%',}}>	
	// 					          		   <Text style={{ fontSize: 15, color: '#000', paddingRight:10, paddingTop:3}}>Qty</Text>
							          		
	// 								  		<View style={styles.qtyView}>		 
	// 										       <TouchableHighlight 
	// 										        	onPress={() => this.decrease_qty(item.id,(item.qty>1)? item.qty : this.state.qty)}
	// 										        	 underlayColor='#BEBEBE' style={styles.qtybuttonDecrease}>
	// 										           <Image source={require('../../../assets/qtyDecrease.png')} style={gstyles.menuicon} resizeMode="contain" />
	// 										        </TouchableHighlight>
	// 										        <Text style={styles.qtyText}>{(item.qty>1)? item.qty : this.state.qty}</Text>
	// 										       <TouchableHighlight 
	// 										        	onPress={() => this.increase_qty(item.id,(item.qty>1)? item.qty : this.state.qty)}
	// 										        	 underlayColor='#BEBEBE' style={styles.qtybuttonIncrease}>
	// 										           <Image source={require('../../../assets/qtyIncrease.png')} style={gstyles.menuicon} resizeMode="contain" />
	// 										        </TouchableHighlight>
	// 								 		 </View>

							          		
						          
	// 					          		</View>


	// 											          		<View style={{flexDirection:'column',width:'20%'}}>
												   //        		<TouchableOpacity onPress={()=>alert(item.listing_id)} >
													  //         		<CheckBox
													  //         		  value={item.listing_id}
															// 		  label=' '
															// 		  labelStyle={{color:'#000',fontSize:16}}
															// 		  onClick={() =>this.setState({checked: !checked})}
																	 
															// 		  style={{color:'#ff0000',backgroundColor:'#00ff00'}}
															// 		/>	
															// 	</TouchableOpacity>
																
															// </View>
																
	// 														</View>



	// {
	// 						this.state.showLoadMore==true ? <TouchableHighlight style={gstyles.buttonView} onPress={()=>this.showLoadMore()}><Text style={gstyles.buttonText}>Load More</Text></TouchableHighlight>: <View />
	// 					}
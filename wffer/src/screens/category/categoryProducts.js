import React, { Component } from 'react';
import {
  Text,
  View,
TouchableOpacity,
TouchableHighlight,
Image,
FlatList,
ScrollView,
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


export class Products extends Component {

    constructor(props){
    	super(props);
    	this.state = {
            qty:1,
            activeRow:'',
            search:'',
            fetchValues:[],
            isLoading:true,
            isCategoryLoading:true,
            showLoadMore:false,
            selectedCheckboxId:[],
            fetching_Status: false,
            categories:[],
            quantities:[]
            // page:1,
      }
      this.page=1;
      this.fetchValues();
      this.categories_func();
      
    }
    // selectQuantities(){
    // 	let temp =[];
    // 			this.state.fieldValues.map((item)=>{
    // 				var obj={id: item.listing_id,qty: 1}
			 // 		temp.push(obj);

    // 			})
    // 			this.setState({quantities:temp});
    // 			console.log(this.state.quantities)
    // }
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
			    	let json_data = responseJson.body.response;
			    	// const arr = Object.keys(json_data).map((key) => [key, json_data[key]]);
			      	if(responseJson.status_code=='200'){
			      		 this.setState({
				          
				          fieldValues:responseJson.body.response,isLoading: false,

				          // [...this.state.fieldValues,...responseJson.body.response]
				        });
			      		 // this.selectQuantities();	
			      		 let count = this.state.fieldValues.length;
			      		 // alert(count);
			      		 if(count >= 20){
			      		 	this.setState({showLoadMore:true})
			      		 }
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

	decrease_qty(id){

		let temp = this.state.quantities;
	 	let index =temp.map(function(e) { return e.id; }).indexOf(id);
	 	// console.log(index)
	 	if (index == -1){
	 				let qty = 1;
	 				if(qty==1){
	 					var obj={id: id,qty: qty}
			 			temp.push(obj);
	 				}
			 		
	 	}
	 	else
	 	{
	 		Object.entries(temp).map(([key,value])=>{
	 			if(value.id === id){
	 				// alert(id);
	 				// alert(value.id);
	 				if(value.qty<=1){
	 					return value.qty = value.qty;	
	 				}
	 				else
	 				{
	 					return value.qty = value.qty-1;	
	 				}
	 				
	 			}
		 	})
	 	}
	 	this.setState({
	      quantities: temp
	    });
	 	 console.log(this.state.quantities);
	 	 // this.state.quantities.map((items)=>{
	 	 // 	console.log(items.id)
	 	 // })
	}
	 increase_qty(id){
	 	let temp = this.state.quantities;
	 	let index =temp.map(function(e) { return e.id; }).indexOf(id);
	 	// console.log(index)
	 	if (index == -1){
	 				let qty = 1;
			 		var obj={id: id,qty: qty+1}
			 		temp.push(obj);
	 	}
	 	else
	 	{
	 		Object.entries(temp).map(([key,value])=>{
	 			if(value.id === id){
	 				// alert(id);
	 				// alert(value.id);
	 				return value.qty = value.qty+1;	
	 			}
		 	})
	 	}
	 	this.setState({
	      quantities: temp
	    });
	 	 console.log(this.state.quantities)
	 }
	 addToCart(){
	 	if(this.state.selectedCheckboxId.length<=0){
	 		alert("Select Atleast One Product");
	 	}
	 	else
	 	{
	 		this.props.navigation.push('MultipleWishlist',{product_ids:this.state.selectedCheckboxId});
	 	}
	 	
	 }
	 showLoadMore(){
	 	// alert(this.state.showLoadMore)
	 	// alert(this.state.page);
	 	// let pageno = this.state.page+1;
	 	// // alert(page);
	 	// this.setState({page : pageno});
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
				      		 this.setState({
					          fieldValues:[...this.state.fieldValues,...responseJson.body.response],isLoading: false,fetching_Status:false
					        });
				      		 // this.selectQuantities();	
				      		 let count = responseJson.body.response.length;
				      		 if(count >= 20){
				      		 	this.setState({showLoadMore:true})
				      		 }
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
	 renderText(qty){
	 	return(
	 	<Text style={gstyles.qtyText}>{qty}</Text>
	 	)
	 }
	 renderQuantity(list_id)
	 {
	 	return(
					<View style={gstyles.qtyView}>   
	          					
	          						
	          						
                          <TouchableHighlight 
                             onPress={() => this.increase_qty(list_id)}
                             underlayColor='#BEBEBE' style={gstyles.qtybuttonDecrease}>
                             <Image source={require('../../../assets/plus.png')} style={gstyles.qtyIcon}/>
                          </TouchableHighlight>
                          
                          <TouchableHighlight 
                             onPress={() => this.decrease_qty(list_id)}
                             underlayColor='#BEBEBE' style={gstyles.qtybuttonIncrease}>
                            <Image source={require('../../../assets/minus.png')} style={gstyles.qtyIcon}/>
                          </TouchableHighlight>
                    </View>
            );
	 }
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
								<SearchComponent />
								<View>
								{
									this.state.fieldValues.map((item,index)=>{
										return(
											<View style={gstyles.productsMain} key={index}>
					                    		<TouchableOpacity style={gstyles.flexDirectionRow} onPress={()=>{this.props.navigation.push('ProductDetails',{product_id:item.listing_id})}}>
									          		<View style={gstyles.productsMainLeft}>
									          			
								          				<View style={gstyles.productImageView}>
								          					<Image source={{uri:item.image}} style={gstyles.productImage} />
								          				</View>
									          			
									          			<View style={gstyles.productViewRight}>
									          				<View style={gstyles.width100}>
									          					<TouchableOpacity onPress={()=>{this.props.navigation.push('ProductDetails',{product_id:item.listing_id})}}>
									          						<Text style={gstyles.productTitle}>{item.title}</Text>
									          					</TouchableOpacity>
									          				</View>
									          				<View>
									          				{
									          					this.state.categories.map((cat)=>{
									          						if(cat.category_id==item.category_id){
									          							return(
									          							<View style={gstyles.width100} key={cat.category_id}><Text style={gstyles.productCatTitle}>{cat.category_name}</Text></View>
									          							);
									          						}
									          					})
									          				}
											          		</View>
											          		{this.renderQuantity(item.listing_id)}
									          			</View>
									          		</View>
									          		<View style={gstyles.productsMainRight}><Icon color="#000" name="angle-right" size={30} style={gstyles.productsMainRightIcon} /></View>
								          		</TouchableOpacity>
								          		<View style={gstyles.productBottomPart}>
								          			<View style={gstyles.checkboxView}>
													          	<CheckBox label=' '
													          			  onChange={()=>this.onCheckBoxPress(item.listing_id)} /> 
												    </View>
								          			<View style={gstyles.bestDealView}>
						          						<Text style={gstyles.discountDeal}>Best Deal</Text>
										          		<Text style={gstyles.bestDeal}>{item.best_deal_title} : {item.best_deal_price} {item.currency} </Text>
										          	</View>
								          		</View>
									            
								        	</View>
										);
									})
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
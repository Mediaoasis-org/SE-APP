import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput,
  Platform,
  Dimension,
TouchableOpacity,
TouchableHighlight,
Image,
FlatList,
ScrollView,
StyleSheet,
ListView,
ActivityIndicator
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {gstyles} from '../../GlobalStyles';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { SearchComponent } from '../../components/Search';
import {Constants} from '../../common';
import { DrawerActions } from 'react-navigation';
import CheckBox from 'react-native-checkbox';
// import { CategoryListComponent } from '../../components/CategoryList';
// import iconFont from 'react-native-vector-icons/Fonts/FontAwesome.ttf';
// const window= Dimensions.get('window');

export class Products extends Component {

    constructor(props){
    	super(props);
    	this.state = {
            qty:1,
            activeRow:'',
            search:'',
            fetchValues:[],
            isLoading:true,
            showLoadMore:false,
            selectedCheckboxId:[],
            fetching_Status: false,
            categories:[],
            // page:1,
      }
      this.page=1;
      this.fetchValues();
      this.categories_func();
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
	    alert(this.state.selectedCheckboxId)
	  }
    // componentWillReceiveProps(){
    // 	alert('work');
    // }
    categories_func(){
	
		return fetch('https://wffer.com/se/api/rest/listings/categories?oauth_consumer_key=mji82teif5e8aoloye09fqrq3sjpajkk&oauth_consumer_secret=aoxhigoa336wt5n26zid8k976v9pwipe&listingtype_id=2',{
			       
			        // headers:{
			        //   'Accept':'application/json',
			        //   'Content-Type':'application/json',
			        // },
			        method:'GET'
			      })
			      .then((response) => response.json())
			      .then((responseJson) => {
			    
			      	if(responseJson.status_code=='200'){
			      		 this.setState({
				          // isLoading: false,
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
    	
    	// this.setState({page:1});
    	// alert(this.state.page)
    	let category_id = this.props.navigation.state.params.cat_id;
    	// alert(category_id)
    	let categoryUrl;
    	if(category_id){
    		// catParam = "category_id"=category_id;
    		categoryUrl='https://wffer.com/se/api/rest/listings/index?oauth_consumer_key=mji82teif5e8aoloye09fqrq3sjpajkk&oauth_consumer_secret=aoxhigoa336wt5n26zid8k976v9pwipe&listingtype_id=2&category_id='+category_id + '&limit=20&page=' + this.page;
    	}
    	else
    	{
    		categoryUrl='https://wffer.com/se/api/rest/listings/index?oauth_consumer_key=mji82teif5e8aoloye09fqrq3sjpajkk&oauth_consumer_secret=aoxhigoa336wt5n26zid8k976v9pwipe&listingtype_id=2&limit=20&page=' + this.page;
    	}
    	return fetch(categoryUrl,{
			       
			        // headers:{
			        //   'Accept':'application/json',
			        //   'Content-Type':'application/json',
			        // },
			        method:'GET'
			      })
			      .then((response) => response.json())
			      .then((responseJson) => {
			    	let json_data = responseJson.body.response;
			    	const arr = Object.keys(json_data).map((key) => [key, json_data[key]]);
			    	// alert(arr)
			      	if(responseJson.status_code=='200'){
			      		 this.setState({
				          
				          fieldValues:responseJson.body.response,isLoading: false
				          // [...this.state.fieldValues,...responseJson.body.response]
				        });
			      		 
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
   //  removeCompleted = () => {
	  //   const {dispatch} = this.props
	  //   dispatch(actionCreators.removeCompleted())
	  // }

	decrease_qty(id,qty){
		// alert(qty)
		if(parseInt(qty)!=1){
		 qty=parseInt(qty)-1; 
		}
		this.setState({qty:qty});
	}
	 increase_qty(id,qty){
	   	// alert(id)
	   	
	   	qty=parseInt(qty)+1; 
	   	// alert(qty)
	   	this.setState({qty:qty});
	 }
	 changeCheckboxState(chek){
	 	this.setState({checked:!this.state.checked});
	 	
	 	alert(this.state.checked);
	
	 }
	 showLoadMore(){
	 	// alert(this.state.page);
	 	// let pageno = this.state.page+1;
	 	// // alert(page);
	 	// this.setState({page : pageno});
	 	this.page = this.page + 1;
	 	this.setState({ fetching_Status: true,showLoadMore:false });
	 	
	 	// alert(this.page);
	 	let category_id = this.props.navigation.state.params.cat_id;
    	let categoryUrl;
    	if(category_id){
    		// catParam = "category_id"=category_id;
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
			      		 let count = responseJson.body.response.length;
			      		 // alert(count);
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
	 }
	render(){
		// alert(JSON.stringify(this.state.categories));
		return(
				<View style={gstyles.container}>
					<View style={gstyles.headerMenu}>
								<TouchableOpacity onPress={() =>this.props.navigation.dispatch(DrawerActions.openDrawer())} style={gstyles.headerMenuButton}>
									<Icon name="bars" size={24} color="#fff" />
			                    </TouchableOpacity>
			                    <Text style={gstyles.headerProfileLabel}>{this.props.navigation.state.params.cat_name}</Text>
			                    <TouchableOpacity onPress={()=>this.props.navigation.navigate('MultipleWishlist')} style={gstyles.headerRightButton}><Icon name="cart-plus" size={24} color="#fff" /></TouchableOpacity>
					</View>
					<ScrollView>
						<SearchComponent />
						 	{ 
                              this.state.isLoading ?   <View style={styles.loading}><ActivityIndicator color='#00ff00' size="large"/></View> : null
                            }	
						<View style={{width:'100%',flexDirection:'row',backgroundColor:'#e9ebee'}}>

							<FlatList data={this.state.fieldValues} extraData={this.state.fieldValues}
		                		renderItem={({item}) =>      
					                    	<View style={styles.flatlist}>
					                    		<View style={{flexDirection:'row'}}>
									          		<View style={{width:'90%',flexDirection:'row'}}>
									          			<View style={{width:'17%',marginLeft:'3%',flexDirection:'column',padding:3}}>
									          				<TouchableOpacity onPress={()=>this.props.navigation.navigate('ProductDetails')}>
									          					<Image source={{uri:item.image}} style={styles.flatimage} />
									          				</TouchableOpacity>
									          			</View>
									          			<View style={{width:'77%',marginLeft:'3%',flexDirection:'column'}}>
									          				<View style={{width: '100%'}}><Text style={styles.title}>{item.title}</Text></View>
									          				<View>
									          				{
									          					this.state.categories.map((cat)=>{
									          						if(cat.category_id==item.category_id){
									          							return(
									          							<View style={{width: '100%'}} key={cat.category_id}><Text style={styles.catTitle}>{cat.category_name}</Text></View>
									          							);
									          						}
									          					})
									          				}
											          		</View>
											          		<View style={styles.qtyView}>   

											          			  <Text style={styles.qtyText}>{this.state.qty}</Text> 
				                                                  <TouchableHighlight 
				                                                     onPress={() => this.decrease_qty()}
				                                                     underlayColor='#BEBEBE' style={styles.qtybuttonDecrease}>
				                                                     <Image source={require('../../../assets/plus.png')} style={{width:30,height:30}}/>
				                                                  </TouchableHighlight>
				                                                  
				                                                  <TouchableHighlight 
				                                                     onPress={() => this.increase_qty()}
				                                                     underlayColor='#BEBEBE' style={styles.qtybuttonIncrease}>
				                                                    <Image source={require('../../../assets/minus.png')} style={{width:30,height:30}}/>
				                                                  </TouchableHighlight>
				                                            </View>
									          			</View>
									          		</View>
									          		<View style={{width:'10%'}}><Icon color="#000" name="angle-right" size={30} style={{paddingTop:'100%',marginLeft:'5%',fontWeight:'bold'}} /></View>
								          		</View>
								          		<View style={{width:'100%',flexDirection:'row',borderTopColor:'gray',borderTopWidth:1,paddingTop:5}}>
								          			<View style={{width:'60%',padding:10}}>
													          	<CheckBox label=' '
													          			  onChange={()=>this.onCheckBoxPress(item.listing_id)} /> 
												    </View>
								          			<View style={{width:'40%',padding:3}}>
						          						<Text style={styles.discountDeal}>Best Deal</Text>
										          		<Text style={styles.subtitle}>Brand : Price</Text>
										          	</View>
								          		</View>
									            
								        	</View>
					                    }
					                keyExtractor={(item, index) => index.toString()}
					            />
					            
						</View>
				
						{
							this.state.showLoadMore==true ? <View><TouchableHighlight style={gstyles.buttonView} onPress={()=>this.showLoadMore()}><Text style={gstyles.buttonText}>Load More</Text></TouchableHighlight></View>: null
						}
						{
							this.state.fetching_Status==true ? <View style={{padding:10,width:'100%',position:'absolute', bottom:0,backgroundColor:'#fff'}}><ActivityIndicator color='#00ff00' size="large"/> </View>:null
						}
				
					</ScrollView>
				</View>
			);
	}
}

const styles  = StyleSheet.create({
	  flatlist:{backgroundColor: '#fff',  borderColor:'gray',borderWidth:1,margin:5},
	  flatimage:{marginTop:'15%', marginBottom:'10%', width: '100%', height: 80},
	  title:{fontSize: 18, marginTop: '5%',color:'#000',fontWeight:'bold'},
	  catTitle:{fontSize: 16, marginTop: '2%',color:'#000'},
	  subtitle:{color: '#000', marginTop: '3%', fontSize: 18,textAlign:'center'},
	  discountDeal:{color: '#ff0000', fontSize: 18,textAlign:'center',fontStyle:'italic'},
	  qtyView:{flexDirection: 'row',padding:10,marginLeft:'40%'},
	  qtybuttonDecrease:{margin:5},
	  // borderWidth:1,borderColor:'#adadad',borderRadius:50,
	  qtybuttonIncrease:{margin:5},
	  // borderWidth:1,borderColor:'#adadad',borderRadius:50,
	  qtyText:{backgroundColor:'#e9ebee',textAlign:'center',fontSize: 14, color: '#000', margin:5,paddingTop:8,paddingBottom:8,paddingLeft:15,paddingRight:15,borderColor:'#adadad',borderWidth:1},
	  subTotal:{fontSize: 18,flexDirection:'column',width:'50%',color:'rgb(113,113,113)',paddingLeft:12},
	  subTotalAmount:{fontSize: 18,flexDirection:'column',width:'50%',textAlign:'right',color:'rgb(113,113,113)',fontWeight:'bold',paddingRight:10},
	  itemTotal:{fontSize: 18,flexDirection:'column',width:'50%',color:'#000'},
	  itemTotalRight:{fontSize: 18,flexDirection:'column',width:'50%',textAlign:'right',color:'#000'},
	  itemTotalRightIcon:{fontSize: 18,flexDirection:'column',width:'50%',textAlign:'right'},
	  orderTotalAmount:{fontSize: 18,flexDirection:'column',width:'50%',textAlign:'right',color:'#000',fontWeight:'bold'}
})


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
import React, { Component } from 'react';

// import { withNavigation } from 'react-navigation';
import {
  Text,
  TextInput,
  View,
  Dimension,
  TouchableOpacity,
  TouchableHighlight,
  Image,
  FlatList,
  ScrollView,
  AsyncStorage,
  ActivityIndicator,
  Platform,
  StyleSheet,Modal
} from 'react-native';
import {gstyles} from '../../GlobalStyles';
import {Constants} from '../../common';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { DrawerActions } from 'react-navigation';
import CheckBox from 'react-native-checkbox';
import { SearchComponent } from '../../components/Search';
// import iconFont from 'react-native-vector-icons/Fonts/FontAwesome.ttf';
// const window= Dimensions.get('window');

export class WishlistComponent extends Component {
	constructor(props){
		super(props);
		this.state={
			name:'',
			note:'',
			checked: false,
			userData:[],
			data:[],
			oauthToken:'',
			oauthSecret:'',
			isLoading:true,
			categories:[],
			LoggedIn:null,
			selectedCheckboxId:[],
			modalVisible: false,
		}

		// alert(JSON.stringify(this.props.navigation))
		// alert(this.props.navigation.state.params.wishlist_id)
		this._getStorageValue();
		// alert(this.state.modalVisible)
		this.categories_func();
	}
	
	async _getStorageValue(){
		const userData = await AsyncStorage.getItem('userData');
		// alert(userData);
		if(userData.length>0){
			this.setState({LoggedIn:true})
		     this.setState({userData:JSON.parse(userData)});
		     this.setState({oauthToken:this.state.userData.oauth_token});
		     this.setState({oauthSecret:this.state.userData.oauth_secret});
		     this.fetchValues();
		}
		else
	    {
	        this.setState({LoggedIn:false})
	    }    	
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
	    // console.log(this.state.selectedCheckboxId)
	}

	categories_func(){
	
	 fetch('https://wffer.com/se/api/rest/listings/categories?oauth_consumer_key=mji82teif5e8aoloye09fqrq3sjpajkk&oauth_consumer_secret=aoxhigoa336wt5n26zid8k976v9pwipe&listingtype_id=2',{
			       
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
		let wishlist_id = this.props.navigation.state.params.wishlist_id;
		// console.log(product_ids)
		return fetch('https://wffer.com/se/api/rest/listings/wishlist/'+wishlist_id+'?oauth_consumer_key=mji82teif5e8aoloye09fqrq3sjpajkk&oauth_consumer_secret=aoxhigoa336wt5n26zid8k976v9pwipe&oauth_token='+ this.state.oauthToken + '&oauth_secret=' +this.state.oauthSecret+'&listingtype_id=1',{
			        method:'GET'
	      })
	      .then((response) => response.json())
	      .then((responseJson) => {
	      	if(responseJson.status_code=='200'){
	      		 this.setState({
			          data: responseJson.body.response,
			          isLoading: false,
	          
	        },function(){
	        	// console.log(JSON.stringify(this.state.data))
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

	deleteWishlistItems(){
		let wish_id = this.props.navigation.state.params.wishlist_id;
				this.state.selectedCheckboxId.map((items)=>{
		// alert(this.state.selectedCheckboxId);
					var formData = new FormData;
		    		formData.append('wishlist_id',wish_id);
		    		formData.append('listing_id',items);
		    		// console.log(formData);
		    		// console.log('https://wffer.com/se/api/rest/listings/wishlist/add?oauth_consumer_key=mji82teif5e8aoloye09fqrq3sjpajkk&oauth_consumer_secret=aoxhigoa336wt5n26zid8k976v9pwipe&oauth_token='+ this.state.oauthToken + '&oauth_secret=' +this.state.oauthSecret+'&listingtype_id=1&listing_id='+item);
					return fetch('https://wffer.com/se/api/rest/listings/wishlist/remove?oauth_consumer_key=mji82teif5e8aoloye09fqrq3sjpajkk&oauth_consumer_secret=aoxhigoa336wt5n26zid8k976v9pwipe&oauth_token='+ this.state.oauthToken + '&oauth_secret=' +this.state.oauthSecret+'&listingtype_id=1',{
						body: formData,
						headers:{
				          'Accept':'application/json',
				          // 'Content-Type': 'multipart/form-data'
				        },
				        method:'POST'
				      })
				      .then((response) => response.json())
				      .then((responseJson) => {
				      	if(responseJson.status_code=='204'){
				      		 this.setState({
				          // data: responseJson.body.form,
				          isLoading: false,
				        },function(){
				        	
				        });
				      	}
				      	else
				      	{
				      		// this.setState({Message:responseJson.Message});
				      	}
				      	// alert(this.state.responseJson.Message)
				      })
				      .catch((error) =>{
				        console.error(error);
				      });
				})
				this.props.navigation.push('Wishlists',{wishlist_id:wish_id})
	}

	Capitalize(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
    }

    setModalVisible(visible) {
   		 this.setState({modalVisible: visible});
  	}

    handleNavigation(){ 		
            this.setModalVisible(true);
    }
    handleCreateWishlist(){
    	this.setModalVisible(false);
    	this.props.navigation.push('CreateWishlist')
    }
    handleEditWishlist(){
    	let wish_id = this.props.navigation.state.params.wishlist_id;
    	this.setModalVisible(false);
    	this.props.navigation.push('EditWishlist',{wishlist_id:wish_id})
    }
	render(){
		// const navigation = this.props.navigation;
	if(this.state.LoggedIn==false){
    return(
      <View style={gstyles.container}>
          <View style={gstyles.headerMenu}>
                <TouchableOpacity onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())} style={gstyles.headerMenuButton}>
                  <Text><Icon name="bars" size={24} color="#fff" /></Text>
                </TouchableOpacity>
                <Text style={gstyles.headerProfileLabel}>WishList</Text>
          </View>
          <Text style={{padding:10,fontSize:18,margin:10,textAlign:'center'}}>To get Lists ,Please Sign In</Text>
          <TouchableOpacity style={gstyles.createAccountView} onPress={()=>this.props.navigation.navigate('Login')}>
              <Text style={gstyles.createAccountText}>Sign In</Text>
          </TouchableOpacity>
      </View>
        )
    }
    else
    {

		return(
				<View style={gstyles.container}>
					<View style={gstyles.headerMenu}>
								<TouchableOpacity onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())} style={gstyles.headerMenuButton}>
									<Icon name="bars" size={24} color="#fff" />
			                    </TouchableOpacity>
			                   
			                    <TouchableOpacity onPress={() => this.handleNavigation()} style={gstyles.headerRightButton}>
									<Icon name="ellipsis-v" size={26} color="#fff" />
			                    </TouchableOpacity>
			                    
					</View>
					<ScrollView style={{marginBottom:30}}>
						<SearchComponent/>
						{
							this.state.isLoading ? <View style={gstyles.loading}><ActivityIndicator color='#00ff00' size="large"/></View> : 
						<View>
						<View style={{width:'100%',flexDirection:'row'}}> 
								<TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{padding:10,width:'10%',flexDirection:'column'}}>
									<Icon name="angle-left" size={24} color="#000" />
			                    </TouchableOpacity>
			                    <Text style={{padding:10,fontSize:20,width:'90%',flexDirection:'column',color:'#000'}}>{this.state.data.title}</Text>
			            </View>
						
						<View style={{width:'100%',flexDirection:'row',backgroundColor:'#e9ebee'}}>

							<FlatList data={this.state.data.listing} 

		                		renderItem={({item}) =>      
					                    	<View style={styles.flatlist}>
					                    		<View style={{flexDirection:'row',marginBottom:10}}>
									          		<View style={{width:'90%',flexDirection:'row'}}>
									          			<View style={{width:'17%',marginLeft:'3%',flexDirection:'column',padding:3}}>
									          				<TouchableOpacity onPress={()=>{this.props.navigation.push('ProductDetails',{product_id:item.listing_id})}}>
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
											          		<Text style={styles.subtitle}>Qty : {item.quantity}</Text>
											          		<Text style={styles.subtitle}>{item.body}</Text>
									          			</View>
									          		</View>
									          		<View style={{width:'10%',marginTop:'10%'}}>
									          				<CheckBox style={{paddingTop:'100%',marginLeft:'5%'}} label=' '
													          			  onChange={()=>this.onCheckBoxPress(item.listing_id)} /> 
									          		</View>
								          		</View>									            
								        	</View>
					                    }
					                keyExtractor={(item, index) => index.toString()}
					            />
						</View>
							</View>
							}
						<Modal
				          animationType="slide"
				          transparent={true}
				          visible={this.state.modalVisible}
				          onRequestClose={() => {
				            alert('Modal has been closed.');
				            this.setModalVisible(!this.state.modalVisible);
				          }}>
				          <View style={{flex: 1,flexDirection: 'column', justifyContent: 'center',alignItems: 'center'}}>
				            <View style={{backgroundColor:'#fff', width: 300}}>
				              <TouchableOpacity style={gstyles.modalMenu}><Text style={gstyles.modalMenuText} onPress={()=>this.handleCreateWishlist()}>Create New Wishlist</Text></TouchableOpacity>
				              <TouchableOpacity style={gstyles.modalMenu}><Text style={gstyles.modalMenuText} onPress={()=>this.handleEditWishlist()}>Edit</Text></TouchableOpacity>
				              <TouchableOpacity style={gstyles.modalMenu}><Text style={gstyles.modalMenuText}>Delete</Text></TouchableOpacity>
				              <TouchableOpacity style={gstyles.modalMenu}><Text style={gstyles.modalMenuText}>Report</Text></TouchableOpacity>
				              <TouchableOpacity style={gstyles.modalMenu}><Text style={gstyles.modalMenuText}>Tell A Friend</Text></TouchableOpacity>
				              <TouchableHighlight
				                onPress={() => {
				                  this.setModalVisible(!this.state.modalVisible);
				                }} style={gstyles.modalMenu}>
				                <Text style={gstyles.modalMenuText}>Cancel</Text>
				              </TouchableHighlight>
				            </View>
				          </View>
				        </Modal>	
							
					</ScrollView>
					<View style={gstyles.buttonViewFixed}>
							<TouchableOpacity onPress={()=>alert('share')} style={[gstyles.getPriceButton,{borderRightWidth:1,borderRightColor:'#bfbfbf'}]}><Text style={gstyles.buttonTextFixed}>Share</Text></TouchableOpacity>
							<TouchableOpacity onPress={()=>this.props.navigation.navigate('GetPrice')} style={gstyles.getPriceButton}><Text style={gstyles.buttonTextFixed}>Get Price</Text></TouchableOpacity>
							
					</View>
					{
						(this.state.selectedCheckboxId!='')?
							<TouchableHighlight style={styles.delete} onPress={()=> this.deleteWishlistItems()}><Icon name="trash" color="#fff" size={30} style={{padding:10}}/></TouchableHighlight>
						:
						null
					}
					
				</View>
			);
		}
	}
}

const styles  = StyleSheet.create({
	  flatlist:{backgroundColor: '#fff',  borderColor:'gray',borderWidth:1,margin:5},
	  flatimage:{marginTop:'15%', marginBottom:'10%', width: '100%', height: 80},
	  title:{fontSize: 18, marginTop: '5%',color:'#000',fontWeight:'bold'},
	  catTitle:{fontSize: 16, marginTop: '2%',color:'#000'},
	  subtitle:{color: '#000', marginTop: '3%', fontSize: 18,textAlign:'left'},
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
	  orderTotalAmount:{fontSize: 18,flexDirection:'column',width:'50%',textAlign:'right',color:'#000',fontWeight:'bold'},
	  delete:{
		...Platform.select({
			ios:{
				position:'absolute',
				bottom:25,
				zIndex:1000,
				right:7,
				width:45,
				height:45,
				borderRadius:50,
				backgroundColor:'#c74b4b'
			},
			android:{
				position:'absolute',
				bottom:25,
				zIndex:1000,
				right:7,
				width:45,
				height:45,
				borderRadius:50,
				backgroundColor:'#c74b4b'
			},
		  })
		},
})


// <FlatList data={this.state.data.listing}
// 		                		renderItem={({item}) =>      
// 					                    	<View style={styles.flatlist}>
// 								          		<View style={{flexDirection: 'column',width:'30%'}}>
// 								          			<View style={{width: '90%'}}>
// 								          				<TouchableOpacity  onPress={()=>this.props.navigation.navigate('ProductDetails')}>
// 								          					<Image source={{uri : item.image}} style={styles.flatimage} />
// 								          				</TouchableOpacity>
// 								          			</View>
// 								          		 </View>
// 									            <View style={{flexDirection: 'column',width:'70%'}}>
// 										          		<View style={{width: '80%'}}><Text style={styles.title}>{item.title}</Text></View>
// 										          		<Text style={styles.subtitle}>{item.category_id}</Text>
// 										          		<View style={{flexDirection:'row'}}>
// 											          		<View style={{flexDirection:'column',width:'80%'}}>
// 											          			<Text style={[styles.subtitle]}>Qty : {item.quantity}</Text>
// 											          			<Text style={styles.subtitle}>{item.body}</Text>
// 											          		</View>
// 											          		<View style={{margin:10,flexDirection:'column',width:'20%'}}>
// 												          		<CheckBox
// 																  label=' '
// 																  labelStyle={{color:'#000',fontSize:16}}
// 																  onClick={() => this.setState({checked: !checked})}
// 																  style={{color:'#ff0000',backgroundColor:'#00ff00',right:10}}
// 																/>	
// 											          		</View>	
// 											          	</View>				               
// 								          		</View>
// 								        	</View>
// 					                    }
// 					                keyExtractor={(item, index) => index.toString()}
// 					              />
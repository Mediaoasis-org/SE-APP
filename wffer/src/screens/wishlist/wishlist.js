import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  Image,
  FlatList,
  ScrollView,
  AsyncStorage,
  ActivityIndicator,
  Modal,
  Share
} from 'react-native';
import {gstyles} from '../../GlobalStyles';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
// import { DrawerActions } from 'react-navigation';
import CheckBox from 'react-native-checkbox';
import { SearchComponent } from '../../components/Search';
// import iconFont from 'react-native-vector-icons/Fonts/FontAwesome.ttf';

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
			languagesData:[],
          	language : '',
		}

		// alert(JSON.stringify(this.props.navigation))
		// alert(this.props.navigation.state.params.wishlist_id)
		this._getStorageValue();
		// alert(this.state.modalVisible)
		this.categories_func();
	}
	
	async _getStorageValue(){
		var languageData = await AsyncStorage.getItem('languageData');
        const Datalang = JSON.parse(languageData);
        const lang = await AsyncStorage.getItem('languageinfo');
        this.setState({language:lang})
        // alert(this.state.language);
        this.setState({languagesData : Datalang[lang]})
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
    handleDeleteWishlist(){
    	let wish_id = this.props.navigation.state.params.wishlist_id;
    	 fetch('https://wffer.com/se/api/rest/listings/wishlist/delete/'+wish_id+'?oauth_consumer_key=mji82teif5e8aoloye09fqrq3sjpajkk&oauth_consumer_secret=aoxhigoa336wt5n26zid8k976v9pwipe&oauth_token='+ this.state.oauthToken + '&oauth_secret=' +this.state.oauthSecret+'&listingtype_id=2',{
			method:'DELETE',
			headers:{
				          'Accept':'application/json',
				          // 'Content-Type': 'multipart/form-data'
				        },
	      })
	      .then((response) => response.json())
	      .then((responseJson) => {
	      	// alert(JSON.stringify(responseJson));
	      	if(responseJson.status_code=='204'){
	      		this.setModalVisible(false);
	  		  this.props.navigation.push('ShoppingList');
	      	}
	      	else
	      	{
	      		this.setState({Message:responseJson.Message});
	      		alert(this.state.Message)
	      	}
	      })
	      .catch((error) =>{
	        console.error(error);
	      });
    	
    }

    handleTellFriend(){
    	let wish_id = this.props.navigation.state.params.wishlist_id;
    	this.setModalVisible(false);
    	this.props.navigation.push('TellFriend',{wishlist_id:wish_id});
    }
    handleReport(){
    	let wish_id = this.props.navigation.state.params.wishlist_id;
    	this.setModalVisible(false);
    	this.props.navigation.push('Report',{wishlist_id:wish_id});
    }

	render(){
		// const navigation = this.props.navigation;
	if(this.state.LoggedIn==false){
    return(
      <View style={gstyles.container}>
          <View style={gstyles.headerMenu}>
                <TouchableOpacity onPress={() => this.props.navigation.openDrawer()} style={gstyles.headerMenuButton}>
                  <Text><Icon name="bars" size={24} color="#fff" /></Text>
                </TouchableOpacity>

                <Text style={gstyles.headerProfileLabel}>{this.state.languagesData.SHOPPING_LIST_HeaderTitle}</Text>
                <Text style={gstyles.headerRightButton}></Text>
          </View>
          <Text style={gstyles.signInButton}>{this.state.languagesData.WISHLSIT_SIGNIN_DefaultText}</Text>
          <TouchableOpacity style={gstyles.createAccountView} onPress={()=>this.props.navigation.navigate('Login')}>
              <Text style={gstyles.createAccountText}>{this.state.languagesData.LOGIN_HeaderTitle}</Text>
          </TouchableOpacity>
      </View>
        )
    }
    else
    {

		return(
				<View style={gstyles.container}>
					<View style={gstyles.headerMenu}>
								<TouchableOpacity onPress={() => this.props.navigation.goBack()} style={gstyles.headerMenuButton}>
									<Icon name="angle-left" size={24} color="#fff" />
			                    </TouchableOpacity>
			                   	<Text style={gstyles.headerProfileLabel}>{this.state.data.title}</Text>
			                    <TouchableOpacity onPress={() => this.handleNavigation()} style={gstyles.headerRightButton}>
									<Icon name="ellipsis-h" size={30} color="#fff" />
			                    </TouchableOpacity>
			                    
					</View>
					<ScrollView>
						
						{
							this.state.isLoading ? <View style={gstyles.loading}><ActivityIndicator color='#333' size="large" style={{height:100,width:'30%'}}/></View> : 
						<View>
						

						
						<View style={gstyles.specialOfferViewHome}>

							<FlatList data={this.state.data.listing} extraData={this.state}

		                		renderItem={({item}) =>      
			                    	<TouchableOpacity style={gstyles.wishlistBox} onPress={()=>{this.props.navigation.push('ProductDetails',{product_id:item.listing_id})}}>
			                    		
						          		<View style={gstyles.wishlistBoxLeft}>
						          			
					          				<TouchableOpacity style={gstyles.wishlistInnerLeft}>
					          					<Image source={{uri:item.image_profile}} style={gstyles.wishlistInnerLeftImage} />
					          				</TouchableOpacity>
						          			
						          			<View style={gstyles.wishlistInnerRight}>
						          				<View style={gstyles.width100}><Text style={[gstyles.wishlistInnerTitle,gstyles.textLeft]}>{item.title}</Text></View>
						          				<View>
						          				{
						          					this.state.categories.map((cat)=>{
						          						if(cat.category_id==item.category_id){
						          							return(
						          							<View style={gstyles.width100} key={cat.category_id}><Text style={[gstyles.catTitle,gstyles.textLeft]}>{cat.category_name}</Text></View>
						          							);
						          						}
						          					})
						          				}
								          		</View>
								          		<Text style={[gstyles.subtitle,gstyles.textLeft]}>Qty : {item.quantity}</Text>
								          		<Text style={[gstyles.subtitle,gstyles.textLeft]}>{item.body}</Text>
						          			</View>
						          		</View>
						          		<View style={gstyles.wishlistBoxRight}>
						          				<CheckBox style={gstyles.wishlistCheckBox} label=' '
										          			  onChange={()=>this.onCheckBoxPress(item.listing_id)} /> 
						          		</View>
						          									            
						        	</TouchableOpacity>
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
				          <View style={gstyles.wishlistModalContainer}>
				            <View style={gstyles.wishlistModalContainerBox}>
				              <TouchableOpacity style={gstyles.modalMenu} onPress={()=>{this.setModalVisible(false);this.props.navigation.push('Products', {cat_name:'All Categories'})}}><Text style={[gstyles.modalMenuText,gstyles.textLeft]}>{this.state.languagesData.WISHLIST_LIST_ModalAddProduct}</Text></TouchableOpacity>
				              <TouchableOpacity style={gstyles.modalMenu} onPress={()=>this.handleEditWishlist()}><Text style={[gstyles.modalMenuText,gstyles.textLeft]}>{this.state.languagesData.WISHLIST_LIST_ModalEditWishlist}</Text></TouchableOpacity>
				              <TouchableOpacity style={gstyles.modalMenu} onPress={()=>this.handleDeleteWishlist()}><Text style={[gstyles.modalMenuText,gstyles.textLeft]}>{this.state.languagesData.WISHLIST_LIST_ModalDeleteWishlist}</Text></TouchableOpacity>
				              
				              <TouchableHighlight
				                onPress={() => {
				                  this.setModalVisible(!this.state.modalVisible);
				                }} style={gstyles.modalMenu}>
				                <Text style={[gstyles.modalMenuText,gstyles.textLeft]}>{this.state.languagesData.WISHLIST_LIST_ModalCancel}</Text>
				              </TouchableHighlight>
				            </View>
				          </View>
				        </Modal>	
							
					</ScrollView>
					<View style={gstyles.buttonViewFixed}>
							<TouchableOpacity onPress={()=>Share.share({
	url: 'https://wffer.com/se/wishlist/'+ this.props.navigation.state.params.wishlist_id,
    message: this.state.languagesData.WISHLIST_LIST_ShareMessageText + ' https://wffer.com/se/wishlist/' + this.props.navigation.state.params.wishlist_id ,
    title: this.state.languagesData.WISHLIST_LIST_ShareTitleText + this.state.data.title,
  }, {
    // Android only:
    dialogTitle: 'Share',
    // iOS only:
    excludedActivityTypes: [
      'com.apple.UIKit.activity.PostToTwitter'
    ]
  })} style={[gstyles.getPriceButton,{borderRightWidth:1,borderRightColor:'#bfbfbf'}]}><Text style={gstyles.buttonTextFixed}>{this.state.languagesData.WISHLIST_LIST_ShareText}</Text></TouchableOpacity>
							<TouchableOpacity onPress={()=>{this.props.navigation.push('GetPrice',{wishlist_id:this.props.navigation.state.params.wishlist_id})}} style={gstyles.getPriceButton}><Text style={gstyles.buttonTextFixed}>{this.state.languagesData.WISHLIST_LIST_GetPriceText}</Text></TouchableOpacity>
							
					</View>
					{
						(this.state.selectedCheckboxId!='')?
							<TouchableHighlight style={gstyles.deleteButton} onPress={()=> this.deleteWishlistItems()}><Icon name="trash" color="#fff" size={30} style={{padding:10}}/></TouchableHighlight>
						:
						null
					}
					
				</View>
			);
		}
	}
}
						// <View style={gstyles.specialOfferViewHome}> 
						// 		<TouchableOpacity onPress={() => this.props.navigation.goBack()} style={gstyles.wishlistBackButton}>
						// 			<Icon name="angle-left" size={30} color="#000" />
			   //                  </TouchableOpacity>
			                    
			   //          </View>
// <TouchableOpacity style={gstyles.modalMenu} onPress={()=>this.handleCreateWishlist()}><Text style={gstyles.modalMenuText}>Create New Wishlist</Text></TouchableOpacity>
// <TouchableOpacity style={gstyles.modalMenu} onPress={()=>this.handleReport()}><Text style={gstyles.modalMenuText}>Report</Text></TouchableOpacity>
// <TouchableOpacity style={gstyles.modalMenu} onPress={()=>this.handleTellFriend()}><Text style={gstyles.modalMenuText}>Tell A Friend</Text></TouchableOpacity>
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
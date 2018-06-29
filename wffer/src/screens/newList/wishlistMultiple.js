import React, { Component } from 'react';
// import { withNavigation } from 'react-navigation';
import {
  Text,
  TextInput,
  View,
  Dimension,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
  AsyncStorage,
  StyleSheet,
  ActivityIndicator
} from 'react-native';
import {gstyles} from '../../GlobalStyles';
import {Constants} from '../../common';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { DrawerActions } from 'react-navigation';
import CheckBox from 'react-native-checkbox';
// import iconFont from 'react-native-vector-icons/Fonts/FontAwesome.ttf';
// const window= Dimensions.get('window');

export class MultipleWishlistComponent extends Component {
	constructor(props){
		super(props);
		this.state={
			name:'',
			note:'',
			checked: false,
			isLoading:true,
			selectedCheckboxId:[],
			userData:[],
			data:[],
			oauthToken:'',
			oauthSecret:'',
			LoggedIn:null
		}
		this._getStorageValue();
	}

	async _getStorageValue(){
		// alert(this.props.navigation.state.params.product_ids)

		 var userData = await AsyncStorage.getItem('userData');
		 // alert(userData)
		 if(userData.length>0){
            this.setState({LoggedIn:true});
            this.setState({userData:JSON.parse(userData)});
            this.setState({oauthToken:this.state.userData.oauth_token});
            this.setState({oauthSecret:this.state.userData.oauth_secret});
            this.fetchFields();
          }
          else
          {
            this.setState({LoggedIn:false})
          } 
	     // this.setState({userData:JSON.parse(userData)});
	     // this.setState({oauthToken:this.state.userData.oauth_token});
	     // this.setState({oauthSecret:this.state.userData.oauth_secret});
	     // this.fetchFields();
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
	fetchFields(){
		let product_ids = this.props.navigation.state.params.product_ids;
		// console.log(product_ids)
		// product_ids = product_ids.toString();
		// var res = product_ids.split(',').map(x=>{return parseInt(x)});
		// console.log(res);
		 return fetch('https://wffer.com/se/api/rest/listings/wishlist/add?oauth_consumer_key=mji82teif5e8aoloye09fqrq3sjpajkk&oauth_consumer_secret=aoxhigoa336wt5n26zid8k976v9pwipe&oauth_token='+ this.state.oauthToken + '&oauth_secret=' +this.state.oauthSecret+'&listing_id='+product_ids,{
			        method:'GET'
	      })
	      .then((response) => response.json())
	      .then((responseJson) => {
	      	if(responseJson.status_code=='200'){
	      		 this.setState({
	          data: responseJson.body.form,
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
	SaveWishlist(){
		let product_ids = this.props.navigation.state.params.product_ids;
		// console.log(this.state.selectedCheckboxId);
		// console.log('ids');
		// console.log(this.props.navigation.state.params.product_ids);
		product_ids.map((item)=>{
			this.state.selectedCheckboxId.map((items)=>{
				// console.log(item);
				// console.log(items);
					var formData = new FormData;
		    		formData.append(items,1);
		    		// console.log(formData);
		    		// console.log('https://wffer.com/se/api/rest/listings/wishlist/add?oauth_consumer_key=mji82teif5e8aoloye09fqrq3sjpajkk&oauth_consumer_secret=aoxhigoa336wt5n26zid8k976v9pwipe&oauth_token='+ this.state.oauthToken + '&oauth_secret=' +this.state.oauthSecret+'&listingtype_id=1&listing_id='+item);
					return fetch('https://wffer.com/se/api/rest/listings/wishlist/add?oauth_consumer_key=mji82teif5e8aoloye09fqrq3sjpajkk&oauth_consumer_secret=aoxhigoa336wt5n26zid8k976v9pwipe&oauth_token='+ this.state.oauthToken + '&oauth_secret=' +this.state.oauthSecret+'&listingtype_id=1&listing_id='+item,{
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
				      })
				      .catch((error) =>{
				        console.error(error);
				      });
			})				  
		})
		this.props.navigation.push('ShoppingList');

	}

	Capitalize(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
    }

	render(){
		// alert(JSON.stringify(this.state.data))
		// const navigation = this.props.navigation;
		if(this.state.LoggedIn!=true){
        return(
          <View style={gstyles.container}>
              <View style={gstyles.headerMenu}>
                    <TouchableOpacity onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())} style={gstyles.headerMenuButton}>
                      <Text><Icon name="bars" size={24} color="#fff" /></Text>
                    </TouchableOpacity>
                    <Text style={gstyles.headerProfileLabel}>WishList</Text>
              </View>
              <Text style={{padding:10,fontSize:18,margin:10,textAlign:'center'}}>To Add Products to Wishlist ,Please Sign In</Text>
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
					</View>
					{ 
                              this.state.isLoading ? <View style={gstyles.loading}><ActivityIndicator color='#00ff00' size="large"/></View>  :
                              <View>
									<View style={{width:'100%',alignItems:'center'}}><Text style={{padding:10,fontSize:20}}>Add to Shopping List</Text></View>
								 	<View style={styles.flatlist}>
						          		
						          			{
						          				this.state.data.map((item,index)=>{
						          					if(item.type==='Checkbox'){
							          					return(
							          					<View style={{width:'100%',flexDirection:'row',borderTopColor:'gray',borderTopWidth:1,paddingTop:5}} key={index}>
							          						<CheckBox label={item.label}
														        onChange={()=>this.onCheckBoxPress(item.name)} /> 
														</View>   
							          					);
						          					}
						          				})
						          			}
						          		<TouchableOpacity onPress={()=>this.SaveWishlist()} style={gstyles.buttonView}><Text style={gstyles.buttonText}>Save</Text></TouchableOpacity>
						        	</View>
						      </View>
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

/// <Text style={{padding:10,fontSize:16}}>Please select the wishlists in which you want to add products.</Text>
// 						<View style={{padding:10}}>
// 							<CheckBox
// 							  label='first List'
// 							  labelStyle={{color:'#000',fontSize:16}}
// 							  onClick={() => this.setState({checked: !checked})}
// 							  style={{color:'#ff0000',backgroundColor:'#00ff00'}}
// 							/>	
// 						</View>
// 						<View style={{padding:10}}>
// 							<CheckBox
// 							  label='Second List'
// 							  labelStyle={{color:'#000',fontSize:16}}
// 							  onClick={() => this.setState({checked: !checked})}
// 							  style={{color:'#ff0000',backgroundColor:'#00ff00'}}
// 							/>	
// 						</View>
// 						<TouchableOpacity onPress={()=>this.props.navigation.navigate('Wishlists')} style={{margin:10,padding:10,backgroundColor:'#696969',alignItems:'center'}}><Text style={{color:'#fff',fontSize:16,fontWeight:'bold'}}>Save</Text></TouchableOpacity>
// 							<View style={{width:'100%'}}><Text style={{textAlign:'center'}}>OR</Text></View>
// 							<TouchableOpacity onPress={()=>this.props.navigation.goBack()} style={{margin:10,padding:10,borderColor:'#696969',borderWidth:1,alignItems:'center'}}><Text style={{color:'#000',fontSize:16,fontWeight:'bold'}}>Cancel</Text></TouchableOpacity>
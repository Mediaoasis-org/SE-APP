import React, { Component } from 'react';
// import { withNavigation } from 'react-navigation';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  AsyncStorage,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import {gstyles} from '../../GlobalStyles';
// import {Constants} from '../../common';
import { SearchComponent } from '../../components/Search';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
// import { DrawerActions } from 'react-navigation';
// import Accordion from 'react-native-collapsible/Accordion';
// import iconFont from 'react-native-vector-icons/Fonts/FontAwesome.ttf';
// const window= Dimensions.get('window');

// const SECTIONS = [
//   {
//     title: 'My Shopping List',
//     listname:'qwerty',
//   },
//   {
//     title: 'Recommended List',
//      listname:''
//   },
  
// ];

export class ShoppingListComponent extends Component {
	constructor(props){
		super(props);
		this.state={
      oauthToken:'',
      oauthSecret:'',
      mysection:false,
      recommendedsection:false,
      activeSection: false,
      collapsed: true,
       search :'',
       fieldValues:[],
       totalItems:'',
       LoggedIn:null,
       isLoading:true,
       userData:[],
       recommendedFieldValues:[],
       totalRecommendedItems:''
		}
    this.getStorageValues()
    
		// alert(JSON.stringify(this.props.navigation))
	}
	async getStorageValues(){
         const userData = await AsyncStorage.getItem('userData');
         // alert(userData.length);
          if(userData!=null){
            this.setState({LoggedIn:true});
            this.setState({userData:JSON.parse(userData)});
            this.setState({oauthToken:this.state.userData.oauth_token});
            this.setState({oauthSecret:this.state.userData.oauth_secret});
            this.fetchValues();
            this.fetchRecommendedList();
          }
          else
          {
            this.setState({LoggedIn:false})
          }         
   }

	 // _renderSectionTitle(section) {
  //   return (
  //     <View style={styles.title}>
  //       <Text>{section.title}</Text>
  //     </View>
  //   );
  // }
  fetchValues(){
      return fetch('https://wffer.com/se/api/rest/listings/wishlist?oauth_consumer_key=mji82teif5e8aoloye09fqrq3sjpajkk&oauth_consumer_secret=aoxhigoa336wt5n26zid8k976v9pwipe&oauth_token='+ this.state.oauthToken + '&oauth_secret=' +this.state.oauthSecret + '&search_wishlist=my_wishlists',{
              method:'GET'
            })
            .then((response) => response.json())
            .then((responseJson) => {
              if(responseJson.status_code=='200'){
                // alert(JSON.stringify(responseJson.body));
                 this.setState({
                  fieldValues:responseJson.body.response,
                  totalItems: responseJson.body.totalItemCount,
                  isLoading:false,
                });
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
  fetchRecommendedList(){
      return fetch('https://wffer.com/se/api/rest/listings/wishlist/browse?oauth_consumer_key=mji82teif5e8aoloye09fqrq3sjpajkk&oauth_consumer_secret=aoxhigoa336wt5n26zid8k976v9pwipe&oauth_token='+ this.state.oauthToken + '&oauth_secret=' +this.state.oauthSecret + '&search=&search_wishlist=my_wishlists&text=&orderby=wishlist_id&done=&viewType=grid&recommended=1',{
              method:'GET'
            })
            .then((response) => response.json())
            .then((responseJson) => {
              if(responseJson.status_code=='200'){
                // alert(JSON.stringify(responseJson.body));
                 this.setState({
                  recommendedFieldValues:responseJson.body.response,
                  totalRecommendedItems: responseJson.body.totalItemCount,
                  isLoading:false,
                });
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
  handleNavigation(id){
    this.props.navigation.push('Wishlists',{wishlist_id:id});
  }
  // _renderHeader(section) {
  //   return (
  //     <View style={styles.ShoppingButton}>
  //       <Text style={styles.ShoppingText}><Icon name="angle-down" size={24} color="#000" style={{flexDirection:'column'}} />  {section.title}</Text>
  //     </View>
  //   );
  // }
  renderMyList(){
    // const wish_image='';
    if(this.state.totalItems==0){
       return(
            <View style={gstyles.content}>
              <Text style={gstyles.ShoppingText}>No data found</Text>
            </View>);
    }
    else
    {
    return(
      
          this.state.fieldValues.map((item)=>{
            // alert(item.listing_images_1['image'])
            // let img = 'listing_images_'+item.total_item;
            // console.log(img);
            // console.log(item.listing_images_+''+item.total_item);
            if(item.listing_images_1){
              var wish_image = item.listing_images_1['image'];
            }
            else
            {
              var wish_image = item.listing_images_0['image'];
            }
            // console.log(wish_image);
            return(
              
              <View style={gstyles.content} key={item.wishlist_id}>
                  <TouchableOpacity onPress={()=>this.handleNavigation(item.wishlist_id)} >
                    <View style={gstyles.ShoppingListItemsView}>
                        <View style={gstyles.ShoppingListItemsViewImage}>
                            <Image source={{uri : wish_image}} resizeMode="contain" style={gstyles.width100,{height:100}}/>
                        </View>
                        <View style={gstyles.ShoppingListItemsViewRightContent}>
                            <Text style={gstyles.ShoppingWishlistTitle}>{item.title}</Text>
                            <Text style={gstyles.ShoppingWishlistText}>{item.total_item} entries</Text>
                            <Text style={gstyles.ShoppingWishlistText}>{item.creation_date}</Text>
                            <Text style={gstyles.ShoppingWishlistText}>{item.body}</Text>
                        </View>
                    </View>
                  </TouchableOpacity>
              </View>
              );
          })
        );
      }
  }
  renderRecommendedList(){
    
    if(this.state.totalRecommendedItems==0){
       return(
            <View style={gstyles.content}>
              <Text style={gstyles.ShoppingText}>No data found</Text>
            </View>);
    }
    else
    {
        return(
          this.state.recommendedFieldValues.map((item)=>{
            return(
              
              <View style={gstyles.content} key={item.wishlist_id}>
                  <TouchableOpacity onPress={()=>this.handleNavigation(item.wishlist_id)} >
                    <View style={gstyles.ShoppingListItemsView}>
                        <View style={gstyles.ShoppingListItemsViewImage}>
                            <Image source={require('../../../assets/nophoto.png')} resizeMode="contain" style={gstyles.width100}/>
                        </View>
                        <View style={gstyles.ShoppingListItemsViewRightContent}>
                            <Text style={gstyles.ShoppingWishlistTitle}>{item.title}</Text>
                            <Text style={gstyles.ShoppingWishlistText}>{item.total_item} entries</Text>
                            <Text style={gstyles.ShoppingWishlistText}>{item.creation_date}</Text>
                            <Text style={gstyles.ShoppingWishlistText}>{item.body}</Text>
                        </View>
                    </View>
                  </TouchableOpacity>
              </View>
              );
          })
        );
      }
  }
  // _renderContent = (section) => {
     
  //       if(section.listname!=""){
  //           return (
  //           <View style={gstyles.content}>
  //               <TouchableOpacity onPress={()=>this.handleNavigation()} >
  //                 <Text style={styles.shoppingText}>shopping list found</Text>
  //                 <View style={{borderColor:'#000',borderWidth:1,padding:10,marginTop:8,flexDirection:'row'}}>
  //                     <View style={{flexDirection:'column',width:'20%'}}>
  //                         <Image source={require('../../../assets/nophoto.png')} resizeMode="contain" style={{width:'100%'}}/>
  //                     </View>
  //                     <View style={{flexDirection:'column',width:'80%'}}>
  //                         <Text style={{fontSize:16,fontWeight:'bold',marginTop:5,color:'#000'}}>{section.listname}</Text>
  //                         <Text style={{marginTop:5,color:'#000'}}>0 entries</Text>
  //                         <Text style={{marginTop:5,color:'#000'}}>Wed at 5:18 PM</Text>
  //                         <Text style={{marginTop:5,color:'#000'}}>list note</Text>
  //                     </View>
  //                 </View>
  //               </TouchableOpacity>
  //           </View>
  //           );
  //       }
  //       else
  //       {
  //           return(
  //               <View style={gstyles.content}>
  //                 <Text style={styles.shoppingText}>No data found</Text>
  //               </View>
  //           );
  
  //       }
      
      
  // }

 

	render(){
    if(this.state.LoggedIn==false){
        return(
          <View style={gstyles.container}>
              <View style={gstyles.headerMenu}>
                    <TouchableOpacity onPress={() => this.props.navigation.openDrawer()} style={gstyles.headerMenuButton}>
                      <Text><Icon name="bars" size={24} color="#fff" /></Text>
                    </TouchableOpacity>
                    <Text style={gstyles.headerProfileLabel}>Shopping List</Text>
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate('CreateWishlist')} style={gstyles.headerRightButton}><Icon name="plus-circle" size={24} color="#fff" /></TouchableOpacity>
              </View>
              <Text style={gstyles.signInButton}>To get Lists ,Please Sign In</Text>
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
  								<TouchableOpacity onPress={() => this.props.navigation.openDrawer()} style={gstyles.headerMenuButton}>
  									<Text><Icon name="bars" size={24} color="#fff" /></Text>
                  </TouchableOpacity>
                  <Text style={gstyles.headerProfileLabel}>Shopping List</Text>
                  <TouchableOpacity onPress={()=>this.props.navigation.push('CreateWishlist')} style={gstyles.headerRightButton}><Icon name="plus-circle" size={24} color="#fff" /></TouchableOpacity>
  					</View>
            { 
        this.state.isLoading ? <View style={gstyles.loading}><ActivityIndicator style={gstyles.loadingActivity} color='#333' size="large"/></View> :
          <ScrollView>
            <SearchComponent />
  				  <View>
            
              <TouchableOpacity onPress={()=>this.setState({mysection:!this.state.mysection,recommendedsection:false})} style={gstyles.ShoppingButton}><Text style={gstyles.ShoppingText}><Icon name="angle-down" size={24} color="#000" style={gstyles.flexDirectionColumn} />  My Shopping List</Text></TouchableOpacity>
              {
                this.state.mysection==true ? <Text style={[gstyles.ShoppingText],{padding:10}}>{this.state.totalItems} shopping lists found</Text> : null
              }
              {
                this.state.mysection==true ? this.renderMyList() : null
              }
            
              <TouchableOpacity onPress={()=>this.setState({recommendedsection:!this.state.recommendedsection,mysection:false})} style={gstyles.ShoppingButton}><Text style={gstyles.ShoppingText}><Icon name="angle-down" size={24} color="#000" style={gstyles.flexDirectionColumn} />  Recommended List</Text>
              </TouchableOpacity>
               {
                this.state.recommendedsection==true ? this.renderRecommendedList() : null
              }
            </View>
          </ScrollView>
      }
			</View>
		);
    }
	}
}

// 
  // <Accordion
  //           sections={SECTIONS}
  //           renderHeader={this._renderHeader}
  //           renderContent={this._renderContent}
  //         />
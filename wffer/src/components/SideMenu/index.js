import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  AsyncStorage,
  Modal,
  ActivityIndicator

} from 'react-native';
import {gstyles} from '../../GlobalStyles';
import { DrawerActions } from 'react-navigation';
import { SafeAreaView} from 'react-navigation';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
export class DrawerTitle extends React.Component{
  constructor(props) {
      super(props);
      this.state = {
        fieldValues:[],
        LoggedIn:false,
        userData:[],
        oauthToken:'',
        oauthSecret:'',
        modalVisible: false,
        cities:[],
        isButtonDisabled:false,
        isLoading:true
      }
      this.city ='';
      this.fetchValues();
      this.fetchCities();
      this.getCity();
    }
   async getCity(){
      AsyncStorage.getItem('cityInformation');
      var cityValue = await AsyncStorage.getItem('cityInformation');
      this.city=cityValue;
      // alert(this.state.city)
      if(cityValue == null){
        setTimeout( () => {
            this.setModalVisible(true);
        },1000);
        
      }
    }
    setModalVisible(visible) {
       this.setState({modalVisible: visible});
    }

    handleNavigation(){     
            this.props.navigation.dispatch(DrawerActions.closeDrawer());
            this.setModalVisible(true);
    }

    logout = async() => {
       await AsyncStorage.removeItem('userLoginAuthentication');
       const userData = await AsyncStorage.getItem('userData');
       this.setState({userData:JSON.parse(userData)});
       this.setState({oauthToken:this.state.userData.oauth_token});
       this.setState({oauthSecret:this.state.userData.oauth_secret});
       await AsyncStorage.removeItem('userData');
       this.ApiLogout() 
       this.setState({LoggedIn:false})
       this.props.navigation.push('Login');
    }

    ApiLogout(){
        var formData = new FormData;
        formData.append('oauth_consumer_key','mji82teif5e8aoloye09fqrq3sjpajkk');
        formData.append('oauth_consumer_secret','aoxhigoa336wt5n26zid8k976v9pwipe');
        formData.append('oauth_token',this.state.oauthToken);
        formData.append('oauth_secret',this.state.oauthSecret);
          return fetch('https://wffer.com/se/api/rest/logout',{
            body: formData,
            headers:{
              'Accept':'application/json',
            },
            method:'POST'
          })
            .then((response) => response.json())
            .then((responseJson) => {
              
              if(responseJson.status_code=="204"){
                this.setState({
                  // isLoading: false,
                }, function(){
              
                });
              }
              else if(responseJson.status_code=="401")
              {
                this.setState({
                  Message : responseJson.message,
                })
                alert(JSON.stringify(responseJson.message))
              
              }
            })
            .catch((error) =>{
              console.error(error);
            });
    }
  fetchCities(){

    return fetch('https://wffer.com/se/api/rest/listings/get-cities?id=1&oauth_consumer_key=mji82teif5e8aoloye09fqrq3sjpajkk&oauth_consumer_secret=aoxhigoa336wt5n26zid8k976v9pwipe',{
              method:'GET'
            })
            .then((response) => response.json())
            .then((responseJson) => {
          
              if(responseJson.status_code=='200'){
                 this.setState({
                  isLoading: false,
                  cities: responseJson.body,
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
  async selectCity(city){
      // alert(city)
      AsyncStorage.setItem('cityInformation', city);
      var value = await AsyncStorage.getItem('cityInformation');
      console.log(value)
      this.setModalVisible(!this.state.modalVisible);
      this.props.navigation.push('Home');
  }
   fetchValues(){
		return fetch('https://wffer.com/se/api/rest/listings/categories?oauth_consumer_key=mji82teif5e8aoloye09fqrq3sjpajkk&oauth_consumer_secret=aoxhigoa336wt5n26zid8k976v9pwipe&listingtype_id=2',{
			        method:'GET'
			      })
			      .then((response) => response.json())
			      .then((responseJson) => {
			    
			      	if(responseJson.status_code=='200'){
			      		 this.setState({
				          // isLoading: false,
				          fieldValues: responseJson.body.categories,
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
  disable(){
      this.setState({isButtonDisabled: true});setTimeout(() => this.setState({ isButtonDisabled: false }), 5000);
  }
  render(){
  	// alert(this.state.fieldValues.length)
  // 		if (this.state.fieldValues.length === 0) {
		//   return null
		// }
      AsyncStorage.getItem("userLoginAuthentication").then((value) => {
          if(value !== null){
            this.setState({LoggedIn:true})
          }
      }).done();
      return(
        <ScrollView style={gstyles.sideMenuView} decelerationRate="normal">
        	<SafeAreaView>
          
        		<View>
  	      		<Text style={gstyles.drawertitleHeadingText}>Menu</Text>
              {
                  (this.state.LoggedIn === true) 
                  ?<TouchableOpacity style={gstyles.drawerView} onPress={()=>{this.disable();this.props.navigation.push('Profile')}}><Image source={require('../../../assets/nophoto_icon.png')} style={gstyles.drawerImage}/><Text style={gstyles.drawertitleNormalText}> Profile</Text></TouchableOpacity>
                  : null
              }
  	      		<TouchableOpacity style={gstyles.drawerView} onPress={()=>{this.disable();this.props.navigation.push('Home')}} disabled={this.state.isButtonDisabled}><Icon name="home" size={24} color="#febe2b" style={gstyles.drawerImage} /><Text style={gstyles.drawertitleNormalText}> Home</Text></TouchableOpacity>
  	      		<TouchableOpacity style={gstyles.drawerView} onPress={()=>{this.disable();this.props.navigation.push('Language')}}><Image source={require('../../../assets/switch_lang.png')} style={gstyles.drawerImage}/><Text style={gstyles.drawertitleNormalText}> Language</Text></TouchableOpacity>
        		</View>

        		<View>
  	      		<Text style={gstyles.drawertitleHeadingText}> Shopping</Text>
  	      		<TouchableOpacity style={gstyles.drawerView} onPress={()=>{this.disable();this.props.navigation.push('Catalog')}}><Image source={require('../../../assets/all-category.png')} style={gstyles.drawerImage}/><Text style={gstyles.drawertitleNormalText}> Catalog</Text></TouchableOpacity>
  	      		<TouchableOpacity onPress={()=>{this.disable();this.props.navigation.push('ShoppingList')}} style={gstyles.drawerView}><Image source={require('../../../assets/shopping-basket.png')} style={gstyles.drawerImage}/><Text style={gstyles.drawertitleNormalText}> My Shopping List</Text></TouchableOpacity>
  	      		<TouchableOpacity onPress={()=>{this.disable();this.props.navigation.push('CreateWishlist')}} style={gstyles.drawerView}><Image source={require('../../../assets/create-list1-c.png')} style={gstyles.drawerImage}/><Text style={gstyles.drawertitleNormalText}> Create New List</Text></TouchableOpacity>
  	      		<TouchableOpacity style={gstyles.drawerView} onPress={()=>{this.disable();this.props.navigation.push('SpecialOffers')}}><Image source={require('../../../assets/tag-c.png')} style={gstyles.drawerImage}/><Text style={gstyles.drawertitleNormalText}> Special Offer</Text></TouchableOpacity>
  	      		<TouchableOpacity style={gstyles.drawerView} onPress={()=>{this.disable();this.props.navigation.push('StoreLocator')}}><Image source={require('../../../assets/store-locator-c.png')} style={gstyles.drawerImage}/><Text style={gstyles.drawertitleNormalText}> Store Locator</Text></TouchableOpacity>
        		  <TouchableOpacity style={gstyles.drawerView} onPress={()=>{this.disable();this.handleNavigation()}}><Icon name="location-arrow" style={gstyles.drawerImage} size={24} color="#febe2b"/><Text style={gstyles.drawertitleNormalText}>Select City</Text></TouchableOpacity>
            </View>

        		<View>
            	<Text style={gstyles.drawertitleHeadingText}>Categories</Text>
  	      		<TouchableOpacity style={gstyles.drawerView} onPress={()=>{this.disable();this.props.navigation.push('Products', {cat_name:'All Categories'})}}><Image source={require('../../../assets/all-category.png')} style={gstyles.drawerImage}/><Text style={gstyles.drawertitleNormalText}> All Categories</Text></TouchableOpacity>
  	      		<View>
  	      		{
  	      			this.state.fieldValues.map((item,index)=>{
  	      				return(
  	      				<TouchableOpacity key={index} style={gstyles.drawerView} onPress={()=>{this.disable();this.props.navigation.push('Products', {cat_name:item.category_name,cat_id:item.category_id})}}>
  	      					<Image source={{uri:item.image_icon}} style={[gstyles.drawerImage,{tintColor:'#febe2b'}]}/><Text style={gstyles.drawertitleNormalText}> {item.category_name}</Text>
  	      				</TouchableOpacity>
  	      				)
  	      			})
  	      		}
  	      		</View>
        		</View>

        		<View style={{marginBottom:20}}>
  	      		<Text style={gstyles.drawertitleHeadingText}>Settings</Text> 
                {
                  (this.state.LoggedIn === true) 
                  ?
                  <View>
                    <TouchableOpacity style={gstyles.drawerView}  onPress={() =>{this.disable(); this.logout() }}><Icon name="power-off" color="#febe2b" size={24} style={gstyles.drawerImage} /><Text style={gstyles.drawertitleNormalText}> Logout</Text></TouchableOpacity>
                  </View>
                  :
                  <View>
                    <TouchableOpacity style={gstyles.drawerView}  onPress={() =>{this.disable();this.props.navigation.navigate('Login')}} ><Image source={require('../../../assets/all-category.png')} style={gstyles.drawerImage}/><Text style={gstyles.drawertitleNormalText}> Sign In</Text></TouchableOpacity>
                     <TouchableOpacity style={gstyles.drawerView} onPress={() => {this.disable();this.props.navigation.navigate('Signup')}}><Image source={require('../../../assets/all-category.png')} style={gstyles.drawerImage}/><Text style={gstyles.drawertitleNormalText}> Sign Up</Text></TouchableOpacity>
        	       </View>
               }
               
          </View>
          <Modal animationType="slide"
              transparent={true}
              style={{opacity:0.2}}
              visible={this.state.modalVisible}
              onRequestClose={() => {
                alert('Modal has been closed.');
                this.setModalVisible(!this.state.modalVisible);
            }}>
              <View style={gstyles.container}>
          <View style={gstyles.headerMenu}>
                
                  {this.city == null ? <Text style={gstyles.headerMenuButton}></Text> : <TouchableOpacity onPress={() =>this.setModalVisible(false)} style={gstyles.headerMenuButton}><Icon name="close" size={30} color="#fff" /></TouchableOpacity>}
                          
                          <Text style={gstyles.headerProfileLabel}>Select City</Text>
                          <Text style={gstyles.headerRightButton}></Text>
          </View>
          {
                              this.state.isLoading==true ?  <View style={gstyles.loading}><ActivityIndicator style={gstyles.loadingActivity} color='#333' size="large"/></View> :   
          <ScrollView>              
              <View style={[gstyles.profileHeadingView,gstyles.marginBottom10,gstyles.marginTop10]}><Text style={gstyles.profileHeadingText}>Choose City</Text></View>
                     
                          {
                            this.state.cities.map((item,index)=>{
                              return(
                                <TouchableOpacity key={index} style={{width:'96%',padding:15,backgroundColor:'#febe2b',marginLeft:'2%',marginRight:'2%',marginTop:5,marginBottom:5}} onPress={()=>{this.selectCity(item.title)}}><Text style={{color:'#fff',fontSize:20,fontWeight:'bold'}}>{item.title}</Text></TouchableOpacity>
                              )
                            })
                          }
                        
                
                
          </ScrollView>

          }
        </View>
          </Modal>
        	</SafeAreaView>
         
        </ScrollView>
        )
      }
  }

  // <Modal
  //             animationType="slide"
  //             transparent={true}
  //             style={{opacity:0.2}}
  //             visible={this.state.modalVisible}
  //             onRequestClose={() => {
  //               alert('Modal has been closed.');
  //               this.setModalVisible(!this.state.modalVisible);
  //           }}>
  //               <View style={{flex:1,backgroundColor:'rgba(0,0,0,0.5)'}}>
  //                 <View style={{flex:1,alignItems: 'center',backgroundColor:'#fff',margin:30,borderRadius:10}}>
  //                     <Text style={[gstyles.lowestPriceTitle,{marginBottom:10}]}>Select City</Text>
  //                     {
  //                       this.state.cities.map((item,index)=>{
  //                         return(
  //                           <TouchableOpacity key={index} style={{width:'100%',padding:15,borderBottomColor:'#333',borderBottomWidth:1}} onPress={()=>{this.selectCity(item.title)}}><Text style={[gstyles.buttonTextFixed,gstyles.textRed]}>{item.title}</Text></TouchableOpacity>
  //                         )
  //                       })
  //                     }
                      
                    
  //                 </View>
  //               </View>
  //           </Modal>
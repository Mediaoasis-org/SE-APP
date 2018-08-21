import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  AsyncStorage,
  Modal,
  ActivityIndicator,
  NetInfo

} from 'react-native';
import {gstyles} from '../../GlobalStyles';
import { DrawerActions } from 'react-navigation';
import { SafeAreaView} from 'react-navigation';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import RNRestart from 'react-native-restart'; 
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
        isLoading:true,
        city:'',
        languagesData:[],
        language : '',
        refresh:'',
        isConnected:true
      }
      // alert(this.props.connectionAvailable)
      // this.city ='';
     this.getInitialValues();
     this.languageDataFetch = this.languageDataFetch.bind(this)  
    }
    
     componentDidMount(){

        NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
        this.getInitialValues();
        // alert(this.state.language)    

      }
      componentWillMount() {
        
         console.log('called')
      }
      componentWillUnmount() {
         NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
      }
      // componentDidUpdate(){
  //     this.languageDataFetch();
  // }
      handleConnectivityChange = isConnected => {
        // alert('work')
          if (isConnected) {
            this.setState({ isConnected });
            console.log(this.state.isConnected)
          } else {
            this.setState({ isConnected });
          }
      }
      getInitialValues(){
            console.log('connection' + this.state.isConnected)
            if(this.state.isConnected){
               this.languageDataFetch();
                this.fetchValues();
                this.fetchCities();
                this.getCity();
            }   
      }
    refreshLangugage(){
      this.props.navigation.dispatch(DrawerActions.closeDrawer());
      this.setState({refresh : true})
      fetch('https://wffer.com/se/api/rest/get-language-data?oauth_consumer_key=mji82teif5e8aoloye09fqrq3sjpajkk&oauth_consumer_secret=aoxhigoa336wt5n26zid8k976v9pwipe',{
              method:'GET'
            })
            .then((response) => response.json())
            .then((responseJson) => {
          
              if(responseJson.status_code=='200'){
                 this.setState({refresh : false})
                  AsyncStorage.setItem('languageData', JSON.stringify(responseJson.body));
                  // AsyncStorage.setItem('languageinfo', 'en');
                 // alert(JSON.stringify(responseJson.body));
                 // this.props.navigation.push('Home');
                 RNRestart.Restart();
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
    async languageDataFetch(){
      var languageData = await AsyncStorage.getItem('languageData');
      // console.log(languageData);

        const Datalang = JSON.parse(languageData);
        const lang = await AsyncStorage.getItem('languageinfo');
        // console.log('language : '+lang)
        this.setState({language:lang})
        this.setState({languagesData : Datalang[lang]})
    }
   async getCity(){
        
      AsyncStorage.getItem('cityInformation');
      var cityValue = await AsyncStorage.getItem('cityInformation');
      // this.city=cityValue;
      this.setState({city:cityValue});
      
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
           fetch('https://wffer.com/se/api/rest/logout',{
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

     fetch('https://wffer.com/se/api/rest/listings/get-cities?id=1&oauth_consumer_key=mji82teif5e8aoloye09fqrq3sjpajkk&oauth_consumer_secret=aoxhigoa336wt5n26zid8k976v9pwipe',{
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
      console.log(value);
      this.setState({city:value})
      this.setModalVisible(!this.state.modalVisible);
      this.props.navigation.push('Home');
  }
   fetchValues(){
		 fetch('https://wffer.com/se/api/rest/listings/categories?oauth_consumer_key=mji82teif5e8aoloye09fqrq3sjpajkk&oauth_consumer_secret=aoxhigoa336wt5n26zid8k976v9pwipe&listingtype_id=2',{
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
			      		this.setState({Message:responseJson.Message});
			      	}
			      	
			      })
			      .catch((error) =>{
			        console.error(error);
			      });
	}
 
  
  disable(){
    
      this.setState({isButtonDisabled: true});setTimeout(() => this.setState({ isButtonDisabled: false }), 1000);
  }
  handleLanguage(){
    this.props.navigation.push('Language');
    // this.languageDataFetch()
  }
  navigationOptions = {
    drawerPosition:'right'
  }
  render(){
    // this.languageDataFetch.bind(this)

    // AsyncStorage.getItem("languageinfo").then((value) => {
    //       // this.setState({language:value})
    //       this.languageDataFetch()
    //       // console.log(this.state.language)
    //   }).done();
    
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
  	      		<Text style={[gstyles.drawertitleHeadingText,gstyles.textLeft]}>{this.state.languagesData.DrawerMenuTitleText}</Text>
              {
                  (this.state.LoggedIn === true) 
                  ?<TouchableOpacity style={gstyles.drawerView} onPress={()=>{this.disable();this.props.navigation.push('Profile')}} ><Image source={require('../../../assets/nophoto_icon.png')} style={gstyles.drawerImage}/><Text style={gstyles.drawertitleNormalText}> {this.state.languagesData.DrawerProfileTitleText}</Text></TouchableOpacity>
                  : null
              }
  	      		<TouchableOpacity style={gstyles.drawerView} onPress={()=>{this.disable();this.props.navigation.push('Home')}} ><Icon name="home" size={24} color="#febe2b" style={gstyles.drawerImage} /><Text style={gstyles.drawertitleNormalText}> {this.state.languagesData.DrawerHomeTitleText}</Text></TouchableOpacity>
  	      		<TouchableOpacity style={gstyles.drawerView} onPress={()=>{this.disable();this.handleLanguage()}} ><Image source={require('../../../assets/switch_lang.png')} style={gstyles.drawerImage}/><Text style={gstyles.drawertitleNormalText}> {this.state.languagesData.DrawerLanguageTitleText}</Text></TouchableOpacity>
        		</View>

        		<View>
  	      		<Text style={[gstyles.drawertitleHeadingText,gstyles.textLeft]}> {this.state.languagesData.DrawerShoppingTitleText}</Text>
  	      		<TouchableOpacity style={gstyles.drawerView} onPress={()=>{this.disable();this.props.navigation.push('Catalog')}} ><Image source={require('../../../assets/all-category.png')} style={gstyles.drawerImage}/><Text style={gstyles.drawertitleNormalText}> {this.state.languagesData.DrawerCatalogTitleText}</Text></TouchableOpacity>
  	      		<TouchableOpacity onPress={()=>{this.disable();this.props.navigation.push('ShoppingList')}} style={gstyles.drawerView} ><Image source={require('../../../assets/shopping-basket.png')} style={gstyles.drawerImage}/><Text style={gstyles.drawertitleNormalText}> {this.state.languagesData.DrawerWishlistTitleText}</Text></TouchableOpacity>
  	      		<TouchableOpacity onPress={()=>{this.disable();this.props.navigation.push('CreateWishlist')}} style={gstyles.drawerView} ><Image source={require('../../../assets/create-list1-c.png')} style={gstyles.drawerImage}/><Text style={gstyles.drawertitleNormalText}> {this.state.languagesData.DrawerNewListTitleText}</Text></TouchableOpacity>
  	      		<TouchableOpacity style={gstyles.drawerView} onPress={()=>{this.disable();this.props.navigation.push('SpecialOffers')}} ><Image source={require('../../../assets/tag-c.png')} style={gstyles.drawerImage}/><Text style={gstyles.drawertitleNormalText}> {this.state.languagesData.DrawerSpecialOfferTitleText}</Text></TouchableOpacity>
  	      		<TouchableOpacity style={gstyles.drawerView} onPress={()=>{this.disable();this.props.navigation.push('StoreLocator')}} ><Image source={require('../../../assets/store-locator-c.png')} style={gstyles.drawerImage}/><Text style={gstyles.drawertitleNormalText}> {this.state.languagesData.DrawerStoreLocatorTitleText}</Text></TouchableOpacity>
        		  <TouchableOpacity style={gstyles.drawerView} onPress={()=>{this.disable();this.handleNavigation()}} ><Icon name="location-arrow" style={gstyles.drawerImage} size={24} color="#febe2b"/><Text style={gstyles.drawertitleNormalText}>{this.state.city == '' ? this.state.languagesData.DrawerSelectCityTitleText : this.state.city } </Text></TouchableOpacity>
            </View>

        		<View>
            	<Text style={[gstyles.drawertitleHeadingText,gstyles.textLeft]}>{this.state.languagesData.DrawerCategoriesTitleText}</Text>
  	      		<TouchableOpacity style={gstyles.drawerView} onPress={()=>{this.disable();this.props.navigation.push('Products', {cat_name:'All Categories'})}} ><Image source={require('../../../assets/all-category.png')} style={gstyles.drawerImage}/><Text style={gstyles.drawertitleNormalText}> {this.state.languagesData.DrawerCategoriesTitleText}</Text></TouchableOpacity>
  	      		<View>
  	      		{
  	      			this.state.fieldValues.map((item,index)=>{
  	      				return(
  	      				<TouchableOpacity key={index} style={gstyles.drawerView} onPress={()=>{this.disable();this.props.navigation.push('Products', {cat_name:item.category_name,cat_id:item.category_id})}} >
  	      					<Image source={{uri:item.image_icon}} style={[gstyles.drawerImage,{tintColor:'#febe2b'}]}/><Text style={gstyles.drawertitleNormalText}> {item.category_name}</Text>
  	      				</TouchableOpacity>
  	      				)
  	      			})
  	      		}
  	      		</View>
        		</View>

        		<View style={{marginBottom:20}}>
  	      		<Text style={[gstyles.drawertitleHeadingText,gstyles.textLeft]}>{this.state.languagesData.DrawerSettingsTitleText}</Text> 
              <TouchableOpacity style={gstyles.drawerView}  onPress={() =>{this.disable();this.refreshLangugage()}}><Icon name="refresh" color="#febe2b" size={24} style={gstyles.drawerImage} /><Text style={gstyles.drawertitleNormalText}>Refresh Language Data</Text></TouchableOpacity>
                {
                  (this.state.LoggedIn === true) 
                  ?
                  <View>
                    <TouchableOpacity style={gstyles.drawerView}  onPress={() =>{this.disable(); this.logout() }}><Icon name="power-off" color="#febe2b" size={24} style={gstyles.drawerImage} /><Text style={gstyles.drawertitleNormalText}> {this.state.languagesData.DrawerLogoutTitleText}</Text></TouchableOpacity>
                  </View>
                  :
                  <View>
                    <TouchableOpacity style={gstyles.drawerView}  onPress={() =>{this.disable();this.props.navigation.navigate('Login')}} ><Image source={require('../../../assets/all-category.png')} style={gstyles.drawerImage}/><Text style={gstyles.drawertitleNormalText}> {this.state.languagesData.DrawerSignInTitleText}</Text></TouchableOpacity>
                     <TouchableOpacity style={gstyles.drawerView} onPress={() => {this.disable();this.props.navigation.navigate('Signup')}} ><Image source={require('../../../assets/all-category.png')} style={gstyles.drawerImage}/><Text style={gstyles.drawertitleNormalText}> {this.state.languagesData.DrawerSignUpTitleText}</Text></TouchableOpacity>
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
                                <TouchableOpacity key={index} style={{width:'96%',padding:15,backgroundColor:'#febe2b',marginLeft:'2%',marginRight:'2%',marginTop:5,marginBottom:5}} onPress={()=>{this.selectCity(item.title)}}><Text style={[gstyles.textLeft,{color:'#fff',fontSize:20,fontWeight:'bold'}]}>{item.title}</Text></TouchableOpacity>
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
// disabled={this.state.isButtonDisabled}
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
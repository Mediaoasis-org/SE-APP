import React, { Component } from 'react';
import {
  Dimensions,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  AsyncStorage,
  ActivityIndicator,
  Linking,
  Platform
} from 'react-native';
import {gstyles} from '../../GlobalStyles';
import MapView, { ProviderPropType, Marker, Callout, AnimatedRegion, Polyline } from 'react-native-maps';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import CustomCallout from './CustomCallout';
import ModalDropdown from 'react-native-modal-dropdown';
import { Dropdown } from 'react-native-material-dropdown';
import MapViewDirections from 'react-native-maps-directions';
// import { DrawerActions } from 'react-navigation';
const window = Dimensions.get('window');

const ASPECT_RATIO = window.width / window.height;
// const LATITUDE = 37.78825;
// const LONGITUDE = -122.4324;
// const LATITUDE_DELTA = 0.0922;
const LATITUDE_DELTA = 0.5;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export  class StoreLocatorComponent extends Component {
	constructor(props){
		super(props);
		this.state={
			userData:[],
			oauthToken:'',
			oauthSecret:'',
			LoggedIn:null,
			isLoading:true,
			fieldValues:[],
			latitude:null,
			longitude:null,
			error:null,
			city:'',
			stores:[],
			stores1:[],
			renderData:[],
			coords:[],
			languagesData:[],
          	language : '',

		}
		
		this.getStorageValues();
	}

	async getStorageValues(){
		
			Linking.canOpenURL('app-settings:').then(supported => {
			  if (!supported) {
			    console.log('Can\'t handle settings url');
			  } else {
			    return Linking.openURL('app-settings:');
			  }
			}).catch(err => console.error('An error occurred', err));
		 
		

		var languageData = await AsyncStorage.getItem('languageData');
        const Datalang = JSON.parse(languageData);
        const lang = await AsyncStorage.getItem('languageinfo');
        this.setState({language:lang})
        // alert(this.state.language);
        this.setState({languagesData : Datalang[lang]})
         const userData = await AsyncStorage.getItem('userData');
         const city = await AsyncStorage.getItem('cityInformation');
         this.setState({city:city});
         this.fetchStore();
         this.fetchValues();
         // alert(this.state.city)
         // alert(userData.length);
          // if(userData!=null){
          //   this.setState({LoggedIn:true});
          //   this.setState({userData:JSON.parse(userData)});
          //   this.setState({oauthToken:this.state.userData.oauth_token});
          //   this.setState({oauthSecret:this.state.userData.oauth_secret});
          //   this.fetchValues();
            
          // }
          // else
          // {
          //   this.setState({LoggedIn:false})
          // }         
   }
   fetchStore(){
   		var store_title ;
   		let temp = ["Select"];
   		let temp1 = [{value : "Select"}];
		 return fetch('https://wffer.com/se/api/rest/listings/get-stores?oauth_consumer_key=mji82teif5e8aoloye09fqrq3sjpajkk&oauth_consumer_secret=aoxhigoa336wt5n26zid8k976v9pwipe',{
              method:'GET'
            })
            .then((response) => response.json())
            .then((responseJson) => {
              if(responseJson.status_code=='200'){
                // alert(JSON.stringify(responseJson.body));
                store_title = responseJson.body;
                
	                store_title.map((item)=>{
	                	temp.push(item.title);
	                	temp1.push({value : item.title});
	                })
                 this.setState({
                 stores1:temp1,
                  stores:temp,
                  isLoading:false,
                });
                 console.log(this.state.stores1)
              }
              else
              {
                // 0
              }
              this.setState({Message:responseJson.Message});
            })
            .catch((error) =>{
              console.error(error);
            });
	}
	fetchValues(){
      return fetch('https://wffer.com/se/api/rest/listings/wishlist/get-store-locator/143?oauth_consumer_key=mji82teif5e8aoloye09fqrq3sjpajkk&oauth_consumer_secret=aoxhigoa336wt5n26zid8k976v9pwipe&city='+this.state.city,{
              method:'GET'
            })
            .then((response) => response.json())
            .then((responseJson) => {
              if(responseJson.status_code=='200'){
                // alert(JSON.stringify(responseJson.body));
                 this.setState({
                  fieldValues:responseJson.body,
                  isLoading:false,
                });
                 this.setState({renderData:this.state.fieldValues})
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
  	getLocation(getlat,getlong){
  		
	  		 navigator.geolocation.getCurrentPosition(
		       (position) => {
		         console.log("wokeeey");
		         // alert(position);
		         this.setState({
		           latitude: position.coords.latitude,
		           longitude: position.coords.longitude,
		           error: null,
		           gpsLoading:false,
		         });
		         
		          // this.fetchValues();
		       },
		       (error) => {this.setState({ error: error.message });
		      
		          // this.props.navigation.goBack();
		     },
		       { enableHighAccuracy: false, timeout: 50000, maximumAge: 1000 },

    		);
	  		 const scheme =Platform.select({ ios: 'maps://app?', android: 'geo:0,0?q=' });
	  		 // const latLng = '24.7136,39.1925';
	  		 const latLng = this.state.latitude + ',' + this.state.longitude;
	  		 var getlatlng = getlat+','+getlong;
	  		 // var getlatlng = '26.294305,73.014146'
	  		 const url = Platform.select({
	  		 	ios:scheme+'saddr='+latLng+'&daddr='+getlatlng,
	  		 	android:scheme+getlatlng
	  		 })
	  		 // alert(url)
	  		 Linking.openURL(url)
	  		 // Platform.select({
	  		 // 	ios: () => {
	  		 // 		Linking.openURL('maps://app?saddr=24.7136+39.1925&daddr='+getlat+'+'+getlong)
	  		 // 	},
	  		 // 	android :() =>{
	  		 // 		alert('opening url')
	  		 // 		Linking.openURL('geo:24.7136,39.1925?z=8');
	  		 // 	}
	  		 // })
	  		
  	}
  	handleSearchList(e){
	    let text = e.toLowerCase()
	    console.log(text)
	    // this.setState({search : e})
	    let fullList = this.state.fieldValues;

	    let filteredList = fullList.filter((item) => { // search from a full list, and not from a previous search results list
	      if(item.title.toLowerCase().match(text))
	        return item;
	    })
	    if (!text || text === '' || text == "select") {
	      this.setState({
	        renderData: fullList,
	        noData:false,
	      })
	    } else if (!filteredList.length) {
	     // set no data flag to true so as to render flatlist conditionally
	       this.setState({
	         noData: true,
	         renderData:filteredList
	       })
	    }
	    else if (Array.isArray(filteredList)) {
	      this.setState({
	        noData: false,
	        renderData: filteredList
	      })
	    }
  }
  	onTagSelect(idx, data,name){ 
	      // console.log("======== on tag selected ==========="); 
	      console.log(idx,data,name); 
	      this.handleSearchList(data)
	      // this.handleInput(idx,data,name)
	};
	render(){
		const origin = {latitude: this.state.latitude, longitude:this.state.longitude};
		const destination = {latitude: 37.771707, longitude: -122.4053769};
		const GOOGLE_MAPS_APIKEY = 'AIzaSyCfcWskrfRL7X-VTO2MLYZG22ndYNWShyg';
		return(
			<View style={gstyles.container}>
					<View style={gstyles.headerMenu}>
								<TouchableOpacity onPress={() => this.props.navigation.openDrawer()} style={gstyles.headerMenuButton}>
									<Icon name="bars" size={24} color="#fff" />
			                    </TouchableOpacity>
			                    <Text style={gstyles.headerProfileLabel}>{this.state.languagesData.STORELOCATOR_HeaderTitle}</Text>
			                    <Text style={gstyles.headerRightButton}></Text>
					</View>
					
					{	
						this.state.isLoading ?  <View style={gstyles.loading}><ActivityIndicator style={gstyles.loadingActivity} color='#333' size="large"/></View> :
							<View>
							 <ModalDropdown 
			                      style={gstyles.dropdownMainStyles}						                      
			                      dropdownTextStyle={gstyles.dropdownTextStyle}
			                      textStyle={gstyles.textStyle}
			                      dropdownStyle={gstyles.dropdownStyles}
			                      defaultIndex={this.props.defaultIndex}
			                      showsVerticalScrollIndicator={true}
			                      animated={false}
			                      defaultValue='Select Store'
			                      options={this.state.stores}						         
			                      onSelect={(idx, data)=>{ this.onTagSelect(idx, data,data)}}				
	                		/>		
	                		
							<MapView
							    initialRegion={{
							      latitude: this.state.languagesData.STORELOCATOR_initialRegionLat,
							      longitude: this.state.languagesData.STORELOCATOR_initialRegionLong,
							      latitudeDelta:LATITUDE_DELTA ,
							      longitudeDelta:LONGITUDE_DELTA,
							    }}
							    style={{width:'100%',height:window.height}}
							>
								{
									this.state.renderData.map((marker,index) => (
								    <View key={index}>
								    <Marker
								     
								      coordinate={{latitude:marker.latitude,longitude:marker.longitude}}
								      
								  	>
								  		
								  		<MapView.Callout tooltip style={{alignItems:'center'}} onPress={() => this.getLocation(marker.latitude,marker.longitude)}>
									  		<View style={{alignSelf: 'flex-start',}}>
										  		<View style={{width:window.width-40,flexDirection: 'row', alignSelf: 'flex-start',backgroundColor:'#fff',borderRadius: 6,borderColor: '#007a87',borderWidth: 0.5, padding:10}}>
										  			<View  style={{flex:1}}>
											  			<Text style={{color:'#000',fontSize:20,fontWeight:'bold',textAlign:'center',marginBottom:3}}>{marker.title}</Text>
											     		<Text style={{color:'#000',fontSize:18,textAlign:'center',marginBottom:3}}>{marker.branch}</Text>
											     		<TouchableOpacity style={{alignItems:'center'}} onPress={()=>this.getLocation(marker.latitude,marker.longitude)}><Text style={{color:'#fff',paddingTop:5,paddingBottom:5,paddingLeft:15,paddingRight:15,backgroundColor:'#007a87',fontSize:18,margin:5}}>{this.state.languagesData.STORELOCATOR_DirectionsText}</Text></TouchableOpacity>
										     		</View>
										  		</View>
									  		</View>
								  		</MapView.Callout>
								  		

								  	</Marker>
								  	
									</View>
							 	))}
							 	
							</MapView>
							</View>
					} 
				 	
			</View>
		)
		
	}
}


// <MapViewDirections
// 										    origin={{latitude: 24.7136, longitude:46.6753}}
// 										    destination={{latitude: marker.latitude, longitude: marker.longitude}}
// 										    apikey={GOOGLE_MAPS_APIKEY}
// 										  />
// <Dropdown
// 						        label='Select Store'
// 						        data={this.state.stores1}
// 						        onChangeText={(idx, data)=>{ this.onTagSelect(idx, data,data)}}
// 						        containerStyle={gstyles.dropdownMainStyles}
// 						        animationDuration={5}
// 						        rippleDuration={0}
// 						      />
// if(this.state.LoggedIn==false){
//         return(
//           <View style={gstyles.container}>
//               <View style={gstyles.headerMenu}>
//                     <TouchableOpacity onPress={() => this.props.navigation.openDrawer()} style={gstyles.headerMenuButton}>
//                       <Text><Icon name="bars" size={24} color="#fff" /></Text>
//                     </TouchableOpacity>
//                     <Text style={gstyles.headerProfileLabel}>Store Locator</Text>
//                     <Text style={gstyles.headerRightButton}></Text>
//               </View>
//               <Text style={gstyles.signInButton}>To View Stores ,Please Sign In</Text>
//               <TouchableOpacity style={gstyles.createAccountView} onPress={()=>this.props.navigation.navigate('Login')}>
//                   <Text style={gstyles.createAccountText}>Sign In</Text>
//               </TouchableOpacity>
//           </View>
//         )
// 	    }
// 	    else
// 	    {
import React, { Component } from 'react';
import {
  Dimensions,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  AsyncStorage,
  ActivityIndicator
} from 'react-native';
import {gstyles} from '../../GlobalStyles';
import MapView, { ProviderPropType, Marker,Callout, AnimatedRegion } from 'react-native-maps';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import CustomCallout from './CustomCallout';
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
			city:''

		}
		this.getStorageValues();
	}

	async getStorageValues(){
         const userData = await AsyncStorage.getItem('userData');
         const city = await AsyncStorage.getItem('cityInformation');
         this.setState({city:city});
         // alert(this.state.city)
         // alert(userData.length);
          if(userData!=null){
            this.setState({LoggedIn:true});
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
  	getLocation(){
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
  	}
	render(){
		if(this.state.LoggedIn==false){
        return(
          <View style={gstyles.container}>
              <View style={gstyles.headerMenu}>
                    <TouchableOpacity onPress={() => this.props.navigation.openDrawer()} style={gstyles.headerMenuButton}>
                      <Text><Icon name="bars" size={24} color="#fff" /></Text>
                    </TouchableOpacity>
                    <Text style={gstyles.headerProfileLabel}>Store Locator</Text>
                    <Text style={gstyles.headerRightButton}></Text>
              </View>
              <Text style={gstyles.signInButton}>To View Stores ,Please Sign In</Text>
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
									<Icon name="bars" size={24} color="#fff" />
			                    </TouchableOpacity>
			                    <Text style={gstyles.headerProfileLabel}>Store Locator</Text>
			                    <Text style={gstyles.headerRightButton}></Text>
					</View>
					
					{	
						this.state.isLoading ?  <View style={gstyles.loading}><ActivityIndicator style={gstyles.loadingActivity} color='#333' size="large"/></View> :
							
							<MapView
							    initialRegion={{
							      latitude: 24.7136,
							      longitude: 46.6753,
							      latitudeDelta:LATITUDE_DELTA ,
							      longitudeDelta:LONGITUDE_DELTA,
							    }}
							    style={{width:'100%',height:window.height}}
							>
								{
									this.state.fieldValues.map((marker,index) => (
								    <Marker
								      key={index}
								      coordinate={{latitude:marker.latitude,longitude:marker.longitude}}
								      calloutOffset={{ x: -8, y: 28 }}
            						  calloutAnchor={{ x: 0.5, y: 0.4 }}
								  	>
								  		
								  		<Callout tooltip  style={{alignItems:'center'}}>
									  		<View style={{alignSelf: 'flex-start',}}>
									  		<View style={{width:window.width-40,flexDirection: 'row', alignSelf: 'flex-start',backgroundColor:'#fff',borderRadius: 6,borderColor: '#007a87',borderWidth: 0.5, padding:10}}>
									  			<View  style={{flex:1}}>
									  			<Text style={{color:'#000',fontSize:20,fontWeight:'bold',textAlign:'center',marginBottom:3}}>{marker.title}</Text>
									     		<Text style={{color:'#000',fontSize:18,textAlign:'center',marginBottom:3}}>{marker.branch}</Text>
									     		<TouchableOpacity style={{alignItems:'center'}} onPress={()=>this.getLocation()}><Text style={{color:'#fff',paddingTop:5,paddingBottom:5,paddingLeft:15,paddingRight:15,backgroundColor:'#007a87',fontSize:18,margin:5}}>Directions</Text></TouchableOpacity>
									     		</View>
									  		</View>
									  		</View>
								  		</Callout>
								  		
								  	</Marker>
							 	))}
							 	{!!this.state.latitude && !!this.state.longitude && <Marker
				                  coordinate={{"latitude":this.state.latitude,"longitude":this.state.longitude}}
				                 title={"Your Location"}
				               />}
							</MapView>
					} 
				 	
			</View>
		)
		}
	}
}

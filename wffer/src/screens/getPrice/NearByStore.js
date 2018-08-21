import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Dimensions,
  FlatList,
  ScrollView,
  Platform,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  AsyncStorage

} from 'react-native';
import {gstyles} from '../../GlobalStyles';
// import MapView from 'react-native-maps';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import CheckBox from 'react-native-checkbox';
// import { DrawerActions } from 'react-navigation';
// import MapView, { ProviderPropType, Marker,Callout, AnimatedRegion } from 'react-native-maps';
// import ModalDropdown from 'react-native-modal-dropdown';
const window= Dimensions.get('window');

export  class NearByStoreComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: null,
      longitude: null,
      error:null,
      fieldValues:[],
      isLoading:true,
      gpsLoading:true,
      city:'',
      languagesData:[],
      language : '',
    };
  }
  async getStorageValue(){    
      // Linking.canOpenURL('app-settings:').then(supported => {
      //   if (!supported) {
      //     console.log('Can\'t handle settings url');
      //   } else {
      //     return Linking.openURL('app-settings:');
      //   }
      // }).catch(err => console.error('An error occurred', err));
        const city = await AsyncStorage.getItem('cityInformation');
        this.setState({city:city});
        var languageData = await AsyncStorage.getItem('languageData');
        const Datalang = JSON.parse(languageData);
        const lang = await AsyncStorage.getItem('languageinfo');
        this.setState({language:lang})
        // alert(this.state.language);
        this.setState({languagesData : Datalang[lang]}) 
      // alert(this.state.city)
  }
  fetchValues(){
    let wishlist_id = this.props.navigation.state.params.wishlist_id;
    fetch('https://wffer.com/se/api/rest/listings/wishlist/get-nearby-store-price/'+wishlist_id+'?oauth_consumer_key=mji82teif5e8aoloye09fqrq3sjpajkk&oauth_consumer_secret=aoxhigoa336wt5n26zid8k976v9pwipe&latitude='+this.state.latitude+'&longitude='+this.state.longitude+'&city='+this.state.city,{
              method:'GET'
        })
        .then(response => response.json())
        .then((responseJson) => {
          // console.log('https://wffer.com/se/api/rest/listings/wishlist/get-nearby-store-price/'+wishlist_id+'?oauth_consumer_key=mji82teif5e8aoloye09fqrq3sjpajkk&oauth_consumer_secret=aoxhigoa336wt5n26zid8k976v9pwipe&latitude='+this.state.latitude+'&longitude='+this.state.longitude+'&city='+this.state.city)
          // alert(JSON.stringify(responseJson))
          if(responseJson.status_code=='200'){
             this.setState({
                fieldValues: responseJson.body,
                isLoading: false,
            
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
  componentDidMount() {

    navigator.geolocation.getCurrentPosition(
       (position) => {
         // console.log("wokeeey");
         // alert(position);
         this.setState({
           latitude: position.coords.latitude,
           longitude: position.coords.longitude,
           error: null,
           gpsLoading:false,
         });
         
          this.fetchValues();
       },
       (error) => {this.setState({ error: error.message });
      
          // this.props.navigation.goBack();
     },
       { enableHighAccuracy: false, timeout: 50000, maximumAge: 1000 },

     );
    this.getStorageValue();
   }
   renderItems(){
    return Object.entries(this.state.fieldValues).map(([key, value]) => {  
    // console.log(`${key} ${value.productAvailable}`);  
        return ( 
                <TouchableOpacity onPress={()=>{this.props.navigation.push('StoreProfile',{wishlist_id:this.props.navigation.state.params.wishlist_id,store_id:value.wheretobuy_id,store_name:value.title})}} style={styles.flatlist} key={key}>
                  <View style={gstyles.lowestPriceLeftBox}>
                    <View style={gstyles.width90}>
                        <Image source={{uri : value.photoSrc}} style={gstyles.lowestPriceImage} resizeMode="contain"/>          
                    </View>
                  </View>
                  <View style={gstyles.lowestPriceRightBox}>
                        <View style={gstyles.lowestPriceRightInner}>
                          <View style={gstyles.lowestPriceRightInnerBox}>
                                <Text style={[gstyles.lowestPriceTitle,,gstyles.textLeft]}>{value.title}</Text>
                                <Text style={[gstyles.lowestPriceSubTitle,,gstyles.textLeft]}>{this.state.languagesData.NEARBYSTORE_ProductAvailableText} {value.productAvailable}</Text>
                                <Text style={[gstyles.lowestPriceSubTitle,gstyles.textRed,,gstyles.textLeft]}>{this.state.languagesData.NEARBYSTORE_TotalPriceText} : {value.indivisualSum}</Text>  
                                
                          </View> 
                          <View style={gstyles.lowestPriceLeftInnerBox}>
                              <Icon name="angle-right" size={40} color='#000' style={gstyles.marginTop40} />
                          </View>
                        </View>                      
                  </View>
                </TouchableOpacity>
            )
      })     
  }
	render(){
    return(
      <View style={gstyles.container}>
          <View style={gstyles.headerMenu}>
                          <TouchableOpacity onPressIn={() => this.props.navigation.goBack()} style={gstyles.headerMenuButton}>
                            <Icon name="angle-left" size={24} color="#fff" />
                          </TouchableOpacity>
                          <Text style={gstyles.headerProfileLabel}>{this.state.languagesData.NEARBYSTORE_HeaderText}</Text>
                          <Text style={gstyles.headerRightButton}></Text>
                         
          </View>
          
            {this.state.error ? <Text style={gstyles.textLeft}>Error: {this.state.error}</Text> : null}
         
          <ScrollView>
                { 
                  this.state.isLoading ?  <View style={gstyles.loading}><ActivityIndicator color='#333' size="large" style={{height:100,width:'30%'}}/></View> :
                  <View>
                    {this.renderItems()}
                    </View>
                }
          </ScrollView>
           
      </View>
    );
  }
}
const styles  = StyleSheet.create({
    flatlist:{backgroundColor: '#fff', flexDirection: 'row', borderColor:'#adadad',borderBottomWidth:1},
})


 // <Text style={[gstyles.lowestPriceSubTitle,gstyles.textRed,gstyles.marginBottom10]}>Total Save : {value.totalSave}</Text> 
// <MapView style={styles.map} initialRegion={{
//                latitude: 24.7136,
//                 longitude: 46.6753,
//                latitudeDelta: 1,
//                longitudeDelta: 1
//               }}>
          
//               {!!this.state.latitude && !!this.state.longitude && <Marker
//                  coordinate={{"latitude":this.state.latitude,"longitude":this.state.longitude}}
//                  title={"Your Location"}
//                />}
//                {  
//                 this.state.isLoading ?  <View style={gstyles.loading}><ActivityIndicator color='#333' size="large" style={{height:100,width:'30%'}}/></View> :
//                 <View>
//                     {
//                       this.state.fieldValues.map((marker,index) => (
//                         <Marker
//                           key={index}
//                           coordinate={{latitude:marker.latitude,longitude:marker.longitude}}
//                           calloutOffset={{ x: -8, y: 28 }}
//                               calloutAnchor={{ x: 0.5, y: 0.4 }}
//                         >
                          
//                           <Callout tooltip  style={{alignItems:'center'}}>
//                             <View style={{alignSelf: 'flex-start',}}>
//                             <View style={{width:window.width-40,flexDirection: 'row', alignSelf: 'flex-start',backgroundColor:'#fff',borderRadius: 6,borderColor: '#007a87',borderWidth: 0.5, padding:10}}>
//                               <View  style={{flex:1}}>
//                               <Text style={{color:'#000',fontSize:20,fontWeight:'bold',textAlign:'center',marginBottom:3}}>{marker.title}</Text>
//                               <Text style={{color:'#000',fontSize:18,textAlign:'center',marginBottom:3}}>{marker.branch}</Text>
//                               <TouchableOpacity style={{alignItems:'center'}} onPress={()=>this.getLocation()}><Text style={{color:'#fff',paddingTop:5,paddingBottom:5,paddingLeft:15,paddingRight:15,backgroundColor:'#007a87',fontSize:18,margin:5}}>Directions</Text></TouchableOpacity>
//                               </View>
//                             </View>
//                             </View>
//                           </Callout>
                          
//                         </Marker>
//                     ))}
//                   </View>
//                 }
//            </MapView>
 // <View style={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
              // <Text>Latitude: {this.state.latitude}</Text>
              // <Text>Longitude: {this.state.longitude}</Text>
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
  Alert

} from 'react-native';
import {gstyles} from '../../GlobalStyles';
// import MapView from 'react-native-maps';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import CheckBox from 'react-native-checkbox';
import Permissions from 'react-native-permissions'
// import { DrawerActions } from 'react-navigation';
// import MapView, { ProviderPropType, Marker,Callout, AnimatedRegion } from 'react-native-maps';
import ModalDropdown from 'react-native-modal-dropdown';
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
      // gpsLoading:true,
      photoPermission:''
    };
   
  }
  fetchValues(){
    let wishlist_id = this.props.navigation.state.params.wishlist_id;
     fetch('wffer.com/se/api/rest/listings/wishlist/get-nearby-store-price/'+wishlist_id+'?oauth_consumer_key=mji82teif5e8aoloye09fqrq3sjpajkk&oauth_consumer_secret=aoxhigoa336wt5n26zid8k976v9pwipe&latitude='+this.state.latitude+'&longitude='+this.state.longitude,{
              method:'GET'
        })
        .then((response) => response.json())
        .then((responseJson) => {
          // alert(JSON.stringify(responseJson))
          if(responseJson.status_code=='200'){
             this.setState({
                fieldValues: responseJson.body,
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
   _alertForPhotosPermission() {
    Alert.alert(
          'Can we access your location?',
          [
            {
              text: 'No way',
              onPress: () => console.log('Permission denied'),
              style: 'cancel',
            },
            this.state.photoPermission == 'undetermined'
              ? { text: 'OK', onPress: this._requestPermission() }
              : { text: 'Open Settings', onPress: Permissions.openSettings },
          ],
        )
      }

    _requestPermission = () => {
          Permissions.request('location').then(response => {
            // Returns once the user has chosen to 'allow' or to 'not allow' access
            // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
            this.setState({ photoPermission: response })
          })
        }
  componentDidMount() {
    // navigator.geolocation.requestAuthorization()
    Permissions.check('location', { type: 'always' }).then(response => {
      // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
      this.setState({ photoPermission: response })
      if(this.state.photoPermission != 'authorized'){
        alert('Permission');
        this._alertForPhotosPermission()
        
      }
    })
  
   
    navigator.geolocation.getCurrentPosition(
       (position) => {
         console.log("wokeeey");
         // alert(position);
         this.setState({
           latitude: position.coords.latitude,
           longitude: position.coords.longitude,
           error: null,
           // gpsLoading:false,
         });
         
          this.fetchValues();
       },
       (error) => {this.setState({ error: error.message });
      
          // this.props.navigation.goBack();
     },
       { enableHighAccuracy: false, timeout: 50000, maximumAge: 1000 },

     );
   }
   renderItems(){
    return Object.entries(this.state.fieldValues).map(([key, value]) => {  
    console.log(`${key} ${value.productAvailable}`);  
        return ( 
                <TouchableOpacity onPress={()=>{this.props.navigation.push('StoreProfile',{wishlist_id:this.props.navigation.state.params.wishlist_id,store_id:value.wheretobuy_id,store_name:value.title})}} style={styles.flatlist}>
                  <View style={gstyles.lowestPriceLeftBox}>
                    <View style={gstyles.width90}>
                        <Image source={{uri : value.photoSrc}} style={gstyles.lowestPriceImage} resizeMode="contain"/>          
                    </View>
                  </View>
                  <View style={gstyles.lowestPriceRightBox}>
                        <View style={gstyles.lowestPriceRightInner}>
                          <View style={gstyles.lowestPriceRightInnerBox}>
                                <Text style={gstyles.lowestPriceTitle}>{value.title}</Text>
                                <Text style={gstyles.lowestPriceSubTitle}>Products Available {value.productAvailable}</Text>
                                <Text style={[gstyles.lowestPriceSubTitle,gstyles.textRed]}>Total Price : {value.indivisualSum}</Text>  
                                <Text style={[gstyles.lowestPriceSubTitle,gstyles.textRed,gstyles.marginBottom10]}>Total Save : {value.totalSave}</Text>  
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
                          <TouchableOpacity onPress={() => this.props.navigation.openDrawer()} style={gstyles.headerMenuButton}>
                            <Icon name="bars" size={24} color="#fff" />
                          </TouchableOpacity>
                          <Text style={gstyles.headerProfileLabel}>Price Comparison</Text>
                          <Text style={gstyles.headerRightButton}></Text>
                         
          </View>
          
            {this.state.error ? <Text>Error: {this.state.error}</Text> : null}
         
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
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    // position: 'absolute',
    // top: 0,
    // left: 0,
    // right: 0,
    // bottom: 0,
    width:'100%',
    height:window.height
  },
    flatlist:{backgroundColor: '#fff', flexDirection: 'row', borderColor:'#adadad',borderBottomWidth:1},
    flatimage:{marginTop:'15%', marginBottom:'10%', marginLeft: '5%', width: '100%', height: 100},
    title:{fontSize: 18, marginTop: '10%',color:'#000',fontWeight:'bold'},
    subtitle:{color: '#000', marginTop: '3%', fontSize: 18},
    discountDeal:{color: '#ff0000', marginTop: '3%', fontSize: 18},
    qtyView:{flexDirection: 'row',borderWidth: 1,borderColor:'#adadad',width:100,height:30,},
    qtybuttonDecrease:{width:28,borderRightWidth:1,borderColor:'#adadad'},
    qtybuttonIncrease:{width:28,borderLeftWidth:1,borderColor:'#adadad'},
    qtyText:{width:40,textAlign:'center',fontSize: 14,textAlign:'center', color: 'rgb(147, 198, 87)', marginTop: '5%',borderColor:'#adadad'},
    subTotal:{fontSize: 18,flexDirection:'column',width:'50%',color:'rgb(113,113,113)',paddingLeft:12},
    subTotalAmount:{fontSize: 18,flexDirection:'column',width:'50%',textAlign:'right',color:'rgb(113,113,113)',fontWeight:'bold',paddingRight:10},
    itemTotal:{fontSize: 18,flexDirection:'column',width:'50%',color:'#000'},
    itemTotalRight:{fontSize: 18,flexDirection:'column',width:'50%',textAlign:'right',color:'#000'},
    itemTotalRightIcon:{fontSize: 18,flexDirection:'column',width:'50%',textAlign:'right'},
    orderTotalAmount:{fontSize: 18,flexDirection:'column',width:'50%',textAlign:'right',color:'#000',fontWeight:'bold'}
})

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
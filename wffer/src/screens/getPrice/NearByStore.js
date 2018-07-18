import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Dimensions,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Image
} from 'react-native';
import {gstyles} from '../../GlobalStyles';
// import MapView from 'react-native-maps';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import CheckBox from 'react-native-checkbox';
// import { DrawerActions } from 'react-navigation';
import MapView, { ProviderPropType, Marker,Callout, AnimatedRegion } from 'react-native-maps';
import ModalDropdown from 'react-native-modal-dropdown';
const window= Dimensions.get('window');
export  class NearByStoreComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      latitude: null,
      longitude: null,
      error:null,
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
       (position) => {
         console.log("wokeeey");
         console.log(position);
         this.setState({
           latitude: position.coords.latitude,
           longitude: position.coords.longitude,
           error: null,
         });
       },
       (error) => this.setState({ error: error.message }),
       { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
     );
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
          <View style={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Latitude: {this.state.latitude}</Text>
            <Text>Longitude: {this.state.longitude}</Text>
            {this.state.error ? <Text>Error: {this.state.error}</Text> : null}
          </View>
           <MapView style={styles.map} initialRegion={{
               latitude: 24.7136,
                longitude: 46.6753,
               latitudeDelta: 1,
               longitudeDelta: 1
              }}>
          
              {!!this.state.latitude && !!this.state.longitude && <MapView.Marker
                 coordinate={{"latitude":this.state.latitude,"longitude":this.state.longitude}}
                 title={"Your Location"}
               />}

           </MapView>
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

 // <FlatList data={[{id: '1',productsAvailable:'5/3',company:'Danube',totalPrice:'45.40 SAR',totalSave:'5.98 SAR',image:require('../../../assets/so-danube.png')},{id: '2',productsAvailable:'5/5',company:'Panda',totalPrice:'42.59 SAR',totalSave:'4.77 SAR',image:require('../../../assets/so-panda.png')},{id: '3',productsAvailable:'2/5',company:'Careefour',totalPrice:'41.70 SAR',totalSave:'3.12 SAR',image:require('../../../assets/so-carrefour.png')},{id: '4',productsAvailable:'5/5',company:'Tamimi',totalPrice:'49.40 SAR',totalSave:'5.98 SAR',image:require('../../../assets/so-tamimi.png')}]}
 //                        renderItem={({item}) =>      
 //                                <View style={styles.flatlist}>
 //                              <View style={{flexDirection: 'column',width:'30%'}}>
 //                                <View style={{width: '90%'}}>
 //                                  <TouchableOpacity  onPress={()=>this.props.navigation.navigate('ProductDetails')}>
 //                                    <Image source={item.image} style={styles.flatimage} resizeMode="contain"/>
 //                                  </TouchableOpacity>
 //                                </View>
 //                               </View>
 //                              <View style={{flexDirection: 'column',width:'70%'}}>
 //                              <View style={{flexDirection:'row',width:'100%'}}>
 //                                <View style={{flexDirection: 'column',width:'90%'}}>
 //                                      <Text style={styles.title}>{item.company}</Text>
 //                                      <Text style={styles.subtitle}>Products Available {item.productsAvailable}</Text>
 //                                      <Text style={styles.discountDeal}>Total Price : {item.totalPrice}</Text>  
 //                                      <Text style={styles.discountDeal}>Total Save : {item.totalSave}</Text>  
 //                          </View> 
 //                          <View style={{flexDirection: 'column',width:'10%'}}>
 //                              <Icon name="angle-right" size={40} color='#000' style={{marginTop:40}} />
 //                          </View>
 //                        </View>                      
 //                              </View>
 //                          </View>
 //                              }
 //                          keyExtractor={(item, index) => index.toString()}
 //                        />
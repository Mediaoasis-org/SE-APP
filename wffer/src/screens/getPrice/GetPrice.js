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
import { DrawerActions } from 'react-navigation';
// import ModalDropdown from 'react-native-modal-dropdown';

const window= Dimensions.get('window');
export  class GetPriceComponent extends Component {
	render(){
    return(
      <View style={gstyles.container}>
          <View style={gstyles.headerMenu}>
                <TouchableOpacity onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())} style={gstyles.headerMenuButton}>
                  <Icon name="bars" size={24} color="#fff" />
                </TouchableOpacity>
                 <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={gstyles.headerBackButton}>
                  <Icon name="angle-left" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={gstyles.headerProfileLabel}>Get Price</Text>
          </View>
          <View>
                <TouchableOpacity style={styles.flatlist}><Text style={styles.title}>Lowest Price</Text><Text style={styles.rightButton}><Icon name="angle-right" size={24} color="#000" /></Text></TouchableOpacity>
                <TouchableOpacity style={styles.flatlist}><Text style={styles.title}>NearBy Store</Text><Text style={styles.rightButton}><Icon name="angle-right" size={24} color="#000" /></Text></TouchableOpacity>
                <TouchableOpacity style={styles.flatlist} onPress={()=>this.props.navigation.push('MultiStore')}><Text style={styles.title}>Multiple Store</Text><Text style={styles.rightButton}><Icon name="angle-right" size={24} color="#000" /></Text></TouchableOpacity>
          </View>
      </View>
    );
  }
}
const styles  = StyleSheet.create({
    flatlist:{backgroundColor: '#fff',borderBottomColor:'grey',borderBottomWidth:0.5,flexDirection:'row'},
    title:{fontSize: 18,padding:15,color:'#000',fontWeight:'bold',width:'90%'},
    rightButton:{padding:15,width:'10%'},

})



// // <FlatList data={[{id: '1',productsAvailable:'5/3',company:'Danube',totalPrice:'45.40 SAR',totalSave:'5.98 SAR',image:require('../../../assets/so-danube.png')},{id: '2',productsAvailable:'5/5',company:'Panda',totalPrice:'42.59 SAR',totalSave:'4.77 SAR',image:require('../../../assets/so-panda.png')},{id: '3',productsAvailable:'2/5',company:'Careefour',totalPrice:'41.70 SAR',totalSave:'3.12 SAR',image:require('../../../assets/so-carrefour.png')},{id: '4',productsAvailable:'5/5',company:'Tamimi',totalPrice:'49.40 SAR',totalSave:'5.98 SAR',image:require('../../../assets/so-tamimi.png')}]}
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
import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';
import {gstyles} from '../../GlobalStyles';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
export  class GetPriceComponent extends Component {
  constructor(props){
    super(props);
    this.state={
      languagesData:[],
            language : '',
    }
    this._getStorageValue();
  }
  async _getStorageValue(){
    var languageData = await AsyncStorage.getItem('languageData');
        const Datalang = JSON.parse(languageData);
        const lang = await AsyncStorage.getItem('languageinfo');
        this.setState({language:lang})
        // alert(this.state.language);
        this.setState({languagesData : Datalang[lang]})
    }
	render(){
    // alert(this.props.navigation.state.params.wishlist_id)
    return(
      <View style={gstyles.container}>
          <View style={gstyles.headerMenu}>
                <TouchableOpacity onPressIn={() => this.props.navigation.goBack()} style={gstyles.headerMenuButton}>
                  <Icon name="angle-left" size={26} color="#fff" />
                </TouchableOpacity>
                <Text style={gstyles.headerProfileLabel}>{this.state.languagesData.GETPRICE_HeaderText}</Text>
                <Text style={gstyles.headerRightButton}></Text>
          </View>
          <View>
                <TouchableOpacity style={gstyles.flatlist} onPress={()=>{this.props.navigation.push('Lowest',{wishlist_id:this.props.navigation.state.params.wishlist_id})}}><Text style={[gstyles.tellFriendTitle,gstyles.textLeft]}>{this.state.languagesData.GETPRICE_LowestPriceTitle}</Text><Text style={[gstyles.rightButton,{textAlign:this.state.language == 'en' ? 'left' : 'right'}]}><Icon name="angle-right" size={24} color="#000" /></Text></TouchableOpacity>
                <TouchableOpacity style={gstyles.flatlist} onPress={()=>{this.props.navigation.push('NearByStore',{wishlist_id:this.props.navigation.state.params.wishlist_id})}}><Text style={[gstyles.tellFriendTitle,gstyles.textLeft]} >{this.state.languagesData.GETPRICE_NearByTitle}</Text><Text style={[gstyles.rightButton,{textAlign:this.state.language == 'en' ? 'left' : 'right'}]}><Icon name="angle-right" size={24} color="#000" /></Text></TouchableOpacity>
                
          </View>
      </View>
    );
  }
}



// <TouchableOpacity style={gstyles.flatlist} onPress={()=>{this.props.navigation.push('MultiStore',{wishlist_id:this.props.navigation.state.params.wishlist_id})}}><Text style={gstyles.tellFriendTitle}>Multiple Store</Text><Text style={gstyles.rightButton}><Icon name="angle-right" size={24} color="#000" /></Text></TouchableOpacity>
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
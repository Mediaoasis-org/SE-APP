import React, { Component } from 'react';
import { Text, View, Dimension, TouchableOpacity,Image,FlatList,ScrollView,StyleSheet} from 'react-native';
import {gstyles} from '../../GlobalStyles';
import { SafeAreaView} from 'react-navigation';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

export class ProductDetail extends React.Component{
  constructor(props) {
      super(props);
      this.state = {
       
      }
      // alert(JSON.stringify(this.props.navigation));
    }

  render(){
      return(
        <View style={{width:'100%',flexDirection:'row',backgroundColor: '#fff'}}>
              <View style={{flexDirection: 'column'}}>
                  <View style={{width: '90%'}}><Image source={require('../../../assets/product1.jpg')} style={{marginTop:'15%', marginBottom:'10%', marginLeft: '5%', width: '10%', width: 115, height: 115}}/></View>
              </View>
              <View style={{flexDirection: 'column'}}>
                  <View style={{width: '80%'}}><Text style={{fontSize: 18, marginTop: '10%',color:'#000'}}>Nakhlatain Vegetable Oil 1.8 L</Text></View>
                  <View style={{flexDirection: 'row',marginTop: '10%',}}> 
                     <Text style={{ fontSize: 15, color: '#000', paddingRight:10, paddingTop:3}}>Qty</Text>
                    
                <View style={{flexDirection: 'row',borderWidth: 1,borderColor:'#adadad',width:100,height:30,}}>    
                     <TouchableHighlight 
                        onPress={() => this.decrease_qty(this.state.qty)}
                         underlayColor='#BEBEBE' style={{width:28,borderRightWidth:1,borderColor:'#adadad'}}>
                         <Image source={require('../../../assets/qtyDecrease.png')} style={gstyles.menuicon} resizeMode="contain" />
                      </TouchableHighlight>
                      <Text style={{width:40,textAlign:'center',fontSize: 14,textAlign:'center', color: 'rgb(147, 198, 87)', marginTop: '5%',borderColor:'#adadad'}}>{this.state.qty}</Text>
                     <TouchableHighlight 
                        onPress={() => this.increase_qty(this.state.qty)}
                         underlayColor='#BEBEBE' style={{width:28,borderRightWidth:1,borderColor:'#adadad'}}>
                         <Image source={require('../../../assets/qtyIncrease.png')} style={gstyles.menuicon} resizeMode="contain" />
                      </TouchableHighlight>
               </View>

                    
              
                  </View>
                  <View style={{width: '80%',flexDirection:'row',marginTop: '5%'}}><Text>0 likes</Text><Text> - </Text><Text>23 Views</Text></View>
              </View>
        </View>
        )
      }
  }

 
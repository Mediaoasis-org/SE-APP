import React, { Component } from 'react';
import { Text, View, TouchableOpacity,Image,ScrollView,TouchableHighlight} from 'react-native';
import {gstyles} from '../../GlobalStyles';

export class ProductDetail extends React.Component{
  constructor(props) {
      super(props);
      this.state = {
       qty:1,
      }
      // alert(JSON.stringify(this.props.navigation));
    }
  decrease_qty(qty){
    // alert(qty)
    if(parseInt(qty)!=1){
     qty=parseInt(qty)-1; 
    }
    this.setState({qty:qty});
  }
   increase_qty(qty){
      // alert(id)
      
      qty=parseInt(qty)+1; 
      // alert(qty)
      this.setState({qty:qty});
   }
  render(){
      return(
        <View>
          <View style={{width:'100%',flexDirection:'row',backgroundColor: '#fff'}}>
                <View style={{flexDirection: 'column',width: '30%'}}>
                    
                      <Image source={require('../../../assets/product1.jpg')} style={{marginTop:'15%', marginBottom:'10%', marginLeft: '5%', width: '10%', width: '90%', height: 115}}/>
                    
                </View>
                <View style={{flexDirection: 'column',width: '70%'}}>
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
                                 underlayColor='#BEBEBE' style={{width:28,borderLeftWidth:1,borderColor:'#adadad'}}>
                                 <Image source={require('../../../assets/qtyIncrease.png')} style={gstyles.menuicon} resizeMode="contain" />
                              </TouchableHighlight>
                       </View>

                      
                
                    </View>
                <View style={{width: '80%',flexDirection:'row',marginTop: '5%'}}><Text>0 likes</Text><Text> - </Text><Text>23 Views</Text></View>
              </View>

          </View>
          <View style={{flexDirection:'row',width:'100%'}}>
              <TouchableOpacity style={gstyles.likeButton}>
                  <Text style={{textAlign:'center'}}>Like</Text>
              </TouchableOpacity>
              <TouchableOpacity style={gstyles.likeButton}>
                  <Text style={{textAlign:'center'}}>Add to Shopping List</Text>
              </TouchableOpacity>
          </View>
        </View>
        )
      }
  }

 
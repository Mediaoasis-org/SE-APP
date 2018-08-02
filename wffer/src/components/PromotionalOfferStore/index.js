import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Image,
  Text,
  Dimensions
} from 'react-native';
import { gstyles } from '../../GlobalStyles';
const window = Dimensions.get('window')
export class PromotionalOfferStoreComponent extends React.Component{
  constructor(props) {
      super(props);
      console.log(JSON.stringify(this.props.data))
    }
  render(){
      return(
        <View>
          <View style={gstyles.OfferHeadingsHome}><Text style={gstyles.fontSize18}>Promotional Offers in Stores</Text></View>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} alwaysBounce={true} scrollEventThrottle={16} style={gstyles.promotionalOfferView}>
            {
              this.props.data.map((item,index)=>{

                return(
                    <View key={index}>
                      <Image source={{uri:item.image}}  style={{width:window.width/2,height:70,margin:5}} resizeMode="stretch"/>
                    </View>
                )
              })
            
            }
           
          </ScrollView>
        </View>
        )
      }
  }
import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Image,
  Text,
} from 'react-native';
import { gstyles } from '../../GlobalStyles';

export class PromotionalOfferStoreComponent extends React.Component{
  constructor(props) {
      super(props);
    }
  render(){
      return(
        <View>
          <View style={gstyles.OfferHeadingsHome}><Text style={gstyles.fontSize18}>Promotional Offers in Stores</Text></View>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} alwaysBounce={true} scrollEventThrottle={16} style={gstyles.promotionalOfferView}>
            <Image source={require("../../../assets/so-carrefour.png")}  style={gstyles.margin5}/>
            <Image source={require("../../../assets/so-danube.png")}  style={gstyles.margin5} />
            <Image source={require("../../../assets/so-othaim.png")}  style={gstyles.margin5}/>
            <Image source={require("../../../assets/so-panda.png")} style={gstyles.margin5}/>
            <Image source={require("../../../assets/so-tamimi.png")} style={gstyles.margin5} />
          </ScrollView>
        </View>
        )
      }
  }
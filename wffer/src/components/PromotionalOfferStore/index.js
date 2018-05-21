import React, { Component } from 'react';
import {
  TextInput,
  View,
  TouchableOpacity,
  Platform,
  ScrollView,
  Image,
  Text,
} from 'react-native';
import { gstyles } from '../../GlobalStyles';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
export class PromotionalOfferStoreComponent extends React.Component{
  constructor(props) {
      super(props);
      // alert(JSON.stringify(this.props.navigation));
    }

  render(){
      return(
        <View>
          <View style={{borderBottomWidth:1,borderBottomColor:'#FFC107',padding:10,marginTop:10,backgroundColor:'#e9ebee'}}><Text style={{fontSize:18}}>Promotional Offers in Stores</Text></View>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={true} alwaysBounce={true} scrollEventThrottle={16}>
            <Image source={require("../../../assets/so-carrefour.png")}  />
            <Image source={require("../../../assets/so-danube.png")}  />
            <Image source={require("../../../assets/so-othaim.png")} />
            <Image source={require("../../../assets/so-panda.png")} />
            <Image source={require("../../../assets/so-tamimi.png")} />
          </ScrollView>
        </View>
        )
      }
  }
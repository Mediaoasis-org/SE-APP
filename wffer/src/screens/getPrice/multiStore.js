import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image
} from 'react-native';
import {gstyles} from '../../GlobalStyles';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import CheckBox from 'react-native-checkbox';

export  class MultiStoreComponent extends Component {
  constructor(props){
    super(props);
    this.state={
        selectedCheckboxId:[],
    }
  }
  onCheckBoxPress(id){
      // alert('checkbox Pressed')
      // let tmp = this.state.selectedCheckboxId;

      // if ( tmp.includes( id ) ) {
      //   tmp.splice( tmp.indexOf(id), 1 );
      // } else {
      //   tmp.push( id );
      // }

      // this.setState({
      //   selectedCheckboxId: tmp
      // });
      
  }
  SavePersonalInfo(){
    alert('Check Price');
  }
	render(){
		return(
			<View style={gstyles.flexContainer}>
          <View style={gstyles.headerMenu}>
                <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={gstyles.headerMenuButton}>
                  <Icon name="angle-left" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={gstyles.headerProfileLabel}>Multi Store</Text>
                <Text style={gstyles.headerRightButton}></Text>
          </View>
          <ScrollView >
              <View style={gstyles.multistoreView}>
                  <View style={gstyles.multistoreLeftView}>
                      <View style={gstyles.multistoreRightInnerView}>
                        <Image source={require("../../../assets/so-carrefour.png")} resizeMode="contain"  style={gstyles.lowestPriceLeftBox}/>
                        <View style={[gstyles.lowestPriceRightBox,{paddingLeft:10}]}>
                            <Text style={gstyles.multistoreTitle}>Carrefour</Text>
                            <Text style={gstyles.multistoreAddress}>Lorem ipsum dolor sit amet, consectetur adipisicing elit</Text>
                        </View>
                      </View>
                  </View>
                  <View style={gstyles.multistoreRightView}><CheckBox label=''onChange={()=>this.onCheckBoxPress(1)} /></View>
              </View>

              <View style={gstyles.multistoreView}>
                  <View style={gstyles.multistoreLeftView}>
                      <View style={gstyles.multistoreRightInnerView}>
                        <Image source={require("../../../assets/so-danube.png")} resizeMode="contain"  style={gstyles.lowestPriceLeftBox}/>
                        <View style={[gstyles.lowestPriceRightBox,{paddingLeft:10}]}>
                            <Text style={gstyles.multistoreTitle}>Danube</Text>
                            <Text style={gstyles.multistoreAddress}>Lorem ipsum dolor sit amet, consectetur adipisicing elit</Text>
                        </View>
                      </View>
                  </View>
                  <View style={gstyles.multistoreRightView}><CheckBox label=''onChange={()=>this.onCheckBoxPress(1)} /></View>
              </View>

               <View style={gstyles.multistoreView}>
                  <View style={gstyles.multistoreLeftView}>
                      <View style={gstyles.multistoreRightInnerView}>
                        <Image source={require("../../../assets/so-othaim.png")} resizeMode="contain"  style={gstyles.lowestPriceLeftBox}/>
                        <View style={[gstyles.lowestPriceRightBox,{paddingLeft:10}]}>
                            <Text style={gstyles.multistoreTitle}>Othaim</Text>
                            <Text style={gstyles.multistoreAddress}>Lorem ipsum dolor sit amet, consectetur adipisicing elit</Text>
                        </View>
                      </View>
                  </View>
                  <View style={gstyles.multistoreRightView}><CheckBox label=''onChange={()=>this.onCheckBoxPress(1)} /></View>
              </View>

               <View style={gstyles.multistoreView}>
                  <View style={gstyles.multistoreLeftView}>
                      <View style={gstyles.multistoreRightInnerView}>
                        <Image source={require("../../../assets/so-panda.png")} resizeMode="contain"  style={gstyles.lowestPriceLeftBox}/>
                        <View style={[gstyles.lowestPriceRightBox,{paddingLeft:10}]}>
                            <Text style={gstyles.multistoreTitle}>Pando</Text>
                            <Text style={gstyles.multistoreAddress}>Lorem ipsum dolor sit amet, consectetur adipisicing elit</Text>
                        </View>
                      </View>
                  </View>
                  <View style={gstyles.multistoreRightView}><CheckBox label=''onChange={()=>this.onCheckBoxPress(1)} /></View>
              </View>

               <View style={gstyles.multistoreView}>
                  <View style={gstyles.multistoreLeftView}>
                      <View style={gstyles.multistoreRightInnerView}>
                        <Image source={require("../../../assets/so-tamimi.png")} resizeMode="contain"  style={gstyles.lowestPriceLeftBox}/>
                        <View style={[gstyles.lowestPriceRightBox,{paddingLeft:10}]}>
                            <Text style={gstyles.multistoreTitle}>Tamimi</Text>
                            <Text style={gstyles.multistoreAddress}>Lorem ipsum dolor sit amet, consectetur adipisicing elit</Text>
                        </View>
                      </View>
                  </View>
                  <View style={gstyles.multistoreRightView}><CheckBox label=''onChange={()=>this.onCheckBoxPress(1)} /></View>
              </View>

              <TouchableOpacity onPress={()=>this.SavePersonalInfo()} style={[gstyles.buttonView,{backgroundColor:'#00BCD4'}]}><Text style={[gstyles.buttonText,{fontSize:18}]}>Check Price</Text></TouchableOpacity>
            
          </ScrollView>
        </View>

		);
	}
}
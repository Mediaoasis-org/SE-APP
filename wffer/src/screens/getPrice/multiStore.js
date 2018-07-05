import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Image
} from 'react-native';
import {gstyles} from '../../GlobalStyles';
// import MapView from 'react-native-maps';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import CheckBox from 'react-native-checkbox';
import { DrawerActions } from 'react-navigation';
import ModalDropdown from 'react-native-modal-dropdown';
const window= Dimensions.get('window');
export  class MultiStoreComponent extends Component {
  constructor(props){
    super(props);
    this.state={
        selectedCheckboxId:[],
    }
  }
  onCheckBoxPress(id) {
      // alert(id)
      let tmp = this.state.selectedCheckboxId;

      if ( tmp.includes( id ) ) {
        tmp.splice( tmp.indexOf(id), 1 );
      } else {
        tmp.push( id );
      }

      this.setState({
        selectedCheckboxId: tmp
      });
      // console.log(this.state.selectedCheckboxId)
  }
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
                          <Text style={gstyles.headerProfileLabel}>Multi Store</Text>
          </View>
          <ScrollView>
              <View style={styles.flatlist}>
                  <Text style={styles.title}>Danube</Text>
                  <View style={styles.rightButton}><CheckBox  label=' ' onChange={()=>this.onCheckBoxPress(1)} /></View>
              </View>
              <View style={styles.flatlist}>
                  <Text style={styles.title}>Danube</Text>
                  <View style={styles.rightButton}><CheckBox  label=' ' onChange={()=>this.onCheckBoxPress(1)} /></View>
              </View>
              <View style={styles.flatlist}>
                  <Text style={styles.title}>Danube</Text>
                  <View style={styles.rightButton}><CheckBox  label=' ' onChange={()=>this.onCheckBoxPress(1)} /></View>
              </View>
              <TouchableOpacity onPress={()=>this.SavePersonalInfo()} style={[gstyles.buttonView,{backgroundColor:'#00BCD4'}]}><Text style={[gstyles.buttonText,{fontSize:18}]}>Check Price</Text></TouchableOpacity>
            
          </ScrollView>
        </View>

		);
	}
}

const styles  = StyleSheet.create({
    flatlist:{backgroundColor: '#fff',borderBottomColor:'grey',borderBottomWidth:0.5,flexDirection:'row'},
    title:{fontSize: 18,padding:20,color:'#000',fontWeight:'bold',width:'85%'},
    rightButton:{padding:20,width:'15%'},

})
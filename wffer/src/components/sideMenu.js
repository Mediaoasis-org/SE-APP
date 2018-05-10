import React, { Component } from 'react';
import {
  Text,
  View,
  Dimension,
TouchableOpacity,
Image,
FlatList,
ScrollView
} from 'react-native';
import {gstyles} from '../GlobalStyles';
import { SafeAreaView} from 'react-navigation';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
export class DrawerTitle extends React.Component{
  constructor(props) {
      super(props);
      this.state = {
        open:false,
        activeIndex:0,
        dataSource:[],
      }
      // alert(JSON.stringify(this.props.navigation));
    }

  render(){
      return(
        <ScrollView style={{backgroundColor:'#fff',paddingTop:15,paddingBottom:15}}>
        	<SafeAreaView>
        		<View>
  	      		<Text style={gstyles.drawertitleHeadingText}>Menu</Text>
  	      		<View style={gstyles.drawerView}><Text style={gstyles.drawertitleNormalText}><Icon name="home" size={24} color="#febe2b" />  Home</Text></View>
  	      		<View style={gstyles.drawerView}><Image source={require('../../assets/switch_lang.png')} style={gstyles.drawerImage}/><Text style={gstyles.drawertitleNormalText}> Language</Text></View>
        		</View>

        		<View>
  	      		<Text style={gstyles.drawertitleHeadingText}> Shopping</Text>
  	      		<View style={gstyles.drawerView}><Image source={require('../../assets/all-category.png')} style={gstyles.drawerImage}/><Text style={gstyles.drawertitleNormalText}> Catalog</Text></View>
  	      		<View style={gstyles.drawerView}><Image source={require('../../assets/shopping-basket.png')} style={gstyles.drawerImage}/><Text style={gstyles.drawertitleNormalText}> My Shopping List</Text></View>
  	      		<View style={gstyles.drawerView}><Image source={require('../../assets/create-list1-c.png')} style={gstyles.drawerImage}/><Text style={gstyles.drawertitleNormalText}> Create New List</Text></View>
  	      		<View style={gstyles.drawerView}><Image source={require('../../assets/tag-c.png')} style={gstyles.drawerImage}/><Text style={gstyles.drawertitleNormalText}> Special Offer</Text></View>
  	      		<View style={gstyles.drawerView}><Image source={require('../../assets/store-locator-c.png')} style={gstyles.drawerImage}/><Text style={gstyles.drawertitleNormalText}> Store Locator</Text></View>
        		</View>

        		<View>
            <Text style={gstyles.drawertitleHeadingText}>Categories</Text>
  	      		<View style={gstyles.drawerView}><Image source={require('../../assets/all-category.png')} style={gstyles.drawerImage}/><Text style={gstyles.drawertitleNormalText}> All Categories</Text></View>
  	      		<View style={gstyles.drawerView}><Image source={require('../../assets/bakery-c.png')} style={gstyles.drawerImage}/><Text style={gstyles.drawertitleNormalText}> All Food and Bakery</Text></View>
  	      		<View style={gstyles.drawerView}><Image source={require('../../assets/beverages-c.png')} style={gstyles.drawerImage}/><Text style={gstyles.drawertitleNormalText}> Beverages</Text></View>
  	      		<View style={gstyles.drawerView}><Image source={require('../../assets/canned-c.png')} style={gstyles.drawerImage}/><Text style={gstyles.drawertitleNormalText}> Canned and Jarred Food</Text></View>
  	      		<View style={gstyles.drawerView}><Image source={require('../../assets/cleaner-c.png')} style={gstyles.drawerImage}/><Text style={gstyles.drawertitleNormalText}> Cleaner</Text></View>
  	      		<View style={gstyles.drawerView}><Image source={require('../../assets/dairy-c.png')} style={gstyles.drawerImage}/><Text style={gstyles.drawertitleNormalText}> Diary</Text></View>
  	      		<View style={gstyles.drawerView}><Image source={require('../../assets/baking-c.png')} style={gstyles.drawerImage}/><Text style={gstyles.drawertitleNormalText}> Dry Backing Food</Text></View>
  	      		<View style={gstyles.drawerView}><Image source={require('../../assets/frozen-c.png')} style={gstyles.drawerImage}/><Text style={gstyles.drawertitleNormalText}> Frozen Goods</Text></View>
  	      		<View style={gstyles.drawerView}><Image source={require('../../assets/grocery-c.png')} style={gstyles.drawerImage}/><Text style={gstyles.drawertitleNormalText}> Grocerry</Text></View>
  	      		<View style={gstyles.drawerView}><Image source={require('../../assets/dispo-c.png')} style={gstyles.drawerImage}/><Text style={gstyles.drawertitleNormalText}> Paper Disposable</Text></View>
  	      		<View style={gstyles.drawerView}><Image source={require('../../assets/personal-c.png')} style={gstyles.drawerImage}/><Text style={gstyles.drawertitleNormalText}> Personal Care</Text></View>
        		</View>

        		<View style={{marginBottom:20}}>
  	      		<Text style={gstyles.drawertitleHeadingText}>Settings</Text>
  	      		<TouchableOpacity style={gstyles.drawerView}  onPress={() => this.props.navigation.navigate('Login')} ><Image source={require('../../assets/all-category.png')} style={gstyles.drawerImage}/><Text style={gstyles.drawertitleNormalText}> Sign In</Text></TouchableOpacity>
  	      		<TouchableOpacity style={gstyles.drawerView} onPress={() => this.props.navigation.navigate('Signup')}><Image source={require('../../assets/all-category.png')} style={gstyles.drawerImage}/><Text style={gstyles.drawertitleNormalText}> Sign Up</Text></TouchableOpacity>
        		</View>
        	</SafeAreaView>
        </ScrollView>
        )
      }
  }
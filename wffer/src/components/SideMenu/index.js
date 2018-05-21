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
import {gstyles} from '../../GlobalStyles';
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
              <TouchableOpacity style={gstyles.drawerView} onPress={()=>this.props.navigation.navigate('Profile')}><Image source={require('../../../assets/nophoto_icon.png')} style={gstyles.drawerImage}/><Text style={gstyles.drawertitleNormalText}> Profile</Text></TouchableOpacity>
  	      		<TouchableOpacity style={gstyles.drawerView} onPress={()=>this.props.navigation.navigate('Home')}><Text style={gstyles.drawertitleNormalText}><Icon name="home" size={24} color="#febe2b" />  Home</Text></TouchableOpacity>
  	      		<TouchableOpacity style={gstyles.drawerView} onPress={()=>this.props.navigation.navigate('Language')}><Image source={require('../../../assets/switch_lang.png')} style={gstyles.drawerImage}/><Text style={gstyles.drawertitleNormalText}> Language</Text></TouchableOpacity>
        		</View>

        		<View>
  	      		<Text style={gstyles.drawertitleHeadingText}> Shopping</Text>
  	      		<TouchableOpacity style={gstyles.drawerView} onPress={()=>this.props.navigation.navigate('Catalog')}><Image source={require('../../../assets/all-category.png')} style={gstyles.drawerImage}/><Text style={gstyles.drawertitleNormalText}> Catalog</Text></TouchableOpacity>
  	      		<TouchableOpacity onPress={()=>this.props.navigation.navigate('ShoppingList')} style={gstyles.drawerView}><Image source={require('../../../assets/shopping-basket.png')} style={gstyles.drawerImage}/><Text style={gstyles.drawertitleNormalText}> My Shopping List</Text></TouchableOpacity>
  	      		<TouchableOpacity onPress={()=>this.props.navigation.navigate('CreateWishlist')} style={gstyles.drawerView}><Image source={require('../../../assets/create-list1-c.png')} style={gstyles.drawerImage}/><Text style={gstyles.drawertitleNormalText}> Create New List</Text></TouchableOpacity>
  	      		<TouchableOpacity style={gstyles.drawerView} onPress={()=>this.props.navigation.navigate('SpecialOffers')}><Image source={require('../../../assets/tag-c.png')} style={gstyles.drawerImage}/><Text style={gstyles.drawertitleNormalText}> Special Offer</Text></TouchableOpacity>
  	      		<TouchableOpacity style={gstyles.drawerView} onPress={()=>this.props.navigation.navigate('StoreLocator')}><Image source={require('../../../assets/store-locator-c.png')} style={gstyles.drawerImage}/><Text style={gstyles.drawertitleNormalText}> Store Locator</Text></TouchableOpacity>
        		</View>

        		<View>
            <Text style={gstyles.drawertitleHeadingText}>Categories</Text>
  	      		<TouchableOpacity style={gstyles.drawerView} onPress={()=>{this.props.navigation.navigate('Products', {cat_name:'All Categories'})}}><Image source={require('../../../assets/all-category.png')} style={gstyles.drawerImage}/><Text style={gstyles.drawertitleNormalText}> All Categories</Text></TouchableOpacity>
  	      		<TouchableOpacity style={gstyles.drawerView} onPress={()=>{this.props.navigation.navigate('Products', {cat_name:'All Food and Baker'})}}><Image source={require('../../../assets/bakery-c.png')} style={gstyles.drawerImage}/><Text style={gstyles.drawertitleNormalText}> All Food and Bakery</Text></TouchableOpacity>
  	      		<TouchableOpacity style={gstyles.drawerView} onPress={()=>{this.props.navigation.navigate('Products', {cat_name:'Beverages'})}}><Image source={require('../../../assets/beverages-c.png')} style={gstyles.drawerImage}/><Text style={gstyles.drawertitleNormalText}> Beverages</Text></TouchableOpacity>
  	      		<TouchableOpacity style={gstyles.drawerView} onPress={()=>{this.props.navigation.navigate('Products', {cat_name:'Canned and Jarred Food'})}}><Image source={require('../../../assets/canned-c.png')} style={gstyles.drawerImage}/><Text style={gstyles.drawertitleNormalText}> Canned and Jarred Food</Text></TouchableOpacity>
  	      		<TouchableOpacity style={gstyles.drawerView} onPress={()=>{this.props.navigation.navigate('Products', {cat_name:'Cleaner'})}}><Image source={require('../../../assets/cleaner-c.png')} style={gstyles.drawerImage}/><Text style={gstyles.drawertitleNormalText}> Cleaner</Text></TouchableOpacity>
  	      		<TouchableOpacity style={gstyles.drawerView} onPress={()=>{this.props.navigation.navigate('Products', {cat_name:'Diary'})}}><Image source={require('../../../assets/dairy-c.png')} style={gstyles.drawerImage}/><Text style={gstyles.drawertitleNormalText}> Diary</Text></TouchableOpacity>
  	      		<TouchableOpacity style={gstyles.drawerView} onPress={()=>{this.props.navigation.navigate('Products', {cat_name:'Dry Baking Foods'})}}><Image source={require('../../../assets/baking-c.png')} style={gstyles.drawerImage}/><Text style={gstyles.drawertitleNormalText}> Dry Baking Food</Text></TouchableOpacity>
  	      		<TouchableOpacity style={gstyles.drawerView} onPress={()=>{this.props.navigation.navigate('Products', {cat_name:'Frozen Goods'})}}><Image source={require('../../../assets/frozen-c.png')} style={gstyles.drawerImage}/><Text style={gstyles.drawertitleNormalText}> Frozen Goods</Text></TouchableOpacity>
  	      		<TouchableOpacity style={gstyles.drawerView} onPress={()=>{this.props.navigation.navigate('Products', {cat_name:'Grocerry'})}}><Image source={require('../../../assets/grocery-c.png')} style={gstyles.drawerImage}/><Text style={gstyles.drawertitleNormalText}> Grocerry</Text></TouchableOpacity>
  	      		<TouchableOpacity style={gstyles.drawerView} onPress={()=>{this.props.navigation.navigate('Products', {cat_name:'Paper Disposable'})}}><Image source={require('../../../assets/dispo-c.png')} style={gstyles.drawerImage}/><Text style={gstyles.drawertitleNormalText}> Paper Disposable</Text></TouchableOpacity>
  	      		<TouchableOpacity style={gstyles.drawerView} onPress={()=>{this.props.navigation.navigate('Products', {cat_name:'Personal Care'})}}><Image source={require('../../../assets/personal-c.png')} style={gstyles.drawerImage}/><Text style={gstyles.drawertitleNormalText}> Personal Care</Text></TouchableOpacity>
        		</View>

        		<View style={{marginBottom:20}}>
  	      		<Text style={gstyles.drawertitleHeadingText}>Settings</Text>
              <TouchableOpacity style={gstyles.drawerView}  onPress={() => this.props.navigation.navigate('AccountSettings')} ><Icon name="cog" color="#febe2b" size={24} style={gstyles.drawerImage} /><Text style={gstyles.drawertitleNormalText}> Account Settings</Text></TouchableOpacity>
              <TouchableOpacity style={gstyles.drawerView}  onPress={() => this.props.navigation.navigate('Login')} ><Icon name="power-off" color="#febe2b" size={24} style={gstyles.drawerImage} /><Text style={gstyles.drawertitleNormalText}> Logout</Text></TouchableOpacity>
  	      		<TouchableOpacity style={gstyles.drawerView}  onPress={() => this.props.navigation.navigate('Login')} ><Image source={require('../../../assets/all-category.png')} style={gstyles.drawerImage}/><Text style={gstyles.drawertitleNormalText}> Sign In</Text></TouchableOpacity>
  	      		<TouchableOpacity style={gstyles.drawerView} onPress={() => this.props.navigation.navigate('Signup')}><Image source={require('../../../assets/all-category.png')} style={gstyles.drawerImage}/><Text style={gstyles.drawertitleNormalText}> Sign Up</Text></TouchableOpacity>
        		</View>
        	</SafeAreaView>
        </ScrollView>
        )
      }
  }
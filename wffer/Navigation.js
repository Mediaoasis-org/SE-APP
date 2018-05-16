import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View,ScrollView,Text,Image,TouchableOpacity } from 'react-native';
import { SwitchNavigator,SafeAreaView,createStackNavigator,createDrawerNavigator} from 'react-navigation';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { HomeComponent } from './src/screens/home/home';
import { LoginComponent } from './src/screens/login/login';
import { SignupComponent } from './src/screens/signUp/signup';
import { ForgetComponent } from './src/screens/forgetPassword/forgetPassword';
import { HeaderComponent } from './src/screens/header';
import { Catalog } from './src/screens/catalog/catalog';
import { CatalogItems } from './src/screens/catalog/catalogItems';
import { Products } from './src/screens/category/categoryProducts';
import { ProductDetails } from './src/screens/category/categoryItems';
import { SpecialOffers } from './src/screens/specialOffer/specialOffers';
import { CreateWishlistComponent } from './src/screens/newList/createNewList';
import { ShoppingListComponent } from './src/screens/shoppingList/shoppingList';

import { gstyles } from './src/GlobalStyles';

import {DrawerTitle} from './src/components/SideMenu/index';

// const navigateOnce = (getStateForAction) => (action, state) => {
//   const {type, routeName} = action;
//   return (
//     state &&
//     type === NavigationActions.NAVIGATE &&
//     routeName === state.routes[state.routes.length - 1].routeName
//   ) ? null : getStateForAction(action, state);
// };

const stack = createStackNavigator({
	Home:{
		screen: HomeComponent,
	},
  // Header:{
  //   screen: HeaderComponent,
  // },
  Login:{
    screen: LoginComponent,
  },
  Signup:{
    screen: SignupComponent,
  },
  ForgetPassword : {
    screen : ForgetComponent
  },
  Catalog:{
    screen:Catalog,
  },
  CatalogItems:{
    screen:CatalogItems
  },
  Products:{
    screen:Products
  },
  ProductDetails:{
    screen:ProductDetails
  },
  SpecialOffers:{
    screen:SpecialOffers
  },
  CreateWishlist:{
    screen:CreateWishlistComponent
  },
  ShoppingList:{
    screen:ShoppingListComponent,
  }
},
{
    headerMode: 'none',
})

const DrawerStack = createDrawerNavigator({
	 Stack:{
    screen: stack,
  },
},
{
  drawerBackgroundColor:'#fff',
  drawerWidth: 300,
  drawerOpenRoute: 'DrawerOpen',
        drawerCloseRoute: 'DrawerClose',
        drawerToggleRoute: 'DrawerToggle',
  // drawerPosition:'right',
  gesturesEnabled: false,
  contentComponent:({navigation}) => <DrawerTitle navigation={navigation}/>
})

// const defaultGetStateForAction = DrawerStack.router.getStateForAction;

// DrawerStack.router.getStateForAction = (action, state) => {
//     if(state && action.type === 'Navigation/NAVIGATE' && action.routeName === 'DrawerClose') {
//         StatusBar.setHidden(false);
//         <StatusBar barStyle = "light-content" backgroundColor="red" title="a"/>
//     }

//     if(state && action.type === 'Navigation/NAVIGATE' && action === 'DrawerOpen') {
//         StatusBar.setHidden(true);
//     }


//     return defaultGetStateForAction(action, state);
// };

const MyNavigation = createStackNavigator({
   Home:{
    screen: DrawerStack
  },
 
},
{
    headerMode: 'none',

    // mode:'modal',
    cardStyle: {
      backgroundColor: '#ffffff'
	}
})

export default MyNavigation;
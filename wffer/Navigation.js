import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View,ScrollView,Text,Image,TouchableOpacity } from 'react-native';
import { SwitchNavigator,SafeAreaView,createStackNavigator,createDrawerNavigator,createBottomTabNavigator} from 'react-navigation';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { HomeComponent } from './src/screens/home/home';
import { LoginComponent } from './src/screens/login/login';
import { SignupComponent } from './src/screens/signUp/signup';
import { ForgetComponent } from './src/screens/forgetPassword/forgetPassword';
import { ChangePasswordComponent } from './src/screens/changePassword/changePassword';
import { HeaderComponent } from './src/screens/header';
import { Catalog } from './src/screens/catalog/catalog';
import { CatalogItems } from './src/screens/catalog/catalogItems';
import { Products } from './src/screens/category/categoryProducts';
import { ProductDetails } from './src/screens/category/categoryItems';
import { SpecialOffers } from './src/screens/specialOffer/specialOffers';
import { WishlistComponent } from './src/screens/wishlist/wishlist';
import { CreateWishlistComponent } from './src/screens/newList/createNewList';
import { MultipleWishlistComponent } from './src/screens/newList/wishlistMultiple';
import { ShoppingListComponent } from './src/screens/shoppingList/shoppingList';
import { StoreLocatorComponent } from './src/screens/storeLocality/storeLocator';
import { PersonalInfoComponent } from './src/screens/User/personalInfo';
import { UploadPhotoComponent } from './src/screens/User/photoUpload';
import  LogoutComponent  from './src/screens/User/signOut';
// import { GeneralSettingsComponent } from './src/screens/User/generalSettings';
// import { PrivacySettingsComponent } from './src/screens/User/privacySettings';
// import { OtherSettingsComponent } from './src/screens/User/otherSettings';
import { LanguageComponent } from './src/screens/language/language';
import { LowestPriceComponent } from './src/screens/getPrice/lowestPrice';
import { NearByStoreComponent } from './src/screens/getPrice/NearByStore';
import { MultiStoreComponent } from './src/screens/getPrice/multiStore';
import { ContactUsComponent } from './src/screens/contactUs/contactUs';
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

const profilenav = createBottomTabNavigator({
  Personal:{
    screen: PersonalInfoComponent
  },
  PhotoEdit:{
    screen: UploadPhotoComponent
  },
  ChangePassword:{
    screen: ChangePasswordComponent
  },
},{
  swipeEnabled:false,
  animationEnabled:true,
  tabBarOptions: {
  activeTintColor: '#000',
  inactiveTintColor:'#000',
  activeBackgroundColor:'#eee',
  showLabel:true,
  labelStyle: {
    fontSize: 16,
    paddingBottom:10,
  },
  style: {
    backgroundColor: '#ccc',
  },
}
})
// const accountSettingsNav = createBottomTabNavigator({
//   General:{
//     screen: GeneralSettingsComponent
//   },
//   Privacy:{
//     screen: PrivacySettingsComponent
//   },
//   Other:{
//     screen: OtherSettingsComponent
//   }
// },{
//   swipeEnabled:false,
//   animationEnabled:true,
//   tabBarOptions: {
//   activeTintColor: '#000',
//   inactiveTintColor:'#000',
//   activeBackgroundColor:'#eee',
//   showLabel:true,
//   labelStyle: {
//     fontSize: 16,
//     paddingBottom:10,
//   },
//   style: {
//     backgroundColor: '#ccc',
//   },
// }
// })
const getPriceNav = createBottomTabNavigator({
  Lowest:{
    screen: LowestPriceComponent
  },
  NearByStore:{
    screen: NearByStoreComponent
  },
  MultiStore:{
    screen: MultiStoreComponent
  }
},{
  swipeEnabled:false,
  animationEnabled:true,
  tabBarOptions: {
  activeTintColor: '#000',
  inactiveTintColor:'#000',
  activeBackgroundColor:'#eee',
  showLabel:true,
  labelStyle: {
    fontSize: 16,
    paddingBottom:10,
  },
  style: {
    backgroundColor: '#ccc',
  },
}
})
const stack = createStackNavigator({
	Home:{
		screen: HomeComponent,
	},
  // Header:{
  //   screen: HeaderComponent,
  // },
  Language:{
    screen:LanguageComponent
  },
  Login:{
    screen: LoginComponent,
  },
  Signup:{
    screen: SignupComponent,
  },
  ForgetPassword : {
    screen : ForgetComponent
  },
  Help:{
    screen :ContactUsComponent,
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
  Wishlists:{
    screen:WishlistComponent
  },
  CreateWishlist:{
    screen:CreateWishlistComponent
  },
  MultipleWishlist:{
    screen:MultipleWishlistComponent
  },
  ShoppingList:{
    screen:ShoppingListComponent,
  },
  StoreLocator:{
    screen:StoreLocatorComponent
  },
  Profile:{
    screen:profilenav
  },
  // AccountSettings:{
  //   screen:accountSettingsNav
  // },
  GetPrice:{
    screen:getPriceNav
  },
  Logout:{
    screen:LogoutComponent
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

//// const defaultGetStateForAction = DrawerStack.router.getStateForAction;

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
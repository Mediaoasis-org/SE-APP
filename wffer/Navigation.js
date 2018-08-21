import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View,ScrollView,Text,Image,TouchableOpacity,Dimensions,AsyncStorage,I18nManager,Platform } from 'react-native';
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
import { EditWishlistComponent } from './src/screens/wishlist/EditWishlist';
import { TellFriendComponent } from './src/screens/wishlist/TellFriend';
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
import { GetPriceComponent } from './src/screens/getPrice/GetPrice';
import { LowestPriceComponent } from './src/screens/getPrice/lowestPrice';
import { StoreProfileComponent } from './src/screens/getPrice/storeProfile';
import { NearByStoreComponent } from './src/screens/getPrice/NearByStore';
import { MultiStoreComponent } from './src/screens/getPrice/multiStore';
import { ContactUsComponent } from './src/screens/contactUs/contactUs';
import { ReportComponent } from './src/screens/report/Report';
import { CityScreen } from './src/screens/city/city';
import { gstyles } from './src/GlobalStyles';

import {DrawerTitle} from './src/components/SideMenu/index';
const window = Dimensions.get('window');
const positionDrawer  = I18nManager.isRTL ? 'right' : 'left';
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
  // lazy:true,
  
  tabBarOptions: {
    activeTintColor: '#000',
    inactiveTintColor:'#000',
    activeBackgroundColor:'#eee',
     allowFontScaling:false,

    // showLabel:true,
    labelStyle: {
      fontSize: 14,
      paddingBottom:10,
      width:'auto'
    },
    style: {
      backgroundColor: '#ccc',
    
    },
    tabBarStyle:{
          width:'auto'
        }

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
// const getPriceNav = createBottomTabNavigator({
//   Lowest:{
//     screen: LowestPriceComponent
//   },
//   NearByStore:{
//     screen: NearByStoreComponent
//   },
//   MultiStore:{
//     screen: MultiStoreComponent
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
    screen:CatalogItems,
  },
  Products:{
    screen:Products
  },
  ProductDetails:{
    screen:ProductDetails,

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
  EditWishlist:{
    screen:EditWishlistComponent
  },
  TellFriend:{
    screen:TellFriendComponent
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
    screen:GetPriceComponent
  },
  Lowest:{
    screen: LowestPriceComponent
  },
  StoreProfile:{
    screen: StoreProfileComponent
  },
  NearByStore:{
    screen: NearByStoreComponent
  },
  MultiStore:{
    screen:MultiStoreComponent,
  },
  Report:{
    screen:ReportComponent
  },
  City:{
    screen:CityScreen
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
  drawerWidth: window.width*0.75,
  // drawerOpenRoute: 'DrawerOpen',
  // drawerCloseRoute: 'DrawerClose',
  // drawerToggleRoute: 'DrawerToggle',

  drawerPosition : Platform.OS === 'android' ? I18nManager.isRTL ? 'right' : 'left' : 'left',
  // drawerPosition:I18nManager.isRTL ? 'left' : 'right',
   // drawerLockMode: 'locked-closed',
  gesturesEnabled: true,
  
  contentComponent:props => <DrawerTitle {...props} />
})



const MyNavigation = createStackNavigator({
   Home:{
    screen: DrawerStack
  },
 
},
{
    headerMode: 'none',
	
})

export default MyNavigation;


// contentComponent:({navigation}) => <DrawerTitle navigation={navigation} />
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
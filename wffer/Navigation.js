import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View,ScrollView,Text,Image,TouchableOpacity } from 'react-native';
import { SwitchNavigator,SafeAreaView,createStackNavigator,createDrawerNavigator} from 'react-navigation';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { HomeComponent } from './src/home/home';
import { LoginComponent } from './src/login/login';
import { SignupComponent } from './src/login/signup';
import { ForgetComponent } from './src/login/forgetPassword';
import { HeaderComponent } from './src/header';
import { gstyles } from './src/GlobalStyles';
import {DrawerTitle} from './src/components/sideMenu';

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
  Header:{
    screen: HeaderComponent,
  },
  Login:{
    screen: LoginComponent,
  },
  Signup:{
    screen: SignupComponent,
  },
  ForgetPassword : {
    screen : ForgetComponent
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
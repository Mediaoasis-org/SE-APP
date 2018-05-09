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
class DrawerTitle extends React.Component{
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
	      		<View style={gstyles.drawerView}><Image source={require('./assets/switch_lang.png')} style={gstyles.drawerImage}/><Text style={gstyles.drawertitleNormalText}> Language</Text></View>
      		</View>

      		<View>
	      		<Text style={gstyles.drawertitleHeadingText}> Shopping</Text>
	      		<View style={gstyles.drawerView}><Image source={require('./assets/all-category.png')} style={gstyles.drawerImage}/><Text style={gstyles.drawertitleNormalText}> Catalog</Text></View>
	      		<View style={gstyles.drawerView}><Image source={require('./assets/shopping-basket.png')} style={gstyles.drawerImage}/><Text style={gstyles.drawertitleNormalText}> My Shopping List</Text></View>
	      		<View style={gstyles.drawerView}><Image source={require('./assets/create-list1-c.png')} style={gstyles.drawerImage}/><Text style={gstyles.drawertitleNormalText}> Create New List</Text></View>
	      		<View style={gstyles.drawerView}><Image source={require('./assets/tag-c.png')} style={gstyles.drawerImage}/><Text style={gstyles.drawertitleNormalText}> Special Offer</Text></View>
	      		<View style={gstyles.drawerView}><Image source={require('./assets/store-locator-c.png')} style={gstyles.drawerImage}/><Text style={gstyles.drawertitleNormalText}> Store Locator</Text></View>
      		</View>

      		<View>
          <Text style={gstyles.drawertitleHeadingText}>Categories</Text>
	      		<View style={gstyles.drawerView}><Image source={require('./assets/all-category.png')} style={gstyles.drawerImage}/><Text style={gstyles.drawertitleNormalText}> All Categories</Text></View>
	      		<View style={gstyles.drawerView}><Image source={require('./assets/bakery-c.png')} style={gstyles.drawerImage}/><Text style={gstyles.drawertitleNormalText}> All Food and Bakery</Text></View>
	      		<View style={gstyles.drawerView}><Image source={require('./assets/beverages-c.png')} style={gstyles.drawerImage}/><Text style={gstyles.drawertitleNormalText}> Beverages</Text></View>
	      		<View style={gstyles.drawerView}><Image source={require('./assets/canned-c.png')} style={gstyles.drawerImage}/><Text style={gstyles.drawertitleNormalText}> Canned and Jarred Food</Text></View>
	      		<View style={gstyles.drawerView}><Image source={require('./assets/cleaner-c.png')} style={gstyles.drawerImage}/><Text style={gstyles.drawertitleNormalText}> Cleaner</Text></View>
	      		<View style={gstyles.drawerView}><Image source={require('./assets/dairy-c.png')} style={gstyles.drawerImage}/><Text style={gstyles.drawertitleNormalText}> Diary</Text></View>
	      		<View style={gstyles.drawerView}><Image source={require('./assets/baking-c.png')} style={gstyles.drawerImage}/><Text style={gstyles.drawertitleNormalText}> Dry Backing Food</Text></View>
	      		<View style={gstyles.drawerView}><Image source={require('./assets/frozen-c.png')} style={gstyles.drawerImage}/><Text style={gstyles.drawertitleNormalText}> Frozen Goods</Text></View>
	      		<View style={gstyles.drawerView}><Image source={require('./assets/grocery-c.png')} style={gstyles.drawerImage}/><Text style={gstyles.drawertitleNormalText}> Grocerry</Text></View>
	      		<View style={gstyles.drawerView}><Image source={require('./assets/dispo-c.png')} style={gstyles.drawerImage}/><Text style={gstyles.drawertitleNormalText}> Paper Disposable</Text></View>
	      		<View style={gstyles.drawerView}><Image source={require('./assets/personal-c.png')} style={gstyles.drawerImage}/><Text style={gstyles.drawertitleNormalText}> Personal Care</Text></View>
      		</View>

      		<View style={{marginBottom:20}}>
	      		<Text style={gstyles.drawertitleHeadingText}>Settings</Text>
	      		<TouchableOpacity style={gstyles.drawerView}  onPress={() => this.props.navigation.navigate('Login')} ><Image source={require('./assets/all-category.png')} style={gstyles.drawerImage}/><Text style={gstyles.drawertitleNormalText}> Sign In</Text></TouchableOpacity>
	      		<TouchableOpacity style={gstyles.drawerView} onPress={() => this.props.navigation.navigate('Signup')}><Image source={require('./assets/all-category.png')} style={gstyles.drawerImage}/><Text style={gstyles.drawertitleNormalText}> Sign Up</Text></TouchableOpacity>
      		</View>
      	</SafeAreaView>
      </ScrollView>
      )
    }
}

const navigateOnce = (getStateForAction) => (action, state) => {
  const {type, routeName} = action;
  return (
    state &&
    type === NavigationActions.NAVIGATE &&
    routeName === state.routes[state.routes.length - 1].routeName
  ) ? null : getStateForAction(action, state);
};

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
	Home: {
    screen: HomeComponent,
    navigationOptions :{
   drawerLabel: () => null

  },
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

const defaultGetStateForAction = DrawerStack.router.getStateForAction;

DrawerStack.router.getStateForAction = (action, state) => {
    if(state && action.type === 'Navigation/NAVIGATE' && action.routeName === 'DrawerClose') {
        StatusBar.setHidden(false);
        <StatusBar barStyle = "light-content" backgroundColor="red" title="a"/>
    }

    if(state && action.type === 'Navigation/NAVIGATE' && action === 'DrawerOpen') {
        StatusBar.setHidden(true);
    }


    return defaultGetStateForAction(action, state);
};

const MyNavigation = createStackNavigator({
   DrawerStack:{
    screen: DrawerStack
  },
  Stack:{
  	screen: stack,
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
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { HomeComponent } from './src/home/home';
import { View,ScrollView,Text,Image } from 'react-native';
import { DrawerNavigator, StackNavigator, TabNavigator,TabBarTop , NavigationActions,SwitchNavigator,SafeAreaView} from 'react-navigation';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
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
	      		<Text style={gstyles.drawertitleNormalText}><Icon name="home" size={24} color="#febe2b" />  Home</Text>
	      		<Text style={gstyles.drawertitleNormalText}> Language</Text>
      		</View>

      		<View>
	      		<Text style={gstyles.drawertitleHeadingText}> Shopping</Text>
	      		<Text style={gstyles.drawertitleNormalText}> Catalog</Text>
	      		<Text style={gstyles.drawertitleNormalText}> My Shopping List</Text>
	      		<Text style={gstyles.drawertitleNormalText}> Create New List</Text>
	      		<Text style={gstyles.drawertitleNormalText}> Special Offer</Text>
	      		<Text style={gstyles.drawertitleNormalText}> Store Locator</Text>
      		</View>

      		<View>
	      		<Text style={gstyles.drawertitleHeadingText}>All Categories</Text>
	      		<Text style={gstyles.drawertitleNormalText}> All Food and Bakery</Text>
	      		<Text style={gstyles.drawertitleNormalText}> Beverages</Text>
	      		<Text style={gstyles.drawertitleNormalText}> Canned and Jarred Food</Text>
	      		<Text style={gstyles.drawertitleNormalText}> Cleaner</Text>
	      		<Text style={gstyles.drawertitleNormalText}> Diary</Text>
	      		<Text style={gstyles.drawertitleNormalText}> Dry Backing Food</Text>
	      		<Text style={gstyles.drawertitleNormalText}> Frozen Goods</Text>
	      		<Text style={gstyles.drawertitleNormalText}> Grocerry</Text>
	      		<Text style={gstyles.drawertitleNormalText}> Paper Disposable</Text>
	      		<Text style={gstyles.drawertitleNormalText}> Personal Care</Text>
      		</View>

      		<View style={{marginBottom:20}}>
	      		<Text style={gstyles.drawertitleHeadingText}>Settings</Text>
	      		<Text style={gstyles.drawertitleNormalText}> Sign In</Text>
	      		<Text style={gstyles.drawertitleNormalText}> Sign Up</Text>
      		</View>
      	</SafeAreaView>
      </ScrollView>
      )
    }
}

const stack = new StackNavigator({
	Home :{
		screen:HomeComponent,
	}
},
{
    headerMode: 'none',
    cardStyle: {
	      backgroundColor: '#ffffff'
		}
})

const DrawerStack = new DrawerNavigator({
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

const MyNavigation = new StackNavigator({
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
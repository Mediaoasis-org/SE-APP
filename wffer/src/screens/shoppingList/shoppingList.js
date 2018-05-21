import React, { Component } from 'react';
// import { withNavigation } from 'react-navigation';
import {
  Text,
  TextInput,
  View,
  Dimension,
  TouchableOpacity,
  Image,
  Platform,
  
  FlatList,
  ScrollView,
  StyleSheet
} from 'react-native';
import {gstyles} from '../../GlobalStyles';
import {Constants} from '../../common';
import { SearchComponent } from '../../components/Search';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { DrawerActions } from 'react-navigation';
import Accordion from 'react-native-collapsible/Accordion';
// import iconFont from 'react-native-vector-icons/Fonts/FontAwesome.ttf';
// const window= Dimensions.get('window');

const SECTIONS = [
  {
    title: 'My Shopping List',
    listname:'qwerty',
    product:'oil'

  },
  {
    title: 'Recommended List',
     listname:''
  },
  
];

export class ShoppingListComponent extends Component {
	constructor(props){
		super(props);
		this.state={
      activeSection: false,
      collapsed: true,
       search :'',
		}
		// alert(JSON.stringify(this.props.navigation))
	}
	  

	 // _renderSectionTitle(section) {
  //   return (
  //     <View style={styles.title}>
  //       <Text>{section.title}</Text>
  //     </View>
  //   );
  // }
  handleNavigation(){
    this.props.navigation.navigate('Wishlists');
  }
  _renderHeader(section) {
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}><Icon name="angle-down" size={24} color="#000" style={{flexDirection:'column'}} />  {section.title}</Text>
      </View>
    );
  }

  _renderContent = (section) => {
     
        if(section.listname!=""){
            return (
            <View style={styles.content}>
                <TouchableOpacity onPress={()=>this.handleNavigation()} >
                  <Text style={styles.shoppingText}>shopping list found</Text>
                  <View style={{borderColor:'#000',borderWidth:1,padding:10,marginTop:8,flexDirection:'row'}}>
                      <View style={{flexDirection:'column',width:'20%'}}>
                          <Image source={require('../../../assets/nophoto.png')} resizeMode="contain" style={{width:'100%'}}/>
                      </View>
                      <View style={{flexDirection:'column',width:'80%'}}>
                          <Text style={{fontSize:16,fontWeight:'bold',marginTop:5}}>{section.listname}</Text>
                          <Text style={{marginTop:5}}>0 entries</Text>
                          <Text style={{marginTop:5}}>Wed at 5:18 PM</Text>
                          <Text style={{marginTop:5}}>list note</Text>
                      </View>
                  </View>
                </TouchableOpacity>
            </View>
            );
        }
        else
        {
            return(
                <View style={styles.content}>
                  <Text style={styles.shoppingText}>No data found</Text>
                </View>
            );
  
        }
      
      
  }

 

	render(){
		return(
			<View style={gstyles.container}>
					<View style={gstyles.headerMenu}>
								<TouchableOpacity onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())} style={gstyles.headerMenuButton}>
									<Text><Icon name="bars" size={24} color="#fff" /></Text>
                </TouchableOpacity>
                <Text style={gstyles.headerProfileLabel}>Shopping List</Text>
                <TouchableOpacity onPress={()=>this.props.navigation.navigate('CreateWishlist')} style={gstyles.headerRightButton}><Icon name="plus-circle" size={24} color="#fff" /></TouchableOpacity>
					</View>
          <SearchComponent />
					<Accordion
        	  sections={SECTIONS}
					  renderHeader={this._renderHeader}
					  renderContent={this._renderContent}
					/>
			</View>
		);
	}
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF'
  },
  title: {
    textAlign: 'left',
    fontSize: 22,
    fontWeight: '300',
    marginBottom: 20
  },
  header: {
    backgroundColor: '#F5FCCC',
    padding: 10,
    flexDirection:'row'
  },
  headerText: {
    // textAlign: 'center',
    flexDirection:'column',
    fontSize: 18,
    fontWeight: '500',
    color:'#000'
  },
  shoppingText:{
    fontSize:20
  },
  content: {
    padding: 20,
    backgroundColor: '#fff',

  },
  active: {
    backgroundColor: 'rgba(255,255,255,1)'
  },
  inactive: {
    backgroundColor: 'rgba(245,252,255,1)'
  },
  selectors: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  selector: {
    backgroundColor: '#F5FCFF',
    padding: 10
  },
  activeSelector: {
    fontWeight: 'bold'
  },
  selectTitle: {
    fontSize: 14,
    fontWeight: '500',
    padding: 10
  }
});
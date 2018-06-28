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
  AsyncStorage,
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
      oauthToken:'',
      oauthSecret:'',
      mysection:false,
      recommendedsection:false,
      activeSection: false,
      collapsed: true,
       search :'',
       fieldValues:[],
       totalItems:'',
       LoggedIn:null,
       userData:[]
		}
    this.getStorageValues()
    
		// alert(JSON.stringify(this.props.navigation))
	}
	async getStorageValues(){
         const userData = await AsyncStorage.getItem('userData');
         // console.log(userData.length);
          if(userData.length>0){
            this.setState({LoggedIn:true});
            this.setState({userData:JSON.parse(userData)});
            this.setState({oauthToken:this.state.userData.oauth_token});
            this.setState({oauthSecret:this.state.userData.oauth_secret});
            this.fetchValues();
          }
          else
          {
            this.setState({LoggedIn:false})
          }         
   }

	 // _renderSectionTitle(section) {
  //   return (
  //     <View style={styles.title}>
  //       <Text>{section.title}</Text>
  //     </View>
  //   );
  // }
  fetchValues(){
      return fetch('https://wffer.com/se/api/rest/listings/wishlist?oauth_consumer_key=mji82teif5e8aoloye09fqrq3sjpajkk&oauth_consumer_secret=aoxhigoa336wt5n26zid8k976v9pwipe&oauth_token='+ this.state.oauthToken + '&oauth_secret=' +this.state.oauthSecret + '&search_wishlist=my_wishlists',{
              method:'GET'
            })
            .then((response) => response.json())
            .then((responseJson) => {
              if(responseJson.status_code=='200'){
                // alert(JSON.stringify(responseJson.body));
                 this.setState({
                  fieldValues:responseJson.body.response,
                  totalItems: responseJson.body.totalItemCount,
                });
              }
              else
              {
                // 
              }
              this.setState({Message:responseJson.Message});
            })
            .catch((error) =>{
              console.error(error);
            });
  }
  handleNavigation(){
    this.props.navigation.navigate('Wishlists');
  }
  // _renderHeader(section) {
  //   return (
  //     <View style={styles.header}>
  //       <Text style={styles.headerText}><Icon name="angle-down" size={24} color="#000" style={{flexDirection:'column'}} />  {section.title}</Text>
  //     </View>
  //   );
  // }
  renderMyList(){
    if(this.state.fieldValues.length===0){
       return(
            <View style={styles.content}>
              <Text style={styles.shoppingText}>No data found</Text>
            </View>);
    }
    else
    {
    return(
          this.state.fieldValues.map((item)=>{
            // alert(item.listing_images_1['image'])
            let img = 'listing_images_'+item.total_item;
            console.log(img);
            console.log(item.listing_images_+''+item.total_item);
            return(
              <View style={styles.content} key={item.wishlist_id}>
                  <TouchableOpacity onPress={()=>this.handleNavigation()} >
                    <View style={{borderColor:'#000',borderWidth:1,padding:10,marginTop:8,flexDirection:'row'}}>
                        <View style={{flexDirection:'column',width:'20%'}}>
                        
                            <Image source={require('../../../assets/nophoto.png')} resizeMode="contain" style={{width:'100%'}}/>
                        </View>
                        <View style={{flexDirection:'column',width:'80%'}}>
                            <Text style={{fontSize:16,fontWeight:'bold',marginTop:5,color:'#000'}}>{item.title}</Text>
                            <Text style={{marginTop:5,color:'#000'}}>{item.total_item} entries</Text>
                            <Text style={{marginTop:5,color:'#000'}}>{item.creation_date}</Text>
                            <Text style={{marginTop:5,color:'#000'}}>{item.body}</Text>
                        </View>
                    </View>
                  </TouchableOpacity>
              </View>
              );
          })
        );
      }
  }

  // _renderContent = (section) => {
     
  //       if(section.listname!=""){
  //           return (
  //           <View style={styles.content}>
  //               <TouchableOpacity onPress={()=>this.handleNavigation()} >
  //                 <Text style={styles.shoppingText}>shopping list found</Text>
  //                 <View style={{borderColor:'#000',borderWidth:1,padding:10,marginTop:8,flexDirection:'row'}}>
  //                     <View style={{flexDirection:'column',width:'20%'}}>
  //                         <Image source={require('../../../assets/nophoto.png')} resizeMode="contain" style={{width:'100%'}}/>
  //                     </View>
  //                     <View style={{flexDirection:'column',width:'80%'}}>
  //                         <Text style={{fontSize:16,fontWeight:'bold',marginTop:5,color:'#000'}}>{section.listname}</Text>
  //                         <Text style={{marginTop:5,color:'#000'}}>0 entries</Text>
  //                         <Text style={{marginTop:5,color:'#000'}}>Wed at 5:18 PM</Text>
  //                         <Text style={{marginTop:5,color:'#000'}}>list note</Text>
  //                     </View>
  //                 </View>
  //               </TouchableOpacity>
  //           </View>
  //           );
  //       }
  //       else
  //       {
  //           return(
  //               <View style={styles.content}>
  //                 <Text style={styles.shoppingText}>No data found</Text>
  //               </View>
  //           );
  
  //       }
      
      
  // }

 

	render(){
    if(this.state.LoggedIn!=true){
        return(
          <View style={gstyles.container}>
              <View style={gstyles.headerMenu}>
                    <TouchableOpacity onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())} style={gstyles.headerMenuButton}>
                      <Text><Icon name="bars" size={24} color="#fff" /></Text>
                    </TouchableOpacity>
                    <Text style={gstyles.headerProfileLabel}>Shopping List</Text>
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate('CreateWishlist')} style={gstyles.headerRightButton}><Icon name="plus-circle" size={24} color="#fff" /></TouchableOpacity>
              </View>
              <Text style={{padding:10,fontSize:18,margin:10,textAlign:'center'}}>To get Lists ,Please Sign In</Text>
              <TouchableOpacity style={gstyles.createAccountView} onPress={()=>this.props.navigation.navigate('Login')}>
                  <Text style={gstyles.createAccountText}>Sign In</Text>
              </TouchableOpacity>
          </View>
        )
    }
    else
    {
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
				  <ScrollView>
          <View>
           <View style={styles.header}>
            <TouchableOpacity onPress={()=>this.setState({mysection:!this.state.mysection,recommendedsection:false})}><Text style={styles.headerText}><Icon name="angle-down" size={24} color="#000" style={{flexDirection:'column'}} />  My Shopping List</Text></TouchableOpacity>
             
            </View>
            {
              this.state.mysection==true ? <Text style={[styles.shoppingText],{padding:10}}>{this.state.totalItems} shopping lists found</Text> : null
            }
            {
              this.state.mysection==true ? this.renderMyList() : null
            }
          </View>
          <View style={styles.header}>
            <TouchableOpacity onPress={()=>this.setState({recommendedsection:!this.state.recommendedsection,mysection:false})}><Text style={styles.headerText}><Icon name="angle-down" size={24} color="#000" style={{flexDirection:'column'}} />  Recommended List</Text></TouchableOpacity>

            </View>
             {
              this.state.recommendedsection==true ? <View style={styles.content}><Text style={styles.shoppingText}>No data found</Text></View> : null
            }
          </ScrollView>
			</View>
		);
    }
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
    paddingLeft: 10,
    paddingRight:10,
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
// 
  // <Accordion
  //           sections={SECTIONS}
  //           renderHeader={this._renderHeader}
  //           renderContent={this._renderContent}
  //         />
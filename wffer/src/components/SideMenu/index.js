import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  AsyncStorage
} from 'react-native';
import {gstyles} from '../../GlobalStyles';
import { SafeAreaView} from 'react-navigation';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
export class DrawerTitle extends React.Component{
  constructor(props) {
      super(props);
      this.state = {
        fieldValues:[],
        LoggedIn:false,
        userData:[],
        oauthToken:'',
        oauthSecret:''
      }
      this.fetchValues();
    }

    logout = async() => {
       await AsyncStorage.removeItem('userLoginAuthentication');
       const userData = await AsyncStorage.getItem('userData');
       this.setState({userData:JSON.parse(userData)});
       this.setState({oauthToken:this.state.userData.oauth_token});
       this.setState({oauthSecret:this.state.userData.oauth_secret});
       await AsyncStorage.removeItem('userData');
       this.ApiLogout() 
       this.setState({LoggedIn:false})
       this.props.navigation.push('Login');
    }

    ApiLogout(){
        var formData = new FormData;
        formData.append('oauth_consumer_key','mji82teif5e8aoloye09fqrq3sjpajkk');
        formData.append('oauth_consumer_secret','aoxhigoa336wt5n26zid8k976v9pwipe');
        formData.append('oauth_token',this.state.oauthToken);
        formData.append('oauth_secret',this.state.oauthSecret);
          return fetch('https://wffer.com/se/api/rest/logout',{
            body: formData,
            headers:{
              'Accept':'application/json',
            },
            method:'POST'
          })
            .then((response) => response.json())
            .then((responseJson) => {
              
              if(responseJson.status_code=="204"){
                this.setState({
                  isLoading: false,
                }, function(){
              
                });
              }
              else if(responseJson.status_code=="401")
              {
                this.setState({
                  Message : responseJson.message,
                })
                alert(JSON.stringify(responseJson.message))
              
              }
            })
            .catch((error) =>{
              console.error(error);
            });
    }

   fetchValues(){
		return fetch('https://wffer.com/se/api/rest/listings/categories?oauth_consumer_key=mji82teif5e8aoloye09fqrq3sjpajkk&oauth_consumer_secret=aoxhigoa336wt5n26zid8k976v9pwipe&listingtype_id=2',{
			        method:'GET'
			      })
			      .then((response) => response.json())
			      .then((responseJson) => {
			    
			      	if(responseJson.status_code=='200'){
			      		 this.setState({
				          isLoading: false,
				          fieldValues: responseJson.body.categories,
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
  render(){
  	// alert(this.state.fieldValues.length)
  // 		if (this.state.fieldValues.length === 0) {
		//   return null
		// }
      AsyncStorage.getItem("userLoginAuthentication").then((value) => {
          if(value !== null){
            this.setState({LoggedIn:true})
          }
      }).done();
      return(
        <ScrollView style={gstyles.sideMenuView}>
        	<SafeAreaView>
        		<View>
  	      		<Text style={gstyles.drawertitleHeadingText}>Menu</Text>
              {
                  (this.state.LoggedIn === true) 
                  ?<TouchableOpacity style={gstyles.drawerView} onPress={()=>this.props.navigation.push('Profile')}><Image source={require('../../../assets/nophoto_icon.png')} style={gstyles.drawerImage}/><Text style={gstyles.drawertitleNormalText}> Profile</Text></TouchableOpacity>
                  : null
              }
  	      		<TouchableOpacity style={gstyles.drawerView} onPress={()=>this.props.navigation.push('Home')}><Icon name="home" size={24} color="#febe2b" style={gstyles.drawerImage} /><Text style={gstyles.drawertitleNormalText}> Home</Text></TouchableOpacity>
  	      		<TouchableOpacity style={gstyles.drawerView} onPress={()=>this.props.navigation.push('Language')}><Image source={require('../../../assets/switch_lang.png')} style={gstyles.drawerImage}/><Text style={gstyles.drawertitleNormalText}> Language</Text></TouchableOpacity>
        		</View>

        		<View>
  	      		<Text style={gstyles.drawertitleHeadingText}> Shopping</Text>
  	      		<TouchableOpacity style={gstyles.drawerView} onPress={()=>this.props.navigation.push('Catalog')}><Image source={require('../../../assets/all-category.png')} style={gstyles.drawerImage}/><Text style={gstyles.drawertitleNormalText}> Catalog</Text></TouchableOpacity>
  	      		<TouchableOpacity onPress={()=>this.props.navigation.push('ShoppingList')} style={gstyles.drawerView}><Image source={require('../../../assets/shopping-basket.png')} style={gstyles.drawerImage}/><Text style={gstyles.drawertitleNormalText}> My Shopping List</Text></TouchableOpacity>
  	      		<TouchableOpacity onPress={()=>this.props.navigation.push('CreateWishlist')} style={gstyles.drawerView}><Image source={require('../../../assets/create-list1-c.png')} style={gstyles.drawerImage}/><Text style={gstyles.drawertitleNormalText}> Create New List</Text></TouchableOpacity>
  	      		<TouchableOpacity style={gstyles.drawerView} onPress={()=>this.props.navigation.push('SpecialOffers')}><Image source={require('../../../assets/tag-c.png')} style={gstyles.drawerImage}/><Text style={gstyles.drawertitleNormalText}> Special Offer</Text></TouchableOpacity>
  	      		<TouchableOpacity style={gstyles.drawerView} onPress={()=>this.props.navigation.push('StoreLocator')}><Image source={require('../../../assets/store-locator-c.png')} style={gstyles.drawerImage}/><Text style={gstyles.drawertitleNormalText}> Store Locator</Text></TouchableOpacity>
        		</View>

        		<View>
            	<Text style={gstyles.drawertitleHeadingText}>Categories</Text>
  	      		<TouchableOpacity style={gstyles.drawerView} onPress={()=>{this.props.navigation.push('Products', {cat_name:'All Categories'})}}><Image source={require('../../../assets/all-category.png')} style={gstyles.drawerImage}/><Text style={gstyles.drawertitleNormalText}> All Categories</Text></TouchableOpacity>
  	      		<View>
  	      		{
  	      			this.state.fieldValues.map((item,index)=>{
  	      				return(
  	      				<TouchableOpacity key={index} style={gstyles.drawerView} onPress={()=>{this.props.navigation.push('Products', {cat_name:item.category_name,cat_id:item.category_id})}}>
  	      					<Image source={{uri:item.image_icon}} style={[gstyles.drawerImage,{tintColor:'#febe2b'}]}/><Text style={gstyles.drawertitleNormalText}> {item.category_name}</Text>
  	      				</TouchableOpacity>
  	      				)
  	      			})
  	      		}
  	      		</View>
        		</View>

        		<View style={{marginBottom:20}}>
  	      		<Text style={gstyles.drawertitleHeadingText}>Settings</Text> 
                {
                  (this.state.LoggedIn === true) 
                  ?
                  <View>
                    <TouchableOpacity style={gstyles.drawerView}  onPress={() => this.logout() }><Icon name="power-off" color="#febe2b" size={24} style={gstyles.drawerImage} /><Text style={gstyles.drawertitleNormalText}> Logout</Text></TouchableOpacity>
                  </View>
                  :
                  <View>
                    <TouchableOpacity style={gstyles.drawerView}  onPress={() => this.props.navigation.navigate('Login')} ><Image source={require('../../../assets/all-category.png')} style={gstyles.drawerImage}/><Text style={gstyles.drawertitleNormalText}> Sign In</Text></TouchableOpacity>
                     <TouchableOpacity style={gstyles.drawerView} onPress={() => this.props.navigation.navigate('Signup')}><Image source={require('../../../assets/all-category.png')} style={gstyles.drawerImage}/><Text style={gstyles.drawertitleNormalText}> Sign Up</Text></TouchableOpacity>
        	       </View>
               }
               
          </View>
        	</SafeAreaView>
        </ScrollView>
        )
      }
  }
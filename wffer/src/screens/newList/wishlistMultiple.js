import React, { Component } from 'react';
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
  AsyncStorage,
  ActivityIndicator
} from 'react-native';
import {gstyles} from '../../GlobalStyles';
import {Constants} from '../../common';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import CheckBox from 'react-native-checkbox';

export class MultipleWishlistComponent extends Component {
	constructor(props){
		super(props);
		this.state={
			name:'',
			note:'',
			checked: false,
			isLoading:true,
			selectedCheckboxId:[],
			userData:[],
			data:[],
			oauthToken:'',
			oauthSecret:'',
			LoggedIn:null,
			languagesData:[],
          	language : '',
		}
		this._getStorageValue();
		// alert(JSON.stringify(this.props.navigation.state.params.quantities));

	}
	
	async _getStorageValue(){
		// alert("wishlist multiple")
		// console.log(await AsyncStorage.getItem('userData'))
			var languageData = await AsyncStorage.getItem('languageData');
        const Datalang = JSON.parse(languageData);
        const lang = await AsyncStorage.getItem('languageinfo');
        this.setState({language:lang})
        // alert(this.state.language);
        this.setState({languagesData : Datalang[lang]})
		 var userData = await AsyncStorage.getItem('userData')
		 // alert(userData);
		 //  alert(this.state.LoggedIn);
		 // console.log(JSON.parse(userData).length)
		 if(userData != null){
            this.setState({LoggedIn:true});
            this.setState({userData:JSON.parse(userData)});
            this.setState({oauthToken:this.state.userData.oauth_token});
            this.setState({oauthSecret:this.state.userData.oauth_secret});
            this.fetchFields();
          }
          else
          {
            this.setState({LoggedIn:false})
          } 
         // alert(this.state.LoggedIn);
	}

	onCheckBoxPress(id) {
    	// alert(id)
	    let tmp = this.state.selectedCheckboxId;

	    if ( tmp.includes( id ) ) {
	      tmp.splice( tmp.indexOf(id), 1 );
	    } else {
	      tmp.push( id );
	    }


	    this.setState({
	      selectedCheckboxId: tmp
	    });
	    // console.log(this.state.selectedCheckboxId)
	}
	fetchFields(){
		let product_ids = this.props.navigation.state.params.product_ids;
		// console.log(this.props.navigation.state.params.quantities);

		 return fetch('https://wffer.com/se/api/rest/listings/wishlist/add?oauth_consumer_key=mji82teif5e8aoloye09fqrq3sjpajkk&oauth_consumer_secret=aoxhigoa336wt5n26zid8k976v9pwipe&oauth_token='+ this.state.oauthToken + '&oauth_secret=' +this.state.oauthSecret+'&listing_id='+product_ids,{
			        method:'GET'
	      })
	      .then((response) => response.json())
	      .then((responseJson) => {
	      	if(responseJson.status_code=='200'){
	      		 this.setState({
	          data: responseJson.body.form,
	          isLoading: false,
	        },function(){
	        
	        });
	      	}
	      	else
	      	{
	      		// this.setState({Message:responseJson.Message});
	      	}
	      })
	      .catch((error) =>{
	        console.error(error);
	      });
	}
	SaveWishlist(){
		let product_ids = this.props.navigation.state.params.quantities;
		// console.log(this.state.selectedCheckboxId);
		// console.log('ids');
		// console.log(this.props.navigation.state.params.product_ids);	
	
		product_ids.map((item)=>{
			this.state.selectedCheckboxId.map((items)=>{
				// console.log(item.quantity);
				// console.log(item.id)
				console.log(items);
					var formData = new FormData;
		    		formData.append(items,1);
					return fetch('https://wffer.com/se/api/rest/listings/wishlist/add?oauth_consumer_key=mji82teif5e8aoloye09fqrq3sjpajkk&oauth_consumer_secret=aoxhigoa336wt5n26zid8k976v9pwipe&oauth_token='+ this.state.oauthToken + '&oauth_secret=' +this.state.oauthSecret+'&listingtype_id=1&listing_id='+item.id+'&quantity='+item.qty,{
						body: formData,
						headers:{
				          'Accept':'application/json',
				          // 'Content-Type': 'multipart/form-data'
				        },
				        method:'POST'
				      })
				      .then((response) => response.json())
				      .then((responseJson) => {
				      	if(responseJson.status_code=='204'){
				      		 this.setState({
				          // data: responseJson.body.form,
				          isLoading: false,
				        },function(){
				        	
				        });
				      	}
				      	else
				      	{
				      		// this.setState({Message:responseJson.Message});
				      	}
				      })
				      .catch((error) =>{
				        console.error(error);
				      });
			})				  
		})
		this.props.navigation.push('ShoppingList');

	}
	render(){
	if(this.state.LoggedIn==false){
        return(
          <View style={gstyles.container}>
              <View style={gstyles.headerMenu}>
                    <TouchableOpacity onPress={() => this.props.navigation.openDrawer()} style={gstyles.headerMenuButton}>
                      <Text><Icon name="bars" size={24} color="#fff" /></Text>
                    </TouchableOpacity>
                    <Text style={gstyles.headerProfileLabel}>{this.state.languagesData.MULTIPLEWISHLIST_HeaderText}</Text>
                    <Text style={gstyles.headerRightButton}></Text>
              </View>
              <Text style={gstyles.signInButton}>{this.state.languagesData.MULTIPLEWISHLIST_SIGNIN_DefaultText}</Text>
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
								<TouchableOpacity onPress={() => this.props.navigation.openDrawer()} style={gstyles.headerMenuButton}>
									<Icon name="bars" size={24} color="#fff" />
			                    </TouchableOpacity>
			                    <Text style={gstyles.headerProfileLabel}>{this.state.languagesData.MULTIPLEWISHLIST_HeaderText1}</Text>
			                    <Text style={gstyles.headerRightButton}></Text>
					</View>
					{ 
                              this.state.isLoading ? <View style={gstyles.loading}><ActivityIndicator color='#333' size="large" style={{height:100,width:'30%'}}/></View>  :
                              <ScrollView>
									<View style={gstyles.profileHeadingView}><Text style={gstyles.profileHeadingText}>{this.state.languagesData.MULTIPLEWISHLIST_TitleText}</Text></View>
						          			{
						          				this.state.data.map((item,index)=>{
						          					if(item.type==='Checkbox'){
							          					return(
							          					<View style={[gstyles.productsMain]} key={index}>
								          					<View style={gstyles.wishlistMultipleView} key={index}>
								          						<CheckBox label={item.label.toString()}
															        onChange={()=>this.onCheckBoxPress(item.name)} labelStyle={gstyles.multipleCheckbox}/> 
															</View>   
														</View>
							          					);
						          					}
						          				})
						          			}
						          		<TouchableOpacity onPress={()=>this.SaveWishlist()} style={gstyles.buttonView}><Text style={gstyles.buttonText}>{this.state.languagesData.MULTIPLEWISHLIST_SaveButtonText}</Text></TouchableOpacity>
						          		<View style={gstyles.newToView}><Text style={gstyles.newToText}>OR</Text></View>
                   						<TouchableOpacity onPress={()=>this.props.navigation.goBack()} style={gstyles.createAccountView}><Text style={gstyles.createAccountText}>{this.state.languagesData.MULTIPLEWISHLIST_CancelButtonText}</Text></TouchableOpacity>
						        	
						      </ScrollView>
				     }
				</View>
			);
		}
	}
}
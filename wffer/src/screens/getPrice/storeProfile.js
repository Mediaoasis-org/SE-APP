import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  AsyncStorage
} from 'react-native';
import {gstyles} from '../../GlobalStyles';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
export  class StoreProfileComponent extends Component {
	constructor(props){
		super(props);
		this.state={
			data:[],
			isLoading:true,
			total:'',
			languagesData:[],
          	language : '',

		}
		// alert(this.props.navigation.state.params.wishlist_id);
		// alert(this.props.navigation.state.params.store_id)
		this._getStorageValue()
		this.fetchValues();
	}
	async _getStorageValue(){
    var languageData = await AsyncStorage.getItem('languageData');
        const Datalang = JSON.parse(languageData);
        const lang = await AsyncStorage.getItem('languageinfo');
        this.setState({language:lang})
        // alert(this.state.language);
        this.setState({languagesData : Datalang[lang]})
    }
	fetchValues(){
		let wishlist_id = this.props.navigation.state.params.wishlist_id;
		let store_id = this.props.navigation.state.params.store_id;
		
		return fetch('https://wffer.com/se/api/rest/listings/wishlist/get-store-profile/'+wishlist_id+'?oauth_consumer_key=mji82teif5e8aoloye09fqrq3sjpajkk&oauth_consumer_secret=aoxhigoa336wt5n26zid8k976v9pwipe&wheretobuy_id='+store_id,{
			        method:'GET'
	      })
	      .then((response) => response.json())
	      .then((responseJson) => {
	      	// alert(JSON.stringify(responseJson))
	      	if(responseJson.status_code=='200'){
	      		 this.setState({
			          data: responseJson.body,
			          isLoading: false,
	          
	        },function(){
	        	this.calculateTotalPrice();
	        	// alert(this.state.data)
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
	calculateTotalPrice(){
		var tot = 0;
		this.state.data.map((item,index)=>{
			tot = tot + item.price1;
		})
		this.setState({total:parseFloat(Number(tot).toFixed(2))})
	}
	render(){
		return(
			<View style={gstyles.container}>
					<View style={gstyles.headerMenu}>
								<TouchableOpacity onPressIn={() => this.props.navigation.goBack()} style={gstyles.headerMenuButton}>
									<Icon name="angle-left" size={26} color="#fff" />
			                    </TouchableOpacity>
			                    <Text style={gstyles.headerProfileLabel}>{this.props.navigation.state.params.store_name}</Text>
			                    <Text style={gstyles.headerRightButton}></Text>
					</View>
					<ScrollView style={{marginBottom:30}}>
					{	
						this.state.isLoading ?  <View style={gstyles.loading}><ActivityIndicator color='#333' size="large" style={{height:100,width:'30%'}}/></View> :
						<View>
							{
							this.state.data.map((item,index)=>{
								return(
								<TouchableOpacity style={gstyles.flatlist} key={index} onPress={()=>{this.props.navigation.push('ProductDetails',{product_id:item.listing_id})}}>
					          		<View style={gstyles.lowestPriceLeftBox}>
					          			<View style={gstyles.width90}>
					          					<Image source={{uri : item.image}} style={gstyles.lowestPriceImage} resizeMode="contain"/>
					          			</View>
					          		 </View>
						            <View style={gstyles.lowestPriceRightBox}>
							            

								          				<Text style={[gstyles.lowestPriceTitle,{textAlign:this.state.language == 'en' ? 'left' : 'right'}]}>{item.title}</Text>
										          		<Text style={[gstyles.lowestPriceSubTitle,{textAlign:this.state.language == 'en' ? 'left' : 'right'}]}>{this.state.languagesData.STOREPROFILE_QuantityText} {item.quantity} X {item.price1} {this.state.languagesData.STOREPROFILE_CurrencyText} <Text style={[gstyles.fontSize18,gstyles.textRed]}>- {item.quantity*item.price1} {this.state.languagesData.STOREPROFILE_CurrencyText} </Text></Text>
										          			

											               
					          		</View>
					        	</TouchableOpacity>
					        	)
							})
							}   
					    </View>
					}
					</ScrollView>
					<TouchableOpacity style={{width:'100%',position:'absolute',bottom:2,alignItems:'center',backgroundColor:'#696969',padding:10}}><Text style={gstyles.buttonText}>{this.state.languagesData.STOREPROFILE_TotalPriceText} {this.state.total}</Text></TouchableOpacity>
			</View>
		);
	}
}
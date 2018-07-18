import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator
} from 'react-native';
import {gstyles} from '../../GlobalStyles';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
export  class StoreProfileComponent extends Component {
	constructor(props){
		super(props);
		this.state={
			data:[],
			isLoading:true,

		}
		// alert(this.props.navigation.state.params.wishlist_id);
		// alert(this.props.navigation.state.params.store_id)
		this.fetchValues()
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
	renderItems(){
		
	}
	render(){
		return(
			<View style={gstyles.container}>
					<View style={gstyles.headerMenu}>
								<TouchableOpacity onPress={() => this.props.navigation.goBack()} style={gstyles.headerMenuButton}>
									<Icon name="angle-left" size={26} color="#fff" />
			                    </TouchableOpacity>
			                    <Text style={gstyles.headerProfileLabel}>{this.props.navigation.state.params.store_name}</Text>
			                    <Text style={gstyles.headerRightButton}></Text>
					</View>
					<ScrollView>
					{	
						this.state.isLoading ?  <View style={gstyles.loading}><ActivityIndicator color='#333' size="large" style={{height:100,width:'30%'}}/></View> :
						<View>
							{
							this.state.data.map((item,index)=>{
								return(
								<View style={gstyles.flatlist} key={index}>
					          		<View style={gstyles.lowestPriceLeftBox}>
					          			<View style={gstyles.width90}>
					          					<Image source={{uri : item.image}} style={gstyles.lowestPriceImage} resizeMode="contain"/>
					          			</View>
					          		 </View>
						            <View style={gstyles.lowestPriceRightBox}>
							            <View style={gstyles.lowestPriceRightInner}>
							            	<View style={gstyles.lowestPriceRightInnerBox}>
								          				<Text style={gstyles.lowestPriceTitle}>{item.title}</Text>
										          		<Text style={gstyles.lowestPriceSubTitle}>Qty {item.quantity} X {item.price1} SAR </Text><Text style={gstyles.textRed}>- {item.quantity*item.price1} SAR</Text>
										          			
											</View>	
											<View style={gstyles.lowestPriceLeftInnerBox}>
													<Icon name="angle-right" size={40} color='#000' style={gstyles.marginTop40} />
											</View>
										</View>				               
					          		</View>
					        	</View>
					        	)
							})
							}   
					    </View>
					}
					</ScrollView>
			</View>
		);
	}
}
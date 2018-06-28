import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import {
  Text,
  View,
  Dimension,
TouchableOpacity,
TouchableHighlight,
Image,
FlatList,
ScrollView,
StyleSheet,
ListView,ActivityIndicator
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {gstyles} from '../../GlobalStyles';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {Constants} from '../../common';
import { DrawerActions } from 'react-navigation';
import {ProductDetail} from '../../components/Products';
// import iconFont from 'react-native-vector-icons/Fonts/FontAwesome.ttf';
// const window= Dimensions.get('window');

export class ProductDetails extends Component {

    constructor(props){
    	super(props);
    	this.state = {
            qty:1,
            isLoading:true,
            fieldValues:[]
      
      }
      this.fetchValues();
    }
    
    fetchValues(){
    	let product_id = this.props.navigation.state.params.product_id;
    	return fetch('https://wffer.com/se/api/rest/listing/view/'+product_id+'?oauth_consumer_key=mji82teif5e8aoloye09fqrq3sjpajkk&oauth_consumer_secret=aoxhigoa336wt5n26zid8k976v9pwipe',{
			        method:'GET'
			      })
			      .then((response) => response.json())
			      .then((responseJson) => {
			      	if(responseJson.status_code=='200'){
			      		 this.setState({
				          
				          fieldValues:responseJson.body,isLoading: false
				          
				        });
			      		 // alert(JSON.stringify(this.state.fieldValues));
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
	// decrease_qty(qty){
	// 	// alert(qty)
	// 	if(parseInt(qty)!=1){
	// 	 qty=parseInt(qty)-1; 
	// 	}
	// 	this.setState({qty:qty});
	// }
	//  increase_qty(qty){
	//    	// alert(id)
	   	
	//    	qty=parseInt(qty)+1; 
	//    	// alert(qty)
	//    	this.setState({qty:qty});
	//  }
	render(){
		return(
				<View style={gstyles.container}>
					<View style={gstyles.headerMenu}>
								<TouchableOpacity onPress={() =>this.props.navigation.goBack()} style={gstyles.headerMenuButton}>
									<Icon name="angle-left" size={30} color="#fff" />
			                    </TouchableOpacity>
			                    <Text style={gstyles.headerProfileLabel}>Product Details</Text>
					</View>
					<ScrollView>
							{
                              this.state.isLoading==true ?  <View style={styles.loading}><ActivityIndicator color='#00ff00' size="large"/></View> : 
							
                            	<View>
								<ProductDetail data={this.state.fieldValues} />
								
								<Text style={{fontSize:20,fontWeight:'bold',margin:10}}>Price Comparison</Text>
								<FlatList data={[{id:'1',image:'require("../../../assets/companyLogo.jpg")',price:'30.45 SAR',company:'Danube',location:'Saudi Arabia'},{id:'3',image:'require("../../../assets/companyLogo.jpg")',price:'10.45 SAR',company:'Danube',location:'Saudi Arabia'},{id:'3',image:'require("../../../assets/companyLogo.jpg")',price:'20.45 SAR',company:'Danube',location:'Saudi Arabia'}]} 
									renderItem={({item}) =>      
				                    <View style={{backgroundColor: '#fff', flexDirection: 'row', borderColor:'#adadad',borderBottomWidth:1,width:'100%'}} >
							          		<View style={{flexDirection: 'column',width:'40%'}}>
							          			<View style={{paddingTop:10,}}><Image source={require('../../../assets/so-carrefour.png')} resizeMode="contain" style={{height:50,width:'100%'}}/></View>
							          		</View>
								            <View style={{flexDirection: 'column',width:'60%'}}>
									          		<View style={{width: '100%',padding:3}}><Text style={styles.title}>{item.price}</Text></View>
									          		<View style={{width: '100%',padding:3}}><Text style={gstyles.title}>{item.company}</Text></View>
									          		<View style={{width: '100%',padding:3}}><Text style={gstyles.title}>{item.location}</Text></View>
									               
							          		</View>
							        </View>
							                      
				                    }
				                keyExtractor={(item, index) => index.toString()}
								/>
								</View>
					}
					</ScrollView>
				</View>
			);
	}
}

const styles  = StyleSheet.create({
	  flatlist:{backgroundColor: '#fff', flexDirection: 'row', borderColor:'#adadad',borderBottomWidth:1},
	  flatimage:{marginTop:'15%', marginBottom:'10%', marginLeft: '5%', width: '10%', width: 115, height: 115},
	  title:{fontSize: 18, marginTop: 10,color:'#000',fontWeight:'bold'},
	  subtitle:{color: '#000', marginTop: '3%', fontSize: 18},
	  discountDeal:{color: '#ff0000', marginTop: '3%', fontSize: 18},
	  qtyView:{flexDirection: 'row',borderWidth: 1,borderColor:'#adadad',width:100,height:30,},
	  qtybuttonDecrease:{width:28,borderRightWidth:1,borderColor:'#adadad'},
	  qtybuttonIncrease:{width:28,borderLeftWidth:1,borderColor:'#adadad'},
	  qtyText:{width:40,textAlign:'center',fontSize: 14,textAlign:'center', color: 'rgb(147, 198, 87)', marginTop: '5%',borderColor:'#adadad'},
	  subTotal:{fontSize: 18,flexDirection:'column',width:'50%',color:'rgb(113,113,113)',paddingLeft:12},
	  subTotalAmount:{fontSize: 18,flexDirection:'column',width:'50%',textAlign:'right',color:'rgb(113,113,113)',fontWeight:'bold',paddingRight:10},
	  itemTotal:{fontSize: 18,flexDirection:'column',width:'50%',color:'#000'},
	  itemTotalRight:{fontSize: 18,flexDirection:'column',width:'50%',textAlign:'right',color:'#000'},
	  itemTotalRightIcon:{fontSize: 18,flexDirection:'column',width:'50%',textAlign:'right'},
	  orderTotalAmount:{fontSize: 18,flexDirection:'column',width:'50%',textAlign:'right',color:'#000',fontWeight:'bold'}
})
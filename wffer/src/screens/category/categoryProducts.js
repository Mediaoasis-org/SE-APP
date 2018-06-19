import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput,
  Platform,
  Dimension,
TouchableOpacity,
TouchableHighlight,
Image,
FlatList,
ScrollView,
StyleSheet,
ListView
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {gstyles} from '../../GlobalStyles';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { SearchComponent } from '../../components/Search';
import {Constants} from '../../common';
import { DrawerActions } from 'react-navigation';
import CheckBox from 'react-native-checkbox';
// import { CategoryListComponent } from '../../components/CategoryList';
// import iconFont from 'react-native-vector-icons/Fonts/FontAwesome.ttf';
// const window= Dimensions.get('window');

export class Products extends Component {

    constructor(props){
    	super(props);
    	this.state = {
            qty:1,
            activeRow:'',
            search:'',
            checked: false,
            fetchValues:[]
      }
      this.fetchValues();
    }
    componentDidMount(){
    	this.fetchValues()
    }
   //  removeCompleted = () => {
	  //   const {dispatch} = this.props
	  //   dispatch(actionCreators.removeCompleted())
	  // }

	decrease_qty(id,qty){
		// alert(qty)
		if(parseInt(qty)!=1){
		 qty=parseInt(qty)-1; 
		}
		this.setState({qty:qty});
	}
	 increase_qty(id,qty){
	   	// alert(id)
	   	
	   	qty=parseInt(qty)+1; 
	   	// alert(qty)
	   	this.setState({qty:qty});
	 }
	 fetchValues(){
	
		return fetch('https://wffer.com/se/api/rest/listings/index?oauth_consumer_key=mji82teif5e8aoloye09fqrq3sjpajkk&oauth_consumer_secret=aoxhigoa336wt5n26zid8k976v9pwipe&listingtype_id=2',{
			       
			        // headers:{
			        //   'Accept':'application/json',
			        //   'Content-Type':'application/json',
			        // },
			        method:'GET'
			      })
			      .then((response) => response.json())
			      .then((responseJson) => {
			    
			      	if(responseJson.status_code=='200'){
			      		 this.setState({
				          isLoading: false,
				          fieldValues: responseJson.body.response,
				        });
			      		 alert(JSON.stringify(this.state.fieldValues));
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
		return(
				<View style={gstyles.container}>
					<View style={gstyles.headerMenu}>
								<TouchableOpacity onPress={() =>this.props.navigation.dispatch(DrawerActions.openDrawer())} style={gstyles.headerMenuButton}>
									<Icon name="bars" size={24} color="#fff" />
			                    </TouchableOpacity>
			                    <Text style={gstyles.headerProfileLabel}>{this.props.navigation.state.params.cat_name}</Text>
			                    <TouchableOpacity onPress={()=>this.props.navigation.navigate('MultipleWishlist')} style={gstyles.headerRightButton}><Icon name="cart-plus" size={24} color="#fff" /></TouchableOpacity>

					</View>
					<ScrollView>
						<SearchComponent />
						<View style={{width:'100%',flexDirection:'row'}}>

							<FlatList data={[{id: '1',name:'Puck Cream Cheese Spread 500 g',discount:'40% Off',company:'Panda',category:'Dairy',price:'15.70 SAR',discountedPrice:'9.48 SAR',offerEnd:'16-5-18'},{id: '2',name:'Almarai Mozzarella Shredded Cheese 200 g  ',discount:'36% Off',company:'Panda',category:'Dairy',price:'9.40 SAR',discountedPrice:'5.98 SAR',offerEnd:'16-5-18'},{id: '3',name:'Golden Crown Cream 155 g ',discount:'34% Off',company:'Panda',category:'Dairy',price:'4.70 SAR',discountedPrice:'3.12 SAR',offerEnd:'17-5-18'},{id: '4',name:'Almarai Mozzarella Shredded Cheese 200 g  ',discount:'36% Off',company:'Panda',category:'Dairy',price:'9.40 SAR',discountedPrice:'5.98 SAR',offerEnd:'16-5-18'},{id: '5',name:'Golden Crown Cream 155 g ',discount:'34% Off',company:'Panda',category:'Dairy',price:'4.70 SAR',discountedPrice:'3.12 SAR',offerEnd:'17-5-18'}]}
		                		renderItem={({item}) =>      
					                    	<View style={styles.flatlist}>
								          		<View style={{flexDirection: 'column',width:'30%'}}>
								          			<View style={{width: '90%'}}>
								          				<TouchableOpacity  onPress={()=>this.props.navigation.navigate('ProductDetails')}>
								          					<Image source={require('../../../assets/product1.jpg')} style={styles.flatimage} />
								          				</TouchableOpacity>
								          			</View>
								          		 </View>
									            <View style={{flexDirection: 'column',width:'70%'}}>
										          		<View style={{width: '80%'}}><Text style={styles.title}>{item.name}</Text></View>
										          		<View style={{flexDirection:'row'}}>
										          			<View style={{flexDirection:'column',width:'80%'}}>
												          		<Text style={styles.discountDeal}>Best Deal</Text>
												          		<Text style={styles.subtitle}>$ {item.discountedPrice}</Text>	
												          	</View>
												          	<View style={{flexDirection:'column',width:'20%'}}>
												          		
													          		<CheckBox
																	  label=' '
																	  labelStyle={{color:'#000',fontSize:16}}
																	  onClick={() => this.setState({checked: !checked})}
																	  style={{color:'#ff0000',backgroundColor:'#00ff00'}}
																	/>	
																
															</View>
														</View>						               
								          		</View>
								        	</View>
					                    }
					                keyExtractor={(item, index) => index.toString()}
					              />
						</View>
					</ScrollView>
				</View>
			);
	}
}

const styles  = StyleSheet.create({
	  flatlist:{backgroundColor: '#fff', flexDirection: 'row', borderColor:'#adadad',borderBottomWidth:1},
	  flatimage:{marginTop:'15%', marginBottom:'10%', marginLeft: '5%', width: '100%', height: 115},
	  title:{fontSize: 18, marginTop: '10%',color:'#000'},
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


 // <View style={{flexDirection: 'row',marginTop: '10%',}}>	
	// 					          		   <Text style={{ fontSize: 15, color: '#000', paddingRight:10, paddingTop:3}}>Qty</Text>
							          		
	// 								  		<View style={styles.qtyView}>		 
	// 										       <TouchableHighlight 
	// 										        	onPress={() => this.decrease_qty(item.id,(item.qty>1)? item.qty : this.state.qty)}
	// 										        	 underlayColor='#BEBEBE' style={styles.qtybuttonDecrease}>
	// 										           <Image source={require('../../../assets/qtyDecrease.png')} style={gstyles.menuicon} resizeMode="contain" />
	// 										        </TouchableHighlight>
	// 										        <Text style={styles.qtyText}>{(item.qty>1)? item.qty : this.state.qty}</Text>
	// 										       <TouchableHighlight 
	// 										        	onPress={() => this.increase_qty(item.id,(item.qty>1)? item.qty : this.state.qty)}
	// 										        	 underlayColor='#BEBEBE' style={styles.qtybuttonIncrease}>
	// 										           <Image source={require('../../../assets/qtyIncrease.png')} style={gstyles.menuicon} resizeMode="contain" />
	// 										        </TouchableHighlight>
	// 								 		 </View>

							          		
						          
	// 					          		</View>
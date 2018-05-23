import React, { Component } from 'react';
// import { withNavigation } from 'react-navigation';
import {
  Text,
  TextInput,
  View,
  Dimension,
  TouchableOpacity,
  TouchableHighlight,
  Image,
  FlatList,
  ScrollView,
  Platform,
  StyleSheet
} from 'react-native';
import {gstyles} from '../../GlobalStyles';
import {Constants} from '../../common';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { DrawerActions } from 'react-navigation';
import CheckBox from 'react-native-checkbox';
import { SearchComponent } from '../../components/Search';
// import iconFont from 'react-native-vector-icons/Fonts/FontAwesome.ttf';
// const window= Dimensions.get('window');

export class WishlistComponent extends Component {
	constructor(props){
		super(props);
		this.state={
			name:'',
			note:'',
			checked: false,
		}
		// alert(JSON.stringify(this.props.navigation))
	}
	Capitalize(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
    }
	render(){
		// const navigation = this.props.navigation;
		return(
				<View style={gstyles.container}>
					<View style={gstyles.headerMenu}>
								<TouchableOpacity onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())} style={gstyles.headerMenuButton}>
									<Icon name="bars" size={24} color="#fff" />
			                    </TouchableOpacity>
			                    <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={gstyles.headerBackButton}>
									<Icon name="ellipsis-v" size={26} color="#fff" />
			                    </TouchableOpacity>
			                    <TouchableOpacity onPress={() =>{this.props.navigation.navigate('Products', {cat_name:'All Categories'})}} style={gstyles.headerRightButton}>
									<Text style={{color:'#fff'}}>Add Products</Text>
			                    </TouchableOpacity>
			                    
					</View>
					<ScrollView>
						<SearchComponent/>
						<View style={{width:'100%',alignItems:'center'}}><Text style={{padding:10,fontSize:20}}>First List</Text></View>
						
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
										          		<Text style={styles.subtitle}>In Grocery</Text>
										          		<View style={{flexDirection:'row'}}>
											          		<View style={{flexDirection:'column',width:'80%'}}>
											          			<Text style={[styles.subtitle]}>Qty : 1</Text>
											          			<Text style={styles.subtitle}>description</Text>
											          		</View>
											          		<View style={{margin:10,flexDirection:'column',width:'20%'}}>
												          		<CheckBox
																  label=' '
																  labelStyle={{color:'#000',fontSize:16}}
																  onClick={() => this.setState({checked: !checked})}
																  style={{color:'#ff0000',backgroundColor:'#00ff00',right:10}}
																/>	
											          		</View>	
											          	</View>				               
								          		</View>
								        	</View>
					                    }
					                keyExtractor={(item, index) => index.toString()}
					              />
						</View>
							
							<TouchableOpacity onPress={()=>this.props.navigation.navigate('GetPrice')} style={gstyles.buttonView}><Text style={gstyles.buttonText}>Get Price</Text></TouchableOpacity>
					</ScrollView>
					{
						(this.state.checked==true)?
							<TouchableHighlight underlayColor="transparent" style={styles.delete} onPress={()=> alert('items deleted')}><Icon name="trash" color="#fff" size={30} style={{padding:22}}/></TouchableHighlight>
						:
						null
					}
					
				</View>
			);
	}
}

const styles  = StyleSheet.create({
	  flatlist:{backgroundColor: '#fff', flexDirection: 'row', borderColor:'#adadad',borderBottomWidth:1,paddingBottom:5},
	  flatimage:{marginTop:'15%', marginBottom:'10%', marginLeft: '5%', width: '100%',  height: 115},
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
	  orderTotalAmount:{fontSize: 18,flexDirection:'column',width:'50%',textAlign:'right',color:'#000',fontWeight:'bold'},
	  delete:{
		...Platform.select({
			ios:{
				position:'absolute',
				bottom:5,
				zIndex:1000,
				right:7,
				width:70,
				height:70,
				borderRadius:50,
				backgroundColor:'#c74b4b'
			},
			android:{
				position:'absolute',
				bottom:5,
				zIndex:1000,
				right:7,
				width:70,
				height:70,
				borderRadius:50,
				backgroundColor:'#c74b4b'
			},
		  })
		},
})
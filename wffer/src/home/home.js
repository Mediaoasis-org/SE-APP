import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import {
  Text,
  View,
  Dimension,
TouchableOpacity,
Image,
FlatList,
ScrollView
} from 'react-native';
import {gstyles} from '../GlobalStyles';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
// import iconFont from 'react-native-vector-icons/Fonts/FontAwesome.ttf';
// const window= Dimensions.get('window');

export class HomeComponent extends Component {
	Capitalize(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
    }
    constructor(props){
    	super(props);

    }
	render(){
		return(
				<View style={gstyles.container}>
					<View style={gstyles.headerMenu}>
								<TouchableOpacity onPress={() => this.props.navigation.openDrawer()} style={gstyles.headerMenuButton}>
									<Icon name="bars" size={24} color="#fff" />
			                    </TouchableOpacity>
					</View>
					<ScrollView>
					<View style={{width:'100%',flexDirection:'row'}}>
						<FlatList numColumns={2} data={[{id: 1,name:'Puck Cream Cheese Spread 500 g',discount:'40% Off',company:'Panda',category:'Dairy',price:'15.70 SAR',discountedPrice:'9.48 SAR'}, 
														{id: 2,name:'Almarai Mozzarella Shredded Cheese 200 g  ',discount:'36% Off',company:'Panda',category:'Dairy',price:'9.40 SAR',discountedPrice:'5.98 SAR'},
														{id: 3,name:'Golden Crown Cream 155 g ',discount:'34% Off',company:'Panda',category:'Dairy',price:'4.70 SAR',discountedPrice:'3.12 SAR'}]}
			                renderItem={({item}) =>      
			                    <View style={{width: '50%',padding:15}}>
			                      <TouchableOpacity style={{alignItems:'center'}}><Image source={require('../../assets/product1.jpg')} style={gstyles.flatimage}/></TouchableOpacity>
			                          <View style={{flexDirection: 'column'}}>
			                          	  <Text style={{width:'60%',marginTop:10,backgroundColor:'#c30000',padding:5,color:'#fff',fontSize:16}}>{item.discount} </Text>
			                              <TouchableOpacity style={{width: '90%',height:100,paddingTop:10}} ><Text style={gstyles.title}>{this.Capitalize(item.name)}</Text></TouchableOpacity>
			                              <Text style={{color:'#808080',fontSize:16,fontWeight:'bold'}}>{item.category}</Text>
			                              <Text style={{color:'#c40b00',fontSize:17}}>{item.company}</Text>
			                              <Text style={{color:'#808080',fontSize:16,fontWeight:'bold',textDecorationLine: 'line-through', textDecorationStyle: 'solid'}}>{item.price}</Text>
			                              <Text style={{color:'#808080',fontSize:16,fontWeight:'bold'}}>{item.discountedPrice}</Text>
			                          </View>
			                    </View>                    
			                    }
			                keyExtractor={(item, index) => index}
			              />
					</View>
					</ScrollView>
				</View>
			);
	}
}
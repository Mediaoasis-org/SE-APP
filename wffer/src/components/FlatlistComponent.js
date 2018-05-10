import React, { Component } from 'react';
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

export class FlatlistComponent extends React.Component{
	Capitalize(str){
    	return str.charAt(0).toUpperCase() + str.slice(1);
    }
	render(){
		return(
			<View>
				<FlatList numColumns={2} data={this.props.data}
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
		)
	}
}
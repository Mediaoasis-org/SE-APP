import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, FlatList, StyleSheet } from 'react-native';
import {gstyles} from '../../GlobalStyles';

export class CategoryListComponent extends React.Component{
	
	_renderItem = ({item}) =>  {
		if (item === null) return <View />

    	return <TouchableOpacity style={styles.flatlist} onPress={()=>this.props.navigation.navigate('ProductDetails')}>
	    	
	      		<View style={{flexDirection: 'column'}}>
	      			<View style={{width: '90%'}}><Image source={require('../../../assets/product1.jpg')} style={styles.flatimage}/></View>
	      		</View>
	            <View style={{flexDirection: 'column'}}>
		          		<View style={{width: '80%'}}><Text style={styles.title}>{item.name}</Text></View>
		          		<Text style={styles.discountDeal}>Best Deal</Text>
		          		<Text style={styles.subtitle}>$ {item.discountedPrice}</Text>
	      		</View>

	    	</TouchableOpacity>	
    } 
	/// Capitalize(str){
 //    	return str.charAt(0).toUpperCase() + str.slice(1);
 //    }   			                   
	render(){
		return(
			<View>
	              <FlatList numColumns={1} data={this.props.data}
	                removeClippedSubviews
	                keyExtractor={(item, index) => index.toString()}
	                renderItem={this._renderItem}
	                
	              />
			</View>
		)
	}
}
const styles  = StyleSheet.create({
	  flatlist:{backgroundColor: '#fff', flexDirection: 'row', borderColor:'#adadad',borderBottomWidth:1},
	  flatimage:{marginTop:'15%', marginBottom:'10%', marginLeft: '5%', width: '10%', width: 115, height: 115},
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
/// <TouchableOpacity onPress={()=>this.props.navigation.navigate('ProductDetails')}>
import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import {
  Text,
  View,
  Dimensions,
TouchableOpacity,
Image,
TextInput,
Platform,
FlatList,
ScrollView
} from 'react-native';
import {gstyles} from '../../GlobalStyles';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { SearchComponent } from '../../components/Search';
import {Constants} from '../../common';
import { DrawerActions } from 'react-navigation';
// import {FlatlistComponent} from '../../components/FlatlistComponent';
const window= Dimensions.get('window');
export class Catalog extends Component {
	constructor(props){
		super(props);
		this.state={
    		search :'',
    	}
	}
	render(){
		return(
			<View style={gstyles.container}>
				<View style={gstyles.headerMenu}>
							<TouchableOpacity onPress={() =>this.props.navigation.dispatch(DrawerActions.openDrawer())} style={gstyles.headerMenuButton}>
								<Icon name="bars" size={24} color="#fff" />
		                    </TouchableOpacity>
		                    <Text style={gstyles.headerProfileLabel}>{Constants.AppName}</Text>
				</View>
				<ScrollView>
					<SearchComponent />
					<View style={{width:'100%',flexDirection:'row'}}>
						<FlatList data={[{id: '1',name:'Danube May 9 - May 15 ',total_items:'20',image:require("../../../assets/albumphoto.jpg")}, {id: '2',name:'Othaim May 10 -May 16',total_items:'30',image:require("../../../assets/albumphoto.jpg")}]}
			                renderItem={({item}) =>      
			                    <View style={{width: '100%'}}>
			                     
			                      <TouchableOpacity style={{alignItems:'center'}} onPress={()=>this.props.navigation.navigate('CatalogItems')}>
				                      <Text style={{padding:10,backgroundColor:'#000',color:'#fff',position:'absolute',top:0,zIndex:1000,right:0,fontSize:16,fontWeight:'bold'}}>{item.total_items}</Text>
				                      <Image source={item.image} style={{height: window.height/4,width: '100%'}} />
			                      </TouchableOpacity>
			                      <View style={{padding:10,backgroundColor:'#d7dade'}}><Text style={{fontSize:16,fontWeight:'bold',color:'#000'}}>{item.name}</Text></View> 
			                    </View>                    
			                    }
			                keyExtractor={(item, index) => index.toString()}
			              />
					
					</View>
				</ScrollView>
				</View>
		)
	}
}
// onPress={()=>this.props.navigation.navigate('CatalogItems')}
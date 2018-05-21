import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import {
  Text,
  View,
  Dimensions,
TouchableOpacity,
TextInput,
Image,
Platform,
// FlatList,
ScrollView
} from 'react-native';
// import Carousel from 'react-native-snap-carousel';
import Carousel from 'react-native-banner-carousel';
import {gstyles} from '../../GlobalStyles';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {Constants} from '../../common';
import { DrawerActions } from 'react-navigation';
import {SpecialOfferComponent} from '../../components/specialOffer';
import { SearchComponent } from '../../components/Search';
import { BannerSliderComponent } from '../../components/BannerSlider';
import { PromotionalOfferStoreComponent } from '../../components/PromotionalOfferStore';
// import iconFont from 'react-native-vector-icons/Fonts/FontAwesome.ttf';
// const window= Dimensions.get('window');

export class HomeComponent extends Component {

    constructor(props){
    	super(props);
    	this.state={
    		search :'',
    	}
    }
   //  removeCompleted = () => {
	  //   const {dispatch} = this.props
	  //   dispatch(actionCreators.removeCompleted())
	  // }
	   
	render(){
		return(
				<View style={gstyles.container}>
					<View style={gstyles.headerMenu}>
								<TouchableOpacity onPress={() =>this.props.navigation.dispatch(DrawerActions.openDrawer())} style={gstyles.headerMenuButton}>
									<Icon name="bars" size={24} color="#fff" />
			                    </TouchableOpacity>
			                    <Text style={gstyles.headerProfileLabel}>{Constants.AppName}</Text>
			                    <TouchableOpacity onPress={()=>this.props.navigation.navigate('ShoppingList')} style={gstyles.headerRightButton}><Icon name="shopping-basket" size={24} color="#fff" /></TouchableOpacity>
					</View>
					<ScrollView>
						<SearchComponent />
						<BannerSliderComponent />
						<PromotionalOfferStoreComponent />
						<View style={{borderBottomWidth:1,borderBottomColor:'#FFC107',padding:10,marginTop:10,backgroundColor:'#e9ebee'}}><Text style={{fontSize:18}}>Special Offers</Text></View>
						<View style={{width:'100%',flexDirection:'row'}}>

							<SpecialOfferComponent numcols={2} data={[{id: 1,name:'Puck Cream Cheese Spread 500 g',discount:'40% Off',company:'Panda',category:'Dairy',price:'15.70 SAR',discountedPrice:'9.48 SAR',offerEnd:'16-5-18'}, 
															{id: 2,name:'Almarai Mozzarella Shredded Cheese 200 g  ',discount:'36% Off',company:'Panda',category:'Dairy',price:'9.40 SAR',discountedPrice:'5.98 SAR',offerEnd:'16-5-18'},
															{id: 3,name:'Golden Crown Cream 155 g ',discount:'34% Off',company:'Panda',category:'Dairy',price:'4.70 SAR',discountedPrice:'3.12 SAR',offerEnd:'16-5-18'},
															{id: 4,name:'Almarai Mozzarella Shredded Cheese 200 g  ',discount:'36% Off',company:'Panda',category:'Dairy',price:'9.40 SAR',discountedPrice:'5.98 SAR',offerEnd:'16-5-18'},
															{id: 5,name:'Golden Crown Cream 155 g ',discount:'34% Off',company:'Panda',category:'Dairy',price:'4.70 SAR',discountedPrice:'3.12 SAR',offerEnd:'16-5-18'}]}/>
						</View>
					</ScrollView>
				</View>
			);
	}
}
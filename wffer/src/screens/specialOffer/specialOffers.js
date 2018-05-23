import React, { Component } from 'react';
import { Text, View, Dimension, TouchableOpacity, Image, ScrollView,Platform,TextInput } from 'react-native';
import { gstyles } from '../../GlobalStyles';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { Constants } from '../../common';
import { DrawerActions } from 'react-navigation';
import { SpecialOfferComponent } from '../../components/specialOffer';
import { SearchComponent } from '../../components/Search';
import { ModalDropdownComponent } from '../../components/ModalDropdown';

export class SpecialOffers extends Component {
    constructor(props){
    	super(props);
    	this.state={
    		search:''
    	}
    }
    removeCompleted = () => {
	    const {dispatch} = this.props
	    dispatch(actionCreators.removeCompleted())
	}
	render(){
		return(
				<View style={gstyles.container}>
					<View style={gstyles.headerMenu}>
								<TouchableOpacity onPress={() =>this.props.navigation.dispatch(DrawerActions.openDrawer())} style={gstyles.headerMenuButton}>
									<Icon name="bars" size={24} color="#fff" />
			                    </TouchableOpacity>
			                    <Text style={gstyles.headerProfileLabel}>{Constants.specialOffer}</Text>
			                    <TouchableOpacity onPress={()=>this.props.navigation.navigate('ShoppingList')} style={gstyles.headerRightButton}><Icon name="shopping-basket" size={24} color="#fff" /></TouchableOpacity>
					</View>
					<ScrollView>
					<SearchComponent />						
						<ModalDropdownComponent defaultValue='Select Store' options={['Store1','Store2','Store3','Store4','Store5','Store6']}/>				
						<View style={gstyles.specialOfferView}>
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
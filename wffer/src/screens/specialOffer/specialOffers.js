import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { gstyles } from '../../GlobalStyles';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { Constants } from '../../common';
// import { DrawerActions } from 'react-navigation';
import { SpecialOfferComponent } from '../../components/specialOffer';
import { SearchComponent } from '../../components/Search';
import ModalDropdown from 'react-native-modal-dropdown';

export class SpecialOffers extends Component {
    constructor(props){
    	super(props);
    	this.state={
    		search:''
    	}
    }

    handleInput(idx,data,value){
     	var state = value;
     	var val = idx;
     	// console.log(state);
     	// console.log(val); 
     	// console.log(data);  
     	var obj  = {}
     	obj[state] = data;
     	// obj.append(obj[])
     	this.setState(obj);
     	console.log(obj)
     	// console.log(this.state[state]);
    }

	onTagSelect(idx, data,name){ 
	      // console.log("======== on tag selected ==========="); 
	      // console.log(idx,data,name); 
	      this.handleInput(idx,data,name)
	};

	select_dropdown(value,options){
	 	let data;
	 		// console.log(value);
	 		// return value
	 		Object.keys(options).map(function(k){
	 			// console.log(options[k],k);
	 			if(options[k] == value){
	 				// return options[k]
	 				// console.log(value);
	 				// console.log(k)
	 				// console.log(options[k])
	 				data = options[k];
	 			}


	 		})
	 		return data
	}

    removeCompleted = () => {
	    const {dispatch} = this.props
	    dispatch(actionCreators.removeCompleted())
	}
	render(){
		return(
				<View style={gstyles.container}>
					<View style={gstyles.headerMenu}>
								<TouchableOpacity onPress={() =>this.props.navigation.openDrawer()} style={gstyles.headerMenuButton}>
									<Icon name="bars" size={24} color="#fff" />
			                    </TouchableOpacity>
			                    <Text style={gstyles.headerProfileLabel}>{Constants.specialOffer}</Text>
			                    <TouchableOpacity onPress={()=>this.props.navigation.navigate('ShoppingList')} style={gstyles.headerRightButton}><Icon name="shopping-basket" size={24} color="#fff" /></TouchableOpacity>
					</View>
					<ScrollView>
					<SearchComponent />	
						    <ModalDropdown 
			                      style={gstyles.dropdownMainStyles}						                      
			                      dropdownTextStyle={gstyles.dropdownTextStyle}
			                      textStyle={gstyles.textStyle}
			                      dropdownStyle={gstyles.dropdownStyles}
			                      defaultIndex={this.props.defaultIndex}
			                      showsVerticalScrollIndicator={true}
			                      defaultValue='Select Store'
			                      options={['Store1','Store2','Store3','Store4','Store5','Store6']}						         
			                      onSelect={(idx, data)=>{ this.onTagSelect(idx, data,data)}}				
	                		/>								
						<View style={gstyles.specialOfferViewHome}>
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


//// <ModalDropdown 
// 			                      style={gstyles.dropdownMainStyles}						                      
// 			                      dropdownTextStyle={gstyles.dropdownTextStyle}
// 			                      textStyle={gstyles.textStyle}
// 			                      dropdownStyle={gstyles.dropdownStyles}
// 			                      defaultIndex={this.props.defaultIndex}
// 			                      showsVerticalScrollIndicator={true}
// 			                      defaultValue={this.state[item.name]=='' ? item.label : this.select_dropdown(this.state[item.name],item.multiOptions)}
// 			                      options={item.multiOptions}						         
// 			                      onSelect={(idx, data)=>{ this.onTagSelect(idx, data,item.name)}}				
// 	                		/>	
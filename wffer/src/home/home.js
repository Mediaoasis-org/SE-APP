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
import { DrawerActions } from 'react-navigation';
import {FlatlistComponent} from '../components/FlatlistComponent';
// import iconFont from 'react-native-vector-icons/Fonts/FontAwesome.ttf';
// const window= Dimensions.get('window');

export class HomeComponent extends Component {

    constructor(props){
    	super(props);

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
					</View>
					<ScrollView>
					<View style={{width:'100%',flexDirection:'row'}}>
						<FlatlistComponent onRemoveCompleted={this.removeCompleted} data={[{id: 1,name:'Puck Cream Cheese Spread 500 g',discount:'40% Off',company:'Panda',category:'Dairy',price:'15.70 SAR',discountedPrice:'9.48 SAR'}, 
														{id: 2,name:'Almarai Mozzarella Shredded Cheese 200 g  ',discount:'36% Off',company:'Panda',category:'Dairy',price:'9.40 SAR',discountedPrice:'5.98 SAR'},
														{id: 3,name:'Golden Crown Cream 155 g ',discount:'34% Off',company:'Panda',category:'Dairy',price:'4.70 SAR',discountedPrice:'3.12 SAR'}]}/>
					</View>
					
					</ScrollView>
				</View>
			);
	}
}
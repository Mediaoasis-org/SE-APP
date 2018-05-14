import React, { Component, PropTypes  } from 'react';
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
import { DrawerActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
export class HeaderComponent extends Component<Props> {
	constructor(props){
    	super(props);

    }
	render(){
		return(
				<View style={gstyles.headerMenu}>
							<TouchableOpacity onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())} style={gstyles.headerMenuButton}>
								<Icon name="bars" size={24} color="#fff" />
		                    </TouchableOpacity>
				</View>
		)
	}
}
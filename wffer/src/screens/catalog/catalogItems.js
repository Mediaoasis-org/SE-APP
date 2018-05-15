import React, { Component,PureComponent } from 'react';
import { withNavigation } from 'react-navigation';
import {
  Text,
  View,
  Dimensions,
TouchableOpacity,
TouchableHighlight,
Image,
FlatList,
ScrollView,
Modal
} from 'react-native';
import {gstyles} from '../../GlobalStyles';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {Constants} from '../../common';
import { DrawerActions } from 'react-navigation';
import Carousel from 'react-native-snap-carousel';
// import {FlatlistComponent} from '../../components/FlatlistComponent';
const window= Dimensions.get('window');
export class CatalogItems extends PureComponent {
	constructor(props){
		super(props);
	}
	state = {
	    modalVisible: false,
	};
	setModalVisible(visible) {
	    this.setState({modalVisible: visible});
	}
	_renderItem ({item, index}) {
        return (
            <View style={{}}>
                <Image source={item.image}/>
            </View>
        );
    }

	render(){
		return(
			<View style={gstyles.container}>
				<View style={gstyles.headerMenu}>
							<TouchableOpacity onPress={() =>this.props.navigation.goBack()} style={gstyles.headerMenuButton}>
								<Icon name="angle-left" size={24} color="#fff" />
		                    </TouchableOpacity>
		                    <Text style={gstyles.headerProfileLabel}>{Constants.AppName}</Text>
				</View>
				
					<View style={{width:'100%',flexDirection:'row'}}>
						<FlatList numColumns={2} removeClippedSubviews={true} data={[{id: '1',image:require("../../../assets/albumItem.jpg")}, {id: '2',image:require("../../../assets/albumItem.jpg")},{id: '3',image:require("../../../assets/albumItem.jpg")},{id: '4',image:require("../../../assets/albumItem.jpg")}]}
			                renderItem={({item}) =>      
			                    <View style={{width: '50%',padding:10}}>
			                     <Modal
							          animationType="slide"
							          transparent={false}
							          visible={this.state.modalVisible}
							          onRequestClose={() => {
							            alert('Modal has been closed.');
							          }}>
							          <View style={{marginTop:22,marginBottom:10,marginLeft:10,marginRight:10}}>
							           <TouchableHighlight style={{backgroundColor:'#000', padding:10,width:window.width/10,borderRadius:50,position:'absolute',right:0,top:0,zIndex:1000}}
						                onPress={() => {
						                  this.setModalVisible(!this.state.modalVisible);
						                }}>
						                <Icon name="close" size={24} color="#fff" />
						              </TouchableHighlight>
							            <Carousel
							              ref={'carousel'}
							              data={[{id: '1',image:require("../../../assets/albumItem.jpg")}, {id: '2',image:require("../../../assets/albumItem.jpg")},{id: '3',image:require("../../../assets/albumItem.jpg")},{id: '4',image:require("../../../assets/albumItem.jpg")}]}
							              renderItem={this._renderItem}
							              sliderWidth={window.width*0.95}
							              itemWidth={window.width}
							              
							            />
							          </View>
							        </Modal>
			                      <TouchableOpacity style={{alignItems:'center'}} onPress={() => {this.setModalVisible(true)}}>
				                      <Image source={item.image} style={{height: window.height/4,width: '100%'}}/>
			                      </TouchableOpacity>
			                      
			                    </View>                    
			                    }
			                keyExtractor={(item, index) => index.toString()}
			              />
					}
					</View>
				
				</View>
		)
	}
}
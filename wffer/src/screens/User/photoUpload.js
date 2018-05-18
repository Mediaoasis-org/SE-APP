import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import {gstyles} from '../../GlobalStyles';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { DrawerActions } from 'react-navigation';

export  class UploadPhotoComponent extends Component {
	constructor(props){
		super(props);
		this.state={
			ImageSource:null
		}
	}
	static navigationOptions = {
        title: 'Edit My Photo',
        

    };
    selectPhotoTapped() {
      const options = {
        quality: 1.0,
        maxWidth: 500,
        maxHeight: 500,
        storageOptions: {
          skipBackup: true
        }
      };
      ImagePicker.showImagePicker(options, (response) => {
        // console.log('Response = ', response);
  
        if (response.didCancel) {
          // console.log('User cancelled photo picker');
        }
        else if (response.error) {
          // console.log('ImagePicker Error: ', response.error);
        }
        else if (response.customButton) {
          // console.log('User tapped custom button: ', response.customButton);
        }
        else {
          let source = { uri: response.uri };
         
          // You can also display the image using data:
          // let source = { uri: 'data:image/jpeg;base64,' + response.data };
          console.log(response.fileName)
          this.setState({
 
            ImageSource: source
 
          });
        }
      });
      // console.log('work');
    }
	render(){
		return(
			<View style={gstyles.container}>
					<View style={gstyles.headerMenu}>
								<TouchableOpacity onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())} style={gstyles.headerMenuButton}>
									<Icon name="bars" size={24} color="#fff" />
			                    </TouchableOpacity>
			                    <Text style={gstyles.headerProfileLabel}>Profile</Text>
					</View>
				 	<View style={{flexDirection: 'column',justifyContent: 'center',alignItems: 'center',padding:20,}}>
                            <TouchableOpacity style={{position:'absolute',top:20,left:'61%',zIndex:1000}} onPress={this.selectPhotoTapped.bind(this)}><Image source={require('../../../assets/account_settings_camera.png')} style={{width:24,height:24}}/></TouchableOpacity>
                                 {this.state.ImageSource === null ? <Image source={require('../../../assets/nophoto_user_thumb_profile.png')} style={styles.image}/> :
                                    <Image style={styles.image} source={this.state.ImageSource} />
                                  }
                    </View>
                    <TouchableOpacity onPress={()=>alert('submit')} style={{margin:10,padding:10,backgroundColor:'#696969',alignItems:'center'}}><Text style={{color:'#fff',fontSize:16,fontWeight:'bold'}}>Save Photo</Text></TouchableOpacity>
			</View>
		)
	}
}
const styles = StyleSheet.create({
	image:{
	  paddingTop: 10,
	  width: 200,
	  height: 200,
	  borderRadius: 100,
	},
})

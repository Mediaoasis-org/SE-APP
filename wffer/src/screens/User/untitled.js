import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';
import {gstyles} from '../../GlobalStyles';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { DrawerActions } from 'react-navigation';

export  class UploadPhotoComponent extends Component {
	constructor(props){
		super(props);
		this.state={
			// ImageSource:'',
      oauthToken:'',
      oauthSecret:'',
      userData:[],
      dataSource:[],
      data:[]
		}
    
	}
  componentDidMount(){
    this._getStorageValue();
  }
  async _getStorageValue(){
     var userData = await AsyncStorage.getItem('userData');
     this.setState({userData:JSON.parse(userData)});
     this.setState({oauthToken:this.state.userData.oauth_token});
     this.setState({oauthSecret:this.state.userData.oauth_secret});
     // alert(this.state.oauthToken)
     this.fetchFields()
     // if(value == null){
     //  this.setState({LoggedIn:false})
     //  this.fetchFields(); 
     //  }
     //  else
     //  {
     //    // alert('entering');
     //    const data = JSON.parse(value);
     //    // alert(data)
     //  this.setState({LoggedIn:true})
     //  this.setState({dataSource:data});
     //  this.setState({ImageSource:this.state.dataSource.image_profile})
     //  // console.log(this.state.dataSource)
     //  }
  }
  fetchFields(){
        
        fetch('https://wffer.com/se/api/rest/members/edit/photo?oauth_consumer_key=mji82teif5e8aoloye09fqrq3sjpajkk&oauth_consumer_secret=aoxhigoa336wt5n26zid8k976v9pwipe&oauth_token='+ this.state.oauthToken + '&oauth_secret=' +this.state.oauthSecret,{
             
              // headers:{
              //   'Accept':'application/json',
              //   'Content-Type':'application/json',
              // },
              method:'GET'
            })
            .then((response) => response.json())
            .then((responseJson) => {
              if(responseJson.status_code=='200'){
                 this.setState({
                // isLoading: false,
                data: responseJson.body,
                ImageSource:responseJson.body.image_profile
              },function(){
                 
                  // alert(JSON.stringify(this.state.data));  
                  // this.setState({ImageSource:this.state.data.image_profile})
                  // alert(JSON.stringify(this.state.data.image_profile));

                
              });
              }
              else
              {
                // this.setState({Message:responseJson.Message});
              }
            })
            .catch((error) =>{
              console.error(error);
            });
      
  }
  uploadPhoto(){
      // alert(this.state.ImageSource);
      // alert(this.state.oauthSecret);
      // alert(this.state.oauthToken);
      var formData = new FormData;
        formData.append('photo',this.state.ImageSource);
        // formData.append('oauth_consumer_key','mji82teif5e8aoloye09fqrq3sjpajkk');
        // formData.append('oauth_consumer_secret','aoxhigoa336wt5n26zid8k976v9pwipe');
        // formData.append('ip','45.121.29.194');
          return fetch('https://wffer.com/se/api/rest/members/edit/photo?oauth_consumer_key=mji82teif5e8aoloye09fqrq3sjpajkk&oauth_consumer_secret=aoxhigoa336wt5n26zid8k976v9pwipe&oauth_token='+ this.state.oauthToken + '&oauth_secret=' +this.state.oauthSecret ,{
            body: formData,
            headers:{
              'Accept':'application/json',
              'Content-Type': 'multipart/form-data'
            },
            method:'POST'
          })
            .then((response) => response.json())
            .then((responseJson) => {
              
              if(responseJson.status_code=="204"){
                this.setState({
                  Message : 'Photo Successfully Uploaded'
                }, function(){})
              }
              else
              {
                this.setState({
                  Message : responseJson.message,
                })
                alert(JSON.stringify(responseJson))
              
              }
              

            })
           
            .catch((error) =>{
              console.error(error);
            });
    
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
          // console.log("source " + source)
          this.setState({
 
            ImageSource: source
 
          });
        }
      });
      // console.log('work');
    }
	render(){
    if (this.state.data.length === 0) {
      return null
    }
		return(
			<View style={gstyles.container}>
					<View style={gstyles.headerMenu}>
								<TouchableOpacity onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())} style={gstyles.headerMenuButton}>
									<Icon name="bars" size={24} color="#fff" />
			                    </TouchableOpacity>
			                    <Text style={gstyles.headerProfileLabel}>Profile</Text>
					</View>
          <View style={gstyles.profileHeadingView}><Text style={gstyles.profileHeadingText}>Edit Photo</Text></View>
				 	<View style={{flexDirection: 'column',justifyContent: 'center',alignItems: 'center',padding:20,}}>
                            <TouchableOpacity style={{position:'absolute',top:20,left:'61%',zIndex:1000}} onPress={this.selectPhotoTapped.bind(this)}><Image source={require('../../../assets/account_settings_camera.png')} style={{width:24,height:24}}/></TouchableOpacity>
                                    <Image style={styles.image} source={{uri:this.state.ImageSource}} />                                
                    </View>
                    <TouchableOpacity onPress={()=>this.uploadPhoto()} style={gstyles.buttonView}><Text style={gstyles.buttonText}>Save Photo</Text></TouchableOpacity>
                    <View style={gstyles.newToView}><Text style={gstyles.newToText}>OR</Text></View>
                    <TouchableOpacity onPress={()=>this.removePhoto()} style={gstyles.createAccountView}><Text style={gstyles.createAccountText}>Remove Photo</Text></TouchableOpacity>
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

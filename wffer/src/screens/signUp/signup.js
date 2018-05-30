import React, { Component } from 'react';
import { Text, TextInput, View, TouchableOpacity, ScrollView,AsyncStorage,StyleSheet,Image } from 'react-native';
import { Constants } from '../../common';
import { ModalDropdownComponent } from '../../components/ModalDropdown';
import { gstyles } from '../../GlobalStyles';
import CheckBox from 'react-native-checkbox';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { DrawerActions } from 'react-navigation';
import ImagePicker from 'react-native-image-picker';
export class SignupComponent extends Component {
	constructor(props){
		super(props);
		this.state={
			dataSource:[],
			dataSourcePersonal:[],
			dataSourcePhoto:[],
			email:'',
			password:'',
			passwordconf:'',
			timezone:'',
			language:'',
			ImageSource:null,
			// email:'',
			// password:'',
			 checked: false,
			 LoggedIn:null,
			 accountShow:true,
			 personalInformationShow:false,
			 photoUploadShow:false,
		}
		// alert(JSON.stringify(this.props.navigation))
		this._getStorageValue()
	}
	async _getStorageValue(){

		// this.fetchFields()
	  var value = await AsyncStorage.getItem('fieldsSignup');
	  var valuePersonal = await AsyncStorage.getItem('fieldsSignupPersonal');
	  var valuePhoto = await AsyncStorage.getItem('fieldsSignupPhoto');
	  // alert(value)
	  if(value!=null){
	  	// alert('entering');
	  	// const data = JSON.parse(value)
	  const	data= JSON.parse(value);
	  	this.setState({LoggedIn:true})
		this.setState({dataSource:data});
		this.setState({dataSourcePersonal:JSON.parse(valuePersonal)});
		this.setState({dataSourcePhoto:JSON.parse(valuePhoto)});
		// console.log(this.state.dataSource)
	  }
	  else
	  {
	  	this.setState({LoggedIn:false})
	  	this.fetchFields();
	  }
	}
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
	fetchFields(){
		
			 return fetch('https://wffer.com/se/api/rest/signup?oauth_consumer_key=mji82teif5e8aoloye09fqrq3sjpajkk&oauth_consumer_secret=aoxhigoa336wt5n26zid8k976v9pwipe',{
			       
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
			          isLoading: false,
			          dataSource: responseJson.body.account,
			          dataSourcePersonal: responseJson.body.fields,
			          dataSourcePhoto:responseJson.body.photo,
			        },async function(){
			       	  await AsyncStorage.setItem('fieldsSignup', JSON.stringify(this.state.dataSource));
			       	  await AsyncStorage.setItem('fieldsSignupPersonal', JSON.stringify(this.state.dataSourcePersonal));
			       	  await AsyncStorage.setItem('fieldsSignupPhoto', JSON.stringify(this.state.dataSourcePhoto));
			       	  
			        	// alert(JSON.stringify(this.state.dataSource));   	
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
	Capitalize(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
    }
    signup(){
    	var formData = new FormData;
		    formData.append('email',this.state.email);
		    formData.append('password',this.state.password);
		    formData.append('passconf',this.state.passwordconf);
		    formData.append('timezone',this.state.timezone);
		    formData.append('language',this.state.language);
		    formData.append('terms',this.state.checked);
		    formData.append('oauth_consumer_key','mji82teif5e8aoloye09fqrq3sjpajkk');
		    formData.append('oauth_consumer_secret','aoxhigoa336wt5n26zid8k976v9pwipe');
		    // formData.append('ip','45.121.29.194');
		      return fetch('https://wffer.com/se/api/rest/signup',{
		        body: formData,
		        headers:{
		          'Accept':'application/json',
		          'Content-Type': 'multipart/form-data'
		        },
		        method:'POST'
		      })
		        .then((response) => response.json())
		        .then((responseJson) => {
		        	
		          if(responseJson.status_code=="200"){
		            this.setState({
		              isLoading: false,
		              dataSource1: responseJson.body,
		            }, async function(){
			        await AsyncStorage.setItem('userData', JSON.stringify(this.state.dataSource1));
		              // alert(JSON.stringify(responseJson.body.user));
		              this.props.navigation.navigate('Home');
		            });
		          }
		          else
		          {
		            this.setState({
		              Message : responseJson.message,
		            })
		            alert(JSON.stringify(responseJson.message))
		          
		          }
		          

		        })
		       
		        .catch((error) =>{
		          console.error(error);
		        });
    }
    
     selected(index,value){
      alert(value)
      return value;
    }
    continue(){
    	this.setState({personalInformationShow:true});
    	this.setState({accountShow:false});
    	this.setState({photoUploadShow:false})
    }
    continuePhoto(){
    	this.setState({personalInformationShow:false});
    	this.setState({accountShow:false});
    	this.setState({photoUploadShow:true})
    }

    //renders account fields for user
    renderAccount(){
    	 if(this.state.accountShow) {
    	return(
    	<View>
    	{

	    	this.state.dataSource.map((item)=>{
			
				if(item.type=='Text'){
					return (
					<View key={item.id}>
							<TextInput name={item.name} style={gstyles.textInputStyle} placeholder={item.label} underlineColorAndroid="#fff" onChangeText={(text) => this.setState({[item.name]: text})}/>
							
					</View>
					
				);
				}
				if(item.type=='Password'){
					return (
					<View key={item.id}>
							<TextInput name={item.name} style={gstyles.textInputStyle} secureTextEntry={true} placeholder={item.label} underlineColorAndroid="#fff" onChangeText={(text) => this.setState({[item.name]: text})}/>
							
					</View>
					)
				}
				
				if(item.type=='Select'){
					var options = item.multiOptions;
					var result = [];
					for(var i in options)
					    result.push([options [i]]);
					return(
					<View>
						<ModalDropdownComponent defaultValue={item.type + ' ' + item.label}
        					options={result}
        					onSelect={(index,value)=>this.selected(index,value)}
        					/>
        			</View>
					)
					
				}
				if(item.type=='Checkbox'){
					return(
					<View style={{padding: 10}} key={item.id}>
						<CheckBox
						  label={item.description}
						  labelLines={4}
						  labelStyle={{color:'#000',fontSize:16,padding:3}}
						  onClick={() => this.setState({checked: !checked})}
						  style={{color:'#ff0000',backgroundColor:'#00ff00'}}
						/>
					</View>
					)
				}
			})
		
		}
		<View style={gstyles.termsView}><TouchableOpacity><Text style={gstyles.termsLink}>Click Here</Text></TouchableOpacity><Text style={gstyles.fontSize18}> to read the terms of service</Text></View>
							<TouchableOpacity onPress={()=>this.continue()} style={gstyles.buttonView}><Text style={gstyles.buttonText}>Continue</Text></TouchableOpacity>
		</View>
		)
		}		
    }
    //renders personal information fields for user
    renderPersonalInformation(){
    	if(this.state.personalInformationShow) {
    	return(
    	<View>
    	{

	    	this.state.dataSourcePersonal["Personal Information"].map((item)=>{
			
				if(item.type=='Text'){
					return (
					<View key={item.id}>
							<TextInput name={item.name} style={gstyles.textInputStyle} placeholder={item.label} underlineColorAndroid="#fff" onChangeText={(text) => this.setState({[item.name]: text})}/>
							
					</View>
					
				);
				}
				
				if(item.type=='Select'){
					var options = item.multiOptions;
					var result = [];
					for(var i in options)
					    result.push([options [i]]);
					return(
					<View>
						<ModalDropdownComponent defaultValue={item.type + ' ' + item.label}
        					options={result}
        					onSelect={(index,value)=>this.selected(index,value)}
        					/>
        			</View>
					)
					
				}
			})
		
		}
	
		<TouchableOpacity onPress={()=>this.continuePhoto()} style={gstyles.buttonView}><Text style={gstyles.buttonText}>Continue</Text></TouchableOpacity>
		</View>
		)
		}		
    }
    //renders photo fields for user
    renderPhoto(){
    	if(this.state.photoUploadShow) {
	    	return(
	    			<View>
		    			<View style={{flexDirection: 'column',justifyContent: 'center',alignItems: 'center',padding:20,}}>
                            <TouchableOpacity style={{position:'absolute',top:20,left:'61%',zIndex:1000}} onPress={this.selectPhotoTapped.bind(this)}><Image source={require('../../../assets/account_settings_camera.png')} style={{width:24,height:24}}/></TouchableOpacity>
                                 {this.state.ImageSource === null ? <Image source={require('../../../assets/nophoto_user_thumb_profile.png')} style={styles.image}/> :
                                    <Image style={styles.image} source={this.state.ImageSource} />
                                  }
                    	</View>
                    	<TouchableOpacity onPress={()=>this.props.navigation.navigate('Home')} style={gstyles.buttonView}><Text style={gstyles.buttonText}>Submit</Text></TouchableOpacity>

                    </View>
		    	
		    );
    	}
    }

	render(){
		return(
				<View style={gstyles.container}>
					<View style={gstyles.headerMenu}>
								<TouchableOpacity onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())} style={gstyles.headerMenuButton}>
									<Icon name="bars" size={24} color="#fff" />
			                    </TouchableOpacity>
			                    <Text style={gstyles.headerProfileLabel}>{Constants.Signup}</Text>
					</View>
					<ScrollView>
						<View style={gstyles.profileHeadingView}><Text style={gstyles.profileHeadingText}>Sign Up</Text></View>

						<View>
							{
                      (this.state.dataSource.length > 0) ?  
                 
                      	<View>
                            {this.renderAccount()}
                            {this.renderPersonalInformation()}
                            {this.renderPhoto()}
                         </View>
                       
                    : null                
                    }
				   			
							
						</View>
					</ScrollView>
				</View>
			);
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
// <TextInput name="email" keyboardType="email-address" placeholder="Email Address" returnKeyType="next" underlineColorAndroid="#fff" style={gstyles.textInputStyle}/>	
// 							<TextInput name="password" placeholder="Password" secureTextEntry={true} underlineColorAndroid="#fff" style={gstyles.textInputStyle}/>	
// 							<TextInput name="confirm_password" placeholder="Confirm Password" secureTextEntry={true} underlineColorAndroid="#fff" style={gstyles.textInputStyle}/>
	// <ModalDropdownComponent defaultValue='Select Time Zone'
	// 			                	options={['(UTC+5:30) Bombay,Calcutta,New Delhi','(UTC+5:45) Nepal','(UTC+6) Dhaka','(UTC+9:30) Darwin']}/>	
	// 						<ModalDropdownComponent defaultValue='Select Language' options={['English','Saudi Arabia Arabic']}/>

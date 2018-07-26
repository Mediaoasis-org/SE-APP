import React, { Component } from 'react';
import { Text, TextInput, View, TouchableOpacity, ScrollView,AsyncStorage,Image,ActivityIndicator,KeyboardAvoidingView } from 'react-native';
import { Constants } from '../../common';
import { gstyles } from '../../GlobalStyles';
import CheckBox from 'react-native-checkbox';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import ImagePicker from 'react-native-image-picker';
import ModalDropdown from 'react-native-modal-dropdown';
export class SignupComponent extends Component {
	constructor(props){
		super(props);
		this.state={
			ImageSource:'',
			name:'',
			dataSource:[],
			dataSourcePersonal:[],
			email:'',
			password:'',
			passconf:'',
			// timezone:null,
			// language:null,
			'1_1_3_alias_first_name':'',
			'1_1_4_alias_last_name':'',
			 // checked: false,
			 LoggedIn:null,
			 isLoading:true,
		}
		// alert(JSON.stringify(this.props.navigation))
		this._getStorageValue()
		// this.handleInput = this.handleInput.bind(this);
	}
	async _getStorageValue(){
	  var valuePersonal = await AsyncStorage.getItem('fieldsSignupPersonal');
	  var value = await AsyncStorage.getItem('fieldsSignup');
	  if(value!=null){
	  const	data= JSON.parse(value);
	  	this.setState({LoggedIn:true})
	  	this.setState({dataSourcePersonal:JSON.parse(valuePersonal)});
		this.setState({dataSource:data});		
		this.setState({isLoading: false})
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
            ImageSource: source,
            name:response.fileName,
          });
        }
      });
      // console.log('work');
    }
	fetchFields(){	
			 return fetch('https://wffer.com/se/api/rest/signup?oauth_consumer_key=mji82teif5e8aoloye09fqrq3sjpajkk&oauth_consumer_secret=aoxhigoa336wt5n26zid8k976v9pwipe',{
			        method:'GET'
			      })
			      .then((response) => response.json())
			      .then((responseJson) => {
			      	if(responseJson.status_code=='200'){
			      		 this.setState({
			          isLoading: false,
			          dataSource: responseJson.body,
			          dataSourcePersonal: responseJson.body.fields,
			        },async function(){
			       	  await AsyncStorage.setItem('fieldsSignup', JSON.stringify(this.state.dataSource));
			       	  await AsyncStorage.setItem('fieldsSignupPersonal', JSON.stringify(this.state.dataSourcePersonal));  	
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

    signup(){
    	this.continue()
    	var formData = new FormData;
		    formData.append('email',this.state.email);
		    formData.append('password',this.state.password);
		    formData.append('passconf',this.state.passconf);
		    // formData.append('timezone',this.state.timezone);
		    // formData.append('language',this.state.language);
		    // formData.append('terms',this.state.checked);
		    formData.append('1_1_3_alias_first_name',this.state['1_1_3_alias_first_name']);
		    formData.append('1_1_4_alias_last_name',this.state['1_1_4_alias_last_name']);
		    if(this.state.ImageSource!=''){
		    	formData.append('photo',{uri: this.state.ImageSource.uri, name: this.state.name, type: 'multipart/form-data'});
		    }
		    
		    formData.append('oauth_consumer_key','mji82teif5e8aoloye09fqrq3sjpajkk');
		    formData.append('oauth_consumer_secret','aoxhigoa336wt5n26zid8k976v9pwipe');
		    formData.append('ip','45.121.29.194');
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
		              dataSource1: responseJson.body,
		            }, async function(){
		              this.props.navigation.navigate('Login');
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
    // handleInput(idx,data,value){
    //  	var state = value;
    //  	var val = idx;
    //  	// console.log(state);
    //  	// console.log(val); 
    //  	// console.log(data);  
    //  	var obj  = {}
    //  	obj[state] = idx;
    //  	// obj.append(obj[])
    //  	this.setState(obj);
    //  	console.log(obj)
    //  	// console.log(this.state[state]);
    //  }
 //     onTagSelect(idx, data,name){ 
	//       // console.log("======== on tag selected ==========="); 
	//       // console.log(idx,data,name); 
	//       this.handleInput(idx,data,name)
	// };
	// select_dropdown(value,options){
	//  	let data;
	//  		// console.log(value);
	//  		Object.keys(options).map(function(k){
	//  			// console.log(options[k],k);
	//  			if(options[k] == value){
	//  				// console.log(value);
	//  				// console.log(k)
	//  				// console.log(options[k])
	//  				data = options[k];
	//  			}
	//  		})
	//  		return data
	// }
    continue(){
    	var formData = new FormData;
	        formData.append('email',this.state.email);
		    formData.append('password',this.state.password);
		    formData.append('passconf',this.state.passconf);
		    // formData.append('timezone',this.state.timezone);
		    // formData.append('language',this.state.tanguage);
		    // formData.append('terms',this.state.checked);
		    formData.append('1_1_3_alias_first_name',this.state['1_1_3_alias_first_name']);
		    formData.append('1_1_4_alias_last_name',this.state['1_1_4_alias_last_name']);
		    formData.append('oauth_consumer_key','mji82teif5e8aoloye09fqrq3sjpajkk');
		    formData.append('oauth_consumer_secret','aoxhigoa336wt5n26zid8k976v9pwipe');
    	 return fetch('https://wffer.com/se/api/rest/signup/validations',{
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
		          	// this.submit()
		          }
		          else
		          {
		            this.setState({
		              Message : responseJson.message,
		            })
		            Object.entries(this.state.Message).map(([key, value]) => {
		            	// console.log(`${value}`);
		            	alert(value)
		            })
		          }
		        })
		       
		        .catch((error) =>{
		          console.error(error);
		        });
    }
    //renders account fields for user
    renderAccount(){  	 
    	return(
    	<View>
    	{
	    	this.state.dataSource.account.map((item,index)=>{
				if(item.type=='Text'){
					return (
					<View key={index}>
							<TextInput name={item.name} style={gstyles.textInputStyle} placeholder={item.label} underlineColorAndroid="#fff" onChangeText={(text) => this.setState({[item.name]: text})}/>							
					</View>
				);
				}
				if(item.type=='Password'){
					return (
					<View key={index}>
							<TextInput name={item.name} style={gstyles.textInputStyle} secureTextEntry={true} placeholder={item.label} underlineColorAndroid="#fff" onChangeText={(text) => this.setState({[item.name]: text})}/>					
					</View>
					)
				}
				
			})	
		}
		</View>
		)	
    }
  //renders personal information fields for user
    renderPersonalInformation(){
    	return(
    	<View>
    	{
	    	this.state.dataSourcePersonal["Personal Information"].map((item,index)=>{
				if(item.type=='Text'){
					return (
					<View key={index}>
							<TextInput name={item.name} style={gstyles.textInputStyle} placeholder={item.label} underlineColorAndroid="#fff" onChangeText={(text) => this.setState({[item.name]: text})} />		
					</View>
				);
				}	
			})
		}
		</View>
		)		
    }
  //renders photo fields for user
    renderPhoto(){
	    	return(
	    			<View>
		    			<View style={gstyles.userImageView}>
                            <TouchableOpacity style={gstyles.cameraImageView} onPress={this.selectPhotoTapped.bind(this)}>
                                <Image source={require('../../../assets/account_settings_camera.png')} style={gstyles.qtyIcon}/>
                            </TouchableOpacity>       
                            {this.state.ImageSource === '' ? <Image source={require('../../../assets/nophoto_user_thumb_profile.png')} style={gstyles.circledImage}/> :
                                    <Image style={gstyles.circledImage} source={this.state.ImageSource} />
                            }
                    	</View>
                    </View>	
		    );
    }
  	onChange(text,name){
     	var state = name;
     	var val = text;
     	// console.log(state);
     	// console.log(val);   
     	var obj1  = {}
     	obj1[state] = val;
     	// console.log(obj1)
     	this.setState(obj1);
     	
    }
	render(){
		// console.log(this.state.dataSourcePersonal["Personal Information"]);
		if (this.state.dataSource.length === 0) {
		  return (
		  		<View style={gstyles.container}>
					<View style={gstyles.headerMenu}>
								<TouchableOpacity onPress={() => this.props.navigation.openDrawer()} style={gstyles.headerMenuButton}>
									<Icon name="bars" size={24} color="#fff" />
			                    </TouchableOpacity>
			                    <Text style={gstyles.headerProfileLabel}>{Constants.Signup}</Text>
			                     <Text style={gstyles.headerRightButton}></Text>
					</View>
				</View>
		  	)
		}
		else{
		return(
				<View style={gstyles.container}>
					<View style={gstyles.headerMenu}>
								<TouchableOpacity onPress={() => this.props.navigation.openDrawer()} style={gstyles.headerMenuButton}>
									<Icon name="bars" size={24} color="#fff" />
			                    </TouchableOpacity>
			                    <Text style={gstyles.headerProfileLabel}>{Constants.Signup}</Text>
			                     <Text style={gstyles.headerRightButton}></Text>
					</View>
					{ 
                      this.state.isLoading ? <View style={gstyles.loading}><ActivityIndicator style={gstyles.loadingActivity} color='#333' size="large"/></View> :
                    <ScrollView>     
					<KeyboardAvoidingView style={gstyles.container} behavior="padding" enabled>
						<View style={gstyles.profileHeadingView}><Text style={gstyles.profileHeadingText}>Sign Up</Text></View>

						<View>
						{this.renderPhoto()}
						{this.renderPersonalInformation()}
						{this.renderAccount()}
                        
                     	<TouchableOpacity onPress={()=>this.signup()} style={gstyles.buttonView}><Text style={gstyles.buttonText}>Submit</Text></TouchableOpacity>      
						</View>
					</KeyboardAvoidingView>
					</ScrollView>
					 }
				</View>
			);
		}
	}
}

// if(item.type=='Select'){
// 						return(
// 						<View key={index}>
// 							<ModalDropdown 
// 		                      style={gstyles.dropdownMainStyles}						                      
// 		                      dropdownTextStyle={gstyles.dropdownTextStyle}
// 		                      textStyle={gstyles.textStyle}
// 		                      dropdownStyle={gstyles.dropdownStyles}
// 		                      defaultIndex={this.props.defaultIndex}
// 		                      showsVerticalScrollIndicator={true}
// 		                      defaultValue={this.state[item.name]=='' ? item.label : this.select_dropdown(this.state[item.name],item.multiOptions)}
// 		                      options={Object.keys(item.multiOptions).map(key => item.multiOptions[key])}						         
// 		                      onSelect={(idx, data)=>{ this.onTagSelect(idx, data,item.name)}} 						                       
// 		                      />	
// 		    			</View>
// 						)
// 				}
// 				if(item.type=='Checkbox'){
// 					return(
// 					<View style={{padding: 10}} key={index}>
// 						<CheckBox
// 						  label={item.description}
// 						  labelLines={4}
// 						  labelStyle={{color:'#000',fontSize:16,padding:3}}
// 						 	checked={this.state.checked}
//   							onChange={() => this.setState({checked: !this.state.checked})}
// 						  style={gstyles.checkboxStyle}
// 						/>
// 					</View>
// 					)
// 				}
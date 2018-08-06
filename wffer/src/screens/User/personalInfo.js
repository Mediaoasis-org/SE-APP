import React, { Component } from 'react';
import {Text, TextInput, View, ScrollView, TouchableOpacity, Image, AsyncStorage,ActivityIndicator } from 'react-native';
import { gstyles } from '../../GlobalStyles';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import ModalDropdown from 'react-native-modal-dropdown';
// import { DrawerActions } from 'react-navigation';
export  class PersonalInfoComponent extends Component {
	constructor(props){
		super(props);
		this.state={
			LoggedIn:null,
			isDataLoading:true,
			dataSource:[],
			data:[],
			fieldValues:[],
			'1_1_3_alias_first_name':'',
			'1_1_4_alias_last_name':'',
			'1_1_5_alias_gender':'',
			oauthToken:'',
			oauthSecret:'',
			userData:[],
			
		}
		this.handleInput = this.handleInput.bind(this);
		this.isButtonDisabled=false;
		this._getStorageValue()
	}
	async _getStorageValue(){
		// this.fetchFields()
	  var value = await AsyncStorage.getItem('fieldsPersonalInformation');
	  var userData = await AsyncStorage.getItem('userData');
     this.setState({userData:JSON.parse(userData)});
     this.setState({oauthToken:this.state.userData.oauth_token});
     this.setState({oauthSecret:this.state.userData.oauth_secret});
     // console.log(this.state.oauthToken);
     // console.log(this.state.oauthSecret)
     this.fetchValues();
     // console.log(this.state.oauthToken);
     // console.log(this.state.oauthSecret);
	  // alert(value.length)
	  if(value == null){
	  	// this.setState({LoggedIn:0})
	  	this.fetchFields();	
	  }
	  else
	  {
	  	// alert('entering');
	  	const data = JSON.parse(value);
	  	// this.setState({LoggedIn:1})
		this.setState({dataSource:data});
		// console.log(this.state.dataSource)
	  }
	}
	// submit(){
 //    	console.log(this.state);
 //    	alert("all values")
 //    }
	 disable(){
	     
	  }
	SavePersonalInfo(){
		this.isButtonDisabled= true; setTimeout(() => this.isButtonDisabled = false , 3000);
    	var formData = new FormData;
		    formData.append('1_1_3_alias_first_name',this.state['1_1_3_alias_first_name']);
		    formData.append('1_1_4_alias_last_name',this.state['1_1_4_alias_last_name']);
		    formData.append('1_1_5_alias_gender',this.state['1_1_5_alias_gender']);
		    formData.append('oauth_token',this.state.oauthToken);
		    formData.append('oauth_secret',this.state.oauthSecret);
		    formData.append('ip','45.121.29.194');
		       fetch('https://wffer.com/se/api/rest/members/edit/profile?oauth_consumer_key=mji82teif5e8aoloye09fqrq3sjpajkk&oauth_consumer_secret=aoxhigoa336wt5n26zid8k976v9pwipe',{
		        body: formData,
		        headers:{
		          'Accept':'application/json',
		        },
		        method:'POST'
		      })
		        .then((response) => response.json())
		        .then((responseJson) => {
		        	
		          if(responseJson.status_code=="204"){
		            this.setState({
		              isLoading: false,
		            }, async function(){
		              // alert('Data Updated');
		              this.props.navigation.navigate('Profile');
		            });
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
	fetchFields(){
			  fetch('https://wffer.com/se/api/rest/members/edit/profile?oauth_consumer_key=mji82teif5e8aoloye09fqrq3sjpajkk&oauth_consumer_secret=aoxhigoa336wt5n26zid8k976v9pwipe&oauth_token='+ this.state.oauthToken + '&oauth_secret=' +this.state.oauthSecret,{
			        method:'GET'
			      })
			      .then((response) => response.json())
			      .then((responseJson) => {
			      	if(responseJson.status_code=='200'){
			      		 this.setState({
			          isLoading: false,
			          data: responseJson.body.form,
			        },async function(){
			        		await AsyncStorage.setItem('fieldsPersonalInformation', JSON.stringify( this.state.data["Personal Information"])); 
			        		this.setState({dataSource:this.state.data["Personal Information"]})
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
	fetchValues(){
	
		return fetch('https://wffer.com/se/api/rest/members/edit/profile?oauth_consumer_key=mji82teif5e8aoloye09fqrq3sjpajkk&oauth_consumer_secret=aoxhigoa336wt5n26zid8k976v9pwipe&oauth_token='+ this.state.oauthToken + '&oauth_secret=' +this.state.oauthSecret,{
			        method:'GET'
			      })
			      .then((response) => response.json())
			      .then((responseJson) => {
			    
			      	if(responseJson.status_code=='200'){
			      		 this.setState({
			          isDataLoading: false,
			          fieldValues: responseJson.body.formValues,
			        },function(){
			        	// alert(JSON.stringify(this.state.fieldValues));
			        		this.setState({'1_1_3_alias_first_name':this.state.fieldValues['1_1_3_alias_first_name'].value})
			        		this.setState({'1_1_4_alias_last_name':this.state.fieldValues['1_1_4_alias_last_name'].value});
			        		if(this.state.fieldValues['1_1_5_alias_gender']){
			        			this.setState({'1_1_5_alias_gender':this.state.fieldValues['1_1_5_alias_gender'].value})
			        		}
			        		
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
     onChange(text,name){
     	var state = name;
     	var val = text;
     	// console.log(state);
     	// console.log(val);   
     	var obj1  = {}
     	obj1[state] = val;
     	console.log(obj1)
     	this.setState(obj1);
     	
     }
	static navigationOptions = {
        title: 'Profile',
       
        // tabBarLabel: <Text style={{ textAlign: 'center', width: 100,paddingBottom:10,fontSize:16 }}>Profile</Text>
    };
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
	render(){
		// if (this.state.dataSource.length === 0) {
		//   return (
		//   		<View style={gstyles.container}>
		// 			<View style={gstyles.headerMenu}>
		// 						<TouchableOpacity onPress={() => this.props.navigation.openDrawer()} style={gstyles.headerMenuButton}>
		// 							<Icon name="bars" size={24} color="#fff" />
		// 	                    </TouchableOpacity>
		// 	                    <Text style={gstyles.headerProfileLabel}>Profile</Text>
			                    
		// 			</View>
		// 			{ 
  //                             this.state.isDataLoading ? <View style={gstyles.loading}><ActivityIndicator color='#00ff00' size="large"/></View> : null }
		// 		</View>

		//   	)
		// }
		return(
			<View style={gstyles.container}>
			
					<View style={gstyles.headerMenu}>
								<TouchableOpacity onPress={() => this.props.navigation.openDrawer()} style={gstyles.headerMenuButton}>
									<Icon name="bars" size={24} color="#fff" />
			                    </TouchableOpacity>
			                    <Text style={gstyles.headerProfileLabel}>Profile</Text>
			                    <Text style={gstyles.headerRightButton}></Text>                 
					</View>
					{ 
                		this.state.isDataLoading ? <View style={gstyles.loading}><ActivityIndicator style={gstyles.loadingActivity} color='#333' size="large"/></View> : 
                	<View>
				 	<ScrollView>
						<View style={gstyles.profileHeadingView}><Text style={gstyles.profileHeadingText}>Personal Information</Text></View>                 
						<View>
								{
							    	this.state.dataSource.map((item,index)=>{
										if(item.type=='Text' || item.type == 'Textarea' || item.type=='Password'){
											return (
												<View key={index}>
														<TextInput name={item.name} 
																returnKeyType="next"
																style={gstyles.textInputStyle} 
																ref={(input) => {this[item.name] = input; }}	    
																onSummitTextInput={this.onSummitTextInput}
																placeholder={item.label} 
																underlineColorAndroid="#fff" 
																onChangeText={(text)=>this.onChange(text,item.name)}  
																value={this.state[item.name]} 
																secureTextEntry={(item.type=='Password')?true:false}
														/>
												</View>	
											);
										}
										if(item.type=='Select'){
												return(
													<View key={index}>
														<ModalDropdown 
									                      style={gstyles.dropdownMainStyles}						                      
									                      dropdownTextStyle={gstyles.dropdownTextStyle}
									                      textStyle={gstyles.textStyle}
									                      animated={false}
									                      dropdownStyle={gstyles.dropdownStyles}
									                      defaultIndex={this.props.defaultIndex}
									                      showsVerticalScrollIndicator={true}
									                      defaultValue={this.state[item.name]=='' ? item.label : this.select_dropdown(this.state[item.name],item.multiOptions)}
									                      options={Object.keys(item.multiOptions).map(key => item.multiOptions[key])}						         
									                      onSelect={(idx, data)=>{ this.onTagSelect(idx, data,item.name)}} 						                       
									                      />
									    					

									    				
									    			</View>
												)
											
										}
										
									})
								}
								<TouchableOpacity onPress={()=>{this.disable();this.SavePersonalInfo();}} style={gstyles.buttonView}><Text style={gstyles.buttonText}>Save</Text></TouchableOpacity>
						</View>
					
					</ScrollView>
					</View>
			}
			</View>
		)
	}
}
// <TextInput name="firstname" placeholder="First Name" returnKeyType="next" underlineColorAndroid="#fff" style={gstyles.textInputStyle}/>	
// <TextInput name="lastname" placeholder="Last Name" returnKeyType="next" underlineColorAndroid="#fff" style={gstyles.textInputStyle}/>	
// <ModalDropdownComponent defaultValue='Select Gender' options={['Male','Female']}/>
// <TouchableOpacity onPress={()=>alert('submit')} style={gstyles.buttonView}><Text style={gstyles.buttonText}>Save</Text></TouchableOpacity>

// <TextInput name={item.name} 
// returnKeyType="next"
// style={gstyles.textInputStyle} 
// ref={(input) => {this[item.name] = input; }}	    
// onSummitTextInput={this.onSummitTextInput}
// placeholder={item.label} 
// underlineColorAndroid="#fff" 
// onChangeText={(text)=>this.onChange(text,item.name)}  
// value={this.state[item.name]} 
// secureTextEntry={(item.type=='Password')?true:false}
// />

// <TextInputComponent 
// name={item.name} 
// style={gstyles.textInputStyle} 
// ref={(input) => {this[item.name] = input; }}	    
// onSummitTextInput={this.onSummitTextInput}
// placeholder={item.label} 
// underlineColorAndroid="#fff" 
// onChangeText={(text)=>this.onChange(text,item.name)}  
// value={this.state[item.name]} 
// secureTextEntry={item.type}
// keyboardType={item.name}
// />
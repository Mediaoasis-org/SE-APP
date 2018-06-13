import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, Dimensions, ScrollView, TouchableOpacity, Image, AsyncStorage,Keyboard } from 'react-native';
import { gstyles } from '../../GlobalStyles';
import { ModalDropdownComponent } from '../../components/ModalDropdown';
import { TextInputComponent }  from '../../components/textInput';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { DrawerActions } from 'react-navigation';
export  class PersonalInfoComponent extends Component {
	constructor(props){
		super(props);
		this.state={
			// ...initialState,
   //    		errorStatus: false,
			LoggedIn:null,
			dataSource:[],
			data:[],
			fieldValues:[],
			'1_1_3_alias_first_name':'',
			'1_1_4_alias_last_name':'',
			firstname:'',
			lastname:'',
			'1_1_5_alias_gender':'',
			oauthToken:'',
			oauthSecret:'',
			userData:[]
		}
		this.handleInput = this.handleInput.bind(this);
		this.onSummitTextInput = this.onSummitTextInput.bind(this)	
		this._getStorageValue()
	}
	getInitState(fields) {
		  const state = {};
		  _.forEach(fields, (field) => {
		    const fieldObj = field;
		    fieldObj.error = false;
		    fieldObj.errorMsg = '';
		    if (!field.hidden && field.type) {
		      fieldObj.value = getDefaultValue(field);
		      state[field.name] = fieldObj;
		    }
		  });
		  return state;
		}
	// componentDidMount(){
	// 	this._getStorageValue()
	// }
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
	  	this.setState({LoggedIn:0})
	  	this.fetchFields();	
	  }
	  else
	  {
	  	// alert('entering');
	  	const data = JSON.parse(value);
	  	this.setState({LoggedIn:1})
		this.setState({dataSource:data});
		// console.log(this.state.dataSource)
	  }
	}
	// submit(){
 //    	console.log(this.state);
 //    	alert("all values")
 //    }
	SavePersonalInfo(){
    	// this.submit();
    	var formData = new FormData;
		    formData.append('1_1_3_alias_first_name',this.state['1_1_3_alias_first_name']);
		    formData.append('1_1_4_alias_last_name',this.state['1_1_4_alias_last_name']);
		    // formData.append('1_1_5_alias_gender',this.state.Gender);
		    formData.append('oauth_token',this.state.oauthToken);
		    formData.append('oauth_secret',this.state.oauthSecret);
		    formData.append('ip','45.121.29.194');
		       fetch('https://wffer.com/se/api/rest/members/edit/profile?oauth_consumer_key=mji82teif5e8aoloye09fqrq3sjpajkk&oauth_consumer_secret=aoxhigoa336wt5n26zid8k976v9pwipe',{
		        body: formData,
		        headers:{
		          'Accept':'application/json',
		          // 'Content-Type': 'multipart/form-data'
		        },
		        method:'POST'
		      })
		        .then((response) => response.json())
		        .then((responseJson) => {
		        	
		          if(responseJson.status_code=="204"){
		            this.setState({
		              isLoading: false,
		              dataSource1: responseJson.body,
		            }, async function(){
			        // await AsyncStorage.setItem('userData', JSON.stringify(this.state.dataSource1));
		              alert('Data Updated');
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
			          dataSource: responseJson.body.form,
			        },async function(){
			        		await AsyncStorage.setItem('fieldsPersonalInformation', JSON.stringify( this.state.dataSource["Personal Information"]));
			        		// alert(JSON.stringify(this.state.data));  
			        	
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
			          fieldValues: responseJson.body.formValues,
			        },function(){
			        		this.setState({'1_1_3_alias_first_name':this.state.fieldValues['1_1_3_alias_first_name'].value})
			        		this.setState({'1_1_4_alias_last_name':this.state.fieldValues['1_1_4_alias_last_name'].value})
			        		// this.setState({'1_1_5_alias_gender':this.state.fieldValues['1_1_5_alias_gender'].value})
			        		// alert(this.state['1_1_3_alias_first_name'])
			        		 // alert(JSON.stringify(this.state.fieldValues['1_1_5_alias_gender'].value));  

			        	
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
     	// console.log(obj1)
     	this.setState(obj1);
     	
     }
     onSummitTextInput(name) {
	    const index = Object.keys(this.state).indexOf(name);
	    if (index !== -1 && this[Object.keys(this.state)[index + 1]]
	    && this[Object.keys(this.state)[index + 1]].textInput) {
	      this[Object.keys(this.state)[index + 1]].textInput._root.focus();
	    } else {
	      Keyboard.dismiss();
	    }
	  }
	static navigationOptions = {
        title: 'Personal Info',
    };
	render(){
		// if (this.state.dataSource.length === 0) {
		//   return null
		// }
		return(
			<View style={gstyles.container}>
					<View style={gstyles.headerMenu}>
								<TouchableOpacity onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())} style={gstyles.headerMenuButton}>
									<Icon name="bars" size={24} color="#fff" />
			                    </TouchableOpacity>
			                    <Text style={gstyles.headerProfileLabel}>Profile</Text>
					</View>
				 	<ScrollView>
						<View style={gstyles.profileHeadingView}><Text style={gstyles.profileHeadingText}>Personal Information</Text></View>
						<View>
							
								{

							    	this.state.dataSource.map((item,index)=>{
										nextIndex = index +1 ;
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
										// if(item.type=='Password'){
										// 	return (
										// 	<View key={item.id}>
										// 			<TextInput name={item.name} style={gstyles.textInputStyle} secureTextEntry={true} placeholder={item.label} underlineColorAndroid="#fff"/>
													
										// 	</View>
										// 	)
										// }
										// if(item.type=='Select'){
										// 	return(
										// 	<View key={item.id}>
										// 		<ModalDropdownComponent 
										// 			defaultIndex={-1}
										// 			defaultValue={item.label}
						    //     					options={item.multiOptions}
						    //     					onSelect={(idx,data)=>this.onHandleChange(idx,data)}
						    //     					onChange={this.handleInput}
						    //     					givenValue={this.state[item.name]}
						    //     				/>
						        				
				      //           			</View>
										// 	)
											
										// }
										// if(item.type=='Submit'){
										// 	return (
										// 	<View key={item.id}>
										// 			<TouchableOpacity onPress={()=>this.SavePersonalInfo()} style={gstyles.buttonView}>
										// 				<Text style={gstyles.buttonText}>{item.label}</Text>
										// 			</TouchableOpacity>
													
										// 	</View>
										// 	)
										// }
									})
								}
								<TouchableOpacity onPress={()=>this.SavePersonalInfo()} style={gstyles.buttonView}><Text style={gstyles.buttonText}>Save</Text></TouchableOpacity>
						</View>
					</ScrollView>
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
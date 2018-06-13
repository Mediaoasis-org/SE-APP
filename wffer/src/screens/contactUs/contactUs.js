import React, { Component } from 'react';
import { Text, TextInput, View, ScrollView, TouchableOpacity, Image, AsyncStorage } from 'react-native';
import { gstyles } from '../../GlobalStyles';
import { ModalDropdownComponent } from '../../components/ModalDropdown';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { DrawerActions } from 'react-navigation';
export  class ContactUsComponent extends Component {
	constructor(props){
		super(props);
		this.state={
			name :'',
			email:'',
			body:'',
			dataSource:[],
			// data:[]
		}
		this._getStorageValue();
		this.handleInput = this.handleInput.bind(this);
		this.onSummitTextInput = this.onSummitTextInput.bind(this)
		
	}

	async _getStorageValue(){
		// this.fetchFields()
	  var value = await AsyncStorage.getItem('contactUsInformation');
	  // this.fetchFields()
	  // alert(value)
	  if(value !== null){
	  		// alert('entering');
	  	const data = JSON.parse(value);
	  	// alert(data)
	  	this.setState({LoggedIn:1})
		this.setState({dataSource:data});
		// console.log(this.state.dataSource)
	  }
	  else
	  {
		this.setState({LoggedIn:0})
	  	this.fetchFields();	
	  }
	}
	SendMessage(){
    		var formData = new FormData;
		    formData.append('name',this.state.name);
		    formData.append('email',this.state.email);
		    formData.append('body',this.state.body);
		       fetch('https://wffer.com/se/api/rest/help/contact?oauth_consumer_key=mji82teif5e8aoloye09fqrq3sjpajkk&oauth_consumer_secret=aoxhigoa336wt5n26zid8k976v9pwipe',{
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
		           	// alert("Your Message Sended Successfully")
		           	this.setState({
		           		Message :'Your Message Sended Successfully'
		           	})
		           	this.props.navigation.navigate('Home')
		          }
		          else
		          {
		            this.setState({
		              Message : JSON.stringify(responseJson.message),
		            })
		          }
		          alert(this.state.Message);


		        })
		       		
		        .catch((error) =>{
		          console.error(error);
		        });
    }
	fetchFields(){
				
			  fetch('https://wffer.com/se/api/rest/help/contact?oauth_consumer_key=mji82teif5e8aoloye09fqrq3sjpajkk&oauth_consumer_secret=aoxhigoa336wt5n26zid8k976v9pwipe',{
			        method:'GET'
			      })
			      .then((response) => response.json())
			      .then((responseJson) => {
			      	if(responseJson.status_code=='200'){
			      		 this.setState({
			          isLoading: false,
			          dataSource: responseJson.body,
			        },async function(){
			        		await AsyncStorage.setItem('contactUsInformation', JSON.stringify(this.state.dataSource));
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
	// fetchValues(){
	
	// 	return fetch('https://wffer.com/se/api/rest/members/edit/profile?oauth_consumer_key=mji82teif5e8aoloye09fqrq3sjpajkk&oauth_consumer_secret=aoxhigoa336wt5n26zid8k976v9pwipe&oauth_token='+ this.state.oauthToken + '&oauth_secret=' +this.state.oauthSecret,{
			       
	// 		        // headers:{
	// 		        //   'Accept':'application/json',
	// 		        //   'Content-Type':'application/json',
	// 		        // },
	// 		        method:'GET'
	// 		      })
	// 		      .then((response) => response.json())
	// 		      .then((responseJson) => {
			    
	// 		      	if(responseJson.status_code=='200'){
	// 		      		 this.setState({
	// 		          isLoading: false,
	// 		          fieldValues: responseJson.body.formValues,
	// 		        },function(){
	// 		        		this.setState({'1_1_3_alias_first_name':this.state.fieldValues['1_1_3_alias_first_name'].value})
	// 		        		this.setState({'1_1_4_alias_last_name':this.state.fieldValues['1_1_4_alias_last_name'].value})
	// 		        		this.setState({'1_1_5_alias_gender':this.state.fieldValues['1_1_5_alias_gender'].value})
	// 		        		// console.log(this.state['1_1_3_alias_first_name'])
	// 		        		 // alert(JSON.stringify(this.state.fieldValues['1_1_5_alias_gender'].value));  

			        	
	// 		        });

	// 		      	}
	// 		      	else
	// 		      	{
	// 		      		// this.setState({Message:responseJson.Message});
	// 		      	}
	// 		      })
	// 		      .catch((error) =>{
	// 		        console.error(error);
	// 		      });
	// }
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
		
		return(
			<View style={gstyles.container}>
					<View style={gstyles.headerMenu}>
								<TouchableOpacity onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())} style={gstyles.headerMenuButton}>
									<Icon name="bars" size={24} color="#fff" />
			                    </TouchableOpacity>
			                    <Text style={gstyles.headerProfileLabel}>Contact Us</Text>
					</View>
				 	<ScrollView>
						<View style={gstyles.profileHeadingView}><Text style={gstyles.profileHeadingText}>Contact Us</Text></View>
						<View>
								<View style={gstyles.profileHeadingView}><Text style={gstyles.profileHeadingText}>If you want to ask us a question directly, please submit your message with the following form.</Text></View>
								{

							    	this.state.dataSource.map((item,index)=>{
										nextIndex = index +1 ;
										if(item.type=='Text' || item.type == 'Textarea'){
											return (
											<View key={index}>
													<TextInput name={item.name} 
															   returnKeyType="next"
															   style={gstyles.textInputStyle} 
															   
															   
															   placeholder={item.label} 
															   underlineColorAndroid="#fff" 
															   onChangeText={(text)=>this.onChange(text,item.name)}  
															   value={this.state[item.name]} 
															   editable={true}
															   multiline ={item.type=='Textarea'? true :false}
															   />
											</View>

											
										);
										}
										if(item.type=='Password'){
											return (
											<View key={item.id}>
													<TextInput name={item.name} style={gstyles.textInputStyle} secureTextEntry={true} placeholder={item.label} underlineColorAndroid="#fff"/>
													
											</View>
											)
										}
										if(item.type=='Select'){
											return(
											<View key={item.id}>
												<ModalDropdownComponent 
													defaultIndex={-1}
												defaultValue={item.label}
						        					options={item.multiOptions}
						        					onSelect={(idx,data)=>this.onHandleChange(idx,data)}
						        					onChange={this.handleInput}
						        					givenValue={this.state[item.name]}
						        				/>
						        				
				                			</View>
											)
											
										}
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
								<TouchableOpacity onPress={()=>this.SendMessage()} style={gstyles.buttonView}><Text style={gstyles.buttonText}>Save</Text></TouchableOpacity>
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
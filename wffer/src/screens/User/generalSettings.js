import React, { Component } from 'react';
import {
  AsyncStorage,
  Text,
  TextInput,
  View,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Image
} from 'react-native';
import {gstyles} from '../../GlobalStyles';
// import MapView from 'react-native-maps';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { DrawerActions } from 'react-navigation';
import { ModalDropdownComponent } from '../../components/ModalDropdown';
import ModalDropdown from 'react-native-modal-dropdown';
export  class GeneralSettingsComponent extends Component {
	constructor(props){
		super(props);
		this.state={
			LoggedIn:null,
			oauthToken:'',
			oauthSecret:'',
			email:'',
			username:'',
			timezone:'',
			locale:'',
			dataSource:[],
			fieldValues:[],
			userData:[]
		}
		this.handleInput = this.handleInput.bind(this);
		this._getStorageValue();
		
	}
	async _getStorageValue(){
		// this.fetchFields()
	  var value = await AsyncStorage.getItem('generalSettingsInfo');
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
	fetchFields(){
				
			  fetch('https://wffer.com/se/api/rest/members/settings/general?oauth_consumer_key=mji82teif5e8aoloye09fqrq3sjpajkk&oauth_consumer_secret=aoxhigoa336wt5n26zid8k976v9pwipe&oauth_token='+ this.state.oauthToken + '&oauth_secret=' +this.state.oauthSecret,{
			       
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
			        	alert(JSON.stringify(this.state.dataSource))
			        		await AsyncStorage.setItem('generalSettingsInfo', JSON.stringify( this.state.dataSource));
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
	
		 fetch('https://wffer.com/se/api/rest/members/settings/general?oauth_consumer_key=mji82teif5e8aoloye09fqrq3sjpajkk&oauth_consumer_secret=aoxhigoa336wt5n26zid8k976v9pwipe&oauth_token='+ this.state.oauthToken + '&oauth_secret=' +this.state.oauthSecret,{

			        method:'GET'
			      })
			      .then((response) => response.json())
			      .then((responseJson) => {
			    	// alert(JSON.stringify(responseJson.body.formValues))
			      	if(responseJson.status_code=='200'){
			      		
			      		 this.setState({
					          fieldValues: responseJson.body.formValues,
			        },function(){
			        	this.setState({email:this.state.fieldValues.email});
			        	this.setState({username:this.state.fieldValues.username});
			        	this.setState({timezone:this.state.fieldValues.timezone});
			        	this.setState({locale:this.state.fieldValues.locale});
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
     	console.log(state);
     	console.log(val);   
     	var obj  = {}
     	obj[state] = val;
     	this.setState(obj);
     	// console.log(obj)
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
    submit(){
    	console.log(this.state);
    	alert("all values")
    }
	static navigationOptions = {
    		title: 'General',
    };
    onTagSelect(idx, data){ 
      // console.log("======== on tag selected ==========="); 
      console.log(idx,data); 
      this.onChange(idx,data)
 };
 select_dropdown(value,options){
 		console.log(value);
 		// console.log(options);
 		// options.map((item) =>{
 		// 	console.log(item.value)
 		// })
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
				 	<ScrollView>
						<View style={gstyles.profileHeadingView}><Text style={gstyles.profileHeadingText}>General Information</Text></View>
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
										<View>
											<Text>{this.state[item.name]}</Text>
											<ModalDropdown 
						                      style={gstyles.dropdownMainStyles}						                      
						                      dropdownTextStyle={gstyles.dropdownTextStyle}
						                      textStyle={gstyles.textStyle}
						                      dropdownStyle={gstyles.dropdownStyles}
						                      defaultIndex={this.props.defaultIndex}
						                      showsVerticalScrollIndicator={true}
						                      defaultValue={this.state[item.name]=='' ? item.label : this.select_dropdown(this.state[item.name],item.multiOptions)}
						                      options={item.multiOptions}						         
						                      onSelect={(idx, data)=>{ this.onTagSelect(idx, data)}} 						                       
						                      />
						    					
						    			</View>
										)
										
									}
								})
							}
							<TouchableOpacity onPress={()=>alert('submit')} style={gstyles.buttonView}><Text style={gstyles.buttonText}>Save Changes</Text></TouchableOpacity>
						</View>
					</ScrollView>
			</View>
		)
	}
}
// <TextInput name="email" keyboardType="email-address" placeholder="Email Address" value="test@example.com" returnKeyType="next" underlineColorAndroid="#fff" style={{margin:10,padding:10,borderWidth:1,borderColor:'#ccc'}}/>	
// 							<ModalDropdownComponent defaultValue='Select Time Zone'
// 				                	options={['(UTC+5:30) Bombay,Calcutta,New Delhi','(UTC+5:45) Nepal','(UTC+6) Dhaka','(UTC+9:30) Darwin']}/>	
// 							<ModalDropdownComponent defaultValue='Select Locale'
// 				                	options={['English','English(United Status)','Hindi','Maxican','Persain','Greek','Spanish','Urdu']}/>

// <ModalDropdownComponent 
// 												defaultIndex={-1}
// 												defaultValue={this.state[item.name]}
// 						    					options={item.multiOptions}
// 						    					onSelect={(idx,data)=>this.onHandleChange(idx,data)}
// 						    					onChange={this.handleInput}
// 						    					renderButtonText={(rowData) => this.renderButtonText(rowData)}
//                              					renderRow={this.dropdownRenderRow.bind(this)}
// 						    					/>
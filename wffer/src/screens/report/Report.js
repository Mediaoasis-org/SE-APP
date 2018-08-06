import React, { Component } from 'react';
import { Text, TextInput, View, TouchableOpacity, ScrollView, AsyncStorage,ActivityIndicator } from 'react-native';
import { gstyles } from '../../GlobalStyles';
// import { Constants } from '../../common';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import ModalDropdown from 'react-native-modal-dropdown';
// import { DrawerActions } from 'react-navigation';
  
export class ReportComponent extends Component {
	constructor(props){
		super(props);
		this.state={
			category:'',
			description:'',
			Message:'',
			dataSource:[],
			userData:[],
			oauthToken:'',
			oauthSecret:'',
			isLoading:true,
		}
		this._getStorageValue()
	}
	async _getStorageValue(){
		const userData = await AsyncStorage.getItem('userData');
	 	const fieldData = await AsyncStorage.getItem('ReportFields');
  		this.setState({userData:JSON.parse(userData)});
        this.setState({oauthToken:this.state.userData.oauth_token});
        this.setState({oauthSecret:this.state.userData.oauth_secret});
		  if(fieldData != null){
		    const data= JSON.parse(fieldData);
			this.setState({dataSource:data});
			this.setState({isLoading:false});
		  }
		  else
		  {
		  	this.fetchFields();
		  }

	}
	fetchFields(){
			 return fetch('https://wffer.com/se/api/rest/report/create?oauth_consumer_key=mji82teif5e8aoloye09fqrq3sjpajkk&oauth_consumer_secret=aoxhigoa336wt5n26zid8k976v9pwipe&oauth_token='+ this.state.oauthToken + '&oauth_secret='+this.state.oauthSecret,{
			        method:'GET'
			      })
			      .then((response) => response.json())
			      .then((responseJson) => {
			      	if(responseJson.status_code=='200'){
			      		 this.setState({
				          isLoading: false,
				          dataSource: responseJson.body,
			        },async function(){
				        	await AsyncStorage.setItem('ReportFields', JSON.stringify(this.state.dataSource));  	
			        });
			      	}
			      	else
			      	{
			      		this.setState({Message:responseJson.Message});
			      		alert(this.state.Message)
			      	}
			      })
			      .catch((error) =>{
			        console.error(error);
			      });
			
	}
     
     SubmitReport(){
     		let wishlist_id = this.props.navigation.state.params.wishlist_id;
    		var formData = new FormData;
		    formData.append('category',this.state.category);
		    formData.append('description',this.state.description);
		       fetch('https://wffer.com/se/api/rest/report/create?oauth_consumer_key=mji82teif5e8aoloye09fqrq3sjpajkk&oauth_consumer_secret=aoxhigoa336wt5n26zid8k976v9pwipe&oauth_token='+ this.state.oauthToken + '&oauth_secret='+this.state.oauthSecret,{
		        body: formData,
		        headers:{
		          'Accept':'application/json',
		        },
		        method:'POST'
		       })
		        .then((response) => response.json())
		        .then((responseJson) => {
		        	
		          if(responseJson.status_code=="204"){	            
		              this.props.navigation.push('Wishlists',{wishlist_id:wishlist_id});
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
		return(
			<View style={gstyles.container}>
					<View style={gstyles.headerMenu}>
								<Text style={gstyles.headerMenuButton}></Text>
			                    <Text style={gstyles.headerProfileLabel}>Wffer</Text>
			                    <Text style={gstyles.headerRightButton}></Text>      
					</View>
					{ 
                      this.state.isLoading ? <View style={gstyles.loading}><ActivityIndicator style={gstyles.loadingActivity} color='#333' size="large"/></View> :
                      							<ScrollView>
                      								<View style={gstyles.profileHeadingView}><Text style={gstyles.profileHeadingText}>Submit a Report</Text></View>
                      									{	
                      										this.state.dataSource.map((item,index)=>{
                      											if(item.type=='Select'){
																		return(
																		<View key={index}>
																			<ModalDropdown 
														                      style={gstyles.dropdownMainStyles}						                      
														                      dropdownTextStyle={gstyles.dropdownTextStyle}
														                      textStyle={gstyles.textStyle}
														                      dropdownStyle={gstyles.dropdownStyles}
														                      defaultIndex={this.props.defaultIndex}
														                      showsVerticalScrollIndicator={true}
														                      animated={false}
														                      defaultValue={this.state[item.name]=='' ? item.label : this.select_dropdown(this.state[item.name],item.multiOptions)}
														                      options={Object.keys(item.multiOptions).map(key => item.multiOptions[key])}						         
														                      onSelect={(idx, data)=>{ this.onTagSelect(idx, data,item.name)}}				
														                	/>
														    			</View>
																		)
																	
																}
                      											if(item.type=='Text' || item.type=='Textarea'){
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
                      										})
                      									}
                      									<TouchableOpacity onPress={()=>this.SubmitReport()} style={gstyles.buttonView}><Text style={gstyles.buttonText}>Submit Report</Text></TouchableOpacity>
														<View style={gstyles.width100}><Text style={gstyles.textCenter}>OR</Text></View>
														<TouchableOpacity onPress={()=>this.props.navigation.goBack()} style={gstyles.cancelButton}>
																<Text style={gstyles.cancelButtonText}>Cancel</Text>
														</TouchableOpacity>
                      							</ScrollView>
                    }
			</View>
		);
	}
}
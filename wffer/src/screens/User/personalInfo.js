import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, Dimensions, ScrollView, TouchableOpacity, Image, AsyncStorage } from 'react-native';
import { gstyles } from '../../GlobalStyles';
import { ModalDropdownComponent } from '../../components/ModalDropdown';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { DrawerActions } from 'react-navigation';
export  class PersonalInfoComponent extends Component {
	constructor(props){
		super(props);
		this.state={
			LoggedIn:null,
			dataSource:[],
			data:[],
			// 1_1_3_alias_first_name:'',
			// lastname:''
		}
		this._getStorageValue()
	}
	
	async _getStorageValue(){
		// this.fetchFields()
	  var value = await AsyncStorage.getItem('fieldsPersonalInformation');
	   let PersonalInfo = await AsyncStorage.getItem('userData');
	 	this.setState({name:PersonalInfo.display_name})
	  // alert(value)
	  if(value == null){
	  	this.setState({LoggedIn:false})
	  	this.fetchFields();	
	  }
	  else
	  {
	  	// alert('entering');
	  	const data = JSON.parse(value);
	  	// alert(data)
	  	this.setState({LoggedIn:true})
		this.setState({dataSource:data});
		// console.log(this.state.dataSource)
	  }
	}

	fetchFields(){
		
			 return fetch('https://wffer.com/se/api/rest/members/edit/profile?oauth_consumer_key=mji82teif5e8aoloye09fqrq3sjpajkk&oauth_consumer_secret=aoxhigoa336wt5n26zid8k976v9pwipe&oauth_token=nym0jbhdqmif0lokymx5exa83g68mbzb&oauth_secret=oogb4n0gv0c4a72lcejq04wnmfv8vaz4',{
			       
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
			          data: responseJson.body.form,
			        },async function(){
			        		await AsyncStorage.setItem('fieldsPersonalInformation', JSON.stringify( this.state.data["Personal Information"]));
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
	selected(index,value){
      alert(value)
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
			                    <Text style={gstyles.headerProfileLabel}>Profile</Text>
					</View>
				 	<ScrollView>
						<View style={gstyles.profileHeadingView}><Text style={gstyles.profileHeadingText}>Personal Information</Text></View>
						<View>
							<Text>{this.state.name}</Text>
								{

							    	this.state.dataSource.map((item)=>{
									
										if(item.type=='Text'){
											return (
											<View key={item.id}>
													<TextInput name={item.name} style={gstyles.textInputStyle} placeholder={item.label} underlineColorAndroid="#fff" />
													
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
											var options = item.multiOptions;
											var result = [];
											for(var i in options)
											     result.push([options [i]]);
											return(
											<View key={item.id}>
												<ModalDropdownComponent defaultValue={item.type + ' ' + item.label}
				                					options={result}/>
				                			</View>
											)
											
										}
										if(item.type=='Submit'){
											return (
											<View key={item.id}>
													<TouchableOpacity onPress={()=>alert('submit')} style={gstyles.buttonView}>
														<Text style={gstyles.buttonText}>{item.label}</Text>
													</TouchableOpacity>
													
											</View>
											)
										}
									})
								}
								<TouchableOpacity onPress={()=>alert('submit')} style={gstyles.buttonView}><Text style={gstyles.buttonText}>Save</Text></TouchableOpacity>
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
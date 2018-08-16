import React, { Component } from 'react';
import {
	Text,
	View,
	TouchableOpacity,
	Image,
	FlatList,
	ScrollView,
	ActivityIndicator,
	AsyncStorage
} from 'react-native';
import {gstyles} from '../../GlobalStyles';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
export class CityScreen extends Component {

    constructor(props){
    	super(props);
    	this.state = {
            isLoading:true,
            cities:[],
            languagesData:[],
            language : '',
      }
      this.getStorageValue();
      this.fetchCities();
    }
    async getStorageValue(){
      var languageData = await AsyncStorage.getItem('languageData');
        const Datalang = JSON.parse(languageData);
        const lang = await AsyncStorage.getItem('languageinfo');
        this.setState({language:lang})
        // alert(this.state.language);
        this.setState({languagesData : Datalang[lang]})
    	const city = await AsyncStorage.getItem('cityInformation');
      	this.setState({city:city});
    }
    fetchCities(){

    return fetch('https://wffer.com/se/api/rest/listings/get-cities?id=1&oauth_consumer_key=mji82teif5e8aoloye09fqrq3sjpajkk&oauth_consumer_secret=aoxhigoa336wt5n26zid8k976v9pwipe',{
              method:'GET'
            })
            .then((response) => response.json())
            .then((responseJson) => {
          
              if(responseJson.status_code=='200'){
                 this.setState({
                  isLoading: false,
                  cities: responseJson.body,
                });
              }
              else
              {
                // 
              }
              this.setState({Message:responseJson.Message});
            })
            .catch((error) =>{
              console.error(error);
            });
  }
  async selectCity(city){
      // alert(city)
      AsyncStorage.setItem('cityInformation', city);
      var value = await AsyncStorage.getItem('cityInformation');
      console.log(value)
      this.props.navigation.push('Home');
  }
      // this.setModalVisible(!this.state.modalVisible);
      
 
  	
	render(){
		// alert(this.state.Message)
		return(
				<View style={gstyles.container}>
					<View style={gstyles.headerMenu}>
								<TouchableOpacity onPress={() =>this.props.navigation.openDrawer()} style={gstyles.headerMenuButton}>
									<Icon name="bars" size={30} color="#fff" />
			                    </TouchableOpacity>
			                    <Text style={gstyles.headerProfileLabel}>{this.state.languagesData.CITY_HeaderText}</Text>
			                    <Text style={gstyles.headerRightButton}></Text>
					</View>
					{
                              this.state.isLoading==true ?  <View style={gstyles.loading}><ActivityIndicator style={gstyles.loadingActivity} color='#333' size="large"/></View> :  	
					<ScrollView>							
							<View style={[gstyles.profileHeadingView,gstyles.marginBottom10,gstyles.marginTop10]}><Text style={gstyles.profileHeadingText}>{this.state.languagesData.CITY_TitleText}</Text></View>
		                 
		                      {
		                        this.state.cities.map((item,index)=>{
		                          return(
		                            <TouchableOpacity key={index} style={{width:'96%',padding:15,backgroundColor:'#febe2b',marginLeft:'2%',marginRight:'2%',marginTop:5,marginBottom:5}} onPress={()=>{this.selectCity(item.title)}}><Text style={{color:'#fff',fontSize:20,fontWeight:'bold'}}>{item.title}</Text></TouchableOpacity>
		                          )
		                        })
		                      }
		                    
								
								
					</ScrollView>

					}
				</View>
			);
	}
}


 // <TouchableOpacity style={gstyles.cityMenu} onPress={()=>this.saveCity()}><Text style={gstyles.cityMenuText}>Save</Text></TouchableOpacity>

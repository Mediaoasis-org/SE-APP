import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  YellowBox,
  AsyncStorage,
  NetInfo,
  Alert
} from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import MyNavigation from './Navigation';
import SplashScreen from './SplashScreen';
// import languages from './src/common/constantslist';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
YellowBox.ignoreWarnings(['Class RCTCxxModule']);
type Props = {};
export default class App extends Component<Props> {
  constructor(props){
    super(props);
    this.state = {
        timePassed: false,
        isConnected: true,
    };
    // console.log(languages.en);
    this.getStorageValue();
   
    // this.saveLanguageData();
    // AsyncStorage.removeItem('languageData');
  }
  // async saveLanguageData(){
  //   var languageData = await AsyncStorage.getItem('languageData');
  //   if(languageData== null){
  //       await AsyncStorage.setItem('languageData', JSON.stringify(languages));
  //   }
  // }
  componentDidMount(){
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
  }
  componentWillUnmount() {
     NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
  }
    handleConnectivityChange = isConnected => {
        if (isConnected) {
          this.setState({ isConnected });
          
        } else {
          this.setState({ isConnected });
        }
    }
  async getStorageValue(){
    var value = await AsyncStorage.getItem('languageData');
    if(value !== null){  
          this.setState({LoggedIn:true});
    }
    else
    {
        if(this.state.isConnected){
          alert('netwrok connect')
         
        }
        else
        {
          alert('no netwrok');

        }
    }
  }
  fetchLanguageData(){
    fetch('https://wffer.com/se/api/rest/get-language-data?oauth_consumer_key=mji82teif5e8aoloye09fqrq3sjpajkk&oauth_consumer_secret=aoxhigoa336wt5n26zid8k976v9pwipe',{
              method:'GET'
            })
            .then((response) => response.json())
            .then((responseJson) => {
          
              if(responseJson.status_code=='200'){
                  AsyncStorage.setItem('languageData', JSON.stringify(responseJson.body));
                  AsyncStorage.setItem('languageinfo', 'en');
                 // alert(JSON.stringify(responseJson.body));
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
  componentDidMount() {
      setTimeout( () => {
          this.setTimePassed();
      },1000);

  }

  setTimePassed() {
      this.setState({timePassed: true});

  }
  render() {
    if(!this.state.timePassed){
        return <SplashScreen />;
    } else {
      
        return <MyNavigation/>;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import MyNavigation from './Navigation';
import SplashScreen from './SplashScreen';
type Props = {};
export default class App extends Component<Props> {
  constructor(props){
    super(props);
    this.state = {
        timePassed: false,
    };
  }
  componentDidMount() {
      setTimeout( () => {
          this.setTimePassed();
      },500);

  }

  setTimePassed() {
      this.setState({timePassed: true});

  }
  render() {
    if(!this.state.timePassed){
        return <SplashScreen />;
    } else {
      
        return <MyNavigation />;
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

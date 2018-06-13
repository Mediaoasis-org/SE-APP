import React, { Component } from 'react';
import {
  View,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import {gstyles} from '../../GlobalStyles'; 
import Carousel from 'react-native-banner-carousel';

const BannerWidth = Dimensions.get('window').width;
const BannerHeight = 260;
const images = [
    require('../../../assets/Background-Sliders-2.jpg'),
    require('../../../assets/Background-Sliders-3.jpg'),
    require('../../../assets/Background-Sliders.jpg')
];

export class BannerSliderComponent extends React.Component{
  constructor(props) {
      super(props);
      // alert(JSON.stringify(this.props.navigation));
    }
    renderPage(image, index) {
          return (
              <View key={index}>
                <TouchableOpacity>
                  <Image style={{ width: '100%', height: BannerHeight }} source={image} />
                  </TouchableOpacity>
              </View>
          );
      }
  render(){
      return(
        <View>
            <Carousel
                autoplay
                autoplayTimeout={5000}
                loop
                index={0}
                pageSize={BannerWidth} >
                    {images.map((image, index) => this.renderPage(image, index))}
            </Carousel>
        </View>
        )
      }
  }
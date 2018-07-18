import React, { Component } from 'react';
import {
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import {gstyles} from '../../GlobalStyles'; 
// import Carousel from 'react-native-banner-carousel';
import SwiperFlatList from 'react-native-swiper-flatlist';
// const BannerWidth = Dimensions.get('window').width;
// const BannerHeight = 260;
// const images = [
//     require('../../../assets/Background-Sliders-2.jpg'),
//     require('../../../assets/Background-Sliders-3.jpg'),
//     require('../../../assets/Background-Sliders.jpg')
// ];
const window= Dimensions.get('window');
export class BannerSliderComponent extends React.Component{
  constructor(props) {
      super(props);
      // alert(JSON.stringify(this.props.navigation));
    }
    // renderPage(image, index) {
    //       return (
    //           <View key={index}>
    //             <TouchableOpacity>
    //               <Image style={{ width: '100%', height: BannerHeight }} source={image} />
    //               </TouchableOpacity>
    //           </View>
    //       );
    //   }
  render(){
      return(
        <View style={gstyles.sliderView}>
             <SwiperFlatList
                  autoplay={true}
                  autoplayDelay={1}
                  autoplayLoop={true}
                  showPagination
                  paginationActiveColor="#00BCD4"
                  paginationDefaultColor="grey"
              >
                    <View><Image source={require('../../../assets/Background-Sliders-3.jpg')} resizeMode="contain" style={[gstyles.swiperflatlist,{width:window.width}]}/></View>
                    <View><Image source={require('../../../assets/Background-Sliders-2.jpg')} resizeMode="contain" style={[gstyles.swiperflatlist,{width:window.width}]}/></View>
                    <View><Image source={require('../../../assets/Background-Sliders.jpg')} resizeMode="contain" style={[gstyles.swiperflatlist,{width:window.width}]}/></View>
                    
              </SwiperFlatList>
        </View>
        )
      }
  }
  // <View>
  //           <Carousel
  //               autoplay
  //               autoplayTimeout={5000}
  //               loop
  //               index={0}
  //               pageSize={BannerWidth} >
  //                   {images.map((image, index) => this.renderPage(image, index))}
  //           </Carousel>
  //       </View>
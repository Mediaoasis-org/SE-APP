import React, { Component,PureComponent } from 'react';
import { withNavigation } from 'react-navigation';
import { Text,View,Dimensions,TouchableOpacity,TouchableHighlight,Image,FlatList,ScrollView,Modal,ActivityIndicator} from 'react-native';
import {gstyles} from '../../GlobalStyles';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {Constants} from '../../common';
import Carousel from 'react-native-snap-carousel';
import Gallery,{ ImageGallery } from 'react-native-image-gallery';
import PhotoView from 'react-native-photo-view';
// import {FlatlistComponent} from '../../components/FlatlistComponent';
const window= Dimensions.get('window');

function wp (percentage) {
    const value = (percentage * window.width) / 100;
    return Math.round(value);
}
const slideHeight = window.height * 0.36;
const slideWidth = wp(75);
const itemHorizontalMargin = wp(2);

const sliderWidth = window.width;
const itemWidth = slideWidth + itemHorizontalMargin * 2;

const entryBorderRadius = 8;

export class CatalogItems extends PureComponent {
	constructor(props){
		super(props);
		this.state={
    		fieldValues:[],
    		totalItems:'',
    		isLoading:true,
    		modalVisible: false,
    		showLoadMore:false,
    		fetching_Status: false,
    		images_array:[],
    		ModalImage:'',
    		
    	}
    	this.page=1;
    	this.fetchValues()
	}
	// state={
	// 	modalVisible: false,
	// }
	setModalVisible(visible,image) {
		// alert(visible)
	    this.setState({modalVisible: visible,ModalImage: image}); 
	    // alert(this.state.ModalImage)
	    // alert(this.state.modalVisible)  
	}

    fetchValues(){
    	const catalog_id = this.props.navigation.state.params.album_id;
      return fetch('https://wffer.com/se/api/rest/albums/view/'+ catalog_id +'?oauth_consumer_key=mji82teif5e8aoloye09fqrq3sjpajkk&oauth_consumer_secret=aoxhigoa336wt5n26zid8k976v9pwipe&page='+this.page,{
              method:'GET'
            })
      // &page=2
            .then((response) => response.json())
            .then((responseJson) => {
              if(responseJson.status_code=='200'){
                // console.log(JSON.stringify(responseJson.body));
                 this.setState({
                  fieldValues:responseJson.body.albumPhotos,
                  totalItems: responseJson.body.totalPhotoCount,
                  isLoading:false,

                });
                 let count = this.state.fieldValues.length;
                 if(count >= 20){
	      		 	this.setState({showLoadMore:true})
	      		 }
	    //   		 this.state.fieldValues.map((item)=>{
					// 		this.setState({images_array : [...this.state.images_array,...item.image]})
	    // //   		 	var joined = this.state.images_array.concat(item.image);
					// // this.setState({ myArray: joined })
					// // alert(this.state.myArray);
	    //   		  	// this.state.images_array.{source: { uri: item.image }}
	    //   		 	})
	      		 
	      		 // alert(this.state.myArray);
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

  	showLoadMore(){
  		this.page = this.page + 1;
	 	this.setState({ fetching_Status: true,showLoadMore:false}, ()=>{
	    	const catalog_id = this.props.navigation.state.params.album_id;
  			return fetch('https://wffer.com/se/api/rest/albums/view/'+ catalog_id +'?oauth_consumer_key=mji82teif5e8aoloye09fqrq3sjpajkk&oauth_consumer_secret=aoxhigoa336wt5n26zid8k976v9pwipe&page='+this.page,{
				        method:'GET'
				      })
				      .then((response) => response.json())
				      .then((responseJson) => {
				      	if(responseJson.status_code=='200'){
				      		 this.setState({
					          fieldValues:[...this.state.fieldValues,...responseJson.body.albumPhotos],isLoading: false,fetching_Status:false
					        });
				      		 let count = responseJson.body.response.length;
				      		 if(count >= 20){
				      		 	this.setState({showLoadMore:true})
				      		 }
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
		})
	 }

  	renderItem({item, index}) {
        return (
            <View style={{}}>
                <Image source={{uri:item.image}} style={{width:'100%'}} resizeMode="contain"/>
            </View>
        );
    }
    handleImage(image){
    	this.setModalVisible(true,image);
    	// alert(this.state.modalVisible)
    }

	render(){
		
		return(
			<View style={gstyles.flexContainer}>
				<View style={gstyles.headerMenu}>
							<TouchableOpacity onPress={() =>this.props.navigation.goBack()} style={gstyles.headerMenuButton}>
								<Icon name="angle-left" size={30} color="#fff" />
		                    </TouchableOpacity>
		                    <Text style={gstyles.headerProfileLabel}>{this.props.navigation.state.params.name}</Text>
		                    <Text style={gstyles.headerRightButton}></Text>
				</View>
				
				<ScrollView >
				{ 
        			this.state.isLoading ? <View style={gstyles.loading}><ActivityIndicator style={{height:100,width:'30%'}} color='#333' size="large"/></View> :
					<View>
					<FlatList numColumns={2} removeClippedSubviews={true} data={this.state.fieldValues} 
		                renderItem={({item}) =>      
		                    <View style={{width: '50%',padding:5}}>
		                     
		                      <TouchableOpacity style={{alignItems:'center'}} onPress={() =>this.handleImage(item.image)}>
			                      <Image source={{uri : item.image}} style={{height: window.height/4,width: '100%',borderWidth:1,borderColor:'#333',borderRadius:5}} resizeMode="stretch"/>
		                      </TouchableOpacity>

		                      
		                    </View>                    
		                    }
		                keyExtractor={(item, index) => index.toString()}
		              />
		              </View>
		          }
		             				<Modal
							          animationType="slide"
							          transparent={false}
							          visible={this.state.modalVisible}
							          onRequestClose={() => {
							            alert('Modal has been closed.');
							          }}>
							          <View style={{marginBottom:10,backgroundColor:'#fff',width:window.width,height:window.height}}>
								           <TouchableHighlight style={{backgroundColor:'#febe2b', padding:20}}
							                onPress={() => {
							                  this.setModalVisible(!this.state.modalVisible);
							                }}>
							               <Text style={{textAlign:'right',color:'#fff',fontSize:18,marginTop:10}}><Icon name="close" size={24} color="#fff" /></Text>
							              </TouchableHighlight>
						            
							             <PhotoView
	  									  source={{uri: this.state.ModalImage}}
	  									  
										  minimumZoomScale={1}
										  maximumZoomScale={3}
										  androidScaleType="center"
										  onLoad={() => console.log("Image loaded!")}
										  style={{width: '96%', height: window.height,margin:'2%'}} />
							          </View>
							        </Modal>
					{
						(this.state.showLoadMore==true) ? <TouchableOpacity style={gstyles.buttonView} onPress={()=>this.showLoadMore()}><Text style={gstyles.buttonText}>Load More</Text></TouchableOpacity> : null
					}
					{				
						this.state.fetching_Status==true ? <View style={gstyles.loadMoreActivity}><ActivityIndicator color='#333' size="large"/></View>:<View />
					}	 
				</ScrollView>
				
			</View>
		)
	}
}

 // <ScrollView maximumZoomScale={2} minimumZoomScale={1} zoomScale={2}>
	// 					         			<Image source={{uri : this.state.ModalImage}} resizeMethod="auto" style={{borderColor:'#000',borderWidth:2,width:'100%',height:window.height}} resizeMode="contain"/>
	// 					             </ScrollView>


	// <Gallery
	// 									        style={{ flex: 1, backgroundColor: 'black' }}
	// 											images={this.state.images_array}      
	// 								    />
// <Carousel
// 							              ref={(c) => { this._carousel = c; }}
// 							              data={this.state.fieldValues}
// 							              renderItem={this.renderItem}
// 							              sliderWidth={sliderWidth}
// 							              itemWidth={itemWidth}
// 							              hasParallaxImages={true}
// 							              inactiveSlideScale={0.94}
//                  						  inactiveSlideOpacity={0.7}
//                  						  containerCustomStyle={gstyles.slider}
// 						                  contentContainerCustomStyle={gstyles.sliderContentContainer}
// 						                  loop={true}
// 						                  loopClonesPerSide={2}
// 						                  autoplay={true}
// 						                  autoplayDelay={500}
// 						                  autoplayInterval={3000}
// 							            />

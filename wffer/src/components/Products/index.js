import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image} from 'react-native';
import {gstyles} from '../../GlobalStyles';

export class ProductDetail extends React.Component{
  constructor(props) {
      super(props);
      this.state = {
       qty:1,
      }
      
      // alert(JSON.stringify(this.props.navigation));
    }
  // decrease_qty(qty){
  //   // alert(qty)
  //   if(parseInt(qty)!=1){
  //    qty=parseInt(qty)-1; 
  //   }
  //   this.setState({qty:qty});
  // }
  //  increase_qty(qty){
  //     // alert(id)
      
  //     qty=parseInt(qty)+1; 
  //     // alert(qty)
  //     this.setState({qty:qty});
  //  }
  render(){
    
      return(
        <View style={gstyles.backgroundWhite}>
          <View style={[gstyles.width100,gstyles.flexDirectionRow]}>
                <View style={gstyles.lowestPriceLeftBox}>
                    
                      <Image source={{uri:this.props.data.image}} style={gstyles.productDetailsImage}/>
                    
                </View>
                <View style={gstyles.lowestPriceRightBox}>
                    <View style={gstyles.width80}><Text style={gstyles.productDetailsTitle}>{this.props.data.title}</Text></View>
                    
                    <View style={[gstyles.width80,gstyles.flexDirectionRow,gstyles.marginTop5per]}><Text>{this.props.data.like_count} likes</Text><Text> - </Text><Text>{this.props.data.view_count} Views</Text><Text> - </Text><Text>{this.props.data.comment_count} Comments</Text></View>
              </View>

          </View>
          <View style={[gstyles.width100,gstyles.flexDirectionRow]}>
             
              <TouchableOpacity style={gstyles.likeButton} onPress={()=>this.props.navigation.push('MultipleWishlist',{product_ids:this.props.data.listing_id})}>
                  <Text style={gstyles.textCenter}>Add to Shopping List</Text>
              </TouchableOpacity>
          </View>
        </View>
        )
      }
  }

   // <TouchableOpacity style={gstyles.likeButton}>
   //                <Text style={gstyles.textCenter}>Like</Text>
   //            </TouchableOpacity>
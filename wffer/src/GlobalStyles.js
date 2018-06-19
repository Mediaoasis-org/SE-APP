import { StyleSheet,Platform } from 'react-native';

export const gstyles = StyleSheet.create({
    container:{
		flex:1,
		backgroundColor:'#fff'
	},	
	flexDirectionColumn:{flexDirection:'column'},
	fontSize18:{fontSize:18},
	textInputStyle:{margin:10,padding:10,borderWidth:1,borderColor:'#ccc'},
	buttonView:{margin:10,padding:10,backgroundColor:'#696969',alignItems:'center'},
	buttonText:{color:'#fff',fontSize:16,fontWeight:'bold'},
	headerMenu:{
	...Platform.select({
		ios:{
			paddingTop:55,
			paddingLeft:10,
			paddingRight:10,
		    flexDirection: "row",
		    justifyContent: 'center',
		    paddingBottom: 3,
		    borderBottomColor:'#ccc',
          	borderBottomWidth:1,
          	backgroundColor:'#febe2b'
		},
		android:{
			paddingTop:45,
			paddingLeft:10,
			paddingRight:10,
		    flexDirection: "row",
		    justifyContent: 'center',
		    paddingBottom: 5,
		    borderBottomColor:'#ccc',
            borderBottomWidth:1,
            backgroundColor:'#febe2b'
		},
	  })
	},
	headerMenuButton: {
	...Platform.select({
		ios:{
			position: 'absolute', 
			paddingTop:26,
			left: 10,
		},
		android:{
			position: 'absolute', 
			paddingTop:10,
			left: 10,
		},
  	})
	},
	headerProfileLabel:{
		...Platform.select({
	    ios:{
	      paddingTop:22,
	      position: 'absolute',
	      top:5,
	      fontSize:18,
	      letterSpacing: 3,
	      color: '#fff',
	     },
	     android:{
	      paddingTop:8,
	      position: 'absolute',
	      top:5,
	      fontSize:18,
	      letterSpacing: 3,
	      color: '#fff',
	     },
	  })
	},
	headerBackButton: {
	...Platform.select({
		ios:{
			position: 'absolute', 
			paddingTop:22,
			left: 40,
		},
		android:{
			position: 'absolute', 
			paddingTop:10,
			left: 40,
		},
  	})
	},
	headerRightButton: {
	...Platform.select({
		ios:{
			position: 'absolute',
		    paddingTop:22, 
		    right: 10,
		    top:5,
		},
		android:{
			position: 'absolute',
		    paddingTop:8,
		    right: 10,
		    top:5,
		},
	  })
	},
	menuicon:{
		height:24,
		width:24
	},
	drawerView:{width:'100%',flexDirection:'row'},
	drawertitleHeadingText:{backgroundColor:'#eee',padding:10,color:'#333',borderBottomColor:'#dedede',borderBottomWidth:1,fontSize:16,fontWeight:'bold'},
	drawertitleNormalText:{padding:10,color:'#333',fontSize:16,width:'80%'},
	drawerImage:{marginTop:10,marginLeft:10,marginRight:0,width:24,height:24,flexDirection:'column'
	// ,tintColor: '#febe2b'
},
	flatimage:{ height: 150, width: '100%' },
	title:{  fontSize: 18, color: '#000' },
	likeButton:{width:'45%',padding:10,backgroundColor:'#e9ebee',borderColor:'#ddd',borderWidth:1,margin:10,justifyContent:'center',flexDirection:'column'},
	slider: {
        // marginTop: 15,
        overflow: 'visible' // for custom animations
    },
    sliderContentContainer: {
        paddingVertical: 10 // for custom animation
    },
    //search component

    searchView:{width:'100%',flexDirection:'row',padding:10},
    searchViewLeft:{width:'10%',flexDirection:'column'},
    searchViewRight:{width:'90%',flexDirection:'column',...Platform.select({android:{padding:0}}),fontSize:16},
    //promotional offer heading
    OfferHeadingsHome:{borderBottomWidth:1,borderBottomColor:'#FFC107',padding:10,marginTop:10,backgroundColor:'#e9ebee'},

    //special offer 
    specialOfferView:{width:'100%',flexDirection:'row'},

    //modal dropdown or select list
    dropdownMainStyles:{borderWidth:1,borderColor:'#ccc',margin:10,padding:5},
    dropdownTextStyle:{fontSize: 18, color: '#000',padding:5},
    textStyle:{color: '#000', fontSize: 18,padding:5},
    dropdownStyles:{width:'90%',padding:5,margin:5},

    //profile
    profileHeadingView:{width:'100%',alignItems:'center'},
    profileHeadingText:{padding:10,fontSize:20,color:'#000'},

    //sign in
    createAccountView:{margin:10,padding:10,backgroundColor:'#62C462',alignItems:'center'},
    createAccountText:{fontSize:16,color:'#fff',fontWeight:'bold'},
    newToView:{margin:10,padding:10,alignItems:'center'},
    newToText:{color:'#000',fontWeight:'bold',fontSize:16},
    forgetPasswordView:{margin:10,padding:10,justifyContent:'center',flexDirection:'row'},
    forgetPasswordText:{fontSize:16,color:'#007F97'},

    //sign up
    termsView:{flexDirection: 'row',justifyContent:'center',width:'100%'},
    termsLink:{color:'#62C462',fontSize:18}
})
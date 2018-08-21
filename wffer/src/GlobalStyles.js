import { StyleSheet,Platform,Dimensions,AsyncStorage } from 'react-native';

const window= Dimensions.get('window');
export const gstyles = StyleSheet.create({
	flexContainer:{
		flex:1,backgroundColor:'#eee',
	},
    container:{
		flex:1,backgroundColor:'#fff',
	},

	backgroundWhite:{backgroundColor: '#fff'},

	width100:{width:'100%'},
	width90:{width:'90%'},
	width80:{width:'80%'},
	alignItemsCenter:{alignItems:'center'},

	flexDirectionRow:{flexDirection:'row'},
	flexDirectionColumn:{flexDirection:'column'},

	fontSize18:{fontSize:16},

	margin5:{margin:5},
	marginTop10:{marginTop:10},
	marginBottom10:{marginBottom:10},
	marginTop40:{marginTop:40},
	marginTop5per:{marginTop:'5%'},
	paddingTop10:{paddingTop:10},
	padding10:{padding:10},
	textCenter:{textAlign:'center'},
	textRight:{textAlign:'right'},
	textLeft:{textAlign:'left'},
	textRed:{color:'#ff0000'},
	textBlack:{color:'#000'},
	
	loading:{alignItems:'center',justifyContent:'center',flex:1},
	loadingActivity:{backgroundColor:'#febe2b',padding:20,borderRadius:20},

	textInputStyle:{margin:10,padding:10,borderWidth:1,borderColor:'#ccc'},
	texterrorStyle:{margin:10,color:'#ff0000'},
	checkboxStyle:{color:'#ff0000',backgroundColor:'#00ff00'},
	userImageView:{flexDirection: 'column',justifyContent: 'center',alignItems: 'center',padding:20,},
	cameraImageView:{position:'absolute',top:22,left:'66%',zIndex:1000},
	buttonView:{margin:10,padding:10,backgroundColor:'#696969',alignItems:'center'},
	buttonText:{color:'#fff',fontSize:16,fontWeight:'bold'},
	buttonViewFixed:{padding:2,backgroundColor:'#f2f2f2', alignSelf: 'center',width:'50%',position:'absolute',bottom:15,flexDirection:'row',flex: 0.2,borderRadius:50,borderColor:'#bfbfbf',borderWidth:2,zIndex:1000},
	buttonTextFixed:{color:'#000',fontSize:16,fontWeight:'bold'},
	getPriceButton:{flexDirection:'column',padding:5,width:'50%',alignItems:'center'},

	sideMenuView:
	{
		width:window.width*0.75,
		backgroundColor:'#fff',
		...Platform.select({
			ios:{
				paddingTop:20,paddingBottom:15
			},
			android:{
				paddingTop:0,paddingBottom:5
			}
		})
	},
	headerMenu:{
		width:'100%',
		flexDirection:'row',
		// justifyContent:'center',
		borderBottomColor:'#ccc',
      	borderBottomWidth:1,
      	backgroundColor:'#febe2b',

		...Platform.select({
			ios:{	
				height:65,
				// marginTop:10,
			},
			android:{
				height:50,
				// marginTop:15,
			}
		})
	},
	headerMenuButton:{
		alignItems:'center',
		width:'12%',
		flexDirection:'column',
		
			// borderRightWidth:1,
   //    	borderRightColor:'#000',
		...Platform.select({
			ios:{
				paddingTop:25,
				// paddingLeft:10,
			},
			android:{
				// paddingLeft:10,
				paddingTop:15
			}
		})
	},
	headerProfileLabel:{
			fontSize:16,
	      	fontWeight:'bold',
	      	letterSpacing: 3,
	      	color: '#fff',
	      	width:'76%',
			flexDirection:'column',
			textAlign:'center',
		...Platform.select({
			ios:{
				paddingTop:27,
			},
			android:{	
				paddingTop:17,
			}
		})
	},
	headerRightButton:{
		alignItems:'center',
		width:'12%',
		flexDirection:'column',
		paddingRight:10,
		...Platform.select({
			ios:{
				paddingTop:25,	
			},
			android:{
				paddingTop:15,
			}
		})
	},

	//city
	cityMenu:{width:'96%',backgroundColor:'#00BCD4',padding:15,marginTop:5,marginBottom:5,marginLeft:'2%',marginRight:'2%'},
    cityMenuText:{color:'#fff',fontSize:16,fontWeight:'bold',textAlign:'center'},
	// headerMenu:{
	// ...Platform.select({
	// 	ios:{
	// 		paddingTop:60,
	// 		// paddingLeft:10,
	// 		// paddingRight:10,
	// 	    flexDirection: "row",
	// 	    justifyContent: 'center',
	// 	    paddingBottom: 3,
	// 	    borderBottomColor:'#ccc',
 //          	borderBottomWidth:1,
 //          	backgroundColor:'#febe2b'
	// 	},
	// 	android:{
	// 		paddingTop:45,
	// 		// paddingLeft:10,
	// 		// paddingRight:10,
	// 	    flexDirection: "row",
	// 	    justifyContent: 'center',
	// 	    paddingBottom: 5,
	// 	    borderBottomColor:'#ccc',
 //            borderBottomWidth:1,
 //            backgroundColor:'#febe2b'
	// 	},
	//   })
	// },
	// headerMenuButton: {
	// ...Platform.select({
	// 	ios:{
	// 		position: 'absolute', 
	// 		paddingTop:26,
	// 		width:'10%',
	// 		// paddingLeft:10,
	// 		// paddingRight:10,
	// 		left: 10,
	// 	},
	// 	android:{
	// 		position: 'absolute', 
	// 		paddingTop:10,
	// 		left: 10,
	// 		width:'10%'
	// 	},
 //  	})
	// },
	// headerProfileLabel:{
	// 	...Platform.select({
	//     ios:{
	//       paddingTop:27,
	//       position: 'absolute',
	//       // top:5,
	//       fontSize:18,
	//       fontWeight:'bold',
	//       letterSpacing: 3,
	//       color: '#fff',
	//      },
	//      android:{
	//       paddingTop:13,
	//       position: 'absolute',
	//       // top:5,
	//       fontSize:18,
	//       letterSpacing: 3,
	//       color: '#fff',
	//      },
	//   })
	// },
	// // headerBackButton: {
	// // ...Platform.select({
	// // 	ios:{
	// // 		position: 'absolute', 
	// // 		paddingTop:22,
	// // 		left: 40,
	// // 		width:'10%'
	// // 	},
	// // 	android:{
	// // 		position: 'absolute', 
	// // 		paddingTop:10,
	// // 		left: 40,
	// // 	},
 // //  	})
	// // },
	// headerRightButton: {
	// ...Platform.select({
	// 	ios:{
	// 		position: 'absolute',
	// 	    paddingTop:26, 
	// 	    right: 10,
	// 	    // top:5,

	// 	},
	// 	android:{
	// 		position: 'absolute',
	// 	    paddingTop:13,
	// 	    // paddingLeft:10,
	// 	    // paddingRight:10,
	// 	    height:40,
	// 	    right: 10,
	// 	    // top:5,
	// 	},
	//   })
	// },
	menuicon:{height:24,width:24},
	drawerView:{width:'100%',flexDirection:'row',padding:3},
	drawertitleHeadingText:{width:'100%',backgroundColor:'#eee',padding:10,color:'#333',borderBottomColor:'#dedede',borderBottomWidth:1,fontSize:14,fontWeight:'bold'},
	drawertitleNormalText:{padding:10,color:'#333',fontSize:14,width:'85%'},
	drawerImage:{marginTop:10,marginLeft:10,marginRight:0,width:24,height:24,flexDirection:'column'},
	flatimage:{ height: 150, width: '100%' },
	title:{  fontSize: 16, color: '#000' },
	likeButton:{width:'46%',padding:10,backgroundColor:'#e9ebee',borderColor:'#ddd',borderWidth:1,marginLeft:'2%',marginRight:'2%',marginTop:5,marginBottom:10,justifyContent:'center',flexDirection:'column'},
	slider: {
        // marginTop: 15,
        overflow: 'visible' // for custom animations
    },
    sliderContentContainer: {
        paddingVertical: 10 // for custom animation
    },
    sliderView:{width:'100%',backgroundColor:'#fff',marginTop:10,marginBottom:10},
    swiperflatlist:{height:350,top:-35},

    //language 
    languageView:{flexDirection:'column',width:'46%',margin:'2%'},
    languageImageView:{flexDirection:'row',paddingTop:10,paddingBottom:10,paddingLeft:10,paddingRight:10,borderWidth:1,borderColor:'#000'},
    languageImage:{flexDirection:'column',marginRight:10,width:50,height:50},
    languageText:{flexDirection:'column',paddingTop:15},

    //promotional offer store
    promotionalOfferView:{paddingTop:7,backgroundColor:'#e9ebee',paddingBottom:7},

    //search component
    searchView:{width:'100%',flexDirection:'row',padding:12,backgroundColor:'#fff'},
    searchViewLeft:{width:'10%',flexDirection:'column'},
    searchViewRight:{width:'85%',flexDirection:'column',...Platform.select({android:{padding:0}}),fontSize:16,marginRight:'5%',marginLeft:'5%'},

    //promotional offer heading
    OfferHeadingsHome:{borderBottomWidth:1,borderBottomColor:'#FFC107',padding:10,marginTop:10,backgroundColor:'#fff'},
    
    //special offer 
    SpecialOfferHeadingsHome:{borderBottomWidth:1,borderBottomColor:'#FFC107',padding:10,marginTop:10,backgroundColor:'#fff',width:'100%'},
    specialOfferViewHome:{width:'100%',flexDirection:'row',backgroundColor:'#e9ebee'},
    specialOfferView:{width:'46%',paddingLeft:15,paddingRight:15,paddingBottom:15,margin:'2%',backgroundColor:'#fff'},
    discountShow:{width:'60%',marginBottom:5,marginLeft:-15,backgroundColor:'#c30000',padding:5,color:'#fff',fontSize:14},
    specialOfferTitle:{width: '90%',paddingTop:10},
    specialOfferCategory:{color:'gray',fontSize:14,fontWeight:'bold'},
    specialOfferCompany:{color:'#c40b00',fontSize:14},
    
    //modal dropdown or select list
    dropdownMainStyles:{borderWidth:1,borderColor:'#ccc',marginLeft:'3%',marginRight:'3%',padding:5,width:'94%',marginTop:10,marginBottom:10},
    dropdownTextStyle:{fontSize: 16, color: '#000',padding:8},
    textStyle:{color: '#000', fontSize: 16,padding:10},
    dropdownStyles:{width:'92%',height:window.height/3},

    //profile
    profileHeadingView:{width:'100%',alignItems:'center'},
    profileHeadingText:{padding:10,fontSize:16,color:'#000'},
    circledImage:{paddingTop: 10,width: 200,height: 200,borderRadius: 100},
    
    //sign in
    createAccountView:{margin:10,padding:10,backgroundColor:'#62C462',alignItems:'center'},
    createAccountText:{fontSize:16,color:'#fff',fontWeight:'bold'},
    newToView:{margin:10,padding:10,alignItems:'center'},
    newToText:{color:'#000',fontWeight:'bold',fontSize:16},
    forgetPasswordView:{margin:10,padding:10,justifyContent:'center',flexDirection:'row'},
    forgetPasswordText:{fontSize:16,color:'#5b9626',marginRight:5},

    //catalog 
    catalogView:{margin:10,borderWidth:1,borderColor:'#000'},
    catalogPhotoCount:{padding:10,backgroundColor:'#000',color:'#fff',position:'absolute',top:0,zIndex:1000,right:0,fontSize:16,fontWeight:'bold'},
    catalogPhoto:{height: window.height/4,width: '100%'},
    catalogItemsView:{width:'100%',backgroundColor:'#fff',margin:3},


    //shopping list
    ShoppingButton: { backgroundColor: '#F5FCCC',padding: 10, flexDirection:'row', width:'100%' },
  	ShoppingText: { flexDirection:'column', fontSize: 16, fontWeight: '500', color:'#000'},
  	ShoppingListItemsView:{padding:10,flexDirection:'row'},
  	ShoppingListItemsViewImage:{flexDirection:'column',width:'40%',padding:10},
  	ShoppingListItemsViewRightContent:{flexDirection:'column',width:'60%',padding:10},
  	ShoppingWishlistTitle:{fontSize:16,fontWeight:'bold',marginTop:5,color:'#000'},
  	ShoppingWishlistText:{marginTop:5,color:'#000'},
  	content: { marginLeft: '3%', marginRight:'3%',marginTop:5,marginBottom:10, backgroundColor: '#fff',width:'94%'},
  	signInButton:{padding:10,fontSize:16,margin:10,textAlign:'center'},

  	// products css
  	productsMain:{backgroundColor: '#fff',marginTop:12,marginLeft:10,marginRight:10},
  	productsMainLeft:{width:'90%',flexDirection:'row'},
  	productsMainRight:{width:'10%'},
  	productImageView:{width:'17%',marginLeft:'3%',flexDirection:'column',padding:3},
  	productImage:{marginTop:'15%', marginBottom:'10%', width: '100%', height: 80},
  	productViewRight:{width:'77%',marginLeft:'3%',flexDirection:'column'},
  	productTitle:{fontSize: 16, marginTop: '5%',color:'#000',fontWeight:'bold'},
  	productCatTitle:{fontSize: 16, marginTop: '2%',color:'#000'},
  	qtyView:{flexDirection: 'row',padding:10,marginLeft:'40%'},
  	qtybuttonDecrease:{margin:3},
 	qtybuttonIncrease:{margin:3},
 	qtyText:{backgroundColor:'#e9ebee',textAlign:'center',fontSize: 14, color: '#000', margin:5,paddingTop:8,paddingBottom:8,paddingLeft:15,paddingRight:15,borderColor:'#adadad',borderWidth:1},
 	qtyIcon:{width:30,height:30},
 	productsMainRightIcon:{paddingTop:'100%',marginLeft:'5%',fontWeight:'bold'},
 	productBottomPart:{width:'100%',flexDirection:'row',borderTopColor:'gray',borderTopWidth:1,paddingTop:5},
 	checkboxView:{width:'60%',padding:10},
 	bestDealView:{width:'46%'},
 	// ,padding:3
 	discountDeal:{color: '#ff0000', fontSize: 16,textAlign:'center',fontStyle:'italic'},
 	bestDeal:{color: '#000', marginTop: '3%', fontSize: 16,textAlign:'center'},
 	loadMoreActivity:{padding:10,width:'100%',position:'absolute', bottom:0,backgroundColor:'transparent'},

 	//product details 
 	productDetailsImage:{marginTop:'15%', marginBottom:'10%', marginLeft: '5%',  width: '90%', height: window.height/6,padding:5},
 	productDetailsTitle:{fontSize: 16, marginTop: '10%',color:'#000'},
 	priceComparisonText:{fontSize:16,fontWeight:'bold',margin:10},
 	priceComparisonView:{backgroundColor: '#fff', flexDirection: 'row', borderColor:'#adadad',borderBottomWidth:1,width:'96%',marginLeft:'2%',marginRight:'2%',marginTop:'2%'},
 	priceComparisonLeft:{flexDirection: 'column',width:'40%',padding:10},
 	priceComparisonRight:{flexDirection: 'column',width:'60%',marginBottom:5},
 	priceCompanyImage:{height:50,width:'100%'},
 	priceTitleTextView:{width: '100%',padding:3},
 	priceTitleText:{fontSize: 16, marginTop: 5,color:'#000',fontWeight:'bold'},
	priceSubtitleText:{color: '#000', marginTop: 1, fontSize: 16},

  	//wishlist
  	wishlistMultipleView:{width:'100%',flexDirection:'row',padding:8},
  	multipleCheckbox:{color:'#000',fontSize:16},
  	wishlistBackButton:{padding:10,width:'30%',flexDirection:'column'},
  	wishlistTitle:{padding:10,fontSize:16,width:'90%',flexDirection:'column',color:'#000',fontWeight:'bold',marginTop:2},
  	wishlistBox:{backgroundColor: '#fff', margin:5,flexDirection:'row',width:'96%',marginLeft:'2%',marginRight:'2%'},
  	wishlistBoxLeft:{width:'85%',flexDirection:'row',marginBottom:10,marginRight:'3%'},
  	wishlistBoxRight:{width:'10%',marginTop:'10%'},
  	wishlistInnerLeft:{width:'17%',marginLeft:'3%',flexDirection:'column',padding:3},
  	wishlistInnerLeftImage:{marginTop:'15%', marginBottom:'10%', width: '100%', height: 80},
  	wishlistInnerRight:{width:'77%',marginLeft:'3%',flexDirection:'column'},
  	wishlistInnerTitle:{fontSize: 16, marginTop: '5%',color:'#000',fontWeight:'bold'},
  	catTitle:{fontSize: 16, marginTop: '2%',color:'#000'},
	subtitle:{color: '#000', marginTop: '3%', fontSize: 16,textAlign:'left'},
	wishlistCheckBox:{paddingTop:'100%',paddingLeft:'10%'},
	wishlistModalContainer:{flex: 1,flexDirection: 'column', justifyContent: 'center',alignItems: 'center'},
	wishlistModalContainerBox:{backgroundColor:'#fff', width: 300},
	modalMenu:{width:'100%',backgroundColor:'#00BCD4',padding:15,borderBottomColor:'#fff',borderBottomWidth:1},
    modalMenuText:{color:'#fff',fontSize:16,fontWeight:'bold'},
    deleteButton:{
		...Platform.select({
			ios:{
				position:'absolute',
				bottom:25,
				zIndex:1000,
				right:7,
				width:45,
				height:45,
				borderRadius:50,
				backgroundColor:'#c74b4b'
			},
			android:{
				position:'absolute',
				bottom:25,
				zIndex:1000,
				right:7,
				width:45,
				height:45,
				borderRadius:50,
				backgroundColor:'#c74b4b'
			},
		  })
		},

	//edit wishlist
	cancelButton:{margin:10,padding:10,borderColor:'#696969',borderWidth:1,alignItems:'center'},
	cancelButtonText:{color:'#000',fontSize:16,fontWeight:'bold'},

	//lowest price
	lowestPriceLeftBox:{flexDirection: 'column',width:'30%'},
	lowestPriceImage:{marginTop:'15%', marginBottom:'10%', marginLeft: '5%', width: '100%', height: 100},
	lowestPriceRightBox:{flexDirection: 'column',width:'68%',paddingRight:'2%'},
	lowestPriceLeftInnerBox:{flexDirection: 'column',width:'10%'},
	lowestPriceRightInner:{flexDirection:'row',width:'100%'},
	lowestPriceRightInnerBox:{flexDirection: 'column',width:'85%',marginRight:'4%'},
	lowestPriceTitle:{fontSize: 16, marginTop: '10%',color:'#000',fontWeight:'bold'},
	lowestPriceSubTitle:{color: '#000', marginTop: '3%', fontSize: 16},

	//multistore 
	multistoreView:{backgroundColor: '#fff',borderBottomColor:'grey',borderBottomWidth:0.5,flexDirection:'row',margin:5,padding:5},
	multistoreLeftView:{width:'90%',flexDirection:'column'},
	multistoreRightInnerView:{width:'100%',flexDirection:'row',alignItems:'center',justifyContent:'center'},
	multistoreTitle:{fontSize:16,fontWeight:'bold',padding:5},
	multistoreAddress:{fontSize:16,padding:5},
	multistoreRightView:{width:'10%',flexDirection:'column',alignItems:'center',justifyContent:'center'},

	//tell a friend
	textfieldDescription:{marginLeft:10,marginRight:10,marginTop:2,marginBottom:2},

    //sign up
    termsView:{flexDirection: 'row',justifyContent:'center',width:'100%'},
    termsLink:{color:'#62C462',fontSize:16},

   	//tell a friend
    flatlist:{backgroundColor: '#fff',borderBottomColor:'grey',borderBottomWidth:0.5,flexDirection:'row',width:'100%'},
    tellfriend:{backgroundColor: '#fff',flexDirection:'row',width:'100%'},
    tellFriendTitle:{fontSize: 16,padding:20,color:'#000',fontWeight:'bold',width:'80%'},
    rightButton:{paddingTop:20,paddingBottom:20,width:'15%'},
})
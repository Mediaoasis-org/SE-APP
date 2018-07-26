import { StyleSheet,Platform,Dimensions } from 'react-native';
const window= Dimensions.get('window');
export const gstyles = StyleSheet.create({
	flexContainer:{
		flex:1,backgroundColor:'#eee'
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

	fontSize18:{fontSize:18},

	margin5:{margin:5},
	marginBottom10:{marginBottom:10},
	marginTop40:{marginTop:40},
	marginTop5per:{marginTop:'5%'},
	paddingTop10:{paddingTop:10},
	padding10:{padding:10},
	textCenter:{textAlign:'center'},
	textRed:{color:'#ff0000'},
	
	loading:{alignItems:'center',justifyContent:'center',flex:1},
	loadingActivity:{backgroundColor:'#febe2b',padding:20,borderRadius:20},

	textInputStyle:{margin:10,padding:10,borderWidth:1,borderColor:'#ccc'},
	checkboxStyle:{color:'#ff0000',backgroundColor:'#00ff00'},
	userImageView:{flexDirection: 'column',justifyContent: 'center',alignItems: 'center',padding:20,},
	cameraImageView:{position:'absolute',top:22,left:'66%',zIndex:1000},
	buttonView:{margin:10,padding:10,backgroundColor:'#696969',alignItems:'center'},
	buttonText:{color:'#fff',fontSize:16,fontWeight:'bold'},
	buttonViewFixed:{padding:2,backgroundColor:'#f2f2f2', alignSelf: 'center',width:'50%',position:'absolute',bottom:15,flexDirection:'row',flex: 0.2,borderRadius:50,borderColor:'#bfbfbf',borderWidth:2},
	buttonTextFixed:{color:'#000',fontSize:18,fontWeight:'bold'},
	getPriceButton:{flexDirection:'column',padding:5,width:'50%',alignItems:'center'},

	sideMenuView:
	{
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
			fontSize:18,
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
	drawertitleHeadingText:{backgroundColor:'#eee',padding:10,color:'#333',borderBottomColor:'#dedede',borderBottomWidth:1,fontSize:16,fontWeight:'bold'},
	drawertitleNormalText:{padding:10,color:'#333',fontSize:16,width:'100%'},
	drawerImage:{marginTop:10,marginLeft:10,marginRight:0,width:24,height:24,flexDirection:'column'},
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
    sliderView:{width:'100%',backgroundColor:'#fff',marginTop:10,marginBottom:10},
    swiperflatlist:{height:350,top:-35},

    //language 
    languageView:{flexDirection:'column',width:'40%',margin:'2%'},
    languageImageView:{flexDirection:'row',paddingTop:10,paddingBottom:10,paddingLeft:10,paddingRight:10,borderWidth:1,borderColor:'#000'},
    languageImage:{flexDirection:'column',marginRight:10},
    languageText:{flexDirection:'column',paddingTop:15},

    //promotional offer store
    promotionalOfferView:{paddingTop:7,backgroundColor:'#e9ebee',paddingBottom:7},

    //search component
    searchView:{width:'100%',flexDirection:'row',padding:12,backgroundColor:'#fff'},
    searchViewLeft:{width:'10%',flexDirection:'column'},
    searchViewRight:{width:'90%',flexDirection:'column',...Platform.select({android:{padding:0}}),fontSize:16},

    //promotional offer heading
    OfferHeadingsHome:{borderBottomWidth:1,borderBottomColor:'#FFC107',padding:10,marginTop:10,backgroundColor:'#fff'},
    
    //special offer 
    SpecialOfferHeadingsHome:{borderBottomWidth:1,borderBottomColor:'#FFC107',padding:10,marginTop:10,backgroundColor:'#fff'},
    specialOfferViewHome:{width:'100%',flexDirection:'row',backgroundColor:'#e9ebee'},
    specialOfferView:{width:'46%',paddingLeft:20,paddingRight:20,paddingBottom:15,margin:'2%',backgroundColor:'#fff'},
    discountShow:{width:'60%',marginBottom:5,marginLeft:-15,backgroundColor:'#c30000',padding:5,color:'#fff',fontSize:16},
    specialOfferTitle:{width: '90%',paddingTop:10},
    specialOfferCategory:{color:'#333',fontSize:16,fontWeight:'bold'},
    specialOfferCompany:{color:'#c40b00',fontSize:17},
    
    //modal dropdown or select list
    dropdownMainStyles:{borderWidth:1,borderColor:'#ccc',margin:10,padding:5},
    dropdownTextStyle:{fontSize: 18, color: '#000',padding:5},
    textStyle:{color: '#000', fontSize: 18,padding:5},
    dropdownStyles:{width:'90%',padding:5,margin:5},

    //profile
    profileHeadingView:{width:'100%',alignItems:'center'},
    profileHeadingText:{padding:10,fontSize:20,color:'#000'},
    circledImage:{paddingTop: 10,width: 200,height: 200,borderRadius: 100},
    
    //sign in
    createAccountView:{margin:10,padding:10,backgroundColor:'#62C462',alignItems:'center'},
    createAccountText:{fontSize:16,color:'#fff',fontWeight:'bold'},
    newToView:{margin:10,padding:10,alignItems:'center'},
    newToText:{color:'#000',fontWeight:'bold',fontSize:16},
    forgetPasswordView:{margin:10,padding:10,justifyContent:'center',flexDirection:'row'},
    forgetPasswordText:{fontSize:16,color:'#5b9626'},

    //catalog 
    catalogView:{margin:10,borderWidth:1,borderColor:'#000'},
    catalogPhotoCount:{padding:10,backgroundColor:'#000',color:'#fff',position:'absolute',top:0,zIndex:1000,right:0,fontSize:16,fontWeight:'bold'},
    catalogPhoto:{height: window.height/4,width: '100%'},
    catalogItemsView:{width:'100%',backgroundColor:'#fff',margin:3},


    //shopping list
    ShoppingButton: { backgroundColor: '#F5FCCC',padding: 10, flexDirection:'row', width:'100%' },
  	ShoppingText: { flexDirection:'column', fontSize: 20, fontWeight: '500', color:'#000'},
  	ShoppingListItemsView:{borderColor:'#000',borderWidth:1,padding:10,marginTop:8,marginBottom:10,flexDirection:'row'},
  	ShoppingListItemsViewImage:{flexDirection:'column',width:'20%'},
  	ShoppingListItemsViewRightContent:{flexDirection:'column',width:'80%'},
  	ShoppingWishlistTitle:{fontSize:16,fontWeight:'bold',marginTop:5,color:'#000'},
  	ShoppingWishlistText:{marginTop:5,color:'#000'},
  	content: { paddingLeft: 10, paddingRight:10, backgroundColor: '#fff'},
  	signInButton:{padding:10,fontSize:18,margin:10,textAlign:'center'},

  	// products css
  	productsMain:{backgroundColor: '#fff',  borderColor:'gray',borderWidth:1,margin:5},
  	productsMainLeft:{width:'90%',flexDirection:'row'},
  	productsMainRight:{width:'10%'},
  	productImageView:{width:'17%',marginLeft:'3%',flexDirection:'column',padding:3},
  	productImage:{marginTop:'15%', marginBottom:'10%', width: '100%', height: 80},
  	productViewRight:{width:'77%',marginLeft:'3%',flexDirection:'column'},
  	productTitle:{fontSize: 18, marginTop: '5%',color:'#000',fontWeight:'bold'},
  	productCatTitle:{fontSize: 16, marginTop: '2%',color:'#000'},
  	qtyView:{flexDirection: 'row',padding:10,marginLeft:'40%'},
  	qtybuttonDecrease:{margin:5},
 	qtybuttonIncrease:{margin:5},
 	qtyText:{backgroundColor:'#e9ebee',textAlign:'center',fontSize: 14, color: '#000', margin:5,paddingTop:8,paddingBottom:8,paddingLeft:15,paddingRight:15,borderColor:'#adadad',borderWidth:1},
 	qtyIcon:{width:30,height:30},
 	productsMainRightIcon:{paddingTop:'100%',marginLeft:'5%',fontWeight:'bold'},
 	productBottomPart:{width:'100%',flexDirection:'row',borderTopColor:'gray',borderTopWidth:1,paddingTop:5},
 	checkboxView:{width:'60%',padding:10},
 	bestDealView:{width:'40%',padding:3},
 	discountDeal:{color: '#ff0000', fontSize: 18,textAlign:'center',fontStyle:'italic'},
 	bestDeal:{color: '#000', marginTop: '3%', fontSize: 18,textAlign:'center'},
 	loadMoreActivity:{padding:10,width:'100%',position:'absolute', bottom:0,backgroundColor:'#fff'},

 	//product details 
 	productDetailsImage:{marginTop:'15%', marginBottom:'10%', marginLeft: '5%', width: '10%', width: '90%', height: 115},
 	productDetailsTitle:{fontSize: 18, marginTop: '10%',color:'#000'},
 	priceComparisonText:{fontSize:20,fontWeight:'bold',margin:10},
 	priceComparisonView:{backgroundColor: '#fff', flexDirection: 'row', borderColor:'#adadad',borderBottomWidth:1,width:'96%',marginLeft:'2%',marginRight:'2%',marginTop:'2%'},
 	priceComparisonLeft:{flexDirection: 'column',width:'40%'},
 	priceComparisonRight:{flexDirection: 'column',width:'60%',marginBottom:5},
 	priceCompanyImage:{height:50,width:'100%'},
 	priceTitleTextView:{width: '100%',padding:3},
 	priceTitleText:{fontSize: 18, marginTop: 5,color:'#000',fontWeight:'bold'},
	priceSubtitleText:{color: '#000', marginTop: 1, fontSize: 18},

  	//wishlist
  	wishlistMultipleView:{width:'100%',flexDirection:'row',padding:8},
  	multipleCheckbox:{color:'#000',fontSize:15},
  	wishlistBackButton:{padding:10,width:'10%',flexDirection:'column'},
  	wishlistTitle:{padding:10,fontSize:20,width:'90%',flexDirection:'column',color:'#000',fontWeight:'bold',marginTop:2},
  	wishlistBox:{backgroundColor: '#fff',  borderColor:'gray',borderWidth:1,margin:5,flexDirection:'row'},
  	wishlistBoxLeft:{width:'90%',flexDirection:'row',marginBottom:10},
  	wishlistBoxRight:{width:'10%',marginTop:'10%'},
  	wishlistInnerLeft:{width:'17%',marginLeft:'3%',flexDirection:'column',padding:3},
  	wishlistInnerLeftImage:{marginTop:'15%', marginBottom:'10%', width: '100%', height: 80},
  	wishlistInnerRight:{width:'77%',marginLeft:'3%',flexDirection:'column'},
  	wishlistInnerTitle:{fontSize: 18, marginTop: '5%',color:'#000',fontWeight:'bold'},
  	catTitle:{fontSize: 16, marginTop: '2%',color:'#000'},
	subtitle:{color: '#000', marginTop: '3%', fontSize: 18,textAlign:'left'},
	wishlistCheckBox:{paddingTop:'100%',paddingLeft:'10%'},
	wishlistModalContainer:{flex: 1,flexDirection: 'column', justifyContent: 'center',alignItems: 'center'},
	wishlistModalContainerBox:{backgroundColor:'#fff', width: 300},
	modalMenu:{width:'100%',backgroundColor:'#00BCD4',padding:15,borderBottomColor:'#fff',borderBottomWidth:1},
    modalMenuText:{color:'#fff',fontSize:17,fontWeight:'bold'},
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
	lowestPriceRightBox:{flexDirection: 'column',width:'70%'},
	lowestPriceLeftInnerBox:{flexDirection: 'column',width:'10%'},
	lowestPriceRightInner:{flexDirection:'row',width:'100%'},
	lowestPriceRightInnerBox:{flexDirection: 'column',width:'90%'},
	lowestPriceTitle:{fontSize: 18, marginTop: '10%',color:'#000',fontWeight:'bold'},
	lowestPriceSubTitle:{color: '#000', marginTop: '3%', fontSize: 18},

	//multistore 
	multistoreView:{backgroundColor: '#fff',borderBottomColor:'grey',borderBottomWidth:0.5,flexDirection:'row',margin:5,padding:5},
	multistoreLeftView:{width:'90%',flexDirection:'column'},
	multistoreRightInnerView:{width:'100%',flexDirection:'row',alignItems:'center',justifyContent:'center'},
	multistoreTitle:{fontSize:18,fontWeight:'bold',padding:5},
	multistoreAddress:{fontSize:18,padding:5},
	multistoreRightView:{width:'10%',flexDirection:'column',alignItems:'center',justifyContent:'center'},

	//tell a friend
	textfieldDescription:{marginLeft:10,marginRight:10,marginTop:2,marginBottom:2},

    //sign up
    termsView:{flexDirection: 'row',justifyContent:'center',width:'100%'},
    termsLink:{color:'#62C462',fontSize:18},

   	//tell a friend
    flatlist:{backgroundColor: '#fff',borderBottomColor:'grey',borderBottomWidth:0.5,flexDirection:'row'},
    tellfriend:{backgroundColor: '#fff',flexDirection:'row',width:'100%'},
    tellFriendTitle:{fontSize: 18,padding:20,color:'#000',fontWeight:'bold',width:'85%'},
    rightButton:{paddingTop:20,paddingBottom:20,paddingRight:10,width:'15%'},
})
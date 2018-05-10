import { StyleSheet,Platform } from 'react-native';

export const gstyles = StyleSheet.create({
    container:{
		flex:1,
		backgroundColor:'#fff'
	},	
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
			left: 30,
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
	drawerImage:{marginTop:10,marginLeft:10,marginRight:0,width:24,height:24,flexDirection:'column'},
	flatimage:{ 
	  height: 150,
	  width: '100%',
	},
	title:{  
	  fontSize: 18,
	  color: '#000',
	},
})
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
	menuicon:{
		height:24,
		width:24
	},
	drawertitleHeadingText:{backgroundColor:'#eee',padding:10,color:'#333',borderBottomColor:'#dedede',borderBottomWidth:1,fontSize:16,fontWeight:'bold'},
	drawertitleNormalText:{padding:10,color:'#333',fontSize:16},
	flatimage:{ 
	  height: 150,
	  width: '100%',
	},
	title:{  
	  fontSize: 18,
	  color: '#000',
	},
})
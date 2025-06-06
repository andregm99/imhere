import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
    container: {
      flex:1,
      backgroundColor:'#191620',
      padding:24
    },
    EventName:{
      color:'white',
      marginTop: 48,
      fontSize:24
    },
    EventDate:{
      color:'gray',
      fontSize: 16
    },
    input:{
      flex:1,
      height:56,
      backgroundColor:'#1F1E25',
      borderRadius: 5,
      color:'#FFF',
      padding:16,
      fontSize:16,
      marginRight:12,
      marginBottom:10
    },
    buttonText:{
      color:'#FFF',
      fontSize:24
    },
    button:{
      width:56,
      height:56,
      borderRadius:5,
      backgroundColor:'#31CF67',
      alignItems:'center',
      justifyContent:'center',
    },
    form:{
      width: '100%',
      flexDirection:'row',
      marginTop:20,
      marginBottom:10
    },
    listEmptyText:{
      color:'#FFF',
      fontSize:14,
      textAlign:'center'
    }
  })
  
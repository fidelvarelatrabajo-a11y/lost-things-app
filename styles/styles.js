import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: { 
    flex:1, 
    justifyContent:'center', 
    alignItems:'center', 
    padding:20 
  },
  title: { 
    fontSize:24, 
    fontWeight:'bold',
    marginBottom:20  
  },
  textRegistry:{
    color:'white',
    fontSize:16,
    fontWeight:'bold'
  },
  registerTextInput:{
    color:'#6f6f6f',
    marginBottom:5,
    textAlign:'left'
  },
  input: { 
    width:'80%', 
    borderWidth:1, 
    borderColor:'#ccc', 
    padding:12, 
    borderRadius:8, 
    marginBottom:15 
  },
  buttonLogin: { 
    backgroundColor:'#4e9efc', 
    padding:15, 
    borderRadius:8, 
    width:'50%', 
    alignItems:'center',
    marginBottom:20, 
  },
  buttonRegistry:{
    backgroundColor:'#ee291bff', 
    padding:15, 
    borderRadius:8, 
    width:'50%', 
    alignItems:'center' 
  },
  textRegistryDescription:{
    fontSize:15,
    marginBottom:15,
  },
  buttonHome:{
    backgroundColor:'#4e9efc', 
    padding:15, 
    borderRadius:8, 
    width:'50%', 
    alignItems:'center',
    marginBottom:20,
  },
  buttonText: { 
    color:'#fff', 
    fontWeight:'bold', 
    fontSize:16,
  },
  textDescription:{
    marginBottom:20,
    textAlign:'center'
  },
  image: { 
    width: 200, 
    height: 200, 
    marginVertical: 10 
  },
  buttonReport:{
    marginBottom:20,
  },
  buttonHomeSaveReport:{
    backgroundColor:'red',
    padding:15,
    borderRadius:8,
    width:'50%',
    alignItems:'center'
  },
    card: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: "#f1f1f1",
    borderRadius: 8
  },
  textoTitulo: {
    fontSize: 18,
    fontWeight: "bold"
  },
  fecha: {
    marginTop: 5,
    fontSize: 12,
    color: "gray"
  },
  buttonDetails: {
    backgroundColor:'#4e9efc', 
    padding:15, 
    borderRadius:8, 
    width:'100%', 
    alignItems:'center',
    marginTop:10,
  }
});